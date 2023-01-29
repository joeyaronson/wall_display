function setup() {
  createCanvas(1080, 1920);
  colorMode(HSB, 100);
  loadHills();
  noStroke();
  drawingContext.shadowBlur = 80;
  drawingContext.shadowColor = "black";
}

let h = [];
let noiseVal = 0.001;
let bg = 0;
const INTERACTION_KEY = 53;
function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    restart();
  }
}

const restart = () => {
  h = [];
  loadHills();
};

const loadHills = () => {
  for (let i = 0; i < 6; i++) {
    let d = random([-1, 1]);
    let o = random([-1, 1]);
    h.push(new Hill(random(100, width - 100), random(100, height - 100), d, o));
  }
};

function draw() {
  bg += 0.05;
  bg1 = color(bg % 100, 40, 20);
  bg2 = color(bg % 100, 40, 80);
  let gradient = drawingContext.createLinearGradient(0, height, 0, 0);
  gradient.addColorStop(0, bg1.toString("#rrggbbaa"));

  gradient.addColorStop(1, bg2.toString("#rrggbbaa"));
  drawingContext.fillStyle = gradient;
  rect(0, 0, width, height);

  for (let hill of h) {
    hill.display();
  }

  if (frameCount % 10000 === 0) {
    restart();
  }
}

class Hill {
  constructor(x, y, d, o) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.o = o;
    this.off = random(500);
    this.noiseVal = random(0.002, 0.0009);

    let dir = random([0, 1]);
    this.gStartX = random(width);
    this.gStartY = dir === 0 ? -100 : height + 100;

    this.gEndX = random(width);
    this.gEndY = dir === 0 ? height + 100 : -100;
  }

  display() {
    if (this.o === -1) {
      this.displayVert();
    } else {
      this.displayHoriz();
    }
  }

  displayVert() {
    let bg1 = color((frameCount / 5 + this.off / 3) % 100, 80, 60, 50);
    let bg2 = color((frameCount / 3 + 200 + this.off) % 100, 80, 80, 50);
    let gradient = drawingContext.createLinearGradient(
      this.gStartX,
      this.gStartY,
      this.gEndX,
      this.gEndY
    );
    gradient.addColorStop(0, bg1.toString("#rrggbbaa"));

    gradient.addColorStop(1, bg2.toString("#rrggbbaa"));
    drawingContext.fillStyle = gradient;
    beginShape();
    if (this.d === -1) {
      vertex(width + 100, -100);
    } else {
      vertex(-100, -100);
    }
    for (let i = -10; i < height + 10; i += 10) {
      let off =
        noise(
          (i + this.off) * this.noiseVal,
          (frameCount + this.off) * this.noiseVal
        ) * 500;
      vertex(this.x + off + (i / 3) * this.d, i);
    }
    if (this.d === -1) {
      vertex(width + 100, height + 100);
    } else {
      vertex(-100, height + 100);
    }

    endShape(CLOSE);
    this.x += map(
      noise(
        (this.x + this.off) * this.noiseVal,
        (frameCount + this.off) * this.noiseVal
      ),
      0,
      1,
      -1,
      1
    );
  }

  displayHoriz() {
    let bg1 = color((frameCount / 3 + this.off * 2) % 100, 80, 60, 50);
    let bg2 = color((frameCount / 5 + 200 + this.off / 2) % 100, 80, 80, 50);
    let gradient = drawingContext.createLinearGradient(
      this.gEndX,
      this.gEndY,
      this.gStartX,
      this.gStartY
    );
    gradient.addColorStop(0, bg1.toString("#rrggbbaa"));

    gradient.addColorStop(1, bg2.toString("#rrggbbaa"));
    drawingContext.fillStyle = gradient;
    beginShape();
    vertex(-100, height + 100);

    for (let i = -10; i < width + 10; i += 10) {
      let off =
        noise(
          (i + this.off) * this.noiseVal,
          (frameCount + this.off) * this.noiseVal
        ) * 500;
      vertex(i, this.y + off + i * this.d);
    }
    vertex(width + 100, height + 100);

    endShape(CLOSE);
    this.y += map(
      noise(
        (this.y + this.off) * this.noiseVal,
        (frameCount + this.off) * this.noiseVal
      ),
      0,
      1,
      -1,
      1
    );
  }
}
