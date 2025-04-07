// src/store/modules/cart.js
const state = {
    items: []
};

const getters = {
    // Obtenir tous les éléments du panier
    cartItems: state => state.items,

    // Obtenir le nombre total d'articles dans le panier
    cartItemCount: state => {
        return state.items.reduce((count, item) => count + item.quantity, 0);
    },

    // Calculer le montant total du panier
    cartTotal: state => {
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // Vérifier si un produit est déjà dans le panier
    isInCart: (state) => (productId) => {
        return state.items.some(item => item._id === productId);
    },

    // Obtenir un élément spécifique du panier par son ID
    getCartItemById: (state) => (productId) => {
        return state.items.find(item => item._id === productId);
    }
};

const mutations = {
    // Ajouter un item au panier
    ADD_TO_CART(state, item) {
        const existingItem = state.items.find(i => i._id === item._id);

        if (existingItem) {
            // Incrémenter la quantité si l'article existe déjà
            existingItem.quantity += item.quantity || 1;
        } else {
            // Ajouter le nouvel article avec quantité par défaut à 1
            state.items.push({
                ...item,
                quantity: item.quantity || 1
            });
        }

        // Sauvegarder le panier dans localStorage
        localStorage.setItem('cart', JSON.stringify(state.items));
    },

    // Mettre à jour la quantité d'un article
    UPDATE_CART_ITEM_QUANTITY(state, { productId, quantity }) {
        const item = state.items.find(i => i._id === productId);
        if (item) {
            item.quantity = quantity;
            // Sauvegarder le panier dans localStorage
            localStorage.setItem('cart', JSON.stringify(state.items));
        }
    },

    // Supprimer un article du panier
    REMOVE_FROM_CART(state, productId) {
        state.items = state.items.filter(item => item._id !== productId);

        // Sauvegarder le panier dans localStorage
        localStorage.setItem('cart', JSON.stringify(state.items));
    },

    // Vider le panier
    CLEAR_CART(state) {
        state.items = [];

        // Sauvegarder le panier dans localStorage
        localStorage.setItem('cart', JSON.stringify(state.items));
    },

    // Initialiser le panier depuis localStorage
    INIT_CART(state) {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            state.items = JSON.parse(savedCart);
        }
    }
};

const actions = {
    // Initialiser le panier au démarrage de l'application
    initCart({ commit }) {
        commit('INIT_CART');
    },

    // Ajouter un article au panier
    addToCart({ commit, getters }, product) {
        commit('ADD_TO_CART', product);
    },

    // Mettre à jour la quantité d'un article
    updateCartItemQuantity({ commit, state }, { productId, quantity }) {
        // Vérifier que la quantité est valide (positive et pas supérieure au stock)
        const item = state.items.find(i => i._id === productId);

        if (item && quantity > 0) {
            commit('UPDATE_CART_ITEM_QUANTITY', { productId, quantity });
        }
    },

    // Supprimer un article du panier
    removeFromCart({ commit }, productId) {
        commit('REMOVE_FROM_CART', productId);
    },

    // Vider le panier
    clearCart({ commit }) {
        commit('CLEAR_CART');
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};