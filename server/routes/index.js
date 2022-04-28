const Router = require('@koa/router');
const Game = require("../game/Game");
const router = new Router();

let game = new Game();

router.get('/api/game', (ctx) => {
  ctx.body = game;
})

router.post('/api/hit', (ctx) => {
  game.hit();
  ctx.body = game;
})

router.post('/api/stand', (ctx) => {
  game.stand();
  ctx.body = game;
})

router.post('/api/restart', (ctx) => {
  game = new Game();
  ctx.body = game;
})

module.exports = router