var font;
var points;

function preload() {
  font = loadFont("AgathiasStenchy.ttf"); // custom font loaded
}

function setup() {
  createCanvas(900, 900); // canvas size
  background(255); // background color
  stroke(0);
  points = font.textToPoints('Bath Spa University', 50, 200, 100, {sampleFactor: 0.350});
  
  for (var i = 0; i < points.length; i++) {
    var p = points[i];
    ellipse(p.x, p.y, 3, 3);
  }
}
