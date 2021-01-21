<template>
  <PageWithBar>
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="box">
          <Heading
            title="Přihlášky na tábor"
            subtitle="Aplikace pro přihlašování na skautské tábory"
          />
        </div>
      </div>
    </div>
  </PageWithBar>
</template>

<script>
import PageWithBar from '../layouts/PageWithBar.vue'
import Heading from '../components/Heading.vue'
import { auth } from '../firebase'
import { authState } from '../auth'

export default {
  name: 'Home',
  data: function () {
    return {
      authState: authState,
    }
  },
  components: {
    PageWithBar,
    Heading,
  },
  methods: {
    signOut: function () {
      auth.signOut().then(() => {
        this.$router.push({ name: 'SignIn' })
      })
    },
  },
}
</script>
