function setup() {
  createCanvas(1080, 1920);
  colorMode(HSB, 100);
  rectMode(CENTER);
  angleMode(DEGREES);
  background(0);
  strokeWeight(3);

  restart();
}
let SPEED;
let speedMult;

let modes = ["rainbow", "black", "random"];
let speedModes = ["fixed", "random", "mult"];
let currentMode;
let currentSpeed;
let ch, cs, cb, coff;
const restart = () => {
  b = [];
  SPEED = random(1, 2);
  speedMult = random(1, 2);

  modes = shuffle(modes);
  speedModes = shuffle(speedModes);
  currentMode = modes[0];
  currentSpeed = speedModes[0];

  ch = random(0, 100);
  cs = random(0, 100);
  cb = random(0, 100);
  coffh = random(20, 80);
  coffs = random(20, 80);
  coffb = random(20, 80);

  b.push(
    new Box(
      0 - width / 4,
      0 - height / 4,
      width / 2,
      height / 2,
      width / 2,
      height / 2,
      width,
      height,
      0,
      SPEED
    )
  );
  b.push(
    new Box(
      width / 4,
      height / 4,
      width / 2,
      height / 2,
      width / 2,
      height / 2,
      width,
      height,
      0,
      SPEED
    )
  );
};
let b = [];
const INTERACTION_KEY = 53;
function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    restart();
  }
}
function draw() {
  currentMode = modes[1];
  currentSpeed = speedModes[0];
  if (currentMode === "rainbow") {
    background(0, 10);
  } else if (currentMode === "black") {
    background(0);
  } else if (currentMode === "random") {
    background(ch + coffh, cs + coffs, cb + coffb);
  }
  for (let box of b) {
    box.display();
    box.move();
  }
}

class Box {
  constructor(x, y, w, h, px, py, pw, ph, depth, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.px = px;
    this.py = py;
    this.pw = pw;
    this.ph = ph;
    this.depth = depth;
    this.speed = speed;
    let childSpeed;
    if (currentSpeed === "fixed") {
      this.speed = this.pw / 200;
      childSpeed = this.w / 200;
    } else if (currentSpeed === "random") {
      childSpeed = random(1, 3);
    } else if (currentSpeed === "mult") {
      childSpeed = this.speed / speedMult;
    }

    this.dir = "r";
    this.children = [];
    if (depth < 6) {
      this.children.push(
        new Box(
          -this.w / 4,
          -this.h / 4,
          this.w / 2,
          this.h / 2,
          this.x,
          this.y,
          this.w,
          this.h,
          this.depth + 1,
          childSpeed
        )
      );

      this.children.push(
        new Box(
          this.w / 4,
          this.h / 4,
          this.w / 2,
          this.h / 2,
          this.x,
          this.y,
          this.w,
          this.h,
          this.depth + 1,
          childSpeed
        )
      );
    }
  }

  display() {
    push();

    translate(this.px, this.py);

    if (currentMode === "rainbow") {
      noFill();
      stroke((frameCount / 2 + this.depth * 10) % 100, 100, 100);
    } else if (currentMode === "black") {
      noStroke();
      if (this.depth % 2 === 0) {
        fill(100);
      } else {
        fill(0);
      }
    } else if (currentMode === "random") {
      if (this.depth % 2 === 0) {
        noStroke();

        fill(ch, cs, cb);
      } else {
        fill(ch + coffh, cs + coffs, cb + coffb);
      }
    }
    rect(this.x, this.y, this.w, this.h);

    if (this.children.length) {
      for (let child of this.children) {
        child.display();
        child.move();
      }
    }

    pop();
  }

  move() {
    if (this.dir === "r") {
      let rightBound = this.w / 2;
      if (this.x < rightBound) {
        this.x += this.speed;
      } else {
        this.x = rightBound;
        this.dir = "d";
      }
    } else if (this.dir === "d") {
      let bottomBound = this.h / 2;

      if (this.y < bottomBound && this.dir === "d") {
        this.y += this.speed;
      } else {
        this.y = bottomBound;
        this.dir = "l";
      }
    } else if (this.dir === "l") {
      if (this.x > -this.w / 2) {
        this.x -= this.speed;
      } else {
        this.x = -this.w / 2;
        this.dir = "u";
      }
    } else if (this.dir === "u") {
      if (this.y > -this.h / 2) {
        this.y -= this.speed;
      } else {
        this.y = -this.h / 2;
        this.dir = "r";
      }
    }
    if (this.children) {
      this.updateChild();
    }
  }

  updateChild() {
    let c = this.child;
    for (let child of this.children) {
      child.px = this.x;
      child.py = this.y;
    }
  }
}
