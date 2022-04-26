const Koa = require('koa');
const server = require('koa-static');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = require('./routes/index')



app.use(bodyParser());
app.use(server(__dirname + '/static'));
app.use(router.routes());

app.listen(3000);
