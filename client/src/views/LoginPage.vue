<template>
  <div id="loginPage_css">
    <h1 data-testid="login-h1">Welcome to the Flash Card App!</h1>
    <div id="logoANDkeys">
      <img
        id="KEYleft"
        src="../assets/flashcardKeySmallLeft.png"
        alt="KEYleft"
      />
      <img id="logoImage" src="../assets/flashcardLogoSmall.png" alt="LOGO" />
      <img id="KEYright" src="../assets/flashcardKeySmall.png" alt="KEYright" />
    </div>
    <img src="../assets/flash_cards.png" alt="Flash Cards" />
    <br />

    <div id="overarchingLoginDiv">
      <div id="loginSignupSelectDiv">
        <p class="loginSignupText" id="loginParagraph" v-if="showLogin">
          Log In
        </p>
        <button
          class="loginSignupButton_css"
          id="logInButton"
          v-if="!showLogin"
          v-on:click="activateShowLogin()"
        >
          Log In
        </button>
        <button
          class="loginSignupButton_css"
          id="signUpButton"
          v-if="showLogin"
          v-on:click="deActivateShowLogin()"
        >
          Sign Up
        </button>
        <p class="loginSignupText" id="signupParagraph" v-if="!showLogin">
          Sign Up
        </p>
      </div>

      <div id="loginSignupDiv1" v-if="showLogin">
        <input
          data-testid="login-username"
          type="text"
          placeholder="Type your username:"
          v-if="showLogin"
          v-model="userNameInput"
        />
        <br v-if="showLogin" />
        <input
          data-testid="login-password"
          type="password"
          placeholder="Type your password:"
          v-if="showLogin"
          v-model="passwordInput"
          @keyup.enter="logIn"
        />
        <br v-if="showLogin" />
        <button
          data-testid="login-button"
          class="submitButton_css"
          v-if="showLogin"
          v-on:click="logIn()"
        >
          Submit
        </button>
      </div>

      <div id="loginSignupDiv2" v-if="!showLogin">
        <input
          type="text"
          placeholder="Type a new username:"
          v-if="!showLogin"
          v-model="userNameInputNew"
        />
        <br v-if="!showLogin" />
        <input
          type="password"
          placeholder="Type a new password:"
          v-if="!showLogin"
          v-model="passwordInputNew"
          @keyup.enter="signUp"
        />
        <br v-if="!showLogin" />
        <button
          class="submitButton_css"
          v-if="!showLogin"
          v-on:click="signUp()"
        >
          Submit
        </button>
      </div>
    </div>

    <div id="notificationPopup" v-if="!boxAcknowledged">
      <div id="notificationBox" v-if="!boxAcknowledged">
        To function properly, this website stores some essential information in
        the browser's local storage.
      </div>
      <button
        id="notificationButton"
        v-if="!boxAcknowledged"
        v-on:click="notificationButtonClicked()"
      >
        Okay
      </button>
    </div>
    <div class="snackbar" id="snackbar1">Incorrect Password</div>
    <div class="snackbar" id="snackbar2">UserName Already Taken</div>
    <div class="snackbar" id="snackbar3">User Not Found</div>
    <div class="snackbar" id="snackbar4">
      Please enter a valid username or password.
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
const url = "/api/users/";

// Define the type for your component
type LoginPageComponent = {
  userNameInput: string;
  passwordInput: string;
  userNameInputNew: string;
  passwordInputNew: string;
  showLogin: boolean;
  boxAcknowledged: boolean;
  // Add other properties if needed
};

import Vue from "vue";

export default Vue.extend({
  name: "LoginPage",
  components: {},
  props: {},
  data(): LoginPageComponent {
    return {
      userNameInput: "",
      passwordInput: "",
      userNameInputNew: "",
      passwordInputNew: "",
      showLogin: true,
      boxAcknowledged: false,
    };
  },
  methods: {
    notificationButtonClicked(): void {
      this.boxAcknowledged = true;
    },

    activateShowLogin(): void {
      this.showLogin = true;
    },
    deActivateShowLogin(): void {
      this.showLogin = false;
    },
    async logIn() {
      if (this.userNameInput == "" || this.passwordInput == "") {
        this.showSnackBar("snackbar4");
        this.clearLogInInputs();
        return;
      }
      const responseFromUsers = await axios.post(url + "/login", {
        userName: this.userNameInput,
        userPassword: this.passwordInput,
      });
      const user = responseFromUsers.data;

      if (responseFromUsers.status == 205) {
        this.showSnackBar("snackbar1");
        this.clearLogInInputs();
        return;
      }
      if (responseFromUsers.status == 202) {
        this.showSnackBar("snackbar3");
        this.clearLogInInputs();
        return;
      }

      this.$emit("emitUser", user);
      this.clearLogInInputs();
      this.$router.push({ path: "/welcome/" });
    },
    async signUp() {
      if (this.userNameInputNew == "" || this.passwordInputNew == "") {
        this.showSnackBar("snackbar4");
        this.clearSignUpInputs();
        return;
      }
      const response = await axios.post(url, {
        userName: this.userNameInputNew,
        userPassword: this.passwordInputNew,
      });
      if (response.status == 205) {
        this.showSnackBar("snackbar2");
        this.clearSignUpInputs();
        return;
      }
      const userObj = response.data;
      this.clearSignUpInputs();
      this.$emit("emitUser", userObj);
      this.$router.push({ path: "/welcome/" });
    },
    showSnackBar(snackBarNum) {
      // Get the snackbar DIV
      var x = document.getElementById(snackBarNum);
      // Add the "show" class to DIV
      x?.classList.add("show");
      // After 3 seconds, remove the show class from DIV
      setTimeout(function () {
        x?.classList.remove("show");
      }, 3000);
    },
    clearLogInInputs() {
      this.userNameInput = "";
      this.passwordInput = "";
    },
    clearSignUpInputs() {
      this.userNameInputNew = "";
      this.passwordInputNew = "";
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#loginPage_css {
  background-color: #eee1d6;
  color: #8c1a62;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  /* this extends the background color when you scroll */
  overflow-y: auto;
}

#notificationPopup {
  border: solid black;
  background-color: white;
  display: inline-flex;
  width: 80%;
  max-width: 30em;
  margin: auto;
  border-radius: 8px;
}

#logoImage {
  padding-left: 0.5em;
  padding-right: 0.5em;
}

#KEYleft {
  padding-bottom: 1.5em;
}

#KEYright {
  padding-bottom: 1.5em;
}

#overarchingLoginDiv {
  width: 80%;
  max-width: 30em;
  margin: auto;
}

#loginSignupDiv1 {
  border-bottom: solid black;
  border-left: solid black;
  border-right: solid black;
  margin: auto;
  background-color: #8c1a62;
  color: black;
  border-radius: 0px 15px 15px 15px;
  padding: 0.7em 0em 0.7em 0em;
  margin-bottom: 0.5em;
}

#loginSignupDiv2 {
  border-bottom: solid black;
  border-left: solid black;
  border-right: solid black;
  margin: auto;
  background-color: #5c1141;
  color: #eee1d6;
  border-radius: 0px 15px 15px 15px;
  padding: 0.7em 0em 0.7em 0em;
  margin-bottom: 0.5em;
}

.loginSignupText {
  color: #14075e;
  background-color: #bfbfc5;
  width: 30%;
  margin: 0%;
}

.loginSignupButton_css {
  color: #14075e;
  background-color: #bfbfc5;
  border-radius: 0%;
  margin: 0%;
  width: 30%;
}

#loginSignupSelectDiv {
  margin: auto;
  display: flex;
}

#logInButton {
  border-bottom: solid black;
  border-radius: 15px 0px 0px 0px;
  background-color: #8c1a62;
  color: #eee1d6;
  padding: 0.3em;
}

#loginParagraph {
  background-color: #8c1a62;
  border-top: solid black;
  border-right: solid black;
  border-left: solid black;
  box-shadow: 0px;
  border-radius: 15px 0px 0px 0px;
  color: #eee1d6;
  padding: 0.3em;
}

#signUpButton {
  border-bottom: solid black;
  border-radius: 0px 15px 0px 0px;
  background-color: #5c1141;
  color: #eee1d6;
  padding: 0.3em;
}

#signupParagraph {
  background-color: #5c1141;
  border-top: solid black;
  border-right: solid black;
  border-left: solid black;
  box-shadow: 0px;
  border-radius: 0px 15px 0px 0px;
  color: #eee1d6;
  padding: 0.3em;
}

.submitButton_css {
  color: #14075e;
  background-color: #2ad592;
}
</style>
