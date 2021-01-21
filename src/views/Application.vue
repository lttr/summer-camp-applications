<template>
  <div class="wrapper">
    <main class="main box">
      <Logo class="logo-in-application" />
      <div v-if="navigationFailed">
        <Heading title="Přihlášky na tábor" subtitle="Akce nebyla nalezena" />
      </div>
      <div v-if="!navigationFailed">
        <Heading :title="params.titulek" :subtitle="params.podtitulek" />
        <InitialText :text="params.uvodniText" />
        <CampInfo :price="price" :term="params.termin" :vudce="params.vudce" />
        <ApplicationForm
          :isSaleSiblings="isSaleSiblings"
          :isSaleGroupMember="isSaleGroupMember"
          :price="price"
          :forPrint="forPrint"
          :eventId="eventId"
          @sale-siblings-change="isSaleSiblings = $event"
          @sale-group-member-change="isSaleGroupMember = $event"
        />
      </div>
    </main>
    <section class="has-text-centered">
      <router-link to="./admin" class="has-text-light">administrace</router-link>
    </section>
  </div>
</template>

<script>
import ApplicationForm from '../components/ApplicationForm.vue'
import CampInfo from '../components/CampInfo.vue'
import Heading from '../components/Heading.vue'
import InitialText from '../components/InitialText.vue'
import Logo from '../components/Logo.vue'
import { defaultEventParameters } from '../config/defaultEventParameters'
import { db } from '../firebase.js'

export default {
  name: 'Application',
  components: {
    ApplicationForm,
    CampInfo,
    Heading,
    InitialText,
    Logo,
  },
  data() {
    return {
      params: {},
      isSaleSiblings: false,
      isSaleGroupMember: false,
      forPrint: false,
      eventId: null,
      navigationFailed: false,
    }
  },
  computed: {
    price() {
      let price = this.params.cena
      if (this.isSaleSiblings) {
        price -= this.params.slevaSourozenci
      }
      if (this.isSaleGroupMember) {
        price -= this.params.slevaClenOddilu
      }
      return price
    },
  },
  beforeRouteEnter(to, from, next) {
    const eventId = to.params.event
    db.collection('events')
      .doc(eventId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          next((vm) => {
            vm.eventId = eventId
            vm.navigationFailed = false
            vm.params = doc.data().parameters ?? defaultEventParameters
          })
        } else {
          next((vm) => (vm.navigationFailed = true))
        }
      })
      .catch(() => {
        next((vm) => (vm.navigationFailed = true))
      })
  },
}
</script>

<style scoped>
.wrapper {
  max-width: 44rem;
  margin: 0 auto;
  position: relative;
}

section {
  margin: 3rem 1.5rem;
}

.logo-in-application {
  position: absolute;
  top: 0;
}
</style>
