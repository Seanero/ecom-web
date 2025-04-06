<template>
  <header>
    <div class="header-content">
      <div class="logo">
        <img src="../assets/img/logo.png" alt="TechNatura Logo">
        <h1>TechNatura</h1>
      </div>
      <nav>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/catalogue">Catalogue</router-link></li>
          <li><router-link to="/contact">Nous Contacter</router-link></li>
          <li><router-link to="/connexion">Connexion</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
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
}

header {
  background-color: var(--primary-color);
  padding: 1rem;
  color: white;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 50px;
  margin-right: 10px;
}

nav ul {
  display: flex;
  list-style: none;
}

nav ul li {
  margin-left: 1.5rem;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

nav ul li a:hover {
  color: var(--secondary-color);
}

@media screen and (max-width: 768px) {
  .header-content {
    flex-direction: column;
  }

  nav ul {
    margin-top: 1rem;
  }

  .hero h1 {
    font-size: 2rem;
  }

  .hero p {
    font-size: 1rem;
  }
}
</style>
