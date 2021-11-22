<template>
  <div id="loginPage_css">
    <h1>Welcome to the Flash Card App!</h1>
    <br>
    <img src="../assets/flash_cards.png" alt="Flash Cards">
    <br>
    <button v-on:click="logIn()">Log In</button>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'LoginPage',
  components: {
    
  },
  props: {
  },
  data () {
      return {};
  },
  methods: {
    async logIn () {
        this.$router.push({ path: '/welcome/' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#loginPage_css {
  background-color:#638f9d;
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
}

.displayInline {
  display:inline;
}

</style>