const mongoose = require('mongoose');
const CardSchema = require('./Card');

const playerSchema = new mongoose.Schema({
  gameId: {
    type: String
  },
  id: {
    type: Number,
    default: null
  },
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0
  },
  isOver: {
    type: Boolean,
    default: false
  },
  isStand: {
    type: Boolean,
    default: false
  },
  cards: [CardSchema]
});

playerSchema.methods.counting = async function counting() {
  let count = 0;
  for (const card of this.cards) {
    count += card.cardValue;
  }
  this.score = count;
  if (this.score > 21) {
    this.isOver = true;
  }
  await this.save()
}

module.exports = mongoose.model('Player', playerSchema);