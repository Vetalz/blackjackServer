const Router = require('@koa/router');
const Game = require("../game/Game");
const router = new Router();

let game;

router.get('/api/game', (ctx) => {
  ctx.body = game.result;
})

router.post('/api/hit', (ctx) => {
  game.giveCard(game.currentPlayer);
  ctx.body = game.currentPlayer
})

router.post('/api/stand', (ctx) => {
  game.stopGame(game.currentPlayer);
  ctx.body = game.currentPlayer
})

router.post('/api/restart', (ctx) => {
  game = new Game();
  game.currentPlayer = game.players[0];
  ctx.body = game.players;
})

module.exports = router