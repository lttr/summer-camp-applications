<template>
  <section>
    <h1 class="title">Přihlášky - {{ eventName }}</h1>
    <button class="button" @click="onclick">Reset order</button>
    <table class="table is-narrow">
      <thead>
        <tr>
          <th>Pořadí</th>
          <th>Datum</th>
          <th>Jméno</th>
          <th>Příjmení</th>
          <th>Rodné číslo</th>
          <th>Adresa</th>
          <th>Jméno matky</th>
          <th>Příjmení matky</th>
          <th>Telefon matky</th>
          <th>Email matky</th>
          <th>Jméno otce</th>
          <th>Příjmení otce</th>
          <th>Telefon otce</th>
          <th>Email otce</th>
          <th>Cena</th>
        </tr>
      </thead>
      <tbody>
        <tr v-bind:key="application.id" v-for="application in applications">
          <td>{{ application.order }}</td>
          <td>{{ new Intl.DateTimeFormat('cs-CZ').format(application.created.toDate()) }}</td>
          <td>{{ application.attendee.name }}</td>
          <td>{{ application.attendee.surname }}</td>
          <td>{{ application.attendee.birthNumber }}</td>
          <td>{{ application.attendee.address }}</td>
          <td>{{ application.attendee.motherName }}</td>
          <td>{{ application.attendee.motherSurname }}</td>
          <td>{{ application.attendee.motherTel }}</td>
          <td>{{ application.attendee.motherEmail }}</td>
          <td>{{ application.attendee.fatherName }}</td>
          <td>{{ application.attendee.fatherSurname }}</td>
          <td>{{ application.attendee.fatherTel }}</td>
          <td>{{ application.attendee.fatherEmail }}</td>
          <td>{{ application.attendee.price }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { initializeDatabase, initializeFunctions } from '../firebase'

export default {
  name: 'CampAdmin',
  data() {
    return {
      nothing: false,
      eventId: null,
      eventName: '',
      applications: [],
      db: null,
    }
  },
  methods: {
    onclick() {
      const resetApplicationsOrder = initializeFunctions().httpsCallable('resetApplicationsOrder')
      resetApplicationsOrder({ eventId: this.eventId })
    },
  },
  beforeRouteEnter(to, from, next) {
    const eventId = to.params.event
    const db = initializeDatabase()
    db.collection('events')
      .doc(eventId)
      .get()
      .then(doc => {
        if (doc.exists) {
          next(vm => {
            db.collection('events')
              .doc(eventId)
              .collection('applications')
              .get()
              .then(querySnapshot => {
                vm.applications = querySnapshot.docs
                  .map(x => x.data())
                  .filter(x => !x.deleted)
                  .sort((a, b) => a.created.seconds - b.created.seconds)
              })
            vm.eventId = eventId
            vm.eventName = doc.data().name
            vm.nothing = false
            vm.db = db
          })
        } else {
          next(vm => (vm.nothing = true))
        }
      })
      .catch(() => {
        next(vm => (vm.nothing = true))
      })
  },
}
</script>

<style>
#app {
  max-width: initial;
}
</style>
