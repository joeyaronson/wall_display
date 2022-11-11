let p = [];
function setup() {
  createCanvas(720, 1280);
  textSize(width / 30);
  colorMode(HSB, 100);
  textAlign(CENTER);
}
const INTERACTION_KEY = 135;

function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    addNewParticle(true);
  }
}

function draw() {
  if (frameCount % 10 === 0 && p.length < 60) {
    p.push(new Particle(random(width), random(height)));
    p.push(new Particle(random(width), random(height)));
  }
  background(0, 20);

  for (let i = 0; i < p.length; i++) {
    let ax = 0;
    let ay = 0;

    for (let j = 0; j < p.length; j++) {
      if (i !== j) {
        let dis = dist(p[i].x, p[i].y, p[j].x, p[j].y);

        let dx = p[j].x - p[i].x;
        let dy = p[j].y - p[i].y;
        let d = sqrt(dx * dx + dy * dy);
        if (d < 1) {
          d = 1;
        }

        if (dis < 100) {
          let d2 = min(
            dist(p[i].x, p[i].y, width / 2, height / 2),
            dist(p[j].x, p[j].y, width / 2, height / 2)
          );
          let sw = map(d2, 0, 360, 0, 5);
          strokeWeight(sw);
          stroke((frameCount / 10 + p[i].h) % 100, 20, 100 - p[i].h * 2);
          line(p[i].x, p[i].y, p[j].x, p[j].y);
          strokeWeight(1);
        }

        let f = ((d - 300) * p[j].mass) / d;
        ax += f * dx;
        ay += f * dy;
      }
    }
    p[i].vx = p[i].vx * 0.97 + ax * p[i].mass;
    p[i].vy = p[i].vy * 0.97 + ay * p[i].mass;
  }

  for (let i = 0; i < p.length; i++) {
    p[i].move();
    p[i].display();
    if (p[i].timer > 300) {
      p.splice(i, 1);
    }
  }
}

function addNewParticle(ran) {
  if (ran) {
    p.push(new Particle(random(width), random(height), true));
  } else {
    p.push(new Particle(mouseX, mouseY));
  }
}

class Particle {
  constructor(x, y, ran) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.mass = random(0.003, 0.03);
    this.h = random(-10, 10);
    this.timer = 0;
    this.ran = ran;
  }

  display() {
    if(this.ran){
      fill((frameCount / 10 + this.h) + 25 % 100, 100, 100 - this.h * 2, 80);

          fill((frameCount / 10 + this.h) + 50 % 100, 100, 100 - this.h * 2, 80);

    }else{
          fill((frameCount / 10 + this.h) % 100, 100, 100 - this.h * 2, 80);

    }
    ellipse(this.x, this.y, this.mass * 1000, this.mass * 1000);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    this.timer++;
  }
}

function mouseClicked() {
  addNewParticle();
}

function mouseDragged() {
  addNewParticle();
}
