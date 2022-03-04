<template>
	<div id="app">
		<router-view v-on:emitDeck="emitDeck" v-bind:emittedObject="objectToPass" v-on:emitUser="emitUser" v-bind:emittedUser="userToPass"></router-view>
	</div>
</template>

<script>

export default {
	name: 'App',
	components: {
	},
	data (){
		return {
			objectToPass:{},
			userToPass:{}
		}
	},
	methods: {
		emitDeck(obj){
			this.objectToPass=obj;
		},
		emitUser(userObj){
			this.userToPass=userObj;
		}
	}
}
</script>

<style>

h1{
	font-size:xx-large;
	margin-block-start: 0.3em;
	margin-block-end: 0.2em;
}


#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
	font-family: 'Roboto', sans-serif;
	font-size: large;
}
button, input {
	font-family: 'Roboto', sans-serif;
	font-size: large;
	margin: 0.3em;
	border-radius: 8px;
	border: none;
	padding: 0.3em;
}

button {
	color:#14075e;
	background-color:#2ad592;
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
