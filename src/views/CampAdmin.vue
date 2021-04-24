<template>
  <PageWithBar>
    <div class="container has-text-centered">
      <h1 class="title">Přihlášky - {{ eventName }}</h1>
    </div>

    <section class="section" v-if="isAdmin">
      <Modal v-if="paymentLetterId" @close="paymentLetterId = null">
        <span slot="header">Platební údaje</span>
        <PaymentLetter slot="body" v-if="paymentLetterId" :application="paymentLetterApplication" />
      </Modal>

      <p class="buttons">
        <button class="button is-light" @click="resetApplicationsOrder">Resetovat pořadí</button>
        <button class="button is-light" @click="generateVariableSymbols">
          Generovat variabilní symboly
        </button>
        <button class="button is-light" @click="refreshApplications">Znovu načíst</button>
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
            <th>Údaje k platbě</th>
            <th>Údaje odeslány</th>
            <th>Zaplaceno</th>
            <th>Info odesláno</th>
            <th>Smazat</th>
          </tr>
        </thead>
        <tbody v-if="applications && applications.length > 0">
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
                <input class="final-price-input" type="number" v-model="application.finalPrice" />
              </div>
              <div v-else>
                <span class="final-price-text">{{ application.finalPrice }}</span>
              </div>
            </td>
            <td>
              <button
                class="action-icon"
                title="Zobrazit dopis s platbou"
                @click="showPaymentLetter(application)"
              >
                💲
              </button>
            </td>
            <td>
              <!-- Údaje odeslány -->
              <input
                type="checkbox"
                v-model="application.paymentInfoSent"
                @change="setPaymentInfoSent(application, $event)"
              />
            </td>
            <td>
              <!-- Zaplaceno -->
              <input
                type="checkbox"
                :checked="application.paid"
                @change="setPaid(application, $event)"
              />
            </td>
            <td>
              <!-- Detailní info odesláno -->
              <input
                type="checkbox"
                :checked="application.detailedInfoSent"
                @change="setDetailedInfoSent(application, $event)"
              />
            </td>
            <td>
              <a @click.prevent="handleDelete(application)">smazat</a>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="10">Žádné přihlášky neeviduji</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="section" v-else>
      <div class="columns is-centered">Musíš být admin abys viděl tento obsah</div>
    </section>
  </PageWithBar>
</template>

<script>
import { differenceInCalendarDays } from 'date-fns'
import { db, functions } from '../firebase'
import { getApplicationsForEvent } from '../services/ApplicationsService'
import PageWithBar from '../layouts/PageWithBar.vue'
import PaymentLetter from '../components/PaymentLetter.vue'
import Modal from '../components/Modal.vue'
import { authState } from '../auth'

export default {
  name: 'CampAdmin',
  components: {
    PaymentLetter,
    Modal,
    PageWithBar,
  },
  data() {
    return {
      isAdmin: authState.isAdmin,
      nothing: false,
      eventId: null,
      eventName: '',
      applications: [],
      isEditingFinalPrice: false,
      paymentLetterId: null,
      paymentLetterApplication: null,
    }
  },
  methods: {
    resetApplicationsOrder() {
      const resetApplicationsOrder = functions.httpsCallable('resetApplicationsOrder')
      resetApplicationsOrder({ eventId: this.eventId })
      alert('Pořadí přihlášek bude na pozadí přegenerováno.')
    },
    generateVariableSymbols() {
      const generateVariableSymbols = functions.httpsCallable('generateVariableSymbols')
      generateVariableSymbols({ eventId: this.eventId })
      alert('Variabilní symboly budou na pozadí přegenerovány.')
    },
    refreshApplications() {
      getApplicationsForEvent(this.eventId).then((applications) => {
        this.applications = applications
      })
    },
    editFinalPrice() {
      this.isEditingFinalPrice = true
    },
    showPaymentLetter(application) {
      if (this.paymentLetterId === application.id) {
        this.paymentLetterId = null
      } else {
        this.paymentLetterId = application.id
        this.paymentLetterApplication = application
      }
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
    async handleDelete(application) {
      if (window.confirm('Opravdu smazat?')) {
        await db
          .collection('events')
          .doc(this.eventId)
          .collection('applications')
          .doc(application.id)
          .update({
            deleted: true,
          })
        this.refreshApplications()
      }
    },
    submitFinalPrice() {
      this.isEditingFinalPrice = false
      db.collection('events')
        .doc(this.eventId)
        .collection('applications')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const applicationRef = db
              .collection('events')
              .doc(this.eventId)
              .collection('applications')
              .doc(doc.id)

            const application = this.applications.find((a) => a.id === doc.id)

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
    async setPaymentInfoSent(application, event) {
      const paymentInfoSent = event.target.checked
      application.paymentInfoSent = paymentInfoSent
      await db
        .collection('events')
        .doc(this.eventId)
        .collection('applications')
        .doc(application.id)
        .update({
          paymentInfoSent,
        })
    },
    async setPaid(application, event) {
      const paid = event.target.checked
      application.paid = paid
      await db
        .collection('events')
        .doc(this.eventId)
        .collection('applications')
        .doc(application.id)
        .update({
          paid,
        })
    },
    async setDetailedInfoSent(application, event) {
      const detailedInfoSent = event.target.checked
      application.detailedInfoSent = detailedInfoSent
      await db
        .collection('events')
        .doc(this.eventId)
        .collection('applications')
        .doc(application.id)
        .update({
          detailedInfoSent,
        })
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
            getApplicationsForEvent(eventId).then((applications) => {
              vm.applications = applications
            })
            vm.eventId = eventId
            vm.eventName = doc.data().name
            vm.nothing = false
          })
        } else {
          next((vm) => (vm.nothing = true))
        }
      })
      .catch(() => {
        next((vm) => (vm.nothing = true))
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
.table {
  overflow-x: scroll;
  display: block;
}
</style>
