function setup() {
  createCanvas(720, 1280);
  strokeWeight(0.1);
  colorMode(HSB, 100)
  angleMode(DEGREES)
  noStroke();
  loadNodes();
}
let n = [];
let FRAMES = 50;
let COUNT = 180;
let OFFSET = 100;

function draw() {
  background(0, 10);
  updateNodes();
}

reset = () =>{
  background(0)
  n = [];
  loadNodes();
  n[0].sending = true
}

updateNodes = () => {
  for (let i = 0; i < n.length; i++) {
    n[i].display();
    n[i].send();
    // if(frameCount % FRAMES*10 === 0 && frameCount !== 0){
    // n[i].sender.pop()
    // }
  }
  if (n.filter((node) => node.sending).length === 0) {
    reset();
    // n[floor(random(0, n.length - 1))].sending = true;
    // for (let i = 0; i < n.length; i++) {
    //   n[i].sender = []
    // }
  }
}

loadNodes = () => {
  for (let i = 0; i < COUNT; i++) {
    let ranX;
    let ranY;
    do {
       ranX = random(20, width - 20);
       ranY = random(20, height - 20);
    } while (findCloseNodes(ranX, ranY))

    n.push(new Node(ranX, ranY, i))
  }
  for (let i = 0; i < n.length; i++) {
    n[i].calculateNeighbors();
  }
  n[0].sending = true;
}

findCloseNodes = (x, y) => {
  for (let node of n) {
    let d = dist(x, y, node.x, node.y);
    if (d < 30) {
      return true
    }
  }
  return false

}
class Node {
  constructor(x, y, i) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.neighbors = [];
    this.sending = false;
    this.time = 0;
    this.sender = [];
    this.delay = floor(random(30, 60))
    this.sendCount = 0;
  }

  calculateNeighbors() {
    for (let i = 0; i < n.length; i++) {
      if (this.i !== i) {
        let d = dist(this.x, this.y, n[i].x, n[i].y);
        if (abs(d) < OFFSET) {
          let tempNeigh = {
            index: i,
            x: n[i].x,
            y: n[i].y,
            dx: n[i].x - this.x,
            dy: n[i].y - this.y,
            sx: this.x,
            sy: this.y
          }
          this.neighbors.push(tempNeigh);

        }
      }
    }
  }

  display() {
    if (this.sending) {
      fill(frameCount / 10 % 100, 100, 100)
    } else {
      fill(255)

    }
    ellipse(this.x, this.y, 5, 5);
    for (let {
        index,
        x,
        y
      } of this.neighbors) {
      if (this.i < index) {
        if (this.sending) {
          stroke(100, 80)
        } else {
          stroke(100, 10)
        }
        line(this.x, this.y, x, y);
        noStroke();
      }
    }
  }

  send() {
    if (this.sending) {
      if (this.time < FRAMES + this.delay) {
        if (this.time >= this.delay) {

          for (let neigh of this.neighbors) {
            fill(((neigh.x + neigh.y * frameCount) / 500) % 100, 100, 100, 80);
            let m = map(this.time, 0, this.delay + FRAMES, 3, 10)
            ellipse(neigh.sx, neigh.sy, m, m);
            neigh.sx += neigh.dx / FRAMES
            neigh.sy += neigh.dy / FRAMES

          }
        }
        this.time++;
      } else {
        // this.sending = false;
        this.sendCount++;
        this.neighbors = []
        this.calculateNeighbors();
        for (let neigh of this.neighbors) {
          if (n[neigh.index].sendCount <= 10) {
            n[neigh.index].sending = true;
          }
        }
        this.time = 0;

      }

    }
    if (this.sendCount > 10) {
      this.sending = false;
    }
  }
}