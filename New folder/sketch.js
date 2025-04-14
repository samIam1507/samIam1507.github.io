// Project Title

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.radius = 3;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.opacity = 255;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, 2 * this.radius);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
    this.dy += 2/3;
    this.opacity --;
  }

  isDead() {
    return this.opacity <= 0;
  }
}

const fireworksPerClick = 50;

let theFireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  for (let firework of theFireworks) {
    if (firework.isDead()) {
      let index = theFireworks.indexOf(firework);
      theFireworks.splice(index, 1);
    }
    else {
      firework.display();
      firework.move();
    }
  }
}

function mousePressed() {
  for (let i = 0; i < fireworksPerClick; i ++) {
    let someFirework = new Particle(mouseX, mouseY);
    theFireworks.push(someFirework);
  }
}
