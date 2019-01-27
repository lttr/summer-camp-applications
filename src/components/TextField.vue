<template>
  <div class="field">
    <label :for="name" :type="type" class="label">
      <p>
        {{ displayName }}
        <span
          class="has-text-grey-light is-size-7 is-italic"
          v-if="helpText"
        >{{ helpText }}</span>
      </p>
    </label>
    <div class="control">
      <input
        :id="name"
        :name="name"
        :v-validate="validation"
        type="text"
        :class="[forPrint === false ? '' : 'is-static', errors.has(oname) ? 'is-danger input' : 'input']"
        aria-required="true"
      >
    </div>
    <div class="help is-danger">{{ errors.first(oname) }}</div>
  </div>
</template>

<script>
export default {
  name: "TextField",
  props: {
    displayName: String,
    forPrint: Boolean,
    helpText: String,
    name: String,
    validation: String,
    type: String
  },
  computed: {
    oname() {
      return "'" + this.name + "'";
    }
  }
};
</script>

<style>
</style>
