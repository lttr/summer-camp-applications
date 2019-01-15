<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <section>
      <FormJson :formFields="jsonFields" formName="'applicationForm'" />
    </section>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import 'bulma/css/bulma.min.css'
import 'vue-form-json/dist/vue-form-json.css'
import FormJson from 'vue-form-json'
import jsonFields from '@/assets/fields'

export default {
  name: 'app',
  components: {
    HelloWorld,
    FormJson,
  },
  data: () => ({ jsonFields }),
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
