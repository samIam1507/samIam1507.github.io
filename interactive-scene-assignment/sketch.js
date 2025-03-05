// Gooogle Snake - Sam's Version
// Samuel Wardell
// 04 / 03 / 2025
//
// Extra for Experts:
// - In this project there are two primary additional elements that I included. The first is the 
// addition of a scrolling mechanism which allows the player to move from the instruction screen to
// the option screen by assigning the images a direction based on the delta of mouse scroller movement. 
// The second aspect of this was my use of arrays, which had not significantly been discussed in class.
// The most notable aspect of my use of arrays was the utilization of push and pop functions as well
// as using them to iterate through changing information, which was not something that I had any
// significant experience with.


// defines constant speed
const SPEED = 5;

// direction and location variables
let dx;
let dy = 0;
let x;
let y;
let direction;
let locationList = [];

// apple variables
let appleJustEaten;
let appleX;
let appleY;
let overlap = false;
let lengthVar;
let dead = false;
let activeMode = "start";

// scrolling variables
let scrollMode;
let scrollTrue = false;
let scrollingPositionChange;

// obstacle variables
let obstacleActive = false;
let obstacleLocationList = [];
let obstacleX;
let obstacleY;
let obstacleNeeded = false;

// timing variables
let millisDeathDelay = 5000;
let millisDeathRecorded = 0;

function preload() {

  // preloads images that will be used in the project to prevent delays
  home = loadImage("home.png");
  play = loadImage("play.png");
  instructions = loadImage("instructions.png");
  basicMode = loadImage("basic_mode.png");
  obstacleMode = loadImage("obstacle_mode.png");
  apple = loadImage("apple.png");
  endScreen = loadImage("end_screen.png");
}

function setup() {

  // runs once, setting up canvas and including elements which only need one run such as setting image centre
  createCanvas(windowWidth, windowHeight);
  noStroke();
  imageMode(CENTER);
}

function draw() {

  // runs the main project, including all drawing, mode definition, scrolling, and adds background every frame
  background(23, 93, 160);
  fill(35, 26, 72);
  setMode();
  mode();
  obstacle();
  setDirection();
  snakeHeadMotion();
  move();
  drawBody(); 
  createApple();
  isDead();
  scrolling();
}

function setMode() {

  // defines perameters for switching mode from start to mode-selection
  if (activeMode === "start" && mouseX > windowWidth / 2.5 && mouseX < windowWidth / 1.7 && mouseY < windowHeight / 1.1 && mouseY > windowHeight / 1.3 && mouseIsPressed) {
    activeMode = "mode-selection";
  }

  // defines perameters for beginning switch from mode-selection
  if (activeMode === "mode-selection" && mouseX > windowWidth / 2.4 && mouseX < windowWidth / 1.6 && mouseIsPressed) {
    
    // defines perameters for switching mode to play-basic
    if (mouseY < 3 * windowHeight / 1.9 + scrollingPositionChange && mouseY > 3 * windowHeight / 2.1 + scrollingPositionChange) {
      activeMode = "play-basic";
    }

    // defines perameters for switching mode to play-obstacle
    if (mouseY < 2.1 * windowHeight + scrollingPositionChange && mouseY > 1.9 * windowHeight + scrollingPositionChange) {
      activeMode = "play-obstacle";
    }
  }
}

function mode() {
  if (activeMode === "start") {

    // if windowWidth is greater than windowHeight, draw home and play images with side lengths related to height
    if (windowWidth > windowHeight) {
      image(home, windowWidth / 2, windowHeight / 2, windowHeight, windowHeight);
      image(play, windowWidth / 2, windowHeight / 1.2, windowHeight / 2, windowHeight / 2);
    }

    // if windowHeight is greater than windowWidth, draw home and play images with side lengths related to width
    else {
      image(home, windowWidth / 2, windowHeight / 2, windowWidth, windowWidth);
      image(play, windowWidth / 2, windowHeight / 1.2, windowWidth / 2, windowWidth / 2);
    }

    // resets scrolling position, scroll mode, and length
    scrollingPositionChange = 0;
    scrollMode = NaN;
    lengthVar = 3;

  }
  else if (activeMode === "mode-selection") {

    // resets scroll mode and draws home image in upper left corner
    scrollTrue = true;
    image(home, windowWidth / 15, windowHeight / 15, windowWidth / 7.5, windowWidth / 7.5);
    
    // if windowWidth is greater than windowHeight, draw home and play images with side lengths related to height
    if (windowWidth > windowHeight) {
      image(instructions, windowWidth / 2, windowHeight / 2 + scrollingPositionChange, windowWidth / 2.2, windowWidth / 2.2);
    }
    
    // if windowHeight is greater than windowWidth, draws instruction images with side lengths related to width
    else {
      image(instructions, windowWidth / 2, windowHeight / 2 + scrollingPositionChange, windowWidth / 2.2, windowWidth / 2.2);
    }
    
    // draws basicMode and obstacleMode images below the screen prepared to be scrolled up
    image(basicMode, windowWidth / 2, 3 * windowHeight / 2 + scrollingPositionChange, windowWidth / 3, windowWidth / 3);
    image(obstacleMode, windowWidth / 2, 2 * windowHeight + scrollingPositionChange, windowWidth / 3, windowWidth / 3);
  }
  if (activeMode === "play-basic") {
    direction = "right";
    locationList = [floor(windowHeight / 175) * 25, floor(5 * windowHeight / 175) * 25];
    x = floor(windowHeight / 175) * 25;
    y = floor(5 * windowHeight / 175) * 25;
    activeMode = "ongoing";
    appleJustEaten = true;
    obstacleActive = false;
    obstacleNeeded = false;
    noStroke();
  }
  else if (activeMode === "play-obstacle") {

    // sets direction, locations lists, x and y, and apple and obstacle requirement states as well as moving to mode ongoing
    direction = "right";
    locationList = [floor(windowHeight / 175) * 25, floor(5 * windowHeight / 175) * 25];
    x = floor(5 * windowHeight / 175) * 25;
    y = floor(5 * windowHeight / 175) * 25;
    activeMode = "ongoing";
    appleJustEaten = true;
    obstacleActive = true;
    obstacleNeeded = true;
    obstacleLocationList = [100, 100, 200, 200];
    noStroke();
  }
  else if (activeMode === "dead") {

    // resets location list, location, and apple location variables
    locationList = [];
    x = NaN;
    y = NaN;
    obstacleLocationList = [];
    appleX = NaN;
    appleY = NaN;

    // gets current time and switches mode to reloading
    millisDeathRecorded = millis();
    activeMode = "reloading";
  }
  else if (activeMode === "reloading") {

    // draws endScreen and waits untill 5 seconds have elapsed before setting mode to start
    image(endScreen, windowWidth / 2, windowHeight / 2, windowWidth / 3, windowWidth / 3);
    if (millis() > millisDeathRecorded + millisDeathDelay) {
      activeMode = "start";
    }

    // draws home logo in upper right corner
    image(home, windowWidth / 15, windowHeight / 15, windowWidth / 7.5, windowWidth / 7.5);
  }
  else if (activeMode === "ongoing") {

    // draws home logo in upper right corner
    image(home, windowWidth / 15, windowHeight / 15, windowWidth / 7.5, windowWidth / 7.5);
  }
}

function setDirection() {

  // sets direction according to key stroke as long as it is not a 180 degree switch
  if (keyIsDown(87) && direction !== "down") {
    direction = "up";
  }
  else if (keyIsDown(68) && direction !== "left") {
    direction = "right";
  }
  else if (keyIsDown(83) && direction !== "up") {
    direction = "down";
  }
  else if (keyIsDown(65) && direction !== "right") {
    direction = "left";
  }
}

function snakeHeadMotion() {
  if (x % 25=== 0 && y % 25=== 0) {

    // every 25 pixels travelled, switches direction of change of motion to that set above in setDirection
    if (direction === "right") {
      dx = SPEED;
      dy = 0;
    }
    if (direction === "down") {
      dy = SPEED;
      dx = 0;
    }
    if (direction === "left") {
      dx = -SPEED;
      dy = 0;
    }
    if (direction === "up") {
      dy = -SPEED;
      dx = 0;
    }

    // calls eatApple and recordCoordinate functions, ensuring they only happen when the snake is at 25 pixel increments
    eatApple();
    recordCoordinates();
  }
}

function move() {

  // moves the snake head according to changes in dx and dy and draws the snake head
  x += dx;
  y += dy;
  fill(0, 255, 0);
  circle(x, y, 25);
}

function drawBody() {

  // fills green then iterates through locationList to draw the body, slowly darkening the colour
  fill(0, 255, 0);
  for (let i = 0; i < locationList.length; i += 2) {
    fill(0, 255 - i, 0);
    circle(locationList[i], locationList[i + 1], 25);
  }
}

function createApple() {
  if (appleJustEaten) {

    // sets a random location for the apple at 25 pixel increments
    appleX = floor(random(5, windowWidth / 25 - 5)) * 25;
    appleY = floor(random(5, windowHeight / 25 - 5)) * 25;

    // iterates across locationList to ensure the apple is not placed on a square occupied by the snake
    for (let i = 2; i < locationList.length; i += 2) {
      if (appleX === locationList[i] && appleY === locationList[i+1]) {
        overlap = true;
      }
    }

    // iterates across obstacleLocationList to ensure the apple is not placed on a square occupied by an obstacle
    for (let n = 0; n < obstacleLocationList.length; n += 2) {
      if (appleX === obstacleLocationList[n] && appleY === obstacleLocationList[n + 1]) {
        overlap = true;
      }
    }

    // if there are no issues with placement, sets appleJustEater to false an locks in the position of the apple until it is eaten by the snake
    if (!overlap) {
      appleJustEaten = false;
    }
  }

  // draws the apple at the randomized location and resets overlap
  image(apple, appleX, appleY, 25, 25);
  overlap = false;
}

function eatApple() {

  // checks if the snake head is at the locatino of the apple, and calls for a new apple and obstacle is so. Also adds 1 to the length
  if (x === appleX && y === appleY) {
    appleJustEaten = true;
    obstacleNeeded = true;
    lengthVar += 1;
  }
}

function recordCoordinates() {

  // adds the current x and y to the locationList. recall that it is called every 25 pixels
  locationList = concat([x, y], locationList);

  // removes the last two coordinates, removing the last body circle
  if (lengthVar < locationList.length / 2) {
    locationList.pop();
    locationList.pop();
  }
}

function isDead() {

  // checks if the snake head has hit the snake body and sets dead to true if so
  for (let i = 2; i < locationList.length; i += 2) {
    if (x === locationList[i] && y === locationList[i + 1]){
      dead = true; 
    }
  }

  // checks if the snake head has hit an obstacle and sets deat to be true if so
  for (let n = 0; n < obstacleLocationList.length; n += 2) {
    if (x === obstacleLocationList[n] && y === obstacleLocationList[n + 1]) {
      dead = true;
    }
  }

  // checks if the snake head has left the screen and sets dead to true if so
  if (x <= 12.5 || x >= windowWidth - 12.5 || y <= 0 || y >= windowHeight - 12.5) {
    dead = true;
  }

  // if dead, sets mode to dead and resets variable dead to false
  if (dead) {
    activeMode = "dead";
    dead = false;
  }
}

function mouseWheel(event) {

  // sets scrolling direction according to mouse scroller movement
  if (event.delta > 0) {
    scrollMode = "down";
  } 
  if (event.delta < 0) {
    scrollMode = "up";
  }
}

function scrolling() {

  // changes the position based on scrolling according to the direction set by the mouseWheel function
  if (scrollMode) {
    if (scrollMode === "down") {
      scrollingPositionChange -= 2;
    }
    if (scrollMode === "up") {
      scrollingPositionChange += 2;
    }
    if (mouseIsPressed) {
      scrollMode = "none";
    }
  }
}

function obstacle() {

  // checks if an obstacle is needed and the obstacle mode is active
  if (obstacleNeeded && obstacleActive) {

    // resets obstacle needed and generates a random obstacle location
    obstacleNeeded = false;
    obstacleX = floor(random(5, windowWidth / 25 - 5)) * 25;
    obstacleY = floor(random(5, windowHeight / 25 - 5)) * 25;

    // iterates across snake body elements to prevent overlap
    for (let i = 0; i < locationList.length; i +=2) {
      if (obstacleX === locationList[i] && obstacleY === locationList[i + 1]) {
        obstacleNeeded = true;
      }
    }

    // iterates across other obstacles to prevent overlap
    for (let n = 0; n < obstacleLocationList.length; n += 2) {
      if (obstacleX === obstacleLocationList[n] && obstacleY === obstacleLocationList[n + 1]) {
        obstacleNeeded = true;
      }
    }

    // checks it is not generated at the position of an apple
    if (obstacleX === appleX && obstacleY === appleY) {
      obstacleNeeded = true;
    }

    // if obstacle location was acceptable, pushes the coordinates 
    if (!obstacleNeeded) {
      obstacleLocationList.push(obstacleX);
      obstacleLocationList.push(obstacleY);
    }
  }

  // draws squares at the coordinates of all obstacles
  for (let b = 0; b < obstacleLocationList.length; b += 2) {
    square(obstacleLocationList[b] - 12.5, obstacleLocationList[b + 1] - 12.5, 25);
  }
}
