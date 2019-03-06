<template>
  <div class="wrapper">
    <main class="main box">
      <Logo/>
      <Heading :title="titulek" :subtitle="podtitulek"/>
      <section>
        <p>
          Přihláška na jméno {{ $route.query.jmeno }} {{ $route.query.prijmeni }} byla přijata.
          Informace k platbě a přihláška k podepsání Vám bude zaslána později na uvedené emaily rodičů.
        </p>
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
  name: "Confirmation",
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
