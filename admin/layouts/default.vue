<template>
  <main>
    <Navbar />
    <Nuxt />
    <Footer />
  </main>
</template>
<script>
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default {
  components: {
    Navbar,
    Footer
  }
};
</script>
<style>
.main {
  position: relative;
}
</style>
