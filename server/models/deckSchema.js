const mongoose = require("mongoose");

const deckSchema = new mongoose.Schema({
  userId: mongoose.ObjectId,
  deckName: String,
  cards: [{ cardFront: String, cardBack: String }],
});

module.exports = deckSchema;
