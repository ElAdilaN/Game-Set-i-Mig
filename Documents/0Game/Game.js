import Deck from "./Deck.js";
import Player from "./Player.js";

export default class Game {
  constructor() {
    this.torn = 0;
    this.deck = new Deck();
    this.playersArray = [];
    this.moneyToWin = 0;
    this.moneyToPlayWith = 0;
    this.numberOfPlayers = 0;
  }
  getInfo() {
    let input = parseInt(prompt("please enter player's number "));
    this.numberOfPlayers = parseInt(input, 10);
    const playerObj = new Player();
    this.playersArray = playerObj.createPlayer(
      this.numberOfPlayers,
      this.playersArray,
      this.moneyToPlayWith
    );
    this.createPlayerContainers();
  }

  createPlayerContainers() {
    const playersContainer = document.getElementById("container");
    playersContainer.innerHTML = "";

    for (let i = 0; i < this.numberOfPlayers; i++) {
      const playerContainer = document.createElement("div");
      playerContainer.className = `playerContainer`;
      playerContainer.id = `playerContainer-${i + 1}`;

      const playerInfo = document.createElement("div");
      playerInfo.className = "playerInfo";
      playerInfo.id = `playerInfo-${i + 1}`;

      const playerName = document.createElement("div");
      playerName.className = "playerName";
      playerName.id = `playerName-${i + 1}`;
      playerName.textContent = "Player : " + this.playersArray[i].name;

      const playerMoney = document.createElement("div");
      playerMoney.className = "playerMoney";
      playerMoney.id = `playerMoney-${i + 1}`;
      playerMoney.textContent = "Player Money : " + this.playersArray[i].money;

      const playerPoints = document.createElement("div");
      playerPoints.className = "playerPoints";
      playerPoints.id = `playerPoints-${i + 1}`;
      playerPoints.textContent = "Total points : 0 .";

      playerInfo.appendChild(playerName);
      playerInfo.appendChild(playerMoney);
      playerInfo.appendChild(playerPoints);

      playerContainer.appendChild(playerInfo);

      const btnDemand = document.createElement("button");
      btnDemand.id = `btn1-${i + 1}`;
      btnDemand.className = `button`;
      btnDemand.disabled = true;
      btnDemand.textContent = " SI Demand";

      playerContainer.appendChild(btnDemand);

      const btnNoDemand = document.createElement("button");
      btnNoDemand.id = `btn2-${i + 1}`;
      btnNoDemand.className = `button`;
      btnNoDemand.disabled = true;
      btnNoDemand.textContent = "Skip Demand";

      playerContainer.appendChild(btnNoDemand);

      const playerCard = document.createElement("div");
      playerCard.className = `playerCard`;
      playerCard.id = `player-Cards-${i + 1}`;
      playerCard.innerHTML = "Cards" + "<br>";

      playerContainer.appendChild(playerCard);

      playersContainer.appendChild(playerContainer);

      btnDemand.addEventListener("click", () => {
        let newCard = this.deck.cards.pop();
        this.playersArray[i].cards.push(newCard);
        this.playersArray[i].totalPoints += newCard.pointValue;

        this.updatePlayerCards(i, newCard, this.playersArray[i].totalPoints);
        if (this.playersArray[i].totalPoints > 7.5) {
          this.playersArray[i].state = "no-active";

          alert(
            this.playersArray[i].name + " is eliminated, has depassed 7.5 "
          );
          this.torn = (this.torn + 1) % this.playersArray.length;
          this.jugada(this.torn, this.deck);
        }
      });
    }
  }

  startGame() {
    this.deck.createCards();
    this.deck.shuffleArray();
    console.log(this.deck);
    this.moneyToPlayWith = prompt("please enter money to play with ");
    this.moneyToWin = this.numberOfPlayers * this.moneyToPlayWith;
  }
  checkButtons(torn) {
    for (let i = 0; i < this.numberOfPlayers; i++) {
      const mybtn1 = document.getElementById(`btn1-${i + 1}`);
      const mybtn2 = document.getElementById(`btn2-${i + 1}`);
      mybtn1.disabled = true;
      mybtn2.disabled = true;
      mybtn1.style.backgroundColor = "white";
      mybtn2.style.backgroundColor = "white";
    }

    const mybtn1 = document.getElementById(`btn1-${torn + 1}`);
    const mybtn2 = document.getElementById(`btn2-${torn + 1}`);
    mybtn1.disabled = false;
    mybtn2.disabled = false;
    mybtn1.style.backgroundColor = "red";
    mybtn2.style.backgroundColor = "red";
  }

  play() {
    console.log(this.deck);
    this.torn = 0;
    this.checkButtons(this.torn);
    this.jugada(this.torn, this.deck);
  }

  jugada(torn, mydeck) {
    let currentDeck = mydeck;
    let currentPlayer = this.playersArray[torn];

    if (
      this.playersArray.filter((player) => player.state === "active").length > 1
    ) {
      if (currentPlayer.state === "active") {
        this.checkButtons(torn);
        const mybtn1 = document.getElementById(`btn1-${torn + 1}`);
        const mybtn2 = document.getElementById(`btn2-${torn + 1}`);

        mybtn2.addEventListener("click", () => {
          torn = (torn + 1) % this.playersArray.length;
          this.jugada(torn, currentDeck);
        });
      } else {
        torn = (torn + 1) % this.playersArray.length;
        this.jugada(torn, currentDeck);
      }
    } else {
      document
        .querySelectorAll(".button")
        .forEach((button) => (button.disabled = true));

      let winner = this.playersArray.find(
        (player) => player.state === "active"
      );

      alert(
        "Game over ! the winner is " +
          winner.name +
          " now u have " +
          winner.money
      );
      this.updateMoney(this.playersArray, this.moneyToWin);
    }
  }

  updateMoney(arr, money) {
    for (let i = 0; i < arr.length; i++) {
      const mymoney = document.getElementById(`playerMoney-${i + 1}`);

      if (arr[i].state === "active") {
        arr[i].money += money - this.moneyToPlayWith;
      } else {
        arr[i].money -= money / arr.length;
      }
      mymoney.textContent = "Player Money : " + arr[i].money;
      alert(arr[i].name + "  " + arr[i].money);
    }
  }

  updatePlayerCards(torn, card, totalpts) {
    const mypoints = document.getElementById(`playerPoints-${torn + 1}`);
    const mycards = document.getElementById(`player-Cards-${torn + 1}`);

    const cardImage = document.createElement("img");
    cardImage.className = "img";
    cardImage.src = `images/${card.value}${card.suit}.PNG`;
    cardImage.alt = "Card Image";

    mycards.appendChild(cardImage);

    mypoints.textContent = "Total points : " + totalpts;
  }
}
