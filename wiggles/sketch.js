// Joey Aronson 2018

//Click to cycle through color modes
function setup() {
  //angleMode(DEGREES);
  createCanvas(1080, 1920);
  strokeWeight(0.5);
  noStroke();
  colorMode(HSB, 100);
  background(0);
}
var p = [];
var mode = "color";
var timer = 0;

const INTERACTION_KEY = 53;
function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    changeMode();
  }
}

function draw() {
  p.push(new Particle(width / 2, height / 2, mode));

  if (frameCount % 2000 === 0) {
    changeMode();
  }

  for (let i = 0; i < p.length; i++) {
    p[i].display();
    p[i].move();
  }
  for (let i = 0; i < p.length; i++) {
    if (
      p[i].x > width + 100 ||
      p[i].x < -100 ||
      p[i].y > height + 100 ||
      p[i].y < -100
    ) {
      p.splice(i, 1);
    }
  }

  timer++;
}

const changeMode = () => {
  if (mode === "color") {
    mode = "dark";
    timer = 0;
  } else if (mode === "dark") {
    timer = 0;
    mode = "dim";
  } else if (mode === "dim") {
    timer = 0;
    mode = "color";
  }
};

class Particle {
  constructor(x, y, mode) {
    this.x = x;
    this.y = y;
    this.s = 0;
    this.t = 0;
    this.mode = mode;

    //starting angle
    this.degx = random(0, 1);
    this.degy = random(0, 1);

    this.xs = random(-3, 3);

    if (this.xs < 1 && this.xs > -1) {
      this.rany = round(random(0, 1));
      if (this.rany === 0) {
        this.ys = random(1, 3);
      } else {
        this.ys = random(-3, -1);
      }
    } else {
      this.ys = random(3, -3);
    }

    this.hue = random(100);

    this.hue2 = 1;
  }

  display() {
    if (this.mode === "dark") {
      fill(0, 0, 0);
      stroke(100 - this.hue, 100, 100);
    }
    if (this.mode === "color") {
      fill(this.hue, 100, 100);
      stroke(100 - this.hue, 100, 100);
    }
    if (this.mode === "dim") {
      fill(this.hue, 80, 80);
      stroke(0, 0, 0);
    }

    ellipse(this.x, this.y, this.s, this.s);
  }

  move() {
    this.t += 0.02;
    this.x += this.xs * this.t + cos(this.degx) * this.t;
    this.y += this.ys * this.t + cos(this.degy) * this.t;
    this.s += 0.2;
    this.degx += random(0.1, 0.8);
    this.degy += random(0.1, 0.8);

    this.hue += this.hue2;

    if (this.hue > 100 || this.hue < 0) {
      this.hue2 *= -1;
    }
  }
}

  // Joey Aronson 2018
