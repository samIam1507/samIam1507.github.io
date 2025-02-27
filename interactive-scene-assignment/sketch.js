// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const speed = 5;
let direction = "right";
let locationList = [];
let dx;
let dy = 0;
let appleJustEaten = true;
let appleX;
let appleY;
let x = 50;
let y = 50;
let addToList = false;


function setup() {
  createCanvas(windowWidth, windowHeight);
  dx = speed;
}

function draw() {
  background(220);
  fill(40, 40, 130);
  setDirection();
  snakeHeadMotion();
  move();
  eatApple();
  createApple();
  drawBody(); 
}

function setDirection() {
  if (keyIsDown(87)) {
    direction = "up";
  }
  else if (keyIsDown(68)) {
    direction = "right";
  }
  else if (keyIsDown(83)) {
    direction = "down";
  }
  else if (keyIsDown(65)) {
    direction = "left";
  }
}

function snakeHeadMotion() {
  if (x % 25=== 0 && y % 25=== 0) {
    if (direction === "right") {
      dx = speed;
      dy = 0;
      addToList = true;
    }
    if (direction === "down") {
      dy = speed;
      dx = 0;
      addToList = true;
    }
    if (direction === "left") {
      dx = -speed;
      dy = 0;
      addToList = true;
    }
    if (direction === "up") {
      dy = -speed;
      dx = 0;
      addToList = true;
    }
    if (addToList) {
      locationList.concat[x, y];
      addToList = false;
    }
  }
}

function move() {
  x += dx;
  y += dy;
  fill(0, 255, 0);
  circle(x, y, 25);
}


function drawBody() {
  fill(0, 255, 0);
  for (let coordinates of locationList) {
    let placeholderX = coordinates[0];
    let placeholderY = coordinates[1];
    circle(placeholderX, placeholderY, 25);
  }
}


function createApple() {
  if (appleJustEaten) {
    appleX = floor(random(windowWidth) / 25) * 25;
    appleY = floor(random(windowHeight) / 25) * 25;
    appleJustEaten = false;
  }
  fill(130, 40, 40);
  circle(appleX, appleY, 25);
}

function eatApple() {
  if (x === appleX && y === appleY) {
    appleJustEaten = true;
  }
}