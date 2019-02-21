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
        :eventId="eventId"
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
import { config } from "../config";
import { db } from "../main.js";

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
      forPrint: false,
      eventId: null
    };
  },
  computed: {
    price: function() {
      return this.isSale ? this.cena - this.sleva : this.cena;
    }
  },
  beforeRouteEnter(to, from, next) {
    const eventId = to.params.event;
    db.collection("events")
      .doc(eventId)
      .get()
      .then(doc => {
        if (doc.exists) {
          next(vm => (vm.eventId = eventId));
        } else {
          next(false);
        }
      })
      .catch(() => {
        // next(false);
      });
  }
};
</script>
