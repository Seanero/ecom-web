<template>
  <header>
    <div class="header-content">
      <div class="logo">
        <img src="../assets/img/logo.png" alt="TechNatura Logo">
        <h1>TechNatura</h1>
      </div>
      <nav>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/catalogue">Catalogue</router-link></li>
          <li><router-link to="/contact">Nous Contacter</router-link></li>
          <!-- Affichage conditionnel basé sur l'état de connexion via Vuex -->
          <li v-if="!isAuthenticated">
            <router-link to="/connexion" class="connexion-btn">Connexion</router-link>
          </li>
          <li v-else class="user-menu">
            <div class="icon-group">
              <router-link to="/panier" class="icon-link">
                <svg class="header-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
                  <path d="M136,120v56a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm36.84-.8-5.6,56A8,8,0,0,0,174.4,184a7.32,7.32,0,0,0,.81,0,8,8,0,0,0,7.95-7.2l5.6-56a8,8,0,0,0-15.92-1.6Zm-89.68,0a8,8,0,0,0-15.92,1.6l5.6,56a8,8,0,0,0,8,7.2,7.32,7.32,0,0,0,.81,0,8,8,0,0,0,7.16-8.76ZM239.93,89.06,224.86,202.12A16.06,16.06,0,0,1,209,216H47a16.06,16.06,0,0,1-15.86-13.88L16.07,89.06A8,8,0,0,1,24,80H68.37L122,18.73a8,8,0,0,1,12,0L187.63,80H232a8,8,0,0,1,7.93,9.06ZM89.63,80h76.74L128,36.15ZM222.86,96H33.14L47,200H209Z"></path>
                </svg>
                <span v-if="cartItemCount > 0" class="badge">{{ cartItemCount }}</span>
              </router-link>
              <div class="profile-dropdown">
                <button class="profile-btn">
                  <svg class="header-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
                    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                  </svg>
                </button>
                <div class="dropdown-content">
                  <div class="user-info" v-if="user">
                    <span class="username">{{ user.firstname }} {{ user.lastname.toUpperCase() }}</span>
                    <span class="email">{{ user.email }}</span>
                  </div>
                  <router-link to="/compte">Mon Compte</router-link>
<!--                  <router-link to="/commandes">Mes Commandes</router-link>-->
                  <a href="#" @click.prevent="deconnecter">Déconnexion</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HeaderComponent',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('auth', [
      'isAuthenticated',
      'user'
    ]),
    ...mapGetters('cart', [
        'cartItemCount'
    ])
  },
  methods: {
    ...mapActions('auth', [
      'logout',
      'checkAuth'
    ]),
    async deconnecter() {
      try {
        // Utilise l'action logout du module auth
        const result = await this.logout();

        if (result.success) {
          // Redirection vers la page d'accueil après déconnexion
          this.$router.push('/');
        } else {
          console.error('Erreur de déconnexion:', result.message);
        }
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      }
    }
  },
  async created() {
    // Vérification de l'état d'authentification au chargement du composant
    await this.checkAuth();
    console.log("État d'authentification:", this.isAuthenticated);

    // Si vous avez un module panier, vous pourriez charger le nombre d'articles ici
    // this.cartItemCount = this.$store.getters['cart/itemCount'];

    // Pour les tests, on peut définir une valeur
    this.cartItemCount = 3;
  }
};
</script>

<style scoped>
:root {
  --primary-color: #2e7d32;
  --secondary-color: #81c784;
  --accent-color: #1b5e20;
  --text-color: #333;
  --light-color: #f5f5f5;
  --dark-color: #212121;
}

header {
  background-color: var(--primary-color);
  padding: 1rem;
  color: white;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 50px;
  margin-right: 10px;
}

nav ul {
  display: flex;
  list-style: none;
  align-items: center;
  margin: 0;
  padding: 0;
}

nav ul li {
  margin-left: 1.5rem;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

nav ul li a:hover {
  color: var(--secondary-color);
}

.connexion-btn {
  background-color: var(--accent-color);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
}

.connexion-btn:hover {
  background-color: var(--secondary-color);
  color: var(--dark-color);
}

.user-menu {
  display: flex;
  align-items: center;
}

.icon-group {
  display: flex;
  align-items: center;
}

/* Style pour les icônes SVG */
.header-icon {
  width: 24px;
  height: 24px;
  fill: white; /* Couleur blanche pour les icônes */
  transition: fill 0.3s ease;
}

.icon-link {
  margin-right: 1.5rem;
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
}

.icon-link:hover .header-icon {
  fill: var(--secondary-color);
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--secondary-color);
  color: var(--dark-color);
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.7rem;
  font-weight: bold;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-dropdown {
  position: relative;
  display: inline-block;
}

.profile-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.profile-btn:hover .header-icon {
  fill: var(--secondary-color);
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: white;
  min-width: 180px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 4px;
  overflow: hidden;
}

.user-info {
  padding: 12px 16px;
  background-color: var(--light-color);
  border-bottom: 1px solid #e0e0e0;
}

.username {
  display: block;
  font-weight: bold;
  color: var(--text-color);
}

.email {
  display: block;
  font-size: 0.8rem;
  color: #666;
  margin-top: 2px;
}

.dropdown-content a {
  color: var(--text-color);
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: var(--light-color);
  color: var(--primary-color);
}

.profile-dropdown:hover .dropdown-content {
  display: block;
}

@media screen and (max-width: 768px) {
  .header-content {
    flex-direction: column;
  }

  nav ul {
    margin-top: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  nav ul li {
    margin: 0.5rem;
  }
}
</style>