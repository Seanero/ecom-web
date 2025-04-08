<template>
  <div class="cart-container">
    <h1 class="page-title">Votre Panier</h1>

    <div v-if="cartItemCount === 0" class="empty-cart">
      <div class="empty-cart-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 256 256">
          <path d="M216,64H176V56a48,48,0,0,0-96,0v8H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM96,56a32,32,0,0,1,64,0v8H96ZM216,200H40V80H216V200Z"></path>
        </svg>
      </div>
      <h2>Votre panier est vide</h2>
      <p>Découvrez nos produits et ajoutez les à votre panier</p>
      <router-link to="/catalogue" class="btn-primary">Découvrir nos produits</router-link>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <div class="cart-header">
          <div class="product-col">Produit</div>
          <div class="price-col">Prix unitaire</div>
          <div class="quantity-col">Quantité</div>
          <div class="total-col">Total</div>
          <div class="action-col"></div>
        </div>

        <div v-for="item in cartItems" :key="item._id" class="cart-item">
          <div class="product-col">
            <div class="product-image" v-if="item.images">
              <img :src="item.images" :alt="item.title">
            </div>
            <div class="product-image placeholder" v-else>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
                <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM48,48H208V156.69l-42.34-42.35a16,16,0,0,0-22.63,0L89.37,168H48ZM48,208V190.23l57.37-57.37,82.88-82.89a4,4,0,0,1,5.66,0L208,64V208ZM96,120A24,24,0,1,0,72,96,24,24,0,0,0,96,120Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,96,88Z"></path>
              </svg>
            </div>
            <div class="product-info">
              <h3 class="product-title">{{ item.name }}</h3>
              <p v-if="item.description" class="product-description">
                {{ truncateDescription(item.description) }}
              </p>
            </div>
          </div>

          <div class="price-col">{{ formatPrice(item.price) }}</div>

          <div class="quantity-col">
            <div class="quantity-control">
              <button
                  @click="decrementQuantity(item)"
                  class="quantity-btn"
                  :disabled="item.quantity <= 1"
              >-</button>
              <input
                  type="number"
                  v-model.number="item.quantity"
                  @change="updateQuantity(item)"
                  min="1"
                  :max="item.stock"
                  class="quantity-input"
              >
              <button
                  @click="incrementQuantity(item)"
                  class="quantity-btn"
              >+</button>
            </div>
          </div>

          <div class="total-col">{{ formatPrice(item.price * item.quantity) }}</div>

          <div class="action-col">
            <button class="remove-btn" @click="removeItem(item._id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                <path d="M216,48H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM192,208H64V64H192ZM80,24a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H88A8,8,0,0,1,80,24Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <div class="summary-card">
          <h2>Récapitulatif</h2>

          <div class="summary-row">
            <span>Sous-total</span>
            <span>{{ formatPrice(cartTotal) }}</span>
          </div>

          <div class="summary-row">
            <span>Frais de livraison</span>
            <span>{{ formatPrice(shippingCost) }}</span>
          </div>

          <div class="divider"></div>

          <div class="summary-row total">
            <span>Total</span>
            <span>{{ formatPrice(cartTotal + shippingCost) }}</span>
          </div>

          <button @click="checkout" class="checkout-btn">
            Passer la commande
          </button>

          <button @click="clearCart" class="clear-cart-btn">
            Vider le panier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CartPage',
  data() {
    return {
      shippingCost: 5.99 // Coût de livraison fixe pour l'exemple
    };
  },
  computed: {
    ...mapGetters('cart', [
      'cartItems',
      'cartItemCount',
      'cartTotal'
    ])
  },
  methods: {
    ...mapActions('cart', [
      'updateCartItemQuantity',
      'removeFromCart',
      'clearCart'
    ]),
    formatPrice(price) {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      }).format(price);
    },
    truncateDescription(description) {
      if (description.length > 100) {
        return description.substring(0, 100) + '...';
      }
      return description;
    },
    incrementQuantity(item) {
      this.updateCartItemQuantity({
        productId: item._id,
        quantity: item.quantity + 1
      });
    },
    decrementQuantity(item) {
      if (item.quantity > 1) {
        this.updateCartItemQuantity({
          productId: item._id,
          quantity: item.quantity - 1
        });
      }
    },
    updateQuantity(item) {
      // S'assurer que la quantité est au moins 1
      if (item.quantity < 1) {
        item.quantity = 1;
      }

      // S'assurer que la quantité est un nombre entier
      item.quantity = Math.floor(item.quantity);

      this.updateCartItemQuantity({
        productId: item._id,
        quantity: item.quantity
      });
    },
    removeItem(productId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet article du panier ?')) {
        this.removeFromCart(productId);
      }
    },
    clearCart() {
      if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
        this.clearCart();
      }
    },
    checkout() {
      // Rediriger vers la page de commande
      this.$router.push('/commande');
    }
  },
  created() {
    // Si nécessaire, initialiser le panier au chargement de la page
    // this.$store.dispatch('cart/initCart');
  }
};
</script>

<style scoped>
.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--primary-color, #2e7d32);
}

/* Panier vide */
.empty-cart {
  text-align: center;
  padding: 3rem 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.empty-cart-icon {
  margin-bottom: 1.5rem;
}

.empty-cart-icon svg {
  fill: #aaa;
  width: 64px;
  height: 64px;
}

.empty-cart h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-color, #333);
}

.empty-cart p {
  color: #666;
  margin-bottom: 1.5rem;
}

.btn-primary {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: var(--primary-color, #2e7d32);
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: var(--accent-color, #1b5e20);
}

/* Contenu du panier */
.cart-content {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2rem;
  align-items: start;
}

.cart-items {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
}

.cart-header {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 40px;
  padding: 1rem;
  background-color: var(--light-color, #f5f5f5);
  font-weight: 600;
  color: var(--text-color, #333);
}

.cart-item {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 40px;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.cart-item:last-child {
  border-bottom: none;
}

.product-col {
  display: flex;
  align-items: center;
}

.product-image {
  width: 80px;
  height: 80px;
  margin-right: 1rem;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.product-image.placeholder svg {
  fill: #ccc;
}

.product-info {
  flex: 1;
}

.product-title {
  font-size: 1rem;
  margin-bottom: 0.3rem;
  color: var(--text-color, #333);
}

.product-description {
  font-size: 0.85rem;
  color: #666;
  margin: 0;
}

.quantity-control {
  display: flex;
  align-items: center;
  width: 100px;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.quantity-btn:hover:not(:disabled) {
  background-color: #eee;
}

.quantity-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.quantity-input {
  width: 40px;
  height: 30px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 0.9rem;
  -moz-appearance: textfield;
}

.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #d32f2f;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
}

.remove-btn svg {
  fill: #d32f2f;
}

.remove-btn:hover svg {
  fill: #b71c1c;
}

/* Récapitulatif */
.cart-summary {
  position: sticky;
  top: 2rem;
}

.summary-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
}

.summary-card h2 {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: var(--text-color, #333);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  color: #555;
}

.summary-row.total {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-color, #333);
}

.divider {
  height: 1px;
  background-color: #eee;
  margin: 1rem 0;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background-color: var(--primary-color, #2e7d32);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 0.8rem;
}

.checkout-btn:hover {
  background-color: var(--accent-color, #1b5e20);
}

.clear-cart-btn {
  width: 100%;
  padding: 0.8rem 1rem;
  background-color: transparent;
  color: #d32f2f;
  border: 1px solid #d32f2f;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-cart-btn:hover {
  background-color: rgba(211, 47, 47, 0.1);
}

/* Responsive design */
@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-header {
    display: none;
  }

  .cart-item {
    grid-template-columns: 1fr;
    gap: 1rem;
    position: relative;
    padding-bottom: 1.5rem;
  }

  .product-col {
    grid-column: 1 / -1;
  }

  .price-col::before {
    content: "Prix: ";
    font-weight: 600;
  }

  .total-col::before {
    content: "Total: ";
    font-weight: 600;
  }

  .action-col {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .quantity-col {
    margin-left: 90px; /* Aligner avec l'image */
  }
}
</style>