<template>
  <main>
    <h1 class="title">Přihlášky</h1>
    <h2>{{ eventName }} - {{ eventId }}</h2>
    <ul>
      <li v-bind:key="application.id" v-for="application in applications">{{ application.name }}</li>
    </ul>
  </main>
</template>

<script>
import { initializeDatabase } from "../firebase";

export default {
  name: "CampAdmin",
  data() {
    return {
      nothing: false,
      eventId: null,
      eventName: "",
      applications: null,
      db: null
    };
  },
  async beforeRouteEnter(to, from, next) {
    const eventId = to.params.event;
    const db = await initializeDatabase();
    db.collection("events")
      .doc(eventId)
      .get()
      .then(doc => {
        if (doc.exists) {
          next(vm => {
            db.collection("events")
              .doc(eventId)
              .collection("applications")
              .get()
              .then(applications => {
                vm.applications = applications.data();
              });
            vm.eventId = eventId;
            vm.eventName = doc.data().name;
            vm.nothing = false;
            vm.db = db;
          });
        } else {
          next(vm => (vm.nothing = true));
        }
      })
      .catch(() => {
        next(vm => (vm.nothing = true));
      });
  }
};
</script>
