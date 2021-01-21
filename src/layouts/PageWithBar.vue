<template>
  <div>
    <header>
      <Navigation />
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<script>
import Navigation from '../components/Navigation.vue'

export default {
  name: 'PageWithBar',
  components: {
    Navigation,
  },
}
</script>

<style></style>
