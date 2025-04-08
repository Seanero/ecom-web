<template>
  <div class="account-container">
    <div class="page-header">
      <h1>Mon Compte</h1>
      <p class="subtitle">Gérez vos informations personnelles</p>
    </div>

    <div class="account-content">
      <!-- Navigation de la section compte -->
      <div class="account-sidebar">
        <div class="user-info">
          <div class="user-avatar">
            <svg class="avatar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
            </svg>
          </div>
          <div class="user-details" v-if="user">
            <h2>{{ user.firstname }} {{ user.lastname }}</h2>
            <p>{{ user.email }}</p>
          </div>
        </div>
        <nav class="account-nav">
          <a
              @click.prevent="activeTab = 'profile'"
              :class="['nav-item', { active: activeTab === 'profile' }]"
              href="#"
          >
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
            </svg>
            Mes informations
          </a>
          <a
              @click.prevent="activeTab = 'address'"
              :class="['nav-item', { active: activeTab === 'address' }]"
              href="#"
          >
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"></path>
            </svg>
            Adresse de facturation
          </a>
          <a
              @click.prevent="activeTab = 'security'"
              :class="['nav-item', { active: activeTab === 'security' }]"
              href="#"
          >
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-68-56a12,12,0,1,1-12-12A12,12,0,0,1,140,152Z"></path>
            </svg>
            Changer de mot de passe
          </a>
        </nav>
      </div>

      <!-- Contenu principal du compte -->
      <div class="account-main">
        <!-- Onglet Profil -->
        <div v-if="activeTab === 'profile'" class="profile-tab">
          <h2>Mes informations personnelles</h2>
          <form @submit.prevent="updateUserProfile" class="profile-form">
            <div class="form-row">
              <div class="form-group">
                <label for="firstname">Prénom</label>
                <input type="text" id="firstname" v-model="profileData.firstname" required>
              </div>
              <div class="form-group">
                <label for="lastname">Nom</label>
                <input type="text" id="lastname" v-model="profileData.lastname" required>
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="profileData.email" required>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-save" :disabled="isUpdating">
                <span v-if="isUpdating" class="spinner"></span>
                <span v-else>Enregistrer</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Onglet Adresse -->
        <div v-if="activeTab === 'address'" class="address-tab">
          <h2>Adresse de facturation</h2>
          <form @submit.prevent="updateAddress" class="address-form">
            <div class="form-group">
              <label for="line1">Adresse</label>
              <input type="text" id="line1" v-model="addressData.line1" required>
            </div>
            <div class="form-group">
              <label for="line2">Complément d'adresse</label>
              <input type="text" id="line2" v-model="addressData.line2">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="postalCode">Code postal</label>
                <input type="text" id="postalCode" v-model="addressData.postalCode" required>
              </div>
              <div class="form-group">
                <label for="city">Ville</label>
                <input type="text" id="city" v-model="addressData.city" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="stateOrDepartment">Département</label>
                <input type="text" id="stateOrDepartment" v-model="addressData.stateOrDepartment">
              </div>
              <div class="form-group">
                <label for="country">Pays</label>
                <input type="text" id="country" v-model="addressData.country" required>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-save" :disabled="isUpdatingAddress">
                <span v-if="isUpdatingAddress" class="spinner"></span>
                <span v-else>Enregistrer</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Onglet Sécurité -->
        <div v-if="activeTab === 'security'" class="security-tab">
          <h2>Changer de mot de passe</h2>
          <form @submit.prevent="changePassword" class="password-form">
            <div class="form-group">
              <label for="current_password">Mot de passe actuel</label>
              <input type="password" id="current_password" v-model="passwordData.current" required>
              <p class="error-message" v-if="passwordErrors.current">{{ passwordErrors.current }}</p>
            </div>
            <div class="form-group">
              <label for="new_password">Nouveau mot de passe</label>
              <input type="password" id="new_password" v-model="passwordData.new" required>
              <p class="error-message" v-if="passwordErrors.new">{{ passwordErrors.new }}</p>
            </div>
            <div class="form-group">
              <label for="confirm_password">Confirmer le mot de passe</label>
              <input type="password" id="confirm_password" v-model="passwordData.confirm" required>
              <p class="error-message" v-if="passwordErrors.confirm">{{ passwordErrors.confirm }}</p>
            </div>
            <div class="password-strength" v-if="passwordData.new">
              <div class="strength-label">Force du mot de passe:</div>
              <div class="strength-meter">
                <div class="strength-progress" :style="{ width: passwordStrength.percent + '%', backgroundColor: passwordStrength.color }"></div>
              </div>
              <div class="strength-text" :style="{ color: passwordStrength.color }">{{ passwordStrength.label }}</div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-save" :disabled="isChangingPassword">
                <span v-if="isChangingPassword" class="spinner"></span>
                <span v-else>Changer le mot de passe</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AccountPage',
  data() {
    return {
      activeTab: 'profile',
      // Formulaire profil
      profileData: {
        firstname: '',
        lastname: '',
        email: ''
      },
      isUpdating: false,
      // Formulaire adresse
      addressData: {
        line1: '',
        line2: '',
        postalCode: '',
        city: '',
        stateOrDepartment: '',
        country: ''
      },
      isUpdatingAddress: false,
      // Formulaire changement de mot de passe
      passwordData: {
        current: '',
        new: '',
        confirm: ''
      },
      passwordErrors: {
        current: '',
        new: '',
        confirm: ''
      },
      isChangingPassword: false
    };
  },
  computed: {
    ...mapGetters('auth', [
      'isAuthenticated',
      'user'
    ]),
    passwordStrength() {
      // Calcul simplifié de la force du mot de passe
      const password = this.passwordData.new;
      if (!password) return { percent: 0, color: '#e0e0e0', label: '' };

      let strength = 0;

      // Longueur
      if (password.length >= 8) strength += 25;

      // Présence de chiffres
      if (/\d/.test(password)) strength += 25;

      // Présence de caractères spéciaux
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;

      // Mélange de majuscules et minuscules
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;

      // Définition de la couleur et du label en fonction de la force
      let color, label;

      if (strength <= 25) {
        color = '#ff4d4d'; // Rouge
        label = 'Faible';
      } else if (strength <= 50) {
        color = '#ffaa00'; // Orange
        label = 'Moyen';
      } else if (strength <= 75) {
        color = '#ffdd00'; // Jaune
        label = 'Bon';
      } else {
        color = '#00cc44'; // Vert
        label = 'Excellent';
      }

      return { percent: strength, color, label };
    }
  },
  methods: {
    ...mapActions('auth', [
      'updateProfile',
      'logout',
      'checkAuth'
    ]),
    async updateUserProfile() {
      try {
        this.isUpdating = true;
        // Appel à l'API pour mettre à jour le profil
        await this.$store.dispatch('auth/updateProfile', this.profileData);
        alert('Vos informations ont été mises à jour avec succès');
      } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error);
        alert('Une erreur est survenue lors de la mise à jour de votre profil');
      } finally {
        this.isUpdating = false;
      }
    },
    async updateAddress() {
      try {
        this.isUpdatingAddress = true;
        // Appel à l'API pour mettre à jour l'adresse
        await this.$store.dispatch('auth/updateAddress', this.addressData);
        alert('Votre adresse a été mise à jour avec succès');
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'adresse:', error);
        alert('Une erreur est survenue lors de la mise à jour de votre adresse');
      } finally {
        this.isUpdatingAddress = false;
      }
    },
    async changePassword() {
      // Réinitialisation des erreurs
      this.passwordErrors = {
        current: '',
        new: '',
        confirm: ''
      };

      // Validation
      let isValid = true;

      if (!this.passwordData.current) {
        this.passwordErrors.current = 'Le mot de passe actuel est requis';
        isValid = false;
      }

      if (!this.passwordData.new) {
        this.passwordErrors.new = 'Le nouveau mot de passe est requis';
        isValid = false;
      } else if (this.passwordData.new.length < 3) { // Selon votre schéma, le minimum est 3
        this.passwordErrors.new = 'Le mot de passe doit contenir au moins 3 caractères';
        isValid = false;
      }

      if (this.passwordData.new !== this.passwordData.confirm) {
        this.passwordErrors.confirm = 'Les mots de passe ne correspondent pas';
        isValid = false;
      }

      if (!isValid) return;

      try {
        this.isChangingPassword = true;
        // Appel à l'API pour changer le mot de passe
        await this.$store.dispatch('auth/changePassword', {
          currentPassword: this.passwordData.current,
          newPassword: this.passwordData.new
        });

        // Réinitialisation du formulaire
        this.passwordData = {
          current: '',
          new: '',
          confirm: ''
        };

        alert('Votre mot de passe a été modifié avec succès');
      } catch (error) {
        console.error('Erreur lors du changement de mot de passe:', error);
        alert('Une erreur est survenue lors du changement de mot de passe');
      } finally {
        this.isChangingPassword = false;
      }
    }
  },
  async created() {
    // Vérifier si l'utilisateur est connecté
    if (!this.isAuthenticated) {
      await this.checkAuth();

      // Si toujours pas authentifié après vérification, rediriger vers la page de connexion
      if (!this.isAuthenticated) {
        this.$router.push({
          path: '/connexion',
          query: { redirect: this.$route.fullPath }
        });
        return;
      }
    }

    if (this.user) {
      this.profileData = {
        firstname: this.user.firstname || '',
        lastname: this.user.lastname || '',
        email: this.user.email || ''
      };

      if (this.user.invoiceAddress) {
        this.addressData = {
          line1: this.user.invoiceAddress.line1 || '',
          line2: this.user.invoiceAddress.line2 || '',
          postalCode: this.user.invoiceAddress.postalCode || '',
          city: this.user.invoiceAddress.city || '',
          stateOrDepartment: this.user.invoiceAddress.stateOrDepartment || '',
          country: this.user.invoiceAddress.country || ''
        };
      }
    }
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
  --border-color: #e0e0e0;
  --error-color: #d32f2f;
  --success-color: #2e7d32;
}

.account-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-header {
  margin-bottom: 2rem;
  text-align: center;
}

.page-header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.subtitle {
  color: #666;
}

.account-content {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  align-items: start;
}

/* Sidebar */
.account-sidebar {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
}

.user-info {
  padding: 1.5rem;
  text-align: center;
  background-color: var(--light-color);
  border-bottom: 1px solid var(--border-color);
}

.user-avatar {
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  background-color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  width: 50px;
  height: 50px;
  fill: white;
}

.user-details h2 {
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
}

.user-details p {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.account-nav {
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  color: var(--text-color);
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.nav-item:hover {
  background-color: rgba(0,0,0,0.05);
}

.nav-item.active {
  background-color: var(--primary-color);
  color: white;
}

.nav-item.active .nav-icon {
  fill: white;
}

.nav-icon {
  width: 20px;
  height: 20px;
  margin-right: 0.8rem;
  fill: var(--text-color);
}

/* Main Content */
.account-main {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 2rem;
}

.account-main h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
}

/* Forms */
.profile-form,
.address-form,
.password-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group select {
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

.error-message {
  color: var(--error-color);
  font-size: 0.85rem;
  margin-top: 0.3rem;
}

.password-strength {
  margin-top: 0.5rem;
}

.strength-label {
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
}

.strength-meter {
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.strength-progress {
  height: 100%;
  transition: width 0.3s ease;
}

.strength-text {
  font-size: 0.9rem;
  margin-top: 0.3rem;
  text-align: right;
}

.form-actions {
  margin-top: 1rem;
}

.btn-save {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
}

.btn-save:hover {
  background-color: var(--accent-color);
}

.btn-save:disabled {
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
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .account-content {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>