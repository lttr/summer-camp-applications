<template>
  <div>
    <div class="form-wrapper">
      <p class="form-sized has-text-centered">{{ text }}</p>
    </div>
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
