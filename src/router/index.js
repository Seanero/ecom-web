import { createRouter, createWebHistory } from 'vue-router';

//Views imports
import HomePage from "../views/HomePage.vue";

const routes = [
    {
        path: '/',
        component: HomePage,
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;