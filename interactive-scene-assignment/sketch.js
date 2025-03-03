// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const speed = 5;
let direction = "right";
let locationList = [49, 50, 50, 50];
let dx;
let dy = 0;
let appleJustEaten = true;
let appleX;
let appleY;
let x = 50;
let y = 50;
let placeholderList;
let placeholderX = 50;
let placeholderY = 50;
let overlap = false;
let lengthVar = 3;
let dead = false;


function setup() {
  createCanvas(windowWidth, windowHeight);
  dx = speed;
  noStroke();
}

function draw() {
  background(220);
  fill(40, 40, 130);
  setDirection();
  snakeHeadMotion();
  move();
  drawBody(); 
  createApple();
  isDead();
}

function setDirection() {
  if (keyIsDown(87) && direction !== "down") {
    direction = "up";
  }
  else if (keyIsDown(68) && direction !== "left") {
    direction = "right";
  }
  else if (keyIsDown(83) && direction !== "up") {
    direction = "down";
  }
  else if (keyIsDown(65) && direction !== "right") {
    direction = "left";
  }
}

function snakeHeadMotion() {
  if (x % 25=== 0 && y % 25=== 0) {
    if (direction === "right") {
      dx = speed;
      dy = 0;
    }
    if (direction === "down") {
      dy = speed;
      dx = 0;
    }
    if (direction === "left") {
      dx = -speed;
      dy = 0;
    }
    if (direction === "up") {
      dy = -speed;
      dx = 0;
    }
    eatApple();
    recordCoordinates();
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
  for (let i = 0; i < locationList.length; i += 2) {
    circle(locationList[i], locationList[i + 1], 25);
  }
}


function createApple() {
  if (appleJustEaten) {
    appleX = floor(random(5, windowWidth / 25 - 5)) * 25;
    appleY = floor(random(5, windowHeight / 25 - 5)) * 25;
    for (let i = 0; i < locationList.length; i += 2) {
      if (appleX === locationList[i] && appleY === locationList[i+1]) {
        overlap = true;
      }
      if (x === locationList[1] && y === locationList[i + 1]) {
        dead = true;
      }
    }
    if (!overlap) {
      appleJustEaten = false;
    }
  }
  fill(130, 40, 40);
  circle(appleX, appleY, 25);
  overlap = false;
}

function eatApple() {
  if (x === appleX && y === appleY) {
    appleJustEaten = true;
    lengthVar += 1;
  }
}

function recordCoordinates() {
  locationList = concat([x, y], locationList);
  if (lengthVar < locationList.length / 2) {
    locationList.pop();
    locationList.pop();
  }
}

function isDead() {
  if (dead) {
    console.log("dead");
  }
}