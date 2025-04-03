// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cellSize;
let grid = [];
let rows = 2;
let cols = 8;
let playerOnePlaying = true;
let extraTurn = false;

let sumTop;
let sumBottom;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width > height) {
    cellSize = height / 10;
  }
  else {
    cellSize = width / 10;
  }
  createGrid();
  textAlign(CENTER);
}

function draw() {
  background(220);
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
      if (x === 0 || x === cols - 1) {
        if (y === 0) {
          fill("black");
          rect(x * cellSize, y * cellSize, cellSize, 2 * cellSize);
        }
      }
      else {
        fill("white");
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      fill("red");
      text(grid[y][x], x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);
  if (y === 0 && playerOnePlaying || y === 1 && !playerOnePlaying) {
    moveTiles("avalanch", x, y);
  }
}

function moveTiles(gameMode, x, y) {
  sumTop = 0;
  sumBottom = 0;
  let placeHolderX;
  let placeHolderY;

  if (gameMode === "basic") {
    stoneCounter = grid[y][x];
    grid[y][x] = 0;
    
    for (let i = 0; i < stoneCounter; i ++) {
      if (y === 0) {
        if (x !== 1) {
          placeHolderX = x;
          placeHolderY = y;
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

  else if (gameMode === "avalanch") {
    avalanchLoop(x, y);
  }
}

function avalanchLoop(x, y) {
  if (grid[y][x] !== 0) {
    stoneCounter = grid[y][x];
    grid[y][x] = 0;
  
    for (let i = 0; i < stoneCounter; i ++) {
      if (y === 0) {
        if (x !== 1) {
          placeHolderX = x;
          placeHolderY = y;
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
  }
}
