<template>
  <div id="loginPage_css">
    <h1>Welcome to the Flash Card App!</h1>
    <img src="../assets/flash_cards.png" alt="Flash Cards">
    <br>
    <p class="displayInline">If you already have an account, please enter your username and password:</p>
    <br>
    <input type="text" placeholder="Type your username:" v-model="userNameInput" /> 
    <input type="password" placeholder="Type your password:" v-model="passwordInput" @keyup.enter="logIn"/>
    <br>
    <button class="submitButton_css" v-on:click="logIn()">Log In</button>
    <br>
    <p class="displayInline">If you do not already have an account, please create one by entering a username and password:</p>
    <br>
    <input type="text" placeholder="Type a new username:" v-model="userNameInputNew" /> 
    <input type="password" placeholder="Type a new password:" v-model="passwordInputNew" @keyup.enter="signUp"/>
    <br>
    <button class="submitButton_css" v-on:click="signUp()">Sign Up</button>
    <br>
    <!-- https://devcenter.heroku.com/articles/free-dyno-hours -->
    <p class="displayInline">Please note that it takes a few seconds for the Heroku server to wake up from sleep for the first time after not being used over a period of 30 minutes.</p>
    <div class="snackbar" id="snackbar1">Incorrect Password</div>
    <div class="snackbar" id="snackbar2">UserName Already Taken</div>
    <div class="snackbar" id="snackbar3">User Not Found</div>
    <div class="snackbar" id="snackbar4">Please enter a valid username or password.</div>
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
      if (this.userNameInput == "" || this.passwordInput == "") {
        this.showSnackBar("snackbar4");
        this.clearLogInInputs();
        return;
      }
      const responseFromUsers = await axios.post(url+"/login",{userName:this.userNameInput,userPassword:this.passwordInput});
      const user = responseFromUsers.data;

      if (responseFromUsers.status==205){
        this.showSnackBar("snackbar1");
        this.clearLogInInputs();
        return;
      }
      if (responseFromUsers.status==202){
        this.showSnackBar("snackbar3");
        this.clearLogInInputs();
        return;
      }
      
      this.$emit("emitUser", user);
      this.clearLogInInputs();
      this.$router.push({ path: '/welcome/' });
    },
    async signUp () {
      if (this.userNameInputNew == "" || this.passwordInputNew == "") {
        this.showSnackBar("snackbar4");
        this.clearSignUpInputs();
        return;
      }
      const response = await axios.post(url,{userName:this.userNameInputNew, userPassword:this.passwordInputNew});
      if (response.status==205){
        this.showSnackBar("snackbar2");
        this.clearSignUpInputs();
        return;
      }
      const userObj=response.data;
      this.clearSignUpInputs();
      this.$emit("emitUser", userObj);
      this.$router.push({ path: '/welcome/' })
    },
    showSnackBar(snackBarNum) {
      // Get the snackbar DIV
      var x = document.getElementById(snackBarNum);
      // Add the "show" class to DIV
      x.classList.add("show");
      // After 3 seconds, remove the show class from DIV
      setTimeout(function(){ x.classList.remove("show"); }, 3000);
    },
    clearLogInInputs(){
      this.userNameInput = "";
      this.passwordInput = "";
    },
    clearSignUpInputs(){
      this.userNameInputNew = "";
      this.passwordInputNew = "";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#loginPage_css {
  background-color:#325573;
  color:#B6D6F2;
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  min-height:100vh;
  /* this extends the background color when you scroll */
  overflow-y:auto; 
}

.submitButton_css {
  color:#14075e;
  background-color:#bfbfc5;
}

.displayInline {
  display:inline;
}
/* The snackbar - position it at the bottom and in the middle of the screen */
.snackbar {
  visibility: hidden; /* Hidden by default. Visible on click */
  min-width: 250px; /* Set a default minimum width */
  /*margin-left: -125px;*/ /* Divide value of min-width by 2 */
  background-color: #333; /* Black background color */
  color: #fff; /* White text color */
  text-align: center; /* Centered text */
  border-radius: 2px; /* Rounded borders */
  padding: 16px; /* Padding */
  position: fixed; /* Sit on top of the screen */
  z-index: 1; /* Add a z-index if needed */
  /*left: 50%;*/ /* Center the snackbar */
  bottom: 30px; /* 30px from the bottom */
  /* I had to add these next ones to fix the formatting */
  left:3px;
  right:3px;
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
.snackbar.show {
  visibility: visible; /* Show the snackbar */
  /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
  However, delay the fade out process for 2.5 seconds */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}

</style>