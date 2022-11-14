const paths = [
  "balls",
  "boxes",
  "cacti",
  "cells",
  "cubes",
  "drip",
  "exclusion",
  "eye",
  "fireflies",
  "flower",
  "graph",
  "grid",
  "hallway",
  "mandala",
  "mandala3D",
  "orb",
  "rainbow",
  "sin",
  "swarm",
  "tiedye",
  "tiles",
  "void",
  "wave",
  "wiggles",
  "random",
];
let p = [];

let w = 340;
let h = 50;

let activeIndex = 0;
const padding = 70;
function setup() {
  angleMode(DEGREES);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  colorMode(HSB, 100);

  createCanvas(720, 1280);
  loadPages();
}

const loadPages = () => {
  let row = 0;

  for (let i = 0; i < paths.length; i++) {
    if (i % 2 === 0 && i > 0) {
      row++;
    }
    p.push(
      new Page(
        (width / 4 + (i * width) / 2) % width,
        50 + row * padding,
        paths[i],
        i
      )
    );
  }
};

const LEFT_KEY = 51;
const RIGHT_KEY = 52;
const INTERACTION_KEY = 53;
function keyPressed() {
  print(keyCode === INTERACTION_KEY);
  if (keyCode === RIGHT_KEY) {
    activeIndex = (activeIndex + 1) % p.length;
  } else if (keyCode === LEFT_KEY) {
    activeIndex = activeIndex - 1;
    if (activeIndex < 0) {
      activeIndex += p.length;
    }
  } else if (keyCode === INTERACTION_KEY) {
    let newPath = paths[activeIndex];
    if (newPath === "random") {
      newPath = random(paths);
    }
    location.href = `./${newPath}/index.html`;
  }
}

function draw() {
  background(59, 22, 60);
  textAlign(CENTER, CENTER);
  for (let page of p) {
    page.display();
  }
  textSize(18);
  
  line(240, height, 240, height - 60);
  text("reboot", 240, height - 75);

  line(297, height, 297, height - 60);
  text("home", 297, height - 75);

  line(372, height, 372, height - 60);
  text("previous", 372, height - 75);
  
   line(447, height, 447, height -60);
  text("next", 447, height - 75);
  
   line(522, height, 522, height -60);
  text("select", 522, height - 75);
}

class Page {
  constructor(x, y, path, i) {
    this.x = x;
    this.y = y;
    this.path = path;
    this.i = i;
  }
  display() {
    push();
    translate(this.x, this.y);
    textSize(30);

    if (this.path === "random") {
      fill(200, 60, 80);
    } else {
      fill(59, 22, 30);
    }
    if (this.i === activeIndex) {
      stroke(frameCount % 100, 80, 80);
      strokeWeight(8);
      scale(1 + cos(frameCount * 5) / 22);
    } else {
      noStroke();
    }
    rect(0, 0, w, h, 10);
    fill(255);
    noStroke();
    text(this.path, 0, 0);
    pop();
  }
}
