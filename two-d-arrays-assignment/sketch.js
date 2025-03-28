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
let whoseTurn = 0;


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

  stoneCounter = grid[y][x];
  grid[y][x] = 0;

  for (let i = 0; i < stoneCounter; i ++) {
    if (y === 0) {
      if (x !== 1) {
        x --;
        grid[y][x] ++;
      }
      else {
        if (whoseTurn === x) {
          i ++;
          grid[y][x] += 1;
        }
        if (i !== stoneCounter - 1) {
          y = 0;
          grid[y][x] ++;
        }
      }
    }
    else {
      if (x !== cols - 2) {
        x ++;
        grid[y][x] ++;
      }
      else {
        if (whoseTurn === x) {
          i ++;
          grid[y][x] += 1;
        }
        if (i !== stoneCounter - 1) {
          y = 0;
          grid[y][x] ++;
        }
      }
    }
  }
}
