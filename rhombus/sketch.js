function setup() {
  createCanvas(1080, 1920);
  angleMode(DEGREES);
  noStroke();
  colorMode(HSB, 100);
  S90 = sin(90);
  S22 = sin(22.5);
  S67 = sin(67.5);
  a = (SIZE * S22) / S90;
  c = (SIZE * S67) / S90;
  loadRows();
}

let modes = ["rainbow", "white", "random"];
let currMode;
const INTERACTION_KEY = 53;
function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    d *= -1;
    restart();
  }
}

const loadRows = () => {
  for (let i = 20; i < width; i += SIZE * 2) {
    r.push(new Row(SIZE / 2 + i, 0, 67.5));
  }

  for (let i = -20; i < height; i += SIZE * 2) {
    r.push(new Row(0, i + SIZE / 2, 22.5));
  }
  ran1 = random(100);
  ran2 = random(100);
  ran3 = random(100);
  ranOff1 = random(20, 40);
  ranOff2 = random(40, 60);
};

const restart = () => {
  r = [];
  let temp = modes.shift();
  modes.push(temp);
  loadRows();
};

let SIZE = 60;

let S90;
let S22;
let s67;
let a;
let c;

let bg = 0;
let bg1;
let bg2;
let d = 1;

let r = [];

let ran1;
let ran2;
let ran3;
let ranOff1;
let ranOff2;
function draw() {
  currMode = modes[0];

  if (currMode === "rainbow") {
    bg += 0.05;
    bg1 = color(bg % 100, 40, 20);
    bg2 = color(bg % 100, 40, 80);
    let gradient = drawingContext.createLinearGradient(0, height, 0, 0);
    gradient.addColorStop(0, bg1.toString("#rrggbbaa"));

    gradient.addColorStop(1, bg2.toString("#rrggbbaa"));
    drawingContext.fillStyle = gradient;

    rect(0, 0, width, height);
  } else if (currMode === "white") {
    background(100);
  } else if (currMode === "random") {
    background(ran1, ran2, ran3);
  }

  for (let i = 0; i < r.length; i++) {
    r[i].display();
  }

  if (frameCount % 20000 === 0) {
    restart();
  }
}

class Row {
  constructor(x, y, a) {
    this.x = x;
    this.y = y;
    this.a = a;
    this.r = this.loadRhom();
  }

  loadRhom() {
    let row = [];
    if (this.a === 67.5) {
      for (let i = -SIZE; i <= height; i += SIZE * 2) {
        row.push(new Rhombus(this.x, i, this.a));
      }
    } else {
      for (let i = -SIZE; i <= width; i += SIZE * 2) {
        row.push(new Rhombus(i, this.y, this.a));
      }
    }
    return row;
  }

  display() {
    for (let i = 0; i < this.r.length; i++) {
      this.r[i].display();
      this.r[i].move();
    }
  }
}

class Rhombus {
  constructor(x, y, a) {
    this.x = x;
    this.y = y;
    this.a = a;
  }

  display() {
    if (currMode === "rainbow") {
      if (this.a === 67.5) {
        let b = map(this.y, 0, height, 100, 50);
        fill((this.x / 10 + this.y / 10 + frameCount / 10) % 100, 100, b);
      } else {
        let b = map(this.x, 0, width, 100, 50);

        fill((this.x / 10 + this.y / 10 + frameCount / 10 + 50) % 100, 100, b);
      }
    } else if (currMode === "white") {
      fill(0);
    } else if (currMode === "random") {
      if (this.a === 67.5) {
        fill(
          (ran1 + ranOff1) % 100,
          (ran2 + ranOff1) % 100,
          (ran3 + ranOff1) % 100
        );
      } else {
        fill(
          (ran1 + ranOff2) % 100,
          (ran2 + ranOff2) % 100,
          (ran3 + ranOff2) % 100
        );
      }
    }

    push();
    translate(this.x, this.y);
    rotate(this.a);
    beginShape();
    vertex(0, -a);
    vertex(c, 0);
    vertex(0, a);
    vertex(-c, 0);
    endShape(CLOSE);
    pop();
  }
  move() {
    if (this.a === 67.5) {
      if (this.y > height + SIZE) {
        this.y = -SIZE;
      } else if (this.y < -SIZE) {
        this.y = height + SIZE;
      } else {
        this.y -= S67 * d;
      }
    } else {
      if (this.x < -SIZE) {
        this.x = width + SIZE;
      } else if (this.x > width + SIZE) {
        this.x = -SIZE;
      } else {
        this.x += S67 * d;
      }
    }
  }
}
