<template>
	<div id="welcome_css"> 
		<div id="welcomeUser">
		<div id="websiteIcon">
			<img id="logoImage" v-if="!darkModeOn" src="../assets/flashcardLogoSmall.png" alt="LOGO">
			<img id="logoImage" v-if="darkModeOn" src="../assets/flashcardLogoSmallBlue.png" alt="LOGO">
		</div>
		<div id="welcomeWords">
		<h1 id="welcomeName">Welcome, {{emittedUser.userName?emittedUser.userName:""}}</h1>
		</div>
		<div id="hamburgerMenu" v-on:click="hamburgerWasClicked">
			<img id="hamburgerImage" src="../assets/Hamburger_icon_small.svg.png" alt="MENU">
		</div>
		</div>
		<div id=hamburgerDropdown v-if="hamburgerClicked">
			<button v-on:click="returnToLoginPage()">Log Out</button> <br>
			<button v-on:click="deleteAccountPressed()">Delete Account</button> <br>
			<button v-if="!darkModeOn" v-on:click="enableDarkMode">DarkMode</button>
			<button v-if="darkModeOn" v-on:click="disableDarkMode">LightMode</button>
		</div>
		<p v-if="deleteAccountButtonPressed">Are you sure that you want to delete your account?</p>
		<button v-if="deleteAccountButtonPressed" v-on:click="deleteAccountPressedTwice">Yes, delete my account.</button> <br v-if="deleteAccountButtonPressed"><br v-if="deleteAccountButtonPressed">
		<button v-if="deleteAccountButtonPressed" v-on:click="doNotDeleteAccount">No, don't delete my account.</button>
		<p v-if="deleteAccountButtonPressedTwice">Are you REALLY sure that you want to delete your account?</p>
		<button v-if="deleteAccountButtonPressedTwice" v-on:click="deleteAccount">Yes, DELETE my account.</button> <br v-if="deleteAccountButtonPressedTwice"><br v-if="deleteAccountButtonPressedTwice">
		<button v-if="deleteAccountButtonPressedTwice" v-on:click="doNotDeleteAccount">No, don't delete my account.</button> <br v-if="deleteAccountButtonPressed||deleteAccountButtonPressedTwice">

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
				<div id="notebookWhole" :key="deck" v-for="(deck, index) in this.deckObjectList">
					<img src="../assets/notebookRingLeft.png" alt="">
					<div :style="{backgroundColor:colorList[index % colorList.length]}" id="notebookColorSection" v-on:click="goToDeck(deck)">
						<img  src="../assets/notebookRingRight.png" alt="">
						<div id="notebookTape">
							<div id="notebookName">{{deck.deckName}}</div>
						</div>
					</div>
				</div>
		</div>
		<br>
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
			onlyOneDeck:false,
			hamburgerClicked:false,
			darkModeOn:false,
			deleteAccountButtonPressed:false,
			deleteAccountButtonPressedTwice:false,
			colorList:['#7660D6', '#6EEBE4', '#9DD66D', '#FA8EA1']
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
		hamburgerWasClicked() {
			if (!this.hamburgerClicked){
				this.hamburgerClicked=true;
			} else {
				this.hamburgerClicked=false;
			}
		},
		disableDarkMode(){
			this.darkModeOn=false;
			localStorage.setItem("darkModeOn",this.darkModeOn);
			document.documentElement.style.setProperty('--primary-color', '#8C1A62');
			document.documentElement.style.setProperty('--secondary-color', '#81175a');
			document.documentElement.style.setProperty('--tertiary-color', '#EEE1D6');
			document.documentElement.style.setProperty('--quaternary-color', '#ddd1c7');
		},
		enableDarkMode(){
			this.darkModeOn=true;
			localStorage.setItem("darkModeOn",this.darkModeOn);
			document.documentElement.style.setProperty('--primary-color', '#325573');
			document.documentElement.style.setProperty('--secondary-color', '#2d4c68');
			document.documentElement.style.setProperty('--tertiary-color', '#B6D6F2');
			document.documentElement.style.setProperty('--quaternary-color', '#517EA6');
		},
		deleteAccountPressed(){
			this.deleteAccountButtonPressed=true;
			this.hamburgerClicked=false;
		},
		deleteAccountPressedTwice(){
			this.deleteAccountButtonPressed=false;
			this.deleteAccountButtonPressedTwice=true;
		},
		async deleteAccount () {
			this.deleteAccountButtonPressedTwice = false;
			//Delete the User's Decks
			await axios.delete(url+this.emittedUser._id);
			//Delete the User
			await axios.delete(urlForUsers+this.emittedUser._id);
			//Log Out for the last time
			this.returnToLoginPage();
		},
		async doNotDeleteAccount(){
			this.deleteAccountButtonPressed = false;
			this.deleteAccountButtonPressedTwice = false;
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
		const localDarkMode=localStorage.getItem("darkModeOn");
		if (localDarkMode === "true"){
			this.darkModeOn=true;
		} else if(localDarkMode === "false"){
			this.darkModeOn=false;
		}
		if(this.darkModeOn==undefined || this.darkModeOn==false){
				document.documentElement.style.setProperty('--primary-color', '#8C1A62');
				document.documentElement.style.setProperty('--secondary-color', '#81175a');
				document.documentElement.style.setProperty('--tertiary-color', '#EEE1D6');
				document.documentElement.style.setProperty('--quaternary-color', '#ddd1c7');
		} else if(this.darkModeOn == true){
				document.documentElement.style.setProperty('--primary-color', '#325573');
				document.documentElement.style.setProperty('--secondary-color', '#2d4c68');
				document.documentElement.style.setProperty('--tertiary-color', '#B6D6F2');
				document.documentElement.style.setProperty('--quaternary-color', '#517EA6');
		}
		if (this.emittedUser._id != undefined) {
			localStorage.setItem("emittedUser._id",this.emittedUser._id);
			if (this.emittedUser.userName == undefined){
				const responseFromUsers = await axios.get(urlForUsers+this.emittedUser._id);
				this.emittedUser = responseFromUsers.data;
			}
		}
		if (this.emittedUser._id == undefined) {
			this.emittedUser._id = localStorage.getItem("emittedUser._id")
			if (this.emittedUser._id == undefined){
				this.returnToLoginPage();
				return;
			}
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
:root {
	--primary-color: #8C1A62;
	--secondary-color:#81175a;
	--tertiary-color:#EEE1D6;
	--quaternary-color:#ddd1c7;
}
#welcome_css {
	background-color:var(--tertiary-color);
	color:var(--primary-color);
	position:absolute;
	top:0;
	left:0;
	width:100%;
	height:100%;
	min-height:100vh;
	/* this extends the background color when you scroll */
	overflow-y:auto;
}

#welcomeUser {
	display:flex;
	justify-content: space-between;
}

#welcomeName {
	overflow-wrap: anywhere;
}

#logoImage{
	padding:0.5em;
}

#welcomeWords {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

#hamburgerImage {
	padding:1.2em;
}

#hamburgerDropdown {
	position: absolute;
	top: 4em;
	right: 0em;
	background-color:var(--quaternary-color);
	box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
}

#notebookColorSection {
	display:inline-flex;
	color:black;
	background-color:#2ad592;
	width:10em;
	border-bottom: solid floralwhite;
	border-right: solid floralwhite;
	box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
}

#notebookTape{
	margin:auto;
	background: url("../assets/tape.png") no-repeat;
	background-size: cover;
}

#notebookName{
	margin:auto;
	padding:0.4em;
	font-family: 'Permanent Marker', cursive;
	width: 150px;
	height: 50px;
	align-items: center;
	display: inline-flex;
	justify-content: center;
}

.displayInline {
	display:inline;
}

.flexContainer {
	display: flex;
	justify-content: center;
	row-gap: 20px;
	column-gap: 20px;
	flex-flow: wrap;
}

</style>
