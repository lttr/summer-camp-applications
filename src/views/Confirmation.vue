<template>
  <div class="wrapper">
    <main class="main box">
      <Logo/>
      <Heading :title="titulek" :subtitle="podtitulek"/>
      <section>
        <p>Přihláška na jméno {{this.name}} {{ this.surname }} byla přijata.</p>
        <p></p>
      </section>
    </main>
  </div>
</template>

<script>
import Heading from "../components/Heading.vue";
import Logo from "../components/Logo.vue";
import { config } from "../config";

export default {
  name: "application",
  components: {
    Heading,
    Logo
  },
  data: function() {
    return {
      ...config
    };
  }
};
</script>
