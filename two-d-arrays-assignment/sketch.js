// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [];
let rows = 2;
let cols = 8;
let playerOnePlaying = true;
let extraTurn = false;
let invalidSize = false;
let gameMode = "avalanch";
let x; 
let y;
let stonesMovedCounter;

let sumTop;
let sumBottom;
let scaleFactor;
let xPosition;
let yPosition;
let lastCounter = 0;
let counterConstant = 500;
let stoneCounter;
let callMovement = false;
let gridChangeArray = [];
let placeHolderX;
let placeHolderY;
let totalTilesEffected = 0;
let changesBeenMade = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  createGrid();
  textAlign(CENTER);
  textSize(20);
  noStroke();

  scaleFactor = width / 10;
}

function draw() {
  background(70, 150, 100);
  drawGrid();
}

function createGrid() {
  for (let y = 0; y < rows; y ++) {
    grid.push([]);
    for (let x = 0; x < cols; x ++) {
      if (x === 0 || x === cols - 1) {
        grid[y].push(0);
      }
      else {
        grid[y].push(4);
      }
    }
  }
}

function drawGrid() {
  for (let y = 0; y < rows; y ++) {
    for (let x = 0; x < cols; x ++) {

      xPosition = scaleFactor + scaleFactor * x;
      yPosition = scaleFactor + scaleFactor * y;

      if (x === 0 || x === cols - 1) {
        if (y === 0) {
          fill("black");
          rect(xPosition, yPosition, scaleFactor, 2 * scaleFactor);
        }
      }
      else {
        fill("white");
        rect(xPosition, yPosition, scaleFactor, scaleFactor);
      }
      fill("red");
      text(grid[y][x], xPosition, yPosition  + scaleFactor / 2, scaleFactor, scaleFactor);
    }
  }
}

function mouseReleased() {
  y = Math.floor(mouseY / scaleFactor) - 1;
  x = Math.floor(mouseX / scaleFactor) - 1;
  placeHolderX = x;
  placeHolderY = y;
  gridChangeArray = [];
  
  if ((y === 0 && playerOnePlaying || y === 1 && !playerOnePlaying) && x > 0 && x < 8) {
    tileMovement();
  }
}

function tileMovement() {
  if (grid[y][x] !== 0) {
    stoneCounter = grid[y][x];
    grid[y][x] = 0;
    gridChangeArray.push(0);
  
    for (let i = 0; i < stoneCounter; i ++) {
      console.log("hi");
      if (y === 0) {
        if (x !== 1) {
          x --;
          gridChangeArray.push(1);
        }
        else {
          if (i + 1 === stoneCounter && playerOnePlaying) {
            extraTurn = true;
          }
          else {
            y = 1;
            x = 1;
            gridChangeArray.push(1);
          }
          if (playerOnePlaying) {
            gridChangeArray.push(1);
            i ++;
          }
          else {
            gridChangeArray.push(0);
          }
        }
      }
      else {
        if (x !== cols - 2) {
          x ++;
          gridChangeArray.push(1);
        }
        else {
          if (i + 1 === stoneCounter && !playerOnePlaying) {
            extraTurn = true;
          }
          else {
            y = 0;
            x = cols - 2;
            gridChangeArray.push(1);
          }
          if (!playerOnePlaying) {
            i ++;
            gridChangeArray.push(1);
          }
          else {
            gridChangeArray.push(0);
          }
        }
      }
    }
  }
  
  for (let ix = 1; ix < 7; ix ++) {
    sumTop += grid[0][ix];
    sumBottom += grid[1][ix];
  }
  if (sumBottom === 0 || sumTop === 0) {
    grid[0][0] += sumTop;
    grid[1][cols - 1] += sumBottom;
    for (let n = 0; n < 2; n ++) {
      for (let j = 1; j < 7; j ++) {
        grid[n][j] = 0;
      }
    }
      
  }

  if (!extraTurn) {
    playerOnePlaying = !playerOnePlaying;
  }
  extraTurn = false;

  gridChangesMade = true;
}

function changeGrid() {
  if (lastCounter - counterConstant > millis() && gridChangesMade) {
    grid[placeHolderX][placeHolderY] += gridChangeArray[totalTilesEffected];
    totalTilesEffected += 1;
    if (totalTilesEffected - 1 === gridChangeArray.length) {
      gridChangesMade = false;
    }
    else {
      if (placeHolderX === 0) {
        placeHolderX = 1;
        placeHolderY = 1;
      }
      else if (placeHolderX === 7) {
        placeHolderX = 6;
        placeHolderY = 0;
      }
      else {
        placeHolderX += 1;
      }
    }
  }
}

function avalanchLoop(x, y) {
  if (grid[y][x] !== 0) {
    stoneCounter = grid[y][x];
    grid[y][x] = 0;
  
    for (let i = 0; i < stoneCounter; i ++) {
      if (y === 0) {
        if (x !== 1) {
          x --;
          grid[y][x] ++;
        }
        else {
          if (i + 1 === stoneCounter) {
            extraTurn = true;
          }
          else {
            y = 1;
            x = 1;
            grid[y][x] ++;
          }
          if (playerOnePlaying) {
            grid[0][0] += 1;
            i ++;
          }
        }
      }
      else {
        if (x !== cols - 2) {
          x ++;
          grid[y][x] ++;
        }
        else {
          if (i + 1 === stoneCounter) {
            extraTurn = true;
          }
          else {
            y = 0;
            x = cols - 2;
            grid[y][x] ++;
          }
          if (!playerOnePlaying) {
            i ++;
            grid[1][cols - 1] += 1;
          }
        }
      }
    }
    if (grid[y][x] > 1 && x !== 0 && x !== 7) {
      avalanchLoop(x, y);
    }
  }
}
