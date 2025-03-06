// Bouncing Balls Demo

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(220);
  if (mouseIsPressed) {
    spawnBall();
  }
  for (let ball of ballArray) {
    fill("red");
    ball.x += ball.dx;
    ball.y += ball.dy;
    if (ball.x + ball.radius < 0) {
      ball.x = width + ball.radius;
    }
    else if (ball.x - ball.radius > width) {
      ball.x = 0 - ball.radius;
    }
    if (ball.y + ball.radius < 0) {
      ball.y = height + ball.radius;
    }
    else if (ball.y - ball.radius > height) {
      ball.y = 0 - ball.radius;
    }
    circle(ball.x, ball.y, ball.radius * 2);
  }
}

function spawnBall() {
  let someBall = {
    x: random(width),
    y: random(height),
    radius: random(15, 40), 
    dx: random(-5, 5),
    dy: random(-5, 5)
  };
  ballArray.push(someBall);
}