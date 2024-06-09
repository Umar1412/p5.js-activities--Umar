function setup() {
  createCanvas(500, 500);
}

function draw() {
  background('#fae');

//body
fill (139,69,131);
rect (130,170,90,130)

//head
fill (139,69,131);
circle (175,120,110)
  
//eyes
fill(0,0,0);
ellipse(150,120,40,60);
ellipse(200,120,40,60);
  
// aliens legs
fill(139,69,131);
rect(150,300,10,120);
rect(190,300,10,120);
  
// alien hands
fill(139,69,131);
rect(120,180,15,120);
rect(210,180,15,120);
  
// mars floor
fill(139,69,19);
rect(0,420,500,120);

//spaceship
fill(128)
ellipse(400,80,200,50);
ellipse(400,50,90,50);

}