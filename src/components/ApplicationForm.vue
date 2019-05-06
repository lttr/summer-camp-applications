<template>
  <section>
    <form @submit="checkForm">
      <div class="field">
        <h3 class="subtitle is-4">Táborník</h3>
      </div>

      <div class="field-body field">
        <!-- Name -->
        <div class="field">
          <label for="name" class="label">
            <p>Jméno</p>
          </label>
          <div class="control">
            <input id="name" name="name" v-model="attendee.name" type="text" class="input">
          </div>
        </div>

        <!-- Surname -->
        <div class="field">
          <label for="surname" class="label">
            <p>Příjmení</p>
          </label>
          <div class="control">
            <input id="surname" name="surname" v-model="attendee.surname" type="text" class="input">
          </div>
        </div>
      </div>

      <!-- Birth number -->
      <div class="field">
        <label for="birthNumber" class="label">
          <p>
            Rodné číslo
            <span class="has-text-grey-light is-size-7 is-italic">ve tvaru 123456/7890</span>
          </p>
        </label>
        <div class="control">
          <input
            id="birthNumber"
            name="birthNumber"
            v-model="attendee.birthNumber"
            type="text"
            class="input"
          >
        </div>
      </div>

      <!-- Address -->
      <div class="field">
        <label for="address" class="label">
          <p>Bydliště</p>
        </label>
        <div class="control">
          <input id="address" name="address" v-model="attendee.address" type="text" class="input">
        </div>
      </div>

      <div class="field">
        <h3 class="subtitle is-4">Matka</h3>
      </div>

      <div class="field-body field">
        <!-- Mother name -->
        <div class="field">
          <label for="motherName" class="label">
            <p>Jméno</p>
          </label>
          <div class="control">
            <input
              id="motherName"
              name="motherName"
              v-model="attendee.motherName"
              type="text"
              class="input"
            >
          </div>
        </div>

        <!-- Mother surname -->
        <div class="field">
          <label for="motherSurname" class="label">
            <p>Příjmení</p>
          </label>
          <div class="control">
            <input
              id="motherSurname"
              name="motherSurname"
              v-model="attendee.motherSurname"
              type="text"
              class="input"
            >
          </div>
        </div>
      </div>

      <!-- Mother tel -->
      <div class="field">
        <label for="motherTel" class="label">
          <p>Telefon</p>
        </label>
        <div class="control">
          <input
            id="motherTel"
            name="motherTel"
            v-model="attendee.motherTel"
            type="tel"
            class="input"
          >
        </div>
      </div>

      <!-- Mother email -->
      <div class="field">
        <label for="motherEmail" class="label">
          <p>Email</p>
        </label>
        <div class="control">
          <input
            id="motherEmail"
            name="motherEmail"
            v-model="attendee.motherEmail"
            type="email"
            class="input"
          >
        </div>
      </div>

      <div class="field">
        <h3 class="subtitle is-4">Otec</h3>
      </div>

      <div class="field-body field">
        <!-- Father name -->
        <div class="field">
          <label for="fatherName" class="label">
            <p>Jméno</p>
          </label>
          <div class="control">
            <input
              id="fatherName"
              name="fatherName"
              v-model="attendee.fatherName"
              type="text"
              class="input"
            >
          </div>
        </div>

        <!-- Father surname -->
        <div class="field">
          <label for="fatherSurname" class="label">
            <p>Příjmení</p>
          </label>
          <div class="control">
            <input
              id="fatherSurname"
              name="fatherSurname"
              v-model="attendee.fatherSurname"
              type="text"
              class="input"
            >
          </div>
        </div>
      </div>

      <!-- Father tel -->
      <div class="field">
        <label for="fatherTel" class="label">
          <p>Telefon</p>
        </label>
        <div class="control">
          <input
            id="fatherTel"
            name="fatherTel"
            v-model="attendee.fatherTel"
            type="tel"
            class="input"
          >
        </div>
      </div>

      <!-- Father email -->
      <div class="field">
        <label for="fatherEmail" class="label">
          <p>Email</p>
        </label>
        <div class="control">
          <input
            id="fatherEmail"
            name="fatherEmail"
            v-model="attendee.fatherEmail"
            type="email"
            class="input"
          >
        </div>
      </div>

      <div class="field">
        <label class="checkbox">
          <input
            name="saleSiblings"
            type="checkbox"
            :checked="isSaleSiblings"
            @change="$emit('sale-siblings-change', $event.target.checked)"
          >
          Uplatnit slevu na sourozence (tábora se účastní více mých dětí)
        </label>
      </div>

      <div class="field">
        <label class="checkbox">
          <input
            name="saleGroupMember"
            type="checkbox"
            :checked="isSaleGroupMember"
            @change="$emit('sale-group-member-change', $event.target.checked)"
          >
          Uplatnit slevu na člena oddílu
        </label>
      </div>

      <AdditionalInfo :price="price"/>

      <div v-if="errors.length" class="content">
        Prosím opravte:
        <ul>
          <li v-for="error in errors" :key="error" class="has-text-danger">{{ error }}</li>
        </ul>
      </div>

      <div class="field has-text-centered">
        <input type="submit" class="button is-info" value="Odeslat přihlášku">
      </div>
    </form>
  </section>
</template>

<script>
import AdditionalInfo from './AdditionalInfo.vue'
import { db } from '../firebase'

export default {
  name: 'ApplicationForm',
  components: {
    AdditionalInfo,
  },
  props: {
    price: Number,
    isSaleSiblings: Boolean,
    isSaleGroupMember: Boolean,
    forPrint: Boolean,
    eventId: String,
  },
  watch: {
    price: function(newVal) {
      this.attendee.price = newVal
    },
  },
  data() {
    return {
      attendee: {
        name: null,
        surname: null,
        birthNumber: null,
        address: null,
        motherName: null,
        motherSurname: null,
        motherTel: null,
        motherEmail: null,
        fatherName: null,
        fatherSurname: null,
        fatherTel: null,
        fatherEmail: null,
        price: this.price,
      },
      errors: [],
    }
  },
  methods: {
    checkForm(e) {
      e.preventDefault()

      this.errors = []

      if (!this.attendee.name) {
        this.errors.push('Vyplňte jméno táborníka.')
      }
      if (!this.attendee.surname) {
        this.errors.push('Vyplňte příjmení táborníka.')
      }
      if (!this.attendee.address) {
        this.errors.push('Vyplňte bydliště táborníka.')
      }
      if (!this.attendee.birthNumber) {
        this.errors.push('Vyplňte rodné číslo táborníka.')
      } else if (!this.validBirthNumber(this.attendee.birthNumber)) {
        this.errors.push('Zadejte rodné číslo v požadovaném tvaru.')
      }
      if (!this.fatherPresent() && !this.motherPresent()) {
        this.errors.push('Vyplňte údaje alespoň jednoho z rodičů.')
      }

      if (this.errors.length) {
        return false
      }

      this.sendForm()
    },
    childFieldsPresent() {
      return (
        this.attendee.name &&
        this.attendee.surname &&
        this.attendee.birthNumber &&
        this.attendee.address
      )
    },
    motherPresent() {
      return (
        this.attendee.motherName &&
        this.attendee.motherSurname &&
        this.attendee.motherTel &&
        this.attendee.motherEmail
      )
    },
    fatherPresent() {
      return (
        this.attendee.fatherName &&
        this.attendee.fatherSurname &&
        this.attendee.fatherTel &&
        this.attendee.fatherEmail
      )
    },
    validBirthNumber(birthNumber) {
      var re = /^\d{6}\/\d{4}$/
      return re.test(birthNumber)
    },
    sendForm() {
      const doc = {
        created: new Date(),
        deleted: false,
        attendee: this.attendee,
      }
      db.collection('events')
        .doc(this.eventId)
        .collection('applications')
        .add(doc)
        .then(() => {
          this.$router.push({
            name: 'Confirmation',
            query: {
              jmeno: this.attendee.name,
              prijmeni: this.attendee.surname,
            },
          })
        })
        .catch(error => {
          alert(error)
        })
    },
  },
}
</script>
