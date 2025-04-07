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
                <i class="fas fa-shopping-cart"></i>
                <span v-if="cartItemCount > 0" class="badge">{{ cartItemCount }}</span>
              </router-link>
              <div class="profile-dropdown">
                <button class="profile-btn">
                  <i class="fas fa-user"></i>
                </button>
                <div class="dropdown-content">
                  <div class="user-info" v-if="user">
                    <span class="username">{{ user.firstname }} {{ user.lastname }}</span>
                    <span class="email">{{ user.email }}</span>
                  </div>
                  <router-link to="/mon-compte">Mon Compte</router-link>
                  <router-link to="/commandes">Mes Commandes</router-link>
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
      cartItemCount: 0 // À remplacer par votre logique de panier ou mapGetter
    }
  },
  computed: {
    ...mapGetters('auth', [
      'isAuthenticated',
      'user'
    ])
  },
  methods: {
    ...mapActions('auth', [
      'logout'
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
  created() {
    // Si vous avez un module panier, vous pourriez charger le nombre d'articles ici
    // this.cartItemCount = this.$store.getters['cart/itemCount'];
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

.icon-group {
  display: flex;
  align-items: center;
}

.icon-link {
  margin-right: 1rem;
  position: relative;
  font-size: 1.2rem;
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
}

.profile-dropdown {
  position: relative;
  display: inline-block;
}

.profile-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
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