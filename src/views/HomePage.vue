<script>
import axios from "axios";

export default {
  name: "HomePage",
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
}
</script>

<template>
  <section class="hero">
    <h1>Technologie Responsable</h1>
    <p>Découvrez notre gamme de produits informatiques neufs et reconditionnés pour une consommation tech plus écologique et accessible.</p>
    <router-link to="/catalogue" class="btn">Découvrir nos produits</router-link>
  </section>

  <section class="services">
    <h2 class="section-title">Nos Offres</h2>
    <div class="cards">
      <div class="card">
        <img src="../assets/img/reconditionne.png" alt="Produits reconditionnés" class="card-img">
        <div class="card-content">
          <h3 class="card-title">Produits Reconditionnés</h3>
          <p>Des appareils soigneusement testés et remis à neuf pour une seconde vie, avec garantie incluse.</p>
        </div>
      </div>
      <div class="card">
        <img src="../assets/img/neuf-eco.png" alt="Produits neufs eco-responsables" class="card-img">
        <div class="card-content">
          <h3 class="card-title">Produits Neufs Éco-conçus</h3>
          <p>Une sélection de matériel neuf choisi pour sa durabilité, réparabilité et son impact environnemental réduit.</p>
        </div>
      </div>
      <div class="card">
        <img src="../assets/img/reprise.png" alt="Service de reprise" class="card-img">
        <div class="card-content">
          <h3 class="card-title">Reprise et Recyclage</h3>
          <p>Nous rachetons votre ancien matériel ou le recyclons conformément aux normes environnementales.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="eco-impact">
    <h2 class="section-title">Notre Impact Écologique</h2>
    <div class="impact-content">
      <div class="impact-item">
        <div class="impact-icon">♻️</div>
        <h3>Réduction des Déchets</h3>
        <p>Chaque appareil reconditionné évite la production de 30 à 90 kg de déchets électroniques.</p>
      </div>
      <div class="impact-item">
        <div class="impact-icon">💧</div>
        <h3>Économie d'Eau</h3>
        <p>Acheter reconditionné permet d'économiser jusqu'à 13 000 litres d'eau par smartphone.</p>
      </div>
      <div class="impact-item">
        <div class="impact-icon">⚡</div>
        <h3>Réduction de CO2</h3>
        <p>Jusqu'à 70% d'émissions de CO2 en moins comparé à l'achat d'un produit neuf.</p>
      </div>
    </div>
  </section>

  <section class="featured-products">
    <h2 class="section-title">Produits Populaires</h2>
    <div class="cards">
      <div class="card product-card" v-for="product in featuredProducts">
        <span class="product-badge">Reconditionné</span>
        <img :src="product.images" alt="Smartphone reconditionné" class="card-img">
        <div class="card-content">
          <h3 class="card-title">{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p class="price">{{ product.price }} €</p>
          <a href="#" class="btn">Ajouter au panier</a>
        </div>
      </div>
    </div>
  </section>

  <section class="testimonials">
    <h2 class="section-title">Avis Clients</h2>
    <div class="testimonial-content">
      <div class="testimonial-card">
        <p class="testimonial-text">"J'ai acheté un smartphone reconditionné il y a 6 mois et il fonctionne parfaitement. Je recommande vivement TechNatura pour leur service client et leur engagement écologique."</p>
        <div class="testimonial-author">
          <img src="../assets/img/img.png" alt="Photo de profil" class="author-img">
          <div>
            <h4>Marie Dupont</h4>
            <p>Cliente depuis 2024</p>
          </div>
        </div>
      </div>
      <div class="testimonial-card">
        <p class="testimonial-text">"Le rapport qualité-prix est excellent et j'apprécie vraiment la transparence sur l'impact environnemental de chaque produit. Mon ordinateur reconditionné est comme neuf!"</p>
        <div class="testimonial-author">
          <img src="../assets/img/img.png" alt="Photo de profil" class="author-img">
          <div>
            <h4>Thomas Martin</h4>
            <p>Client depuis 2023</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('../assets/img/hero-bg.png') center/cover no-repeat;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 0 1rem;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  max-width: 700px;
  margin-bottom: 2rem;
}

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

.services {
  padding: 4rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
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

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
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
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.eco-impact {
  padding: 4rem 1rem;
  background-color: var(--secondary-color);
  color: var(--dark-color);
}

.impact-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.impact-item {
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.impact-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.featured-products {
  padding: 4rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  position: relative;
}

.product-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--accent-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.price {
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--accent-color);
  margin: 1rem 0;
}

.testimonials {
  padding: 4rem 1rem;
  background-color: var(--light-color);
}

.testimonial-content {
  max-width: 1200px;
  margin: 0 auto;
}

.testimonial-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.testimonial-text {
  font-style: italic;
  margin-bottom: 1rem;
}

.testimonial-author {
  display: flex;
  align-items: center;
}

.author-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
}
</style>
