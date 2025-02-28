// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const speed = 5;
let direction = "right";
let locationList = [[50, 50]];
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
    locationList = concat(locationList, [[x, y]]);
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
  for (let i = 0; i < locationList.length; i++) {
    placeholderList = locationList[i];
    placeholderX = placeholderList[0];
    placeholderY = placeholderList[1];
    circle(placeholderX, placeholderY, 25);
  }
  // if (!appleJustEaten) {
  //   locationList[0].pop();
  // }
}


function createApple() {
  while (appleJustEaten) {
    appleX = floor(random(5, windowWidth / 25 - 5)) * 25;
    appleY = floor(random(5, windowHeight / 25 - 5)) * 25;
    for (let i = 0; i < locationList.length; i++) {
      let placeholderList = locationList[i];
      if (appleX === placeholderList[0] && appleY === placeholderList[1]) {
        overlap = true;
      }
    }
    if (!overlap) {
      appleJustEaten = false;
    }
  }
  fill(130, 40, 40);
  circle(appleX, appleY, 25);
  console.log(appleX, appleY);
  overlap = false;
}

function eatApple() {
  if (x === appleX && y === appleY) {
    appleJustEaten = true;
  }
}