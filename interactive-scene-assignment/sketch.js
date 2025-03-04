// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const speed = 5;
let direction;
let locationList = [];
let dx;
let dy = 0;
let appleJustEaten;
let appleX;
let appleY;
let x;
let y;
let placeholderList;
let placeholderX;
let placeholderY;
let overlap = false;
let lengthVar = 3;
let dead = false;
let activeMode = "start";
let scrollMode;
let scrollingPositionChange = 0;
let obstacleMode = false;
let obstacleLocationList = [];
let obstacleX;
let obstacleY;
let obstacleNeeded = false;
let millisDeathDelay = millis(5);
let millisDeathRecorded;

// function preload() {
//   setting = Image("setting_button.png");
// }
function setup() {
  createCanvas(windowWidth, windowHeight);
  dx = speed;
  noStroke();
}

function draw() {
  background(220);
  setMode();
  mode();
  fill(40, 40, 130);
  obstacle();
  setDirection();
  snakeHeadMotion();
  move();
  drawBody(); 
  createApple();
  isDead();
  scrolling();
}

function setMode() {
  if (activeMode === "start" && mouseX > windowWidth / 2 - 200 && mouseX < windowWidth / 2 + 200 && mouseY < windowHeight / 2 - 50 && mouseY > windowHeight / 2 - 130 && mouseIsPressed) {
    activeMode = "mode-selection";
  }
  if (activeMode === "mode-selection" && mouseX > windowWidth / 2 - 20 && mouseX < windowWidth / 2 + 80 && mouseIsPressed) {
    if (mouseY < windowHeight + scrollingPositionChange && mouseY > windowHeight - 20 + scrollingPositionChange) {
      activeMode = "obstacle";
    }
    if (mouseY < windowHeight + scrollingPositionChange + 60 && mouseY > windowHeight + 40 + scrollingPositionChange) {
      activeMode = "play-basic";
    }
  }
}

function mode() {
  if (activeMode === "start") {
    fill("red");
    textSize(44);
    strokeWeight(3);
    text("Game Mode Selection", windowWidth / 2 - 200, windowHeight / 2 - 50);
  }
  if (activeMode === "mode-selection") {
    fill("green");
    textSize(30);
    stroke(0);
    strokeWeight(4);
    text("(Scroll for More Options, Clic to Stop Scrolling)", windowWidth / 2 - 200, windowHeight / 4);
    fill("yellow");
    text("Obstacle Mode", windowWidth / 2 - 20, windowHeight + scrollingPositionChange);
    fill("blue");
    text("Basic Mode", windowWidth / 2 - 20, windowHeight + 60 + scrollingPositionChange);
  }
  if (activeMode === "play-basic") {
    direction = "right";
    locationList = [49, 50, 50, 50];
    x = 50;
    y = 50;
    placeholderX = 50;
    placeholderY = 50;
    activeMode = "ongoing";
    appleJustEaten = true;
    noStroke();
  }
  if (activeMode === "obstacle") {
    direction = "right";
    locationList = [49, 50, 50, 50];
    x = 50;
    y = 50;
    placeholderX = 50;
    placeholderY = 50;
    activeMode = "ongoing";
    appleJustEaten = true;
    obstacleMode = true;
    obstacleNeeded = true;
    obstacleLocationList = [100, 100, 200, 200];
    noStroke();
  }
  if (activeMode === "dead") {
    locationList = [];
    x = NaN;
    y = NaN;
    obstacleLocationList = [];
    appleX = NaN;
    appleY = NaN;
    millisDeathRecorded = millis();
    activeMode = "reloading";
  }
  if (activeMode === "reloading") {
    activeMode = "start";
  }
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
    for (let i = 2; i < locationList.length; i += 2) {
      if (appleX === locationList[i] && appleY === locationList[i+1]) {
        overlap = true;
      }
    }
    for (let n = 0; n < obstacleLocationList.length; n += 2) {
      if (appleX === obstacleLocationList[n] && appleY === obstacleLocationList[n + 1]) {
        overlap = true;
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
    obstacleNeeded = true;
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
  for (let i = 2; i < locationList.length; i += 2) {
    if (x === locationList[i] && y === locationList[i + 1]){
      dead = true; 
    }
  }
  for (let n = 0; n < obstacleLocationList.length; n += 2) {
    if (x === obstacleLocationList[n] && y === obstacleLocationList[n + 1]) {
      dead = true;
    }
  }
  if (x <= 12.5 || x >= windowWidth - 12.5 || y <= 0 || y >= windowHeight - 12.5) {
    dead = true;
  }
  if (dead) {
    activeMode = "dead";
  }
}

function mouseWheel(event) {
  if (event.delta > 0) {
    scrollMode = 'up';
  } 
  else if (event.delta < 0) {
    scrollMode = "down";
  }
  else {
    scrollMode = "none";
  }
}

function scrolling() {
  if (scrollMode === "down") {
    scrollingPositionChange -= 2;
  }
  if (scrollMode === "up") {
    scrollingPositionChange += 2;
  }
  if (mouseIsPressed) {
    scrollMode = "none";
  }
}

function obstacle() {
  if (obstacleNeeded && obstacleMode) {
    obstacleNeeded = false;
    obstacleX = floor(random(5, windowWidth / 25 - 5)) * 25;
    obstacleY = floor(random(5, windowHeight / 25 - 5)) * 25;
    for (let i = 0; i < locationList.length; i +=2) {
      if (obstacleX === locationList[i] && obstacleY === locationList[i + 1]) {
        obstacleNeeded = true;
      }
    }
    for (let n = 0; n < obstacleLocationList.length; n += 2) {
      if (obstacleX === obstacleLocationList[n] && obstacleY === obstacleLocationList[n + 1]) {
        obstacleNeeded = true;
      }
    }
    if (obstacleX === appleX && obstacleY === appleY) {
      obstacleNeeded = true;
    }
    if (!obstacleNeeded) {
      obstacleLocationList.push(obstacleX);
      obstacleLocationList.push(obstacleY);
    }
  }
  for (let b = 0; b < obstacleLocationList.length; b += 2) {
    square(obstacleLocationList[b] - 12.5, obstacleLocationList[b + 1] - 12.5, 25);
  }
}
