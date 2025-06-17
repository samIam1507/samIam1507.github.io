// Comp Sci Final Exam Project
// Samuel Wardell
// 17 June, 2025
// 
// Extra for Experts - created a function which checks whether any circle is clicked on and removes any that were from the array

// define constants and ballsArray
const RADIUS_VALUE = 40;
const MAX_SPEED = 7;

let ballsArray = [];


// create canvas and 5 balls at random positions, pushing them each into ballsArray
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  for (let i = 0; i < 5; i ++) {
    let theBall = new Ball(random(RADIUS_VALUE, width - RADIUS_VALUE), random(RADIUS_VALUE, height - RADIUS_VALUE), RADIUS_VALUE);
    ballsArray.push(theBall);
  }
}

// draws background and updates and displays each ball in ballsArray
function draw() {
  background(255);
  for (let ball of ballsArray) {
    ball.update();
    ball.display();
  }
}

// when any key is pressed, creates a new ball at a random position and pushes it to ballsArray
function keyPressed() {
  let newBall = new Ball(random(RADIUS_VALUE, width - RADIUS_VALUE), random(RADIUS_VALUE, height - RADIUS_VALUE), RADIUS_VALUE);
  ballsArray.push(newBall);
}

// when the mouse is pressed, iterates through the ballsArray. If the mouse pressed any of the balls, those balls are removed from
// ballsArray
function mousePressed() {
  for (let i = ballsArray.length - 1; i >= 0; i --) {
    if (ballsArray[i].checkIfPointInsideBall(mouseX, mouseY)) {
      ballsArray.splice(i, 1);
    }
  }
}

class Ball {

  // creates a new ball with an x and y determined by input, a random dx and dy, and random r g and b values for colour
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-MAX_SPEED, MAX_SPEED);
    this.dy = random(-MAX_SPEED, MAX_SPEED);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  // shows the ball as a circle with its randomized colour at this.x and this.y, with a diameter of 2 times the radius
  display() {
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, RADIUS_VALUE * 2);
  }

  // if the ball's edge is thouching the edge of the screen, causes it to bounce back, then updates this.x and this.y by adding
  // this.dx and this.dy respectively
  update() {
    if (this.x + RADIUS_VALUE > width || this.x - RADIUS_VALUE < 0) {
      this.dx = -this.dx;
    }
    if (this.y + RADIUS_VALUE > height || this.y - RADIUS_VALUE < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
  }

  // if the clicked point is within the ball, returns true, else returns false
  checkIfPointInsideBall(clickedX, clickedY) {
    if (sqrt(sq(clickedX - this.x) + sq(clickedY - this.y)) < RADIUS_VALUE) {
      return true;
    }
    return false;
  }
}