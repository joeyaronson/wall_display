function setup() {
  createCanvas(1080, 1920);
  angleMode(DEGREES);
  colorMode(HSB, 360);
  strokeWeight(0.2);
  background(0);
  loadParticles();
}

let noiseVal;
let p = [];
let offset;
const INTERACTION_KEY = 53;

function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    restart();
  }
}
function draw() {
  for (let i = 0; i < p.length; i++) {
    p[i].move();
    p[i].display();
  }

  if (p.every((x) => x.burnt)) {
    restart();
  }
}

const restart = () => {
  background(0);
  p = [];
  loadParticles();
};

class Particle {
  constructor(x, y, i) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.burnt = false;
  }

  move() {
    this.n = noise(this.x * noiseVal, this.y * noiseVal, frameCount * noiseVal);
    let noi = map(this.n, 0, 1, -360, 360);
    this.x += sin(noi) / 3;
    this.y += cos(noi) / 3;
    this.x += sin(this.i) / 2;
    this.y += cos(this.i) / 2;
  }

  display() {
    let d = dist(this.x, this.y, width / 2, height / 2);
    let h = map(this.n, 0, 1, -50, 410);
    stroke((d / 1.5 + h + offset) % 360, 360, 360);
    point(this.x, this.y);
    if (
      this.y > height + 50 ||
      this.y < -50 ||
      this.x > width + 50 ||
      this.x < -50
    ) {
      this.burnt = true;
    }
  }
}

function loadParticles() {
  for (let i = 0; i < 360; i += 0.25) {
    p.push(
      new Particle(width / 2 + sin(i) * 200, height / 2 + cos(i) * 200, i)
    );
  }
  noiseVal = random(0.0008, 0.02);
  offset = random(360);
}
