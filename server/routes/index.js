const Router = require('@koa/router');
const Game = require("../game/Game");
const router = new Router();

let game = new Game();

router.get('/api/game', (ctx) => {
  ctx.body = game;
})

router.post('/api/hit', (ctx) => {
  game.hit(game.currentPlayer);
  ctx.body = game.currentPlayer
})

router.post('/api/stand', (ctx) => {
  game.stand(game.currentPlayer);
  ctx.body = game.currentPlayer
})

router.post('/api/restart', (ctx) => {
  game = new Game();
  ctx.body = game.players;
})

module.exports = router