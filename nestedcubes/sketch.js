setup = () => {
  createCanvas(1080, 1920, WEBGL);

  rectMode(CENTER);
  angleMode(DEGREES);
  // noStroke();
  // strokeWeight(0.5);
  colorMode(HSB, 360);
  SIZE = width / 45;
  loadCubes();

  restart();
};
let c = [];
let SIZE;
let fc = 0;
let colOff;
const CAMERA_MULTIPLIER = 600;

let count = 6;

const drawModes = ["fill", "transparent", "stroke", "hue"];

const INTERACTION_KEY = 53;
function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    restart();
  }
}

const restart = () => {
  shuffle(drawModes, true);
  colOff = random(360);

  // col = color(random(225), random(225), random(225));
};

draw = () => {
  // background(180);
  push();
  translate(0, 0, -1000);
  noStroke();
  fill(180, 120);
  rect(0, 0, width * 20, height * 20);
  pop();
  currDrawMode = drawModes[0];
  // ambientLight(360, 0, 360);
  // ambientLight(60);
  camera(
    sin(frameCount) * CAMERA_MULTIPLIER +
    cos(frameCount * 1.1) * CAMERA_MULTIPLIER,
    (cos(frameCount * 0.9) * CAMERA_MULTIPLIER) / 6,
    CAMERA_MULTIPLIER,
    0,
    0,
    0,
    0,
    1,
    0
  );
  // specularColor(255, 360, 360);

  //   pointLight(
  //     100,
  //     100 / 4,
  //     100 / 2,
  //     (sin(frameCount) * width) / 4,
  //     (cos(frameCount) * width) / 4,
  //     width / 10
  //   );
  // pointLight(360, 0, 360, 0, 0, 0);

  rotateX(60);
  rotateZ(fc);
  rotateY(fc);
  for (let i = 0; i < c.length; i++) {
    c[i].move();
    c[i].display();
  }
  fc++;

  if (fc % 2000 === 0) {
    restart()
  }
};

class Cube {
  constructor(x, y, z) {
    [this.x, this.y, this.z] = [x, y, z].map(
      (v) => -SIZE * (count / 2) + v * SIZE
    );
    this.off = 1;
  }
  display() {
    const { x, y, z, off } = this;
    let d = dist(x, y, z, 0, 0, 0);
    let m = map(d, 0, 200, 0, 1);
    push();

    translate(x * off, y * off, z * off);
    // ambientMaterial((d * 2 + fc) % 360, 360, 360);
    if (currDrawMode === "fill") {
      fill((d * 2 + fc + colOff) % 360, 360, 360);
    } else if (currDrawMode === "transparent") {
      fill((d * 2 + fc + colOff) % 360, 360, 360, 100);
    } else if (currDrawMode === "stroke") {
      noFill();
      stroke((d * 2 + fc + colOff) % 360, 360, 360);
    } else if (currDrawMode === "hue") {
      fill(fc % 360, 360, sin(d * 2 + fc + colOff) * 360 % 360);
    }

    box(SIZE - ((off - 1) * m * width) / 8);

    pop();
  }
  move() {
    this.off += sin(fc) / (width / 5);
  }
}

loadCubes = () => {
  for (let i = 0; i <= count; i++) {
    for (let j = 0; j <= count; j++) {
      for (let k = 0; k <= count; k++) {
        c.push(new Cube(i, j, k));
      }
    }
  }
};

pad = (a, b) => (1e15 + a + "").slice(-b);
