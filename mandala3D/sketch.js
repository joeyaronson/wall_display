function setup() {
  rectMode(CENTER);
  angleMode(DEGREES);
  createCanvas(1080, 1920, WEBGL);
  setVars();
}

const INTERACTION_KEY = 53;

function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    setVars();
  }
}

const setVars = () => {
  x = 0;
  y = 0;
  z = 0;
  dx = random(-width / 2, width / 2);
  dy = random(-height / 2, height / 2);
  dz = random(-500, 500);

  r = random(200);
  g = random(200);
  b = random(200);
  r2 = random(1, 3);
  g2 = random(1, 3);
  b2 = random(1, 3);
  mode = random(modes);
  background(0);
};

let x;
let y;
let z;
let dx;
let dy;
let dz;
let r;
let g;
let b;
let r2;
let g2;
let b2;
let modes = ["x", "y", "z"];
let mode;

function draw() {
  if (mode === "x") {
    rotateX(frameCount / 10);
  } else if (mode === "y") {
    rotateY(frameCount / 10);
  } else if (mode === "z") {
    rotateZ(frameCount / 10);
  }
  stroke(r, g, b);
  strokeWeight(3);
  fill(255, 10);
  push();
  translate(x, y, z);
  box(50);
  pop();
  push();
  translate(-x, y, z);
  box(50);
  pop();
  push();
  translate(x, -y, z);
  box(50);
  pop();
  push();
  translate(-x, -y, z);
  box(50);
  pop();

  push();
  translate(x, y, -z);
  box(50);
  pop();
  push();
  translate(-x, y, -z);
  box(50);
  pop();
  push();
  translate(x, -y, -z);
  box(50);
  pop();
  push();
  translate(-x, -y, -z);
  box(50);
  pop();

  if (x < dx) {
    x = x + 1;
  }
  if (x > dx) {
    x = x - 1;
  }
  if (y < dy) {
    y = y + 1;
  }
  if (y > dy) {
    y = y - 1;
  }

  if (z < dz) {
    z = z + 1;
  }
  if (z > dz) {
    z = z - 1;
  }

  if (r < 0 || r > 200) {
    r2 = -r2;
  }

  if (g < 0 || g > 200) {
    g2 = -g2;
  }

  if (b < 0 || b > 200) {
    b2 = -b2;
  }
  if (dist(x, y, z, dx, dy, dz) < 5) {
    dx = random(-width / 2, width / 2);
    dy = random(-height / 2, height / 2);
    dz = random(-500, 500);
  }

  r += r2;
  g += g2;
  b += b2;

  if (frameCount % 20000 === 0) {
    setVars();
  }
}
