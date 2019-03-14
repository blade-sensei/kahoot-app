const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const api = require('./routes/api');
const seed = require('./routes/seed');
const index = require('./routes/index');
const config = require('./config');
const cors = require('./middlewares/cors');
const logger = require('./utils/logger');

const app = express();
const http = require('http').createServer(app);
const io  = require('socket.io').listen(http);


app.set('secret_key', config.auth.key);

module.exports = app;

app.use(bodyParser.json());
app.use(cookieParser());

// enable cross origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS, PATCH');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-access-token'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cors.enablePreFlightRequest);

// adding routes modules
app.use('/', index);
app.use('/api', api);
app.use('/seed', seed);
app.use((req, res) => {
  res.send(404);
});

//socket io
io.on('connection', (socket) => {
  console.log('user connected');
  io.emit('connectionSucess', { success: true })
});

// config server
const port = process.env.port || config.server.port;
http.listen(port, () => {
  logger.info(`server api is running on : ${port} port ...`);

});

mongoose
  .connect(`mongodb://${config.db.host}/${config.db.name}`)
  .then(() => {
    mongoose.set('debug', false);
    // const log = new Logger({ level: 2, message: ''});
    // console.log(log);
    return logger.info(`database connection on ${mongoose.connection.port} port with success!`);
  })
  .catch((error) => {
    logger.info('fail to connect to database');
    logger.error(error.message);
  });
