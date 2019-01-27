<template>
  <div id="app" class="box">
    <main>
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
  </div>
</template>

<script>
import "bulma/css/bulma.min.css";
import ApplicationForm from "./components/ApplicationForm.vue";
import CampInfo from "./components/CampInfo.vue";
import Heading from "./components/Heading.vue";
import InitialText from "./components/InitialText.vue";
import Logo from "./components/Logo.vue";
import { config } from "./config.js";

export default {
  name: "app",
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
  },
  mounted() {
    this.$root.$on("formSubmitted", values =>
      console.log(JSON.stringify(values))
    );
  }
};
</script>

<style>
#app {
  margin: 0 auto;
  max-width: 44rem;
  position: relative;
}
main {
  max-width: 40rem;
  margin: 0 auto;
}

section {
  margin: 3rem 1.5rem;
}
</style>
