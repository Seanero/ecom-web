import axios from 'axios';

const state = {
    categories: [],
    products: [],
    users: [],
    contacts: [],
    error: null,
    loading: false
};

const getters = {
    categories: state => state.categories,
    products: state => state.products,
    users: state => state.users,
    contacts: state => state.contacts,
    error: state => state.error,
    loading: state => state.loading
};

const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    },
    SET_PRODUCTS(state, products) {
        state.products = products;
    },
    SET_USERS(state, users) {
        state.users = users;
    },
    SET_CONTACTS(state, contacts) {
        state.contacts = contacts;
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

const actions = {
    async fetchCategories({ commit, rootState }) {
        commit('SET_LOADING', true);
        try {
            const res = await axios.get(`${rootState.apiUrl}/category/getAll`, { withCredentials: true });
            commit('SET_CATEGORIES', res.data);
            return true;
        } catch (error) {
            commit('SET_ERROR', error.response?.data?.message || 'Erreur lors du chargement des catégories');
            return false;
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async fetchProducts({ commit, rootState }) {
        commit('SET_LOADING', true);
        try {
            const res = await axios.get(`${rootState.apiUrl}/product/getAll`, { withCredentials: true });
            commit('SET_PRODUCTS', res.data);
            return true;
        } catch (error) {
            commit('SET_ERROR', error.response?.data?.message || 'Erreur lors du chargement des produits');
            return false;
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async fetchUsers({ commit, rootState }) {
        commit('SET_LOADING', true);
        try {
            const res = await axios.get(`${rootState.apiUrl}/users/getAll`, { withCredentials: true });
            commit('SET_USERS', res.data.users || []);
            return true;
        } catch (error) {
            commit('SET_ERROR', error.response?.data?.message || 'Erreur lors du chargement des utilisateurs');
            return false;
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async fetchContacts({ commit, rootState }) {
        commit('SET_LOADING', true);
        try {
            const res = await axios.get(`${rootState.apiUrl}/contact/getAll`, { withCredentials: true });
            commit('SET_CONTACTS', res.data || []);
            return true;
        } catch (error) {
            commit('SET_ERROR', error.response?.data?.message || 'Erreur lors du chargement des formulaires de contact');
            return false;
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async deleteContact({ commit, rootState }, contactId) {
        commit('SET_LOADING', true);
        try {
            const res = await axios.delete(`${rootState.apiUrl}/contact/${contactId}`, {
                withCredentials: true
            });
            return { success: true };
        } catch (error) {
            commit('SET_ERROR', error.response?.data?.message || 'Erreur lors de la suppression du formulaire');
            return { success: false, message: error.response?.data?.message || 'Erreur lors de la suppression du formulaire' };
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async createCategory({ commit, rootState }, categoryData) {
        commit('SET_LOADING', true);
        try {
            await axios.post(`${rootState.apiUrl}/category/create`, categoryData, { withCredentials: true });
            return { success: true };
        } catch (error) {
            commit('SET_ERROR', error.response?.data?.message || 'Erreur lors de la création de la catégorie');
            return { success: false, message: error.response?.data?.message || 'Erreur lors de la création de la catégorie' };
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async updateCategory({ commit, rootState }, { id, data }) {
        commit('SET_LOADING', true);
        try {
            await axios.put(`${rootState.apiUrl}/category/update/${id}`, data, { withCredentials: true });
            return { success: true };
        } catch (error) {
            commit('SET_ERROR', error.response?.data?.message || 'Erreur lors de la mise à jour de la catégorie');
            return { success: false, message: error.response?.data?.message || 'Erreur lors de la mise à jour de la catégorie' };
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async deleteCategory({ commit, rootState }, id) {
        commit('SET_LOADING', true);
        try {
            await axios.post(`${rootState.apiUrl}/category/delete`, { id }, { withCredentials: true });
            return { success: true };
        } catch (error) {
            commit('SET_ERROR', error.response?.data?.message || 'Erreur lors de la suppression de la catégorie');
            return { success: false, message: error.response?.data?.message || 'Erreur lors de la suppression de la catégorie' };
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async createProduct({ commit, rootState }, productData) {
        commit('SET_LOADING', true);
        try {
            await axios.post(`${rootState.apiUrl}/product/create`, productData, { withCredentials: true });
            return { success: true };
        } catch (error) {
            commit('SET_ERROR', error.response?.data?.message || 'Erreur lors de la création du produit');
            return { success: false, message: error.response?.data?.message || 'Erreur lors de la création du produit' };
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async updateProduct({ commit, rootState }, { id, data }) {
        commit('SET_LOADING', true);
        try {
            await axios.put(`${rootState.apiUrl}/product/update/${id}`, data, { withCredentials: true });
            return { success: true };
        } catch (error) {
            commit('SET_ERROR', error.response?.data?.message || 'Erreur lors de la mise à jour du produit');
            return { success: false, message: error.response?.data?.message || 'Erreur lors de la mise à jour du produit' };
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async deleteProduct({ commit, rootState }, id) {
        commit('SET_LOADING', true);
        try {
            await axios.post(`${rootState.apiUrl}/product/delete`, { id }, { withCredentials: true });
            return { success: true };
        } catch (error) {
            commit('SET_ERROR', error.response?.data?.message || 'Erreur lors de la suppression du produit');
            return { success: false, message: error.response?.data?.message || 'Erreur lors de la suppression du produit' };
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async updateUser({ commit, rootState }, { userId, userData }) {
        commit('SET_LOADING', true);
        try {
            const res = await axios.post(`${rootState.apiUrl}/users/edit`, {
                user: userId,
                edit: userData
            }, {
                withCredentials: true
            });

            if (res.data?.code === 'USER_UPDATED') {
                return { success: true };
            }
            throw new Error('Réponse inattendue');
        } catch (error) {
            commit('SET_ERROR', error.response?.data?.message || 'Erreur lors de la mise à jour de l\'utilisateur');
            return { success: false, message: error.response?.data?.message || 'Erreur lors de la mise à jour de l\'utilisateur' };
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async deleteUser({ commit, rootState }, userId) {
        commit('SET_LOADING', true);
        try {
            const res = await axios.delete(`${rootState.apiUrl}/users/${userId}`, {
                withCredentials: true
            });

            if (res.data?.code === 'USER_DELETED' || res.status === 200) {
                return { success: true };
            }
            throw new Error('Réponse inattendue');
        } catch (error) {
            commit('SET_ERROR', error.response?.data?.message || 'Erreur lors de la suppression de l\'utilisateur');
            return { success: false, message: error.response?.data?.message || 'Erreur lors de la suppression de l\'utilisateur' };
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async resetUserPassword({ commit, rootState }, { userId, newPassword }) {
        commit('SET_LOADING', true);
        try {
            const res = await axios.post(`${rootState.apiUrl}/users/changePassword`, {
                userId,
                newPassword
            }, {
                withCredentials: true
            });

            if (res.data?.code === 'PASSWORD_UPDATED' || res.status === 200) {
                return { success: true };
            }
            throw new Error('Réponse inattendue');
        } catch (error) {
            commit('SET_ERROR', error.response?.data?.message || 'Erreur lors de la réinitialisation du mot de passe');
            return { success: false, message: error.response?.data?.message || 'Erreur lors de la réinitialisation du mot de passe' };
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