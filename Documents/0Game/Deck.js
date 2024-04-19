import Card from "./Card.js";


// sif , dheb , hrawa , tbe9
const suits = ["Espases", "Oros", "Bastos", "Copes"];
const values = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];

export default class Deck {
  constructor() {
    this.cards = [];
  }

  createCards() {
    suits.forEach((suit) => {
      values.forEach((value) => {
        let m = value <= 7 ? value : 0.5;
        this.cards.push(new Card(suit, value, m));
      });
    });
    return this.cards;

  }

  shuffleArray() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // Swap elements at i and j indices
    }
  }

}