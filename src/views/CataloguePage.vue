<template>
  <div class="catalog-container">
    <!-- En-tête de la page -->
    <div class="catalog-header">
      <h1 class="page-title">Catalogue</h1>
      <p class="catalog-description">Découvrez notre sélection de produits éco-responsables et reconditionnés.</p>
    </div>

    <!-- Section filtres et tri -->
    <div class="filters-container">
      <div class="filters-inner">
        <!-- Filtres sur desktop -->
        <div class="filters-desktop">
          <div class="filter-group">
            <h3>Filtrer par catégorie</h3>
            <div class="category-filters">
              <label v-for="category in categories" :key="category._id" class="filter-option">
                <input
                    type="checkbox"
                    :value="category._id"
                    v-model="selectedCategories"
                    @change="applyFilters"
                >
                {{ category.name }}
              </label>
            </div>
          </div>

          <div class="filter-group">
            <h3>Filtrer par prix</h3>
            <div class="price-range">
              <div class="price-inputs">
                <div class="price-input">
                  <label for="min-price">Min €</label>
                  <input
                      type="number"
                      id="min-price"
                      v-model.number="priceRange.min"
                      @change="applyFilters"
                      min="0"
                      placeholder="Min"
                  >
                </div>
                <div class="price-input">
                  <label for="max-price">Max €</label>
                  <input
                      type="number"
                      id="max-price"
                      v-model.number="priceRange.max"
                      @change="applyFilters"
                      min="0"
                      placeholder="Max"
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="filter-group">
            <h3>Disponibilité</h3>
            <label class="filter-option">
              <input
                  type="checkbox"
                  v-model="onlyInStock"
                  @change="applyFilters"
              >
              Produits en stock uniquement
            </label>
          </div>
        </div>

        <!-- Bouton mobile pour afficher/masquer les filtres -->
        <div class="filters-mobile-toggle">
          <button class="btn secondary-btn" @click="showMobileFilters = !showMobileFilters">
            {{ showMobileFilters ? 'Masquer les filtres' : 'Afficher les filtres' }}
          </button>
        </div>

        <!-- Filtres sur mobile (affichés conditionnellement) -->
        <div class="filters-mobile" v-show="showMobileFilters">
          <div class="filter-group">
            <h3>Filtrer par catégorie</h3>
            <div class="category-filters">
              <label v-for="category in categories" :key="category._id" class="filter-option">
                <input
                    type="checkbox"
                    :value="category._id"
                    v-model="selectedCategories"
                    @change="applyFilters"
                >
                {{ category.name }}
              </label>
            </div>
          </div>

          <div class="filter-group">
            <h3>Filtrer par prix</h3>
            <div class="price-range">
              <div class="price-inputs">
                <div class="price-input">
                  <label for="min-price-mobile">Min €</label>
                  <input
                      type="number"
                      id="min-price-mobile"
                      v-model.number="priceRange.min"
                      @change="applyFilters"
                      min="0"
                      placeholder="Min"
                  >
                </div>
                <div class="price-input">
                  <label for="max-price-mobile">Max €</label>
                  <input
                      type="number"
                      id="max-price-mobile"
                      v-model.number="priceRange.max"
                      @change="applyFilters"
                      min="0"
                      placeholder="Max"
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="filter-group">
            <h3>Disponibilité</h3>
            <label class="filter-option">
              <input
                  type="checkbox"
                  v-model="onlyInStock"
                  @change="applyFilters"
              >
              Produits en stock uniquement
            </label>
          </div>
        </div>
      </div>

      <div class="filter-actions">
        <!-- Options de tri -->
        <div class="sort-options">
          <label for="sort-select">Trier par :</label>
          <select id="sort-select" v-model="sortOption" @change="applySort">
            <option value="nameAsc">Nom (A-Z)</option>
            <option value="nameDesc">Nom (Z-A)</option>
            <option value="priceAsc">Prix croissant</option>
            <option value="priceDesc">Prix décroissant</option>
            <option value="newest">Plus récent</option>
            <option value="oldest">Plus ancien</option>
          </select>
        </div>

        <!-- Bouton pour réinitialiser les filtres -->
        <button class="reset-btn" @click="resetFilters">Réinitialiser les filtres</button>
      </div>
    </div>

    <!-- Informations sur les résultats et la recherche -->
    <div class="results-info">
      <div class="search-bar">
        <input
            type="text"
            placeholder="Rechercher un produit..."
            v-model="searchQuery"
            @input="applyFilters"
        >
        <button class="search-button" @click="applyFilters">
          🔍
        </button>
      </div>
      <p v-if="filteredProducts.length === 1" class="results-count">1 produit trouvé</p>
      <p v-else-if="filteredProducts.length > 0" class="results-count">{{ filteredProducts.length }} produits trouvés</p>
      <p v-else class="results-count">Aucun produit ne correspond à vos critères</p>
    </div>

    <!-- Grille de produits -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Chargement des produits...</p>
    </div>

    <div v-else-if="filteredProducts.length === 0" class="no-results">
      <div class="error-icon">🔍</div>
      <h2>Aucun produit trouvé</h2>
      <p>Essayez de modifier vos filtres ou d'effectuer une autre recherche.</p>
      <button class="reset-btn" @click="resetFilters">Réinitialiser les filtres</button>
    </div>

    <div v-else class="products-grid">
      <div v-for="product in paginatedProducts" :key="product._id" class="product-card">
        <span class="category-tag">{{ getCategoryName(product.category) }}</span>
        <router-link :to="`/produit/${product._id}`" class="product-image-link">
          <div class="product-image-container">
            <img
                :src="product.images !== 'non' ? product.images : '/api/placeholder/300/300'"
                :alt="product.name"
                class="product-image"
            >
          </div>
        </router-link>

        <div class="product-info">
          <router-link :to="`/product/${product._id}`" class="product-title-link">
            <h3 class="product-title">{{ product.name }}</h3>
          </router-link>

          <p class="product-description">{{ truncateDescription(product.description) }}</p>

          <div class="product-price">{{ product.price }} €</div>

          <div class="product-stock">
            <span class="stock-indicator" :class="{'in-stock': product.stock > 0}"></span>
            <span class="stock-text">{{ product.stock > 0 ? 'En stock' : 'Rupture de stock' }}</span>
          </div>
        </div>

        <button
            class="add-to-cart-button"
            :disabled="product.stock <= 0"
            @click="addToCart(product)"
        >
          Ajouter au panier
        </button>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination" v-if="filteredProducts.length > 0">
      <button
          class="pagination-btn"
          :disabled="currentPage === 1"
          @click="currentPage--"
      >
        Précédent
      </button>
      <span class="page-info">Page {{ currentPage }} sur {{ totalPages }}</span>
      <button
          class="pagination-btn"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
      >
        Suivant
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CataloguePage',
  data() {
    return {
      products: [],
      filteredProducts: [],
      categories: [],
      categoryMap: {}, // Map pour stocker les noms de catégories par ID
      isLoading: true,
      showMobileFilters: false,

      // Filtres et tri
      searchQuery: '',
      selectedCategories: [],
      priceRange: {
        min: null,
        max: null
      },
      onlyInStock: false,
      sortOption: 'nameAsc',

      // Pagination
      currentPage: 1,
      itemsPerPage: 12
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },

    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    }
  },
  methods: {
    getCategoryName(categoryId) {
      return this.categoryMap[categoryId] || 'Catégorie';
    },

    truncateDescription(description) {
      const maxLength = 80;
      if (description.length <= maxLength) return description;
      return description.substring(0, maxLength) + '...';
    },

    async fetchProducts() {
      try {
        const productRes = await axios.get(`${this.$store.getters.apiUrl}/product/getAll`);
        this.products = productRes.data;
        this.filteredProducts = [...this.products];
        this.applySort();
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      }
    },

    async fetchCategories() {
      try {
        const categoryRes = await axios.get(`${this.$store.getters.apiUrl}/category/getAll`);
        this.categories = categoryRes.data;

        // Créer un map des catégories pour un accès facile
        this.categories.forEach(category => {
          this.categoryMap[category._id] = category.name;
        });
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    },

    applyFilters() {
      // Réinitialiser à la première page lors de l'application des filtres
      this.currentPage = 1;

      let filtered = [...this.products];

      // Filtrer par recherche
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
      }

      // Filtrer par catégories
      if (this.selectedCategories.length > 0) {
        filtered = filtered.filter(product =>
            this.selectedCategories.includes(product.category)
        );
      }

      // Filtrer par prix minimum
      if (this.priceRange.min !== null && this.priceRange.min !== '') {
        filtered = filtered.filter(product => product.price >= this.priceRange.min);
      }

      // Filtrer par prix maximum
      if (this.priceRange.max !== null && this.priceRange.max !== '') {
        filtered = filtered.filter(product => product.price <= this.priceRange.max);
      }

      // Filtrer par disponibilité
      if (this.onlyInStock) {
        filtered = filtered.filter(product => product.stock > 0);
      }

      this.filteredProducts = filtered;
      this.applySort();
    },

    applySort() {
      // Trier les produits selon l'option sélectionnée
      switch (this.sortOption) {
        case 'nameAsc':
          this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'nameDesc':
          this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'priceAsc':
          this.filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'priceDesc':
          this.filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          this.filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'oldest':
          this.filteredProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        default:
          // Par défaut, trier par nom ascendant
          this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      }
    },

    resetFilters() {
      this.searchQuery = '';
      this.selectedCategories = [];
      this.priceRange.min = null;
      this.priceRange.max = null;
      this.onlyInStock = false;
      this.sortOption = 'nameAsc';
      this.currentPage = 1;

      this.filteredProducts = [...this.products];
      this.applySort();
    },

    async loadData() {
      this.isLoading = true;

      try {
        // Chargement parallèle des produits et des catégories
        await Promise.all([
          this.fetchProducts(),
          this.fetchCategories()
        ]);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        this.isLoading = false;
      }
    },

    addToCart(product) {
      // Cette fonction serait implémentée pour gérer l'ajout au panier
      console.log(`Produit ajouté au panier: ${product.name}`);

      // Vous pourriez émettre un événement ou appeler une action de votre store
      // this.$store.dispatch('cart/addItem', product);

      // Afficher une notification
      this.showNotification(`${product.name} a été ajouté au panier`);
    },

    showNotification(message) {
      // Fonction pour afficher une notification
      // À implémenter selon votre système de notification
      alert(message); // Version basique, à remplacer par votre système
    }
  },
  mounted() {
    this.loadData();
  },
  watch: {
    // Surveiller les changements de page pour repositionner l'écran si nécessaire
    currentPage() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}
</script>

<style scoped>
/* Styles généraux */
.catalog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.catalog-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.catalog-description {
  color: #666;
  max-width: 800px;
  margin: 0 auto;
}

/* Filtres et tri */
.filters-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.filters-inner {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filters-desktop {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.filter-group {
  min-width: 200px;
  flex: 1;
}

.filter-group h3 {
  font-size: 1rem;
  margin-bottom: 0.8rem;
  color: var(--primary-color);
}

.category-filters {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.filter-option input[type="checkbox"] {
  margin: 0;
}

.price-range {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.price-inputs {
  display: flex;
  gap: 1rem;
}

.price-input {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.price-input label {
  font-size: 0.9rem;
  color: #666;
}

.price-input input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filter-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sort-options label {
  color: #666;
}

.sort-options select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 180px;
}

.reset-btn {
  background-color: white;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background-color: var(--primary-color);
  color: white;
}

/* Informations sur les résultats */
.results-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.results-count {
  color: #666;
}

.search-bar {
  display: flex;
  max-width: 400px;
  flex: 1;
}

.search-bar input {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  border-right: none;
}

.search-button {
  padding: 0.8rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: var(--accent-color);
}

/* Grille de produits */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Styles des cartes produit */
.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.category-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--primary-color);
  color: white;
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  z-index: 1;
}

.product-image-container {
  height: 180px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-image-link:hover .product-image {
  transform: scale(1.05);
}

.product-info {
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: var(--text-color);
}

.product-title-link {
  text-decoration: none;
  color: inherit;
}

.product-title-link:hover .product-title {
  color: var(--primary-color);
}

.product-description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  flex-grow: 1;
}

.product-price {
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--accent-color);
  margin-bottom: 0.75rem;
}

.product-stock {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
}

.stock-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ccc;
}

.stock-indicator.in-stock {
  background-color: #2e7d32; /* Couleur verte */
}

.stock-text {
  color: #666;
}

.add-to-cart-button {
  width: 100%;
  padding: 0.8rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: auto;
}

.add-to-cart-button:hover:not(:disabled) {
  background-color: var(--accent-color);
}

.add-to-cart-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  background-color: var(--primary-color);
  color: white;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  border-color: #ccc;
  color: #999;
}

.page-info {
  color: var(--text-color);
  font-size: 0.95rem;
}

/* État de chargement */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Aucun résultat */
.no-results {
  text-align: center;
  padding: 4rem 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #666;
}

/* Responsive */
.filters-mobile-toggle {
  display: none;
}

.filters-mobile {
  display: none;
}

@media screen and (max-width: 768px) {
  .filters-desktop {
    display: none;
  }

  .filters-mobile-toggle {
    display: flex;
    justify-content: center;
  }

  .filters-mobile {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
  }

  .filter-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .sort-options {
    width: 100%;
  }

  .results-info {
    flex-direction: column;
    align-items: stretch;
  }

  .search-bar {
    max-width: 100%;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>