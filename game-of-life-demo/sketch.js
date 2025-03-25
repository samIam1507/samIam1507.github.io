// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELL_SIZE = 20;
let heightFactor;
let widthFactor;
let grid = [[]];
let autoPlayIsOn = false;
let gosper;

function preload() {
  gosper = loadJSON("gosper-gun.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  heightFactor = Math.floor(height / CELL_SIZE);
  widthFactor = Math.floor(width / CELL_SIZE);
  grid = generateRandomGrid(widthFactor, heightFactor);
}

function draw() {
  background(220);
  if (autoPlayIsOn) {
    grid = updateGrid();
  }
  drawGrid();
}

function updateGrid() {
  newGrid = generateGrid(widthFactor, heightFactor);
  for (let y = 0; y < heightFactor; y ++) {
    for (let x = 0; x < widthFactor; x ++) {
      let counter = 0;
      for (let i = - 1; i < 2; i ++){
        for (let n = - 1; n < 2; n ++) {
          if (x + n >= 0 && x + n < widthFactor && y + i >= 0 && y + i < heightFactor ) {
            if (grid[y + i][x + n]) {
              counter ++;
            }
          }
        }
      }
      if (grid[y][x]) {
        counter -= 1;
        if (counter < 2 || counter > 3) {
          newGrid[y][x] = false;
        }
        else {
          newGrid[y][x] = true;        
        }
      }
      else {
        if (counter === 3) {
          newGrid[y][x] = true;
        }
        else {
          newGrid[y][x] = false;
        }
      }
    }
  }
  return newGrid;
}

function generateGrid(rows, cols) {
  let newGrid = [];
  for (let y = 0; y < cols; y ++) {
    newGrid.push([]);
    for (let x = 0; x < rows; x ++) {
      newGrid[y].push(false);
    }
  }
  return newGrid;
}

function keyPressed() {
  if (key === "e") {
    grid = generateGrid(widthFactor, heightFactor);
  }
  else if (key === "r") {
    grid = generateRandomGrid(widthFactor, heightFactor);
  }
  else if (key === "p") {
    grid = updateGrid();
  }
  else if (key === "g") {
    grid = gosper;
  }
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
        fill("black");
      }
      else {
        fill("white");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX / CELL_SIZE);
  let y = Math.floor(mouseY / CELL_SIZE);

  toggle(x, y);
  // toggle(x + 1, y);
  // toggle(x, y + 1);
  // toggle(x - 1, y);
  // toggle(x, y - 1);
}

function toggle(x, y) {
  if (x >= 0 && x < widthFactor && y >= 0 && y < heightFactor) {
    grid[y][x] = !grid[y][x];
  }
}
