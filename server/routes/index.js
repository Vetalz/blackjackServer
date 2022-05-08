const Router = require('@koa/router');
const {Validator} = require("node-input-validator");
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const Game = require("../models/Game");
const Player = require("../models/Player");
const {createReadStream} = require('fs');

const router = new Router();

const authorizationMiddleware = async (ctx, next) => {
  const token = ctx.header['authorization'];

  try {
    const session = jwt.verify(token, process.env.JWT_KEY);
    const game = await Game.findOne({id: session.id});

    if (!game) {
      ctx.status = 401;
      return;
    }
    ctx.state.session = session.id;
    ctx.state.game = game;

    return next();
  }
  catch (e) {
    ctx.status = 401;
  }
}

const generateOutput = async (session, game) => {
  return {
    game: {
      players: await Player.find({gameId: session}),
      currentPlayer: await Player.findById(game.currentPlayer),
      result: game.result
    }
  };
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
  const token = jwt.sign(session, process.env.JWT_KEY);
  const game = new Game({id: session.id});
  await game.addPlayer(players);

  ctx.body = {...await generateOutput(session.id, game), token};
})

router.get('/api/game', authorizationMiddleware, async (ctx) => {
  ctx.body = await generateOutput(ctx.state.session, ctx.state.game);
})

router.post('/api/hit', authorizationMiddleware, async (ctx) => {
  const game = ctx.state.game;
  await game.hit();

  ctx.body = await generateOutput(ctx.state.session, game);
})

router.post('/api/stand', authorizationMiddleware, async (ctx) => {
  const game = ctx.state.game;
  await game.stand();

  ctx.body = await generateOutput(ctx.state.session, game);
})

router.post('/api/restart', authorizationMiddleware, async (ctx) => {
  const game = ctx.state.game;
  await game.restart();

  ctx.body = await generateOutput(ctx.state.session, game);
})

router.get('/(.*)', (ctx) => {
  ctx.type = 'html';
  ctx.body = createReadStream(__dirname + '/../static/index.html');
})

module.exports = router;