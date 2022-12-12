///////////////////////////////////////////////////////////////////////////////////
// VARIABLES
///////////////////////////////////////////////////////////////////////////////////
let t = [];
let SIZE = 120;
let sizeOpts = [120];
let phase = "wait";
let sw = 20;
let counter = 0;
let waitCounter = 0;
let r, g, b, lineCol, bgCol, rectCol;

let r2, g2, b2, lineCol2, bgCol2, rectCol2;

let DEBUG = false;
const INTERACTION_KEY = 53;

///////////////////////////////////////////////////////////////////////////////////
// HELPER FUNCS
///////////////////////////////////////////////////////////////////////////////////
function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    restart();
  }
}
const restart = () => {
  t = [];
  SIZE = random(sizeOpts);
  counter = 0;
  waitCounter = 0;
  sw = random(16, 20);
  loadTiles();
  chooseMovingTiles();
  chooseColors();
  chooseSecondaryColors();
};
const loadTiles = () => {
  for (let i = SIZE / 2; i < width; i += SIZE) {
    for (let j = SIZE / 2; j < height; j += SIZE) {
      t.push(new Tile(i, j));
    }
  }
};

const chooseMovingTiles = () => {
  t = t.map((x) => {
    x.m = random() < 0.3;
    return x;
  });
};

const chooseColors = () => {
  r = random(255);
  g = random(255);
  b = random(255);

  lineCol = color(random(255), random(255), random(255));

  bgCol = color(
    (r + random(30, 225)) % 255,
    (g + random(30, 225)) % 255,
    (b + random(30, 225)) % 255
  );

  rectCol = color(
    (r + random(30, 225)) % 255,
    (g + random(30, 225)) % 255,
    (b + random(30, 225)) % 255
  );
};

const chooseSecondaryColors = () => {
  r2 = random(255);
  g2 = random(255);
  b2 = random(255);

  lineCol2 = color(r2, g2, b2);

  bgCol2 = color(
    (r2 + random(30, 225)) % 255,
    (g2 + random(30, 225)) % 255,
    (b2 + random(30, 225)) % 255
  );

  rectCol2 = color(
    (r2 + random(30, 225)) % 255,
    (g2 + random(30, 225)) % 255,
    (b2 + random(30, 225)) % 255
  );
};

const shiftColors = () => {
  lineCol = lineCol2;
  bgCol = bgCol2;
  rectCol = rectCol2;
};

const phaseChanger = () => {
  if (phase === "move") {
    if (counter === 90) {
      phase = "wait";
      counter = 0;
      chooseMovingTiles();
      if (waitCounter % 3 === 0) {
        phase = "color";
        counter = 0;
        waitCounter++;
      }
    }
  } else if (phase === "wait") {
    if (counter === 180) {
      phase = "move";
      counter = 0;
      waitCounter++;
    }
  } else if (phase === "color") {
    if (counter === 180) {
      phase = "move";
      counter = 0;
      shiftColors();

      chooseSecondaryColors();
    }
  }
};

///////////////////////////////////////////////////////////////////////////////////
// SKETCH FUNCS
///////////////////////////////////////////////////////////////////////////////////
function setup() {
  rectMode(CENTER);
  angleMode(DEGREES);
  createCanvas(1080, 1920);
  restart();
}

function draw() {
  background(bgCol);
  if (phase === "color") {
    background(lerpColor(bgCol, bgCol2, map(counter, 0, 180, 0, 1)));
  }

  for (let tile of t) {
    tile.display();
    if (phase === "move") {
      tile.move();
    }
  }
  for (let tile of t) {
    tile.display2();
  }
  counter++;

  phaseChanger();
  if (DEBUG) {
    fill(255, 0, 255);
    textSize(50);
    text(phase, 100, 100);
    text(counter, 100, 150);
  }
}

///////////////////////////////////////////////////////////////////////////////////
// TILE CLASS
///////////////////////////////////////////////////////////////////////////////////
class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.a = random([0, 90]);
    this.t = random(["arc", "arc", "arc", "line"]);
    this.m = false;
    this.md = random([-1, 1]);
  }
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.a);
    if (phase === "move" && this.m) {
      scale(-sin(counter * 2) / 2 + 1);
    }
    noStroke();
    fill(rectCol);
    if (phase === "color") {
      fill(lerpColor(rectCol, rectCol2, map(counter, 0, 180, 0, 1)));
    }
    rect(0, 0, SIZE, SIZE);
    noFill();


    stroke(0);

    strokeWeight(sw);

    if (this.t === "arc") {
      arc(-SIZE / 2, -SIZE / 2, SIZE, SIZE, 0, 90);
      arc(SIZE / 2, SIZE / 2, SIZE, SIZE, 180, 270);
    } else {
      line(SIZE / 2, 0, -SIZE / 2, 0)
      line(0, SIZE / 2, 0, -SIZE / 2)
    }

    pop();
  }

  display2() {
    push();
    translate(this.x, this.y);
    rotate(this.a);
    if (phase === "move" && this.m) {
      scale(-sin(counter * 2) / 2 + 1);
    }
    noStroke();
    noFill();
    stroke(lineCol);
    if (phase === "color") {
      stroke(lerpColor(lineCol, lineCol2, map(counter, 0, 180, 0, 1)));
    }

    strokeWeight(sw / 3);



    if (this.t === "arc") {
      arc(-SIZE / 2, -SIZE / 2, SIZE, SIZE, 0, 90);
      arc(SIZE / 2, SIZE / 2, SIZE, SIZE, 180, 270);
    } else {
      line(SIZE / 2, 0, -SIZE / 2, 0)
      line(0, SIZE / 2, 0, -SIZE / 2)
    }

    pop();
  }
  move() {
    if (this.m) {
      this.a += this.md;
    }
  }
}
