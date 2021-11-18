<template>
    <div>
        <h1 v-if="!editDeckNameSelected">{{emittedObject.deckName}}</h1>
        <input type="text" placeholder="Type the new deck name" v-model="editDeckNameInput" v-if="editDeckNameSelected" @keyup.enter="submitEditedDeckName"/>
        <button v-on:click="updateCardIndex(-1)">Previous Card</button>
        <button v-on:click="updateCardIndex(1)">Next Card</button>
        <div class="card">
            <p >{{cardSide}}</p>
            <p v-if="!addCardFront&&!addCardBack">{{cardPrompt}}</p>
            <input type="text" placeholder="Type front text" v-model="cardFrontInput" v-if="addCardFront" @keyup.enter="flipCard"/>
            <input type="text" placeholder="Type back text" v-model="cardBackInput" v-if="addCardBack" @keyup.enter="submitCard"/>
            <button class="cardButton" v-on:click="flipCard" v-if="!addCardBack">Flip Card</button>
            <button class="cardButton" v-on:click="submitCard" v-if="addCardBack">Submit Card</button>
        </div>
        <button v-on:click="addCard">Add Card</button>
        <button v-on:click="deleteCard">Delete Card</button>
        <div>
            <button v-on:click="goBackToDecks">Return To Decks</button>
            <button v-on:click="deleteDeck">Delete Current Deck</button>
            <button v-on:click="editDeckName">Edit Deck Name</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
const url = '/api/decks/';

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
    data () {
        return {
            cardSide:"Front",
            cardPrompt:"please add a card",
            cardFrontInput:"",
            cardBackInput:"",
            addCardFront:false,
            addCardBack:false,
            cardsListIndex:0,
            editDeckNameSelected:false,
            editDeckNameInput:"",
            cardId:""
        }
    },
    methods: {
        flipCard () {
            if (this.emittedObject.cards.length === 0){
                this.cardPrompt="there is no card to flip. please add a card";
            }
            if (this.addCardFront) {
                this.cardSide="Back";
                this.addCardBack=true;
                this.addCardFront=false;
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
                console.log("there are no cards in the deck.");
                return;
            }
            if (this.emittedObject.cards.length === 1){
                console.log("there is only one card in the deck.");
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
                this.cardPrompt="please add a card";
            }
            //this.goBackToDecks();
        },
        goBackToDecks () {
            //advance route back to the Welcome Page
            this.$router.push({ path: '/' })
        },
        async deleteDeck(){
            await axios.delete(url+this.emittedObject._id+"/deckName");
            this.goBackToDecks();
        },
        editDeckName(){
            this.editDeckNameSelected=true;
        },
        async submitEditedDeckName(){
            this.emittedObject.deckName=this.editDeckNameInput;
            const response = await axios.put(url+this.emittedObject._id+"/deckName",{deckName:this.editDeckNameInput});
            if(response.status!==201){
                console.log("error: ",response);
            }
            this.editDeckNameInput="";
            this.editDeckNameSelected=false;
        }
    },
    created () {
        if(this.emittedObject.cards.length!=0){
            this.cardPrompt=this.emittedObject.cards[0].cardFront;
            this.cardId=this.emittedObject.cards[0]._id;
        }
    }
}
</script>

<style scoped>
.cardButton {
    width: 8em;
    margin: 0em auto;
}
.card {
    border: 0.1em solid rgb(131, 131, 131);
    border-radius: 0.5em;
    padding: 0em 0em 1.5em 0em;
    width: 70%;
    max-width:20em;
    height: 20em;;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
