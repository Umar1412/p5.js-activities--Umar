var img, x, y;
function preload(){
img = loadImage("tree.jpg");
}

function setup() {
  createCanvas(400, 400);
  background(0);
  noStroke();
}

function draw(){
x = random(width);
y = random(height);
var c = img.get(x,y);
fill(c[0],c[1],c[2],80);
rect (x,y,60,60);
  
  
  
}
