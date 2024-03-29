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
  for (let i = 0; i < 20; i++) {
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
  blackv = [h, s, b];
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
  blackv2 = [h, s, b];
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
    this.x += this.sx;
    this.y += this.sy;
    this.checkBounds();
  }

  flipX() {
    this.sx *= -1;
  }

  flipY() {
    this.sy *= -1;
  }

  checkBounds() {
    let halfW = this.w / 2;
    //chaotic collision
    //     let x1 = this.x - halfW;
    //     let x2 = this.x + halfW;
    //     let y1 = this.y - halfW;
    //     let y2 = this.y + halfW;
    //     let ignore = this.mode === "black" ? "black" : "white";
    //     let filtered = br.filter((x) => x.mode !== ignore);
    //     for (let brick of filtered) {
    //       if (
    //         abs(y1 - brick.y) < SPEEDMULT / 2 &&
    //         this.x + this.w / 2 > brick.x - brick.w / 2 &&
    //         this.x - this.w / 2 < brick.x + brick.w / 2
    //       ) {
    //         this.y += this.w;
    //         this.flipY();
    //         brick.flipColor();
    //         break;
    //       }
    //       if (
    //         abs(y2 - brick.y) < SPEEDMULT / 2 &&
    //         this.x + this.w / 2 > brick.x - brick.w / 2 &&
    //         this.x - this.w / 2 < brick.x + brick.w / 2
    //       ) {
    //         this.y -= this.w;

    //         this.flipY();
    //         brick.flipColor();
    //         break;
    //       }
    //       if (
    //         abs(x1 - brick.x) < SPEEDMULT / 2 &&
    //         this.y + this.w / 2 > brick.y - brick.w / 2 &&
    //         this.y - this.w / 2 < brick.y + brick.w / 2
    //       ) {
    //         this.x -= this.w;
    //         this.flipX();
    //         brick.flipColor();
    //         break;
    //       }
    //       if (
    //         abs(x2 - brick.x) < SPEEDMULT / 2 &&
    //         this.y + this.w / 2 > brick.y - brick.w / 2 &&
    //         this.y - this.w / 2 < brick.y + brick.w / 2
    //       ) {
    //         this.x += this.w;

    //         this.flipX();
    //         brick.flipColor();
    //         break;
    //       }
    //     }

    let left = this.x - halfW;
    let right = this.x + halfW;
    let up = this.y - halfW;
    let down = this.y + halfW;
    let ignore = this.mode === "black" ? "black" : "white";
    let filtered = br.filter((x) => x.mode !== ignore);
    for (let brick of filtered) {
      const brickX = brick.x;
      const brickY = brick.y;
      const brickW = brick.w;
      const halfBrick = brickW / 2;
      const [brickLeft, brickRight, brickUp, brickDown] = [
        brickX - halfBrick,
        brickX + halfBrick,
        brickY - halfBrick,
        brickY + halfBrick,
      ];

      // if (left < brickRight && this.y > brickDown && this.y < brickUp) {
      //   this.x = brickRight + halfW;
      //   this.flipX();
      //   this.flipColor();
      //   break;
      // }

      if (
        right > brickLeft &&
        left < brickRight &&
        abs(down - brickUp) < SPEEDMULT / 2
      ) {
        this.y = brickUp - halfW;
        this.flipY();
        brick.flipColor();
        break;
      }
      if (
        right > brickLeft &&
        left < brickRight &&
        abs(up - brickDown) < SPEEDMULT / 2
      ) {
        this.y = brickDown + halfW;
        this.flipY();
        brick.flipColor();
        break;
      }

      if (
        up < brickDown &&
        down > brickUp &&
        abs(right - brickLeft) < SPEEDMULT / 2
      ) {
        this.x = brickLeft - halfW;
        this.flipX();
        brick.flipColor();
        break;
      }

      if (
        up < brickDown &&
        down > brickUp &&
        abs(left - brickRight) < SPEEDMULT / 2
      ) {
        this.x = brickRight + halfW;
        this.flipX();
        brick.flipColor();
        break;
      }
    }

    if (this.x < halfW) {
      this.x = halfW;
      this.flipX();
    } else if (this.x > width - halfW) {
      this.x = width - halfW;
      this.flipX();
    }
    if (this.y < halfW) {
      this.y = halfW;
      this.flipY();
    } else if (this.y > height - halfW) {
      this.y = height - halfW;
      this.flipY();
    }
  }
}

class Brick {
  constructor(x, y, mode) {
    this.x = x;
    this.y = y;
    this.mode = mode;
    this.next = mode;
    this.w = SIZE;
  }

  display() {
    this.mode = this.next;
    if (this.mode === "black") {
      fill(lerpColor(twhite, twhite2, map(colorCount, 0, 100, 0, 1)));
    } else {
      fill(lerpColor(tblack, tblack2, map(colorCount, 0, 100, 0, 1)));
    }
    rect(this.x, this.y, this.w, this.w);
  }

  flipColor() {
    this.next = this.mode === "black" ? "white" : "black";
  }
}
