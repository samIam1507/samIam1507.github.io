/* eslint-disable indent */
// Sierpinski triangle demo
// Visual recursion

let initialTriangle = [];
let theDepth = 0;
let theColours = ["blye", 'cyan', 'green', 'purple', 'red', 'yellow', 'orange', 'brown', 'black'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  initialTriangle = [
    {x: width / 2, y: height / 8},
    {x: width / 8, y: 7 * height / 8},
    {x: 7 * width / 8, y: 7 * height / 8},
  ];
  background(220);
  sierpinski(initialTriangle, theDepth);
}

function draw() {
}

function sierpinski(points, depth) {
  // shell pattern

  fill(theColours[depth]);
  triangle(points[0].x, points[0].y,
           points[1].x, points[1].y,
           points[2].x, points[2].y
  );
  // escape clause
  if (depth > 0) {
    // bottom left
    sierpinski([midpoints(points[0], points[1]), 
                points[1],
                midpoints(points[1], points[2])],
                depth - 1);
    
    // bottom right
    sierpinski([midpoints(points[0], points[2]), 
                points[2],
                midpoints(points[1], points[2])],
                depth - 1);
    
    // top
    sierpinski([midpoints(points[0], points[1]), 
                points[0],
                midpoints(points[0], points[2])],
                depth - 1);
  }
  // pattern - draw three new triangles

}

function midpoints(point1, point2) {
  let midX = (point1.x + point2.x) / 2;
  let midY = (point1.y + point2.y) / 2;
  return {x: midX, y: midY};
}

function mousePressed() {
  if (theDepth < 8) {
    theDepth ++;
    background(220);
    sierpinski(initialTriangle, theDepth);
  }
}