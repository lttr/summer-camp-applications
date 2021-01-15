<template>
  <div>
    <header class="box">
      <Logo />
      <Heading
        title="Přihlášky na tábor"
        subtitle="Aplikace pro jednoduché přihlašování na tábor"
      />
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<script>
import Heading from '../components/Heading.vue'
import Logo from '../components/Logo.vue'

export default {
  name: 'PageWithBar',
  components: {
    Heading,
    Logo,
  },
}
</script>

<style></style>
