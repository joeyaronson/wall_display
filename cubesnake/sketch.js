function setup() {
	createCanvas(1080, 1920, WEBGL);
	angleMode(DEGREES);
	colorMode(HSB, 100);
	restart();
	noStroke();
	strokeWeight(5);
  }
  let s = [];
  let colorModes = ["normal", "rainbow", "stroke", "rainbowStroke", "random"];
  let currentMode;
  const CAMERA_MULTIPLIER = 1000;
  let COUNT = 25;
  let SIZE = 100;
  const INTERACTION_KEY = 53;
  function keyPressed() {
	if (keyCode === INTERACTION_KEY) {
	  restart();
	}
  }
  
  const restart = () => {
	s = [];
	loadSnakes();
	colorModes = shuffle(colorModes);
  };
  function draw() {
	currentMode = colorModes[0];
	background((frameCount / 5) % 100, 50, 30);
	camera(
	  sin(frameCount) * CAMERA_MULTIPLIER,
	  (cos(frameCount) * CAMERA_MULTIPLIER) / 6,
	  CAMERA_MULTIPLIER,
	  0,
	  0,
	  0,
	  0,
	  1,
	  0
	);
  
	rotateZ(frameCount / 5);
  
	for (let snake of s) {
	  snake.display();
	  if (frameCount % 2 === 0) {
		snake.move();
	  }
	}
	s = s.filter((sn) => !sn.dead);
	if (s.length < COUNT) {
	  for (let i = 0; i < COUNT - s.length; i++) {
		s.push(
		  new Snake(random(-1000, 1000), random(-1000, 1000), random(-1000, 1000))
		);
	  }
	}
  
	if (frameCount % 2000 === 0) {
	  colorModes = shuffle(colorModes);
	}
  }
  
  const loadSnakes = () => {
	for (let i = 0; i < COUNT; i++) {
	  s.push(
		new Snake(random(-1000, 1000), random(-1000, 1000), random(-1000, 1000))
	  );
	}
  };
  
  class Snake {
	constructor(x, y, z) {
	  this.x = x;
	  this.y = y;
	  this.z = z;
	  this.tail = [];
	  this.chooseNewDir();
	  this.maxLen = floor(random(10, 50));
	  this.life = random(200, 500);
	  this.dead = false;
	  this.colStart = random(100);
	}
  
	chooseNewDir() {
	  let dirChoice = ["x", "y", "z"].filter((x) => x !== this.dir);
	  this.dir = random(dirChoice);
	  this.dirMult = random([-1, 1]);
	  this.dirTime = random(3, 5);
	}
  
	display() {
	  noStroke();
	  fill(100);
	  if (currentMode === "normal") {
		normalMaterial();
	  } else if (currentMode === "random") {
		emissiveMaterial((this.colStart + frameCount / 10) % 100, 100, 100);
		stroke((this.colStart + 50 + frameCount / 10) % 100, 100, 100);
	  }
	  for (let i = 0; i < this.tail.length; i++) {
		let startHue = frameCount + this.maxLen * 10 + i * 2;
  
		if (currentMode === "rainbow") {
		  emissiveMaterial(
			(frameCount + this.maxLen * 10 + i * 2) % 100,
			100,
			100
		  );
		} else if (currentMode === "stroke") {
		  stroke(startHue % 100, 100, 100);
		  noFill();
		} else if (currentMode === "rainbowStroke") {
		  stroke(startHue % 100, 100, 100);
		  emissiveMaterial((startHue + this.maxLen) % 100, 100, 100);
		}
		const { x, y, z } = this.tail[i];
		push();
		let size = map(i, 0, this.tail.length, SIZE / 10, SIZE - SIZE / 10);
		translate(x, y, z);
		box(size);
		pop();
	  }
	}
  
	move() {
	  if (this.life > 0) {
		this.tail.push({ x: this.x, y: this.y, z: this.z });
	  }
	  if (this.tail.length > this.maxLen || this.life < 0) {
		this.tail.shift();
	  }
  
	  this.x += this.dir === "x" ? 100 * this.dirMult : 0;
	  this.y += this.dir === "y" ? 100 * this.dirMult : 0;
	  this.z += this.dir === "z" ? 100 * this.dirMult : 0;
	  this.dirTime--;
	  if (this.dirTime < 0) {
		this.chooseNewDir();
	  }
	  this.life--;
	  if (this.tail.length === 0) {
		this.dead = true;
	  }
	}
  }
  