const numMapping = {
  0: [
    [0, 270],
    [90, 270],
    [90, 270],
    [90, 360],
    [0, 180],
    [270, 360],
    [0, 90],
    [180, 360],
    [0, 180],
    [180, 360],
    [0, 180],
    [180, 360],
    [0, 180],
    [180, 360],
    [0, 180],
    [180, 360],
    [0, 180],
    [180, 360],
    [0, 180],
    [180, 360],
    [0, 180],
    [180, 270],
    [90, 180],
    [180, 360],
    [270, 180],
    [270, 90],
    [270, 90],
    [180, 90],
  ],
  1: [
    [0, 270],
    [90, 270],
    [90, 360],
    [0, 360],
    [270, 180],
    [0, 90],
    [180, 360],
    [0, 360],
    [0, 360],
    [0, 180],
    [180, 360],
    [0, 360],
    [0, 360],
    [0, 180],
    [180, 360],
    [0, 360],
    [0, 360],
    [0, 180],
    [180, 360],
    [0, 360],
    [0, 270],
    [90, 180],
    [180, 270],
    [90, 360],
    [270, 180],
    [270, 90],
    [270, 90],
    [180, 90],
  ],
  2: [
    [0, 270],
    [90, 270],
    [90, 270],
    [90, 360],
    [270, 180],
    [270, 90],
    [0, 90],
    [180, 360],
    [0, 270],
    [90, 270],
    [90, 180],
    [180, 360],
    [0, 180],
    [270, 360],
    [270, 90],
    [180, 90],
    [0, 180],
    [180, 360],
    [0, 360],
    [0, 360],
    [0, 180],
    [180, 270],
    [90, 270],
    [90, 360],
    [270, 180],
    [270, 90],
    [270, 90],
    [180, 90],
  ],
  3: [
    [0, 270],
    [90, 270],
    [90, 270],
    [90, 360],
    [270, 180],
    [270, 90],
    [0, 90],
    [180, 360],
    [0, 270],
    [90, 270],
    [90, 180],
    [180, 360],
    [270, 180],
    [270, 90],
    [0, 90],
    [180, 360],
    [0, 360],
    [0, 360],
    [0, 180],
    [180, 360],
    [0, 270],
    [90, 270],
    [90, 180],
    [180, 360],
    [270, 180],
    [270, 90],
    [270, 90],
    [180, 90],
  ],
  4: [
    [0, 270],
    [90, 360],
    [360, 270],
    [90, 360],
    [0, 180],
    [180, 360],
    [0, 180],
    [180, 360],
    [0, 180],
    [180, 270],
    [90, 180],
    [180, 360],
    [270, 180],
    [270, 90],
    [0, 90],
    [180, 360],
    [0, 360],
    [0, 360],
    [0, 180],
    [180, 360],
    [0, 360],
    [0, 360],
    [360, 180],
    [180, 360],
    [0, 360],
    [0, 360],
    [270, 180],
    [180, 90],
  ],
  5: [
    [0, 270],
    [90, 270],
    [90, 270],
    [90, 360],
    [0, 180],
    [270, 360],
    [270, 90],
    [180, 90],
    [0, 180],
    [180, 270],
    [90, 270],
    [90, 360],
    [270, 180],
    [270, 90],
    [0, 90],
    [180, 360],
    [0, 360],
    [0, 360],
    [0, 180],
    [180, 360],
    [0, 270],
    [90, 270],
    [90, 180],
    [180, 360],
    [270, 180],
    [270, 90],
    [270, 90],
    [180, 90],
  ],
  6: [
    [0, 270],
    [90, 270],
    [90, 270],
    [90, 360],
    [0, 180],
    [270, 360],
    [270, 90],
    [180, 90],
    [0, 180],
    [180, 270],
    [90, 270],
    [90, 360],
    [0, 180],
    [270, 360],
    [0, 90],
    [180, 360],
    [0, 180],
    [180, 360],
    [0, 180],
    [180, 360],
    [0, 180],
    [180, 270],
    [90, 180],
    [180, 360],
    [270, 180],
    [270, 90],
    [270, 90],
    [180, 90],
  ],
  7: [
    [0, 270],
    [90, 270],
    [90, 270],
    [90, 360],
    [270, 180],
    [270, 90],
    [0, 90],
    [180, 360],
    [0, 360],
    [0, 360],
    [0, 180],
    [180, 360],
    [0, 360],
    [0, 360],
    [0, 180],
    [180, 360],
    [0, 360],
    [0, 360],
    [0, 180],
    [180, 360],
    [0, 360],
    [0, 360],
    [0, 180],
    [180, 360],
    [0, 360],
    [0, 360],
    [270, 180],
    [180, 90],
  ],
  8: [
    [0, 270],
    [90, 270],
    [90, 270],
    [90, 360],
    [0, 180],
    [270, 360],
    [0, 90],
    [180, 360],
    [0, 180],
    [180, 270],
    [90, 180],
    [180, 360],
    [0, 180],
    [270, 360],
    [0, 90],
    [180, 360],
    [0, 180],
    [180, 360],
    [0, 180],
    [180, 360],
    [0, 180],
    [180, 270],
    [90, 180],
    [180, 360],
    [270, 180],
    [270, 90],
    [270, 90],
    [180, 90],
  ],
  9: [
    [0, 270],
    [90, 270],
    [90, 270],
    [90, 360],
    [0, 180],
    [270, 360],
    [0, 90],
    [180, 360],
    [0, 180],
    [180, 270],
    [90, 180],
    [180, 360],
    [270, 180],
    [270, 90],
    [0, 90],
    [180, 360],
    [0, 360],
    [0, 360],
    [0, 180],
    [180, 360],
    [0, 270],
    [90, 270],
    [90, 180],
    [180, 360],
    [270, 180],
    [270, 90],
    [270, 90],
    [180, 90],
  ],
};

let modes = ["lines", "arc", "lines", "arc2"];
let mI = 2;

const INTERACTION_KEY = 53;
function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    mI = (mI + 1) % modes.length;
    n = [];

    setup();
  }
}

function setup() {
  createCanvas(1080, 1920);
  angleMode(DEGREES);
  strokeCap(SQUARE);

  let d = new Date();
  globalMin = d.getMinutes();
  loadNums();
  noFill();
  chooseColors();
}
let n = [];
let SIZE = 120;
let DURATION = 200;
let STATUS = "wait";
let globalMin;
let col;
let lineCol;
let bgCol;
function draw() {
  background(bgCol);

  for (let num of n) {
    num.display();
  }

  let d = new Date();
  if (d.getMinutes() != globalMin) {
    setNextNums();
    globalMin = d.getMinutes();
  }

  if (frameCount % 10000 === 0) {
    modes = shuffle(modes)
    mI = (mI + 1) % modes.length;
    n = [];
    setup();
  }
}

const chooseColors = () => {
  let r = random(255);
  let g = random(255);
  let b = random(255);
  col1 = color(r, g, b)
  lineCol = color(r, g, b, 70)
  bgCol = color(
    (r + random(30, 225)) % 255,
    (g + random(30, 225)) % 255,
    (b + random(30, 225)) % 255
  );
};

const randomizeNums = () => {
  for (let i = 0; i < n.length; i++) {
    for (let j = 0; j < n[i].c.length; j++) {
      n[i].c[j].a1 = 0;
      n[i].c[j].a2 = 0;
    }
  }
};

const setNextNums = () => {
  let timeArr = calculateTime();

  for (let i = 0; i < n.length; i++) {
    n[i].setNextTime(timeArr[i]);
  }
};

const calculateTime = () => {
  const d = new Date();
  let h = d.getHours();
  let hours = String(h < 13 ? h : h % 12);
  if (hours === "0") {
    hours = "12";
  }
  let minutes = String(d.getMinutes());
  if (String(hours).length === 1) {
    hours = "0" + hours;
  }
  if (String(minutes).length === 1) {
    minutes = "0" + minutes;
  }
  let timeArr = [hours[0], hours[1], minutes[0], minutes[1]];
  return timeArr;
};

const loadNums = () => {
  let timeArr = calculateTime();

  n.push(new Num(100, 140, timeArr[0]));
  n.push(new Num(620, 140, timeArr[1]));

  n.push(new Num(100, 1040, timeArr[2]));
  n.push(new Num(620, 1040, timeArr[3]));
};

class Num {
  constructor(x, y, num) {
    this.x = x;
    this.y = y;
    this.c = [];
    this.num = num;
    let count = 0;
    let currMode = modes[mI];

    for (let j = 0; j < 7; j++) {
      for (let i = 0; i < 4; i++) {
        let [t1, t2] = numMapping[num][count];
        if (t1 === 0 && t2 === 360) {
          if (currMode === "lines") {
            let x = 45;
            t1 = t2 = x;
          } else if (currMode === "arc2") {
            t1 = t2 = 0;
          }
        }
        this.c.push(
          new Clock(this.x + i * SIZE, this.y + j * SIZE, count, t1, t2)
        );
        count++;
      }
    }
  }

  display() {
    for (let i = 0; i < this.c.length; i++) {
      this.c[i].display();
      this.c[i].move();
    }
  }

  setNextTime(num) {
    this.num = num;
    let currMode = modes[mI];

    for (let i = 0; i < this.c.length; i++) {
      let [t1, t2] = numMapping[num][i];
      let currMode = modes[mI];
      if (t1 === 0 && t2 === 360) {
        if (currMode === "lines") {
          let x = 45;
          t1 = t2 = x;
        } else if (currMode === "arc2") {
          t1 = t2 = 0;
        }
      }
      if (["arc", "lines"].includes(currMode)) {
        this.c[i].updateHands(t1, t2);
      } else {
        this.c[i].updateHands(t2, t1);
      }
    }
  }
}

class Clock {
  constructor(x, y, i, t1, t2) {
    this.x = x;
    this.y = y;
    this.a1 = 0;
    this.a2 = 0;
    this.t1 = t1;
    this.t2 = t2;
    this.i = i;
    let currMode = modes[mI];

    if (["arc", "lines"].includes(currMode)) {
      this.updateHands(t1, t2);
    } else {
      this.updateHands(t2, t1);
    }
  }
  display() {
    stroke(lineCol);
    strokeWeight(3);
    noFill();
    ellipse(this.x, this.y, SIZE, SIZE);

    noStroke();
    fill(col1);
    let currMode = modes[mI];
    if (["arc", "arc2"].includes(currMode)) {
      arc(this.x, this.y, SIZE, SIZE, 90 + this.a1, 90 + this.a2);
    } else if (currMode === "lines") {
      ellipse(this.x, this.y, 5, 5);
    }
    strokeWeight(5);
    stroke(col1);

    push();
    if (currMode === "lines") {
      translate(this.x, this.y);
      push();
      rotate(this.a1);
      line(0, 0, 0, SIZE / 2);
      pop();
      rotate(this.a2);
      line(0, 0, 0, SIZE / 2);
    }

    pop();
  }

  updateHands(t1, t2) {
    this.t1 = t1;
    this.t2 = t2;

    this.speed1 = (this.t1 - this.a1) / DURATION;

    this.speed2 = (this.t2 - this.a2) / DURATION;
  }

  move() {
    if (abs(this.a1 - this.t1) > 3) {
      this.a1 += this.speed1;
    } else {
      this.a1 = this.t1;
    }

    if (abs(this.a2 - this.t2) > 3) {
      this.a2 += this.speed2;
    } else {
      this.a2 = this.t2;
    }
  }
}
