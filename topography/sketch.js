function setup() {
	angleMode(DEGREES);
	colorMode(HSB, 100);
	createCanvas(1080, 1920, WEBGL);
	restart();
	noStroke();
	loadTiles();
  }
  
  const loadTiles = () => {
	for (let i = 0; i < COUNT; i++) {
	  for (let j = 0; j < COUNT; j++) {
		t.push(
		  new Tile(
			(-COUNT / 2) * SIZE + i * SIZE,
			(-COUNT / 2) * SIZE + j * SIZE,
			-300,
			i + j
		  )
		);
	  }
	}
  };
  
  const INTERACTION_KEY = 53;
  function keyPressed() {
	if (keyCode === INTERACTION_KEY) {
	  restart();
	}
  }
  const restart = () => {
	t = [];
	noiseVal = random(0.002, 0.001);
	frameCountOff = random(50000);
	loadTiles();
  };
  
  let t = [];
  let noiseVal;
  let HIEGHTMULT = 1200;
  let frameCountOff = 0;
  
  function draw() {
	background((frameCount / 10) % 100, 20, 100);
	colorMode(RGB);
	ambientLight(250, 250, 250);
	directionalLight(200, 200, 200, -1, 0.75, -1);
	colorMode(HSB, 100);
  
	rotateX(45);
	rotateZ(frameCount / 4);
	for (let tile of t) {
	  tile.display();
	}
  }
  let SIZE = 25;
  let COUNT = 30;
  
  class Tile {
	constructor(x, y, z, i) {
	  this.x = x;
	  this.y = y;
	  this.z = z;
	  this.w = SIZE;
	  this.h = 500;
	  this.i = i * random(-2, 2);
	  this.tree = noise(this.x * noiseVal * 4, this.y * noiseVal * 4) < 0.3;
	}
  
	display() {
	  this.calcualteNoise();
	  push();
	  let zOff = this.n;
	  translate(this.x, this.y, this.z + zOff / 2);
	  let h = this.h + zOff;
	  let colOff;
  
	  //water
	  if (h < 400) {
		colOff = map(h, 0, 400, 100, 0);
  
		fill(55, 100, 100 - colOff, 40);
		push();
		let oceanZ = h - 400;
		let oceanOff = h / 2;
		translate(0, 0, oceanOff - oceanZ / 2);
		box(this.w, this.w, oceanZ);
		pop();
	  }
  
	  //snow
	  if (h >= 700) {
		// fill(colors.snow);
		fill(100);
		push();
		let snowOff = h / 2;
		translate(0, 0, snowOff + SIZE / 6);
		box(this.w, this.w, SIZE / 3);
		pop();
	  }
  
	  //tree
	  if ((h > 525 && h < 575) || (h > 650 && h < 675)) {
		// fill(colors.trunk);
		fill(10, 100, 13);
		push();
		let treeOff = h / 2 + SIZE / 2;
		translate(0, 0, treeOff);
		box(this.w / 3, this.w / 3, SIZE);
  
		// fill(colors.leaves);
		fill(32, 100, 13);
		translate(0, 0, SIZE / 1.5);
		box(this.w / 2, this.w / 2, SIZE);
  
		pop();
	  }
	  if (h < 500) {
		colOff = map(h, 300, 500, 50, 0);
		fill(10, 40, 69 - colOff);
	  } else if (h >= 500 && h < 600) {
		colOff = map(h, 500, 600, 0, 30);
  
		fill(40, 51, 57 - colOff);
	  } else if (h >= 600) {
		colOff = map(h, 600, 800, 30, 0);
  
		fill(40, 4, 50 - colOff);
	  }
  
	  box(this.w, this.w, h);
	  pop();
	}
  
	calcualteNoise() {
	  this.n = map(
		noise(
		  (this.x + (frameCount + frameCountOff) * 4) * noiseVal,
		  (this.y + (frameCount + frameCountOff) * 4) * noiseVal
		),
		0,
		1,
		-500,
		500
	  );
	}
  }
  