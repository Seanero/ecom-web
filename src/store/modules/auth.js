import axios from 'axios';

const state = {
    user: null,
    isAuthenticated: false,
    error: null,
    loading: false
};

const getters = {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user.user, // corrigé ici
    authError: state => state.error,
    isLoading: state => state.loading
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
        state.isAuthenticated = true;
    },
    CLEAR_USER(state) {
        state.user = null;
        state.isAuthenticated = false;
    },
    SET_ERROR(state, error) {
        state.error = error;
    },
    CLEAR_ERROR(state) {
        state.error = null;
    },
    SET_LOADING(state, loading) {
        state.loading = loading;
    }
};

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const actions = {
    async login({ commit, dispatch }, credentials) {
        commit('SET_LOADING', true);
        commit('CLEAR_ERROR');

        try {
            const res = await axios.post(`${this.state.apiUrl}/users/login`, credentials, {
                withCredentials: true
            });

            if (res.data?.code === "LOGIN-SUCCESS") {
                await wait(200);
                const success = await dispatch('fetchUserInfo');

                if (credentials.rememberMe) {
                    localStorage.setItem('remembered_email', credentials.email);
                }

                if (!success) throw new Error('fetchUserInfo failed');
                return { success: true };
            }

            throw new Error('Réponse inattendue');
        } catch (error) {
            let msg = 'Erreur de connexion';
            if (error.response?.status === 404 && error.response?.data?.code === "LOGIN_INCORRECT") {
                msg = 'Email ou mot de passe incorrect';
            }
            commit('SET_ERROR', msg);
            return { success: false, message: msg };
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async fetchUserInfo({ commit }) {
        commit('SET_LOADING', true);
        try {
            const res = await axios.get(`${this.state.apiUrl}/users/me`, {
                withCredentials: true
            });

            if (res.data) {
                commit('SET_USER', res.data);
                return true;
            }

            throw new Error();
        } catch (error) {
            commit('CLEAR_USER');
            return false;
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async logout({ commit }) {
        try {
            await axios.get(`${this.state.apiUrl}/users/logout`, {
                withCredentials: true
            });
            commit('CLEAR_USER');
            return { success: true };
        } catch {
            return { success: false, message: 'Erreur lors de la déconnexion' };
        }
    },

    async checkAuth({ dispatch }) {
        return await dispatch('fetchUserInfo');
    },

    async register({ commit, dispatch }, userData) {
        commit('SET_LOADING', true);
        commit('CLEAR_ERROR');

        try {
            const res = await axios.post(`${this.state.apiUrl}/users/register`, userData);

            // Vérification plus permissive pour détecter le succès
            if (res.data?.success || // Vérifie success
                res.data?.code === "USER_CREATED" || // Vérifie code
                res.data?.response === "User created" || // Vérifie response
                res.status === 201) { // Vérifie le statut HTTP

                if (res.data?.autoLogin) {
                    await dispatch('fetchUserInfo');
                }
                return { success: true };
            }

            // Ajouter un log pour voir la réponse
            console.log("Réponse de création d'utilisateur:", res.data);

            // Au lieu de throw, renvoyez un statut d'échec avec un message plus informatif
            return { success: false, message: 'Format de réponse non reconnu' };
        } catch (error) {
            console.error("Erreur complète:", error);

            const message = error.response?.status === 409 && error.response?.data?.message?.includes('email')
                ? 'Cet email est déjà utilisé'
                : 'Erreur lors de l\'inscription';

            commit('SET_ERROR', message);
            return { success: false, message };
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async updateProfile({ commit, state, dispatch }, profileData) {
        commit('SET_LOADING', true);
        commit('CLEAR_ERROR');

        try {
            const updateData = {
                user: state.user._id,
                edit: {
                    firstname: profileData.firstname,
                    lastname: profileData.lastname,
                    email: profileData.email
                }
            };

            const res = await axios.post(`${this.state.apiUrl}/users/edit`, updateData, {
                withCredentials: true
            });

            if (res.data?.code === 'USER_UPDATED') {
                const updated = await dispatch('fetchUserInfo');
                if (!updated) throw new Error();
                return { success: true, message: 'Informations mises à jour avec succès' };
            }

            throw new Error();
        } catch (error) {
            const msg = error.response?.data?.message || 'Erreur lors de la mise à jour du profil';
            commit('SET_ERROR', msg);
            return { success: false, message: msg };
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async updateAddress({ commit, state, dispatch }, addressData) {
        commit('SET_LOADING', true);
        commit('CLEAR_ERROR');

        try {
            const updateData = {
                user: state.user.user._id,
                edit: {
                    invoiceAddress: {
                        line1: addressData.line1,
                        line2: addressData.line2,
                        postalCode: addressData.postalCode,
                        city: addressData.city,
                        stateOrDepartment: addressData.stateOrDepartment,
                        country: addressData.country
                    }
                }
            };

            console.log(updateData);

            const res = await axios.post(`${this.state.apiUrl}/users/edit`, updateData, {
                withCredentials: true
            });

            if (res.data?.code === 'USER_UPDATED') {
                await dispatch('fetchUserInfo');
                return { success: true, message: 'Adresse mise à jour avec succès' };
            }

            throw new Error();
        } catch (error) {
            const msg = error.response?.data?.message || 'Erreur lors de la mise à jour de l\'adresse';
            commit('SET_ERROR', msg);
            return { success: false, message: msg };
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async changePassword({ commit, state }, passwordData) {
        commit('SET_LOADING', true);
        commit('CLEAR_ERROR');

        try {
            const updateData = {
                userId: state.user.user._id,
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            };

            const res = await axios.post(`${this.state.apiUrl}/users/changePassword`, updateData, {
                withCredentials: true
            });

            if (res.data?.code === 'PASSWORD_UPDATED' || res.data?.code === 'USER_UPDATED') {
                return { success: true, message: 'Mot de passe modifié avec succès' };
            }

            throw new Error();
        } catch (error) {
            const code = error.response?.data?.code;
            const msg = code === 'INCORRECT_PASSWORD'
                ? 'Le mot de passe actuel est incorrect'
                : error.response?.data?.message || 'Erreur lors du changement de mot de passe';

            commit('SET_ERROR', msg);
            return { success: false, message: msg };
        } finally {
            commit('SET_LOADING', false);
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};