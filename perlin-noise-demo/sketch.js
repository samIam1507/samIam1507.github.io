// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let x;
let y;
let time = 0;
let deltaTime = 0.01;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  fill('black');
  x = noise(time) * width;
  y = noise(time + 6) * height;
  time += deltaTime;
  circle(x, y, 50);
}
