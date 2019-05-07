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
          <th>Datum přihlášky</th>
          <th>Jméno</th>
          <th>Příjmení</th>
          <th>Věk</th>
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
            <span>Konečná cena</span>
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
          <td class="no-break">{{ application.created.toDate() | czechDate }}</td>
          <td>{{ application.attendee.name }}</td>
          <td>{{ application.attendee.surname }}</td>
          <td>{{ computeAge(application.attendee.birthNumber) | czechNumber }}</td>
          <td>{{ application.attendee.birthNumber }}</td>
          <td>{{ application.attendee.address }}</td>
          <td>{{ application.attendee.motherName }}</td>
          <td>{{ application.attendee.motherSurname }}</td>
          <td class="no-break">{{ application.attendee.motherTel | phoneNumber }}</td>
          <td>{{ application.attendee.motherEmail }}</td>
          <td>{{ application.attendee.fatherName }}</td>
          <td>{{ application.attendee.fatherSurname }}</td>
          <td class="no-break">{{ application.attendee.fatherTel | phoneNumber }}</td>
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
import { differenceInCalendarDays } from 'date-fns'
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
    computeAge(birthNumber) {
      const yearNumber = parseInt(birthNumber.substr(0, 2), 10)
      const year = yearNumber < 70 ? yearNumber + 2000 : yearNumber + 1900
      const month = parseInt(birthNumber.substr(2, 2), 10)
      const day = parseInt(birthNumber.substr(4, 2), 10)
      const birthDate = new Date(year, month, day)
      const today = new Date()
      return (differenceInCalendarDays(today, birthDate) / 365).toFixed(1)
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
  filters: {
    czechDate(value) {
      return new Intl.DateTimeFormat('cs-CZ').format(value)
    },
    czechNumber(value) {
      return new Intl.NumberFormat('cs-CZ').format(value)
    },
    phoneNumber(value) {
      if (value) {
        const number = value.replace(/\s*/g, '')
        const parts = [number.substr(0, 3), number.substr(3, 3), number.substr(6, 3)]
        return parts.join(' ')
      }
    },
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
.no-break {
  white-space: nowrap;
}
</style>
