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
const gameManagerMapper = require('./game/gameManagerMapper');
const GameManager = require('./game/gameManager');

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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

io.on('connection', (socket) => {
  console.log('connection socket');
  socket.on('create_room_admin', (data) => {
    console.log('user connected');
    const pinGame = getRandomInt(30);
    const gameManager = new GameManager();
    gameManager.setId(pinGame);
    const game = [pinGame, gameManager];
    gameManagerMapper.setMap(game);
    console.log('created map', gameManagerMapper.getMap());
    io.emit('create_room_response', { success: true, gameId: pinGame });
  });
  //qu'on une connection est réussi par l'admin il faut créer une room,
  //et on va emit et écouter que sur cette room.
  // donc les event dans angular manager vont se faire
  socket.on('join_room_player', (data) => {
    const player = {
      name: data.playerName,
    };
    console.log('user player connected', player);
    const game = gameManagerMapper.find(Number(data.pin));
    let gameToEmit = {};
    if (game) {
      const gameManager = game[1];
      console.log('manager', gameManager);
      gameManager.setPlayers(player);
      const players = gameManager.getPlayers();
      const id = gameManager.getId();
      console.log('players', players);
      gameToEmit = {
        success: true,
        gameId: id,
        game: { players: players, id: id }
      };
    } else {
      gameToEmit.success = false;
    }
    io.emit('join_response_player', gameToEmit);
  });

  socket.on('game_state_get', gameId => {
    console.log(gameId);
    const [,game] = gameManagerMapper.find(Number(gameId));
    console.log('game_state_get', game);
    io.emit('game_state_get_response', game);
  })

  //gameState
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
