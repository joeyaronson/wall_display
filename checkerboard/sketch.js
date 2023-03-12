function setup() {
  createCanvas(1080, 1920);
  noStroke();
  angleMode(DEGREES);
  restart();
  background(0);
}
let fc;
let RAN1;
let RAN2;
let RAN3;
let RAN4;
let RAN5;
let RAN6;
let colors;
let currentMoveMode;
let currentColorMode;
let currentBlurMode;
let w = [];

let moveModes = ["linear", "static", "sin", "slide"];
let colorModes = ["black", "white", "rgbl", "rgbd", "cmykl", "cmykd"];

const INTERACTION_KEY = 53;
function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    restart();
  }
}

const restart = () => {
  w = [];
  moveModes = shuffle(moveModes);
  colorModes = shuffle(colorModes);
  RAN1 = random(1, 5);
  RAN2 = random(10, 25);
  RAN3 = random(1, 15);
  RAN4 = random(0, 360);
  RAN5 = random(100, 400);
  RAN6 = random(0.25, 1);
  colorsRGB = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255)];
  colorsCMYK = [color(255, 0, 255), color(255, 255, 0), color(0, 255, 255)];
  loadWaves();
};
const loadWaves = () => {
  for (let i = 0; i < RAN2; i++) {
    w.push(new Wave(i * 100, i));
  }
};

function draw() {
  currentMoveMode = moveModes[0];
  currentColorMode = colorModes[0];
  fc = frameCount + RAN4;
  blendMode(BLEND);
  if (["black", "cmykd", "rgbd"].includes(currentColorMode)) {
    background(0);
  } else if (["white", "cmykl", "rgbl"].includes(currentColorMode)) {
    background(255);
  }
  blendMode(EXCLUSION);

  for (let wave of w) {
    wave.display();
    wave.move();
  }

  if (frameCount % 5000 === 0) {
    restart();
  }
}

class Wave {
  constructor(a, i) {
    this.amp = RAN5;
    this.freq = RAN6;
    this.a = a;
    this.i = i;
  }

  display() {
    if (["rgbl", "rgbd"].includes(currentColorMode)) {
      fill(colorsRGB[this.i % 3]);
    } else if (currentColorMode === "black") {
      fill(255);
    } else if (currentColorMode === "white") {
      fill(255);
    } else if (["cmykd", "cmykl"].includes(currentColorMode)) {
      fill(colorsCMYK[this.i % 3]);
    }

    beginShape();
    vertex(width / 2, 0);
    for (let i = 0; i < height; i += 15) {
      let d = map(abs(height / 2 - i), 0, height / 2, 360, 10);

      vertex(
        width / 2 +
          sin(i * this.freq + this.a) *
            this.amp *
            sin(d + cos(fc / 100 + RAN4) * width + fc),
        i
      );
    }
    vertex(width / 2, height);
    endShape(CLOSE);
  }

  move() {
    this.freq += cos(this.i + fc) / 1000;
    if (currentMoveMode === "linear") {
      this.a -= 2;
    } else if (currentMoveMode === "sin") {
      this.a += cos(sin(fc + this.i * RAN3) * 360);
    } else if (currentMoveMode === "slide") {
      this.a -= this.i / 10;
    }
    this.amp += sin(this.i * RAN1 + fc);
  }
}
