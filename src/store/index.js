import { createStore } from "vuex";

import cart from "./modules/cart.js";
import auth from "./modules/auth.js";
import admin from "./modules/admin.js";


const store = createStore({
    state(){
        return {
            apiUrl: "http://fr0-games-001.palmasys.fr:25637"
        }
    },
    getters: {
        apiUrl: state => state.apiUrl
    },
    modules: {
        cart,
        auth,
        admin
    }
});

store.dispatch("cart/initCart");

export default store;