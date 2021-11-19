<template>
  <div id="app">
    <router-view v-on:emitDeck="emitDeck" v-bind:emittedObject="objectToPass"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data (){
    return {
      objectToPass:{}
    }
  },
  methods: {
    emitDeck(obj){
      this.objectToPass=obj;
    }
  }
}
</script>

<style>
body{
  background-color:lightblue;
}

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  /* font-family: 'Roboto', sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-family: 'Roboto', sans-serif;
  font-size: large;
}
button, input {
  font-family: 'Roboto', sans-serif;
  font-size: large;
  margin: 0.3em;
}

</style>
