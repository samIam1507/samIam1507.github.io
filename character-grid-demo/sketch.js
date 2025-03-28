// 2D Array Grid Neigbours Demo

// let grid = [[0, 1, 1, 0], 
//             [1, 1, 0, 0], 
//             [0, 0, 1, 1],
//             [0, 1, 0, 0]];

// const CELL_SIZE = height / 4;
let cellSize = 40;
let heighFactor;
let widthFactor;
let grid;
let mouseDown = false;
const OPEN_TILE = 0;
const IMPASSABLE = 1;
const PLAYER = 2;
let thePlayer = {
  x: 0, 
  y: 0,
};
let rock;
let woodFloor;

function preload() {
  rock = loadImage("rock.png");
  woodFloor = loadImage("wood-floor.png");
}
function setup() {
  createCanvas(4 * windowWidth / 5, 4 * windowHeight / 5);
  widthFactor = Math.floor(width / cellSize);
  heighFactor = Math.floor(height / cellSize);
  grid = generateRandomGrid(widthFactor, heighFactor);
  
  // add player to the grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function draw() {
  background(220);
  displayGrid();
}
function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(widthFactor, heighFactor);
  }
  else if (key === "e") {
    grid = generateGrid(widthFactor, heighFactor);
  }
  else if (key === "w") {
    movePlayer(thePlayer.x, thePlayer.y - 1);
  }
  else if (key === "s") {
    movePlayer(thePlayer.x, thePlayer.y + 1);
  }
  else if (key === "a") {
    movePlayer(thePlayer.x - 1, thePlayer.y);
  }
  else if (key === "d") {
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }
}

function movePlayer(x, y) {
  if (x >= 0 && x < widthFactor && y >= 0 && y < heighFactor && grid[y][x] === OPEN_TILE) {
    grid[thePlayer.y][thePlayer.x] = OPEN_TILE;
    thePlayer.x = x;
    thePlayer.y = y;
    grid[thePlayer.y][thePlayer.x] = PLAYER; 
  }
}

function displayGrid() {
  for (let y = 0; y < heighFactor; y ++) {
    for (let x = 0; x < widthFactor; x ++) {
      if (grid[y][x] === OPEN_TILE) {
        image(woodFloor, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === IMPASSABLE) {
        image(rock, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === PLAYER) {
        fill("red");
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
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

function toggle(x, y) {
  if (x >= 0 && x < widthFactor && y >= 0 && y < heighFactor) {
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPASSABLE;
    }
    else if (grid[y][x] === IMPASSABLE) {
      grid[y][x] = OPEN_TILE;
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);
  
  toggle(x, y);
  // toggle(x + 1, y);
  // toggle(x, y + 1);
  // toggle(x - 1, y);
  // toggle(x, y - 1);
}