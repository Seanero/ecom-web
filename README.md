# TechNatura - Site E-commerce de Technologie Responsable

Ecole Efrei

TechNatura est une plateforme e-commerce spécialisée dans la vente de produits technologiques reconditionnés et éco-responsables. Ce projet utilise Vue.js pour offrir une expérience utilisateur fluide et moderne.

## 🌱 À propos du projet

TechNatura a pour mission de rendre la technologie plus accessible tout en réduisant son impact environnemental. Notre plateforme propose :
- Des produits reconditionnés de haute qualité
- Des appareils neufs sélectionnés pour leur éco-conception
- Un service de reprise et de recyclage de vos anciens appareils

## 🚀 Technologies utilisées

- **Frontend** : Vue.js 3, Vue Router, Vuex
- **Styles** : CSS personnalisé avec variables pour la cohérence visuelle
- **Cartographie** : Leaflet (OpenStreetMap)
- **Requêtes API** : Axios
- **Responsive Design** : Compatible mobile, tablette et desktop

## 📋 Prérequis

- Node.js (v14.0.0 ou supérieur)
- npm (v6.0.0 ou supérieur)

## 🔧 Installation

1. Clonez le dépôt
```bash
git clone https://github.com/Seanero/ecom-web.git
cd ecom-web
```

2. Installez les dépendances
```bash
npm install
```

3. Lancez le serveur de développement
```bash
npm run serve
```

Le site sera accessible à l'adresse [http://localhost:5173](http://localhost:5173)

## 📁 Structure du projet

```
technatura/
├── public/             # Fichiers statiques
├── src/
│   ├── assets/         # Images, polices, etc.
│   ├── components/     # Composants Vue réutilisables
│   ├── views/          # Composants de pages
│   ├── router/         # Configuration du routeur Vue
│   ├── store/          # Gestion d'état Vuex
│   ├── App.vue         # Composant racine
│   └── main.js         # Point d'entrée de l'application
├── .gitignore          # Fichiers ignorés par Git
├── babel.config.js     # Configuration Babel
├── package.json        # Dépendances et scripts
└── README.md           # Ce fichier
```

## 🔍 Fonctionnalités principales

- **Page d'accueil** : Présentation des offres et valeurs de TechNatura
- **Catalogue** : Liste des produits avec filtres (catégorie, prix) et tri
- **Fiche produit** : Détails, spécifications et options d'achat
- **Panier** : Gestion des articles et processus de commande
- **Compte utilisateur** : Inscription, connexion, profil et historique des commandes
- **Page contact** : Formulaire et carte interactive
- **Pages légales** : CGU, mentions légales, politique de confidentialité

## 📱 Pages responsives

Toutes les pages ont été conçues pour s'adapter aux différentes tailles d'écran :
- Mobile (< 768px)
- Tablette (768px - 1024px)
- Desktop (> 1024px)

## 🔄 API et Backend

L'application utilise une API RESTful pour communiquer avec le backend. Les endpoints principaux sont :

- `/product/getAll` - Récupérer tous les produits
- `/product/get/:id` - Récupérer un produit spécifique
- `/category/getAll` - Récupérer toutes les catégories
- `/users/register` - Créer un compte utilisateur
- `/users/login` - Se connecter

Le backend n'est pas inclus dans ce dépôt.

## 🛠️ Déploiement

### Pour un environnement de production :

```bash
npm run build
```

Les fichiers générés seront dans le dossier `dist/` et peuvent être déployés sur n'importe quel serveur web statique.

### Suggestions d'hébergement :
- PalmaCloud
- PalmaCloud Plesk
- PalmaCloud VPS
- PalmaCloud Serveur dédiés

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/amazingFeature`)
3. Committez vos changements (`git commit -m 'Add some amazingFeature'`)
4. Poussez vers la branche (`git push origin feature/amazingFeature`)
5. Ouvrez une Pull Request

## 📝 Standards de code

- Suivez les conventions de nommage Vue.js
- Utilisez des noms de composants PascalCase
- Utilisez des noms de variables et fonctions camelCase
- Privilégiez les composants à fichier unique (.vue)
- Commentez votre code lorsque nécessaire

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

## 📞 Contact

Pour toute question concernant le projet, contactez-nous à dev@technatura.fr