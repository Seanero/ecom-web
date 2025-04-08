<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {Header, Footer},
  async created(){
    try {
      await this.$store.dispatch("auth/checkAuth");
    } catch (e) {
      console.error('Erreur lors du checkAuth :', err);
    }
  }
}

</script>

<template>
  <Header />
  <router-view />
  <Footer />
</template>

<style scoped>

</style>
