// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let deckArray = [];
let flopArray = [];
let turn;
let river;
let boardArray = [];
let playersArray = [];
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
let pot = 0;
let currentBet = 0;
let currentMode;
let dealingCounter = 0;
let playerBetsFirst = true;
let playerScore;
let computerScore;
let counter = 0;
let allIn = false;
let computerBet = false;
let raise = true;
let timeDifference = 500;
let checkOption;

function setup() {
  createCanvas(windowWidth, windowHeight);
  playersArray.push(playerOne);
  playersArray.push(computerPlayer);
  currentMode = "dealTheCards";
}

function draw() {
  background("green");
  modeFeatures();
}

function modeFeatures() {

  if (currentMode === "dealTheCards") {
    createDeck();
    shuffleDeck();
    dealTheCards();
    console.log(deckArray);
    console.log(playerOne);
    console.log(computerPlayer);
    currentMode = "betting";
    counter = 0;
    raise = true;
    boardArray = [];
  }

  if (currentMode === "betting") {
    console.log(raise + " raise?");
    points = 0;
    raise = true;
    if (!allIn) {
      if (!computerBet) {
        if (counter === 0) {
          assessComputerHandStrength();
        }
        else {
          let meritPoints = determineWinner(boardArray, computerPlayer.cards)[0];
          console.log(meritPoints + " merit points");
          assessComputerHandStrength();
          points = points / 3 + meritPoints;
        }
        determineComputerBetting();
        computerBet = true;
        console.log(points + " computer points");
      }
      else {
        currentMode = "playerBet";
      }
      if (!raise) {
        raise = true;
        currentMode = "dealerAction";
      }
    }
    else {
      currentMode = "dealerAction";
    }
  }

  if (currentMode === "playerBet") {
    console.log("player bets");
    playerBet();
  }

  if (currentMode === "dealerAction"){
    console.log("dealer Action");
    console.log(boardArray);
    counter += 1;
    console.log(counter);
    if (counter === 1) {
      currentMode = "flop";
    }
    else if (counter === 2) {
      currentMode = "turn";
    }
    else if (counter === 3) {
      currentMode = "river";
    }
    else {
      currentMode = "payout";
    }
    raise = true;
    computerBet = false;
  }

  if (currentMode === "flop") {
    console.log("flop");
    dealFlop();
    currentMode = "betting";
  }

  if (currentMode === "turn") {
    console.log("turn");
    dealTurn();
    currentMode = "betting";
  }

  if (currentMode === "river") {
    console.log("river");
    dealRiver();
    currentMode = "betting";
  }

  if (currentMode === "payout") {
    console.log("payout");
    playerScore = determineWinner(boardArray, playerOne.cards);
    computerScore = determineWinner(boardArray, computerPlayer.cards);
    if (playerScore[0] > computerScore[0]) {
      foldsTo(playerOne);
    }
    else if (computerScore[0] > playerScore[0]) {
      foldsTo(computerPlayer);
    }
    else if (playerScore[1] > computerScore[1]) {
      foldsTo(playerOne);
    }
    else if (computerPlayer[1] > playerOne[1]) {
      foldsTo(computerPlayer);
    }
    else {
      playerOne.stack += pot / 2;
      computerPlayer.stack += pot / 2;
      pot = 0;
    }
    currentMode = "dealTheCards";
  }

  if (currentMode === "pause") {

  }

  if (currentMode === "rules") {
    
  }

  if (currentMode === "playerRaising") {
    console.log("player raising");
    fill("blue");
    square(100, 100, 100);
    if (mouseIsPressed && mouseX > 100 && mouseX < 200 && mouseY > 100 && mouseY < 200) {
      bet(playerOne, 5);
      currentMode = "betting";
      raise = true;
      computerBet = false;
    }
  }
}

function createDeck() {
  deckArray = [];
  let card = {
    number: 0,
    suit: 0,
  };
  for (let cardNumber = 0; cardNumber < 13; cardNumber++) {
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
  playerOne.cards = [];
  computerPlayer.cards = [];
  deckArray.pop();
  for (let i = 0; i < 2; i ++) {
    playerOne.cards.push(deckArray.pop());
    computerPlayer.cards.push(deckArray.pop());
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
  let cardA = computerPlayer.cards[0].number;
  let cardB = computerPlayer.cards[1].number;
  let cardASuit = computerPlayer.cards[0].suit;
  let cardBSuit = computerPlayer.cards[1].suit;
  if (cardA > 9 || cardB > 9) {
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
  if (cardA === 12 || cardB === 12) {
    if (cardA === cardB) {
      points += 2;
    }
    else if (cardA > 10 || cardB > 10) {
      points += 1;
    }
    else {
      points += 0.5;
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
}

function determineComputerBetting() {
  // confidence = random(Math.abs(points - 3), points);
  confidence = points;
  let bluff = random(100);
  if (currentBet !== 0) {
    if (currentBet > computerPlayer.stack / 7.5) {
      if (confidence > 93) {
        bet(computerPlayer, random(2, 5));
      }
      else {
        if (confidence > 3) {
          calls(computerPlayer);
        }
        else {
          foldsTo(playerOne);
        }
        if (confidence > 6) {
          bet(computerPlayer, random(4, 6));
        }
      }
    }
  }
  else if (confidence > 7) {
    bet(computerPlayer, random(3, 5));
  }
  else if (confidence > 5) {
    bet(computerPlayer, random(2));
  }
  else {
    if (bluff > 85) {
      bet(computerPlayer, random(2, 6));
    }
  }
}

function playerBet() {
  if (currentBet === 0) {
    checkOption = true;
    checkDisplay();
    raiseOptionDisplay();
  }
  else {
    callDisplay();
    raiseOptionDisplay();
    foldDisplay();
  }
}

function calls(playerChosen) {
  playerChosen.stack -= currentBet;
  pot += 2 * currentBet;
  currentBet = 0;
  raise = false;
  currentMode = "dealerAction";
}

function foldsTo(playerChosen) {
  pot += currentBet;
  currentBet = 0;
  playerChosen.stack += pot;
  pot = 0;
  console.log(playerChosen.stack + " stack of winner (after fold)");
  console.log(playerChosen + " winner");
  currentMode = "dealTheCards";
}

function bet(playerChosen, betValue) {
  currentBet = playerChosen.stack / Math.floor(20 / betValue);
  if (currentBet > playerChosen.stack) {
    currentBet = playerChosen.stack;
    playerChosen.stack = 0;
  }
  else {
    playerChosen.stack -= currentBet;
    console.log(currentBet + ' current bet and ' + playerChosen);
  }
}

function checkDisplay() {
  if (checkOption) {
    fill("black");
    rect(5 * width / 7, 5 * height / 7, width / 7, height / 7);
    if (mouseIsPressed && mouseX > 5 * width / 7 && mouseX < 6 * width / 7 && mouseY > 5 * height / 7 && mouseY < 6 * height / 7) {
      currentMode = "dealerAction";
      console.log("check");
      checkOption = false;
    }
  }
}

function raiseOptionDisplay() {
  fill("red");
  rect(6 * width / 7, 5 * height / 7, width / 7, height / 7);
  if (mouseIsPressed && mouseX > 6 * width / 7 && mouseX < width && mouseY > 5 * height / 7 && mouseY < 6 * height / 7) {
    if (playerOne.stack >= pot) {
      playerOne.stack -= currentBet;
      currentBet = 2 * currentBet;
      pot += currentBet;
      currentBet = 0;
    }
    else {
      playerOne.stack = 0;
      currentBet += playerOne.stack;
      pot += currentBet;
      currentBet = 0;
      allIn = true;
    }
    currentMode = "playerRaising";
  }
}

function callDisplay() {
  fill("yellow");
  rect(6 * width / 7, 6 * height / 7, width / 7, height / 7);
  if (mouseIsPressed && mouseX > 6 * width / 7 && mouseX < width && mouseY > 6 * height / 7 && mouseY < height) {
    calls(playerOne);
  }
}

function foldDisplay() {
  fill("blue");
  rect(5 * width / 7, 6 * height / 7, width / 7, height / 7);
  if (mouseIsPressed && mouseX > 5 * width / 7 && mouseX < 6 * width / 7 && mouseY > 6 * height / 7 && mouseY < height) {
    foldsTo(computerPlayer);
  }
}

function determineWinner(boardCardsArray, cardsArrayIndividual) {
  let sameCardCounter = 0;
  let playerFlushHighCard = 0;
  let pairTotal = 0;
  let pairNumber = 0;
  let tripsNumber = 0;
  let sameSuitCounter = 0;
  let cardsArrayTotal = structuredClone(boardCardsArray);

  for (let i = 0; i < 2; i ++) {
    cardsArrayTotal.push(cardsArrayIndividual[i]);
  }

  console.log("determining winner");

  for (let card of cardsArrayTotal) {
    for (let n = 0; n < cardsArrayTotal.length; n ++) {
      if (cardsArrayTotal[n].number === card.number) {
        sameCardCounter += 1;
      }
    }
    if (sameCardCounter === 4) {
      return [8, card.number];
    }
    if (sameCardCounter === 3) {
      tripsNumber = card.number;
    }
    if (sameCardCounter === 2) {
      if (!(pairTotal > 0 && card.number > pairNumber)) {
        pairNumber = card.number;
      }
      pairTotal += 1;
    }
  }
  if (sameCardCounter === 3) {
    if (pairTotal > 0) {
      return [7, tripsNumber];
    }
    else {
      trips = true;
    }
  }
  for (let i = 0; i < 4; i ++) {
    for (card of cardsArrayTotal) {
      if (card.suit === i) {
        sameSuitCounter += 1;
        if (sameSuitCounter > 4) {
          // if (cardsArrayIndividual.cards[0].suit === i && cardsArrayIndividual.cards[1].suit === i) {
          //   if (cardsArrayIndividual.cards[0].number > cardsArrayIndividual.cards[1].number) {
          //     playerFlushHighCard = cardsArrayIndividual.card[0].number;
          //   }
          //   else {
          //     playerFlushHighCard = cardsArrayIndividual.card[1].number;
          //   }
          // }
          // else if (cardsArrayIndividual.card[0].suit === i) {
          //   playerFlushHighCard = cardsArrayIndividual.card[0].number;
          // }
          // else if (cardsArrayIndividual.card[1].suit === i) {
          //   playerFlushHighCard = cardsArrayIndividual.card[1].number;
          // }
          // else {
          //   playerFlushHighCard = 0;
          // }
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

