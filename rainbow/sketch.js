function setup() {
  createCanvas(720, 1280, WEBGL);
  colorMode(HSB, 100);
  angleMode(DEGREES);
  loadTiles();
  noStroke();
}
let SIZE = 15;
let BOX_SIZE = 25;

let NOISE_VAL = 0.09;
let t = [];
let s = []
function draw() {
  camera(0, 800, 500, 0, 0, 0, 0, 1, 0);
  directionalLight(100, 0, 100, 0, 1000, -1);

  rotateZ(sin(frameCount/2)*45+45);

  background(0);
  
  
  push();
  translate(-200, 0, 100);
  let sSize = sin(frameCount * 5) * 25;
  specularMaterial((frameCount / 2) % 100, 50, 100);

  sphere(325 + sSize, 50, 50);
  pop();
  for (let tile of t) {
    tile.display();
  }

}

const loadTiles = () => {
  for (let i = 0; i < SIZE * 1.9; i++) {
    for (let j = 0; j < SIZE; j++) {
      t.push(new Tile(i, j));
    }
  }
};



class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    push();
    let zHeight =
      noise(
        (this.x + frameCount/2) * NOISE_VAL,
        this.y * NOISE_VAL
      ) *
        BOX_SIZE *
        10 -
      BOX_SIZE / 3;
    specularMaterial((zHeight + frameCount / 2) % 100, 100, 100);

    translate(
      -this.x * BOX_SIZE + BOX_SIZE * SIZE * 1.75,
      -this.y * BOX_SIZE + (BOX_SIZE * SIZE) / 2,
      zHeight / 2
    );
    box(BOX_SIZE, BOX_SIZE, zHeight);
    pop();
  }
}

