import { createStore } from "vuex";

const store = createStore({
    state(){
        return {
            apiUrl: "http://fr0-games-001.palmasys.fr:25637"
        }
    },
    getters: {
        apiUrl: state => state.apiUrl
    }
});

export default store;