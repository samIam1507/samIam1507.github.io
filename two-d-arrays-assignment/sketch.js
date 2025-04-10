// 2D Arrays Project - Mancala Game
// Samuel Wardell
// April 10th, 2025
//
// Extra for Experts:
// - The specific element of code that I experimented was cursor change, which i thing will be very useful for my 
//   majpr project. Assigning it different images is a bridge towards assigning different tools/elements that include
//   more significant functions which impact use. More broadly, the use of delayed grid placement, though it does not
//   use any code we did not have access to, was an interesting problem and I feel it significantly improves gameplay.

// define necesseties for creating grid including cols, rows, and grid
let grid = [];
let rows = 2;
let cols = 8;
let x; 
let y;

// define inital characteristics such as gameMode and currentMode
let playerOnePlaying = true;
let extraTurn = false;
let gameMode = "avalanch";
let currentMode = "startScreen";

// define variables used in drawing and changing grids
let stonesMovedCounter;
let gridChangesMade;
let mouseJustPressed = false;
let sumTop;
let sumBottom;
let xPosition;
let yPosition;
let stoneCounter;
let gridChangeArray = [];
let placeHolderX;
let placeHolderY;
let totalTilesEffected = 0;
let doneChanging = true;

// define variables used for general scale and timing
let scaleFactor;
let lastCounter = 0;
let counterConstant = 500;

// define image variables
let one;
let two;
let home;

// define winner variables
let topWinner = false;
let bottomWinner = false;

// preload images
function preload() {
  one = loadImage("one.png");
  two = loadImage("two.png");
  home = loadImage("home.png");
}

// setup canvas and set image and txt characteristics
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  imageMode(CENTER);
  textAlign(CENTER);
  scaleFactor = width / 10;
}

// run every frame, calling all necessary functions
function draw() {

  // set background and display
  background(23, 93, 160);
  modeDisplay();

  // draw grid, change grid, and display current player using cursor
  if (currentMode === "playGame") {
    drawGrid();
    if (gridChangesMade) {
      changeGrid();
    }
    cursorDisplay();
  }
}

// sets the 
function modeDisplay() {
  if (currentMode === "winnerScreen") {
    if (topWinner) {
      text("Player One Has Won", width / 3, height / 2);
    }
    else if (bottomWinner) {
      text("Player Two Has Won", width / 3, height / 2);
    }
    else {
      text("It Was A Tie", width / 3, height / 2);
    }
  }
  else if (currentMode === "startScreen") {
    image(home, width / 2, height / 2, 3 * width / 5, 3 * width / 5);
    textSize(40);
    fill("red");
    text("Click To Start", width / 2, 50);
    text("This Side Basic", width / 7, height / 2);
    text("This Side Avalanch", 6 * width  / 7, height / 2);
  }
  else if (currentMode === "playGame") {
    playingGame = true;
  }
}

function cursorDisplay() {
  if (playerOnePlaying) {
    cursor("one.png");
  }
  else {
    cursor("two.png");
  }
}

function createGrid() {
  grid = [];
  for (y = 0; y < rows; y ++) {
    grid.push([]);
    for (x = 0; x < cols; x ++) {
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
  for (y = 0; y < rows; y ++) {
    for (x = 0; x < cols; x ++) {

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
  if (currentMode === "startScreen") {
    createGrid();
    currentMode = "playGame";
    if (mouseX < width / 2) {
      gameMode = "basic";
    }
    else {
      gameMode = "avalanch";
    }
  }
  else if (currentMode === "winnerScreen") {
    createGrid();
    currentMode = "playGame";
  }
  else if (currentMode === "playGame") {
    if (doneChanging) {
      y = Math.floor(mouseY / scaleFactor) - 1;
      x = Math.floor(mouseX / scaleFactor) - 1;
      placeHolderX = x;
      placeHolderY = y;
      lastCounter = millis();
      
      if ((y === 0 && playerOnePlaying || y === 1 && !playerOnePlaying) && x > 0 && x < 8) {
        tileMovement();
      }
    }
  }
}

function tileMovement() {
  doneChanging = false;
  gridChangeArray = [];
  if (grid[y][x] !== 0) {
    stoneCounter = grid[y][x];
    grid[y][x] = 0;
    gridChangeArray.push(0);
  
    for (let i = 0; i < stoneCounter; i ++) {
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
        }
      }
    }
  }
  
  for (let z = 1; z < 7; z ++) {
    sumTop += grid[0][z];
    sumBottom += grid[1][z];
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

  gridChangesMade = true;
}

function changeGrid() {
  sumTop = 0;
  sumBottom = 0;
  if (lastCounter + counterConstant < millis() && gridChangesMade) {
    lastCounter = millis();
    if (!(placeHolderX === 0 && !playerOnePlaying || placeHolderX === 7 && playerOnePlaying)) {
      grid[placeHolderY][placeHolderX] += gridChangeArray[totalTilesEffected];
    }
    else {
      totalTilesEffected --;
    }
    totalTilesEffected += 1;
    if (totalTilesEffected === gridChangeArray.length) {
      gridChangesMade = false;
      totalTilesEffected = 0;
      doneChanging = true;
      if (gameMode === "avalanch" && grid[placeHolderY][placeHolderX] > 1 && placeHolderX > 0 && placeHolderX < 7) {
        x = placeHolderX;
        y = placeHolderY;
        tileMovement();
      }
      else if (!(placeHolderX === 0 && playerOnePlaying || placeHolderX === 7 && !playerOnePlaying)) {
        playerOnePlaying = !playerOnePlaying;
      }
      for (let iy = 0; iy < 2; iy ++) {
        for (let ix = 1; ix < 7; ix ++) {
          if (iy === 0) {
            sumTop += grid[iy][ix];
          }
          else {
            sumBottom += grid[iy][ix];
          }
        }
      }
      if (sumBottom === 0 || sumTop === 0) {
        grid[0][0] += sumTop;
        grid[1][7] += sumBottom;
        if (sumTop > sumBottom) {
          topWinner = true;
        }
        else if (sumBottom > sumTop) {
          bottomWinner = true;
        }
        currentMode = "winnerScreen";
      }
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
      else if (placeHolderY === 1) {
        placeHolderX ++;
      }
      else {
        placeHolderX --;
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
