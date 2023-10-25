import Welcome from "./views/Welcome.vue";
import SingleDeck from "./views/SingleDeck.vue";
import LoginPage from "./views/LoginPage.vue";

export default [
  { path: "/welcome/", component: Welcome, props: true },
  {
    path: "/welcome/single-deck/:deckName",
    component: SingleDeck,
    props: true,
  },
  { path: "/", component: LoginPage, props: true },
];
