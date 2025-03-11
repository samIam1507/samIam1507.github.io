// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let tileAmountX = 50;
let tileAmountY = 50;
let theTile = {
};
let choice;
let bombLocationsArray = [];
let safeLocationPlaceholder = [];
let safeLocationArray = [];
let listClone;

function setup() {
  createCanvas(windowWidth, windowHeight);
  createSquares();
  isBombTouching();
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
      else {
        theList = {
          isBomb: false,
          squareX: x,
          squareY: y,
          bombsTouching: 0,
        };
        listClone = structuredClone(theList);
        safeLocationPlaceholder.push(listClone);
      }
    }
  }
  console.log(safeLocationPlaceholder);
}


// function isBombTouching() {
//   for (let i = safeLocationPlaceholder.length; i > 0; i--) {
//     safeSquare = safeLocationPlaceholder[i];
//     for (let bombSquare of bombLocationsArray) {
//       if (Math.abs(safeSquare.squareX - bombSquare.squareX) <= 50 && Math.abs(safeSquare.squareY - bombSquare.squareY) <= 50) {
//         bombSquare.bombsTouching ++;
//       }
//     }
//     safeLocationArray.push(bombSquare);
//   }
//   console.log(safeLocationArray);
// }

// note to future sam - iterate all with x change perameters to see if toucing then chekc if there is a bomb to determine number_touching

