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

// sets the display based on the currentMode
function modeDisplay() {

  // displays text showing which player won
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
  
  // displays logo and text indicating different modes
  else if (currentMode === "startScreen") {
    image(home, width / 2, height / 2, 3 * width / 5, 3 * width / 5);
    textSize(40);
    fill("red");
    text("Click To Start", width / 2, 50);
    text("This Side Basic", width / 7, height / 2);
    text("This Side Avalanch", 6 * width  / 7, height / 2);
  }

  // sets playingGame to true, which activates draw loop to draw grid and start game play
  else if (currentMode === "playGame") {
    playingGame = true;
  }
}

// shows the number of the current player playing on the cursor (one top, two bottom)
function cursorDisplay() {
  if (playerOnePlaying) {
    cursor("one.png");
  }
  else {
    cursor("two.png");
  }
}

// creates the grid with default amount of tiles in each location
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

// draws grid by adjusting x and y iterations to the scale factor
function drawGrid() {
  for (y = 0; y < rows; y ++) {
    for (x = 0; x < cols; x ++) {

      xPosition = scaleFactor + scaleFactor * x;
      yPosition = scaleFactor + scaleFactor * y;

      // fills according to position
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

// called when mouse pressed, activates various functions including calling tile movemement or switching currentMode
function mousePressed() {

  // if currentMode is startScreen, it will determine gameMode based on mouseX and change currentMode to playGame
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

  // if currentMode is winnerScreen, resets game and changes currentMode to playGame
  else if (currentMode === "winnerScreen") {
    createGrid();
    currentMode = "playGame";
  }

  // if currentMode is play game, checks if the location is on the grid of the player meant to be playing
  // if it is, calls tileMovement.
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

// determines the changes that need to be made to the grid based on which player is playing and the amount of tiles being moved
function tileMovement() {

  // sets initial perameters & checks that there are tiles in the selected grid
  doneChanging = false;
  gridChangeArray = [];
  if (grid[y][x] !== 0) {
    stoneCounter = grid[y][x];
    grid[y][x] = 0;
    gridChangeArray.push(0);
  
    // iterates through for every tile in square pressed, moving through x and y positions and adding values to gridChangeArray
    for (let i = 0; i < stoneCounter; i ++) {

      // instructions while on top
      if (y === 0) {

        // instructions while not on final square of top
        if (x !== 1) {
          x --;
          gridChangeArray.push(1);
        }

        // checks if tile landing in goal and gives extra turn, otherwise moves down to bottom row
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

      // instructions while on bottom row
      else {

        // if not at last square, moves forwards and push 1
        if (x !== cols - 2) {
          x ++;
          gridChangeArray.push(1);
        }

        // othewrise check if last square is in goal and gives extra turn if so, otherwise moving to top row and pushing 1
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

  // prepares changeGrid to be called
  gridChangesMade = true;
}

// slowly adds the changes made in tileMovement
function changeGrid() {
  sumTop = 0;
  sumBottom = 0;

  // only runs after 500 milliseconds have elapsed
  if (lastCounter + counterConstant < millis() && gridChangesMade) {
    lastCounter = millis();

    // adds 1 to grid location unless it is the opponents goal, otherwise cancels increase in affected tiles
    if (!(placeHolderX === 0 && !playerOnePlaying || placeHolderX === 7 && playerOnePlaying)) {
      grid[placeHolderY][placeHolderX] += gridChangeArray[totalTilesEffected];
    }
    else {
      totalTilesEffected --;
    }
    totalTilesEffected += 1;

    // if all changes made, resets values and calls tileMovement again if it is avalanch mode and it is in a candidate square with tiles
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

      // iterates through the grid to sum the top and bottom rows
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

      // if either row is empty adds all tiles to the goals and checks for a winner
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

    // otherswise moves placeHolderX and placeHolderY according to the current location
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
