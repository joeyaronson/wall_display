function setup() {
  createCanvas(1080, 1920, WEBGL);
  angleMode(DEGREES);
  rectMode(CENTER);
  colorMode(HSB, 100);

  restart();
}
const pos = [
  [-1, -1, -1],
  [-1, -1, 1],
  [-1, 1, -1],
  [-1, 1, 1],
  [1, -1, -1],
  [1, -1, 1],
  [1, 1, -1],
  [1, 1, 1],
];
const loadCubes = () => {
  c.push(new Cube(100, 0));
  c.push(new Cube(200, 361));
};

let c = [];
let minSize = 100;
let moveMode = ["x", "y", "z"];
let rotMode = ["x", "y", "z"];

let currMMode;
let currRMode;

let off;
function draw() {
  push();
  translate(0, 0, -1000);
  noStroke();
  fill(0, 15);
  rect(0, 0, width * 2, height * 2);
  pop();
  currMMode = moveMode[0];
  currRMode = rotMode[0];
  strokeWeight(sin(frameCount) * 5 + 10);
  stroke(((frameCount + off) / 10) % 100, 70, 80);
  if (currRMode === "x") {
    rotateX(frameCount / 2);
    rotateZ(-30);
  } else if (currRMode === "y") {
    rotateY(frameCount / 2);
    rotateX(-30);
  } else {
    rotateZ(frameCount / 2);
    rotateY(-30);
  }

  // sphere(30);
  for (let i = 0; i < c.length; i++) {
    c[i].display();
    c[i].move();
  }
  let p1a = c[0].ps;
  let p2a = c[1].ps;
  for (let i = 0; i < p1a.length; i++) {
    let [x, y, z] = p1a[i];
    let [x2, y2, z2] = p2a[i];

    line(x, y, z, x2, y2, z2);
  }
  for (let i = 0; i < c.length; i++) {
    c[i].ps = [];
  }

  if (frameCount % 36000 === 0) {
    restart();
  }
}

const INTERACTION_KEY = 53;
function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    restart();
  }
}

const restart = () => {
  shuffle(moveMode, true);
  shuffle(rotMode, true);
  off = random(10000);

  c = [];
  loadCubes();
  col = color(random(225), random(225), random(225));
};

const isEqual = (p, p2) => p.every((x, i) => x === p2[i]);

class Cube {
  constructor(s, t) {
    this.s = s;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.t = t;
    this.w = 0;

    this.s2 = 100;
    this.ps = [];
  }

  display() {
    for (let p of pos) {
      let [px, py, pz] = p;
      this.ps.push([
        this.x + px * (this.s + this.s2),
        this.y + py * (this.s + this.s2),
        this.z + pz * (this.s + this.s2),
      ]);
      for (let p2 of pos) {
        let [px2, py2, pz2] = p2;

        let diag =
          (px !== px2 && py !== py2) ||
          (px !== px2 && pz !== pz2) ||
          (pz !== pz2 && py !== py2);
        if (!isEqual(p, p2) && !diag) {
          line(
            this.x + px * (this.s + this.s2),
            this.y + py * (this.s + this.s2),
            this.z + pz * (this.s + this.s2),
            this.x + px2 * (this.s + this.s2),
            this.y + py2 * (this.s + this.s2),
            this.z + pz2 * (this.s + this.s2)
          );
        }
      }
    }
  }

  move() {
    if (this.t <= 180) {
      this.s = +cos(this.t + 180) * 100 + this.s2;

      if (currMMode === "x") {
        this.x = -sin(this.t) * 500;
      } else if (currMMode === "y") {
        this.y = -sin(this.t) * 500;
      } else {
        this.y = -sin(this.t) * 500;
      }

      this.t++;
    } else {
      this.w++;
      this.s2 -= 200 / 180;
    }

    if (this.w > 180) {
      this.t = 0;
      this.w = 0;
      this.s2 = 100;
    }
  }
}
