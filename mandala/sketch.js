function setup() {
  rectMode(CENTER);
  createCanvas(720, 1280);

  background(0);
  setVars();
  noFill();
}

var x; //starting x variable for box
var y; //starting y variable for box
var dx;
var dy;
var r;
var g;
var b;
var r2;
var g2;
var b2;

const setVars = () => {
  x = width / 2;
  y = height / 2;
  dx = random(50, width - 50);
  dy = random(50, height - 50);
  r = random(200);
  g = random(200);
  b = random(200);
  r2 = random(1, 3);
  g2 = random(1, 3);
  b2 = random(1, 3);
};

function draw() {
  stroke(r, g, b); //set box stroke to r,g,b color
  strokeWeight(3); //set strokeWeight of box
  // fill(255,10);				//semi transparent fill for box
  rect(x, y, 50, 50); //first box
  rect(width - x, y, 50, 50); //second box
  rect(x, height - y, 50, 50); //third box
  rect(width - x, height - y, 50, 50); //fourth box

  if (x < dx) {
    //moves x towards dx in positive direction
    x = x + 1;
  }
  if (x > dx) {
    //moves x towards dx in negative direction
    x = x - 1;
  }
  if (y < dy) {
    //moves y towards dy in positive direction
    y = y + 1;
  }
  if (y > dy) {
    //moves y towards dy in negative direction
    y = y - 1;
  }

  if (r < 0 || r > 200) {
    //flips red at 200 and 0
    r2 = -r2;
  }

  if (g < 0 || g > 200) {
    //flips gren at 200 and 0
    g2 = -g2;
  }

  if (b < 0 || b > 200) {
    //flips blue at 200 and 0
    b2 = -b2;
  }

  if (dist(x, y, dx, dy) < 5) {
    //generates new destination variables when box
    //has reached the original destination
    dx = random(50, width - 50);
    dy = random(50, height - 50);
  }

  r += r2; //increment colors
  g += g2;
  b += b2;
  
  if(frameCount %20000 === 0){
    background(0)
    setVars();
  }
}
