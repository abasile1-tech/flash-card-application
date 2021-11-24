<template>
  <div id="loginPage_css">
    <h1>Welcome to the Flash Card App!</h1>
    <img src="../assets/flash_cards.png" alt="Flash Cards">
    <br>
    <p class="displayInline">If you already have an account, please enter your username and password:</p>
    <br>
    <input type="text" placeholder="Type your username" v-model="userNameInput" /> 
    <input type="text" placeholder="Type your password" v-model="passwordInput" @keyup.enter="logIn"/>
    <br>
    <button v-on:click="logIn()">Log In</button>
    <br>
    <p class="displayInline">If you do not already have an account, please create one by entering a username and password:</p>
    <br>
    <input type="text" placeholder="Type a new username" v-model="userNameInputNew" /> 
    <input type="text" placeholder="Type a new password" v-model="passwordInputNew" @keyup.enter="signUp"/>
    <br>
    <button v-on:click="signUp()">Sign Up</button>
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
        passwordInput:"",
        userNameInputNew:"",
        passwordInputNew:""
      };
  },
  methods: {
    async logIn () {
        const responseFromUsers = await axios.get(url);
        const usersNameList = responseFromUsers.data;

        let userObj = {};

        let userExists = false;

        for (const user of usersNameList){
          if (user.userName===this.userNameInput){
            userExists = true;
            userObj = user;
          }
        }

        if (!userExists) {
          const response = await axios.post(url,{userName:this.userNameInput});
          if(response.status!==201){
            console.log("error: ",response);
          }
          userObj=response.data;
        }
        this.$emit("emitUser", userObj);
        this.userNameInput = "";
        this.passwordInput = "";
        this.$router.push({ path: '/welcome/' })
    },
    async signUp () {
      const responseFromUsers = await axios.get(url);
      const usersNameList = responseFromUsers.data;

      let userObj = {};

      let userExists = false;

      for (const user of usersNameList){
        if (user.userName===this.userNameInputNew){
          userExists = true;
          console.log("user already exists");
          this.userNameInputNew = "";
          this.passwordInputNew = "";
        }
      }

      if (!userExists) {
        const response = await axios.post(url,{userName:this.userNameInputNew, userPassword:this.passwordInputNew});
        if(response.status!==201){
          console.log("error: ",response);
        }
        userObj=response.data;
        this.userNameInputNew = "";
        this.passwordInputNew = "";
        this.$emit("emitUser", userObj);
        this.$router.push({ path: '/welcome/' })
      }
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