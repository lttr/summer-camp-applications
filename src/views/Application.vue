<template>
  <div class="wrapper">
    <main class="main box">
      <Logo/>
      <div v-if="navigationFailed">
        <Heading title="Přihlášky na tábor" subtitle="Akce nebyla nalezena"/>
      </div>
      <div v-if="!navigationFailed">
        <Heading :title="titulek" :subtitle="podtitulek"/>
        <InitialText :text="uvodniText"/>
        <CampInfo :price="price" :term="term"/>
        <ApplicationForm
          :isSale="isSale"
          :price="price"
          :forPrint="forPrint"
          :eventId="eventId"
          :db="db"
          @sale-change="isSale = $event"
        />
      </div>
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
import { initializeDatabase } from "../firebase.js";

let db = null;

export default {
  name: "Application",
  components: {
    ApplicationForm,
    CampInfo,
    Heading,
    InitialText,
    Logo
  },
  data() {
    this.isSale = this.isSale || false;
    return {
      ...config,
      term: config.termin,
      isSale: false,
      forPrint: false,
      eventId: null,
      navigationFailed: false,
      db: null
    };
  },
  computed: {
    price() {
      return this.isSale ? this.cena - this.sleva : this.cena;
    }
  },
  async beforeRouteEnter(to, from, next) {
    const eventId = to.params.event;
    if (!db) {
      db = await initializeDatabase();
    }
    db.collection("events")
      .doc(eventId)
      .get()
      .then(doc => {
        if (doc.exists) {
          next(vm => {
            vm.eventId = eventId;
            vm.navigationFailed = false;
            vm.db = db;
          });
        } else {
          next(vm => (vm.navigationFailed = true));
        }
      })
      .catch(() => {
        next(vm => (vm.navigationFailed = true));
      });
  }
};
</script>
