// Generative Art Demo using obj notation and arrays
// Sam
// Mar 7
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let someLine = [];
let newLine;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < width; i += width / 50) {
    for (let y = 0; y < height; y += width / 50) {
      newLine = spawnLine(i, y, width / 50);
      someLine.push(newLine);
    }
  }
}

function draw() {
  background(220);
  for (let aLine of someLine) {
    line(aLine.x1, aLine.y1, aLine.x2, aLine.y2);
  }
}

function spawnLine(x, y, theSize) {
  let theLine;
  let choice = random(100);
  if (choice < 50) {
    // negative slope
    theLine = {
      x1: x - theSize / 2,
      y1: y - theSize / 2,
      x2: x + theSize / 2,
      y2: y + theSize / 2,
    };
  }

  else {
    // positive slope
    theLine = {
      x1: x - theSize / 2,
      y1: y + theSize / 2,
      x2: x + theSize / 2,
      y2: y - theSize / 2,
    };
  }
  return theLine;
}



function drawLines() {
  for (let line1 in someLine) {
    line(line1.x1, line1.y1, line1.x2, line1.y2);
  }
}