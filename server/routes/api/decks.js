const { request } = require('express');
const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const router = express.Router();

const deckSchema = require('../../models/deckSchema.js');

const dotenv = require("dotenv");

const result = dotenv.config();

if (result.error){
    throw result.error;
}

const url = process.env.mongoURL;
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => console.log("Database connected!"))
.catch(err =>console.log(err));

const Deck = mongoose.model('Deck', deckSchema, 'decks');

// Get Decks
router.get('/', async (req, res) => {
    res.send(await Deck.find({}));
});

// Add Deck
router.post('/', async (req, res) => {
    try {
        const deck = new Deck();
        deck.deckName = req.body.deckName;
        deck.cards = [];
        await deck.save(function(err,deck){
            if (err) {
                res.status(500);
            }
            res.status(201).json(deck);
        });
    } catch (err) {
         console.log(err)
    }
    
});

// Delete Deck
router.delete('/:id/deckName', async (req, res) => {
    try {
        let deck = await Deck.findById(req.params.id);
        await deck.delete()
        res.status(200).send();
    } catch (err) {
         console.log(err);
    }
});

// Edit Deck
router.put('/:id/deckName', async (req, res) => {
    try {
        let deck = await Deck.findById(req.params.id);
        deck.deckName = req.body.deckName;
        await deck.save(function(err,deck){
            if (err) {
                res.status(500);
            }
            res.status(201).json(deck);
        });
    } catch (err) {
         console.log(err)
    }
    
});

// Add Card
router.post("/:id/cards", async (req,res) => {
    let deck = await Deck.findById(req.params.id);
    deck.cards.push({cardFront: req.body.cardFront, cardBack: req.body.cardBack});
    await deck.save(function(err,deck){
        if (err) {
            res.status(500);
        }
        res.status(201).json(deck);
    });
})

// Delete Card
router.delete('/:id/cards/:cardId', async (req, res) => {
    try {
        let deck = await Deck.findById(req.params.id);

        // the pull function deletes from the mongodb
        deck.cards.pull({ _id: req.params.cardId });

        await deck.save(function(err,deck){
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