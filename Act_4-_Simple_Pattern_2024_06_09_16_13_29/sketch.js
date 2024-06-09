let canvasWidth = 800; //define variables
let canvasHeight = 600;
let iceCreamWidth = 80;
let iceCreamHeight = 200;
let rows, cols;
let bgImage;

function preload() {
  // background image
  bgImage = loadImage('ice cream.jpg');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  rows = Math.floor(canvasHeight / iceCreamHeight);
  cols = Math.floor(canvasWidth / iceCreamWidth);
  noLoop();  // no loop so nothing is more than once
}

function draw() {
  // background image
  image(bgImage, 0, 0, canvasWidth, canvasHeight);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let x = col * iceCreamWidth + iceCreamWidth / 2;
      let y = row * iceCreamHeight + iceCreamHeight / 2;
      
      let randomOffset = random(-20, 20);
      if (random() > 0.5) {
        drawIceCream(x + randomOffset, y, random(50, 120));
      } else {
        drawIceCream(x + randomOffset, y, random(80, 140));
      }
    }
  }
}

// cone height and size
function drawIceCream(x, y, size) {
  let coneHeight = size * 1.5;
  let scoopSize = size;
  
  // the cone
  fill(255, 204, 153); // brown color
  beginShape();
  vertex(x, y);
  vertex(x - scoopSize / 3, y + coneHeight);
  vertex(x + scoopSize / 7, y + coneHeight);
  endShape(CLOSE);
  
  // the scoop, colors 
  let flavors = ['pink', 'chocolate', 'vanilla', 'mint'];
  let flavor = random(flavors);
  if (flavor === 'pink') fill(255, 105, 180); // Pink (strawberry)
  if (flavor === 'chocolate') fill(139, 69, 19); // Brown (chocolate)
  if (flavor === 'vanilla') fill(255, 255, 204); // Off-white (vanilla)
  if (flavor === 'mint') fill(152, 251, 152); // Light green (mint)
  
  ellipse(x, y, scoopSize, scoopSize);
}