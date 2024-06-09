function setup() {
  createCanvas(400, 400);
}

function draw() {
  //background color
  background(0,0,0);
  //cars body
  //cars color
  fill(100); 
  rect(50,260,300,70);  
  // cars back
  rect(150, 150, 200, 120);  
  // front left tire
  ellipse(75,330, 40, 40);  
  // front right tire
  ellipse(130,330, 40, 40);  
  // back left tire
  ellipse(270,330, 40, 40 );
  // back right tire
  ellipse(320, 330, 40, 40)
  
}