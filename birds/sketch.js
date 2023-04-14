let flock;

function setup() {
  createCanvas(1080, 1920);
  colorMode(HSB, 100);
  angleMode(DEGREES);
  noStroke();
  flock = new Flock();
  for (let i = 0; i < 200; i++) {
    let b = new Boid(random(width), random(height));
    flock.add(b);
  }

  for (let i = 0; i < 40; i++) {
    c.push(new Cloud());
  }
  restart();
}
let COHESION = 0;
let ALIGNMENT = 0;
let SEPARATION = 0;
const COHESION_CONST = 1.0;
const ALIGNMENT_CONST = 1.0;
const SEPARATION_CONST = 1.5;
let colorModes = ["rainbow", "blur", "sky", "sky", "sky"];
let noiseVal = 0.002;
let c = [];
const INTERACTION_KEY = 53;
function keyPressed() {
  if (keyCode === INTERACTION_KEY) {
    restart();
  }
}

const restart = () => {
  COHESION = 0;
  ALIGNMENT = 0;
  SEPARATION = 0;
  flock.randomizeVelocity();
  colorModes = shuffle(colorModes);
};

function addMult(con, val) {
  if (val < con) {
    val += 0.005;
  }
  return val;
}
function draw() {
  currColorMode = colorModes[2];
  if (currColorMode === "blur") {
    background(0, 10);
  } else if (currColorMode === "rainbow") {
    background(0);
  } else if (currColorMode === "sky") {
    background((sin(frameCount / 10) * 25 + 80) % 100, 30, 80);
  }
  COHESION = addMult(COHESION_CONST, COHESION);

  ALIGNMENT = addMult(ALIGNMENT_CONST, ALIGNMENT);
  SEPARATION = addMult(SEPARATION_CONST, SEPARATION);

  if (currColorMode === "sky") {
    for (let cloud of c) {
      cloud.display();
    }
  }
  flock.run();

  if (frameCount % 10000 === 0) {
    restart();
  }
}

class Cloud {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.w = random(100, 200);
    this.h = random(100, 200);

    this.count = floor(random(1, 10));

    this.offs = Array.apply(null, Array(this.count)).map(() => ({
      x: random(this.w),
      y: random(this.h),
      w: random(100, 200),
      h: random(100, 200),
      o: random(20, 60),
    }));
  }

  display() {
    let n = noise(this.x * noiseVal, this.y * noiseVal, frameCount * noiseVal);
    this.move(n);

    // let opacity = map(n, 0, 1, 0, 100);
    let opacity = 20;
    // if (n > 0.5) {
    // ellipse(this.x, this.y, this.w, this.h);
    for (let { x, y, w, h, o } of this.offs) {
      fill(255, o);

      ellipse(this.x + x, this.y + y, w, h);
    }
  }

  move(n) {
    this.x += sin(n * 360);
    this.y += cos(n * 360);
    this.borders();
  }

  borders() {
    if (this.x < -this.w * 2) {
      this.x = width + this.w * 2;
    }
    if (this.y < -this.h * 2) {
      this.y = height + this.h * 2;
    }
    if (this.x > width + this.w * 2) {
      this.x = -this.w * 2;
    }
    if (this.y > height + this.h * 2) {
      this.y = -this.h * 2;
    }
  }
}

class Flock {
  constructor() {
    this.boids = [];
  }

  run() {
    for (let boid of this.boids) {
      boid.run(this.boids); // Passing the entire list of boids to each boid individually
    }
  }

  randomizeVelocity() {
    for (let boid of this.boids) {
      boid.velocity = createVector(random(-5, 5), random(-5, 5));
    }
  }
  add(b) {
    this.boids.push(b);
  }
}

class Boid {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-5, 5), random(-5, 5));
    this.position = createVector(x, y);
    this.size = random(3, 10);
    this.maxspeed = 3; // Maximum speed
    this.maxforce = 0.05; // Maximum steering force
    this.col = random(100);
    this.flapOff = random(360);
    this.flapSpeed = random(3, 10);

    this.skyCol = random(0, 20);
  }

  run(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.display();
  }
  applyForce(force) {
    this.acceleration.add(force);
  }

  flock(boids) {
    let sep = this.separate(boids); // Separation
    let ali = this.align(boids); // Alignment
    let coh = this.cohesion(boids); // Cohesion
    // Arbitrarily weight these forces
    sep.mult(SEPARATION);
    ali.mult(ALIGNMENT);
    coh.mult(COHESION);
    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);

    this.coh = coh;
  }

  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    return steer;
  }

  display() {
    let theta = this.velocity.heading() + 90;
    if (currColorMode !== "sky") {
      fill((theta / 3.6 + frameCount) % 100, 100, 100);
    } else {
      fill(this.skyCol);
    }

    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    let flapMult =
      sin(((frameCount + this.flapOff) * this.velocity.heading()) / 100) *
      this.size;
    beginShape();
    vertex(0, -this.size * 2); //TIP
    vertex(-this.size / 2, -this.size);

    vertex(-this.size * 3 - flapMult, -this.size / 2 + flapMult); // left wing bottom
    vertex(-this.size * 3 - flapMult, this.size / 2 + flapMult / 2); // left wing top
    vertex(-this.size / 1.5, 0);
    vertex(-this.size / 1.5, this.size);

    vertex(-this.size, this.size * 2); //TAIL LEFT
    vertex(0, this.size * 1.5);
    vertex(this.size, this.size * 2); //TAIL RIGHT
    vertex(this.size / 1.5, this.size);
    vertex(this.size / 1.5, 0);
    vertex(this.size * 3 + flapMult, this.size / 2 + flapMult / 2); //right wing top
    vertex(this.size * 3 + flapMult, -this.size / 2 + flapMult); //right wing bottom
    vertex(this.size / 2, -this.size);

    endShape(CLOSE);

    pop();
  }

  borders() {
    if (this.position.x < -this.size) this.position.x = width + this.size;
    if (this.position.y < -this.size) this.position.y = height + this.size;
    if (this.position.x > width + this.size) this.position.x = -this.size;
    if (this.position.y > height + this.size) this.position.y = -this.size;
  }

  separate(boids) {
    let desiredseparation = 25.0;
    let steer = createVector(0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if (d > 0 && d < desiredseparation) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  align(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighbordist) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  cohesion(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighbordist) {
        sum.add(boids[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
    } else {
      return createVector(0, 0);
    }
  }
}
