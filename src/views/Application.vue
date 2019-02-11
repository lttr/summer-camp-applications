<template>
  <div class="wrapper">
    <main class="main box">
      <Logo/>
      <Heading :title="titulek" :subtitle="podtitulek"/>
      <InitialText :text="uvodniText"/>
      <CampInfo :price="price" :term="term"/>
      <ApplicationForm
        :isSale="isSale"
        :price="price"
        :forPrint="forPrint"
        @sale-change="isSale = $event"
      />
    </main>
    <section class="has-text-centered">
      <router-link to="./admin" class="has-text-light">administrace</router-link>
    </section>
  </div>
</template>

<script>
import ApplicationForm from "../components/ApplicationForm.vue";
import CampInfo from "../components/CampInfo.vue";
import Heading from "../components/Heading.vue";
import InitialText from "../components/InitialText.vue";
import Logo from "../components/Logo.vue";
import { config } from "../config.js";

export default {
  name: "application",
  components: {
    ApplicationForm,
    CampInfo,
    Heading,
    InitialText,
    Logo
  },
  data: function() {
    this.isSale = this.isSale || false;
    return {
      ...config,
      term: config.termin,
      isSale: false,
      forPrint: false
    };
  },
  computed: {
    price: function() {
      return this.isSale ? this.cena - this.sleva : this.cena;
    }
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