<template>
  <main>
    <h1 class="title">SignIn</h1>
    <section>
      <div id="firebaseui-auth-container"></div>
    </section>
  </main>
</template>

<script>
import firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { signInWithFirebase, signOut, auth } from '../firebase'
import { authState } from '../auth'

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
    handleSignedInUser: function (user) {
      authState.signedIn = true
      authState.signedInUser = user
    },
    initializeFirebaseAuthUi: function () {
      const uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: (authResult, redirectUrl) => {
            if (authResult.user) {
              this.handleSignedInUser(authResult.user)
            }
            this.$router.push(this.$route.query.redirect || '/')
            return false
          },
        },
        signInSuccessUrl: '/',
        signInOptions: [
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false,
          },
        ],
        tosUrl: () => {
          alert('Nic tu není')
        },
        privacyPolicyUrl: () => {
          alert('Nic tu není')
        },
      }

      const ui = firebaseui.auth.AuthUI.getInstance() ?? new firebaseui.auth.AuthUI(auth)
      ui.start('#firebaseui-auth-container', uiConfig)
    },
  },
  mounted: function () {
    this.initializeFirebaseAuthUi()
  },
}
</script>
<style scoped></style>
