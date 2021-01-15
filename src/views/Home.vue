<template>
  <PageWithBar>
    <section class="level">
      <p class="level-item">
        <router-link v-if="!authState.signedIn" to="/sign-in" class="button is-link">
          Přihlásit se
        </router-link>
        <router-link v-if="authState.signedIn" to="/admin" class="button is-link">
          Administrace
        </router-link>
      </p>
      <p v-if="authState.signedIn" class="level-item">
        <a v-if="authState.signedIn" href="#" @click.prevent="signOut" class="button is-link">
          Odhlásit se
        </a>
        přihlášen jako {{ authState.signedInUser.email }}
      </p>
    </section>
  </PageWithBar>
</template>

<script>
import PageWithBar from '../layouts/PageWithBar.vue'
import { auth } from '../firebase'
import { authState } from '../auth'

export default {
  name: 'Home',
  data: function () {
    return {
      username: '',
      authState: authState,
    }
  },
  components: {
    PageWithBar,
  },
  methods: {
    signOut: function () {
      auth.signOut().then(() => {
        this.$router.push('/sign-in')
      })
    },
  },
  created: function () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.username = user.email
      }
    })
  },
}
</script>
