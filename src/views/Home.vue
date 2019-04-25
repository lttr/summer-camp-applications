<template>
  <div class="wrapper">
    <main class="main box">
      <Logo />
      <Heading
        title="Přihlášky na tábor"
        subtitle="Aplikace pro jednoduché přihlašování na tábor"
      />
    </main>
    <section class="has-text-centered">
      <p>
        <router-link to="/admin" class="has-text-light">administrace</router-link>
      </p>
    </section>
  </div>
</template>

<script>
import Heading from '../components/Heading.vue'
import Logo from '../components/Logo.vue'

export default {
  name: 'Home',
  components: {
    Heading,
    Logo,
  },
}
</script>
