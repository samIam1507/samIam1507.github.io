// bubble object notation and arrays demo

let theBubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  for (let i = 0;i < 10; i++) {
    spawnBubble();
  }

  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(220);
  for (let bubble of theBubbles) {
    bubble.dx = random(-5, 5);
    bubble.dy = random(-5, 5);

    bubble.x += bubble.dx;
    bubble.y += bubble.dy;

    fill(bubble.r, bubble.g, bubble.b);
    circle(bubble.x, bubble.y, bubble.radius * 2);
  }
}

function spawnBubble() {
  let someBubble = {
    x: random(width),
    y: random(height),
    radius: random(40, 80),
    r: random(255),
    g: random(255),
    b: random(255),
    dx: random(-5, 5),
    dy: random(-5, 5),
  };
  theBubbles.push(someBubble);
}

function mousePressed() {
  for (let i = 0; i < theBubbles.length; i++) {
    if (Math.abs(mouseX - theBubbles[i].x) < theBubbles[i].radius && Math.abs(mouseY - theBubbles[i].y) < theBubbles[i].radius) {
      theBubbles.splice(i, 1);
    }
  }
}
