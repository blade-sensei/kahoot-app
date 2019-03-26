class GameManagerMapper {

  constructor() {
    this.gameManagerMap = [];
  };

  getMap() {
    return this.gameManagerMap;
  }

  setMap(game) {
    this.gameManagerMap.push(game);
  }

  find(pin) {
    return this.gameManagerMap.find((game) => {
      return game[0] === pin
    })
  }
}

module.exports = new GameManagerMapper();