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
        required="required"
        type="text"
        :class="[forPrint === false ? '' : 'is-static', 'input']"
        aria-required="true"
      >
    </div>
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
    type: String
  }
};
</script>

<style>
</style>
