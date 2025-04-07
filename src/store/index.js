import { createStore } from "vuex";

import cart from "./modules/cart.js";
import auth from "./modules/auth.js";


const store = createStore({
    state(){
        return {
            //apiUrl: "http://fr0-games-001.palmasys.fr:25637"
            apiUrl: "http://localhost:8000"
        }
    },
    getters: {
        apiUrl: state => state.apiUrl
    },
    modules: {
        cart,
        auth
    }
});

export default store;