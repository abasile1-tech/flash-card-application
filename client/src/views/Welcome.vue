<template>
  <div id="welcome_css">
    <h1>Welcome to the Flash Card App!</h1>
    <br>
    <p class="displayInline"> You currently have {{this.deckObjectList.length}} decks in your library.</p>
    <br><br>
    <p class="displayInline">Please enter the name of your new deck into the textbox:</p>
    <input type="text" v-model="deckInput" @keyup.enter="submit"/>
    <button v-on:click="submit">submit</button>
    <br>
    <p>When you have decks, they show up here. </p>
    <p>Click on the deck that you want to work on and you will be redirected to that deck's page.</p>
    <div class="flexContainer">
        <button class=deckButtons :key="deck" v-for="deck in this.deckObjectList" v-on:click="goToDeck(deck)">{{deck.deckName}}</button>
    </div>
    <br>
    <img src="../assets/flash_cards.png" alt="Flash Cards">
    <br>
  </div>
</template>

<script>
import axios from 'axios';
const url = '/api/decks/';

export default {
  name: 'Welcome',
  components: {
    
  },
  props: {
  },
  data () {
    return {
      deckInput:"",
      deckObjectList:[]
    }
  },
  methods: {
    async submit () {
      const response = await axios.post(url,{deckName:this.deckInput});
      if(response.status!==201){
        console.log("error: ",response);
      }
      this.deckObjectList.push(response.data);
      this.deckInput = "";
    },
    goToDeck (deckObj) {
      //emit deck
      this.$emit("emitDeck", deckObj);
      //advance route
      this.$router.push({ path: `/single-deck/${deckObj.deckName}` })
    }
  },
  async created(){
    const response = await axios.get(url); 
    this.deckObjectList = response.data;
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
}
a {
  color: #42b983;
}

.displayInline {
  display:inline;
}
.deckButtons {
    color:blue;
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
</style>
