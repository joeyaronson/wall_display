function setup() {
  rectMode(CENTER);
  createCanvas(1080, 1920);

  background(0);
  modes = [ellipse, rect];
  setVars();
  noFill();
}

let x;
let y;
let dx;
let dy;
let r;
let g;
let b;
let r2;
let g2;
let b2;
let modes;
let mode;
const INTERACTION_KEY = 53;

function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    setVars();
  }
}
function setVars() {
  background(0);

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
  mode = random(modes);
}

function draw() {
  stroke(r, g, b); //set box stroke to r,g,b color
  strokeWeight(3); //set strokeWeight of box
  fill(255, 10); //semi transparent fill for box
  mode(x, y, 50, 50); //first box
  mode(width - x, y, 50, 50); //second box
  mode(x, height - y, 50, 50); //third box
  mode(width - x, height - y, 50, 50); //fourth box

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

  if (frameCount % 20000 === 0) {
    setVars();
  }
}
