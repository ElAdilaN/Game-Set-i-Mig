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
    let input = prompt("please enter player's number ");
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
      playerCard.textContent = "cards: \n";

      playerContainer.appendChild(playerCard);

      playersContainer.appendChild(playerContainer);
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
    for (let i = 1; i < this.numberOfPlayers; i++) {
      const mybtn1 = document.getElementById(`btn1-${i}`);
      const mybtn2 = document.getElementById(`btn2-${i}`);
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

        mybtn1.addEventListener("click", function () {
          let newCard = currentDeck.cards.pop();
          currentPlayer.cards.push(newCard);
          currentPlayer.totalPoints += newCard.pointValue;

          this.updatePlayerCards(torn, newCard, currentPlayer.totalPoints);
          if (currentPlayer.totalPoints > 7.5) {
            this.playersArray[torn].state = "no-active";
            alert(currentPlayer.name + " is eliminated , has depassed 7.5 ");
            torn = (torn + 1) % this.playersArray.length;
          }
          this.jugada(torn, currentDeck);
        });
        mybtn2.addEventListener("click", function () {
          torn = (torn + 1) % this.playersArray.length;
          this.jugada(torn, currentDeck);
        });
      } else {
        torn = (torn + 1) % this.playersArray.length;
        this.jugada(torn, currentDeck);
      }
    } else {
      let winner = this.playersArray.find(
        (player) => player.state === "active"
      );

      alert(
        "Game over ! the winner is" +
          winner.name +
          " now u have " +
          winner.money
      );
    }
  }

  updatePlayerCards(torn, card, totalpts) {
    const mypoints = document.getElementById(`playerPoints-${torn + 1}`);
    const mycards = document.getElementById(`player-Cards-${torn + 1}`);

    mypoints.textContent = "Total points : " + totalpts;
    mycards.textContent += "\n " + card.value + " of " + card.suit;
  }

  resetValues(myarray) {
    myarray.forEach((player) => {
      player.cards = [];
    });
    myarray.forEach((player) => {
      player.totalPoints = 0;
    });
  }

  restartGame() {
    let playAgain = confirm(
      "Do you want to play again with the same players and money?"
    );

    if (playAgain) {
      resetValues(this.playersArray);
      this.startGame();
      this.play();
    } else {
      resetValues(this.playersArray);
      this.getInfo();
      this.startGame();
      this.play();
    }
  }
}
