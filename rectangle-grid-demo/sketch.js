// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELL_SIZE = 200;
let heightFactor;
let widthFactor;
let grid = [[]];


function setup() {
  createCanvas(windowWidth, windowHeight);
  heightFactor = Math.floor(height / CELL_SIZE);
  widthFactor = Math.floor(width / CELL_SIZE);
  grid = generateGrid(widthFactor, heightFactor);
}

function draw() {
  background(220);
  drawGrid();
}

function generateGrid(rows, cols) {
  let newGrid = [];
  for (let y = 0; y < cols; y ++) {
    newGrid.push([]);
    for (let x = 0; x < rows; x ++) {
      newGrid[y].push(true);
    }
  }
  return newGrid;
}

function generateRandomGrid(rows, cols) {
  let newGrid = [];
  for (let y = 0; y < cols; y ++) {
    newGrid.push([]);
    for (let x = 0; x < rows; x ++) {
      let color = random(100);
      if (color > 50) {
        newGrid[y].push(true);
      }
      else {
        newGrid[y].push(false);
      }
    }
  }
  return newGrid;
}
function drawGrid() {
  for (let y = 0; y < heightFactor; y ++) {
    for (let x = 0; x < widthFactor; x ++) {
      if (grid[y][x]) {
        fill("white");
      }
      else {
        fill("black");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX / CELL_SIZE);
  let y = Math.floor(mouseY / CELL_SIZE);

  toggle(x, y);
  toggle(x + 1, y);
  toggle(x, y + 1);
  toggle(x - 1, y);
  toggle(x, y - 1);
}

function toggle(x, y) {
  if (x >= 0 && x < widthFactor && y >= 0 && y < heightFactor) {
    grid[y][x] = !grid[y][x];
  }
}
