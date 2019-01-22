<template>
  <form class="section">
    <h3 class="subtitle is-4">Táborník</h3>
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

    <h3 class="subtitle is-4">Matka</h3>
    <div class="field-body field">
      <TextField name="jmeno-matky" displayName="Jméno" type="text" :forPrint="forPrint"/>
      <TextField name="prijmeni-matky" displayName="Příjmení" type="text" :forPrint="forPrint"/>
    </div>
    <TextField name="telefon-matky" displayName="Telefon" type="tel" :forPrint="forPrint"/>
    <TextField name="email-matky" displayName="E-mail" type="email" :forPrint="forPrint"/>

    <h3 class="subtitle is-4">Otec</h3>
    <div class="field-body field">
      <TextField name="jmeno-otce" displayName="Jméno" type="text" :forPrint="forPrint"/>
      <TextField name="prijmeni-otce" displayName="Příjmení" type="text" :forPrint="forPrint"/>
    </div>
    <TextField name="telefon-otce" displayName="Telefon" type="tel" :forPrint="forPrint"/>
    <TextField name="email-otce" displayName="E-mail" type="email" :forPrint="forPrint"/>

    <div class="field form-footer">
      <input type="submit" disabled="disabled" class="button is-info" value="Odeslat přihlášku">
    </div>
  </form>
</template>

<script>
import TextField from "./TextField.vue";

export default {
  name: "ApplicationForm",
  components: {
    TextField
  },
  props: {},
  data: () => ({
    forPrint: false
  })
};
</script>

<style>
</style>
