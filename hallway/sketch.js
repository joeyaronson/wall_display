function setup() {
  rectMode(CENTER);
  colorMode(HSB, 100);
  angleMode(DEGREES);
  createCanvas(1080, 1920);
  loadRand();
}
let r = [];
let noiseVal = 0.01;
let modes = ["rainbow", "white", "black", "random"];
let mI = 0;

let wait = false;
let waitCount = 0;
let rainCol = 0;
let ch;
let cs;
let cb;
const INTERACTION_KEY = 53;
function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    mI++;
  }
}

const loadRand = () => {
  ch = random(0, 100);
  cs = random(0, 100);
  cb = random(0, 100);
};
function draw() {
  background(220);

  if (modes[mI % modes.length] === "rainbow") {
    background(rainCol % 100, 80, 20);
  } else if (modes[mI % modes.length] === "white") {
    background(100, 0, 20);
  } else if (modes[mI % modes.length] === "black") {
    background(0);
  } else if (modes[mI % modes.length] === "random") {
    background(ch, cs, 20);
  }
  if (wait) {
    waitCount++;
  }

  let nOffx = sin(cos(frameCount / 2) * 360) * 20;
  let nOffy = cos(sin(frameCount / 2) * 360) * 20;

  if (frameCount % 16 === 0 && !wait) {
    r.unshift(
      new Rec(
        width / 2 + nOffx,
        height / 2 + nOffy,
        3,
        frameCount / 3,
        modes[mI % modes.length]
      )
    );
  }

  for (let i = 0; i < r.length; i++) {
    r[i].display(i);
    r[i].move();
    if (i !== 0) {
      const curRec = r[i];
      const nextRec = r[i - 1];
      const sx = curRec.x;
      const sy = curRec.y;

      const ex = nextRec.x;
      const ey = nextRec.y;
      let br = map(r[i].s, 0, 720, 20, 100);

      if (["rainbow", "white"].includes(curRec.mode)) {
        stroke(0);
      } else if (curRec.mode === "black") {
        stroke(100, 0, br);
      } else if (curRec.mode === "random") {
        stroke((ch + 50) % 100, (cs + 50) % 100, br);
      }
      line(
        sx - curRec.s / 2,
        sy - (curRec.s * 1.777) / 2,
        ex - nextRec.s / 2,
        ey - (nextRec.s * 1.777) / 2
      );
      line(
        sx + curRec.s / 2,
        sy + (curRec.s * 1.777) / 2,
        ex + nextRec.s / 2,
        ey + (nextRec.s * 1.777) / 2
      );

      line(
        sx + curRec.s / 2,
        sy - (curRec.s * 1.777) / 2,
        ex + nextRec.s / 2,
        ey - (nextRec.s * 1.777) / 2
      );
      line(
        sx - curRec.s / 2,
        sy + (curRec.s * 1.777) / 2,
        ex - nextRec.s / 2,
        ey + (nextRec.s * 1.777) / 2
      );
    }
  }

  if (waitCount > 500) {
    wait = false;
    waitCount = 0;
    loadRand();
  }

  r = r.filter((x) => !x.burnt);

  if (frameCount % 2000 === 0) {
    let oMode = modes[mI % modes.length];
    modes = shuffle(modes);
    if (oMode === "random" && modes[mI % modes.length] === "random") {
      mI++;
    }
    wait = true;
    rainCol = (frameCount + 500) / 3;
  }
}

class Rec {
  constructor(x, y, s, c, mode) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.s2 = 0.01;
    this.burnt = false;
    this.c = c;
    this.mode = mode;
  }
  display(i) {
    let br = map(this.s, 0, 720, 20, 100);

    if (["rainbow", "white"].includes(this.mode)) {
      stroke(0);
    } else if (this.mode === "black") {
      stroke(100, 0, br);
    } else if (this.mode === "random") {
      stroke((ch + 50) % 100, (cs + 50) % 100, br);
    }
    noFill();

    let sw = this.s2 * 1.5;
    strokeWeight(sw);
    rect(this.x, this.y, this.s, this.s * 1.777);

    noStroke();
    if (this.mode === "rainbow") {
      if (i === r.length - 1) {
        fill(this.c % 100, 80, 100);
      }
      fill(this.c % 100, 80, br);
    } else if (this.mode === "white") {
      fill(100, 0, br);
    } else if (this.mode === "black") {
      fill(0);
    } else if (this.mode === "random") {
      fill(ch, cs, br);
    }
    let rw = (width + 100) / 2 - this.s / 2;
    rect(this.x - this.s / 2 - rw / 2 - sw / 2, this.y, rw, height + 100);
    rect(this.x + this.s / 2 + rw / 2 + sw / 2, this.y, rw, height + 100);

    let rh = (height + 100) / 2 - (this.s * 1.777) / 2;

    rect(
      this.x,
      this.y - (this.s * 1.777) / 2 - rh / 2 - sw / 2,
      width + 100,
      rh
    );
    rect(
      this.x,
      this.y + (this.s * 1.777) / 2 + rh / 2 + sw / 2,
      width + 100,
      rh
    );
  }

  move() {
    this.s += this.s2;
    this.s2 += 0.01;

    if (this.s > 1100) {
      this.burnt = true;
    }
  }
}
