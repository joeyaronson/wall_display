let SIZE = 20;
let b = [];
function setup() {
  createCanvas(1080, 1920);
  colorMode(HSB, 100);
  angleMode(DEGREES);
  loadBoxes();
  noStroke();
}
let modifier = 2;
const INTERACTION_KEY = 53;

function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    SIZE -= 2;
    if (SIZE < 7) {
      SIZE = 30
    }
    b = []
    loadBoxes()
  }
}
function loadBoxes() {
  for (let i = 0; i < width; i += SIZE) {
    for (let j = 0; j < height; j += SIZE) {
      b.push(new Box(i, j));
    }
  }
}

function draw() {
  for (let box of b) {
    box.display();
  }
}

class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    let d = dist(this.x, this.y, width / 2, height / 2);
    let val =
      (sin(this.x) + cos(frameCount) * d) ^ (cos(this.y) * sin(frameCount / 2));
    fill(
      (((val + frameCount / modifier) & (d / 10)) + frameCount) % 100,
      100,
      100
    );
    rect(this.x, this.y, SIZE);
  }
}
