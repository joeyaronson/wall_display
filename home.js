const paths = [
  "abstract",
  "arc_clock",
  "balls",
  "birds",
  "boxes",
  "brickbreak",
  "cacti",
  "cell_clock",
  "cells",
  "checkerboard",
  "cubes",
  "cubesnake",
  "drip",
  "exclusion",
  "eye",
  "fireflies",
  "flower",
  "geometry",
  "graph",
  "grid",
  "grow_clock",
  "hallway",
  "hills",
  "hypercube",
  "iris",
  "light_clock",
  "mandala",
  "mandala2.0",
  "mandala3D",
  "mondrian",
  "nested_cubes",
  "orb",
  "rainbow",
  "recurse",
  "rhombus",
  "rps",
  "sin_wave",
  "supernova",
  "swarm",
  "swarm_clock",
  "tiedye",
  "tiles",
  "tile_wave",
  "topography",
  "tree",
  "void",
  "wave",
  "wiggles",
];
let p = [];

let w = 300;
let h = 60;
let keyCooloff = 0;
let activeIndex = 0;
const padding = 100;

const buttons = ["reboot", "home", "previous", "next", "select"];
function setup() {
  angleMode(DEGREES);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  colorMode(HSB, 100);


  createCanvas(1080, 1920);
  paths.push("random")
  loadPages();
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = 5;
  drawingContext.shadowBlur = 20;
}

const loadPages = () => {
  let row = 0;

  for (let i = 0; i < paths.length; i++) {
    if (i % 3 === 0 && i > 0) {
      row++;
    }
    p.push(
      new Page(
        (width / 6 + (i * width) / 3) % width,
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
  if (keyCode === INTERACTION_KEY) {
    let newPath = paths[activeIndex];
    if (newPath === "random") {
      newPath = random(paths);
    }
    let shuffledPaths = shuffle(paths.filter(x => x !== newPath && x !== "random"))
    shuffledPaths.push(newPath)
    localStorage.setItem('paths', shuffledPaths);
    localStorage.setItem('index', -1)

    location.href = `./${newPath.replaceAll("_", "")}/index.html`;
  }
}

function draw() {
  drawingContext.shadowColor = "black";
  background(59, 22, 60);
  textAlign(CENTER, CENTER);
  for (let page of p) {
    page.display();
  }
  textSize(18);
  stroke(59, 22, 30);
  fill(59, 22, 30);
  drawingContext.shadowColor = "#00000000";
  for (let i = 0; i < buttons.length; i++) {
    let offset = 350 + i * 85;
    let heightOff = height - (i % 2 === 0 ? 60 : 80);
    line(offset, height, offset, heightOff);
    text(buttons[i], offset, heightOff - 15);
  }
  if (keyCooloff > 5) {
    if (keyIsDown(RIGHT_KEY)) {
      activeIndex = (activeIndex + 1) % p.length;
    } else if (keyIsDown(LEFT_KEY)) {
      activeIndex = activeIndex - 1;
      if (activeIndex < 0) {
        activeIndex += p.length;
      }
    }
    keyCooloff = 0;

  }

  keyCooloff++;

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
