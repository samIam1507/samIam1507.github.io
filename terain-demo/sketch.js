// Terain Generation Demo

let terrain = [];
const NUMBER_OF_RECTS = 40000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateTerrain(width / NUMBER_OF_RECTS);
}

function draw() {
  background(220);
  stroke('green');
  fill('green');

  for (let someRect of terrain) {
    rect(someRect.x, someRect.y, someRect.w, someRect.h);
  }
}

function spawnRectangle(leftSide, rectHeight, rectWidth) {
  let theRect = {
    x: leftSide,
    y: height - rectHeight,
    w: rectWidth,
    h: rectHeight,
  };

  return theRect;
}

function generateTerrain(widthOfRect) {
  let time = 0;
  let deltaTime = 0.00005;
  for (let i = 0; i < NUMBER_OF_RECTS; i++) {
    time += deltaTime;
    let theHeight = noise(time) * height;
    terrain.push(spawnRectangle(i * widthOfRect, theHeight, widthOfRect));
  }
}
