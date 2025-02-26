// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const speedX = 5;
const speedY = 5;
let direction = "right";
let locationList = [];
let dx;
let dy;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
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
  if (x % 5 === 0 && y % 5 ===0) {
    if (direction === "right") {
      dx = speedX;
      speedY = 0
    }
    if (direction === "down") {
      dy = speed;
    }
    if (direction === "left") {
      dx = -speed;
    }
    if (direction === "up") {
      dy = -speed;
    }
    locationList.append([x, y]);
  }
}
