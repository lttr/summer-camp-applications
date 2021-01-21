<template>
  <PageWithBar>
    <div id="firebaseui-auth-container"></div>
  </PageWithBar>
</template>

<script>
import firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { signInWithFirebase, auth, db } from '../firebase'
import { authState } from '../auth'
import PageWithBar from '../layouts/PageWithBar'

export default {
  name: 'SignIn',
  components: {
    PageWithBar,
  },
  methods: {
    signIn: async function () {
      await signInWithFirebase()
      this.$router.push(this.$route.query.redirect || '/')
    },
    handleSignedInUser: function (user) {
      authState.signedIn = true
      authState.signedInUser = user
      return db
        .collection('admins')
        .get()
        .then((qs) => {
          if (qs.docs.find((x) => x.id === user.uid)) {
            authState.isAdmin = true
          }
        })
    },
    initializeFirebaseAuthUi: function () {
      const uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: (authResult) => {
            if (authResult.user) {
              this.handleSignedInUser(authResult.user).then(() => {
                this.$router.push(this.$route.query.redirect || '/')
              })
            }
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
