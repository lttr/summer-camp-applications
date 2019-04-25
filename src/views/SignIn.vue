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
import { signIn, signOut } from '../firebase'
export default {
  name: 'SignIn',
  methods: {
    signIn: function() {
      signIn()
    },
    signOut: function() {
      signOut()
    },
  },
}
</script>
<style scoped></style>
