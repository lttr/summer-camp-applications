<template>
  <main>
    <h1 class="title">SignIn</h1>
    <div>
      <button @click="signIn">Sign In</button>
      <button @click="signOut">Sign Out</button>
    </div>
  </main>
</template>

<script>
import { signInWithFirebase, signOut } from '../firebase'
export default {
  name: 'SignIn',
  methods: {
    signIn: async function() {
      await signInWithFirebase()
      this.$router.push(this.$route.query.redirect || '/')
    },
    signOut: function() {
      signOut()
    },
  },
}
</script>
<style scoped></style>
