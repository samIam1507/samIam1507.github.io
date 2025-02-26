// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const speed = 20;
let direction = "right";
let locationList = [];
let dx;
let dy;
let appleJustEaten = true;
let appleX;
let appleY;
let x = 50;
let y = 50;


function setup() {
  createCanvas(windowWidth, windowHeight);
  dx = speed;
  dy = speed;
  background(220);
}

function draw() {
  fill(40, 40, 130);
  // setDirection();
  // snakeHeadMotion();
  move();
  eatApple();
  createApple();
  // checkIfLengthening();
  // drawBody(); 
}

// function setDirection() {
//   if (keyIsDown(87)) {
//     direction = "up";
//   }
//   else if (keyIsDown(68)) {
//     direction = "right";
//   }
//   else if (keyIsDown(83)) {
//     direction = "down";
//   }
//   else if (keyIsDown(65)) {
//     direction = "left";
//   }
// }

// function snakeHeadMotion() {
//   if (x % 10 === 0 && y % 10 === 0) {
//     if (direction === "right") {
//       dx = speed;
//       dy = 0;
//     }
//     if (direction === "down") {
//       dy = speed;
//       dx = 0;
//     }
//     if (direction === "left") {
//       dx = -speed;
//       dy = 0;
//     }
//     if (direction === "up") {
//       dy = -speed;
//       dx = 0;
//     }
//   }
// }

function move() {
  x += dx;
  y += dy;
  fill(0, 255, 0);
  circle(x, y, 25);
}


// function drawBody() {
//   for (let coordinates of locationList){
//     let placeholderX = coordinates.pop(0);
//     let placeholderY = coordinates.pop(0);
//     circle(placeholderX, placeholderY, 25);
//   }
// }

// function checkIfLengthening() {
//   if (!appleJustEaten) {
//     locationList.append([x, y]);
//   }
// }

function createApple() {
  if (appleJustEaten) {
    appleX = floor(random(windowWidth) / 5) * 5;
    appleY = floor(random(windowHeight) / 5) * 5;
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