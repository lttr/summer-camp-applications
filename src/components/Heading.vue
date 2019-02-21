<template>
  <section class="has-text-centered">
    <h1 class="title is-2">{{ title }}</h1>
    <h2 class="subtitle is-4">{{ subtitle }}</h2>
  </section>
</template>

<script>
export default {
  name: "Heading",
  props: {
    title: String,
    subtitle: String
  }
};
</script>
