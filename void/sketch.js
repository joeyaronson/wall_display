let size = 20;
let b = [];
function setup() {
  createCanvas(720, 1280);
  colorMode(HSB, 100);
  angleMode(DEGREES);
  loadBoxes();
  noStroke();
}

function loadBoxes() {
  for (let i = 0; i < width; i += size) {
    for (let j = 0; j < height; j += size) {
      b.push(new Box(i, j));
    }
  }
}

function draw() {
  for (let box of b) {
    box.display();
  }
}

class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    let d = dist(this.x,this.y,width/2,height/2)
    let val = sin(this.x)+cos(frameCount)*d ^ cos(this.y)*sin(frameCount/2)
    fill(((val + frameCount / 2 & d/10)+frameCount) % 100, 100, 100);
    rect(this.x, this.y, size);
  }
}
