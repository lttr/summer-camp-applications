<template>
  <div id="app">
    <div class="app-wrapper box">
      <Logo/>
      <Heading :title="titulek" :subtitle="podtitulek"/>
      <InitialText :text="uvodniText"/>
      <CampInfo/>
      <div class="form-wrapper">
        <FormJson
          :formFields="jsonFields"
          formName="'applicationForm'"
          mandatoryAsteriskLegend=" "
          btnSubmitText="Odeslat přihlášku"
          btnResetText=" "
        />
      </div>
    </div>
  </div>
</template>

<script>
import Heading from "./components/Heading.vue";
import InitialText from "./components/InitialText.vue";
import CampInfo from "./components/CampInfo.vue";
import Logo from "./components/Logo.vue";
import "bulma/css/bulma.min.css";
import "vue-form-json/dist/vue-form-json.css";
import FormJson from "vue-form-json";
import jsonFields from "@/assets/fields";
import { config } from "./config.js";

export default {
  name: "app",
  components: {
    Logo,
    Heading,
    InitialText,
    CampInfo,
    FormJson
  },
  data: () => ({
    jsonFields,
    ...config
  }),
  mounted() {
    this.$root.$on("formSubmitted", values => alert(JSON.stringify(values)));
  }
};
</script>

<style>
.form-wrapper {
  display: flex;
  justify-content: center;
}
/* .form-sized {
  max-width: 50rem;
} */
.app-wrapper {
  margin: 0 auto;
  max-width: 44rem;
  position: relative;
}
</style>
