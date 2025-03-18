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
  stack: 100,
};
let computerPlayer = {
  cards: [],
  name : "theEnemy",
  stack: 100,
};
let confidence;
let points;
let pot;
let currentBet;
let currentMode;
let checkOption = false;
let foldOption = false;
let callOption = false;
let raiseOption = false;
let dealingCounter = 0;
let playerBetsFirst = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  createDeck();
  shuffleDeck();
  console.log(deckArray);
  playersArray.push(playerOne);
  playersArray.push(computerPlayer);
  dealTheCards();
  console.log(playerOne);
  console.log(computerPlayer);
}

function draw() {
  background(220);
  // dealTheCards();
  // console.log(playerOne);
}

function modeFeatures() {
  if (currentMode === "homescreen") {

  }
  else if (currentMode === "dealTheCards") {
    createDeck();
    shuffleDeck();
    dealTheCards();
  }
  else if (currentMode === "betting") {
    if (playerBetsFirst) {
      playerBet();
      assessComputerHandStrength();
      determineComputerBetting();
    }
    else {
      assessComputerHandStrength();
      determineComputerBetting();
      playerBet();
    }
    if (!raise) {
      raise = true;
      currentMode = "dealerAction";
    }
  }
  else if (currentMode === "dealerAction"){
    counter += 1;
    if (counter === 1) {
      currentMode = "flop";
    }
    else if (counter === 2) {
      currentMode = "turn";
    }
    else if (counter ===3) {
      currentMode = "river";
    }
    else {
      currentMode === "payout";
    }
  }
  else if (currentMode === "flop") {
    dealFlop();
    currentMode === "betting";
  }
  else if (currentMode === "turn") {
    dealTurn();
    currentMode === "betting";
  }
  else if (currentMode === "river") {
    dealRiver();
    currentMode === "betting";
  }
  else if (currentMode === "payout") {
    
  }
  else if (currentMode === "pause") {

  }
  else if (currentMode === "rules") {
    
  }
  else if (currentMode === "playerRaising") {

  }
  else {

  }
}

function createDeck() {
  let card = {
    number: 1,
    suit: 1,
  };
  for (let cardNumber = 1; cardNumber < 14; cardNumber++) {
    for (let cardSuit = 0; cardSuit < 4; cardSuit ++) {
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

function assessComputerHandStrength() {
  points = 0;
  let cardA = computerPlayer.cards[i].number;
  let cardB = computerPlayer.cards[i + 1].number;
  let cardASuit = computerPlayer.cards[i].suit;
  let cardBSuit = computerPlayer.cards[i + 1].suit;
  if (cardA > 10 || cardB > 10) {
    if (cardA === cardB) {
      points += 4;
    }
    else if (cardA > 10 && cardB > 10) {
      points += 2;
    }
    else {
      points += 1;
    }
  }
  if (cardA === 1 || cardB === 1) {
    if (cardA === cardB) {
      points += 6;
    }
    else if (cardA > 10 || cardB > 10) {
      points += 3;
    }
    else {
      points += 2;
    }
  }
  if (Math.abs(cardA - cardB) < 3) {
    if (cardA === cardB) {
      points += 2;
    }
    else {
      points += 1;
    }
  }
  if (cardASuit === cardBSuit) {
    points += 2;
  }
  return points;
}

function determineComputerBetting() {
  confidence = random(Math.abs(points - 3, points));
  if (currentBet !== 0) {
    if (currentBet > computerPlayer.stack / 7.5) {
      if (confidence > 3) {
        calls(computerPlayer);
        raise = false;
      }
      else {
        foldsTo(playerOne);
        raise = false;
      }
      if (confidence > 6) {
        bet(computerPlayer, random(4, 6));
      }
    }
  }
  else if (confidence > 5) {
    bet(computerPlayer, random(3, 5));
  }
  else if (confidence > 3) {
    bet(computerPlayer, random(2));
  }
  else {
    raise = false;
  }
}

function playerBet() {
  if (currentBet !== 0) {
    checkOption = true;
    raiseOption = true;
  }
  else {
    callOption = true;
    raiseOption = true;
    foldOption = true;
  }
}

function calls(playerChosen) {
  playerChosen.stack -= currentBet;
  pot += 2 * currentBet;
  currentBet = 0;
}

function foldsTo(playerChosen) {
  pot += currentBet;
  currentBet = 0;
  playerChosen.stack += pot;
}

function bet(playerChosen, betValue) {
  currentBet = playerChosen.stack / Math.floor(20 / betValue);
  if (currentBet > playerChosen.stack) {
    currentBet = playerChosen.stack;
    playerChosen.stack = 0;
  }
  else {
    playerChosen.stack -= currentBet;
  }
}

function checkDisplay() {
  fill("black");
  rect(5 * width / 7, 5 * height / 7, width / 7, height / 7);
  if (mouseIsPressed && mouseX > 5 * width / 7 && mouseX < 6 * width / 7 && mouseY > 5 * height / 7 && mouseY < 6 * height / 7) {
    currentMode = "dealerAction";
  }
}

function raiseOptionDisplay() {
  if (raiseOption) {
    playerOne.stack -= currentBet;
    currentBet = 2 * currentBet;
    pot += currentBet;
    currentBet = 0;
    fill("red");
    rect(6 * width / 7, 5 * height / 7, width / 7, height / 7);
    if (mouseIsPressed && mouseX > 6 * width / 7 && mouseX < width && mouseY > 5 * height / 7 && mouseY < 6 * height / 7) {
      currentMode = "playerRaising";
    }
  }
}

function callDisplay() {
  if (callOption) {
    fill("green");
    rect(5 * width / 7, 6 * height / 7, width / 7, height / 7);
    if (mouseIsPressed && mouseX > 5 * width / 7 && mouseX < 6 * width / 7 && mouseY > 6 * height / 7 && mouseY < height) {
      playerOne.stack -= currentBet;
      currentBet = 2 * currentBet;
      pot += currentBet;
      currentBet = 0;
      currentMode = "dealerAction";
    }
  }
}

function foldDisplay() {
  if (foldOption) {
    fill("blue");
    rect(6 * width / 7, 6 * height / 7, width, height / 7);
    if (mouseIsPressed && mouseX > 6 * width / 7 && mouseX < width && mouseY > 6 * height / 7 && mouseY < height) {
      foldsTo(computerPlayer);
    }
  }
}

// fix logic of input lol
function determineWinner(cardsArrayTotal, cardsArrayIndividual) {
  let sameCardCounter = 0;
  let playerFlushHighCard;
  let pairTotal = 0;
  let pairNumber = 0;
  let tripsNumber = 0;

  for (let card of cardsArrayTotal) {
    for (let n = 0; n < 7; n ++) {
      if (cardsArrayTotal[n].number === card.number) {
        sameCardCounter += 1;
      }
    }
    if (sameCardCounter === 4) {
      return [8, card.number];
    }
    if (counter === 3) {
      tripsNumber = card.number;
    }
    if (counter === 2) {
      if (!(pairTotal > 0 && card.number > pairNumber)) {
        pairNumber = card.number;
      }
      pairTotal += 1;
    }
  }
  if (counter === 3) {
    if (pairTotal > 0) {
      return [7, tripsNumber];
    }
    else {
      trips = true;
    }
  }
  for (card of cardsArrayTotal) {
    for (let i = 0; i < 4; i ++) {
      counter = 0;
      if (card.suit === i) {
        counter += 1;
        if (counter > 4) {
          if (cardsArrayIndividual.card[0].suit === i && cardsArrayIndividual.card[2].suit === i) {
            if (cardsArrayIndividual.card[0].number > cardsArrayIndividual.card[1].number) {
              playerFlushHighCard = cardsArrayIndividual.card[0].number;
            }
            else {
              playerFlushHighCard = cardsArrayIndividual.card[1].number;
            }
          }
          return [6, playerFlushHighCard];
        }
      }
    }
  }
  cardsArrayTotal.sort((a, b) => a.number - b.number);
  cardsArrayIndividual.sort((a, b) => a.number - b.number);
  for (i = 0; i < 3; i ++) {
    if (cardsArrayTotal[i].number === cardsArrayTotal[i + 1].number - 1 === cardsArrayTotal[i + 2].number - 2 === cardsArrayTotal[i + 3].number - 3 === cardsArrayTotal[i + 4].number - 4) {
      return [5, cardsArrayTotal[i + 4].number];
    }
  }
  if (trips) {
    return [4, tripsNumber];
  }
  else if (pairTotal > 1) {
    return [3, pairNumber];
  }
  else if (pairTotal === 1) {
    return [2, pairNumber];
  }
  else {
    return [1, cardsArrayIndividual[1].number];
  }
}
