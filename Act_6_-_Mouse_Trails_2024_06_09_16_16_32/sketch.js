function setup() {
  createCanvas(500, 500);
  background(255);
}

// mouse drag function and circle color set to blue
function mouseDragged() {
  let ellipseColor = "red"; 
  
// fill color to the color blue
fill(ellipseColor); 
ellipse(mouseX, mouseY, 50); // size of the ellipse
}
