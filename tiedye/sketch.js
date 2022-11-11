function setup() {
	createCanvas(720, 1280);
	colorMode(HSB, 360);
	angleMode(DEGREES);
	// noStroke();
	strokeWeight(0.2);
	loadParticles();
	background(0);
  }
  
  let noiseVal = 0.009;
  let p = [];
  function draw() {
	for (let i = 0; i < p.length; i++) {
	  p[i].move();
	  p[i].display();
	}
	if (frameCount % 1500 === 0) {
	  restart();
	}
  }
  const INTERACTION_KEY = 135;
  
  function keyPressed() {
	if (keyCode === INTERACTION_KEY) {
	  restart();
	}
  }
  
  const restart = () => {
	p = [];
	loadParticles();
	background(0);
	noiseVal = random(0.001,0.01);
  };
  
  class Particle {
	constructor(x, y) {
	  this.x = x;
	  this.y = y;
	  this.n;
	}
  
	move() {
	  this.n = noise(this.x * noiseVal, this.y * noiseVal, frameCount * noiseVal);
	  let noi = map(this.n, 0, 1, -360, 360);
	  this.x += sin(noi);
	  this.y += cos(noi);
	}
  
	display() {
	  let d = dist(this.x, this.y, width / 2, height / 2);
	  let h = map(this.n, 0, 1, -50, 410);
	  stroke((d + h) % 360, 360, 360);
	  point(this.x, this.y);
	}
  }
  
  function loadParticles() {
	for (let i = 0; i < 10000; i++) {
	  p.push(new Particle(random(width), random(height)));
	}
  }
  