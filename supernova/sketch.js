function setup() {
  createCanvas(1080, 1920);
  colorMode(HSB, 100);
  background(0);
  m = sqrt(pow(width / 2, 2) + pow(height / 2, 2)) / 2;
  mtemp = m;
  noStroke();
  restart();
}

let n = [];
let m;
let mtemp;
let dh;
let nodeCount = 3000;
let noiseVal = 0.01;
let wobble;
let colorModes = ["rainbow", "black", "hue"];
let currentColorMode;
const restart = () => {
  n = [];
  dh = new DisplayHandler();

  dh.loadNodes(nodeCount);
  noiseVal = random(0.01, 0.04);
  wobble = random(0.25, 2);
  colorModes = shuffle(colorModes);
};

const INTERACTION_KEY = 53;

function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    restart();
  }
}

function draw() {
  background(0, 12);
  currentColorMode = colorModes[0];
  // let n = noise(width / 2 * noiseVal, height / 2 * noiseVal, frameCount * noiseVal);
  // let nm = map(n, 0, 1, 0, 100);
  // fill((nm) % 100, 100, 100);

  // ellipse(width / 2, height / 2, 10, 10);
  dh.updateNodes();

  if (frameCount % 2000 === 0) {
    restart();
  }

  // text(dh.mode,100,100);
}

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.endx = random(width);
    this.endy = random(height);
    this.s = 1;
    this.size = 0;
    this.d = dist(this.x, this.y, width / 2, height / 2);
  }

  display() {
    let n = noise(this.x * noiseVal, this.y * noiseVal, frameCount * noiseVal);
    let nm = map(n, 0, 1, 0, 100);
    let hm = map(this.d, 0, mtemp * 2, 0, 200);
    if (currentColorMode === "rainbow") {
      fill((hm + nm) % 100, 100, 100);
    } else if (currentColorMode === "hue") {
      fill(frameCount % 100, 100, 100);
    } else {
      fill(100);
    }

    ellipse(this.x, this.y, this.size, this.size);
  }

  move() {
    let angle = atan2(this.endx - this.x, this.endy - this.y);
    this.d = dist(this.x, this.y, this.endx, this.endy);
    let n = noise(this.x * noiseVal, this.y * noiseVal, frameCount * noiseVal);
    let nm = map(n, 0, 1, -wobble, wobble);
    let speed = -map(this.d, 0, m, 10, 0);
    this.x += sin(angle + nm) * speed;
    this.y += cos(angle + nm) * speed;
  }

  move2() {
    let angle = atan2(width / 2 - this.x, height / 2 - this.y);
    this.d = dist(this.x, this.y, width / 2, height / 2);
    let n = noise(this.x * noiseVal, this.y * noiseVal, frameCount * noiseVal);
    let nm = map(n, 0, 1, -wobble, wobble);
    let speed = -map(this.d, 0, m, 10, 0);
    this.x += sin(angle + nm) * speed;
    this.y += cos(angle + nm) * speed;
  }

  grow() {
    this.size += 0.1;
  }
}

class DisplayHandler {
  constructor() {
    this.mode = "grow";
    this.timer = 29;
    this.next;
  }

  loadNodes(num) {
    for (let i = 0; i < num; i++) {
      // n.push(new Node(random(-400, width + 400), random(-400, height + 400)));
      n.push(new Node(width / 2, height / 2));
    }
  }

  updateNodes() {
    switch (this.mode) {
      case "grow":
        this.grow();
        break;
      case "move":
        this.move();
        break;
      case "move2":
        this.move2();
        break;
      case "wait":
        this.wait(this.next);
        break;
    }
  }

  grow() {
    for (let i = 0; i < n.length; i++) {
      n[i].display();
      n[i].grow();
    }

    if (n[0].size > 5) {
      this.next = "move";
      this.mode = "wait";
    }
  }

  move() {
    for (let i = 0; i < n.length; i++) {
      n[i].display();
      n[i].move();
    }
    if (m > 4) {
      m -= 3;
    } else {
      // n.splice(0, n.length);
      m = mtemp;
      // this.loadNodes(nodeCount);
      this.next = "move2";
      this.mode = "wait";
      this.timer = 60;
    }
  }

  move2() {
    for (let i = 0; i < n.length; i++) {
      n[i].display();
      n[i].move2();
    }
    if (m > 4) {
      m -= 3;
    } else {
      // n.splice(0, n.length);
      m = mtemp;
      // this.loadNodes(nodeCount);
      this.next = "move";
      this.mode = "wait";
      this.timer = 30;
    }
  }

  wait(mode) {
    for (let i = 0; i < n.length; i++) {
      n[i].display();
    }
    if (this.mode === "wait" && mode === "move" && this.timer === 30) {
      restart();
    }
    if (this.timer > 0) {
      this.timer--;
    } else {
      this.mode = mode;
    }
  }
}
