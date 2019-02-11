<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import "bulma/css/bulma.min.css";

export default {
  name: "App"
};
</script>

<style scoped>
#app {
  margin: 0 auto;
  max-width: 44rem;
  position: relative;
}
</style>