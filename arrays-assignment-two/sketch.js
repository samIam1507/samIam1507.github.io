// Simplified Poker
// Samuel Wardell
// 20 / 03 / 2025
//
// Extra for Experts:
// - The first element that I added beyond what we had learned in class (at least as far as I remember) was
// displaying only part of an image by adding extra perameters, which allowed me to show cards much easer. 
// I also looked into randomization and ordering, but based on what I saw there are accepted ways of doing it
// (such as fisher-yates shuffle) or sorting functions that I followed pretty directly, so I count that less
// as an extra that as a cool new skill. The final extra for experts was adding external media (sound, in this case)
// which including calling and changing elements such as volume

// define necessary arrays and board cards including deck, flop, board, players, turn, and river
let deckArray = [];
let flopArray = [];
let boardArray = [];
let playersArray = [];
let turn;
let river;

// define playerOne and computerPlayer as objects with the perameters cards, name, and stack
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

// define terms relating to betting, the nature of a bet, 
// or the confidence the computer feels in the strength of its hand
let confidence;
let points;
let meritPoints;
let playerScore;
let computerScore;
let allIn = false;
let computerBet = false;
let bluff;

// define elements which update or determine gameplay, including pot size and currentMode
let pot = 0;
let currentBet = 0;
let currentMode;
let counter = 0;
let manualFold = false;
let winner;

// miscellaneous perameters, including mouseDown and timing-related perameters
let mouseDown = false;
let timeGap = 10000;
let currentTime;

// defines perameters which will be used to record which portion of the card sheets whill be shown
let cardsSheetX;
let cardsSheetY;

// preloads images + audio to avoid lagging
function preload() {
  cardsSheet = loadImage("cards-sheet.png");
  cardsBackSheet = loadImage("cards-back-sheet.png");
  homeScreen = loadImage("home-screen.png");
  clickForRules = loadImage("click-for-rules.png");
  rules = loadImage("rules.png");
  raiseButton = loadImage("raise-button.png");
  checkButton = loadImage("check-button.png");
  foldButton = loadImage("fold-button.png");
  callButton = loadImage("call-button.png");
  raiseFive = loadImage("raise-five.png");
  raiseTen = loadImage("raise-ten.png");
  raiseTwenty = loadImage("raise-twenty.png");
  raiseFifty = loadImage("raise-fifty.png");
  chillTunes = createAudio("chill-tunes.mp3");
  shuffling = createAudio("shuffling.mp3");
}

// creates window, places all players in playerArray, plays chillTunes on loop, and sets the beginning mode
function setup() {
  chillTunes.loop();
  chillTunes.volume(0.5);
  imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  playersArray.push(playerOne);
  playersArray.push(computerPlayer);
  currentMode = "homeScreen";
}

// sets the background the calls modeFeatures, which regulates most gamePlay, as well as drawing all cards
function draw() {
  background(68, 189, 106);
  modeFeatures();
  if (currentMode !== "homeScreen" && currentMode !== "rules" && currentMode !== "winningScreen" && currentMode !== "showTheCards") {
    drawPlayerCards();
    drawBoard();
    hiddenComputerCards();
  }
  if (currentMode === "showTheCards") {
    drawPlayerCards();
    showComputerCards();
    drawBoard();
  }
}

// determines which functions will be called and actions undertaken according to the current mode
function modeFeatures() {

  // if mode is homeScreen, display logo and move to rules when clicked
  if (currentMode === "homeScreen") {
    image(homeScreen, width / 2, height / 2, 2 * height / 3, 2 * height / 3);
    image(clickForRules, width / 2, 3 * height / 4, height / 2, height / 2);

    // when mouse clicked, change mode to rules
    if (mouseDown) {
      mouseDown = false;
      currentMode = "rules";
    }
  }

  // if currentMode is rules, display the rules image and switch to dealTheCards when mouse is clicked
  if (currentMode === "rules") {
    image(rules, width / 2, height / 2, height, height);

    // when mouse clicked, change mode to dealTheCards
    if (mouseDown) {
      mouseDown = false;
      currentMode = "dealTheCards";
    }
  }

  // if the mode is dealTheCards, shuffling is played, the deck is created, delt, and logged. 
  // The mode is then set to 'betting' and necessary perameters are reset
  if (currentMode === "dealTheCards") {
    shuffling.play();
    createDeck();
    shuffleDeck();
    dealTheCards();
    console.log(deckArray);
    console.log(playerOne);
    console.log(computerPlayer);
    currentMode = "betting";
    counter = 0;
    boardArray = [];
    manualFold = false;

    // sets the initial pot (or buy-in) to be 1/20th the smaller of the two players stacks
    if (computerPlayer.stack > playerOne.stack) {
      currentBet = playerOne.stack / 20;
    }
    else {
      currentBet = computerPlayer.stack / 20;
    }

    // removes the buy-in from each player and adds it to the pot
    computerPlayer.stack -= currentBet;
    playerOne.stack -= currentBet;
    pot = 2 * currentBet;
    currentBet = 0;
  }

  // if the mode is 'betting', resets several perameters then calls for the computer then the player to make their bets
  if (currentMode === "betting") {
    mouseDown = false;
    console.log("this is the pot");
    console.log(pot);
    points = 0;
    computerBet = false;

    // if neither player is all in, calls for both players to make their bets. Otherwise, betting is skipped
    if (!allIn) {

      // if no board cards have been released yet, calls assessComputerHandStrength to set the points
      if (counter === 0) {
        assessComputerHandStrength();
      }

      // else sets the points to be points based on computers hand over 2 plus the result of determineWinner
      else {
        meritPoints = determineWinner(computerPlayer.cards)[0];
        // console.log(meritPoints + " merit points");
        assessComputerHandStrength();
        points = points / 2 + meritPoints;
        console.log("computer points");
        console.log(points);
      }

      // calls the function that actually dictates whether the computer makes a wager, then sets mode to 'playerBet'
      determineComputerBetting();
      currentMode = "playerBet";
    }

    // if allIn, sets mode to 'dealerAction'
    else {
      currentMode = "dealerAction";
    }
  }

  // if currentMode is 'playerBet', calls playerBetDecision, passing through a boolean of whether the computer made a bet
  if (currentMode === "playerBet") {
    playerBetDecision(computerBet);
  }

  // if currentMode is 'dealerAction', increase the counter and call the appropriate action - flop, turn, river, or payout
  // Also plays shuffling noise
  if (currentMode === "dealerAction"){
    shuffling.play();
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
  }

  // if currentMode is 'flop', deals the flop and sets mode to betting
  if (currentMode === "flop") {
    console.log("flop");
    dealFlop();
    currentMode = "betting";
  }

  // if currentMode is 'turn', deals the turn and sets mode to betting
  if (currentMode === "turn") {
    console.log("turn");
    dealTurn();
    currentMode = "betting";
  }

  // if currentMode is 'river', deals the river and sets mode to betting
  if (currentMode === "river") {
    console.log("river");
    dealRiver();
    currentMode = "betting";
  }

  // if the mode is payout, find the strenght of each players hands and pick a winner
  if (currentMode === "payout") {

    // find the strength of each players hand by calling determineWinner and passing their cards in
    console.log("payout");
    playerScore = determineWinner(playerOne.cards);
    playerHand = playerScore[2];
    computerScore = determineWinner(computerPlayer.cards);
    computerHand = computerScore[2];

    // if the principle (first) value returned into the playerScore / computerScore is greater than the others, call foldsTo that player
    if (playerScore[0] > computerScore[0]) {
      winner = "HUMANITY was victorious and won " + playerHand;
      foldsTo(playerOne);
    }
    else if (computerScore[0] > playerScore[0]) {
      winner = "The ROBOT was victorious and won " + computerHand;
      foldsTo(computerPlayer);
    }

    // if the second value returned into playerScore / computerScore is greater than that of the others, calls foldsTo that player
    else if (playerScore[1] > computerScore[1]) {
      winner = "HUMANITY was victorious and won " + playerHand;
      foldsTo(playerOne);
    }
    else if (computerPlayer[1] > playerOne[1]) {
      winner = "The ROBOT was victorious and won " + computerHand;
      foldsTo(computerPlayer);
    }

    // if both above values are tied, the player with the higher card in their hand is given the win
    else if (playerOne.cards[1].number > computerPlayer.cards[1].number) {
      winner = "HUMANITY was victorious and won " + playerHand;
      foldsTo(playerOne);
    }
    else if (computerPlayer.cards[1].number > playerOne.cards[0].number) {
      winner = "The ROBOT was victorious and won " + computerHand;
      foldsTo(computerPlayer);
    }

    // if all is equal, split the pot between the two players
    else {
      winner = "It was a tie " + playerHand;
      console.log("tie");
      playerOne.stack += pot / 2;
      computerPlayer.stack += pot / 2;
      pot = 0;
      currentMode = "showTheCards";
      currentTime = millis();
    }
  }

  // if currenMode is showTheCards, triggers draw loop to show all cards and waits 10 second before switching to winningScreen
  if (currentMode === "showTheCards") {
    if (currentTime + timeGap < millis()) {
      currentMode = "winningScreen";
    }
  }
  // displays the winning result, when screen clicked currentMode set to dealTheCards
  if (currentMode === "winningScreen") {
    textSize(60);
    text(winner, width / 10, height / 3, 4 * width / 5, height);

    // when mouse clicked currentMode set to dealTheCards
    if (mouseDown) {
      currentMode = "dealTheCards";
    }
  }

  // if currentMode is 'playerRaising', create a tile to allow the player to raise
  if (currentMode === "playerRaising") {
    raiseFiveDisplay();
    raiseTenDisplay();
    raiseTwentyDisplay();
    raiseFiftyDisplay();
  }
}

// creates the deck that will be used during the hand
function createDeck() {

  // resets the deckArray and defines a generic card
  deckArray = [];
  let card = {
    number: 0,
    suit: 0,
  };

  // iterates through card numbers and suits to create 52 unique cards (one deck)
  for (let cardNumber = 0; cardNumber < 13; cardNumber++) {

    for (let cardSuit = 0; cardSuit < 4; cardSuit ++) {
      cardNumber === 12 ? cardsSheetX = 0 : cardsSheetX = cardNumber + 1;
      card = {
        number: cardNumber,
        suit: cardSuit,
        sheetX: cardsSheetX * cardsSheet.width / 13,
        sheetY: cardSuit * cardsSheet.height / 4,
      };

      deckArray.push(card);
    }
  }
}

// randomizes the deck using the fisher-yates shuffle
function shuffleDeck() {

  for (let i = deckArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = deckArray[i];
    deckArray[i] = deckArray[j];
    deckArray[j] = swap;
  }
}

// resets each players cards then deals them 2 cards from the deckArray
function dealTheCards() {
  playerOne.cards = [];
  computerPlayer.cards = [];
  deckArray.pop();

  for (let i = 0; i < 2; i ++) {
    playerOne.cards.push(deckArray.pop());
    computerPlayer.cards.push(deckArray.pop());
  }
}

// adds three cards to the flop and deck arrays
function dealFlop() {
  deckArray.pop();

  for (let i = 0; i < 3; i++) {
    let newCard = deckArray.pop();
    flopArray.push(newCard);
    boardArray.push(newCard);
  }
}

// adds a card to the turn and the deck array
function dealTurn() {
  deckArray.pop();
  let newCard = deckArray.pop();
  turn = newCard;
  boardArray.push(newCard);
}

// adds a card to the river and deck array
function dealRiver() {
  deckArray.pop();
  let newCard = deckArray.pop();
  river = newCard;
  boardArray.push(newCard);
}

// determines the relative strength of the cards that the computer is dealt, expressed as a point value
function assessComputerHandStrength() {

  // defines cards and resets points
  points = 0;
  let cardA = computerPlayer.cards[0].number;
  let cardB = computerPlayer.cards[1].number;
  let cardASuit = computerPlayer.cards[0].suit;
  let cardBSuit = computerPlayer.cards[1].suit;

  // adds points for scenarios where at least one card is above an 8 (above the playing card 10)
  if (cardA > 8 || cardB > 8) {

    if (cardA === cardB) {
      points += 3;
    }
    else if (cardA > 10 && cardB > 10) {
      points += 2;
    }
    else {
      points += 1;
    }
  }

  // adds points for scenarios where at least one of the cards is a 12 (an ace)
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

  // adds points for cases where the cards are within 2 of each other
  if (Math.abs(cardA - cardB) < 3) {

    if (cardA === cardB) {
      points += 2;
    }
    else {
      points += 1;
    }
  }

  // adds points for cases where the cards are of the same suit
  if (cardASuit === cardBSuit) {
    points += 2;
  }
}

// decides the range of bets, calls, and folds that the computer will make based on the strength of its hand
function determineComputerBetting() {

  // sets the confidence to a random value that is +-3 of the points (actual hand strength) and assigns a random bluff value
  confidence = random(Math.abs(points - 3), Math.abs(points + 3));
  bluff = random(100);

  // assigns bets with higher value ranges for higher confidence cases or in the case of a bluff
  if (confidence > 7) {
    betComputerPlayer(random(3, 5));
  }
  else if (confidence > 4) {
    betComputerPlayer(random(0.5, 2));
  }
  else {

    if (bluff > 85) {
      betComputerPlayer(random(2, 6));
    }
  }
}

// calls the function that show the call, fold, check, and raise options depending on the actions of the computer
function playerBetDecision(computerRaised) {

  if (computerRaised) {
    callDisplay();
    foldDisplay();
  }
  else {
    checkDisplay();
    raiseOptionDisplay();
  }
}

// the player passed calls the current bet
function calls(player) {
  player.stack -= currentBet;
  pot += 2 * currentBet;
  currentBet = 0;
  currentMode = "dealerAction";
}

// the pot is given to the player passed in and the currentMode is set to 'winningScreen'
function foldsTo(player) {
  pot += currentBet;
  console.log(pot);
  player.stack += pot;
  console.log(player.stack + " stack of winner (after fold)");
  console.log(player);
  currentMode = "showTheCards";
  currentTime = millis();
}

// makes the bet if playerOne decides to bet, and determines the computers response
function betPlayerOne(betValue) {
  
  // sets the bet based on the input value and the players current stack, 
  // and assigns a randomized bluff and confidence level to the computer
  currentBet = playerOne.stack / Math.floor(20 / betValue);
  console.log("player one bets" + currentBet);
  playerOne.stack -= currentBet;
  bluff = random(100);
  confidence = random(points - 2, points + 2);

  // if the confidence is higher than bet / 10 or if the bluff factor is over 80, 
  // the computer calls and moves to next mode. Otherwise, it folds
  if (confidence > currentBet / 10 || bluff > 80) {
    calls(computerPlayer);

    if (counter === 4) {
      currentMode = "payout";
    }
    else {
      currentMode = "dealerAction";
    }
  }
  else {
    winner = "the ROBOT folded to HUMANITY and HUMANITY won ";
    foldsTo(playerOne);
  }
}

// makes the bet for the computerPlayer based on the inputed betValue and the computers stack size
function betComputerPlayer(betValue) {
  console.log(betValue);
  currentBet = betValue * computerPlayer.stack / 20;
  console.log(currentBet);
  computerPlayer.stack -= currentBet;
  currentMode = "playerBet";
  computerBet = true;
}

// displays the check option and moves on to dealerAction if it is pressed
function checkDisplay() {
  fill("black");
  image(checkButton, 4 * width / 5, 3 * height / 5, width / 5, 2 * width / 25);

  // if mouseDown set to true and the mouse is in the correct location, sets mode to dealerAction
  if (mouseDown && mouseX > 7 * width / 10 && mouseX < 9 * width / 10 && mouseY > 3 * height / 5 - width / 25&& mouseY < 3 * height / 5 + width / 25) {
    mouseDown = false;
    currentMode = "dealerAction";
    console.log("check");
  }
}

// displays the raise option, setting mode to playerBetting if pressed
function raiseOptionDisplay() {
  fill("red");
  image(raiseButton, 4 * width / 5, 2 * height / 5, width / 5, 2 * width / 25);

  // if mouseDown and mouse in correct location, prepares to make a bet
  if (mouseDown && mouseX > 7 * width / 10 && mouseX < 9 * width / 10 && mouseY > 2 * height / 5 - width / 25 && mouseY < 2 * height / 5 + width / 25) {
    mouseDown = false;

    // if the players stack is larger than the current bet, manually calls the current bet. Otherwise goes all in
    if (playerOne.stack >= currentBet) {
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

// displays the call option, and calls if clicked
function callDisplay() {
  fill("yellow");
  image(callButton, 4 * width / 5, 2 * height / 5, width / 5, 2 * width / 25);

  // if mouseDown and in correct location, playerOne calls
  if (mouseDown && mouseX > 7 * width / 10 && mouseX < 9 * width / 10 && mouseY > 2 * height / 5 - width / 25 && mouseY < 2 * height / 5 + width / 25) {
    mouseDown = false;
    calls(playerOne);
  }
}

// displays the fold option, foldsTo other player if called
function foldDisplay() {
  fill("blue");
  image(foldButton, 4 * width / 5, 3 * height / 5, width / 5, 2 * width / 25);

  // if mouseDown and in correct location, playerOne folds
  if (mouseDown && mouseX > 7 * width / 10 && mouseX < 9 * width / 10 && mouseY > 3 * height / 5 - width / 25&& mouseY < 3 * height / 5 + width / 25) {
    mouseDown = false;
    winner = "HUMANITY folded to the ROBOT and the ROBOT won ";
    foldsTo(computerPlayer);
  }
}

// displays the raise 5% option
function raiseFiveDisplay() {
  fill("black");
  image(raiseFive, 4 * width / 5, height / 5, width / 5, 2 * width / 25);

  // if mouseDown set to true and the mouse is in the correct location, calls betPlayerOne and raises by 5 percent
  if (mouseDown && mouseX > 7 * width / 10 && mouseX < 9 * width / 10 && mouseY > height / 5 - width / 25&& mouseY < height / 5 + width / 25) {
    mouseDown = false;
    betPlayerOne(1);
  }
}

// displays the raise 10% option
function raiseTenDisplay() {
  fill("red");
  image(raiseTen, 4 * width / 5, 2 * height / 5, width / 5, 2 * width / 25);

  // if mouseDown and mouse in correct location, calls betPlayerOne and raises by 10 percent
  if (mouseDown && mouseX > 7 * width / 10 && mouseX < 9 * width / 10 && mouseY > 2 * height / 5 - width / 25 && mouseY < 2 * height / 5 + width / 25) {
    mouseDown = false;
    betPlayerOne(2);
  }
}

// displays the raise 20% option
function raiseTwentyDisplay() {
  fill("blue");
  image(raiseTwenty, 4 * width / 5, 3 * height / 5, width / 5, 2 * width / 25);

  // if mouseDown and in correct location, calls betPlayerOne and raises by 20 percent
  if (mouseDown && mouseX > 7 * width / 10 && mouseX < 9 * width / 10 && mouseY > 3 * height / 5 - width / 25&& mouseY < 3 * height / 5 + width / 25) {
    mouseDown = false;
    betPlayerOne(4);
  }
}

// displays the raise 50% option
function raiseFiftyDisplay() {
  fill("yellow");
  image(raiseFifty, 4 * width / 5, 4 * height / 5, width / 5, 2 * width / 25);

  // if mouseDown and in correct location, calls betPlayerOne and raises by 50 percent
  if (mouseDown && mouseX > 7 * width / 10 && mouseX < 9 * width / 10 && mouseY > 4 * height / 5 - width / 25 && mouseY < 4 * height / 5 + width / 25) {
    mouseDown = false;
    betPlayerOne(10);
  }
}

// determines the current score of the player passed in in the form of an array, with the first number representing
// the hand the player has, and the second the value of the high/relevant card for tiebreak purposes
function determineWinner(cardsArrayIndividual) {

  // defines a series of necessary variables which allow for the recording of hand strength info
  let sameCardCounter = 0;
  let playerFlushHighCard = 0;
  let pairTotal = 0;
  let pairNumber = 0;
  let tripsNumber = -1;
  let sameSuitCounter = 0;
  let cardsArrayTotal = structuredClone(boardArray);
  let trips = false;

  // adds the cards of the player passed in to the cardsArrayTotal to allow the full hand strength to be determined
  for (let i = 0; i < 2; i ++) {
    cardsArrayTotal.push(cardsArrayIndividual[i]);
  }

  // sorts the cards (did some research to find this sorting mechanism, its cool but not mine)
  cardsArrayTotal.sort((a, b) => a.number - b.number);
  cardsArrayIndividual.sort((a, b) => a.number - b.number);
  console.log("this is the cards array total");
  console.log(cardsArrayTotal);
  console.log("determining winner");

  // iterates through the cards and records pairs, trips, and quads
  for (let card of cardsArrayTotal) {
    sameCardCounter = 0;

    // for every card, all other cards are compared agains it to see if they are the same number. If so, 
    // sameCardCounter is increased
    for (let n = 0; n < cardsArrayTotal.length; n ++) {

      if (cardsArrayTotal[n].number === card.number) {
        sameCardCounter += 1;
      }
    }

    // if 4 of a kind present, returns 8 (best possible hand type) and the card value of the quads
    if (sameCardCounter === 4) {
      console.log("quads");
      return [8, card.number, "with quads"];
    }

    // if three of a kind is present, records the cardNumber and sets trips to be true
    if (sameCardCounter === 3) {
      tripsNumber = card.number;
      trips = true;
    }

    // if a pair is present, sets the highest pair to be pairNumber and increases pairTotal by one
    if (sameCardCounter === 2) {
      if (pairTotal === 0 || card.number > pairNumber) {
        pairNumber = card.number;
      }
      pairTotal += 1;
    }
  }

  // devides pairTotal by 2 because each pair is duplicated once the other pair card is iterated through
  pairTotal = pairTotal / 2;

  // if trips is true and there is at least one pair, returns 7 (second best hand type) and the trips card number
  if (trips && pairTotal > 0) {
    console.log("full house");
    return [7, tripsNumber, "with a full house"];
  }

  // iterates through suits
  for (let i = 0; i < 4; i ++) {
    sameSuitCounter = 0;

    // iterates through cards
    for (card of cardsArrayTotal) {

      // if the current card's suit is the current suit being checked, increase the sameSuitCounter by one
      if (card.suit === i) {
        sameSuitCounter += 1;

        // if sameSuitCounter reaches 5 there is a flush, and different return values are checked
        if (sameSuitCounter > 4) {

          // if either of the players cards are of the suit of the flush returns 6 (3rd best hand)
          // plus the higher sameSuit player card, else returns 6 and 0
          if (cardsArrayIndividual.card[1].suit === i) {
            playerFlushHighCard = cardsArrayIndividual.card[1].number;
          }
          else if (cardsArrayIndividual.card[0].suit === i) {
            playerFlushHighCard = cardsArrayIndividual.card[0].number;
          }
          else {
            playerFlushHighCard = 0;
          }

          console.log("flush");
          return [6, playerFlushHighCard, "with a flush"];
        }
      }
    }
  }

  // if the counter is at 4, meaning full board is delt, checks if there is a straight
  if (counter === 4) {

    // iterates through the first three cards to see if there is a series of 5 successive cards
    for (i = 0; i < 3; i ++) {

      // checks if cards are successive and returns 5 (4th best hand) plus the straights highest card if so
      if (cardsArrayTotal[i].number === cardsArrayTotal[i + 1].number - 1 &&
         cardsArrayTotal[i].number === cardsArrayTotal[i + 2].number - 2 &&
         cardsArrayTotal[i].number === cardsArrayTotal[i + 3].number - 3 &&
         cardsArrayTotal[i].number === cardsArrayTotal[i + 4].number - 4) {
        console.log("straight");
        return [5, cardsArrayTotal[i + 4].number, "with a straigh"];
      }
    }
  }

  // returns 4 (5th best hand) and the tripsNumber if trips is true
  if (trips) {
    console.log("trips");
    return [4, tripsNumber, "with trips"];
  }

  // if there is more than one pair, returns 3 (6th best hand) and the pairNumber
  else if (pairTotal > 1) {
    console.log("two pair");
    return [3, pairNumber, "with 2 pair"];
  }

  // if there is a pair, returns 2 (2nd worst hand) and the pairNumber
  else if (pairTotal === 1) {
    console.log("one pair");
    return [2, pairNumber, "with 1 pair"];
  }

  // else returns 1 (worst hand) and the players high card
  else {
    console.log("high card");
    return [1, cardsArrayIndividual[1].number, "with high card"];
  }
}

// calls once when mousePressed, sets mouseDown to true
function mousePressed() {
  mouseDown = true;
}

// calls once when mouseReleased, set mouseDown to false
function mouseReleased() {
  mouseDown = false;
}

// draws the players cards in front of them (taken from the cardSheet image based on location assigned earlier)
function drawPlayerCards() {

  for (let i = 0; i < 2; i ++) {
    image(cardsSheet, width / 2 - 160 + 70 * i, 8 * height / 9 - 50, 90, 120, playerOne.cards[i].sheetX, playerOne.cards[i].sheetY, cardsSheet.width / 13, cardsSheet.height / 4, CONTAIN);
  }
}

// draws the board cards as they are added
function drawBoard() {

  if (counter > 0) {
    for (let i = 0; i < boardArray.length; i ++) {
      image(cardsSheet, width / 5 + 80 * i, height / 2, 100, 120, boardArray[i].sheetX, boardArray[i].sheetY, cardsSheet.width / 13, cardsSheet.height / 4, CONTAIN);
    }
  }
}

// draws the computer cards faceup - only for use in demo's or after betting is over
function showComputerCards() {

  for (let i = 0; i < 2; i ++) {
    image(cardsSheet, width / 2 - 160 + 70 * i, height / 6, 100, 120, computerPlayer.cards[i].sheetX, computerPlayer.cards[i].sheetY, cardsSheet.width / 13, cardsSheet.height / 4, CONTAIN);
  }
}

// draws computer cards facedown - for use during hand
function hiddenComputerCards() {
  
  for (let i = 0; i < 2; i ++) {
    image(cardsBackSheet, width / 2 - 160 + 70 * i, height / 6, 100, 120, 0, 0, cardsBackSheet.width / 4, cardsSheet.height, CONTAIN);
  }
}
