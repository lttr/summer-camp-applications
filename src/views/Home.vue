<template>
  <div class="wrapper">
    <main class="main box">
      <Logo/>
      <Heading title="Přihlášky na tábor" subtitle="Aplikace pro jednoduché přihlašování na tábor"/>
    </main>
    <section class="has-text-centered">
      <p>
        <router-link to="/admin" class="has-text-light">administrace</router-link>
      </p>
      <p>
        <router-link to="/t/AjvRi94cFhvjYGTyLd5e/prihlaska" class="has-text-light">prvni tabor</router-link>
      </p>
    </section>
  </div>
</template>

<script>
import Heading from "../components/Heading.vue";
import Logo from "../components/Logo.vue";

export default {
  name: "Home",
  components: {
    Heading,
    Logo
  }
};
</script>

<style scoped>
.main {
  margin: 0 auto;
}
section {
  margin: 3rem 1.5rem;
}
</style>