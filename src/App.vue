<template>
  <div id="app">
    <div class="app-wrapper box">
      <Logo/>
      <Heading title="Přihláška na tábor" subtitle="24. skautského oddílu"/>
      <InitialText
        text="Přihlašuji svého syna na letní stanový tábor 24. skautského oddílu ve Vranicích u Jarošova, který se koná
        od soboty 29. června do neděle 14. července 2019."
      />
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
import html2pdf from "html2pdf.js";

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
    jsonFields
  }),
  mounted() {
    this.$root.$on("formSubmitted", values => alert(JSON.stringify(values)));
    const element = document.getElementById("app");
    var opt = {
      margin: 1,
      filename: "myfile.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };

    // New Promise-based usage:
    html2pdf()
      .set(opt)
      .from(element)
      .save();
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
