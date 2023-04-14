# flash-card-app

## Description  
This code base creates a general-purpose flash card app.

## Setting up  
 - This project was updated to be able to run on Heroku in the cloud. If you would like to run it locally there are a few lines that need to be updated:  
 - create a .env file 
 - Inside of the .env file, add the following line of code:
 ```
mongoURL='mongodb://localhost:27017/flash-card-app'
 ```
 - and set up your mongodb to use that url.
 - Once those are updated **cd** into the client and run `npm run build`. Then **cd** to the server folder and type `npm run dev`. Open localhost:5000 in web browser.

## Testing  
Currently there is one testing suite in the client folder. **cd** into the client folder and run `npm run test` to run the Jest test.

## Completed Goals
 - Create Users  
 - Add CSS  
 - Add a way to shuffle the cards 
 - Add language support for audio output so that the cards can be read to the user in the specified language
 - Add a Search Deck Button
 - Add an Edit Card Button
 - Add the ability to exit out of the Add Card Process.
 - Display the card number on each card / the total number of cards in the Deck
 - Remove language selector on mobile or make the language selector work on mobile
 - Move the buttons pertaining to the Decks above the card 
 - Fix a bug where a card temporarily displays the front on the back when a card is deleted while viewing the back.
 - prompt the user to make sure they are certain before deleting a card
 - Log the user out if the local Storage no longer knows who the user is anymore
 - Add some UI/UX design
   - Design a logo for the website
   - New Color Scheme
   - Condensed Login/Signup views
   - Three bar dropdowns for logout and return to decks functionality
 - Add a cookies disclaimer
 - Fix indexing issues when manipulating cards in decks that have been shuffled
 - Allow the backs of the cards to be shown by default instead of always the fronts
 - Add a Dark Mode Option
 - Add the ability to navigate to the desired card number
 - Give the user the option to delete their account
 - Add a disclaimer about the use of localStorage
 - Make the Decks look like more than just buttons (perhaps they could look like notebooks with a background image)
 - Give the notebooks some colors
 - Add a little piece of tape to each notebook and change the font to look handwritten (this will make it look more realistic)
 - The problem with Microsoft Edge having limited language options has been fixed by Microsoft and there are now several hundred language options to choose from for voice in Microsoft Edge. This is way more than before, so the app functionality has been greatly improved.
 - I made it so the card to be added is shown with more information so that the user better understands the details of the new card that they are creating.
 - I allowed the dropdown menu to disappear when somewhere else on the page is clicked

## Future Work    
 - Add voice control of the buttons
 - Improve upon the searchDeck function
 - Allow cards to be reordered
 - Add a backup for the database
 - Allow each notebook to have a user-choosable color to allow for further customization
 - Save each user's preference for dark or light mode in the database and load that preference the next time that they log in.
 
