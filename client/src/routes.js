import Welcome from './views/Welcome.vue';
import SingleDeck from './views/SingleDeck.vue';

export default [
    {path:'/',component:Welcome},
    {path:'/single-deck/:deckName',component:SingleDeck,props:true}
]