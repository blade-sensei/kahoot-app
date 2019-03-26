class GameManagerMapper {

  constructor() {
    this.players = [];
    this.id = 0;
  };

  getPlayers() {
    return this.players;
  }

  setPlayers(player) {
    this.players.push(player);
  }

  setId(id) {
    this.id = id;
  }

  getId(id) {
    return this.id;
  }

  find(pin) {
    return this.gameManagerMap.find((game) => {
      return game[0] === pin
    })
  }
}

module.exports = GameManagerMapper;