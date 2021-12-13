<template>
    <div id="singleDeck_css">
        <h1 v-if="!editDeckNameSelected">{{emittedObject.deckName?emittedObject.deckName:""}}</h1>
        <div class ="textBox">
            <input type="text" placeholder="Type the new deck name" v-model="editDeckNameInput" v-if="editDeckNameSelected" v-focus @keyup.enter="submitEditedDeckName"/>
        </div>
        
        
        <!-- https://vuejs.org/v2/guide/class-and-style.html#With-Components how to use the v-bind-->
        <div class="card" v-bind:class="{flipped: this.cardSide==='Front'}">
            <p class="cardPromptClass1">{{cardSide}}</p>
            <p class="cardPromptClass2" v-if="!addCardFront&&!addCardBack">{{cardPrompt}}</p>
            <input type="text" ref="frontInput" class="cardInputBox" placeholder="Type front text" v-model="cardFrontInput" v-if="addCardFront" v-focus @keyup.enter="flipCard"/>
            <input type="text" ref="backInput" class="cardInputBox" placeholder="Type back text" v-model="cardBackInput" v-if="addCardBack" v-focus @keyup.enter="submitCard"/>
            <div id="cardButtonsDiv">
                <select v-model="selectedLanguage"> 
                    <option disabled value="">Please Select a Language:</option>
                    <option :value="option.name" :key="option" v-for="option in this.optionList">{{option.name}}</option>
                </select>
                <br>
                <button class="cardButton" v-on:click="readCard">Read Card Aloud</button>
                <br>
                <button class="cardNavigationButtons" id="cardNavigationButton1" v-on:click="updateCardIndex(-1)"><img src="../assets/left_arrow_small_crop.png" alt="left arrow" /></button>
                <button class="cardButton" v-on:click="flipCard" v-if="!addCardBack">Flip Card</button>
                <button class="cardButton" v-on:click="submitCard" v-if="addCardBack">Submit Card</button>
                <button class="cardNavigationButtons" id="cardNavigationButton2" v-on:click="updateCardIndex(1)"><img src="../assets/right_arrow_small_crop.png" alt="right arrow" /></button>
            </div>
        </div>
        <p v-if="deleteDeckButtonPressed">Are you sure that you want to delete {{emittedObject.deckName?emittedObject.deckName:""}}?</p>
        <button v-if="deleteDeckButtonPressed" v-on:click="deleteDeck">Yes, delete the deck.</button>
        <button v-if="deleteDeckButtonPressed" v-on:click="doNotDeleteDeck">No, don't delete the deck.</button>
        <button class="addCardButton" v-on:click="addCard">Add Card</button>
        <button class="deleteCardButton" v-on:click="deleteCard">Delete Card</button>
        <div>
            <button class="deckEditButton" v-on:click="editDeckName">Edit Deck Name</button>
            <button class="deckDeleteButton" v-on:click="deleteDeckPressed">Delete Deck</button>
            <br>
            <button class="decksReturnButton" v-on:click="shuffleDeck">Shuffle Deck</button>
            <button class="decksReturnButton" v-on:click="goBackToDecks">Return To Decks</button>
        </div>
        <div class="snackbar" id="snackbar1">There is only one card in the deck. Please add more cards.</div>
        <div class="snackbar" id="snackbar2">There is no card to flip. Please add a card.</div>
        <div class="snackbar" id="snackbar3">There are no cards in the deck. Please add a card.</div>
        <div class="snackbar" id="snackbar4">Please enter a valid deck name.</div>
        <div class="snackbar" id="snackbar5">Any card with blank front or back will not be submitted.</div>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios';
const url = '/api/decks/';

var synth = window.speechSynthesis;

export default {
    props: {
        emittedObject: {
            type: Object,
            required: true,
            _id: {
                type: String,
                required: true
            },
            cards: {
                type: Array,
                required: true
            },
            deckName: {
                type: String,
                required: true
            }
        }
    },
    // https://vuejs.org/v2/guide/custom-directive.html
    // allows the use of v-focus to have the cursor automatically go into the textbox
    directives: {
        focus: {
            // directive definition
            inserted: function (el) {
                Vue.nextTick(() => el.focus());
            }
        }
    },

    data () {
        return {
            cardSide:"Front",
            cardPrompt:"Please add a card by clicking the 'Add Card' button below.",
            cardFrontInput:"",
            cardBackInput:"",
            addCardFront:false,
            addCardBack:false,
            cardsListIndex:0,
            editDeckNameSelected:false,
            editDeckNameInput:"",
            cardId:"",
            deleteDeckButtonPressed:false,
            optionList:[],
            selectedLanguage: ""
        }
    },
    methods: {
        populateVoiceList() {
            this.optionList = synth.getVoices();
        },
        shuffleVueArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = array[i];
                Vue.set(array, i, array[j]);
                Vue.set(array, j, temp);
            }
        },  
        focusOnCardFrontInput () {
            this.$nextTick(() => {
                this.$refs.frontInput.focus();
            });
        },
        focusOnCardBackInput () {
            this.$nextTick(() => {
                this.$refs.backInput.focus();
            });
        },
        readCard () {
            const language = this.optionList.filter(item => item.name === this.selectedLanguage);
            let utterance = new SpeechSynthesisUtterance(this.cardPrompt);
            utterance.voice = language[0];
            speechSynthesis.speak(utterance);
        },
        flipCard () {
            if (this.emittedObject.cards.length === 0 && !this.addCardBack && !this.addCardFront){
                this.showSnackBar("snackbar2");
                return;
            }
            if (this.addCardFront) {
                this.cardSide="Back";
                this.addCardBack=true;
                this.addCardFront=false;
                this.focusOnCardBackInput();
                return;
            }
            if (this.cardSide==="Front") {
                this.cardSide="Back";
                this.cardPrompt=this.emittedObject.cards[this.cardsListIndex].cardBack;
            } else {
                this.cardSide="Front";
                this.cardPrompt=this.emittedObject.cards[this.cardsListIndex].cardFront;
            }   
        },
        addCard () {
            this.addCardFront=true;
        },
        async submitCard () {
            if (this.cardFrontInput == "" || this.cardBackInput == "") {
                this.addCardFront=false;
                this.addCardBack=false;
                this.cardSide="Front";
                this.cardFrontInput="";
                this.cardBackInput="";
                this.showSnackBar("snackbar5");
                if (this.emittedObject.cards.length === 0) {
                    return;
                }
                else
                {   this.cardsListIndex=this.emittedObject.cards.length-1;
                    this.cardPrompt=this.emittedObject.cards[this.cardsListIndex].cardFront;
                    this.cardId=this.emittedObject.cards[this.cardsListIndex]._id;
                    return;
                }
                
            }
            const response = await axios.post(url+this.emittedObject._id+"/cards",{cardFront:this.cardFrontInput,cardBack:this.cardBackInput});
            if(response.status!==201){
                console.log("error: ",response);
            }
            this.emittedObject.cards = response.data.cards;
            this.addCardFront=false;
            this.addCardBack=false;
            this.cardSide="Front";
            this.cardFrontInput="";
            this.cardBackInput="";
            this.cardsListIndex=this.emittedObject.cards.length-1;
            this.cardPrompt=this.emittedObject.cards[this.cardsListIndex].cardFront;
            this.cardId=this.emittedObject.cards[this.cardsListIndex]._id;
        },
        updateCardIndex (indexToAdd) {
            if (this.emittedObject.cards.length === 0){
                this.showSnackBar("snackbar3");
                return;
            }
            if (this.emittedObject.cards.length === 1){
                this.showSnackBar("snackbar1");
                return;
            }
            if (indexToAdd + this.cardsListIndex < 0) {
                this.cardsListIndex = this.emittedObject.cards.length-1;
            } else if (indexToAdd + this.cardsListIndex > this.emittedObject.cards.length-1) {
                this.cardsListIndex = 0;
            } else {
                this.cardsListIndex = indexToAdd + this.cardsListIndex;
            }
            this.cardSide="Front";
            this.cardPrompt=this.emittedObject.cards[this.cardsListIndex].cardFront;
            this.cardId=this.emittedObject.cards[this.cardsListIndex]._id;
        },
        async deleteCard () {
            await axios.delete(url+this.emittedObject._id+"/cards/"+this.cardId);
            this.emittedObject.cards.splice(this.cardsListIndex,1);
            
            if (this.emittedObject.cards.length-1 >= 0){
                this.cardsListIndex = this.cardsListIndex === 0 ? 0 : this.cardsListIndex - 1;
                this.cardPrompt=this.emittedObject.cards[this.cardsListIndex].cardFront;
                this.cardId=this.emittedObject.cards[this.cardsListIndex]._id;
            }
            else{
                this.cardPrompt="Please add a card by clicking the 'Add Card' button below.";
            }
        },
        goBackToDecks () {
            localStorage.removeItem("emittedObject._id");
            //advance route back to the Welcome Page
            this.$router.push({ path: '/welcome' })
        },
        // because I am shuffling the emittedObject.cards array, the shuffling is only temporary. The database is not changed in any way.
        shuffleDeck () {
            if (this.emittedObject.cards.length === 0) {
                this.showSnackBar("snackbar3");
                return
            }
            if (this.emittedObject.cards.length === 1) {
                this.showSnackBar("snackbar1");
                return
            }
            this.shuffleVueArray(this.emittedObject.cards);
        },
        deleteDeckPressed () {
            this.deleteDeckButtonPressed = true;
        },
        async deleteDeck(){
            this.deleteDeckButtonPressed = false;
            await axios.delete(url+this.emittedObject._id+"/deckName");
            this.goBackToDecks();
        },
        async doNotDeleteDeck(){
            this.deleteDeckButtonPressed = false;
        },
        editDeckName(){
            this.editDeckNameSelected=true;
        },
        async submitEditedDeckName(){
            if (this.editDeckNameInput == ""){
                this.editDeckNameSelected=false;
                this.showSnackBar("snackbar4");
                return;
            }
            this.emittedObject.deckName=this.editDeckNameInput;
            const response = await axios.put(url+this.emittedObject._id+"/deckName",{deckName:this.editDeckNameInput});
            if(response.status!==201){
                console.log("error: ",response);
            }
            this.editDeckNameInput="";
            this.editDeckNameSelected=false;
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
    async created () {
        this.populateVoiceList();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = this.populateVoiceList;
        }
        if (this.emittedObject._id != undefined) {
            localStorage.setItem("emittedObject._id",this.emittedObject._id);
            if (this.emittedObject.deckName == undefined) {
                const responseFromDecks = await axios.get(url+'/deck/'+this.emittedObject._id);
                this.emittedObject = responseFromDecks.data;
            }
        }
        if (this.emittedObject._id == undefined) {
            this.emittedObject._id = localStorage.getItem("emittedObject._id")
            const responseFromDecks = await axios.get(url+'/deck/'+this.emittedObject._id);
            this.emittedObject = responseFromDecks.data;
        }
        
        if(this.emittedObject.cards.length!=0){
            this.cardPrompt=this.emittedObject.cards[0].cardFront;
            this.cardId=this.emittedObject.cards[0]._id;
        }
    }
}
</script>

<style scoped>
#cardButtonsDiv{
    vertical-align:40%;
}

#singleDeck_css{
    background-color:lightblue;
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    min-height:100vh;
    overflow-y:auto; 
}
.cardButton {
    width: fit-content;
    height: 2em;
    margin: 0em auto;
    font-size: large;
    background-color:#bfbfc5;
    color:#002060;
    vertical-align: inherit;
}

.cardInputBox {
    width: 17em;
    margin: 0em auto;
    font-size: large;
}

.cardPromptClass1 {
    font-size: x-large;
    color:white;
}

.cardPromptClass2 {
    font-size: x-large;
}

.card {
    border: 0.1em solid rgb(131, 131, 131);
    border-radius: 0.5em;
    padding: 0em 0em 1.5em 0em;
    width: 80%;
    max-width:20em;
    height: 65%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgb(102, 179, 202);
}

.flipped {
    background-color:rgb(132, 172, 137);
}

.textBox input{
    font-size: 25px;
    border: 0.1em solid rgb(131, 131, 131);
    border-radius: 0.5em;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.addCardButton{
    color:#0a5050;;
    background-color:#bfbfc5;
}

.deleteCardButton{
    color:#760b0b;;
    background-color:#bfbfc5;
}

.deckDeleteButton{
    color:#760b0b;
    background-color:#bfbfc5;
}

.deckEditButton{
    color:#14075e;
    background-color:#bfbfc5;
}

.decksReturnButton{
    color:#14075e;
    background-color:#bfbfc5;
}

.cardNavigationButtons{
    width: fit-content;
    height: 2em;
    background-color:#bfbfc5;
}

select {
  width: 83%;
  display: block;
  margin: 0 auto;
  font-family: sans-serif;
  font-size: 16px;
  padding: 5px;
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
