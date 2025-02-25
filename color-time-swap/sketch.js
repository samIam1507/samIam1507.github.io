let someTime = 2000;
let timeLastSwitched = 0;
let isWhite = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  if (millis() > someTime + timeLastSwitched) {
    isWhite = !isWhite;
    timeLastSwitched = millis();
  }
  if (isWhite) {
    background(255);
  }
  else {
    background(0);
  }
}
