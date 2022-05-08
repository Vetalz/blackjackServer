const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  cardSuit: String,
  cardName: String,
  cardValue: Number
});

module.exports = CardSchema;