const { request } = require("express");
// const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// const deckSchema = require("../../models/deckSchema.ts");

if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");

  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }
}

const url = process.env.mongoURL;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err: any) => console.log(err));

const Deck = mongoose.model("Deck", deckSchema, "decks");

// Get Decks
router.get("/:id", async (req: { params: { id: any; }; }, res: { send: (arg0: any) => void; }) => {
  res.send(await Deck.find({ userId: mongoose.Types.ObjectId(req.params.id) }));
});

// Get Deck after page reload
router.get("/deck/:id", async (req: { params: { id: any; }; }, res: { send: (arg0: any) => void; }) => {
  res.send(await Deck.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }));
});

// Add Deck
router.post("/", async (req: { body: { deckName: any; userId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; }) => {
  try {
    const deck = new Deck();
    deck.deckName = req.body.deckName;
    deck.userId = req.body.userId;
    deck.cards = [];
    await deck.save(function (err: any, deck: any) {
      if (err) {
        res.status(500);
      }
      res.status(201).json(deck);
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete Deck
router.delete("/:id/deckName", async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (): void; new(): any; }; }; }) => {
  try {
    let deck = await Deck.findById(req.params.id);
    await deck.delete();
    res.status(200).send();
  } catch (err) {
    console.log(err);
  }
});

// Delete Decks
router.delete("/:id", async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (): void; new(): any; }; }; }) => {
  try {
    let decks = await Deck.find({
      userId: mongoose.Types.ObjectId(req.params.id),
    });
    for (let i = 0; i < decks.length; i++) {
      await decks[i].delete();
    }
    res.status(200).send();
  } catch (err) {
    console.log(err);
  }
});

// Edit Deck
router.put("/:id/deckName", async (req: { params: { id: any; }; body: { deckName: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; }) => {
  try {
    let deck = await Deck.findById(req.params.id);
    deck.deckName = req.body.deckName;
    await deck.save(function (err: any, deck: any) {
      if (err) {
        res.status(500);
      }
      res.status(201).json(deck);
    });
  } catch (err) {
    console.log(err);
  }
});

// Add Card
router.post("/:id/cards/:cardsListIndex", async (req: { params: { id: any; cardsListIndex: string; }; body: { cardFront: any; cardBack: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; }) => {
  let deck = await Deck.findById(req.params.id);
  // if there are no cards or only one card, add the new card to the end
  if (deck.cards.length === 0 || deck.cards.length === 1) {
    deck.cards.push({
      cardFront: req.body.cardFront,
      cardBack: req.body.cardBack,
    });
  }
  // if we are at the end already, add the card to the end
  else if (
    deck.cards.length > 1 &&
    deck.cards.length - parseInt(req.params.cardsListIndex) === 1
  ) {
    deck.cards.push({
      cardFront: req.body.cardFront,
      cardBack: req.body.cardBack,
    });
  }
  // if we are in the middle of the deck, insert the card immediately after the current card
  else {
    deck.cards.splice(parseInt(req.params.cardsListIndex) + 1, 0, {
      cardFront: req.body.cardFront,
      cardBack: req.body.cardBack,
    });
  }
  await deck.save(function (err: any, deck: any) {
    if (err) {
      res.status(500);
    }
    res.status(201).json(deck);
  });
});

// Edit Card Front
router.put("/:id/cards/front/:cardId/:cardsListIndex", async (req: { params: { id: any; cardsListIndex: any; }; body: { cardFront: any; cardBack: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; }) => {
  try {
    let deck = await Deck.findById(req.params.id);
    await deck.cards.set(req.params.cardsListIndex, {
      cardFront: req.body.cardFront,
      cardBack: req.body.cardBack,
    });
    await deck.save(function (err: any, deck: any) {
      if (err) {
        res.status(500);
      }
      res.status(201).json(deck);
    });
  } catch (err) {
    console.log(err);
  }
});

// Edit Card Back
router.put("/:id/cards/back/:cardId/:cardsListIndex", async (req: { params: { id: any; cardsListIndex: any; }; body: { cardFront: any; cardBack: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; }) => {
  try {
    let deck = await Deck.findById(req.params.id);
    await deck.cards.set(req.params.cardsListIndex, {
      cardFront: req.body.cardFront,
      cardBack: req.body.cardBack,
    });
    await deck.save(function (err: any, deck: any) {
      if (err) {
        res.status(500);
      }
      res.status(201).json(deck);
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete Card
router.delete("/:id/cards/:cardId", async (req: { params: { id: any; cardId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; }) => {
  try {
    let deck = await Deck.findById(req.params.id);

    // the pull function deletes from the mongodb
    deck.cards.pull({ _id: req.params.cardId });

    await deck.save(function (err: any, deck: any) {
      if (err) {
        res.status(500);
      }
      res.status(201).json(deck);
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
