<template>
  <main>
    <h1 class="title">SignIn</h1>
    <div>
      <button @click="signIn">Sign In</button>
      <button @click="signOut">Sign Out</button>
    </div>
    <section>
      <div id="firebaseui-auth-container"></div>
    </section>
  </main>
</template>

<script>
import firebase from 'firebase/app'
import { signInWithFirebase, signOut, auth } from '../firebase'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

async function initializeFirebaseAuthUi() {
  const uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    tosUrl: () => {
      alert('Nic tu není')
    },
    privacyPolicyUrl: () => {
      alert('Nic tu není')
    },
  }

  const ui = new firebaseui.auth.AuthUI(auth)
  ui.start('#firebaseui-auth-container', uiConfig)
}

export default {
  name: 'SignIn',
  methods: {
    signIn: async function () {
      await signInWithFirebase()
      this.$router.push(this.$route.query.redirect || '/')
    },
    signOut: function () {
      signOut()
    },
  },
  mounted: () => {
    initializeFirebaseAuthUi()
  },
}
</script>
<style scoped></style>
