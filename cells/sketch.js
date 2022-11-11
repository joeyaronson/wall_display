function setup() {
	createCanvas(720, 1280);
	colorMode(HSB, 100);
	loadTiles();
	noStroke();
  }
  const INTERACTION_KEY = 135;
  
  function keyPressed() {
	if (keyCode === INTERACTION_KEY) {
	  t = [];
	  staticCounter = 0;
	  frameBuffer = [];
	  loadTiles();
	  background(0);
	}
  }
  
  function draw() {
	background(0, 10);
	for (let i = 0; i < t.length; i++) {
	  for (let j = 0; j < t[i].length; j++) {
		t[i][j].display();
		t[i][j].calculateNextFrame();
	  }
	}
	for (let i = 0; i < t.length; i++) {
	  for (let j = 0; j < t[i].length; j++) {
		t[i][j].updateStatus();
	  }
	}
  
	if (frameCount % 2 === 0) {
	  frameBuffer.push(flattenArr());
	}
	if (frameBuffer.length > 2) {
	  frameBuffer.shift();
	}
  
	if (frameBuffer[0] === frameBuffer[1]) {
	  staticCounter++;
	}
  
	if (staticCounter > 100) {
	  t = [];
	  staticCounter = 0;
	  frameBuffer = [];
	  loadTiles();
	  background(0);
	}
  }
  
  const flattenArr = () => {
	return t.reduce((acc, val) => {
	  return (
		acc +
		val.reduce((acc2, val2) => {
		  return (acc2 += val2.o);
		}, 0)
	  );
	}, 0);
  };
  let t = [];
  let staticCounter = 0;
  let frameBuffer = [];
  let SIZE = 10;
  const loadTiles = () => {
	for (let i = 0, ic = 0; i < width; i += SIZE, ic++) {
	  let row = [];
	  for (let j = 0, jc = 0; j < height; j += SIZE, jc++) {
		row.push(new Tile(i, j, ic, jc, random() < 0.6 ? 0 : 1));
	  }
	  t.push(row);
	}
  };
  
  class Tile {
	constructor(x, y, i, j, o) {
	  this.x = x;
	  this.y = y;
	  this.i = i;
	  this.j = j;
	  this.o = o;
	  this.no = 0;
	  this.lifeSpan = 0;
	  let xOffset = floor(width / SIZE);
	  let yOffset = floor(height / SIZE);
	  this.neighborIndexes = [
		{
		  x: (this.i - 1 + xOffset) % xOffset,
		  y: (this.j - 1 + yOffset) % yOffset,
		},
		{ x: (this.i - 1 + xOffset) % xOffset, y: (this.j + yOffset) % yOffset },
		{
		  x: (this.i - 1 + xOffset) % xOffset,
		  y: (this.j + 1 + yOffset) % yOffset,
		},
  
		{ x: this.i, y: (this.j - 1 + yOffset) % yOffset },
		{ x: this.i, y: (this.j + 1 + yOffset) % yOffset },
  
		{
		  x: (this.i + 1 + xOffset) % xOffset,
		  y: (this.j - 1 + yOffset) % yOffset,
		},
		{ x: (this.i + 1 + xOffset) % xOffset, y: this.j },
		{
		  x: (this.i + 1 + xOffset) % xOffset,
		  y: (this.j + 1 + yOffset) % yOffset,
		},
	  ];
	}
	display() {
	  if (this.o === 1) {
		fill((this.lifeSpan + frameCount) % 100, 100, 100);
	  } else {
		fill(0, 10);
	  }
	  rect(this.x, this.y, SIZE, SIZE);
	}
  
	calculateNextFrame() {
	  this.lifeSpan++;
	  let totalLiveNeighbors = this.neighborIndexes.reduce(
		(acc, val) => acc + t[val.x][val.y].o,
		0
	  );
	  if (this.o === 1) {
		if (totalLiveNeighbors < 2) {
		  this.no = 0;
		  this.lifeSpan = 0;
		} else if ([2, 3].includes(totalLiveNeighbors)) {
		  this.no = 1;
		} else if (totalLiveNeighbors > 3) {
		  this.no = 0;
		  this.lifeSpan = 0;
		}
	  } else {
		if (totalLiveNeighbors === 3) {
		  this.no = 1;
		}
	  }
	}
  
	updateStatus() {
	  this.o = this.no;
	}
  }
  