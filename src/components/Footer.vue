<script>
export default {
  name: "Footer"
}
</script>

<template>
  <footer>
    <div class="footer-content">
      <div class="footer-col">
        <h3>TechNatura</h3>
        <p>Notre mission est de rendre la technologie plus accessible tout en réduisant son impact environnemental.</p>
        <div class="social-links">
          <a href="#">📱</a>
          <a href="#">💻</a>
          <a href="#">🌱</a>
        </div>
      </div>
      <div class="footer-col">
        <h3>Liens Rapides</h3>
        <ul>
          <li><a href="#">Accueil</a></li>
          <li><a href="#">À propos</a></li>
          <li><a href="#">Catalogue</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Aide & FAQ</h3>
        <ul>
          <li><a href="#">Livraison</a></li>
          <li><a href="#">Retours</a></li>
          <li><a href="#">Garantie</a></li>
          <li><a href="#">Comment choisir</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Contact</h3>
        <ul>
          <li>📍 30-32 Avenue de la République, 94800 Villejuif, France</li>
          <li>📱 01 23 45 67 89</li>
          <li>✉️ contact@technatura.fr</li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      <p>&copy; 2025 TechNatura - Tous droits réservés</p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: var(--dark-color);
  color: white;
  padding: 4rem 1rem 2rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-col h3 {
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 10px;
}

.footer-col h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 2px;
  background-color: var(--secondary-color);
}

.footer-col ul {
  list-style: none;
}

.footer-col ul li {
  margin-bottom: 0.8rem;
}

.footer-col ul li a {
  color: #ccc;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-col ul li a:hover {
  color: var(--secondary-color);
  padding-left: 5px;
}

.social-links {
  display: flex;
  margin-top: 1.5rem;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  background-color: rgba(255,255,255,0.1);
  margin-right: 10px;
  border-radius: 50%;
  color: white;
  transition: all 0.3s ease;
}

.social-links a:hover {
  background-color: var(--primary-color);
  transform: translateY(-3px);
}

.copyright {
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.1);
}
</style>