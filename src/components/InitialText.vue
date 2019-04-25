<template>
  <section>
    <p class="has-text-centered" v-html="text"></p>
  </section>
</template>

<script>
export default {
  name: 'InitialText',
  props: {
    text: String,
  },
}
</script>
