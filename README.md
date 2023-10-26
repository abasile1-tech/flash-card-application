# flash-card-app

## Description

This code base creates a general-purpose flash card app. The tech stack is vue.js, node.js, express.js, and mongodb. Users can sign up for accounts in order to create decks with cards that can then be read aloud to them in the language of their choice. Note: the first two months of this project's code can be found at https://github.com/abasile1-tech/flash-card-application-early-days (at the time, I wanted a clean slate, so I moved my code into this current repository).

## Setting up

- This project was updated to be able to run on Heroku in the cloud. If you would like to run it locally there are a few lines that need to be updated:
- create a .env file
- Inside of the .env file, add the following line of code:

```
mongoURL='mongodb://localhost:27017/flash-card-app'
```

- and set up your mongodb to use that url.
- Once those are updated **cd** into the client and run `npm run build`. Then run `npm run serve` to run the client. Then open a new terminal tab and **cd** to the server folder and run `npm run dev`. Open localhost:5000 in web browser.

## Jest Testing (Unit Tests)

There is a Jest unit testing suite in the client folder. **cd** into the client folder and run `npm run test` to run the Jest tests.

## Cypress Testing (End-to-End and Integration Testing)

There is also a Cypress testing suite in the client folder. **cd** into the client folder and run `npx cypress open` to open Cypress and see the tests that are available to be run.

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
- I added Cypress testing to verify that a specific user can log in to their account, see their specific library of decks, and use a specific deck.

## Future Work

- Add voice control of the buttons
- Improve upon the searchDeck function
- Allow cards to be reordered
- Add a backup for the database
- Allow each notebook to have a user-choosable color to allow for further customization
- Save each user's preference for dark or light mode in the database and load that preference the next time that they log in.

## :camera_flash: Screenshots:

![login_page](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/login_page.PNG?raw=true)
![sign_up_page](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/sign_up_page.PNG?raw=true)
![welcome_page](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/welcome_page.PNG?raw=true)
![spanish_el_libro_front](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/spanish_el_libro_front.PNG?raw=true)
![spanish_el_libro_back](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/spanish_el_libro_back.PNG?raw=true)
![showing_off_hamburger_menu](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/showing_off_hamburger_menu.PNG?raw=true)
![JavaScript_deck_new](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/JavaScript_deck_new.PNG?raw=true)
![JavaScript_comment_card_front](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/JavaScript_comment_card_front.PNG?raw=true)
![JavaScript_comment_card_back](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/JavaScript_comment_card_back.PNG?raw=true)
![decks_showing_off_dark_mode_hamburger_menu](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/decks_showing_off_dark_mode_hamburger_menu.PNG?raw=true)
![decks_showing_off_light_mode](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/decks_showing_off_light_mode.PNG?raw=true)
![iphone12_decks](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/iphone12_decks.PNG?raw=true)
![iphone12_hamburger_menu](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/iphone12_hamburger_menu.PNG?raw=true)
![iphone12_login_light](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/iphone12_login_light.PNG?raw=true)
![iphone12_spanish](https://github.com/abasile1-tech/flash-card-application/blob/main/screenshots/iphone12_spanish.PNG?raw=true)
