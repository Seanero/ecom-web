<template>
  <div class="contact-container">
    <div class="contact-header">
      <h1 class="page-title">Contactez-nous</h1>
      <p class="subtitle">Nous sommes à votre écoute pour toute question ou suggestion</p>
    </div>

    <div class="contact-content">
      <!-- Informations de contact -->
      <div class="contact-info">
        <div class="info-card">
          <div class="info-icon">📍</div>
          <h3>Notre adresse</h3>
          <p>30-32 Avenue de la République,</p>
          <p>94800 Villejuif, France</p>
        </div>

        <div class="info-card">
          <div class="info-icon">📱</div>
          <h3>Téléphone</h3>
          <p>01 23 45 67 89</p>
          <p>Du lundi au vendredi, 9h-18h</p>
        </div>

        <div class="info-card">
          <div class="info-icon">✉️</div>
          <h3>Email</h3>
          <p>contact@technatura.fr</p>
          <p>Réponse sous 24h ouvrées</p>
        </div>

        <div class="social-media">
          <h3>Suivez-nous</h3>
          <div class="social-icons">
            <a href="#" class="social-icon" title="Facebook">📱</a>
            <a href="#" class="social-icon" title="Instagram">💻</a>
            <a href="#" class="social-icon" title="Twitter">🌱</a>
            <a href="#" class="social-icon" title="LinkedIn">📟</a>
          </div>
        </div>
      </div>

      <!-- Formulaire de contact -->
      <div class="contact-form-container">
        <h2>Envoyez-nous un message</h2>
        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Nom complet *</label>
            <input
                type="text"
                id="name"
                v-model="formData.name"
                placeholder="Votre nom"
                required
                :class="{ 'error': formErrors.name }"
            >
            <p class="error-message" v-if="formErrors.name">{{ formErrors.name }}</p>
          </div>

          <div class="form-group">
            <label for="email">Email *</label>
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

          <div class="form-group">
            <label for="phone">Téléphone</label>
            <input
                type="tel"
                id="phone"
                v-model="formData.phone"
                placeholder="01 23 45 67 89"
                :class="{ 'error': formErrors.phone }"
            >
            <p class="error-message" v-if="formErrors.phone">{{ formErrors.phone }}</p>
          </div>

          <div class="form-group">
            <label for="subject">Sujet *</label>
            <select
                id="subject"
                v-model="formData.subject"
                required
                :class="{ 'error': formErrors.subject }"
            >
              <option value="" disabled selected>Choisissez un sujet...</option>
              <option value="question">Question sur un produit</option>
              <option value="order">Suivi de commande</option>
              <option value="return">Retour produit</option>
              <option value="suggestion">Suggestion</option>
              <option value="partnership">Partenariat</option>
              <option value="other">Autre</option>
            </select>
            <p class="error-message" v-if="formErrors.subject">{{ formErrors.subject }}</p>
          </div>

          <div class="form-group">
            <label for="message">Message *</label>
            <textarea
                id="message"
                v-model="formData.message"
                placeholder="Votre message"
                rows="5"
                required
                :class="{ 'error': formErrors.message }"
            ></textarea>
            <p class="error-message" v-if="formErrors.message">{{ formErrors.message }}</p>
          </div>

          <div class="form-group checkbox-group">
            <input type="checkbox" id="privacy" v-model="formData.privacy" required>
            <label for="privacy">
              J'accepte que mes données soient utilisées pour traiter ma demande conformément à la
              <router-link to="/privacy">politique de confidentialité</router-link> *
            </label>
            <p class="error-message" v-if="formErrors.privacy">{{ formErrors.privacy }}</p>
          </div>

          <div class="form-actions">
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
            </button>
          </div>

          <p class="form-note">* Champs obligatoires</p>
        </form>
      </div>
    </div>

    <!-- Carte Leaflet -->
    <div class="map-container">
      <h2>Nous trouver</h2>
      <div id="map" class="leaflet-map"></div>
    </div>

    <!-- Questions fréquentes -->
    <div class="faq-section">
      <h2>Questions fréquentes</h2>
      <div class="faq-container">
        <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
          <div class="faq-question" @click="toggleFaq(index)">
            <h3>{{ faq.question }}</h3>
            <div class="faq-toggle" :class="{ 'active': faq.isOpen }">+</div>
          </div>
          <div class="faq-answer" v-show="faq.isOpen">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Message de confirmation (affiché conditionnellement) -->
    <div class="success-message" v-if="formSubmitted">
      <div class="success-content">
        <div class="success-icon">✓</div>
        <h2>Message envoyé avec succès !</h2>
        <p>Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.</p>
        <button @click="formSubmitted = false" class="close-btn">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script>
// Importer Leaflet
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  name: 'ContactPage',
  data() {
    return {
      map: null,
      formData: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        privacy: false
      },
      formErrors: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        privacy: ''
      },
      isSubmitting: false,
      formSubmitted: false,
      faqs: [
        {
          question: "Quel est le délai de livraison ?",
          answer: "Nos délais de livraison varient généralement entre 2 et 5 jours ouvrés en France métropolitaine. Pour les DOM-TOM et à l'international, les délais peuvent être plus longs.",
          isOpen: false
        },
        {
          question: "Comment retourner un produit ?",
          answer: "Vous disposez de 30 jours pour retourner votre produit. Il vous suffit d'accéder à votre compte client, de sélectionner la commande concernée et de suivre la procédure de retour. Vous recevrez une étiquette de retour par email.",
          isOpen: false
        },
        {
          question: "Quelle est la durée de garantie sur les produits reconditionnés ?",
          answer: "Tous nos produits reconditionnés bénéficient d'une garantie minimale de 12 mois. Certains produits premium peuvent avoir une garantie étendue à 24 mois.",
          isOpen: false
        },
        {
          question: "Les batteries sont-elles remplacées dans les appareils reconditionnés ?",
          answer: "Oui, toutes les batteries de nos appareils reconditionnés sont testées et remplacées si leur capacité est inférieure à 85% de la capacité d'origine.",
          isOpen: false
        },
        {
          question: "Proposez-vous un service de reprise pour mon ancien appareil ?",
          answer: "Oui, nous proposons un service de reprise pour vos anciens appareils. Selon l'état de l'appareil, vous pouvez bénéficier d'une remise sur votre prochain achat chez TechNatura.",
          isOpen: false
        }
      ]
    };
  },
  mounted() {
    // Attendre que le DOM soit complètement chargé
    this.$nextTick(() => {
      this.initMap();
    });
  },
  methods: {
    initMap() {
      // Coordonnées de Paris
      const paris = [48.787872314453125, 2.356229782104492];

      // Créer la carte avec l'ID map et définir la vue
      this.map = L.map('map').setView(paris, 13);

      // Ajouter une couche de tuiles OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(this.map);

      // Ajouter un marqueur pour TechNatura
      const marker = L.marker(paris).addTo(this.map);

      // Ajouter une infobulle (popup) au marqueur
      marker.bindPopup("<b>TechNatura</b><br>30-32 Avenue de la République, 94800 Villejuif, France").openPopup();

      // Créer une icône personnalisée avec la couleur verte de TechNatura
      const greenIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: #2e7d32; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      // Ajouter un cercle autour du marqueur pour le mettre en évidence
      L.circle(paris, {
        color: '#2e7d32',
        fillColor: '#2e7d32',
        fillOpacity: 0.2,
        radius: 500
      }).addTo(this.map);
    },
    validateForm() {
      let isValid = true;
      this.formErrors = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        privacy: ''
      };

      if (!this.formData.name.trim()) {
        this.formErrors.name = "Veuillez entrer votre nom";
        isValid = false;
      }

      if (!this.formData.email.trim()) {
        this.formErrors.email = "Veuillez entrer votre email";
        isValid = false;
      } else if (!this.validateEmail(this.formData.email)) {
        this.formErrors.email = "Veuillez entrer un email valide";
        isValid = false;
      }

      if (this.formData.phone && !this.validatePhone(this.formData.phone)) {
        this.formErrors.phone = "Veuillez entrer un numéro de téléphone valide";
        isValid = false;
      }

      if (!this.formData.subject) {
        this.formErrors.subject = "Veuillez sélectionner un sujet";
        isValid = false;
      }

      if (!this.formData.message.trim()) {
        this.formErrors.message = "Veuillez entrer votre message";
        isValid = false;
      } else if (this.formData.message.length < 10) {
        this.formErrors.message = "Votre message doit contenir au moins 10 caractères";
        isValid = false;
      }

      if (!this.formData.privacy) {
        this.formErrors.privacy = "Vous devez accepter notre politique de confidentialité";
        isValid = false;
      }

      return isValid;
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    validatePhone(phone) {
      // Format français simplifié
      const re = /^(\+33|0)[1-9](\d{2}){4}$/;
      return re.test(phone.replace(/\s/g, ''));
    },
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }

      this.isSubmitting = true;

      try {
        // Simulation d'un appel API (à remplacer par votre véritable appel API)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Affichage du message de confirmation
        this.formSubmitted = true;

        // Réinitialisation du formulaire
        this.formData = {
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          privacy: false
        };
      } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire:', error);
        alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer plus tard.');
      } finally {
        this.isSubmitting = false;
      }
    },
    toggleFaq(index) {
      this.faqs[index].isOpen = !this.faqs[index].isOpen;
    }
  },
  // Nettoyer la carte lors de la destruction du composant
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
};
</script>

<style scoped>
.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.contact-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.2rem;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Informations de contact */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.info-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.info-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.info-card p {
  color: #666;
  margin-bottom: 0.3rem;
}

.social-media {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.social-media h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  background-color: var(--accent-color);
}

/* Formulaire de contact */
.contact-form-container {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.contact-form-container h2 {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  text-align: center;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
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

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #d32f2f;
}

.error-message {
  color: #d32f2f;
  font-size: 0.85rem;
  margin-top: 0.3rem;
}

.checkbox-group {
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5rem;
}

.checkbox-group input {
  margin-top: 0.3rem;
}

.form-actions {
  margin-top: 1rem;
}

.submit-btn {
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
}

.submit-btn:hover:not(:disabled) {
  background-color: var(--accent-color);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-note {
  font-size: 0.85rem;
  color: #666;
  margin-top: 1rem;
  text-align: center;
}

/* Carte Leaflet */
.map-container {
  margin-bottom: 3rem;
}

.map-container h2 {
  font-size: 1.8rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  text-align: center;
}

.leaflet-map {
  height: 400px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  z-index: 1; /* S'assurer que la carte n'est pas coupée par d'autres éléments */
}

/* FAQ */
.faq-section {
  margin-bottom: 3rem;
}

.faq-section h2 {
  font-size: 1.8rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  text-align: center;
}

.faq-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.faq-question {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background-color: #f9f9f9;
}

.faq-question h3 {
  font-size: 1.1rem;
  color: var(--text-color);
  margin: 0;
}

.faq-toggle {
  font-size: 1.5rem;
  color: var(--primary-color);
  transition: transform 0.3s ease;
}

.faq-toggle.active {
  transform: rotate(45deg);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem 1.5rem;
  color: #666;
}

/* Message de succès */
.success-message {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.success-content {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.success-icon {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  display: inline-block;
  width: 70px;
  height: 70px;
  line-height: 70px;
  border-radius: 50%;
  background-color: rgba(46, 125, 50, 0.1);
}

.success-content h2 {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.close-btn {
  margin-top: 1.5rem;
  padding: 0.8rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background-color: var(--accent-color);
}

/* Marker personnalisé */
.custom-marker {
  background: transparent;
  border: none;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }

  .contact-form-container {
    order: -1;
  }

  .social-icons {
    justify-content: center;
  }

  .faq-question h3 {
    font-size: 1rem;
  }

  .leaflet-map {
    height: 300px;
  }
}
</style>