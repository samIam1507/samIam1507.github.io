// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let tileAmountX = 10;
let tileAmountY = 10;
let theTile = {
};
let choice;
let bombLocationsArray = [];
let listClone;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function createSquares() {
  for (let x = 0; x < width; x += width / tileAmountX) {
    for (let y = 0; y < height; y += height / tileAmountY) {
      choice = random(100);
      if (choice < 25) {
        theList = {
          isBomb: true,
          squareX: x,
          squareY: y,
          bombsTouching: 0,
        };
        listClone = structuredClone(theList);
        bombLocationsArray.push(listClone);
      }
    }
  }
}

// note to future sam - iterate all with x change perameters to see if toucing then chekc if there is a bomb to determine number_touching

