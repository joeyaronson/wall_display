function setup() {
  angleMode(DEGREES);
  colorMode(HSB, 100);
  createCanvas(1080, 1920, WEBGL);
  normalMaterial();
  loadCacti();
  noStroke();
  minute = 1000 * 60;
  currentMin = Math.round(Date.now() / minute);
}
let c;
let startAngle;
let minute;
let startMin;
let bg;
const INTERACTION_KEY = 53;

function draw() {
  background(bg, 30, 100);
  camera(600, -20, 100, 0, 0, 0, 0.25, 1, 0.05);
  rotateZ(startAngle);
  rotateY(frameCount / 10);
  // orbitControl();
  ambientLight(100, 0, 100);
  pointLight(
    100,
    100 / 4,
    width,
    (sin(frameCount * 2) * width) / 4,
    (cos(frameCount * 2) * width) / 4,
    width / 5
  );
  // pointLight(
  //   100,
  //   100 / 4,
  //   100 / 2,
  //   (-sin(frameCount) * width) / 4,
  //   (-cos(frameCount) * width) / 4,
  //   0
  //   );
  c.draw();
  let minutes = Math.round(Date.now() / minute);
  if (currentMin !== minutes) {
    loadCacti();
    currentMin = minutes;
  }
}

function loadCacti() {
  bg = random(0, 100);
  c = new Cactus(0, 0);
  startAngle = random(0, 20);
}

function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    loadCacti();
  }
}

class Cactus {
  constructor(x, y) {
    //cac vars
    this.x = x;
    this.y = y;
    this.h = random(60, 220);
    this.w = random(40, 70);
    this.ribWidth = random(10, 40);
    this.ribCount = parseInt(random(2, 5)) * 2;
    this.areoleCount = parseInt(random(5, 20));
    this.ribShape = floor(random(4, 10));
    this.areoleSize = random(2, 5);
    this.aOffset = random(2, 10);
    // cac colors
    this.hue = random(20, 45);
    this.brightness = random(10, 70);
    // areole colors
    this.aHue = random(5, 10);
    this.aSat = random(0, 100);
    this.aBri = random(80, 100);

    //pot vars
    this.pW = this.w + random(20, 50);
    this.pH = random(30, 50);

    this.pH2 = random(1.5, 2.5);

    this.pHue = random(100);
    this.pSat = random(35, 45);
    this.pBri = random(35, 45);

    //spine vars
    this.spineLen = random(2, 25);
    this.spineCount = floor(random(0, 6));
    this.spineStartAngle = random(0, 360);

    this.sHue = random(0, 20);
    this.sSat = random(0, 80);
    this.sBri = random(20, 100);
  }
  draw() {
    push();
    translate(this.x, this.y);
    for (let i = 0; i < this.ribCount / 2; i++) {
      ambientMaterial(this.hue, 100, this.brightness);
      ellipsoid(this.w, this.h, this.ribWidth, this.ribShape, 12);
      this.drawAreoles(i);
      rotateY(360 / this.ribCount);
    }

    // draw pot
    translate(0, this.h - 20);
    ambientMaterial(this.pHue, this.pSat, this.pBri);

    cylinder(this.pW, this.pH, 13, 1);
    translate(0, (this.pH * this.pH2) / 2);
    cylinder(this.pW / 1.1, this.pH * this.pH2, 13, 1);
    //draw soil
    translate(0, -this.pH);

    ambientMaterial(8, 40, 20);

    ellipsoid(this.pW - 5, this.pH / 1.2, this.pW - 5, 10, 10);
    pop();
  }

  drawAreoles(i) {
    for (let angle = 0; angle < 360; angle += 360 / (this.areoleCount * 2)) {
      push();

      let offToggle = i % 2 === 0 ? this.aOffset : 0;
      let aX = (this.w - this.areoleSize / 1.5) * cos(angle + offToggle);
      let aY = this.h * sin(angle + offToggle);
      translate(aX, aY);
      let aSize = map(
        dist(this.x, this.y, aX, aY),
        this.h * 2,
        0,
        1,
        this.areoleSize
      );
      ambientMaterial(this.aHue, this.aSat, this.aBri);
      sphere(aSize);
      //spines
      if (this.spineCount > 0) {
        stroke(this.sHue, this.sSat, this.sBri);
        let angleOff = angle > 270 || angle < 90 ? 1 : -1;

        for (
          let spineAngle = 0;
          spineAngle < 360;
          spineAngle += 360 / this.spineCount
        ) {
          rotateX(spineAngle);
          line(0, 0, 0, this.spineLen * angleOff, this.spineLen, 0);
          // rotateX(spineAngle);
        }
      }
      pop();
    }
  }
}
