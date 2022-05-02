const Router = require('@koa/router');
const Game = require("../game/Game");
const {Validator} = require("node-input-validator");
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const {jwtKey} = require("../keys");
const router = new Router();

const {createReadStream} = require('fs')

let games = {};

const authorizationMiddleware = (ctx, next) => {
  const token = ctx.header['authorization'];

  try {
    const session = jwt.verify(token, jwtKey);
    const sessions = Object.keys(games)

    if (!sessions.includes(session.id)) {
      ctx.status = 401;
      return;
    }
    ctx.state.session = session;

    return next();
  }
  catch (e) {
    ctx.status = 401;
  }
}

checkGames = (ctx, next) => {
  const session = ctx.state.session;

  if (!games[session.id]) {
    ctx.status = 401;

    return;
  }

  ctx.state.game = games[session.id];
  return next();
}


router.post('/api/login', async (ctx) => {
  let v = new Validator(
    ctx.request.body,
    {
      'players': 'required|array|between:2,9',
      'players.*': 'required|string'
    },
  );
  if (!await v.check()) {
    ctx.status = 422;
    return;
  }

  const players = ctx.request.body['players'];
  const session = {
    id: uuidv4(),
  };
  const token = jwt.sign(session, jwtKey);
  const game = new Game(players);
  games[session.id] = game;

  ctx.body = {
    token,
    game
  };
})

router.get('/api/game', authorizationMiddleware, checkGames, (ctx) => {
  ctx.body = ctx.state.game;
})

router.post('/api/hit', authorizationMiddleware, checkGames, (ctx) => {
  ctx.state.game.hit();
  ctx.body = ctx.state.game;
})

router.post('/api/stand', authorizationMiddleware, checkGames, (ctx) => {
  ctx.state.game.stand();
  ctx.body = ctx.state.game;
})

router.post('/api/restart', authorizationMiddleware, checkGames, (ctx) => {
  const playersName = ctx.state.game.players.map((player) => player.name);
  const session = ctx.state.session;

  const game = new Game(playersName);
  games[session.id] = game;
  ctx.body = game;
})

router.get('/(.*)', (ctx) => {
  ctx.type = 'html';
  ctx.body = createReadStream(__dirname + '/../static/index.html');
})

module.exports = router;