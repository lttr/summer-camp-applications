<template>
  <section>
    <form>
      <div class="field">
        <h3 class="subtitle is-4">Táborník</h3>
      </div>
      <div class="field-body field">
        <TextField name="jmeno" displayName="Jméno" type="text" :forPrint="forPrint"/>
        <TextField name="prijmeni" displayName="Příjmení" type="text" :forPrint="forPrint"/>
      </div>
      <TextField
        name="rodne-cislo"
        displayName="Rodné číslo"
        helpText="ve tvaru 123456/7890"
        type="text"
        :forPrint="forPrint"
      />
      <TextField name="bydliste" displayName="Bydliště" type="text" :forPrint="forPrint"/>

      <div class="field">
        <h3 class="subtitle is-4">Matka</h3>
      </div>
      <div class="field-body field">
        <TextField name="jmeno-matky" displayName="Jméno" type="text" :forPrint="forPrint"/>
        <TextField name="prijmeni-matky" displayName="Příjmení" type="text" :forPrint="forPrint"/>
      </div>
      <TextField name="telefon-matky" displayName="Telefon" type="tel" :forPrint="forPrint"/>
      <TextField name="email-matky" displayName="E-mail" type="email" :forPrint="forPrint"/>

      <div class="field">
        <h3 class="subtitle is-4">Otec</h3>
      </div>
      <div class="field-body field">
        <TextField name="jmeno-otce" displayName="Jméno" type="text" :forPrint="forPrint"/>
        <TextField name="prijmeni-otce" displayName="Příjmení" type="text" :forPrint="forPrint"/>
      </div>
      <TextField name="telefon-otce" displayName="Telefon" type="tel" :forPrint="forPrint"/>
      <TextField name="email-otce" displayName="E-mail" type="email" :forPrint="forPrint"/>

      <div class="field">
        <label class="checkbox">
          <input name="sleva" type="checkbox">
          Uplatnit slevu na sourozence
        </label>
      </div>

      <AdditionalInfo/>

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
  props: {},
  data: () => ({
    forPrint: false
  })
};
</script>

<style>
</style>
