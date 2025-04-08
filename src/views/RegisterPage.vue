<template>
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <div class="logo">
          <img src="../assets/img/logo.png" alt="TechNatura Logo" class="logo-img">
          <h1>TechNatura</h1>
        </div>
        <h2 class="page-title">Créer un compte</h2>
        <p class="subtitle">Rejoignez-nous pour une expérience tech plus responsable</p>
      </div>

      <!-- Message d'erreur global -->
      <div v-if="authError" class="global-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>{{ authError }}</span>
      </div>

      <form class="register-form" @submit.prevent="submitForm">
        <!-- Informations personnelles -->
        <div class="form-section">
          <h3 class="section-title">Informations personnelles</h3>

          <div class="form-row">
            <div class="form-group">
              <label for="firstname">Prénom*</label>
              <input
                  type="text"
                  id="firstname"
                  v-model="formData.firstname"
                  placeholder="Votre prénom"
                  required
                  :class="{ 'error': formErrors.firstname }"
              >
              <p class="error-message" v-if="formErrors.firstname">{{ formErrors.firstname }}</p>
            </div>

            <div class="form-group">
              <label for="lastname">Nom*</label>
              <input
                  type="text"
                  id="lastname"
                  v-model="formData.lastname"
                  placeholder="Votre nom"
                  required
                  :class="{ 'error': formErrors.lastname }"
              >
              <p class="error-message" v-if="formErrors.lastname">{{ formErrors.lastname }}</p>
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email*</label>
            <input
                type="email"
                id="email"
                v-model="formData.email"
                placeholder="votre@email.com"
                required
                :class="{ 'error': formErrors.email }"
            >
            <p class="error-message" v-if="formErrors.email">{{ formErrors.email }}</p>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="password">Mot de passe*</label>
              <div class="password-input">
                <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="formData.password"
                    placeholder="Votre mot de passe"
                    required
                    :class="{ 'error': formErrors.password }"
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
              <p class="error-message" v-if="formErrors.password">{{ formErrors.password }}</p>
            </div>

            <div class="form-group">
              <label for="confirmPassword">Confirmer le mot de passe*</label>
              <input
                  :type="showPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  v-model="formData.confirmPassword"
                  placeholder="Confirmez votre mot de passe"
                  required
                  :class="{ 'error': formErrors.confirmPassword }"
              >
              <p class="error-message" v-if="formErrors.confirmPassword">{{ formErrors.confirmPassword }}</p>
            </div>
          </div>
        </div>

        <!-- Adresse de facturation -->
        <div class="form-section">
          <h3 class="section-title">Adresse de facturation</h3>

          <div class="form-group">
            <label for="line1">Adresse*</label>
            <input
                type="text"
                id="line1"
                v-model="formData.invoiceAddress.line1"
                placeholder="Numéro et nom de rue"
                required
                :class="{ 'error': formErrors.invoiceAddress?.line1 }"
            >
            <p class="error-message" v-if="formErrors.invoiceAddress?.line1">{{ formErrors.invoiceAddress.line1 }}</p>
          </div>

          <div class="form-group">
            <label for="line2">Complément d'adresse</label>
            <input
                type="text"
                id="line2"
                v-model="formData.invoiceAddress.line2"
                placeholder="Appartement, bâtiment, étage, etc."
                :class="{ 'error': formErrors.invoiceAddress?.line2 }"
            >
            <p class="error-message" v-if="formErrors.invoiceAddress?.line2">{{ formErrors.invoiceAddress.line2 }}</p>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="postalCode">Code postal*</label>
              <input
                  type="text"
                  id="postalCode"
                  v-model="formData.invoiceAddress.postalCode"
                  placeholder="Code postal"
                  required
                  :class="{ 'error': formErrors.invoiceAddress?.postalCode }"
              >
              <p class="error-message" v-if="formErrors.invoiceAddress?.postalCode">{{ formErrors.invoiceAddress.postalCode }}</p>
            </div>

            <div class="form-group">
              <label for="city">Ville*</label>
              <input
                  type="text"
                  id="city"
                  v-model="formData.invoiceAddress.city"
                  placeholder="Ville"
                  required
                  :class="{ 'error': formErrors.invoiceAddress?.city }"
              >
              <p class="error-message" v-if="formErrors.invoiceAddress?.city">{{ formErrors.invoiceAddress.city }}</p>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="stateOrDepartment">Département*</label>
              <input
                  type="text"
                  id="stateOrDepartment"
                  v-model="formData.invoiceAddress.stateOrDepartment"
                  placeholder="Ex: Paris, Rhône, etc."
                  required
                  :class="{ 'error': formErrors.invoiceAddress?.stateOrDepartment }"
              >
              <p class="error-message" v-if="formErrors.invoiceAddress?.stateOrDepartment">{{ formErrors.invoiceAddress.stateOrDepartment }}</p>
            </div>

            <div class="form-group">
              <label for="country">Pays*</label>
              <select
                  id="country"
                  v-model="formData.invoiceAddress.country"
                  required
                  :class="{ 'error': formErrors.invoiceAddress?.country }"
              >
                <option value="" disabled selected>Sélectionnez un pays</option>
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Suisse">Suisse</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Canada">Canada</option>
                <option value="Autre">Autre</option>
              </select>
              <p class="error-message" v-if="formErrors.invoiceAddress?.country">{{ formErrors.invoiceAddress.country }}</p>
            </div>
          </div>
        </div>

        <!-- Conditions et newsletter -->
        <div class="form-section">
          <div class="checkbox-group">
            <input type="checkbox" id="terms" v-model="formData.termsAccepted" required>
            <label for="terms" :class="{ 'error-text': formErrors.termsAccepted }">
              J'accepte les <router-link to="/legals" class="terms-link">conditions générales</router-link> et la <router-link to="/privacy" class="terms-link">politique de confidentialité</router-link>*
            </label>
          </div>
          <p class="error-message" v-if="formErrors.termsAccepted">{{ formErrors.termsAccepted }}</p>

          <div class="checkbox-group">
            <input type="checkbox" id="newsletter" v-model="formData.newsletterSubscribed">
            <label for="newsletter">
              Je souhaite recevoir la newsletter et les offres exclusives
            </label>
          </div>
        </div>

        <div class="password-strength" v-if="formData.password">
          <div class="strength-label">Force du mot de passe:</div>
          <div class="strength-meter">
            <div
                class="strength-value"
                :style="{ width: passwordStrength.percentage + '%' }"
                :class="passwordStrength.class"
            ></div>
          </div>
          <div class="strength-text" :class="passwordStrength.class">{{ passwordStrength.label }}</div>
        </div>

        <button type="submit" class="register-btn" :disabled="isSubmitting || isLoading">
          <span v-if="isSubmitting || isLoading" class="spinner"></span>
          <span v-else>Créer mon compte</span>
        </button>

        <p class="login-option">
          Vous avez déjà un compte ? <router-link to="/connexion" class="login-link">Se connecter</router-link>
        </p>
      </form>
    </div>

    <div class="register-benefits">
      <h3>Rejoignez la communauté TechNatura</h3>

      <div class="benefits-list">
        <div class="benefit-item">
          <div class="benefit-icon">🌱</div>
          <div class="benefit-content">
            <h4>Technologie responsable</h4>
            <p>Accédez à une sélection de produits éco-conçus et reconditionnés qui réduisent l'impact environnemental.</p>
          </div>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">💰</div>
          <div class="benefit-content">
            <h4>Économies garanties</h4>
            <p>Bénéficiez de prix avantageux et d'offres exclusives réservées à nos membres.</p>
          </div>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">📱</div>
          <div class="benefit-content">
            <h4>Qualité certifiée</h4>
            <p>Tous nos produits reconditionnés sont testés et garantis pour votre tranquillité d'esprit.</p>
          </div>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">🔒</div>
          <div class="benefit-content">
            <h4>Données sécurisées</h4>
            <p>Vos informations personnelles sont protégées selon les normes les plus strictes.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'RegisterPage',
  data() {
    return {
      formData: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        invoiceAddress: {
          line1: '',
          line2: '',
          postalCode: '',
          city: '',
          stateOrDepartment: '',
          country: 'France'
        },
        termsAccepted: false,
        newsletterSubscribed: false
      },
      formErrors: {},
      showPassword: false,
      isSubmitting: false
    };
  },
  computed: {
    // Récupération des getters du module auth
    ...mapGetters('auth', [
      'isAuthenticated',
      'authError',
      'isLoading'
    ]),
    passwordStrength() {
      const password = this.formData.password;
      if (!password) {
        return { percentage: 0, class: '', label: '' };
      }

      // Calculer la force du mot de passe
      let strength = 0;

      // Longueur
      if (password.length >= 8) strength += 25;

      // Caractères spéciaux
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;

      // Chiffres
      if (/\d/.test(password)) strength += 25;

      // Mélange majuscules/minuscules
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;

      // Définir la classe et le label en fonction de la force
      let strengthClass = '';
      let strengthLabel = '';

      if (strength <= 25) {
        strengthClass = 'weak';
        strengthLabel = 'Faible';
      } else if (strength <= 50) {
        strengthClass = 'medium';
        strengthLabel = 'Moyen';
      } else if (strength <= 75) {
        strengthClass = 'good';
        strengthLabel = 'Bon';
      } else {
        strengthClass = 'strong';
        strengthLabel = 'Fort';
      }

      return {
        percentage: strength,
        class: strengthClass,
        label: strengthLabel
      };
    }
  },
  methods: {
    // Récupération des actions du module auth
    ...mapActions('auth', [
      'register',
      'login',
      'checkAuth'
    ]),
    validateForm() {
      this.formErrors = {};
      let isValid = true;

      // Validation du prénom
      if (!this.formData.firstname.trim()) {
        this.formErrors.firstname = 'Le prénom est requis';
        isValid = false;
      } else if (this.formData.firstname.length < 3) {
        this.formErrors.firstname = 'Le prénom doit contenir au moins 3 caractères';
        isValid = false;
      }

      // Validation du nom
      if (!this.formData.lastname.trim()) {
        this.formErrors.lastname = 'Le nom est requis';
        isValid = false;
      } else if (this.formData.lastname.length < 3) {
        this.formErrors.lastname = 'Le nom doit contenir au moins 3 caractères';
        isValid = false;
      }

      // Validation de l'email
      if (!this.formData.email.trim()) {
        this.formErrors.email = 'L\'email est requis';
        isValid = false;
      } else if (!this.isValidEmail(this.formData.email)) {
        this.formErrors.email = 'Veuillez entrer un email valide';
        isValid = false;
      }

      // Validation du mot de passe
      if (!this.formData.password) {
        this.formErrors.password = 'Le mot de passe est requis';
        isValid = false;
      } else if (this.formData.password.length < 3) {
        this.formErrors.password = 'Le mot de passe doit contenir au moins 3 caractères';
        isValid = false;
      }

      // Validation de la confirmation du mot de passe
      if (this.formData.password !== this.formData.confirmPassword) {
        this.formErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        isValid = false;
      }

      // Validation de l'adresse
      if (!this.formData.invoiceAddress.line1.trim()) {
        if (!this.formErrors.invoiceAddress) this.formErrors.invoiceAddress = {};
        this.formErrors.invoiceAddress.line1 = 'L\'adresse est requise';
        isValid = false;
      }

      // Validation du code postal
      if (!this.formData.invoiceAddress.postalCode.trim()) {
        if (!this.formErrors.invoiceAddress) this.formErrors.invoiceAddress = {};
        this.formErrors.invoiceAddress.postalCode = 'Le code postal est requis';
        isValid = false;
      } else if (!/^\d{5}$/.test(this.formData.invoiceAddress.postalCode) && this.formData.invoiceAddress.country === 'France') {
        if (!this.formErrors.invoiceAddress) this.formErrors.invoiceAddress = {};
        this.formErrors.invoiceAddress.postalCode = 'Le code postal doit contenir 5 chiffres';
        isValid = false;
      }

      // Validation de la ville
      if (!this.formData.invoiceAddress.city.trim()) {
        if (!this.formErrors.invoiceAddress) this.formErrors.invoiceAddress = {};
        this.formErrors.invoiceAddress.city = 'La ville est requise';
        isValid = false;
      }

      // Validation du département
      if (!this.formData.invoiceAddress.stateOrDepartment.trim()) {
        if (!this.formErrors.invoiceAddress) this.formErrors.invoiceAddress = {};
        this.formErrors.invoiceAddress.stateOrDepartment = 'Le département est requis';
        isValid = false;
      }

      // Validation du pays
      if (!this.formData.invoiceAddress.country) {
        if (!this.formErrors.invoiceAddress) this.formErrors.invoiceAddress = {};
        this.formErrors.invoiceAddress.country = 'Le pays est requis';
        isValid = false;
      }

      // Validation des conditions générales
      if (!this.formData.termsAccepted) {
        this.formErrors.termsAccepted = 'Vous devez accepter les conditions générales';
        isValid = false;
      }

      return isValid;
    },
    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    async submitForm() {
      if (!this.validateForm()) {
        // Faire défiler jusqu'à la première erreur
        const firstErrorElement = document.querySelector('.error, .error-text');
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      this.isSubmitting = true;

      try {
        // Préparation des données à envoyer (sans la confirmPassword)
        const userData = {
          firstname: this.formData.firstname,
          lastname: this.formData.lastname,
          email: this.formData.email,
          password: this.formData.password,
          invoiceAddress: {
            line1: this.formData.invoiceAddress.line1,
            line2: this.formData.invoiceAddress.line2 || '',
            postalCode: this.formData.invoiceAddress.postalCode,
            city: this.formData.invoiceAddress.city,
            stateOrDepartment: this.formData.invoiceAddress.stateOrDepartment,
            country: this.formData.invoiceAddress.country
          }
        };

        // Appel à l'action register du store Vuex
        const result = await this.register(userData);

        if (result && result.success) {
          // Si l'inscription est réussie, on connecte l'utilisateur
          const loginResult = await this.login({
            email: this.formData.email,
            password: this.formData.password
          });

          if (loginResult && loginResult.success) {
            // Redirection vers la page d'accueil ou le tableau de bord
            this.$router.push('/mon-compte');
          } else {
            // Redirection vers la page de connexion si l'authentification automatique échoue
            this.$router.push({
              path: '/connexion',
              query: { registered: 'success' }
            });
          }
        } else {
          // L'erreur est gérée par le module Vuex et accessible via le getter authError
          // Faire défiler jusqu'au message d'erreur global
          const errorElement = document.querySelector('.global-error');
          if (errorElement) {
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
      } finally {
        this.isSubmitting = false;
      }
    }
  },
  created() {
    // Si l'utilisateur est déjà connecté, rediriger vers la page d'accueil
    if (this.isAuthenticated) {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.register-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2rem;
  align-items: start;
}

/* Message d'erreur global */
.global-error {
  background-color: rgba(211, 47, 47, 0.1);
  color: #d32f2f;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  border-left: 4px solid #d32f2f;
}

.error-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  stroke: #d32f2f;
}

.register-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  padding: 2rem;
}

.register-header {
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
  margin-bottom: 0.5rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-section {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.section-title {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
}

.form-group input.error,
.form-group select.error {
  border-color: #d32f2f;
}

.error-message {
  color: #d32f2f;
  font-size: 0.85rem;
  margin-top: 0.3rem;
}

.error-text {
  color: #d32f2f;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #999;
}

.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.checkbox-group input {
  margin-top: 0.3rem;
}

.checkbox-group label {
  font-size: 0.95rem;
  color: var(--text-color);
}

.terms-link {
  color: var(--primary-color);
  text-decoration: none;
}

.terms-link:hover {
  text-decoration: underline;
}

.password-strength {
  margin: 1rem 0;
}

.strength-label {
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  color: #666;
}

.strength-meter {
  height: 6px;
  background-color: #eee;
  border-radius: 3px;
  overflow: hidden;
}

.strength-value {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.strength-value.weak {
  background-color: #f44336;
}

.strength-value.medium {
  background-color: #ff9800;
}

.strength-value.good {
  background-color: #2196f3;
}

.strength-value.strong {
  background-color: #4caf50;
}

.strength-text {
  font-size: 0.85rem;
  margin-top: 0.3rem;
  text-align: right;
}

.strength-text.weak {
  color: #f44336;
}

.strength-text.medium {
  color: #ff9800;
}

.strength-text.good {
  color: #2196f3;
}

.strength-text.strong {
  color: #4caf50;
}

.register-btn {
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
}

.register-btn:hover:not(:disabled) {
  background-color: var(--accent-color);
}

.register-btn:disabled {
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

.login-option {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #666;
}

.login-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.login-link:hover {
  text-decoration: underline;
}

/* Section des avantages */
.register-benefits {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  padding: 2rem;
  align-self: start;
}

.register-benefits h3 {
  font-size: 1.4rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  text-align: center;
}

.benefits-list {
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
  min-width: 3rem;
  height: 3rem;
}

.benefit-content h4 {
  margin: 0 0 0.3rem;
  color: var(--text-color);
}

.benefit-content p {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

/* Responsive design */
@media (max-width: 1024px) {
  .register-container {
    grid-template-columns: 1fr;
  }

  .register-benefits {
    order: -1;
  }
}

@media (max-width: 768px) {
  .register-container {
    padding: 2rem 1rem;
  }

  .register-card,
  .register-benefits {
    padding: 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>