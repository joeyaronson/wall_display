//2018 joey aronson
function setup() {
  createCanvas(1080, 1920);
  angleMode(DEGREES);
  strokeWeight(2.3);
  colorMode(HSB, 100);
  frameRate(20);
  background(0);
  loadB();
}

const loadB = () => {
  for (let i = height - 550; i <= height + 500; i += 150) {
    b.push(new Burst(width / 2, height / 2, i));
  }
};
const INTERACTION_KEY = 53;

function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    dir *= -1;
  }
}

let b = [];
let timer = 0;

let noiseScale = 0.08;
let n = 10;

let col = 0;

let y = -50;
let x = 0;

let dir = -1;
function draw() {
  background(0, 3);
  noFill();

  for (let i = 0; i < b.length; i++) {
    b[i].display();
    b[i].grow();
  }
}

class Burst {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;

    this.c = random(0, 100);

    this.size = s;
    this.done = false;

    this.timer = 0;
  }

  display() {
    fill(255, 0.1);
    let b = map(this.size,-200,height-100,0,100)
    stroke(this.c % 100, 100, b);

    beginShape();
    for (let i = 1; i < 360; i += 1) {
      let xn = noise((this.x + i) * noiseScale, frameCount * noiseScale);
      let yn = noise(frameCount * noiseScale, (this.y + i) * noiseScale);
      vertex(
        this.x + sin(i) * (this.size + xn * 80),
        this.y + cos(i) * (this.size + yn * 80)
      );
    }
    endShape(CLOSE);
  }

  grow() {
    this.size += 2.5 * dir;

    this.c += 1;

    if (dir < 0 && this.size < 0) {
      this.size = height - 350;
      this.c = random(100);
    }

    if (dir > 0 && this.size > height + 200) {
      this.size = 0;
    }
  }
}
//2018 joey aronson
