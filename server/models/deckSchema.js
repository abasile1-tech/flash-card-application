const mongoose = require("mongoose");

const deckSchema = new mongoose.Schema({
    deckName: String,
    cards: [{cardFront:String,cardBack:String}]
});

module.exports=deckSchema;