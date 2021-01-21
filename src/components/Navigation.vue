<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item">
        <Logo class="logo" />
      </div>

      <a
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': isActive }"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="() => (isActive = !isActive)"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }">
      <div class="navbar-start">
        <router-link :to="{ name: 'Home' }" class="navbar-item">Domů</router-link>
        <router-link :to="{ name: 'OrgAdmin' }" class="navbar-item">Administrace</router-link>
      </div>

      <div class="navbar-end">
        <div v-if="authState.signedIn" class="navbar-item">
          <span class="has-text-grey">Přihlášen jako {{ authState.signedInUser.email }} </span>
        </div>
        <div class="navbar-item">
          <button v-if="authState.signedIn" @click="signOut()" class="button is-light">
            Odhlásit se
          </button>
          <router-link v-else :to="{ name: 'SignIn' }" class="button is-light">
            Přihlásit se
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from '../components/Logo.vue'
import { signOut } from '../firebase'
import { authState } from '../auth'

export default {
  name: 'Navigation',
  components: {
    Logo,
  },
  data: function () {
    return {
      authState: authState,
      isActive: false,
    }
  },
  methods: {
    signOut: function () {
      signOut()
    },
  },
}
</script>

<style scoped>
.navbar {
  min-height: 2rem;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 1rem;
}
</style>
