<template>
  <div class="section">
    <p class="form-sized has-text-centered" v-html="text"></p>
  </div>
</template>

<script>
export default {
  name: "InitialText",
  props: {
    text: String
  }
};
</script>

<style>
.info {
  font-style: normal;
}
.info-label {
  width: 7em;
  display: inline-block;
}
</style>
