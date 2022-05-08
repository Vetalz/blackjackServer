const Koa = require('koa');
const server = require('koa-static');
const bodyParser = require('koa-bodyparser');
const niv = require('node-input-validator');
const app = new Koa();
const router = require('./routes/index');
const mongoose = require('mongoose');
require("dotenv").config();

(async() => {
  await mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}`+
    `@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`);
  app.use(bodyParser());
  app.use(niv.koa());
  app.use(server(__dirname + '/static'));
  app.use(router.routes());
  app.listen(process.env.SERVER_PORT);
})()
