// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let numberOfClicks = 0;
let highScore = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (getItem("highClick")) {
    highScore = getItem("highClick");
  }
}

function draw() {
  background(220);
  displayClicks();
  displayHighest();
}

function displayClicks() {
  fill("black");
  textSize(50);
  textAlign(CENTER, CENTER);
  text(numberOfClicks, width / 2, height / 2);
}

function displayHighest() {
  fill("green");
  textSize(50);
  textAlign(CENTER, CENTER);
  text(highScore, width / 2, height / 2 - 200);
}

function mousePressed() {
  numberOfClicks ++;
  if (numberOfClicks > highScore) {
    highScore = numberOfClicks;
    storeItem("highClick", highScore);
  }
}
