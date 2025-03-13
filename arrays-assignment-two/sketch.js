// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let deckArray = [];
let myHand = [];
let flopArray = [];
let turn;
let river;
let boardArray = [];
let playersArray = [];
let playersArrayPlaceholder = [];
let playerOne = {
  cards: [],
  name: "sam",
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  createDeck();
  shuffleDeck();
  console.log(deckArray);
  playersArray.push(playerOne);
  dealTheCards();
  console.log(playerOne);
}

function draw() {
  background(220);
  // dealTheCards();
  // console.log(playerOne);
}

function createDeck() {
  let card = {
    number: 1,
    suit: 1,
  };
  for (let cardNumber = 1; cardNumber < 14; cardNumber++) {
    for (let cardSuit = 1; cardSuit < 5; cardSuit ++) {
      card = {
        number: cardNumber,
        suit: cardSuit,
      };
      deckArray.push(card);
    }
  }
}

// randomized using fisher-yates shuffle
function shuffleDeck() {
  for (let i = deckArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = deckArray[i];
    deckArray[i] = deckArray[j];
    deckArray[j] = swap;
  }
}

function dealTheCards() {
  deckArray.pop();
  for (let i = 0; i < playersArray.length; i ++) {
    playersArray[i].cards = [deckArray.pop(), deckArray.pop()];
  }
}

function dealFlop() {
  deckArray.pop();
  for (let i = 0; i < 3; i++) {
    let newCard = deckArray.pop();
    flopArray.push(newCard);
    boardArray.push(newCard);
  }
}

function dealTurn() {
  deckArray.pop();
  let newCard = deckArray.pop();
  turn = newCard;
  boardArray.push(newCard);
}

function dealRiver() {
  deckArray.pop();
  let newCard = deckArray.pop();
  river = newCard;
  boardArray.push(newCard);
}