function setup() {
  createCanvas(1080, 1920);
  loadPlayers();
  angleMode(DEGREES);
  rectMode(CENTER);
  colorMode(HSB, 100);
  textAlign(CENTER, CENTER);
  loadBg();
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = 5;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = "black";
}

const INTERACTION_KEY = 53;
function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    restart();
  }
}

const restart = () => {
  timer = 0;
  finished = false;
  p = [];
  loadPlayers();
  loadBg();
};

const types = ["rock", "paper", "scissors"];
const typeMap = { rock: "🪨", paper: "📜", scissors: "✂️" };
let COUNT = 99;
let p = [];
let finished = false;
let timer = 0;
const loadPlayers = () => {
  for (let i = 0; i < COUNT; i++) {
    p.push(new Player(random(width), random(height), types[i % 3], i));
  }

  for (let i = 0; i < COUNT; i++) {
    p[i].chooseTarget();
  }
};

const loadBg = () => {
  bg = random(360);
};

function draw() {
  background(220);
  bg += 0.05;
  bg1 = color(bg % 100, 40, 20);
  bg2 = color(bg % 100, 40, 100);
  let gradient = drawingContext.createLinearGradient(0, height, 0, 0);
  gradient.addColorStop(0, bg1.toString("#rrggbbaa"));

  gradient.addColorStop(1, bg2.toString("#rrggbbaa"));
  drawingContext.fillStyle = gradient;

  rect(width / 2, height / 2, width, height);
  textSize(40);

  for (let i = 0; i < p.length; i++) {
    p[i].move();
    if (frameCount % 2 === 0) {
      p[i].checkCollision();
    }
    p[i].display();
  }

  if (frameCount % 100 === 0) {
    finished = p.every((x) => x.t === p[0].t);
  }
  if (finished) {
    textSize(70);

    text(`${typeMap[p[0].t]} is the winner!`, width / 2, height / 2);
    timer++;
  }

  if (timer > 150) {
    restart();
  }
}

class Player {
  constructor(x, y, t, i) {
    this.x = x;
    this.y = y;
    this.t = t;
    this.targetIndex = -1;
    this.i = i;
  }

  chooseTarget() {
    let ti;
    let count = 0;
    do {
      ti = floor(random(COUNT));
      count++;
      if (count > 100) {
        break;
      }
    } while (this.t === p[ti].t || !this.checkWinner(this.t, p[ti].t));
    this.targetIndex = ti;
  }

  checkBounds() {
    return this.x < 0 || this.y < 0 || this.x > width || this.y > height;
  }

  checkWinner(player, enemy) {
    let winner;
    if (
      (player === "rock" && enemy === "paper") ||
      (player === "paper" && enemy === "scissors") ||
      (player === "scissors" && enemy === "rock")
    ) {
      winner = false;
    } else {
      winner = true;
    }
    return winner;
  }

  display() {
    text(typeMap[this.t], this.x, this.y);
  }
  move() {
    let target = p[this.targetIndex];
    let delx = target.x - this.x;
    let dely = target.y - this.y;

    let angle = atan2(delx, dely);

    let ax = sin(angle);
    let ay = cos(angle);
    this.x += ax;
    this.y += ay;

    if (frameCount % 200 === 0) {
      if (p[this.targetIndex].t === this.t) {
        this.chooseTarget();
      }
    }
  }

  checkCollision() {
    let collideIndex = -1;
    let enemies = p.filter((x) => x.t !== this.t);
    for (let i = 0; i < enemies.length; i++) {
      if (dist(enemies[i].x, enemies[i].y, this.x, this.y) < 40) {
        collideIndex = i;
        break;
      }
    }

    if (collideIndex >= 0) {
      if (!this.checkWinner(this.t, enemies[collideIndex].t)) {
        this.t = enemies[collideIndex].t;
        let index = enemies[collideIndex].i;
        p[index].chooseTarget();
      } else {
        this.chooseTarget();
      }
    }
  }
}
