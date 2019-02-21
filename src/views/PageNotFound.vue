<template>
  <div class="wrapper">
    <main class="main box">
      <Logo/>
      <Heading title="Přihlášky na tábor" subtitle="Tato stránka neexistuje"/>
    </main>
  </div>
</template>

<script>
import Heading from "../components/Heading.vue";
import Logo from "../components/Logo.vue";

export default {
  name: "PageNotFound",
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
</style>