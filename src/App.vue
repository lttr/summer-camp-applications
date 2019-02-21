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

<style>
#app {
  margin: 0 auto;
  max-width: 44rem;
  position: relative;
}
.main {
  margin: 0 auto;
}
section {
  margin: 3rem 1.5rem;
}
</style>