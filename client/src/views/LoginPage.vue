<template>
  <div id="loginPage_css">
    <h1>Welcome to the Flash Card App!</h1>
    <img src="../assets/flash_cards.png" alt="Flash Cards">
    <br>
    <p class="displayInline">Please enter your username:</p>
    <input type="text" v-model="userNameInput" @keyup.enter="logIn"/> 
    <br>
    <button v-on:click="logIn()">Log In</button>
  </div>
</template>

<script>
import axios from 'axios';
const url = '/api/users/';

export default {
  name: 'LoginPage',
  components: {
    
  },
  props: {
  },
  data () {
      return {
        userNameInput:"",
      };
  },
  methods: {
    async logIn () {
        const responseFromUsers = await axios.get(url);
        const usersNameList = responseFromUsers.data;

        let userExists = false;

        for (const user of usersNameList){
          if (user.userName===this.userNameInput){
            userExists = true;
          }
        }

        if (!userExists) {
          const response = await axios.post(url,{userName:this.userNameInput});
          if(response.status!==201){
            console.log("error: ",response);
          }
        }
        this.userNameInput = "";
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