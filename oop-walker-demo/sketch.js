// Walker OOP demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Walker {
  constructor(x, y, theColour) {
    this.x = x;
    this.y = y;
    this.colour = theColour;
    this.radius = 5;
    this.speed = 5;
  }

  display() {
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, 2 * this.radius);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      this.y -= this.speed;
    }
    else if (choice < 50) {
      this.y += this.speed;
    }
    else if (choice < 75) {
      this.x -= this.speed;
    }
    else {
      this.x += this.speed;
    }
  }
}

// let arbe;
// let sam;
let theWalkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // arbe = new Walker(width / 2, height / 2, "purple");
  // sam = new Walker(width / 4, height / 2, "red");
  spawnWalker(width / 2, height / 2);
}

function draw() {
  // background(220);
  // arbe.display();
  // arbe.move();
  // sam.display();
  // sam.move();

  for (let aWalker of theWalkers) {
    aWalker.move();
    aWalker.display();
  }
}

function mousePressed() {
  spawnWalker(mouseX, mouseY);
}

function spawnWalker(x, y) {
  let r = random(255);
  let g = random(255);
  let b = random(255);
  let someColour = color(r, g, b);
  let someWalker = new Walker(x, y, someColour);
  theWalkers.push(someWalker);
}
