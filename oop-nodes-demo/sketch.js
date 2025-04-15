// Connected Nodes OOP demo

let nodes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let somePoint = new MovingPoint(width / 2, height / 2);
  nodes.push(somePoint);
}

function draw() {
  background(255);

  for (let node of nodes) {
    node.lines(nodes);
  }
  for (let node of nodes) {
    node.update();
    node.display();
  }
}

class MovingPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.radius = 15;
    this.timeX = random(1000);
    this.timeY = random(1000);
    this.deltaTime = 0.01;
    this.colour = color(random(255), random(255), random(255));
    this.reach = 100;
  }

  display() {
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, 2 * this.radius);
  }

  update() {
    this.move();
    this.wrap();
    this.adjustSizeWithMouse();
  }

  adjustSizeWithMouse() {
    let mouseDistance = dist(mouseX, mouseY, this.x, this.y);
    if (mouseDistance < this.reach) {
      this.radius = 15 + (this.reach - mouseDistance) / 3;
    }
    else {
      this.radius = 15;
    }
  }

  move() {
    let dx = noise(this.timeX);
    let dy = noise(this.timeY);

    dx = map(dx, 0, 1, -this.speed, this.speed);
    dy = map(dy, 0, 1, -this.speed, this.speed);

    this.x += dx;
    this.y += dy;

    this.timeX += this.deltaTime;
    this.timeY += this.deltaTime;
  }

  wrap() {
    if (this.x - this.radius > width) {
      this.x = 0 - this.radius;
    }
    else if (this.x + this.radius < 0) {
      this.x = width + this.radius;
    }
    if (this.y + this.radius < 0) {
      this.y = height + this.radius;
    }
    else if (this.y - this.radius > height) {
      this.y = 0 - this.radius;
    }
  }

  lines(nodesArray) {
    for (let node of nodesArray) {
      if (this !== node) {
        let distanceAway = dist(this.x, this.y, node.x, node.y);
        if (distanceAway < this.reach) {
          stroke(this.colour);
          strokeWeight(4);
          line(this.x, this.y, node.x, node.y);
        }
      }
    }
  }
}

function mousePressed() {
  let somePoint = new MovingPoint(mouseX, mouseY);
  nodes.push(somePoint);
}