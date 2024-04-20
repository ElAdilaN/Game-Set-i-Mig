//let playersArray = [];
let aPlayer;
export default class Player {
  constructor() {
    this.name = "";
    this.money = 0;
    this.state = "active";
    this.cards = [];
    this.totalPoints = 0;
  }
  createPlayer(numberOfPlayers, playersArray, moneyToPlayWith) {
    playersArray = [];
    aPlayer = new Player();
    aPlayer.name = "Bank";
    aPlayer.money = prompt("enter bank's money amount ") - moneyToPlayWith;
    aPlayer.state = "active";
    playersArray.push(aPlayer);

    for (let i = 1; i < numberOfPlayers; i++) {
      aPlayer = new Player();
      aPlayer.name = prompt(`enter player ${i+1} name  please `);
      aPlayer.money =
        prompt(`enter player ${i+1} money  please `) - moneyToPlayWith;
      aPlayer.state = "active";

      playersArray.push(aPlayer);
    }
    return playersArray;
  }
}
