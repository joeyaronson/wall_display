function setup() {
  angleMode(DEGREES);
  rectMode(CENTER);
  colorMode(HSB, 255);
  noStroke();
  createCanvas(1080, 1920);
  background(0);
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
        random(height / 2 + height / 4, height - SIZE),
        "white"
      )
    );
    b1.push(
      new Ball(random(SIZE, width - SIZE), random(SIZE, height / 4), "black")
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
let SIZE = 30;
let colorCount = 200;
let black, white, black2, white2;
let tblack, twhite, tblack2, twhite2;

let whitev, blackv, whitev2, blackv2;
function draw() {
  displayBricks();
  displayBalls();
  if (colorCount < 200) {
    colorCount++;
  }

  if (frameCount % 1000 === 0) {
    colorCount = 0;
    shiftColors();
    chooseSecondaryColors();
  }
  // noLoop();
}

const shiftColors = () => {
  black = black2;
  white = white2;
  tblack = tblack2;
  twhite = twhite2;
};

const chooseColors = () => {
  let h, s, b;

  h = random(255);
  s = random(255);
  b = random(255);
  blackv = [
    (h + random(30, 225)) % 255,
    (s + random(30, 225)) % 255,
    (b + random(30, 225)) % 255,
  ];
  black = color(...blackv);
  tblack = color(...blackv, 70);
  whitev = [
    (h + random(30, 225)) % 255,
    (s + random(30, 225)) % 255,
    (b + random(30, 225)) % 255,
  ];
  white = color(...whitev);
  twhite = color(...whitev, 70);
};

const chooseSecondaryColors = () => {
  let h, s, b;
  h = random(255);
  s = random(255);
  b = random(255);
  blackv2 = [
    (h + random(30, 225)) % 255,
    (s + random(30, 225)) % 255,
    (b + random(30, 225)) % 255,
  ];
  black2 = color(...blackv2);
  tblack2 = color(...blackv2, 70);
  whitev2 = [
    (h + random(30, 225)) % 255,
    (s + random(30, 225)) % 255,
    (b + random(30, 225)) % 255,
  ];
  white2 = color(...whitev2);
  twhite2 = color(...whitev2, 70);
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
    let startAngle;
    do {
      startAngle = random(0, 360);
    } while (startAngle % 90 < 20);
    this.sx = sin(startAngle) * SPEEDMULT;
    this.sy = cos(startAngle) * SPEEDMULT;
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
        abs(y1 - brick.y) < SPEEDMULT / 2 &&
        this.x + this.w / 2 > brick.x - brick.w / 2 &&
        this.x - this.w / 2 < brick.x + brick.w / 2
      ) {
        this.y += this.w;
        this.flipY();
        brick.flipColor();
        break;
      }
      if (
        abs(y2 - brick.y) < SPEEDMULT / 2 &&
        this.x + this.w / 2 > brick.x - brick.w / 2 &&
        this.x - this.w / 2 < brick.x + brick.w / 2
      ) {
        this.y -= this.w;

        this.flipY();
        brick.flipColor();
        break;
      }
      if (
        abs(x1 - brick.x) < SPEEDMULT / 2 &&
        this.y + this.w / 2 > brick.y - brick.w / 2 &&
        this.y - this.w / 2 < brick.y + brick.w / 2
      ) {
        this.x -= this.w;
        this.flipX();
        brick.flipColor();
        break;
      }
      if (
        abs(x2 - brick.x) < SPEEDMULT / 2 &&
        this.y + this.w / 2 > brick.y - brick.w / 2 &&
        this.y - this.w / 2 < brick.y + brick.w / 2
      ) {
        this.x += this.w;

        this.flipX();
        brick.flipColor();
        break;
      }
    }

    if (this.x < halfW) {
      this.x += halfW;
      this.flipX();
    } else if (this.x > width - halfW) {
      this.x -= halfW;
      this.flipX();
    }
    if (this.y < halfW) {
      this.flipY();
    } else if (this.y > height - halfW) {
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
