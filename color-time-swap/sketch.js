let someTime = 2000;
let timeLastSwitched = 0;
let isWhite = true;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  // console.log(millis());
  // if ((floor(millis() / someTime)) % 2 === 0) {
  //   background("white");
  // }
  // else {
  //   background("black");  
  // }
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
