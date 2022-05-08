const mongoose = require('mongoose');
const Player = require('./Player');
const CardSchema = require('./Card');

const gameSchema = new mongoose.Schema({
  id: {
    type: String
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    }
  ],
  currentPlayer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    default: null
  },
  result: {
    type: String,
    default: null
  },
  cardDeck: [CardSchema]
});

gameSchema.methods.addPlayer = async function addPlayer(names) {
  for (name of names) {
    const gameId = this.id;
    const id = this.players.length;
    const player = new Player({gameId, id, name});
    await player.save();
    this.players.push(player._id);
  }
  this.currentPlayer = this.players[0];
  await this.startGiveCards();
}

gameSchema.methods.restart = async function restart() {
  this.result = null;
  this.cardDeck =[];
  this.currentPlayer = this.players[0];

  const players = await Player.find({gameId: this.id})
  for (let player of players) {
    player.score = 0;
    player.isOver = false;
    player.isStand = false;
    player.cards = [];
    await player.save()
  }

  await this.startGiveCards();
}

gameSchema.methods.startGiveCards = async function startGiveCards() {
    let countStartCard = 2;
  await this.getCardDeck();

  for(let i=1; i <= countStartCard; i++) {
    for(const id of this.players) {
      await this.hit(id);
    }
  }
}

gameSchema.methods.hit = async function hit(playerId=this.currentPlayer) {
  const player = await Player.findById(playerId);

  if (player.isOver || player.isStand) {
    await this.nextMove(player);
  } else {
    player.cards.push(this.cardDeck.shift());
    await player.counting();
    await this.save();

    if (player.isOver) {
      await this.nextMove(player)
    }
  }
}

gameSchema.methods.stand = async function stand(playerId=this.currentPlayer) {
  const player = await Player.findById(playerId);
  player.isStand = true;
  await player.save();
  await this.nextMove(player);
}

gameSchema.methods.nextMove = async function nextMove(player) {
  await this.checkResult();
  if (this.result === null) {
    if (player.isStand || player.isOver) {
      this.currentPlayer = this.players[player.id + 1];
      await this.save()
    }
  }
}

gameSchema.methods.checkResult = async function checkResult() {
  let maxScore = 0;
  let playersFall = [];
  let playersStand = [];

  for (const playerId of this.players) {
    const player = await Player.findById(playerId);
    if (player.isOver) {
      playersFall.push(player);
    }
    if (player.isStand) {
      playersStand.push(player);
    }
  }

  if (playersFall.length === this.players.length) {
    this.result = 'Draw';
  }

  if (playersFall.length + playersStand.length === this.players.length) {
    for (const player of playersStand) {
      if (player.score > maxScore) {
        maxScore = player.score;
        this.result = player.name;
        continue;
      }

      if (player.score === maxScore) {
        this.result = 'Draw';
      }
    }
  }

  await this.save();
}

gameSchema.methods.getCardDeck = async function getCardDeck() {
  const cardSuitVariant = ['♦', '♥', '♠', '♣'];
  const cardValueVariant = [['2', 2], ['3', 3], ['4', 4], ['5', 5], ['6', 6], ['7', 7], ['8', 8], ['9', 9], ['10', 10],
    ['J', 10], ['Q', 10], ['K', 10], ['A', 11]];

  for (const variant of cardSuitVariant) {
    for (const value of cardValueVariant) {
      this.cardDeck.push(
        {
          cardSuit: variant,
          cardName: value[0],
          cardValue: value[1]
        }
      )
    }
  }
  this.shuffle();
  await this.save();
}

gameSchema.methods.shuffle = function shuffle() {
  let current = this.cardDeck.length;
  let random;
  while (current !== 0) {
    random = Math.floor(Math.random() * current);
    current--;

    [this.cardDeck[current], this.cardDeck[random]] = [
      this.cardDeck[random], this.cardDeck[current]
    ];
  }
}


module.exports = mongoose.model('Game', gameSchema);