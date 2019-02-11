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
            <input id="name" name="name" v-model="name" type="text" class="input">
          </div>
        </div>

        <!-- Surname -->
        <div class="field">
          <label for="surname" class="label">
            <p>Příjmení</p>
          </label>
          <div class="control">
            <input id="surname" name="surname" v-model="surname" type="text" class="input">
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
            v-model="birthNumber"
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
          <input id="address" name="address" v-model="address" type="text" class="input">
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
            <input id="motherName" name="motherName" v-model="motherName" type="text" class="input">
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
              v-model="motherSurname"
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
          <input id="motherTel" name="motherTel" v-model="motherTel" type="tel" class="input">
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
            v-model="motherEmail"
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
            <input id="fatherName" name="fatherName" v-model="fatherName" type="text" class="input">
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
              v-model="fatherSurname"
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
          <input id="fatherTel" name="fatherTel" v-model="fatherTel" type="tel" class="input">
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
            v-model="fatherEmail"
            type="email"
            class="input"
          >
        </div>
      </div>

      <div class="field">
        <label class="checkbox">
          <input
            name="sleva"
            type="checkbox"
            :checked="isSale"
            @change="$emit('sale-change', $event.target.checked)"
          >
          Uplatnit slevu na sourozence (tábora se účastní více mých dětí)
        </label>
      </div>

      <AdditionalInfo :price="price"/>

      <div v-if="errors.length" class="content">Prosím opravte:
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
import AdditionalInfo from "./AdditionalInfo.vue";
import { db } from "../firebase";

export default {
  name: "ApplicationForm",
  components: {
    AdditionalInfo
  },
  props: {
    price: Number,
    isSale: Boolean,
    forPrint: Boolean
  },
  data() {
    return {
      name: "lsid",
      surname: "Ilsid",
      birthNumber: "123456/7894",
      address: "lsid",
      motherName: "Idsl",
      motherSurname: "Asldi",
      motherTel: "123",
      motherEmail: "a@b.cz",
      // name: null,
      // surname: null,
      // birthNumber: null,
      // address: null,
      // motherName: null,
      // motherSurname: null,
      // motherTel: null,
      // motherEmail: null,
      fatherName: null,
      fatherSurname: null,
      fatherTel: null,
      fatherEmail: null,
      errors: []
    };
  },
  methods: {
    checkForm(e) {
      e.preventDefault();

      this.errors = [];

      if (!this.name) {
        this.errors.push("Vyplňte jméno táborníka.");
      }
      if (!this.surname) {
        this.errors.push("Vyplňte příjmení táborníka.");
      }
      if (!this.address) {
        this.errors.push("Vyplňte bydliště táborníka.");
      }
      if (!this.birthNumber) {
        this.errors.push("Vyplňte rodné číslo táborníka.");
      } else if (!this.validBirthNumber(this.birthNumber)) {
        this.errors.push("Zadejte rodné číslo v požadovaném tvaru.");
      }
      if (!this.fatherPresent() && !this.motherPresent()) {
        this.errors.push("Vyplňte údaje alespoň jednoho z rodičů.");
      }

      if (this.errors.length) {
        return false;
      }

      this.sendForm();
    },
    childFieldsPresent() {
      return this.name && this.surname && this.birthNumber && this.address;
    },
    motherPresent() {
      return (
        this.motherName &&
        this.motherSurname &&
        this.motherTel &&
        this.motherEmail
      );
    },
    fatherPresent() {
      return (
        this.fatherName &&
        this.fatherSurname &&
        this.fatherTel &&
        this.fatherEmail
      );
    },
    validBirthNumber(birthNumber) {
      var re = /^\d{6}\/\d{4}$/;
      return re.test(birthNumber);
    },
    sendForm() {
      const event = db
        .collection("organizations")
        .doc("IOJYDqNsnKbEKvWJZmkG")
        .collection("events")
        .doc("AjvRi94cFhvjYGTyLd5e");
      const doc = {
        created: new Date(),
        deleted: false,
        name: this.name,
        surname: this.surname,
        birthNumber: this.birthNumber,
        address: this.address,
        motherName: this.motherName,
        motherSurname: this.motherSurname,
        motherTel: this.motherTel,
        motherEmail: this.motherEmail,
        fatherName: this.fatherName,
        fatherSurname: this.fatherSurname,
        fatherTel: this.fatherTel,
        fatherEmail: this.fatherEmail
      };
      event
        .collection("applications")
        .add(doc)
        .then(i => {
          alert("success" + i.id);
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>

<style scoped>
</style>
