<template>
  <quiz></quiz>
</template>

<script>

  import Quiz from "./Quiz";

  const fb = require('../config/firebaseConfig.js');

  export default {
    name: "Game",
    components: {Quiz},
    data() {
      return {
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
