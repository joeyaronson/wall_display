function setup() {
  angleMode(DEGREES);
  rectMode(CENTER);
  noStroke();
  createCanvas(1080, 1920);
  restart();
}

const restart = () => {
  b1 = [];
  br = [];
  chooseColors();
  chooseSecondaryColors();
  for (let i = 0; i < 10; i++) {
    b1.push(
      new Ball(
        random(SIZE, width - SIZE),
        random(height / 2, height - SIZE),
        "white"
      )
    );
    b1.push(
      new Ball(random(SIZE, width - SIZE), random(SIZE, height / 2), "black")
    );
  }
  for (let i = 0; i < width / SIZE; i++) {
    for (let j = 0; j < height / SIZE; j++) {
      br.push(
        new Brick(
          SIZE / 2 + i * SIZE,
          SIZE / 2 + j * SIZE,
          SIZE + j * SIZE < height / 2 ? "black" : "white"
        )
      );
    }
  }
};

const INTERACTION_KEY = 53;
function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    restart();
  }
}
let b1 = [];

let br = [];
let SPEEDMULT = 8;
let SIZE = 40;
let colorCount = 200;
let r, g, b;
let black, white, black2, white2;
let tblack, twhite, tblack2, twhite2;
function draw() {
  displayBricks();
  displayBalls();
  if (colorCount < 200) {
    colorCount++;
  }

  if (frameCount % 2000 === 0) {
    colorCount = 0;
    shiftColors();
    chooseSecondaryColors();
  }
}

const shiftColors = () => {
  black = black2;
  white = white2;
  tblack = tblack2;
  twhite = twhite2;
};

const chooseColors = () => {
  r = random(255);
  g = random(255);
  b = random(255);
  let blackv = [
    (r + random(30, 225)) % 255,
    (g + random(30, 225)) % 255,
    (b + random(30, 225)) % 255,
  ];
  black = color(...blackv);
  tblack = color(...blackv, 70);
  let whitev = [
    (r + random(30, 225)) % 255,
    (g + random(30, 225)) % 255,
    (b + random(30, 225)) % 255,
  ];
  white = color(...whitev);
  twhite = color(...whitev, 70);
};

const chooseSecondaryColors = () => {
  r = random(255);
  g = random(255);
  b = random(255);
  let blackv = [
    (r + random(30, 225)) % 255,
    (g + random(30, 225)) % 255,
    (b + random(30, 225)) % 255,
  ];
  black2 = color(...blackv);
  tblack2 = color(...blackv, 70);
  let whitev = [
    (r + random(30, 225)) % 255,
    (g + random(30, 225)) % 255,
    (b + random(30, 225)) % 255,
  ];
  white2 = color(...whitev);
  twhite2 = color(...whitev, 70);
};

const displayBalls = () => {
  for (let b of b1) {
    b.display();
    b.move();
  }
};

const displayBricks = () => {
  for (let b of br) {
    b.display();
  }
};

class Ball {
  constructor(x, y, mode) {
    this.x = x;
    this.y = y;
    this.w = SIZE / 2;
    this.mode = mode;
    this.sa = random(0, 360);
    this.sx = sin(this.sa) * SPEEDMULT;
    this.sy = cos(this.sa) * SPEEDMULT;
  }
  display() {
    if (this.mode === "black") {
      fill(lerpColor(black, black2, map(colorCount, 0, 100, 0, 1)));
    } else {
      fill(lerpColor(white, white2, map(colorCount, 0, 100, 0, 1)));
    }
    ellipse(this.x, this.y, this.w, this.w);
  }

  move() {
    this.checkBounds();
    this.x += this.sx;
    this.y += this.sy;
  }

  flipX() {
    this.sx *= -1;
  }

  flipY() {
    this.sy *= -1;
  }

  checkBounds() {
    let halfW = this.w / 2;

    let x1 = this.x - halfW;
    let x2 = this.x + halfW;
    let y1 = this.y - halfW;
    let y2 = this.y + halfW;
    let ignore = this.mode === "black" ? "black" : "white";
    let filtered = br.filter((x) => x.mode !== ignore);
    for (let brick of filtered) {
      if (
        (abs(x1 - brick.x) < SPEEDMULT / 2 &&
          this.y + this.w / 2 > brick.y - brick.w / 2 &&
          this.y - this.w / 2 < brick.y + brick.w / 2) ||
        (abs(x2 - brick.x) < SPEEDMULT / 2 &&
          this.y + this.w / 2 > brick.y - brick.w / 2 &&
          this.y - this.w / 2 < brick.y + brick.w / 2)
      ) {
        this.flipX();
        brick.flipColor();
        break;
      }
      if (
        (abs(y1 - brick.y) < SPEEDMULT / 2 &&
          this.x + this.w / 2 > brick.x - brick.w / 2 &&
          this.x - this.w / 2 < brick.x + brick.w / 2) ||
        (abs(y2 - brick.y) < SPEEDMULT / 2 &&
          this.x + this.w / 2 > brick.x - brick.w / 2 &&
          this.x - this.w / 2 < brick.x + brick.w / 2)
      ) {
        this.flipY();
        brick.flipColor();
        break;
      }
    }
    if (this.x < halfW || this.x > width - halfW) {
      this.flipX();
    }
    if (this.y < halfW || this.y > height - halfW) {
      this.flipY();
    }
  }
}

class Brick {
  constructor(x, y, mode) {
    this.x = x;
    this.y = y;
    this.mode = mode;
    this.w = SIZE;
  }

  display() {
    if (this.mode === "black") {
      fill(lerpColor(twhite, twhite2, map(colorCount, 0, 100, 0, 1)));
    } else {
      fill(lerpColor(tblack, tblack2, map(colorCount, 0, 100, 0, 1)));
    }
    rect(this.x, this.y, this.w, this.w);
  }

  flipColor() {
    this.mode = this.mode === "black" ? "white" : "black";
  }
}
