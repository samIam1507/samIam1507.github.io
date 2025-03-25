// Game of Life Demo

let cellSize;
const SQUARE_DIMENSIONS = 20;
let grid;
let mouseDown = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateRandomGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
  if (height > width) {
    cellSize = width / SQUARE_DIMENSIONS;
  }
  else {
    cellSize = height / SQUARE_DIMENSIONS;
  }
}

function draw() {
  background(220);
  displayGrid();
}
function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
  }
  else if (key === "e") {
    grid = generateGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
  }
}

function displayGrid() {
  for (let y = 0; y < SQUARE_DIMENSIONS; y ++) {
    for (let x = 0; x < SQUARE_DIMENSIONS; x ++) {
      if (grid[y][x]) {
        fill("white");
      }
      else {
        fill("black");
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function generateGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y ++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x ++) {
      newGrid[y].push(true);
    }
  }
  return newGrid;
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y ++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x ++) {
      if (random(100) < 50) {
        newGrid[y].push(true);
      }
      else {
        newGrid[y].push(false);
      }
    }
  }
  return newGrid;
}

function toggle(x, y) {
  if (x >= 0 && x < SQUARE_DIMENSIONS && y >= 0 && y < SQUARE_DIMENSIONS) {
    grid[y][x] = !grid[y][x];
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);
  
  toggle(x, y);
  toggle(x + 1, y);
  toggle(x, y + 1);
  toggle(x - 1, y);
  toggle(x, y - 1);
}
