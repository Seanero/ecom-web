<script>
import axios from 'axios';

export default {
  name: "ProductPage",
  props: ['idProduct'],
  data(){
    return {
      waitResponse: true,
      doExist: true,
      product: {},
      category: {}
    }
  },
  async mounted() {
    try {
      const productRes = await axios.get(`${this.$store.getters.apiUrl}/product/get/${this.idProduct}`);
      this.product = productRes.data;
      console.log("Produit :", this.product);

      try {
        const categoryRes = await axios.get(`${this.$store.getters.apiUrl}/category/get/${this.product.category}`);
        this.category = categoryRes.data;
        console.log("Catégorie :", this.category);
      } catch (catErr) {
        console.error("Erreur lors de la récupération de la catégorie :", catErr);
        this.category = null;
      }

    } catch (err) {
      const status = err.response?.status;
      console.error("Erreur lors de la récupération du produit :", err);

      if (status === 404 || status === 400) {
        // Soit le produit n'existe pas, soit l'ID est mal formé
        this.doExist = false;
      }
    } finally {
      this.waitResponse = false;
    }
  }
}
</script>

<template>
  <div class="container" v-if="!waitResponse">
    <div class="not-found-container" v-if="!doExist">
      <div class="error-card">
        <div class="error-icon">❓</div>
        <h1 class="error-title">Produit non trouvé</h1>
        <p class="error-message">Nous n'avons pas pu trouver le produit que vous recherchez.</p>
        <div class="error-details">
          <p>Il est possible que ce produit :</p>
          <ul>
            <li>Ait été retiré de notre catalogue</li>
            <li>Soit temporairement indisponible</li>
            <li>Ait changé d'identifiant</li>
            <li>N'ait jamais existé dans notre base de données</li>
          </ul>
        </div>
        <div class="action-buttons">
          <router-link to="/" class="btn primary-btn">Retour à l'accueil</router-link>
          <router-link to="/products" class="btn secondary-btn">Voir tous les produits</router-link>
        </div>

        <!--<div class="suggested-products" v-if="suggestedProducts.length > 0">
          <h2 class="section-title">Produits qui pourraient vous intéresser</h2>
          <div class="cards">
            <div class="card product-card" v-for="product in suggestedProducts" :key="product.id">
              <span class="product-badge">{{ product.condition }}</span>
              <img :src="product.image" :alt="product.name" class="card-img">
              <div class="card-content">
                <h3 class="card-title">{{ product.name }}</h3>
                <p>{{ product.shortDescription }}</p>
                <p class="price">{{ product.price }} €</p>
                <router-link :to="'/product/' + product.id" class="btn">Voir le produit</router-link>
              </div>
            </div>
          </div>
        </div>-->
      </div>
    </div>
    <div class="Exist" v-else>
      <div class="breadcrumb">
        <a href="#">Accueil</a> > <a href="#">Produits</a> > <a href="#">{{ category.name }}</a> > {{ product.name }}
      </div>

      <main class="product-container">
        <div class="product-image">
          <img :src="product.images" alt="Smartphone XYZ Pro">
        </div>
        <div class="product-details">
          <span class="product-badge">Reconditionné</span>
          <h1 class="product-title">{{ product.name }}</h1>
          <div class="product-description">
            <p>{{ product.description }}</p>
            <!--<ul style="margin-top: 1rem; margin-left: 1.5rem;">
              <li>Écran OLED 6.5" haute résolution</li>
              <li>Processeur octa-core ultra rapide</li>
              <li>Mémoire : 8GB RAM, 256GB de stockage</li>
              <li>Batterie remplacée à 100% de capacité</li>
              <li>Triple caméra arrière 48MP + 12MP + 8MP</li>
              <li>Système d'exploitation dernier en date</li>
            </ul>-->
          </div>
          <p class="product-price">{{ product.price }} €</p>
          <p class="product-stock stock-available" v-if="product.stock >= 50">En stock : {{ product.stock }} unités disponibles</p>
          <p class="product-stock stock-limited" v-else-if="1 <= product.stock < 50">En stock : {{ product.stock }} unités disponibles</p>
          <p class="product-stock stock-unavailable" v-else>Hors stock : {{ product.stock }} unités disponibles</p>
          <div class="quantity-selector">
            <label for="quantity">Quantité :</label>
            <input type="number" id="quantity" name="quantity" min="1" :max="product.stock" value="1">
          </div>
          <div class="product-actions">
            <button class="btn add-to-cart">Ajouter au panier</button>
            <button class="btn add-to-wishlist">❤ Wishlist</button>
          </div>
          <div class="product-meta">
            <p><strong>Catégorie :</strong> {{ category.name }}</p>
            <p><strong>État :</strong> Comme Neuf (Grade A+)</p>
            <p><strong>Garantie :</strong> 24 mois</p>
            <p><strong>Impact CO2 :</strong> -85% par rapport au neuf</p>
          </div>
        </div>
      </main>

      <section class="similar-products">
        <h2 class="section-title">Produits Similaires</h2>
        <div class="cards">
          <div class="card product-card">
            <span class="product-badge">Reconditionné</span>
            <img src="../assets/img/img.png" alt="Smartphone ABC" class="card-img">
            <div class="card-content">
              <h3 class="card-title">Smartphone ABC - Bon État</h3>
              <p>Écran 6.1", 128GB, batterie 95%</p>
              <p class="price">299 €</p>
              <a href="#" class="btn">Voir le produit</a>
            </div>
          </div>
          <div class="card product-card">
            <span class="product-badge">Reconditionné</span>
            <img src="../assets/img/img.png" alt="Smartphone DEF" class="card-img">
            <div class="card-content">
              <h3 class="card-title">Smartphone DEF - Excellent État</h3>
              <p>Écran 6.3", 256GB, batterie neuve</p>
              <p class="price">359 €</p>
              <a href="#" class="btn">Voir le produit</a>
            </div>
          </div>
          <div class="card product-card">
            <span class="product-badge">Éco-conçu</span>
            <img src="../assets/img/img.png" alt="Smartphone GHI" class="card-img">
            <div class="card-content">
              <h3 class="card-title">Smartphone GHI - Neuf</h3>
              <p>Écran 6.2", 128GB, 3 ans de MAJ garanties</p>
              <p class="price">499 €</p>
              <a href="#" class="btn">Voir le produit</a>
            </div>
          </div>
          <div class="card product-card">
            <span class="product-badge">Reconditionné</span>
            <img src="../assets/img/img.png" alt="Smartphone JKL" class="card-img">
            <div class="card-content">
              <h3 class="card-title">Smartphone JKL - Comme Neuf</h3>
              <p>Écran 6.7", 512GB, haut de gamme</p>
              <p class="price">599 €</p>
              <a href="#" class="btn">Voir le produit</a>
            </div>
          </div>
        </div>
      </section>
    </div>
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <p>{{ product.price }}</p>
    <span>{{ product.stock }}</span>
  </div>
</template>

<style scoped>
.btn {
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 0.8rem 1.5rem;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background-color: var(--accent-color);
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.primary-btn {
  background-color: var(--primary-color);
  color: white;
}

.primary-btn:hover {
  background-color: var(--accent-color);
}

.secondary-btn {
  background-color: white;
  color: var(--text-color);
  border: 1px solid #ddd;
}

.secondary-btn:hover {
  background-color: #f5f5f5;
  color: var(--primary-color);
}

/* Fil d'Ariane */
.breadcrumb {
  max-width: 1200px;
  margin: 1rem auto;
  padding: 0 1rem;
  font-size: 0.9rem;
}

.breadcrumb a {
  color: var(--primary-color);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

/* Conteneurs */
.product-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.not-found-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.error-card {
  background-color: white;
  border-radius: 8px;
  padding: 3rem 2rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
}

/* Images produit */
.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
  transition: all 0.3s ease;
}

.product-image img:hover {
  transform: scale(1.05);
}

/* Détails produit */
.product-details {
  display: flex;
  flex-direction: column;
}

.product-badge {
  display: inline-block;
  background-color: var(--accent-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  align-self: flex-start;
}

.product-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.product-description {
  margin-bottom: 2rem;
}

.product-price {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 1rem;
}

/* États du stock */
.product-stock {
  margin-bottom: 2rem;
  font-weight: 500;
}

.stock-available {
  color: var(--primary-color);
}

.stock-limited {
  color: orange;
}

.stock-unavailable {
  color: red;
}

/* Sélection quantité */
.quantity-selector {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.quantity-selector label {
  margin-right: 1rem;
}

.quantity-selector input {
  width: fit-content;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

/* Actions produit */
.product-actions {
  display: flex;
  gap: 1rem;
}

.add-to-cart {
  flex: 2;
}

.add-to-wishlist {
  flex: 1;
  background-color: white;
  color: var(--text-color);
  border: 1px solid #ddd;
}

.add-to-wishlist:hover {
  background-color: #f5f5f5;
  color: var(--primary-color);
}

/* Métadonnées produit */
.product-meta {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.product-meta p {
  margin-bottom: 0.5rem;
  color: #666;
}

/* Page erreur */
.error-icon {
  font-size: 4rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.error-title {
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.error-message {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.error-details {
  max-width: 600px;
  margin: 0 auto 2rem;
  text-align: left;
}

.error-details ul {
  margin-top: 0.5rem;
  margin-left: 1.5rem;
}

.error-details li {
  margin-bottom: 0.5rem;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

/* Sections et titres */
.similar-products {
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 1rem;
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  color: var(--text-color);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background-color: var(--primary-color);
}

/* Cartes de produits */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.card-img {
  height: 200px;
  width: 100%;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--accent-color);
  margin: 0.5rem 0 1rem;
}

.product-card {
  position: relative;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr;
  }

  .product-actions {
    flex-direction: column;
  }

  .action-buttons {
    flex-direction: column;
  }

  .error-card {
    padding: 2rem 1rem;
  }
}
</style>