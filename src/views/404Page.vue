<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="not-found-icon">
        <span class="error-code">404</span>
        <img src="../assets/img/logo.png" alt="Page non trouvée" class="error-image">
      </div>

      <h1 class="not-found-title">Page non trouvée</h1>

      <p class="not-found-message">
        Oups ! La page que vous recherchez semble avoir disparu ou n'existe pas.
      </p>

      <div class="suggestions">
        <p>Voici quelques suggestions :</p>
        <ul>
          <li>Vérifiez l'URL pour vous assurer qu'elle est correcte</li>
          <li>Utilisez la barre de recherche pour trouver ce que vous cherchez</li>
          <li>Consultez notre catalogue de produits</li>
        </ul>
      </div>

      <div class="action-buttons">
        <router-link to="/" class="btn primary-btn">
          Retour à l'accueil
        </router-link>
        <router-link to="/catalogue" class="btn secondary-btn">
          Voir nos produits
        </router-link>
      </div>

      <div class="featured-products" v-if="featuredProducts.length > 0">
        <h2 class="section-title">Produits populaires</h2>

        <div class="product-cards">
          <div v-for="product in featuredProducts" :key="product._id" class="product-card">
            <router-link :to="`/produit/${product._id}`" class="product-link">
              <div class="card-img-container">
                <img
                    :src="product.images"
                    :alt="product.name"
                    class="card-img"
                >
              </div>
              <div class="card-content">
                <h3 class="card-title">{{ product.name }}</h3>
                <p class="price">{{ product.price }} €</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NotFoundPage',
  data() {
    return {
      featuredProducts: []
    };
  },
  mounted() {
    this.fetchFeaturedProducts();
  },
  methods: {
    async fetchFeaturedProducts() {
      try {
        // Récupérer quelques produits populaires
        const response = await axios.get(`${this.$store.getters.apiUrl}/product/getAll`);

        // Prendre les 3 premiers produits (ou vous pourriez implémenter une logique pour choisir les produits vedettes)
        this.featuredProducts = response.data.slice(0, 3);
      } catch (error) {
        console.error('Erreur lors du chargement des produits vedettes:', error);
        this.featuredProducts = [];
      }
    }
  }
};
</script>

<style scoped>
.not-found-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
  display: flex;
  justify-content: center;
  min-height: 60vh;
}

.not-found-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  padding: 3rem 2rem;
  text-align: center;
  max-width: 800px;
  width: 100%;
}

.not-found-icon {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}

.error-code {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5rem;
  font-weight: bold;
  color: var(--primary-color);
  opacity: 0.8;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.error-image {
  opacity: 0.25;
  border-radius: 50%;
}

.not-found-title {
  font-size: 2.5rem;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.not-found-message {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.suggestions {
  text-align: left;
  max-width: 500px;
  margin: 0 auto 2.5rem;
}

.suggestions p {
  margin-bottom: 0.75rem;
  color: var(--text-color);
}

.suggestions ul {
  margin-left: 1.5rem;
  color: #666;
}

.suggestions li {
  margin-bottom: 0.5rem;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.primary-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.primary-btn:hover {
  background-color: var(--accent-color);
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.secondary-btn {
  background-color: white;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

.secondary-btn:hover {
  background-color: #f5f5f5;
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.featured-products {
  margin-top: 2rem;
  border-top: 1px solid #eee;
  padding-top: 2rem;
}

.section-title {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background-color: var(--primary-color);
}

.product-cards {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.product-card {
  flex: 0 0 auto;
  width: 180px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.product-link {
  text-decoration: none;
  color: inherit;
}

.card-img-container {
  height: 150px;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .card-img {
  transform: scale(1.05);
}

.card-content {
  padding: 1rem;
}

.card-title {
  font-size: 1rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.price {
  font-weight: bold;
  color: var(--accent-color);
}

@media screen and (max-width: 768px) {
  .not-found-content {
    padding: 2rem 1rem;
  }

  .error-code {
    font-size: 3.5rem;
  }

  .not-found-title {
    font-size: 1.8rem;
  }

  .not-found-message {
    font-size: 1rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .product-cards {
    flex-direction: column;
    align-items: center;
  }

  .product-card {
    width: 100%;
    max-width: 250px;
  }
}
</style>