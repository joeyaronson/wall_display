function setup() {
  createCanvas(720, 1280);
  rectMode(CENTER);
  noFill();
  noStroke();
  angleMode(DEGREES);

  makeNodes();


  // array of colors: red, green blue
  colors = [
    color(255, 0, 0),
    color(0, 255, 0),
    color(0, 0, 255)
  ];

}

//making the array of nodes
let nodes = [];
let num;
let colors;
let modeChoices = ["square", "circle", "pixel", "ellipse"]
let currentMode;
let countChoices = [
  30,
  35,
  36,
  41,
  48,
  53,
  54,
  60,
  66,
  71,
  72,
  78,
  83,
  89,
  90,
  95,
  96,
  101,
  107,
  120,
  125,
  131,
  132,
  137,
  138,
  143,
  144,
  149,
  155,
  156,
  161,
  162,
  168,
  174,
  179,
  180
]
let count;

function draw() {
  //default blend mode
  blendMode(BLEND);
  background(255)
  // turn on exclusion
  blendMode(EXCLUSION);
  // display every node and move them
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].display();
    nodes[i].move();
  }

  if (nodes[0].a % 359 === 0) {
    restart()
  }
}

function restart() {
  nodes = [];
  makeNodes();

}

//fills the nodes array with the nodes
function makeNodes() {
  modeChoices = shuffle(modeChoices)
  currentMode = modeChoices[0]
  //set number of nodes
  countChoices = shuffle(countChoices)
  count = countChoices[0]


  //calculated number of degrees inbetween nodes
  num = 360 / count;

  //indexing for nodes
  // adds the nodes into the array
  for (let i = 0, c = 0; i < 360; i += num, c++) {
    nodes.push(new node(width / 2, height / 2, i, c));
  }
}

//node class
class node {
  //sets starting positions, angles and indexes
  constructor(x, y, a, c) {
    this.x = x;
    this.y = y;
    this.a = a;
    this.i = c;
  }

  //moves the nodes in circular motion
  move() {
    this.a += 0.05;
    this.x = this.x + sin(this.a) * 0.125;
    this.y = this.y + cos(this.a) * 0.125;
  }

  //draws the nodes
  display() {
    //fills node with either red green or blue depending on the index
    fill(colors[this.i % 3]);
    //translates to the position for rotation
    translate(this.x, this.y);
    if (currentMode === "square") {
      rect(0, 0, abs(sin(this.a) * 75) + 125, abs(cos(this.a) * 75) + 125, 50);
    } else if (currentMode === "pixel") {
      rect(0, 0, abs(sin(this.a) * 75) + 125, abs(cos(this.a) * 75) + 125);
    } else if (currentMode === "circle") {
      ellipse(0, 0, abs(sin(this.a) * 100) + 125);
    } else if (currentMode === "ellipse") {
      ellipse(0, 0, abs(sin(this.a) * 100) + 125, abs(cos(this.a + this.a) * 100) + 125);

    }


    //resets translation
    resetMatrix();
  }
}

//Joey Aronson 2019