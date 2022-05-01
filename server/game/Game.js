const Player = require("./Player");
const getCardDeck = require("./cardHelper");

module.exports = class Game {
  players = [];
  currentPlayer;
  result = null;

  constructor(players) {
    players.map((name) => this.addPlayer(name));
    this.currentPlayer = this.players[0];
    this.cardDeck = getCardDeck();
    this.startGiveCards();
  }

  toJSON() {
    return {players: this.players, currentPlayer: this.currentPlayer, result: this.result}
  }

  addPlayer(name) {
    const id = this.players.length;
    this.players.push(new Player(id, name, []));
  }

  startGiveCards() {
    let countStartCard = 2;

    for(let i=1; i <= countStartCard; i++) {
      for (const player of this.players) {
        this.hit(player);
      }
    }
  }

  hit(player=this.currentPlayer) {
    if (player.isOver || player.isStand) {
      this.nextMove(player);
    } else {
      player.cards.push(this.cardDeck.shift());
      player.counting();
      if (player.isOver) {
        this.nextMove(player)
      }
    }
  }

  nextMove(player) {
    this.checkResult();

    if (this.result === null) {
      if (player.isStand || player.isOver) {
        this.currentPlayer = this.players[player.id + 1]
      }
    }
  }

  stand(player=this.currentPlayer) {
    player.isStand = true;
    this.nextMove(player);
  }

  checkResult() {
    let maxScore = 0;
    let playersFall = [];
    let playersStand = [];

    for (const player of this.players) {
      if (player.isOver) {
        playersFall.push(player);
      }
      if (player.isStand) {
        playersStand.push(player);
      }
    }

    if (playersFall.length === this.players.length) {
      this.result = 'Draw';
      return this.result;
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

    return this.result;
  }
}
