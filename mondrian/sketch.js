function setup() {
  createCanvas(1080, 1920);
  loadTiles();
  stroke(0);
  strokeWeight(10);
}

let t = [];

let noiseVal = 0.01;
let DEPTH = 5;
let colorModes = ["mondrian", "gradient"];
const INTERACTION_KEY = 53;
function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    restart();
  }
}

const restart = () => {
  let temp = colorModes.shift();
  colorModes.push(temp);
  t = [];
  DEPTH = random(2, 8);
  loadTiles();
};

const loadTiles = () => {
  t.push(new Tile(0, 0, 0, width, height, 0, 0));
};

function draw() {
  background(0);

  for (let i = t.length - 1; i >= 0; i--) {
    t[i].updateChildren();

    t[i].move();
  }

  for (let i = t.length - 1; i >= 0; i--) {
    t[i].display();
  }

  if (frameCount % 10000 === 0) {
    restart();
  }
}

class Tile {
  constructor(x, y, o, w, h, l, num) {
    this.x = x;
    this.y = y;
    this.o = o;
    this.w = w;
    this.h = h;

    this.d = 1;

    this.split =
      this.o === 0
        ? random(this.w / 10, this.w - this.w / 10)
        : random(this.h / 10, this.h - this.h / 10);

    this.num = num;

    this.l = l;
    this.c1 = color(random(255), random(255), random(255));
    this.c2 = color(random(255), random(255), random(255));
    this.c3 = color(random(255), random(255), random(255));
    this.c4 = color(random(255), random(255), random(255));
    this.col = random([0, 1, 2]);
    if (colorModes[0] === "mondrian") {
      let mCols = [
        color(0, 0, 0),
        color(209, 35, 0),
        color(55, 75, 222),
        color(209, 35, 0),
        color(55, 75, 222),
        color(252, 240, 202),
        color(252, 240, 202),
        color(252, 240, 202),
        color(252, 240, 202),
        color(252, 186, 3),
        color(252, 186, 3),
      ];
      this.c1 = random(mCols);
      this.c2 = random(mCols);
    }
    this.children = [];
    this.setChildren();
  }

  setChildren() {
    let ran = random([0, 1, 2]);
    if (this.l < 3) {
      ran = 2;
    }
    if (this.l < DEPTH) {
      if (this.o === 0) {
        if ([0, 2].includes(ran)) {
          this.children.push(
            new Tile(
              this.x,
              this.y,
              1,
              this.split,
              this.h,
              this.l + 1,
              0,
              this.index + 1
            )
          );
        }
        if ([1, 2].includes(ran)) {
          this.children.push(
            new Tile(
              this.x + this.split,
              this.y,
              1,
              this.w - this.split,
              this.h,
              this.l + 1,
              1,
              this.index + 2
            )
          );
        }
      } else {
        if ([0, 2].includes(ran)) {
          this.children.push(
            new Tile(
              this.x,
              this.y,
              0,
              this.w,
              this.split,
              this.l + 1,
              0,
              this.index + 1
            )
          );
        }
        if ([1, 2].includes(ran)) {
          this.children.push(
            new Tile(
              this.x,
              this.y + this.split,
              0,
              this.w,
              this.h - this.split,
              this.l + 1,
              1,
              this.index + 2
            )
          );
        }
      }
    }
  }

  setGradient(mode, cm) {
    let gradient;
    if (cm === "gradient") {
      if (this.col === 0) {
        gradient = drawingContext.createLinearGradient(
          this.x,
          this.y,
          this.x,
          this.y + this.h
        );
      } else if (this.col === 1) {
        gradient = drawingContext.createLinearGradient(
          this.x + this.w,
          this.y,
          this.x,
          this.y
        );
      } else {
        gradient = drawingContext.createRadialGradient(
          this.x + this.w / 2,
          this.y + this.h / 2,
          this.w > 0 ? this.w : 0,
          this.x + this.w,
          this.y + this.h,
          this.w > 0 ? this.w : 0
        );
      }
      if (mode === 0) {
        gradient.addColorStop(0, this.c1.toString("#rrggbbaa"));

        gradient.addColorStop(1, this.c2.toString("#rrggbbaa"));
      } else {
        gradient.addColorStop(0, this.c3.toString("#rrggbbaa"));

        gradient.addColorStop(1, this.c4.toString("#rrggbbaa"));
      }

      drawingContext.fillStyle = gradient;
    } else {
      if (this.o === 0) {
        fill(this.c1);
      } else {
        fill(this.c2);
      }
    }
  }

  display() {
    if (this.o === 0) {
      this.setGradient(0, colorModes[0]);

      rect(this.x + this.split, this.y, this.w - this.split, this.h);
      this.setGradient(1, colorModes[0]);

      rect(this.x, this.y, this.split, this.h);
    } else {
      this.setGradient(0, colorModes[0]);

      rect(this.x, this.y + this.split, this.w, this.h - this.split);
      this.setGradient(1, colorModes[0]);

      rect(this.x, this.y, this.w, this.split);
    }

    for (let c of this.children) {
      c.updateChildren();

      c.move();
    }

    for (let c of this.children) {
      c.display();
    }
  }

  move() {
    let n =
      map(
        noise(frameCount * noiseVal + (this.l + this.num) * 100),
        0,
        1,
        -1,
        1
      ) * 2;
    this.split += n * this.d;

    if (this.o === 0) {
      if (this.split > this.w) {
        this.d *= -1;
        this.split -= 1;
      } else if (this.split < this.x) {
        this.d *= -1;
        this.split += 1;
      }
    } else {
      if (this.split > this.h) {
        this.d *= -1;
        this.split -= 1;
      } else if (this.split < this.y) {
        this.d *= -1;
        this.split += 1;
      }
    }
  }

  updateChildren() {
    for (let c of this.children) {
      if (this.o === 0) {
        if (c.num === 0) {
          c.updateVals(this.x, this.y, this.split, this.h);
        } else {
          c.updateVals(
            this.x + this.split,
            this.y,
            this.w - this.split,
            this.h
          );
        }
      } else {
        if (c.num === 0) {
          c.updateVals(this.x, this.y, this.w, this.split);
        } else {
          c.updateVals(
            this.x,
            this.y + this.split,
            this.w,
            this.h - this.split
          );
        }
      }
    }
  }

  updateVals(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}
