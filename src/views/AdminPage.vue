<template>
  <div class="admin-container">
    <!-- Écran de chargement -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p>Chargement...</p>
    </div>

    <!-- Message d'accès refusé -->
    <div v-else-if="!isAdmin" class="access-denied">
      <div class="access-denied-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 256 256">
          <path d="M208.5,112h-9.1V88a80,80,0,1,0-160,0v24H30.3a14.3,14.3,0,0,0-14.3,14.3V208.7A14.3,14.3,0,0,0,30.3,223H208.5a14.3,14.3,0,0,0,14.3-14.3V126.3A14.3,14.3,0,0,0,208.5,112ZM63.1,88a55.4,55.4,0,1,1,110.8,0v24H63.1Zm87.4,71.5V178a16,16,0,0,1-32,0v-18.5a16,16,0,0,1,32,0Z"></path>
        </svg>
      </div>
      <h2>Accès refusé</h2>
      <p>Cette section est réservée aux administrateurs. Vous n'avez pas les droits nécessaires pour y accéder.</p>
      <router-link to="/" class="btn-primary">Retour à l'accueil</router-link>
    </div>

    <!-- Dashboard d'administration -->
    <div v-else class="admin-dashboard">
      <!-- Header du dashboard -->
      <header class="admin-header">
        <h1>Administration</h1>
        <div class="admin-actions">
          <button class="btn-secondary" @click="refreshData">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
              <path d="M197.66,186.34a8,8,0,0,1,0,11.32C196.58,198.73,170.82,224,128,224c-40.35,0-68.32-30.12-84.45-58.15l-14,17.49A8,8,0,0,1,16,176V128a8,8,0,0,1,8-8h48a8,8,0,0,1,6.33,12.88L63.69,151.5c11.28,20.66,31.43,40.5,64.31,40.5,35.95,0,56.56-20.85,58.6-22.92A8,8,0,0,1,197.66,186.34ZM232,80v48a8,8,0,0,1-8,8H176a8,8,0,0,1-6.33-12.88l14.63-18.62c-11.27-20.66-31.43-40.5-64.3-40.5-35.95,0-56.56,20.85-58.6,22.92a8,8,0,1,1-11.06-11.58C51.42,73.27,77.18,48,120,48c40.35,0,68.32,30.12,84.45,58.16l14-17.5A8,8,0,0,1,232,80Z"></path>
            </svg>
            Actualiser
          </button>
          <span class="admin-user">Connecté en tant que: {{ user.firstname }} {{ user.lastname }}</span>
        </div>
      </header>

      <!-- Navigation du dashboard -->
      <div class="admin-navigation">
        <div
            v-for="tab in tabs"
            :key="tab.id"
            :class="['admin-nav-item', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
        >
          <span class="admin-nav-icon" v-html="tab.icon"></span>
          <span class="admin-nav-text">{{ tab.label }}</span>
        </div>
      </div>

      <!-- Contenu principal du dashboard -->
      <div class="admin-content">
        <!-- Gestion des catégories -->
        <div v-if="activeTab === 'categories'" class="admin-section">
          <div class="section-header">
            <h2>Gestion des catégories</h2>
            <button class="btn-primary" @click="openCategoryModal()">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
                <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
              </svg>
              Ajouter une catégorie
            </button>
          </div>

          <!-- Recherche de catégories -->
          <div class="search-box">
            <input
                type="text"
                v-model="categorySearch"
                placeholder="Rechercher une catégorie..."
                class="search-input"
            >
          </div>

          <!-- Liste des catégories -->
          <div class="data-table">
            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Nombre de produits</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="filteredCategories.length === 0">
                <td colspan="4" class="empty-table">Aucune catégorie trouvée</td>
              </tr>
              <tr v-for="category in filteredCategories" :key="category._id">
                <td>{{ category._id }}</td>
                <td>{{ category.name }}</td>
                <td>{{ category.productCount || 0 }}</td>
                <td class="action-cell">
                  <button class="btn-icon edit" @click="openCategoryModal(category)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
                      <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160l90.35-90.35L160,88l-90.35,90.35ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188l90.35-90.35L188,116Z"></path>
                    </svg>
                  </button>
                  <button class="btn-icon delete" @click="deleteCategory(category._id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
                      <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Gestion des produits -->
        <div v-if="activeTab === 'products'" class="admin-section">
          <div class="section-header">
            <h2>Gestion des produits</h2>
            <button class="btn-primary" @click="openProductModal()">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
                <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
              </svg>
              Ajouter un produit
            </button>
          </div>

          <!-- Recherche et filtres de produits -->
          <div class="filters-container">
            <div class="search-box">
              <input
                  type="text"
                  v-model="productSearch"
                  placeholder="Rechercher un produit..."
                  class="search-input"
              >
            </div>
            <div class="filter-dropdown">
              <select v-model="productCategoryFilter">
                <option value="">Toutes les catégories</option>
                <option v-for="category in categories" :key="category._id" :value="category._id">
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Liste des produits -->
          <div class="data-table">
            <table>
              <thead>
              <tr>
                <th>Image</th>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="filteredProducts.length === 0">
                <td colspan="6" class="empty-table">Aucun produit trouvé</td>
              </tr>
              <tr v-for="product in filteredProducts" :key="product._id">
                <td class="img-cell">
                  <div class="product-image">
                    <img v-if="product.images" :src="product.images" :alt="product.title">
                    <div v-else class="image-placeholder">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
                        <path d="M208,40H48A16,16,0,0,0,32,56V200a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V56A16,16,0,0,0,208,40ZM48,56H208v80H176L156,116a8,8,0,0,0-13.66,1.69L128.68,144H92a8,8,0,0,0-5.65,2.34L67.59,136H48ZM208,200H48V164.3l25.63,8.56a8,8,0,0,0,9.18-2.94L98.53,160h36a8,8,0,0,0,6.56-3.43L155.73,136H208v64Z"></path>
                      </svg>
                    </div>
                  </div>
                </td>
                <td>{{ product.title }}</td>
                <td>{{ getCategoryName(product.category) }}</td>
                <td>{{ formatPrice(product.price) }}</td>
                <td :class="getStockClass(product.stock)">{{ product.stock }}</td>
                <td class="action-cell">
                  <button class="btn-icon view" @click="viewProduct(product._id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
                      <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
                    </svg>
                  </button>
                  <button class="btn-icon edit" @click="openProductModal(product)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
                      <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160l90.35-90.35L160,88l-90.35,90.35ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188l90.35-90.35L188,116Z"></path>
                    </svg>
                  </button>
                  <button class="btn-icon delete" @click="deleteProduct(product._id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
                      <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="pagination">
            <button
                class="pagination-btn"
                :disabled="currentPage === 1"
                @click="currentPage--"
            >
              &laquo; Précédent
            </button>
            <span class="pagination-info">
              Page {{ currentPage }} sur {{ totalPages }}
            </span>
            <button
                class="pagination-btn"
                :disabled="currentPage === totalPages"
                @click="currentPage++"
            >
              Suivant &raquo;
            </button>
          </div>
        </div>

        <!-- Gestion des utilisateurs -->
        <div v-if="activeTab === 'users'" class="admin-section">
          <div class="section-header">
            <h2>Gestion des utilisateurs</h2>
          </div>

          <!-- Recherche et filtres d'utilisateurs -->
          <div class="filters-container">
            <div class="search-box">
              <input
                  type="text"
                  v-model="userSearch"
                  placeholder="Rechercher un utilisateur..."
                  class="search-input"
              >
            </div>
            <div class="filter-dropdown">
              <select v-model="userRoleFilter">
                <option value="">Tous les rôles</option>
                <option value="user">Utilisateurs</option>
                <option value="admin">Administrateurs</option>
              </select>
            </div>
          </div>

          <!-- Liste des utilisateurs -->
          <div class="data-table">
            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Date d'inscription</th>
                <th>Dernière connexion</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="filteredUsers.length === 0">
                <td colspan="7" class="empty-table">Aucun utilisateur trouvé</td>
              </tr>
              <tr v-for="user in filteredUsers" :key="user._id">
                <td>{{ user._id }}</td>
                <td>{{ user.firstname }} {{ user.lastname }}</td>
                <td>{{ user.email }}</td>
                <td>
                    <span class="role-badge" :class="user.role">
                      {{ user.role === 'admin' ? 'Administrateur' : 'Utilisateur' }}
                    </span>
                </td>
                <td>{{ formatDate(user.createdAt) }}</td>
                <td>{{ user.lastLogin ? formatDate(user.lastLogin) : 'Jamais' }}</td>
                <td class="action-cell">
                  <button class="btn-icon edit" @click="openUserModal(user)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
                      <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160l90.35-90.35L160,88l-90.35,90.35ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188l90.35-90.35L188,116Z"></path>
                    </svg>
                  </button>
                  <button
                      class="btn-icon reset-password"
                      @click="resetUserPassword(user._id)"
                      title="Réinitialiser le mot de passe"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
                      <path d="M208,80H172V56a44,44,0,0,0-88,0v24H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM100,56a28,28,0,0,1,56,0v24H100ZM208,208H48V96H208V208Zm-100-80a12,12,0,1,1,12,12A12,12,0,0,1,108,128Z"></path>
                    </svg>
                  </button>
                  <button
                      v-if="user._id !== currentUserId"
                      class="btn-icon delete"
                      @click="deleteUser(user._id)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
                      <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal pour catégorie -->
    <div v-if="showCategoryModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ editingCategoryId ? 'Modifier la catégorie' : 'Ajouter une catégorie' }}</h3>
          <button class="btn-close" @click="showCategoryModal = false">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveCategory">
            <div class="form-group">
              <label for="category-name">Nom de la catégorie</label>
              <input
                  type="text"
                  id="category-name"
                  v-model="categoryForm.name"
                  required
                  class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="category-description">Description</label>
              <textarea
                  id="category-description"
                  v-model="categoryForm.description"
                  class="form-control"
                  rows="3"
              ></textarea>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-secondary" @click="showCategoryModal = false">Annuler</button>
              <button type="submit" class="btn-primary">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal pour produit -->
    <div v-if="showProductModal" class="modal-overlay">
      <div class="modal-container product-modal">
        <div class="modal-header">
          <h3>{{ editingProductId ? 'Modifier le produit' : 'Ajouter un produit' }}</h3>
          <button class="btn-close" @click="showProductModal = false">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveProduct">
            <div class="form-row">
              <div class="form-group">
                <label for="product-title">Titre du produit</label>
                <input
                    type="text"
                    id="product-title"
                    v-model="productForm.title"
                    required
                    class="form-control"
                >
              </div>
              <div class="form-group">
                <label for="product-category">Catégorie</label>
                <select
                    id="product-category"
                    v-model="productForm.category"
                    required
                    class="form-control"
                >
                  <option value="" disabled>Sélectionner une catégorie</option>
                  <option v-for="category in categories" :key="category._id" :value="category._id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="product-price">Prix (€)</label>
                <input
                    type="number"
                    id="product-price"
                    v-model="productForm.price"
                    required
                    min="0"
                    step="0.01"
                    class="form-control"
                >
              </div>
              <div class="form-group">
                <label for="product-stock">Stock</label>
                <input
                    type="number"
                    id="product-stock"
                    v-model="productForm.stock"
                    required
                    min="0"
                    class="form-control"
                >
              </div>
            </div>
            <div class="form-group">
              <label for="product-description">Description</label>
              <textarea
                  id="product-description"
                  v-model="productForm.description"
                  class="form-control"
                  rows="4"
                  required
              ></textarea>
            </div>
            <div class="form-group">
              <label for="product-image">Image URL</label>
              <input
                  type="text"
                  id="product-image"
                  v-model="productForm.image"
                  class="form-control"
                  placeholder="http://example.com/image.jpg"
              >
              <div class="image-preview" v-if="productForm.image">
                <img :src="productForm.image" alt="Aperçu du produit">
              </div>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-secondary" @click="showProductModal = false">Annuler</button>
              <button type="submit" class="btn-primary">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal pour utilisateur -->
    <div v-if="showUserModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Modifier l'utilisateur</h3>
          <button class="btn-close" @click="showUserModal = false">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveUser">
            <div class="form-row">
              <div class="form-group">
                <label for="user-firstname">Prénom</label>
                <input
                    type="text"
                    id="user-firstname"
                    v-model="userForm.firstname"
                    required
                    class="form-control"
                >
              </div>
              <div class="form-group">
                <label for="user-lastname">Nom</label>
                <input
                    type="text"
                    id="user-lastname"
                    v-model="userForm.lastname"
                    required
                    class="form-control"
                >
              </div>
            </div>
            <div class="form-group">
              <label for="user-email">Email</label>
              <input
                  type="email"
                  id="user-email"
                  v-model="userForm.email"
                  required
                  class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="user-role">Rôle</label>
              <select
                  id="user-role"
                  v-model="userForm.role"
                  required
                  class="form-control"
                  :disabled="userForm._id === currentUserId"
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
              </select>
              <div class="form-hint" v-if="userForm._id === currentUserId">
                Vous ne pouvez pas modifier votre propre rôle.
              </div>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-secondary" @click="showUserModal = false">Annuler</button>
              <button type="submit" class="btn-primary">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'AdminDashboard',
  data() {
    return {
      isLoading: true,
      activeTab: 'categories',

      // Données
      categories: [],
      products: [],
      users: [],

      // Filtres et recherche
      categorySearch: '',
      productSearch: '',
      userSearch: '',
      productCategoryFilter: '',
      userRoleFilter: '',

      // Pagination
      currentPage: 1,
      itemsPerPage: 10,

      // Formulaires et modales
      showCategoryModal: false,
      showProductModal: false,
      showUserModal: false,

      editingCategoryId: null,
      editingProductId: null,

      categoryForm: {
        name: '',
        description: ''
      },

      productForm: {
        title: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        image: ''
      },

      userForm: {
        _id: '',
        firstname: '',
        lastname: '',
        email: '',
        role: 'user'
      },

      // Configuration des onglets
      tabs: [
        {
          id: 'categories',
          label: 'Catégories',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM32,64H168V192H40a8,8,0,0,1-8-8Zm192,128a8,8,0,0,1-8,8H184V64h40Z"></path></svg>'
        },
        {
          id: 'products',
          label: 'Produits',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M243.32,148.35l-14.43-14.43a24,24,0,0,0-31.94-1.38l-54.65-54.65h0L127.94,63.52h0L116.69,74.77,54.49,12.57a8,8,0,0,0-11.15-.19L26.4,26.33a8,8,0,0,0,.25,11.62L60.82,69.58,27.31,103.08a8,8,0,0,0,0,11.31l54.3,54.31a8,8,0,0,0,11.31,0l33.51-33.51,15.67,15.67a24,24,0,0,0,1.37,31.94l14.43,14.43a24,24,0,0,0,33.94,0l51.48-51.48A24,24,0,0,0,243.32,148.35Zm-175.1-57L91.85,83.69,44.49,26.33,54.49,20.1l83.57,83.58-10.1,10.1ZM83.23,157,38.63,112.39,67,84l11.32,11.31,18.39,18.39L126,142.93Zm137.47-2.31L169.22,206.14a8,8,0,0,1-11.31,0l-14.43-14.43a8,8,0,0,1,0-11.31l51.48-51.48a8,8,0,0,1,11.31,0l14.43,14.43A8,8,0,0,1,220.7,154.66Z"></path></svg>'
        },
        {
          id: 'users',
          label: 'Utilisateurs',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M125.18,156.94a64,64,0,1,0-82.36,0,100.23,100.23,0,0,0-39.49,32,12,12,0,0,0,19.35,14.2,76,76,0,0,1,122.64,0,12,12,0,0,0,19.36-14.2A100.33,100.33,0,0,0,125.18,156.94ZM44,108a40,40,0,1,1,40,40A40,40,0,0,1,44,108Zm206.1,97.67a12,12,0,0,1-16.78-2.58A76.31,76.31,0,0,0,172,172a12,12,0,0,1,0-24,40,40,0,1,0-14.85-77.16,12,12,0,1,1-8.92-22.28,64,64,0,0,1,65,108.38,100.23,100.23,0,0,1,39.49,32A12,12,0,0,1,250.1,205.67Z"></path></svg>'
        }
      ],
      error: null
    };
  },
  computed: {
    ...mapGetters('auth', [
      'user',
      'isAuthenticated'
    ]),

    isAdmin() {
      return this.isAuthenticated && this.user && this.user.role === 'admin';
    },

    currentUserId() {
      return this.user ? this.user._id : '';
    },

    filteredCategories() {
      if (!this.categorySearch) {
        return this.categories;
      }

      const search = this.categorySearch.toLowerCase();
      return this.categories.filter(category =>
          category.name.toLowerCase().includes(search) ||
          (category.description && category.description.toLowerCase().includes(search))
      );
    },

    filteredProducts() {
      let result = [...this.products];

      // Filtre par recherche
      if (this.productSearch) {
        const search = this.productSearch.toLowerCase();
        result = result.filter(product =>
            product.title.toLowerCase().includes(search) ||
            (product.description && product.description.toLowerCase().includes(search))
        );
      }

      // Filtre par catégorie
      if (this.productCategoryFilter) {
        result = result.filter(product => product.category === this.productCategoryFilter);
      }

      // Paginer les résultats
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return result.slice(start, end);
    },

    filteredUsers() {
      let result = [...this.users];

      // Filtre par recherche
      if (this.userSearch) {
        const search = this.userSearch.toLowerCase();
        result = result.filter(user =>
            user.firstname.toLowerCase().includes(search) ||
            user.lastname.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search)
        );
      }

      // Filtre par rôle
      if (this.userRoleFilter) {
        result = result.filter(user => user.role === this.userRoleFilter);
      }

      return result;
    },

    totalPages() {
      if (this.products.length === 0) return 1;

      let filteredCount = this.products.length;

      // Appliquer les filtres pour le comptage
      if (this.productSearch) {
        const search = this.productSearch.toLowerCase();
        filteredCount = this.products.filter(product =>
            product.title.toLowerCase().includes(search) ||
            (product.description && product.description.toLowerCase().includes(search))
        ).length;
      }

      if (this.productCategoryFilter) {
        filteredCount = this.products.filter(product =>
            product.category === this.productCategoryFilter
        ).length;
      }

      return Math.ceil(filteredCount / this.itemsPerPage);
    }
  },
  methods: {
    // Méthodes utilitaires
    formatPrice(price) {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      }).format(price);
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    },

    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat._id === categoryId);
      return category ? category.name : 'Non catégorisé';
    },

    getStockClass(stock) {
      if (stock <= 0) return 'stock-out';
      if (stock < 5) return 'stock-low';
      return '';
    },

    setError(error) {
      const msg = error.response?.data?.message || 'Une erreur est survenue';
      this.error = msg;
    },

    clearError() {
      this.error = null;
    },

    async refreshData() {
      this.isLoading = true;
      this.clearError();

      try {
        await Promise.all([
          this.fetchCategories(),
          this.fetchProducts(),
          this.fetchUsers()
        ]);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        this.setError('Erreur lors du chargement des données. Veuillez réessayer.');
      } finally {
        this.isLoading = false;
      }
    },

    // Méthodes d'API avec structure similaire au module auth
    async fetchCategories() {
      this.isLoading = true;
      this.clearError();

      try {
        const res = await axios.get(`${this.$store.state.apiUrl}/category/getAll`, {
          withCredentials: true
        });

        if (res.data) {
          this.categories = res.data;

          // Compter les produits par catégorie si les produits sont déjà chargés
          if (this.products.length > 0) {
            this.categories.forEach(category => {
              category.productCount = this.products.filter(
                  product => product.category === category._id
              ).length;
            });
          }
          return true;
        }
        throw new Error('Réponse inattendue');
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        this.setError(error.response?.data?.message || 'Erreur lors de la récupération des catégories');
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchProducts() {
      this.isLoading = true;
      this.clearError();

      try {
        const res = await axios.get(`${this.$store.state.apiUrl}/product/getAll`, {
          withCredentials: true
        });

        if (res.data) {
          this.products = res.data;

          // Mettre à jour les compteurs de produits pour les catégories
          if (this.categories.length > 0) {
            this.categories.forEach(category => {
              category.productCount = this.products.filter(
                  product => product.category === category._id
              ).length;
            });
          }
          return true;
        }
        throw new Error('Réponse inattendue');
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        this.setError(error.response?.data?.message || 'Erreur lors de la récupération des produits');
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchUsers() {
      this.isLoading = true;
      this.clearError();

      try {
        const res = await axios.get(`${this.$store.state.apiUrl}/users`, {
          withCredentials: true
        });

        if (res.data) {
          this.users = res.data;
          return true;
        }
        throw new Error('Réponse inattendue');
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        this.setError(error.response?.data?.message || 'Erreur lors de la récupération des utilisateurs');
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    // Gestion des catégories
    openCategoryModal(category = null) {
      this.clearError();

      if (category) {
        this.editingCategoryId = category._id;
        this.categoryForm = {
          name: category.name,
          description: category.description || ''
        };
      } else {
        this.editingCategoryId = null;
        this.categoryForm = {
          name: '',
          description: ''
        };
      }

      this.showCategoryModal = true;
    },

    async saveCategory() {
      this.isLoading = true;
      this.clearError();

      try {
        let res;
        if (this.editingCategoryId) {
          // Mettre à jour une catégorie existante
          res = await axios.put(
              `${this.$store.state.apiUrl}/categories/${this.editingCategoryId}`,
              this.categoryForm,
              { withCredentials: true }
          );
        } else {
          // Créer une nouvelle catégorie
          res = await axios.post(
              `${this.$store.state.apiUrl}/categories`,
              this.categoryForm,
              { withCredentials: true }
          );
        }

        // Vérifier la réponse
        if (res.data?.success || res.status === 201 || res.status === 200) {
          // Recharger les catégories
          await this.fetchCategories();

          // Fermer la modale
          this.showCategoryModal = false;

          // Message de succès
          this.$emit('showMessage', {
            type: 'success',
            text: this.editingCategoryId
                ? 'Catégorie mise à jour avec succès'
                : 'Catégorie créée avec succès'
          });

          return { success: true };
        }

        throw new Error('Format de réponse non reconnu');
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de la catégorie:', error);
        this.setError(error.response?.data?.message || 'Erreur lors de la sauvegarde de la catégorie');
        return { success: false, message: this.error };
      } finally {
        this.isLoading = false;
      }
    },

    async deleteCategory(categoryId) {
      // Vérifier si des produits utilisent cette catégorie
      const productsInCategory = this.products.filter(product => product.category === categoryId);

      if (productsInCategory.length > 0) {
        this.setError(`Impossible de supprimer cette catégorie : ${productsInCategory.length} produit(s) y sont associés.`);
        return { success: false, message: this.error };
      }

      if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
        return { success: false, canceled: true };
      }

      this.isLoading = true;
      this.clearError();

      try {
        const res = await axios.delete(
            `${this.$store.state.apiUrl}/categories/${categoryId}`,
            { withCredentials: true }
        );

        if (res.data?.success || res.status === 200 || res.status === 204) {
          // Recharger les catégories
          await this.fetchCategories();

          // Message de succès
          this.$emit('showMessage', {
            type: 'success',
            text: 'Catégorie supprimée avec succès'
          });

          return { success: true };
        }

        throw new Error('Format de réponse non reconnu');
      } catch (error) {
        console.error('Erreur lors de la suppression de la catégorie:', error);
        this.setError(error.response?.data?.message || 'Erreur lors de la suppression de la catégorie');
        return { success: false, message: this.error };
      } finally {
        this.isLoading = false;
      }
    },

    // Gestion des produits
    openProductModal(product = null) {
      this.clearError();

      if (product) {
        this.editingProductId = product._id;
        this.productForm = { ...product };
      } else {
        this.editingProductId = null;
        this.productForm = {
          title: '',
          description: '',
          price: 0,
          stock: 0,
          category: this.categories.length ? this.categories[0]._id : '',
          image: ''
        };
      }

      this.showProductModal = true;
    },

    async saveProduct() {
      this.isLoading = true;
      this.clearError();

      try {
        let res;
        if (this.editingProductId) {
          // Mettre à jour un produit existant
          res = await axios.put(
              `${this.$store.state.apiUrl}/products/${this.editingProductId}`,
              this.productForm,
              { withCredentials: true }
          );
        } else {
          // Créer un nouveau produit
          res = await axios.post(
              `${this.$store.state.apiUrl}/products`,
              this.productForm,
              { withCredentials: true }
          );
        }

        // Vérifier la réponse
        if (res.data?.success || res.status === 201 || res.status === 200) {
          // Recharger les produits
          await this.fetchProducts();

          // Fermer la modale
          this.showProductModal = false;

          // Message de succès
          this.$emit('showMessage', {
            type: 'success',
            text: this.editingProductId
                ? 'Produit mis à jour avec succès'
                : 'Produit créé avec succès'
          });

          return { success: true };
        }

        throw new Error('Format de réponse non reconnu');
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du produit:', error);
        this.setError(error.response?.data?.message || 'Erreur lors de la sauvegarde du produit');
        return { success: false, message: this.error };
      } finally {
        this.isLoading = false;
      }
    },

    async deleteProduct(productId) {
      if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
        return { success: false, canceled: true };
      }

      this.isLoading = true;
      this.clearError();

      try {
        const res = await axios.delete(
            `${this.$store.state.apiUrl}/products/${productId}`,
            { withCredentials: true }
        );

        if (res.data?.success || res.status === 200 || res.status === 204) {
          // Recharger les produits
          await this.fetchProducts();

          // Message de succès
          this.$emit('showMessage', {
            type: 'success',
            text: 'Produit supprimé avec succès'
          });

          return { success: true };
        }

        throw new Error('Format de réponse non reconnu');
      } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error);
        this.setError(error.response?.data?.message || 'Erreur lors de la suppression du produit');
        return { success: false, message: this.error };
      } finally {
        this.isLoading = false;
      }
    },

    viewProduct(productId) {
      // Rediriger vers la page produit en front-end
      this.$router.push(`/produit/${productId}`);
    },

    // Gestion des utilisateurs
    openUserModal(user) {
      this.clearError();
      this.userForm = { ...user };
      this.showUserModal = true;
    },

    async saveUser() {
      this.isLoading = true;
      this.clearError();

      try {
        // On ne peut pas changer son propre rôle
        if (this.userForm._id === this.currentUserId) {
          this.userForm.role = this.user.role;
        }

        const updateData = {
          user: this.userForm._id,
          edit: {
            firstname: this.userForm.firstname,
            lastname: this.userForm.lastname,
            email: this.userForm.email,
            role: this.userForm.role
          }
        };

        const res = await axios.post(`${this.$store.state.apiUrl}/users/edit`, updateData, {
          withCredentials: true
        });

        if (res.data?.code === 'USER_UPDATED' || res.status === 200) {
          // Recharger les utilisateurs
          await this.fetchUsers();

          // Fermer la modale
          this.showUserModal = false;

          // Message de succès
          this.$emit('showMessage', {
            type: 'success',
            text: 'Utilisateur mis à jour avec succès'
          });

          return { success: true };
        }

        throw new Error('Format de réponse non reconnu');
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de l\'utilisateur:', error);
        this.setError(error.response?.data?.message || 'Erreur lors de la sauvegarde de l\'utilisateur');
        return { success: false, message: this.error };
      } finally {
        this.isLoading = false;
      }
    },

    async deleteUser(userId) {
      // Ne pas permettre de supprimer l'utilisateur courant
      if (userId === this.currentUserId) {
        this.setError('Vous ne pouvez pas supprimer votre propre compte');
        return { success: false, message: this.error };
      }

      if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        return { success: false, canceled: true };
      }

      this.isLoading = true;
      this.clearError();

      try {
        const res = await axios.delete(
            `${this.$store.state.apiUrl}/users/${userId}`,
            { withCredentials: true }
        );

        if (res.data?.success || res.status === 200 || res.status === 204) {
          // Recharger les utilisateurs
          await this.fetchUsers();

          // Message de succès
          this.$emit('showMessage', {
            type: 'success',
            text: 'Utilisateur supprimé avec succès'
          });

          return { success: true };
        }

        throw new Error('Format de réponse non reconnu');
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        this.setError(error.response?.data?.message || 'Erreur lors de la suppression de l\'utilisateur');
        return { success: false, message: this.error };
      } finally {
        this.isLoading = false;
      }
    },

    async resetUserPassword(userId) {
      if (!confirm('Êtes-vous sûr de vouloir réinitialiser le mot de passe de cet utilisateur ?')) {
        return { success: false, canceled: true };
      }

      this.isLoading = true;
      this.clearError();

      try {
        const res = await axios.post(
            `${this.$store.state.apiUrl}/users/reset-password`,
            { userId },
            { withCredentials: true }
        );

        if (res.data?.success || res.status === 200) {
          // Message de succès
          this.$emit('showMessage', {
            type: 'success',
            text: 'Mot de passe réinitialisé avec succès. Un email a été envoyé à l\'utilisateur.'
          });

          return { success: true };
        }

        throw new Error('Format de réponse non reconnu');
      } catch (error) {
        console.error('Erreur lors de la réinitialisation du mot de passe:', error);
        this.setError(error.response?.data?.message || 'Erreur lors de la réinitialisation du mot de passe');
        return { success: false, message: this.error };
      } finally {
        this.isLoading = false;
      }
    }
  },
  async created() {
    // Vérifier si l'utilisateur est connecté et est un administrateur
    if (!this.isAuthenticated) {
      await this.$store.dispatch('auth/checkAuth');
    }

    // Charger les données si l'utilisateur est un admin
    if (this.isAdmin) {
      this.refreshData();
    } else {
      this.isLoading = false;
    }
  },
  watch: {
    // Réinitialiser la pagination lors du changement de filtre
    productSearch() {
      this.currentPage = 1;
    },
    productCategoryFilter() {
      this.currentPage = 1;
    }
  }
};
</script>

<style scoped>
.admin-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
  position: relative;
  min-height: 600px;
}

/* Écran de chargement */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(46, 125, 50, 0.3);
  border-radius: 50%;
  border-top-color: var(--primary-color, #2e7d32);
  animation: spin 1s infinite linear;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Accès refusé */
.access-denied {
  text-align: center;
  padding: 3rem 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  max-width: 500px;
  margin: 2rem auto;
}

.access-denied-icon {
  margin-bottom: 1.5rem;
}

.access-denied-icon svg {
  fill: #d32f2f;
  width: 64px;
  height: 64px;
}

.access-denied h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #d32f2f;
}

.access-denied p {
  margin-bottom: 2rem;
  color: #666;
}

.btn-primary {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: var(--primary-color, #2e7d32);
  color: white;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.btn-secondary {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--accent-color, #1b5e20);
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

/* Dashboard d'administration */
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.admin-header h1 {
  font-size: 2rem;
  color: var(--primary-color, #2e7d32);
  margin: 0;
}

.admin-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.admin-user {
  font-size: 0.9rem;
  color: #666;
}

.admin-navigation {
  display: flex;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
  overflow: hidden;
}

.admin-nav-item {
  flex: 1;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 3px solid transparent;
}

.admin-nav-item:hover {
  background-color: #f9f9f9;
}

.admin-nav-item.active {
  background-color: #f5f5f5;
  border-bottom: 3px solid var(--primary-color, #2e7d32);
}

.admin-nav-icon svg {
  fill: #666;
  width: 24px;
  height: 24px;
}

.admin-nav-item.active .admin-nav-icon svg {
  fill: var(--primary-color, #2e7d32);
}

.admin-nav-text {
  font-weight: 500;
  color: #333;
}

.admin-content {
  min-height: 400px;
}

.admin-section {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.5rem;
  color: #333;
  margin: 0;
}

.btn-primary svg {
  margin-right: 0.5rem;
  fill: white;
}

.search-box {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.filters-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.search-box {
  flex: 1;
  margin-bottom: 0;
}

.filter-dropdown select {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  min-width: 200px;
}

/* Tables */
.data-table {
  overflow-x: auto;
  margin-bottom: 1.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f5f5f5;
}

th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #333;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.empty-table {
  text-align: center;
  color: #888;
  padding: 2rem !important;
}

.img-cell {
  width: 80px;
}

.product-image {
  width: 60px;
  height: 60px;
  background-color: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.image-placeholder svg {
  fill: #ccc;
}

.action-cell {
  width: 120px;
  white-space: nowrap;
}

.btn-icon {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 0.3rem;
}

.btn-icon.view {
  background-color: #e3f2fd;
}

.btn-icon.edit {
  background-color: #e8f5e9;
}

.btn-icon.delete {
  background-color: #ffebee;
}

.btn-icon.reset-password {
  background-color: #fff3e0;
}

.btn-icon.view svg {
  fill: #2196f3;
}

.btn-icon.edit svg {
  fill: #4caf50;
}

.btn-icon.delete svg {
  fill: #f44336;
}

.btn-icon.reset-password svg {
  fill: #ff9800;
}

.btn-icon.view:hover {
  background-color: #bbdefb;
}

.btn-icon.edit:hover {
  background-color: #c8e6c9;
}

.btn-icon.delete:hover {
  background-color: #ffcdd2;
}

.btn-icon.reset-password:hover {
  background-color: #ffe0b2;
}

.stock-out {
  color: #d32f2f;
  font-weight: 600;
}

.stock-low {
  color: #ff9800;
  font-weight: 600;
}

.role-badge {
  display: inline-block;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.role-badge.admin {
  background-color: #e3f2fd;
  color: #2196f3;
}

.role-badge.user {
  background-color: #e8f5e9;
  color: #4caf50;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  color: #666;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  padding: 1rem;
  overflow-y: auto;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.modal-container.product-modal {
  max-width: 800px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.3rem;
  color: #333;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #888;
}

.btn-close:hover {
  color: #333;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-color, #2e7d32);
  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
}

.form-hint {
  font-size: 0.85rem;
  color: #888;
  margin-top: 0.3rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.image-preview {
  margin-top: 1rem;
  text-align: center;
}

.image-preview img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 4px;
  border: 1px solid #eee;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .admin-actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .admin-navigation {
    flex-direction: column;
  }

  .admin-nav-item {
    flex-direction: row;
    justify-content: flex-start;
    padding-left: 2rem;
  }

  .filters-container {
    flex-direction: column;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .action-cell {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>