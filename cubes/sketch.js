let COUNT = 6;
let SIZE = 25;
let NOISE_VAL = 0.004;
let b = [];
let fc;
function setup() {
  createCanvas(1080, 1920, WEBGL);
  colorMode(HSB, 360);
  angleMode(DEGREES);
  rectMode(CENTER);
  loadBoxes();
  noStroke();
  // strokeWeight(2)
}
const INTERACTION_KEY = 53;

function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    COUNT = 7 + (COUNT + 1) % 7;
    b = [];
    loadBoxes();
  }
}

function draw() {
  fc = frameCount;
  background(300);
  camera(sin(fc) * 600, cos(fc) * 100, 600, 0, 0, 0, 0, 1, 0);
  ambientLight(360, 0, 360);

  pointLight(360, 90, 180, (sin(fc) * width) / 5, (cos(fc) * width) / 5, 0);

  rotateX(60);
  rotateZ(45);
  for (let box of b) {
    push();
    box.display();
    box.move();
    pop();
  }
}

function loadBoxes() {
  for (let i = 0; i < COUNT; i++) {
    for (let j = 0; j < COUNT; j++) {
      b.push(new Box(i, j, COUNT / 2));
    }
  }
}

class Box {
  constructor(x, y, z) {
    this.x = -SIZE * (COUNT / 2) + x * SIZE;
    this.y = -SIZE * (COUNT / 2) + y * SIZE;
    this.z = -SIZE * (COUNT / 2) + z * SIZE;
    this.off = 1;
  }

  display() {
    let d = dist(this.x, this.y, 0, 0) * 2;
    let dx = map(d, 0, width / 2, SIZE / 2, SIZE * 4);
    let nx = 10;
    translate(this.x * this.off, this.y * this.off, this.z);
    specularMaterial((dx * 5 + fc) % 360, 360, 360);

    box(SIZE, SIZE, cos((fc + dx) * 5) * 50 + 60);
  }

  move() {
    this.off += sin(fc * 2) / 100;
  }
}

pad = (a, b) => (1e15 + a + "").slice(-b);
