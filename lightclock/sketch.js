let font;
function preload() {
  font = loadFont("./font.otf");
}

function setup() {
  createCanvas(720, 1280);
  hypotenuse = sqrt(width * width + height * height);
  colorMode(HSB, 100);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  let d = new Date();
  globalMin = d.getMinutes();

  pos = [
    {
      x: 70,
      y: 580,
      offx: [-10, -100],
      offy: [-10, -100],
      xbound: [0, width / 2],
      ybound: [0, height / 2],
    },
    {
      x: 430,
      y: 580,
      offx: [width + 50, width + 100],
      offy: [-50, -100],
      xbound: [width / 2, width],
      ybound: [0, height / 2],
    },
    {
      x: 70,
      y: 1220,
      offx: [50, 100],
      offy: [height + 50, height + 100],
      xbound: [0, width / 2],
      ybound: [height / 2, height],
    },
    {
      x: 430,
      y: 1220,
      offx: [width + 50, width + 100],
      offy: [height + 50, height + 100],
      xbound: [width / 2, width],
      ybound: [height / 2, height],
    },
  ];
  loadNums();
}

let p = [];
let n = [];
let noiseVal = 0.09;
let hypotenuse;
let pos;
let timer = 0;
let interact = false;
const INTERACTION_KEY = 53;
function keyPressed() {
  print(frameRate());

  if (keyCode === INTERACTION_KEY) {
    if (interact) {
      timer = 350;
    } else {
      resetPos();
      interact = true;
    }
  }
}

const loadPoints = (num, x, y) => {
  return font.textToPoints(String(num), x, y, 700, {
    sampleFactor: 0.2,
    simplifyThreshold: 0,
  });
};
const loadNums = () => {
  let timeArr = calculateTime();

  for (let i = 0; i < pos.length; i++) {
    n.push(new Num(pos[i].x, pos[i].y, timeArr[i], i));
  }
};

const resetPos = () => {
  for (let num of n) {
    num.resetPos();
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

function draw() {
  background(0, 10);

  for (let num of n) {
    num.display();
  }
  if (frameCount % 10 === 0) {
    let d = new Date();
    if (!interact && d.getMinutes() != globalMin) {
      let timeArr = calculateTime();
      for (let i = 0; i < n.length; i++) {
        if (timeArr[i] !== n[i].num) {
          n[i].changeNum(timeArr[i]);
        }
      }
      globalMin = d.getMinutes();
    }
  }

  if (interact) {
    timer++;
  }

  if (timer > 350) {
    timer = 0;
    interact = false;

    for (let i = 0; i < n.length; i++) {
      n[i].setPos();
    }
  }
}

class Num {
  constructor(x, y, num, i) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.num = num;
    this.points = this.loadPos(num, x, y);
  }

  resetPos() {
    for (let i = 0; i < this.points.length; i++) {
      let currPoint = this.points[i];
      currPoint.temptx = currPoint.tx;
      currPoint.tempty = currPoint.ty;

      currPoint.tx = currPoint.ox;
      currPoint.ty = currPoint.oy;
    }
  }

  setPos() {
    for (let i = 0; i < this.points.length; i++) {
      let currPoint = this.points[i];

      currPoint.tx = currPoint.temptx;
      currPoint.ty = currPoint.tempty;
    }
  }

  loadPos(num) {
    let plist = [];
    let points = loadPoints(num, this.x, this.y);
    for (let i = 0; i < points.length; i++) {
      const { x, y } = points[i];
      plist.push(
        new Point(
          x,
          y,
          random(pos[this.i].xbound[0], pos[this.i].xbound[1]),
          random(pos[this.i].ybound[0], pos[this.i].ybound[1]),
          this.i
        )
      );
    }
    return plist;
  }

  changeNum(num) {
    let newPoints = this.loadPos(num);
    if (newPoints.length > this.points.length) {
      for (let i = 0; i < this.points.length; i++) {
        this.points[i].tx = newPoints[i].tx;
        this.points[i].ty = newPoints[i].ty;
      }
      for (let i = this.points.length; i < newPoints.length; i++) {
        const { tx, ty } = newPoints[i];
        let { offx, offy } = pos[this.i];
        this.points.push(
          new Point(
            tx,
            ty,
            this.points[this.points.length - 1].x,
            this.points[this.points.length - 1].y,
            this.i
          )
        );
      }
    } else {
      this.points = this.points.splice(0, newPoints.length);
      for (let i = 0; i < this.points.length; i++) {
        this.points[i].tx = newPoints[i].tx;
        this.points[i].ty = newPoints[i].ty;
      }
    }
    this.num = num;
  }

  display() {
    stroke((frameCount + this.i * 25) % 100, 30, 100, 5);

    for (let i = 0; i < this.points.length; i++) {
      this.points[i].move();
      let currPoint = this.points[i];
      let nextPoint = this.points[(i + 1) % this.points.length];

      strokeWeight(0.5);
      if (i % 2 === 0) {
        line(currPoint.x, currPoint.y, width / 2, height / 2);
      }

      strokeWeight(2.5);

      if (
        dist(currPoint.x, currPoint.y, nextPoint.x, nextPoint.y) < 50 &&
        currPoint.found
      ) {
        line(currPoint.x, currPoint.y, nextPoint.x, nextPoint.y);
      }

      if (!currPoint.found) {
        line(currPoint.x, currPoint.y, nextPoint.x, nextPoint.y);
      }
    }
  }
}

class Point {
  constructor(tx, ty, x, y, i) {
    this.x = x;
    this.y = y;
    this.ax = random(-0.03, 0.03);
    this.ay = random(-0.03, 0.03);
    this.tx = tx;
    this.ty = ty;

    this.ox = x;
    this.oy = y;

    this.i = i;

    this.temptx = 0;
    this.tempty = 0;
    this.dx = 0;

    this.found = false;
  }

  move() {
    let d = dist(this.x, this.y, this.tx, this.ty);
    this.tx += sin(frameCount * 8 + this.ty + this.i * 90);
    this.ty += cos(frameCount * 3 + this.tx + this.i * 90);
    if (d > 2) {
      let delx = this.tx - this.x;
      let dely = this.ty - this.y;

      let angle = atan2(delx, dely);

      let ax = sin(angle);
      let ay = cos(angle);
      let ds = map(d, 0, hypotenuse, 3, 5);

      this.x += ax * ds;
      this.y += ay * ds;
    } else {
      this.x = this.tx;
      this.y = this.ty;
    }
    this.found = d < 2;
  }
}
