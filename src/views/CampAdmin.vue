<template>
  <section class="wrapper">
    <h1 class="title">Přihlášky - {{ eventName }}</h1>
    <p class="buttons">
      <button class="button" @click="resetApplicationsOrder">Reset order</button>
      <button class="button" @click="generateVariableSymbols">Generovat variabilní symboly</button>
    </p>
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
          <th>Variabilní symbol</th>
          <th>Požadovaná cena</th>
          <th>
            Konečná cena
            <span v-if="isEditingFinalPrice">
              <button class="action-icon" title="ok" @click="submitFinalPrice">✔️</button>
            </span>
            <span v-else>
              <button class="action-icon" title="edit" @click="editFinalPrice">✏️</button>
            </span>
          </th>
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
          <td>{{ application.variableSymbol }}</td>
          <td>{{ application.attendee.price }}</td>
          <td>
            <div v-if="isEditingFinalPrice">
              <input class="final-price-input" type="number" v-model="application.finalPrice">
            </div>
            <div v-else>
              <span class="final-price-text">{{ application.finalPrice }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { db, functions } from '../firebase'
import { getApplicationsForEvent } from '../services/ApplicationsService'

export default {
  name: 'CampAdmin',
  data() {
    return {
      nothing: false,
      eventId: null,
      eventName: '',
      applications: [],
      db: null,
      isEditingFinalPrice: false,
    }
  },
  methods: {
    resetApplicationsOrder() {
      const resetApplicationsOrder = functions.httpsCallable('resetApplicationsOrder')
      resetApplicationsOrder({ eventId: this.eventId })
    },
    generateVariableSymbols() {
      const generateVariableSymbols = functions.httpsCallable('generateVariableSymbols')
      generateVariableSymbols({ eventId: this.eventId })
    },
    editFinalPrice(id) {
      this.isEditingFinalPrice = true
    },
    submitFinalPrice(newPrice) {
      this.isEditingFinalPrice = false
      this.db
        .collection('events')
        .doc(this.eventId)
        .collection('applications')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const applicationRef = this.db
              .collection('events')
              .doc(this.eventId)
              .collection('applications')
              .doc(doc.id)

            const application = this.applications.find(a => a.id === doc.id)

            const finalPrice =
              application.finalPrice != undefined
                ? application.finalPrice
                : application.attendee.price
            this.$set(application, 'finalPrice', finalPrice)
            return applicationRef.update({
              finalPrice,
            })
          })
        })
    },
  },
  beforeRouteEnter(to, from, next) {
    const eventId = to.params.event
    db.collection('events')
      .doc(eventId)
      .get()
      .then(doc => {
        if (doc.exists) {
          next(vm => {
            getApplicationsForEvent(eventId).then(applications => {
              vm.applications = applications
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

<style scoped>
.wrapper {
  position: relative;
  margin: 2rem 1.5rem;
}
.buttons {
  padding-bottom: 0.3rem;
}
.action-icon {
  background: none;
  border: none;
  cursor: pointer;
}
.final-price-input {
  display: inline-block;
}
</style>
