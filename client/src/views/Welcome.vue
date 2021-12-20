<template>
  <div id="welcome_css"> 
    <h1>Welcome, {{emittedUser.userName?emittedUser.userName:""}}!</h1>
    <br>
    <p class="displayInline" v-if="onlyOneDeck"> You currently have {{this.deckObjectList.length}} deck in your library.</p>
    <p class="displayInline" v-else> You currently have {{this.deckObjectList.length}} decks in your library.</p>
    <br><br>
    <p class="displayInline">Please enter the name of your new deck into the textbox:</p>
    <input type="text" placeholder="Type the new deck name:" v-model="deckInput" @keyup.enter="submit"/> 
    <button v-on:click="submit">Submit</button> 
    <br>
    <p>When you have decks, they show up here. </p>
    <p>Click on the deck that you want to work on and you will be redirected to that deck's page.</p>
    <div class="flexContainer">
        <button class=deckButtons :key="deck" v-for="deck in this.deckObjectList" v-on:click="goToDeck(deck)">{{deck.deckName}}</button>
    </div>
    <br>
    <button v-on:click="returnToLoginPage()">Return To Login Page</button>
    <div class="snackbar" id="snackbar4">Please enter a valid deck name.</div>
  </div>
</template>

<script>
import axios from 'axios';
const url = '/api/decks/';
const urlForUsers = '/api/users/';

export default {
  name: 'Welcome',
  components: {
    
  },
  props: {
    emittedUser: {
      Type:Object,
      required: true,
            _id: {
                type: String,
                required: true
            },
            userName: {
                type: String,
                required: true
            }
    }
  },
  data () {
    return {
      deckInput:"",
      deckObjectList:[],
      onlyOneDeck:false
    }
  },
  methods: {
    async submit () {
      if (this.deckInput == "") {
          this.showSnackBar("snackbar4");
        return;
      }
      const response = await axios.post(url,{deckName:this.deckInput,userId:this.emittedUser._id});
      if(response.status!==201){
        console.log("error: ",response);
      }
      this.deckObjectList.push(response.data);
      if (this.deckObjectList.length==1){
        this.onlyOneDeck=true;
      }else{
        this.onlyOneDeck=false;
      }
      this.deckInput = "";
    },
    goToDeck (deckObj) {
      //emit deck
      this.$emit("emitDeck", deckObj);
      //advance route
      this.$router.push({ path: `/welcome/single-deck/${deckObj.deckName}` });
    },
    returnToLoginPage(){
      localStorage.removeItem("emittedUser._id");
      this.$router.push({path: `/`});
    },
    showSnackBar(snackBarNum) {
      // Get the snackbar DIV
      var x = document.getElementById(snackBarNum);
      // Add the "show" class to DIV
      x.classList.add("show");
      // After 3 seconds, remove the show class from DIV
      setTimeout(function(){ x.classList.remove("show"); }, 3000);
    }
  },
  async created(){
    if (this.emittedUser._id != undefined) {
      localStorage.setItem("emittedUser._id",this.emittedUser._id);
      if (this.emittedUser.userName == undefined){
        const responseFromUsers = await axios.get(urlForUsers+this.emittedUser._id);
        this.emittedUser = responseFromUsers.data;
      }
    }
    if (this.emittedUser._id == undefined) {
      this.emittedUser._id = localStorage.getItem("emittedUser._id")
      const responseFromUsers = await axios.get(urlForUsers+this.emittedUser._id);
      this.emittedUser = responseFromUsers.data;
    }
    const response = await axios.get(url+this.emittedUser._id); 
    this.deckObjectList = response.data;
    if (this.deckObjectList.length==1){
      this.onlyOneDeck=true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#welcome_css {
  background-color:lightskyblue;
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  min-height:100vh;
  /* this extends the background color when you scroll */
  overflow-y:auto;
}
a {
  color: #42b983;
}

.displayInline {
  display:inline;
}
.deckButtons {
    color:#0e0e9f;
    background-color: darkgrey;
    font-size: 24px;
    border: 3px solid black;
    width:fit-content;
    
}

.deckButtons:hover {
    color: black;
    background-color: rgb(43, 76, 226);
    font-size: 24px;
    border: 3px solid rgb(0, 0, 0);
    width: fit-content;
}

.flexContainer {
    display: flex;
    justify-content: center;
    row-gap: 20px;
    column-gap: 20px;
    flex-flow: wrap;
    
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
