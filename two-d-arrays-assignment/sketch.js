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
let lastCounter;
let counterConstant = 500;
let stoneCounter;
let callMovement = false;

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
  callTileMovement();
}

function callTileMovement() {
  if (lastCounter - counterConstant> millis() && stonesMovedCounter < stoneCounter) {
    stonesMovedCounter += 1;
    lastCounter = millis();
    tileMovement();
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

function mousePressed() {
  if (!callMovement) {
    y = Math.floor(mouseY / scaleFactor) - 1;
    x = Math.floor(mouseX / scaleFactor) - 1;
    stonesMovedCounter = 0;
    stoneCounter = grid[y][x];
    grid[y][x] = 0;
  
    if ((y === 0 && playerOnePlaying || y === 1 && !playerOnePlaying) && x > 0 && x < 8) {
      callMovement = true;
    }
  }
}

function tileMovement() {
  if (y === 0) {
    if (x !== 1) {
      x --;
      grid[y][x] ++;
    }
    else {
      if (stonesMovedCounter + 1 === stoneCounter) {
        extraTurn = true;
      }
      else {
        y = 1;
        x = 1;
        grid[y][x] ++;
      }
      if (playerOnePlaying) {
        grid[0][0] += 1;
        stonesMovedCounter ++;
      }
    }
  }
  else {
    if (x !== cols - 2) {
      x ++;
      grid[y][x] ++;
    }
    else {
      if (stonesMovedCounter + 1 === stoneCounter) {
        extraTurn = true;
      }
      else {
        y = 0;
        x = cols - 2;
        grid[y][x] ++;
      }
      if (!playerOnePlaying) {
        grid[1][cols - 1] += 1;
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
