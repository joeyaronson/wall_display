function setup() {
  createCanvas(1080, 1920);
  MAX = width > height ? width : height;
  angleMode(DEGREES);
  rectMode(CENTER);
  colorMode(HSB, 360);
  modes = shuffle(modes);
  shapeModes = shuffle(shapeModes);

  strokeWeight(0.5);
  loadNodes();
  noFill();
}
let SPACE = 150;
let n = [];
let MAX;
let NOISE_VAL = 0.008;
let NOISE_VAL2 = 0.002;
let modes = ["static", "diag", "ripple", "wave"];
let shapeModes = ["rect", "ellipse", "hex"];
let currMode;

let aOff = 1;
let bOff = 10;

const INTERACTION_KEY = 53;
function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    restart();
  }
}

const restart = () => {
  let temp = modes.shift();
  modes.push(temp);
  shapeModes = shuffle(shapeModes);

  n = [];
  loadNodes();
  aOff = random(1, 5);
  bOff = random(5, 20);
};

function draw() {
  background(0, 20);
  currMode = modes[0];
  currShapeMode = shapeModes[0];
  displayNodes();
  if (frameCount % 10000 === 0) {
    restart();
  }
}

displayNodes = () => {
  for (let i = 0; i < n.length; i++) {
    for (let j = 0; j < n[i].length; j++) {
      n[i][j].display();
      n[i][j].move();
    }
  }
};

loadNodes = () => {
  for (let i = 0; i < width / SPACE; i++) {
    row = [];
    for (let j = 0; j < (height / SPACE) * sqrt(3); j++) {
      let offset = 0;
      if (j % 2 === 0) {
        offset = SPACE / 2;
      }
      row.push(new Node(i * SPACE + offset, j * (SPACE / 2) * sqrt(3), i, j));
    }
    n.push(row);
  }
};

const polygon = (x, y, radius, npoints) => {
  let angle = 360 / npoints;
  beginShape();
  for (let a = 0; a < 360; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
};

class Node {
  constructor(x, y, i, j) {
    this.x = x;
    this.y = y;
    this.a = 0;
    this.nx = this.x + (sin(this.a) * SPACE) / 4;
    this.ny = this.y + (cos(this.a) * SPACE) / 4;
    this.i = i;
    this.j = j;
    this.s = SPACE / 1.5;
  }

  display() {
    if (currMode === "ripple") {
      this.d = dist(this.x, this.y, width / 2, height / 2);
    } else if (currMode === "wave") {
      this.d = this.y / 2;
    } else if (currMode === "diag") {
      this.d = atan2(this.x, this.y);
    } else if (currMode === "static") {
      this.d = 10;
      stroke(
        ((dist(this.x, this.y, width / 2, height / 2) + frameCount) / 2) % 360,
        360,
        360
      );
    }
    if (currMode !== "static") {
      stroke(((this.d + frameCount) / 2) % 360, 360, 360);
    }
    push();
    translate(this.x, this.y);
    if (currShapeMode === "rect") {
      rotate(this.d * 10 + frameCount);
      rect(0, 0, this.s, this.s, (sin(-this.d + frameCount) + 1) * 10);
    } else if (currShapeMode === "ellipse") {
      ellipse(0, 0, this.s, this.s);
    } else if (currShapeMode === "hex") {
      polygon(0, 0, this.s, 6);
    }

    pop();
  }
  move() {
    this.s += sin(frameCount - this.d / aOff + cos(this.d) * bOff) * 1.5;
  }
}
