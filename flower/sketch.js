function setup() {
  createCanvas(1080, 1920);
  rectMode(CENTER);
  angleMode(DEGREES);

  colors = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255)];
  strokeWeight(50);
  noFill();
  makeNodes();
}
let nodes = [];
let num = 180;
let thick;
let colors;
let bgMode = true;
const INTERACTION_KEY = 53;

function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    bgMode = !bgMode;
  }
}
function draw() {
  blendMode(BLEND);
  background(bgMode ? 255 : 0);
  // turn on exclusion
  blendMode(EXCLUSION);
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].display();
    nodes[i].move();
  }
}

function makeNodes() {
  let count = 36;
  nodes.splice(0, nodes.length);
  num = 360 / count;

  let counter = 0;
  for (let i = 0; i < 360; i += num) {
    nodes.push(new node(width / 2, height / 2, i, counter));
    counter++;
  }
}

class node {
  constructor(x, y, a, c) {
    this.x = x;
    this.y = y;
    this.a = a;
    this.i = c;
  }

  move() {
    this.a += 0.125;
    this.x = this.x + sin(this.a * 2.5);
    this.y = this.y + cos(this.a * 2.5);
  }

  display() {
    stroke(colors[this.i % 3]);
    fill(colors[(this.i + 1) % 3]);
    ellipse(this.x, this.y, 200, 200, 50);
  }
}
