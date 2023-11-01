<template>
  <div id="singleDeck_css">
    <div id="welcomeUser">
      <div id="websiteIcon">
        <img
          id="logoImage"
          v-if="!darkModeOn"
          src="../assets/flashcardLogoSmall.png"
          alt="LOGO"
        />
        <img
          id="logoImage"
          v-if="darkModeOn"
          src="../assets/flashcardLogoSmallBlue.png"
          alt="LOGO"
        />
      </div>
      <div id="welcomeWords">
        <h1 id="deckNameWelcome" v-if="!editDeckNameSelected">
          {{ emittedObject.deckName ? emittedObject.deckName : "" }}
        </h1>
        <div id="welcomeWordsInput">
          <input
            type="text"
            placeholder="Type the new deck name"
            v-model="editDeckNameInput"
            v-if="editDeckNameSelected"
            v-focus
            @keyup.enter="submitEditedDeckName"
          />
        </div>
      </div>
      <div
        id="hamburgerMenu"
        v-on:click="hamburgerWasClicked"
        v-click-outside="pageWasClicked"
      >
        <img
          id="hamburgerImage"
          src="../assets/Hamburger_icon_small.svg.png"
          alt="MENU"
        />
      </div>
    </div>
    <div id="hamburgerDropdown" v-if="hamburgerClicked">
      <button v-on:click="returnToLoginPage()">Log Out</button> <br />
      <button v-on:click="goBackToDecks">To Decks</button> <br />
      <button v-if="!darkModeOn" v-on:click="enableDarkMode">DarkMode</button>
      <button v-if="darkModeOn" v-on:click="disableDarkMode">LightMode</button>
      <br />
      <button v-if="!backModeOn" v-on:click="enableBackMode">ShowBacks</button>
      <button v-if="backModeOn" v-on:click="disableBackMode">ShowFronts</button>
    </div>

    <div>
      <button class="deckEditButton" v-on:click="editDeckName">
        Edit Deck
      </button>
      <button class="deckDeleteButton" v-on:click="deleteDeckPressed">
        Delete Deck
      </button>
      <button
        class="decksReturnButton"
        v-if="!deckIsShuffled"
        v-on:click="shuffleDeck"
      >
        Shuffle
      </button>
      <button
        class="decksReturnButton"
        v-if="deckIsShuffled"
        v-on:click="unShuffleDeck"
      >
        Un-Shuffle
      </button>
      <br />
      <input
        class="cardInputBox"
        type="text"
        placeholder="Search the deck:"
        v-model="deckSearchInput"
        @keyup.enter="deckSearch"
      />
    </div>

    <p v-if="deleteDeckButtonPressed">
      Are you sure that you want to delete
      {{ emittedObject.deckName ? emittedObject.deckName : "" }}?
    </p>
    <button
      class="decksReturnButton"
      v-if="deleteDeckButtonPressed"
      v-on:click="deleteDeck"
    >
      Yes, delete the deck.
    </button>
    <button
      class="decksReturnButton"
      v-if="deleteDeckButtonPressed"
      v-on:click="doNotDeleteDeck"
    >
      No, don't delete the deck.
    </button>

    <p v-if="deleteCardButtonPressed">
      Are you sure that you want to delete this card?
    </p>
    <button
      class="decksReturnButton"
      v-if="deleteCardButtonPressed"
      v-on:click="deleteCard"
    >
      Yes, delete the card.
    </button>
    <button
      class="decksReturnButton"
      v-if="deleteCardButtonPressed"
      v-on:click="doNotDeleteCard"
    >
      No, don't delete the card.
    </button>

    <!-- https://vuejs.org/v2/guide/class-and-style.html#With-Components how to use the v-bind-->
    <div class="card" v-bind:class="{ flipped: this.cardSide === 'Front' }">
      <p class="cardPromptClass1" v-if="!addCardFront && !addCardBack">
        {{ cardSide }}
        <input
          id="cardNumberBox"
          type="text"
          v-model="numberSearchInput"
          @keyup.enter="numberSearch"
        />/{{ emittedObject.cards ? emittedObject.cards.length : "" }}
      </p>
      <p
        class="cardPromptClass1"
        v-if="emittedObject.cards.length == 0 && (addCardFront || addCardBack)"
      >
        New {{ cardSide }} at position 1
      </p>
      <p
        class="cardPromptClass1"
        v-if="emittedObject.cards.length == 1 && (addCardFront || addCardBack)"
      >
        New {{ cardSide }} at position 2
      </p>
      <p
        class="cardPromptClass1"
        v-if="emittedObject.cards.length > 1 && (addCardFront || addCardBack)"
      >
        New {{ cardSide }} at position {{ cardsListIndex + 2 }}
      </p>
      <p class="cardPromptClass2" v-if="!addCardFront && !addCardBack">
        {{ cardPrompt }}
      </p>

      <input
        type="text"
        ref="frontInput"
        class="cardInputBox"
        placeholder="Type front text"
        v-model="cardFrontInput"
        v-if="addCardFront && !backModeOn"
        v-focus
        @keyup.enter="flipCard"
      />
      <input
        type="text"
        ref="backInput"
        class="cardInputBox"
        placeholder="Type back text"
        v-model="cardBackInput"
        v-if="addCardBack && !backModeOn"
        v-focus
        @keyup.enter="submitCard"
      />
      <input
        type="text"
        ref="frontInput"
        class="cardInputBox"
        placeholder="Type front text"
        v-model="cardFrontInput"
        v-if="addCardFront && backModeOn"
        v-focus
        @keyup.enter="submitCard"
      />
      <input
        type="text"
        ref="backInput"
        class="cardInputBox"
        placeholder="Type back text"
        v-model="cardBackInput"
        v-if="addCardBack && backModeOn"
        v-focus
        @keyup.enter="flipCard"
      />

      <!-- edit card -->
      <input
        type="text"
        ref="frontInput"
        class="cardInputBox"
        placeholder="Type new front text"
        v-model="cardFrontInput"
        v-if="editCardButtonPressed && cardSide === 'Front'"
        v-focus
        @keyup.enter="submitEditedCardFront"
      />
      <input
        type="text"
        ref="backInput"
        class="cardInputBox"
        placeholder="Type new back text"
        v-model="cardBackInput"
        v-if="editCardButtonPressed && cardSide === 'Back'"
        v-focus
        @keyup.enter="submitEditedCardBack"
      />

      <div id="cardButtonsDiv">
        <em v-if="!this.isListeningForSpeech && this.speechInputResult != ''">{{
          this.speechScore
        }}</em>
        <select id="selectBlock" v-if="!isMobile" v-model="selectedLanguage">
          <option disabled value="">Please select a language:</option>
          <option
            :value="option.name"
            :key="option"
            v-for="option in this.optionList"
          >
            {{ option.name }}
          </option>
        </select>
        <em v-if="this.isListeningForSpeech">Listening to you...</em>
        <em v-if="!this.isListeningForSpeech && this.speechInputResult != ''">{{
          this.speechInputResult
        }}</em>
        <br />
        <button class="cardButton" v-on:click="readCard">Listen</button>
        <button class="cardButton" v-on:click="getSpeechInput">Speak</button>
        <br />
        <div id="arrowsDiv">
          <img
            id="cardNavigationButton1"
            v-on:click="updateCardIndex(-1)"
            class="arrowImages"
            src="../assets/leftArrow.png"
            alt="left arrow"
          />

          <button
            class="cardButton"
            v-on:click="flipCard"
            v-if="!addCardBack && !editCardButtonPressed && !backModeOn"
          >
            Flip Card
          </button>
          <button
            class="cardButton"
            v-on:click="submitCard"
            v-if="addCardBack && !editCardButtonPressed && !backModeOn"
          >
            Submit Card
          </button>
          <button
            class="cardButton"
            v-on:click="flipCard"
            v-if="!addCardFront && !editCardButtonPressed && backModeOn"
          >
            Flip Card
          </button>
          <button
            class="cardButton"
            v-on:click="submitCard"
            v-if="addCardFront && !editCardButtonPressed && backModeOn"
          >
            Submit Card
          </button>

          <button
            class="cardButton"
            v-on:click="submitEditedCardFront"
            v-if="editCardFront && editCardButtonPressed"
          >
            Submit Edit
          </button>
          <button
            class="cardButton"
            v-on:click="submitEditedCardBack"
            v-if="editCardBack && editCardButtonPressed"
          >
            Submit Edit
          </button>

          <img
            id="cardNavigationButton2"
            v-on:click="updateCardIndex(1)"
            class="arrowImages"
            src="../assets/rightArrow.png"
            alt="right arrow"
          />
        </div>
      </div>
    </div>
    <button
      class="decksReturnButton"
      v-if="addCardFront || addCardBack"
      v-on:click="abortAddCard"
    >
      Abort Add Card
    </button>
    <button
      class="addCardButton"
      v-if="!addCardFront && !addCardBack"
      v-on:click="addCard"
    >
      Add Card
    </button>
    <button class="deleteCardButton" v-on:click="deleteCardPressed">
      Delete Card
    </button>
    <button class="editCardButton" v-on:click="editCardPressed">
      Edit Card
    </button>

    <div class="snackbar" id="snackbar1">
      There is only one card in the deck. Please add more cards.
    </div>
    <div class="snackbar" id="snackbar2">
      There is no card to flip. Please add a card.
    </div>
    <div class="snackbar" id="snackbar3">
      There are no cards in the deck. Please add a card.
    </div>
    <div class="snackbar" id="snackbar4">Please enter a valid deck name.</div>
    <div class="snackbar" id="snackbar5">
      Any card with blank front or back will not be submitted.
    </div>
    <div class="snackbar" id="snackbar6">
      There are no cards to delete in this deck.
    </div>
    <div class="snackbar" id="snackbar7">
      No card matching the search term was found.
    </div>
    <div class="snackbar" id="snackbar8">
      There are no cards to edit in this deck.
    </div>
    <div class="snackbar" id="snackbar9">
      Please unshuffle the deck before editing or deleting cards.
    </div>
    <div class="snackbar" id="snackbar10">
      Please enter a number greater than zero and try the search again.
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
const url = "/api/decks/";

try {
  var speechSynthesis = window.speechSynthesis;
} catch (err) {
  console.log("Error with speechSynthesis initialization.\n");
}

try {
  var SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
} catch (err) {
  console.log("Error with speechRecognition initialization.\n");
}

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export default {
  props: {
    emittedObject: {
      type: Object,
      required: true,
      _id: {
        type: String,
        required: true,
      },
      cards: {
        type: Array,
        required: true,
      },
      deckName: {
        type: String,
        required: true,
      },
    },
  },
  // https://vuejs.org/v2/guide/custom-directive.html
  // allows the use of v-focus to have the cursor automatically go into the textbox
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        Vue.nextTick(() => el.focus());
      },
    },
    "click-outside": {
      bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          // here I check that click was outside the el and his children
          if (!(el == event.target || el.contains(event.target))) {
            // and if it did, call method provided in attribute value
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind: function (el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      },
    },
  },

  data() {
    return {
      cardSide: "Front",
      cardPrompt: "Please add a card by clicking the 'Add Card' button below.",
      cardFrontInput: "",
      cardBackInput: "",
      addCardFront: false,
      addCardBack: false,
      editCardFront: false,
      editCardBack: false,
      cardsListIndex: 0,
      editDeckNameSelected: false,
      editDeckNameInput: "",
      numberSearchInput: 1,
      cardId: "",
      deleteDeckButtonPressed: false,
      deleteCardButtonPressed: false,
      editCardButtonPressed: false,
      optionList: [],
      selectedLanguage: "",
      isMobile: isMobile,
      deckSearchInput: "",
      deckIsShuffled: false,
      hamburgerClicked: false,
      darkModeOn: false,
      backModeOn: false,
      isListeningForSpeech: false,
      confidence: 0,
      speechInputResult: "",
      speechScore: 0,
    };
  },
  methods: {
    returnToLoginPage() {
      localStorage.removeItem("emittedUser._id");
      localStorage.removeItem("emittedObject._id");
      this.$router.push({ path: `/` });
    },
    hamburgerWasClicked() {
      if (!this.hamburgerClicked) {
        this.hamburgerClicked = true;
      } else {
        this.hamburgerClicked = false;
      }
    },
    pageWasClicked() {
      if (this.hamburgerClicked) {
        this.hamburgerClicked = false;
      }
    },
    disableDarkMode() {
      this.darkModeOn = false;
      localStorage.setItem("darkModeOn", this.darkModeOn);
      document.documentElement.style.setProperty("--primary-color", "#8C1A62");
      document.documentElement.style.setProperty(
        "--secondary-color",
        "#81175a"
      );
      document.documentElement.style.setProperty("--tertiary-color", "#EEE1D6");
      document.documentElement.style.setProperty(
        "--quaternary-color",
        "#ddd1c7"
      );
    },
    enableDarkMode() {
      this.darkModeOn = true;
      localStorage.setItem("darkModeOn", this.darkModeOn);
      document.documentElement.style.setProperty("--primary-color", "#325573");
      document.documentElement.style.setProperty(
        "--secondary-color",
        "#2d4c68"
      );
      document.documentElement.style.setProperty("--tertiary-color", "#B6D6F2");
      document.documentElement.style.setProperty(
        "--quaternary-color",
        "#517EA6"
      );
    },
    disableBackMode() {
      this.backModeOn = false;
      this.cardSide = "Front";
      this.cardPrompt = this.emittedObject.cards[this.cardsListIndex].cardFront;
    },
    enableBackMode() {
      this.backModeOn = true;
      this.cardSide = "Back";
      this.cardPrompt = this.emittedObject.cards[this.cardsListIndex].cardBack;
    },
    async deckSearch() {
      let cardFound = false;
      let indexVar = -1;
      // Search the card fronts for the search term
      for (let i = 0; i < this.emittedObject.cards.length; i++) {
        if (this.emittedObject.cards[i].cardFront === this.deckSearchInput) {
          indexVar = i;
          cardFound = true;
          break;
        }
      }
      // if there was a match on the card fronts, show that card front
      if (cardFound === true) {
        this.cardsListIndex = indexVar;
        this.cardSide = "Front";
        this.cardPrompt =
          this.emittedObject.cards[this.cardsListIndex].cardFront;
        this.deckSearchInput = "";
        this.numberSearchInput = this.cardsListIndex + 1;
        return;
      }
      // if the card still hasn't been found, check the backs of the cards
      if (cardFound === false) {
        for (let i = 0; i < this.emittedObject.cards.length; i++) {
          if (this.emittedObject.cards[i].cardBack === this.deckSearchInput) {
            indexVar = i;
            cardFound = true;
            break;
          }
        }
      }
      // if there was a match on the card backs, show that card back
      if (cardFound === true) {
        this.cardsListIndex = indexVar;
        this.cardSide = "Back";
        this.cardPrompt =
          this.emittedObject.cards[this.cardsListIndex].cardBack;
        this.deckSearchInput = "";
        this.numberSearchInput = this.cardsListIndex + 1;
        return;
      }
      // if there was no match, show the snackbar saying that there wasn't a match
      else {
        this.deckSearchInput = "";
        this.showSnackBar("snackbar7");
        return;
      }
    },
    async numberSearch() {
      const numberInput = parseInt(this.numberSearchInput);
      if (numberInput > 0 && numberInput <= this.emittedObject.cards.length) {
        this.cardsListIndex = numberInput - 1;
        if (this.backModeOn) {
          this.cardSide = "Back";
          this.cardPrompt =
            this.emittedObject.cards[this.cardsListIndex].cardBack;
        } else {
          this.cardSide = "Front";
          this.cardPrompt =
            this.emittedObject.cards[this.cardsListIndex].cardFront;
        }
        return;
      } else {
        this.numberSearchInput = this.cardsListIndex + 1;
        this.showSnackBar("snackbar10");
        return;
      }
    },
    populateVoiceList() {
      try {
        this.optionList = speechSynthesis.getVoices();
      } catch (err) {
        console.log("Error with getVoices in populateVoiceList.\n");
      }
    },
    shuffleVueArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        Vue.set(array, i, array[j]);
        Vue.set(array, j, temp);
      }
    },
    focusOnCardFrontInput() {
      this.$nextTick(() => {
        this.$refs.frontInput.focus();
      });
    },
    focusOnCardBackInput() {
      this.$nextTick(() => {
        this.$refs.backInput.focus();
      });
    },
    readCard() {
      try {
        const language = this.optionList.filter(
          (item) => item.name === this.selectedLanguage
        );
        let utterance = new SpeechSynthesisUtterance(this.cardPrompt);
        utterance.voice = language[0];
        speechSynthesis.speak(utterance);
      } catch (err) {
        console.log("Error with speechSynthesis for readCard.\n");
      }
    },
    resetSpeechInput() {
      this.isListeningForSpeech = false;
      this.speechInputResult = "";
      this.confidence = 0;
      this.speechScore = 0;
    },
    calculateSpeechScore() {
      if (this.cardPrompt == this.speechInputResult) {
        this.speechScore = 100;
      } else {
        this.speechScore = 0;
      }
    },
    getSpeechInput() {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;

      const language = this.optionList.filter(
        (item) => item.name === this.selectedLanguage
      );
      if (language[0]) {
        recognition.lang = language[0].lang ? language[0].lang : "en-US";
      } else {
        recognition.lang = "en-US";
      }
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.start();
      // console.log(`Ready to receive speech input in ${recognition.lang}.`);
      this.isListeningForSpeech = true;

      recognition.onspeechend = () => {
        // console.log("Speech recognition stopped.");
        recognition.stop();
        this.isListeningForSpeech = false;
      };

      recognition.onresult = (event) => {
        const speechInputResult = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;
        console.log(`Result received: ${speechInputResult}`);
        console.log(`Confidence: ${event.results[0][0].confidence}`);
        this.confidence = confidence;
        this.speechInputResult = speechInputResult;
        this.calculateSpeechScore();
        setTimeout(() => this.resetSpeechInput(), 2000);
      };
      recognition.onnomatch = (event) => {
        console.log("I didn't recognize that word.");
        console.log("event: ", event);
        recognition.stop();
        this.resetSpeechInput();
      };
      recognition.onerror = (event) => {
        console.log(`Error occurred in recognition: ${event.error}`);
        recognition.stop();
        this.resetSpeechInput();
      };
    },
    flipCard() {
      if (
        this.emittedObject.cards.length === 0 &&
        !this.addCardBack &&
        !this.addCardFront
      ) {
        this.showSnackBar("snackbar2");
        return;
      }
      if (this.addCardFront) {
        this.cardSide = "Back";
        this.addCardBack = true;
        this.addCardFront = false;
        this.focusOnCardBackInput();
        return;
      }
      if (this.addCardBack) {
        this.cardSide = "Front";
        this.addCardBack = false;
        this.addCardFront = true;
        this.focusOnCardFrontInput();
        return;
      }
      if (this.cardSide === "Front") {
        this.cardSide = "Back";
        this.cardPrompt =
          this.emittedObject.cards[this.cardsListIndex].cardBack;
      } else {
        this.cardSide = "Front";
        this.cardPrompt =
          this.emittedObject.cards[this.cardsListIndex].cardFront;
      }
    },
    addCard() {
      if (this.backModeOn) {
        this.cardSide = "Back";
        this.addCardBack = true;
      } else {
        this.cardSide = "Front";
        this.addCardFront = true;
      }
    },
    abortAddCard() {
      this.addCardFront = false;
      this.addCardBack = false;
      if (this.backModeOn) {
        this.cardSide = "Back";
      } else {
        this.cardSide = "Front";
      }
      this.cardFrontInput = "";
      this.cardBackInput = "";
      if (this.emittedObject.cards.length === 0) {
        return;
      } else {
        if (this.backModeOn) {
          this.cardPrompt =
            this.emittedObject.cards[this.cardsListIndex].cardBack;
        } else {
          this.cardPrompt =
            this.emittedObject.cards[this.cardsListIndex].cardFront;
        }
        this.cardId = this.emittedObject.cards[this.cardsListIndex]._id;
        return;
      }
    },
    abortEditCard() {
      this.editCardButtonPressed = false;
      this.editCardFront = false;
      this.editCardBack = false;
      if (this.backModeOn) {
        this.cardSide = "Back";
      } else {
        this.cardSide = "Front";
      }
      this.cardFrontInput = "";
      this.cardBackInput = "";
      if (this.emittedObject.cards.length === 0) {
        return;
      } else {
        if (this.backModeOn) {
          this.cardPrompt =
            this.emittedObject.cards[this.cardsListIndex].cardBack;
        } else {
          this.cardPrompt =
            this.emittedObject.cards[this.cardsListIndex].cardFront;
        }
        this.cardId = this.emittedObject.cards[this.cardsListIndex]._id;
        return;
      }
    },
    async submitCard() {
      if (this.cardFrontInput == "" || this.cardBackInput == "") {
        this.abortAddCard();
        this.showSnackBar("snackbar5");
        return;
      }
      const response = await axios.post(
        url + this.emittedObject._id + "/cards/" + this.cardsListIndex,
        { cardFront: this.cardFrontInput, cardBack: this.cardBackInput }
      );
      if (response.status !== 201) {
        console.log("error: ", response);
      }
      this.emittedObject.cards = response.data.cards;
      this.addCardFront = false;
      this.addCardBack = false;
      if (this.backModeOn) {
        this.cardSide = "Back";
      } else {
        this.cardSide = "Front";
      }
      this.cardFrontInput = "";
      this.cardBackInput = "";
      if (this.emittedObject.cards.length - this.cardsListIndex > 1) {
        this.cardsListIndex += 1;
      }
      if (this.backModeOn) {
        this.cardPrompt =
          this.emittedObject.cards[this.cardsListIndex].cardBack;
      } else {
        this.cardPrompt =
          this.emittedObject.cards[this.cardsListIndex].cardFront;
      }
      this.cardId = this.emittedObject.cards[this.cardsListIndex]._id;
      this.numberSearchInput = this.cardsListIndex + 1;
    },
    async submitEditedCardFront() {
      if (this.cardFrontInput == "") {
        this.abortEditCard();
        this.showSnackBar("snackbar5");
        return;
      }
      const response = await axios.put(
        url +
          this.emittedObject._id +
          "/cards/" +
          "front/" +
          this.cardId +
          "/" +
          this.cardsListIndex,
        {
          cardFront: this.cardFrontInput,
          cardBack: this.emittedObject.cards[this.cardsListIndex].cardBack,
        }
      );
      if (response.status !== 201) {
        console.log("error: ", response);
      }
      this.emittedObject.cards = response.data.cards;
      this.editCardFront = false;
      this.editCardButtonPressed = false;
      this.cardFrontInput = "";
      this.cardPrompt = this.emittedObject.cards[this.cardsListIndex].cardFront;
    },
    async submitEditedCardBack() {
      if (this.cardBackInput == "") {
        this.abortEditCard();
        this.showSnackBar("snackbar5");
        return;
      }
      const response = await axios.put(
        url +
          this.emittedObject._id +
          "/cards/" +
          "back/" +
          this.cardId +
          "/" +
          this.cardsListIndex,
        {
          cardFront: this.emittedObject.cards[this.cardsListIndex].cardFront,
          cardBack: this.cardBackInput,
        }
      );
      if (response.status !== 201) {
        console.log("error: ", response);
      }
      this.emittedObject.cards = response.data.cards;
      this.editCardBack = false;
      this.editCardButtonPressed = false;
      this.cardBackInput = "";
      this.cardPrompt = this.emittedObject.cards[this.cardsListIndex].cardBack;
    },
    updateCardIndex(indexToAdd) {
      if (this.emittedObject.cards.length === 0) {
        this.showSnackBar("snackbar3");
        return;
      }
      if (this.emittedObject.cards.length === 1) {
        this.showSnackBar("snackbar1");
        return;
      }
      if (indexToAdd + this.cardsListIndex < 0) {
        this.cardsListIndex = this.emittedObject.cards.length - 1;
      } else if (
        indexToAdd + this.cardsListIndex >
        this.emittedObject.cards.length - 1
      ) {
        this.cardsListIndex = 0;
      } else {
        this.cardsListIndex = indexToAdd + this.cardsListIndex;
      }
      if (this.backModeOn) {
        this.cardSide = "Back";
        this.cardPrompt =
          this.emittedObject.cards[this.cardsListIndex].cardBack;
      } else {
        this.cardSide = "Front";
        this.cardPrompt =
          this.emittedObject.cards[this.cardsListIndex].cardFront;
      }
      this.cardId = this.emittedObject.cards[this.cardsListIndex]._id;
      this.numberSearchInput = this.cardsListIndex + 1;
    },
    editCardPressed() {
      if (this.deckIsShuffled) {
        this.showSnackBar("snackbar9");
        return;
      }
      if (this.emittedObject.cards.length === 0) {
        this.showSnackBar("snackbar8");
        return;
      } else {
        this.editCardButtonPressed = true;
        if (this.cardSide === "Front") {
          this.editCardFront = true;
        }
        if (this.cardSide === "Back") {
          this.editCardBack = true;
        }
        return;
      }
    },
    deleteCardPressed() {
      if (this.deckIsShuffled) {
        this.showSnackBar("snackbar9");
        return;
      }
      if (this.emittedObject.cards.length === 0) {
        this.showSnackBar("snackbar6");
        return;
      } else {
        this.deleteCardButtonPressed = true;
        return;
      }
    },
    async deleteCard() {
      this.deleteCardButtonPressed = false;
      await axios.delete(
        url + this.emittedObject._id + "/cards/" + this.cardId
      );
      this.emittedObject.cards.splice(this.cardsListIndex, 1);

      if (this.emittedObject.cards.length - 1 >= 0) {
        this.cardsListIndex =
          this.cardsListIndex === 0 ? 0 : this.cardsListIndex - 1;
        this.cardId = this.emittedObject.cards[this.cardsListIndex]._id;
        if (this.backModeOn) {
          this.cardSide = "Back";
          this.cardPrompt =
            this.emittedObject.cards[this.cardsListIndex].cardBack;
        } else {
          this.cardSide = "Front";
          this.cardPrompt =
            this.emittedObject.cards[this.cardsListIndex].cardFront;
        }
      } else {
        this.cardPrompt =
          "Please add a card by clicking the 'Add Card' button below.";
      }
      this.numberSearchInput = this.cardsListIndex + 1;
    },
    async doNotDeleteCard() {
      this.deleteCardButtonPressed = false;
    },
    goBackToDecks() {
      localStorage.removeItem("emittedObject._id");
      //advance route back to the Welcome Page
      this.$router.push({ path: "/welcome" });
    },
    // because I am shuffling the emittedObject.cards array, the shuffling is only temporary. The database is not changed in any way.
    shuffleDeck() {
      if (this.emittedObject.cards.length === 0) {
        this.showSnackBar("snackbar3");
        return;
      }
      if (this.emittedObject.cards.length === 1) {
        this.showSnackBar("snackbar1");
        return;
      }
      this.shuffleVueArray(this.emittedObject.cards);
      if (this.backModeOn) {
        this.cardSide = "Back";
        this.cardPrompt =
          this.emittedObject.cards[this.cardsListIndex].cardBack;
      } else {
        this.cardSide = "Front";
        this.cardPrompt =
          this.emittedObject.cards[this.cardsListIndex].cardFront;
      }
      this.cardId = this.emittedObject.cards[this.cardsListIndex].cardId;
      this.deckIsShuffled = true;
    },
    async unShuffleDeck() {
      // window.location.reload();
      this.emittedObject._id = localStorage.getItem("emittedObject._id");
      const responseFromDecks = await axios.get(
        url + "/deck/" + this.emittedObject._id
      );
      this.emittedObject = responseFromDecks.data;
      if (this.backModeOn) {
        this.cardSide = "Back";
        this.cardPrompt =
          this.emittedObject.cards[this.cardsListIndex].cardBack;
      } else {
        this.cardSide = "Front";
        this.cardPrompt =
          this.emittedObject.cards[this.cardsListIndex].cardFront;
      }
      this.cardId = this.emittedObject.cards[this.cardsListIndex]._id;
      this.deckIsShuffled = false;
    },
    deleteDeckPressed() {
      this.deleteDeckButtonPressed = true;
    },
    async deleteDeck() {
      this.deleteDeckButtonPressed = false;
      await axios.delete(url + this.emittedObject._id + "/deckName");
      this.goBackToDecks();
    },
    async doNotDeleteDeck() {
      this.deleteDeckButtonPressed = false;
    },
    editDeckName() {
      this.editDeckNameSelected = true;
    },
    async submitEditedDeckName() {
      if (this.editDeckNameInput == "") {
        this.editDeckNameSelected = false;
        this.showSnackBar("snackbar4");
        return;
      }
      this.emittedObject.deckName = this.editDeckNameInput;
      const response = await axios.put(
        url + this.emittedObject._id + "/deckName",
        { deckName: this.editDeckNameInput }
      );
      if (response.status !== 201) {
        console.log("error: ", response);
      }
      this.editDeckNameInput = "";
      this.editDeckNameSelected = false;
    },
    showSnackBar(snackBarNum) {
      // Get the snackbar DIV
      var x = document.getElementById(snackBarNum);
      // Add the "show" class to DIV
      x.classList.add("show");
      // After 3 seconds, remove the show class from DIV
      setTimeout(function () {
        x.classList.remove("show");
      }, 3000);
    },
  },
  async created() {
    const localDarkMode = localStorage.getItem("darkModeOn");
    if (localDarkMode === "true") {
      this.darkModeOn = true;
    } else if (localDarkMode === "false") {
      this.darkModeOn = false;
    }
    if (this.darkModeOn == undefined || this.darkModeOn == false) {
      document.documentElement.style.setProperty("--primary-color", "#8C1A62");
      document.documentElement.style.setProperty(
        "--secondary-color",
        "#81175a"
      );
      document.documentElement.style.setProperty("--tertiary-color", "#EEE1D6");
      document.documentElement.style.setProperty(
        "--quaternary-color",
        "#ddd1c7"
      );
    } else if (this.darkModeOn == true) {
      document.documentElement.style.setProperty("--primary-color", "#325573");
      document.documentElement.style.setProperty(
        "--secondary-color",
        "#2d4c68"
      );
      document.documentElement.style.setProperty("--tertiary-color", "#B6D6F2");
      document.documentElement.style.setProperty(
        "--quaternary-color",
        "#517EA6"
      );
    }

    this.populateVoiceList();
    try {
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = this.populateVoiceList;
      }
    } catch (err) {
      console.log("Error with speechSynthesis in created.\n");
    }

    if (this.emittedObject._id != undefined) {
      localStorage.setItem("emittedObject._id", this.emittedObject._id);
      if (this.emittedObject.deckName == undefined) {
        const responseFromDecks = await axios.get(
          url + "/deck/" + this.emittedObject._id
        );
        this.emittedObject = responseFromDecks.data;
      }
    }
    if (this.emittedObject._id == undefined) {
      this.emittedObject._id = localStorage.getItem("emittedObject._id");
      if (this.emittedObject._id == undefined) {
        this.goBackToDecks();
        return;
      }
      const responseFromDecks = await axios.get(
        url + "/deck/" + this.emittedObject._id
      );
      this.emittedObject = responseFromDecks.data;
    }

    if (this.emittedObject.cards.length != 0) {
      this.cardPrompt = this.emittedObject.cards[0].cardFront;
      this.cardId = this.emittedObject.cards[0]._id;
    }
    this.deckIsShuffled = false;
  },
};
</script>

<style scoped>
:root {
  --primary-color: #8c1a62;
  --secondary-color: #81175a;
  --tertiary-color: #eee1d6;
  --quaternary-color: #ddd1c7;
}

#cardButtonsDiv {
  vertical-align: 40%;
}

#singleDeck_css {
  background-color: var(--tertiary-color);
  color: var(--primary-color);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow-y: auto;
}

#welcomeUser {
  display: flex;
  justify-content: space-between;
}

#logoImage {
  padding-left: 0.5em;
  padding-top: 0.5em;
}

#welcomeWords {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#deckNameWelcome {
  overflow-wrap: anywhere;
}

#hamburgerImage {
  padding-top: 1.4em;
  padding-right: 1.4em;
}

#hamburgerDropdown {
  position: absolute;
  top: 4em;
  right: 0em;
  background-color: var(--quaternary-color);
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
}

#selectBlock {
  border-radius: 8px;
}

.cardButton {
  width: fit-content;
  height: 2em;
  font-size: large;
  margin-top: 0.75em;
}

.cardInputBox {
  width: 17em;
  max-width: 80%;
  margin: 0.5em auto;
  font-size: large;
}

#cardNumberBox {
  width: 2em;
}

.cardPromptClass1 {
  font-size: x-large;
  color: white;
  display: inline;
}

.cardPromptClass2 {
  font-size: x-large;
}

.card {
  border: 0.1em;
  border-radius: 0.5em;
  padding: 0em 0em 1.5em 0em;
  width: 80%;
  max-width: 20em;
  height: 60%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--primary-color);
  color: var(--tertiary-color);
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
}

.flipped {
  background-color: var(--secondary-color);
}

.textBox input {
  font-size: 25px;
  border: 0.1em solid rgb(131, 131, 131);
  border-radius: 0.5em;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cardNavigationButtons {
  width: fit-content;
  height: 2em;
}

.arrowImages {
  border-radius: 8em;
  max-width: 3em;
}

#arrowsDiv {
  display: flex;
  justify-content: space-evenly;
}

select {
  width: 83%;
  display: block;
  margin: 0 auto;
  font-family: sans-serif;
  font-size: 16px;
  padding: 5px;
}
</style>
