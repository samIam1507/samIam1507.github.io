// 2D Array Grid Demo

// let grid = [[0, 1, 1, 0], 
//             [1, 1, 0, 0], 
//             [0, 0, 1, 1],
//             [0, 1, 0, 0]];

// const CELL_SIZE = height / 4;
let cellSize;
const SQUARE_DIMENSIONS = 20;
let grid;

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
}

function displayGrid() {
  for (let y = 0; y < SQUARE_DIMENSIONS; y ++) {
    for (let x = 0; x < SQUARE_DIMENSIONS; x ++) {
      if (grid[y][x] === 0) {
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
      newGrid[y].push(0);
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
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
      }
    }
  }
  return newGrid;
}