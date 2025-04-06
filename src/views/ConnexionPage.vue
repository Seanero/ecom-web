<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <div class="logo">
          <img src="../assets/img/logo.png" alt="TechNatura Logo" class="logo-img">
          <h1>TechNatura</h1>
        </div>
        <h2 class="page-title">Connexion</h2>
        <p class="subtitle">Accédez à votre espace client pour gérer vos commandes et produits</p>
      </div>

      <form class="login-form" @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Email</label>
          <div class="input-with-icon">
            <span class="input-icon">✉️</span>
            <input
                type="email"
                id="email"
                v-model="email"
                placeholder="votre@email.com"
                required
                :class="{ 'error': emailError }"
            >
          </div>
          <p class="error-message" v-if="emailError">{{ emailError }}</p>
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <div class="input-with-icon">
            <span class="input-icon">🔒</span>
            <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                placeholder="Votre mot de passe"
                required
                :class="{ 'error': passwordError }"
            >
            <button
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
                tabindex="-1"
            >
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
          <p class="error-message" v-if="passwordError">{{ passwordError }}</p>
        </div>

        <div class="form-options">
          <div class="remember-me">
            <input type="checkbox" id="remember" v-model="rememberMe">
            <label for="remember">Se souvenir de moi</label>
          </div>
          <router-link to="/reset-password" class="forgot-password">Mot de passe oublié ?</router-link>
        </div>

        <button type="submit" class="login-btn" :disabled="isLoading">
          <span v-if="isLoading" class="spinner"></span>
          <span v-else>Se connecter</span>
        </button>
      </form>

      <div class="register-option">
        <p>Vous n'avez pas de compte ?</p>
        <router-link to="/inscription" class="register-link">Créer un compte</router-link>
      </div>
    </div>

    <div class="benefits-section">
      <h3>Les avantages de votre compte TechNatura</h3>
      <ul class="benefits-list">
        <li class="benefit-item">
          <div class="benefit-icon">📦</div>
          <div class="benefit-content">
            <h4>Suivi de commandes</h4>
            <p>Suivez vos commandes en temps réel et accédez à l'historique complet</p>
          </div>
        </li>
        <li class="benefit-item">
          <div class="benefit-icon">💸</div>
          <div class="benefit-content">
            <h4>Offres exclusives</h4>
            <p>Accédez à des promotions réservées aux membres</p>
          </div>
        </li>
        <li class="benefit-item">
          <div class="benefit-icon">💬</div>
          <div class="benefit-content">
            <h4>Support prioritaire</h4>
            <p>Bénéficiez d'un accès privilégié à notre service client</p>
          </div>
        </li>
        <li class="benefit-item">
          <div class="benefit-icon">🌱</div>
          <div class="benefit-content">
            <h4>Impact écologique</h4>
            <p>Suivez votre contribution personnelle à la réduction d'émissions CO2</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false,
      isLoading: false,
      emailError: '',
      passwordError: ''
    };
  },
  methods: {
    validateForm() {
      let isValid = true;
      this.emailError = '';
      this.passwordError = '';

      // Validation de l'email
      if (!this.email) {
        this.emailError = 'Veuillez saisir votre adresse email';
        isValid = false;
      } else if (!this.isValidEmail(this.email)) {
        this.emailError = 'Veuillez saisir une adresse email valide';
        isValid = false;
      }

      // Validation du mot de passe
      if (!this.password) {
        this.passwordError = 'Veuillez saisir votre mot de passe';
        isValid = false;
      } else if (this.password.length < 6) {
        this.passwordError = 'Le mot de passe doit contenir au moins 6 caractères';
        isValid = false;
      }

      return isValid;
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }

      this.isLoading = true;

      try {
        // Simuler un délai d'API pour l'exemple (à remplacer par un vrai appel API)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // À remplacer par votre logique de connexion réelle
        // Par exemple:
        // const response = await this.$store.dispatch('auth/login', {
        //   email: this.email,
        //   password: this.password,
        //   rememberMe: this.rememberMe
        // });

        // Redirection après connexion
        this.$router.push('/compte');

      } catch (error) {
        console.error('Erreur de connexion:', error);
        // Gérer les erreurs de connexion
        if (error.response && error.response.status === 401) {
          this.passwordError = 'Email ou mot de passe incorrect';
        } else {
          alert('Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.login-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  padding: 2.5rem;
  width: 100%;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
}

.logo-img {
  height: 50px;
  margin-right: 10px;
}

.logo h1 {
  font-size: 1.8rem;
  color: var(--primary-color);
  margin: 0;
}

.page-title {
  font-size: 1.8rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  margin-bottom: 1.5rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: #999;
  font-size: 1.2rem;
}

.form-group input {
  padding: 0.8rem 1rem 0.8rem 2.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
}

.form-group input.error {
  border-color: #d32f2f;
}

.error-message {
  color: #d32f2f;
  font-size: 0.85rem;
  margin-top: 0.3rem;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #999;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.forgot-password {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.login-btn:hover:not(:disabled) {
  background-color: var(--accent-color);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s infinite linear;
  display: inline-block;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.social-login {
  margin-top: 2rem;
}

.divider {
  text-align: center;
  position: relative;
  color: #999;
  margin-bottom: 1.5rem;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background-color: #ddd;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background-color: white;
  padding: 0 15px;
  position: relative;
  z-index: 1;
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-btn {
  flex: 1;
  max-width: 150px;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.google:hover {
  background-color: #f8f8f8;
  border-color: #4285F4;
  color: #4285F4;
}

.facebook:hover {
  background-color: #f8f8f8;
  border-color: #3b5998;
  color: #3b5998;
}

.register-option {
  margin-top: 2rem;
  text-align: center;
}

.register-option p {
  margin-bottom: 0.5rem;
  color: #666;
}

.register-link {
  color: var(--primary-color);
  font-weight: 500;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}

/* Section des avantages */
.benefits-section {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  padding: 2.5rem;
}

.benefits-section h3 {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  text-align: center;
}

.benefits-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.benefit-icon {
  font-size: 1.5rem;
  padding: 0.5rem;
  background-color: rgba(46, 125, 50, 0.1);
  border-radius: 50%;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
}

.benefit-content h4 {
  margin: 0 0 0.3rem;
  color: var(--text-color);
}

.benefit-content p {
  margin: 0;
  color: #666;
}

/* Responsive design */
@media (max-width: 768px) {
  .login-container {
    grid-template-columns: 1fr;
    padding: 2rem 1rem;
  }

  .login-card {
    padding: 1.5rem;
  }

  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .social-buttons {
    flex-direction: column;
    width: 100%;
  }

  .social-btn {
    max-width: none;
  }
}
</style>