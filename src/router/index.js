import { createRouter, createWebHistory } from 'vue-router';

//Views imports
import HomePage from "../views/HomePage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import ProductPage from "../views/ProductPage.vue";
import NotFoundPage from "../views/404Page.vue";
import CataloguePage from "../views/CataloguePage.vue";
import ContactPage from "../views/ContactPage.vue";
import ConnexionPage from "../views/ConnexionPage.vue";
import LegalPage from "../views/LegalPage.vue";
import AccountPage from "../views/AccountPage.vue";
import CartPage from "../views/CartPage.vue";
import AdminPage from "../views/AdminPage.vue";


const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/catalogue',
        component: CataloguePage
    },
    {
        path: '/contact',
        component: ContactPage
    },
    {
        path: '/connexion',
        component: ConnexionPage
    },
    {
        path: '/inscription',
        component: RegisterPage
    },
    {
        path: '/compte',
        component: AccountPage
    },
    {
        path: '/panier',
        component: CartPage
    },
    {
        path: '/admin',
        component: AdminPage
    },
    {
        path: '/legals',
        component: LegalPage
    },
    {
        path: '/produit/:idProduct',
        component: ProductPage,
        props: true
    },
    {
        path: '/:pathMatch(.*)*', // Route 404 à ajouter en dernier
        component: NotFoundPage
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
})

export default router;