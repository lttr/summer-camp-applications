<template>
  <section>
    <form @submit.prevent="validateBeforeSubmit">
      <div class="field">
        <h3 class="subtitle is-4">Táborník</h3>
      </div>
      <div class="field-body field">
        <TextField
          name="name"
          displayName="Jméno"
          type="text"
          :forPrint="forPrint"
          validation="'required|email'"
          v-model="name"
        />
        <TextField
          name="surname"
          displayName="Příjmení"
          type="text"
          required="required"
          :forPrint="forPrint"
          v-model="surname"
        />
      </div>
      <TextField
        name="birthDate"
        displayName="Rodné číslo"
        helpText="ve tvaru 123456/7890"
        type="text"
        required="required"
        :forPrint="forPrint"
        v-model="birthNumber"
      />
      <TextField
        name="address"
        displayName="Bydliště"
        type="text"
        required="required"
        :forPrint="forPrint"
        v-model="address"
      />

      <div class="field">
        <h3 class="subtitle is-4">Matka</h3>
      </div>
      <div class="field-body field">
        <TextField
          name="jmeno-matky"
          displayName="Jméno"
          type="text"
          :forPrint="forPrint"
          v-model="motherName"
        />
        <TextField
          name="prijmeni-matky"
          displayName="Příjmení"
          type="text"
          :forPrint="forPrint"
          v-model="motherSurname"
        />
      </div>
      <TextField
        name="telefon-matky"
        displayName="Telefon"
        type="tel"
        :forPrint="forPrint"
        v-model="motherTel"
      />
      <TextField
        name="email-matky"
        displayName="E-mail"
        type="email"
        :forPrint="forPrint"
        v-model="motherEmail"
      />

      <div class="field">
        <h3 class="subtitle is-4">Otec</h3>
      </div>
      <div class="field-body field">
        <TextField
          name="jmeno-otce"
          displayName="Jméno"
          type="text"
          :forPrint="forPrint"
          v-model="fatherName"
        />
        <TextField
          name="prijmeni-otce"
          displayName="Příjmení"
          type="text"
          :forPrint="forPrint"
          v-model="fatherSurname"
        />
      </div>
      <TextField
        name="telefon-otce"
        displayName="Telefon"
        type="tel"
        :forPrint="forPrint"
        v-model="fatherTel"
      />
      <TextField
        name="email-otce"
        displayName="E-mail"
        type="email"
        :forPrint="forPrint"
        v-model="fatherEmail"
      />

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

      <div class="field has-text-centered">
        <input type="submit" class="button is-info" value="Odeslat přihlášku">
      </div>
    </form>
  </section>
</template>

<script>
import TextField from "./TextField.vue";
import AdditionalInfo from "./AdditionalInfo.vue";

export default {
  name: "ApplicationForm",
  components: {
    TextField,
    AdditionalInfo
  },
  props: {
    price: Number,
    isSale: Boolean,
    forPrint: Boolean
  },
  data: function() {
    return {
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
      fatherEmail: null
    };
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          // eslint-disable-next-line
          alert("Form Submitted!");
          return;
        }

        alert("Correct them errors!");
      });
    }
  }
};
</script>

<style>
</style>
