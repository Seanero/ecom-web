// src/store/modules/auth.js
import axios from 'axios';

const state = {
    user: null,
    isAuthenticated: false,
    error: null,
    loading: false
};

const getters = {
    // Vérifier si l'utilisateur est authentifié
    isAuthenticated: state => state.isAuthenticated,

    // Obtenir les informations de l'utilisateur
    user: state => state.user,

    // Obtenir l'erreur d'authentification
    authError: state => state.error,

    // Obtenir l'état de chargement
    isLoading: state => state.loading
};

const mutations = {
    // Définir l'utilisateur connecté
    SET_USER(state, user) {
        state.user = user;
        state.isAuthenticated = true;
    },

    // Effacer les informations utilisateur lors de la déconnexion
    CLEAR_USER(state) {
        state.user = null;
        state.isAuthenticated = false;
    },

    // Définir l'erreur d'authentification
    SET_ERROR(state, error) {
        state.error = error;
    },

    // Effacer l'erreur d'authentification
    CLEAR_ERROR(state) {
        state.error = null;
    },

    // Définir l'état de chargement
    SET_LOADING(state, loading) {
        state.loading = loading;
    }
};

const actions = {
    // Action de connexion
    // Modifications à apporter au fichier src/store/modules/auth.js

// Modifiez l'action de connexion pour vérifier correctement le statut du cookie
    async login({ commit, dispatch }, credentials) {
        try {
            commit('SET_LOADING', true);
            commit('CLEAR_ERROR');

            // Étape 1: Connexion pour obtenir le token en cookie
            const loginResponse = await axios.post(`${this.state.apiUrl}/users/login`, credentials, {
                withCredentials: false // Crucial pour traiter les cookies
            });

            // Vérifier si la connexion a réussi
            if (loginResponse.data && loginResponse.data.code === "LOGIN-SUCCESS") {
                // Le cookie token est automatiquement géré par le navigateur
                console.log("Connexion réussie, récupération du profil utilisateur...");

                // Étape 2: Récupérer les informations utilisateur complètes après un court délai
                // Ce délai permet de s'assurer que le cookie est bien enregistré côté client
                await new Promise(resolve => setTimeout(resolve, 200));

                const userInfoSuccess = await dispatch('fetchUserInfo');

                if (!userInfoSuccess) {
                    console.error("Échec de récupération des informations utilisateur après connexion réussie");
                    commit('SET_ERROR', 'Problème lors de la récupération de votre profil');
                    return { success: false, message: 'Problème de récupération du profil' };
                }

                // Optionnel: stocker email dans localStorage si "se souvenir de moi"
                if (credentials.rememberMe) {
                    localStorage.setItem('remembered_email', credentials.email);
                }

                return { success: true };
            } else {
                throw new Error('Réponse inattendue du serveur');
            }
        } catch (error) {
            let errorMessage = 'Erreur de connexion';

            if (error.response) {
                // Gestion des erreurs API
                const { status, data } = error.response;
                console.error("Erreur de connexion:", status, data);

                if (status === 404 && data.code === "LOGIN_INCORRECT") {
                    errorMessage = 'Email ou mot de passe incorrect';
                }
            }

            commit('SET_ERROR', errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            commit('SET_LOADING', false);
        }
    },

// Modifiez fetchUserInfo pour diagnostiquer les problèmes
    async fetchUserInfo({ commit }) {
        try {
            commit('SET_LOADING', true);

            console.log("Tentative de récupération des informations utilisateur...");

            // Vérifier si des cookies sont disponibles
            console.log("Cookies disponibles:", document.cookie);

            const response = await axios.get(`${this.state.apiUrl}/users/me`, {
                withCredentials: true  // Crucial pour envoyer les cookies
            });

            console.log("Réponse fetchUserInfo:", response.data);

            if (response.data) {
                // Stocker les informations utilisateur complètes
                commit('SET_USER', response.data);
                return true;
            } else {
                throw new Error('Impossible de récupérer les informations utilisateur');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des informations utilisateur:', error);

            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Data:", error.response.data);
            }

            commit('CLEAR_USER');
            return false;
        } finally {
            commit('SET_LOADING', false);
        }
    },

    // Action de déconnexion
    async logout({ commit }) {
        try {
            // Appel à l'API de déconnexion qui supprime le cookie
            await axios.get(`${this.state.apiUrl}/users/logout`);

            // Nettoyer le state
            commit('CLEAR_USER');

            return { success: true };
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            return { success: false, message: 'Erreur lors de la déconnexion' };
        }
    },

    // Vérifier si l'utilisateur est déjà connecté (au chargement de l'app)
    async checkAuth({ commit, dispatch }) {
        try {
            commit('SET_LOADING', true);

            // Essayer de récupérer les informations utilisateur
            // Si le cookie est valide, cela fonctionnera, sinon cela échouera
            const success = await dispatch('fetchUserInfo');

            return success;
        } catch (error) {
            console.error('Erreur lors de la vérification de l\'authentification:', error);
            commit('CLEAR_USER');
            return false;
        } finally {
            commit('SET_LOADING', false);
        }
    },

    // Enregistrer un nouvel utilisateur
    async register({ commit, dispatch }, userData) {
        try {
            commit('SET_LOADING', true);
            commit('CLEAR_ERROR');

            const response = await axios.post(`${this.state.apiUrl}/users/register`, userData);

            if (response.data && response.data.success) {
                // Si l'inscription inclut une connexion automatique
                if (response.data.autoLogin) {
                    await dispatch('fetchUserInfo');
                }

                return { success: true };
            } else {
                throw new Error('Erreur lors de l\'inscription');
            }
        } catch (error) {
            let errorMessage = 'Erreur lors de l\'inscription';

            if (error.response) {
                // Gestion des erreurs API
                const { status, data } = error.response;

                if (status === 409 && data.message && data.message.includes('email')) {
                    errorMessage = 'Cet email est déjà utilisé';
                }
            }

            commit('SET_ERROR', errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            commit('SET_LOADING', false);
        }
    },

    // Mettre à jour les informations utilisateur
    async updateProfile({ commit }, userData) {
        try {
            commit('SET_LOADING', true);
            commit('CLEAR_ERROR');

            const response = await axios.put(`${this.state.apiUrl}/users/profile`, userData);

            if (response.data) {
                // Mettre à jour les infos utilisateur dans le state
                commit('SET_USER', response.data);
                return { success: true };
            } else {
                throw new Error('Erreur lors de la mise à jour du profil');
            }
        } catch (error) {
            let errorMessage = 'Erreur lors de la mise à jour du profil';

            if (error.response) {
                // Gestion des erreurs API
                const { status, data } = error.response;
                errorMessage = data.message || errorMessage;
            }

            commit('SET_ERROR', errorMessage);
            return { success: false, message: errorMessage };
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