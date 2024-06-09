
let song;
let fft;
let amplitude;
let balls = [];

// Preload function to load my audio file 
function preload() {
  song = loadSound('Audio.mp3'); // audio file
}

// Setup function
function setup() {
  createCanvas(windowWidth, windowHeight); 
  fft = new p5.FFT(); // Create a Fast Fourier Transform 
  amplitude = new p5.Amplitude(); // Amplitude for volume level 
  
  // Play the audio
  song.play();
  
  // Number of balls and storing them 
  for (let i = 0; i < 120; i++) { // Create 120 balls
    balls.push(new Ball(random(width), random(height))); 
    // New Ball object with random
  }
}

// Draw function
function draw() {
  background(30); // Set background color
  
  let spectrum = fft.analyze(); // Analyze the frequency spectrum of the audio
  let level = amplitude.getLevel(); // Get the volume level of the audio
  
  // Update and display each ball in balls
  for (let i = 0; i < balls.length; i++) {
    balls[i].update(spectrum, level); // Update the size of the ball based on the audio
    balls[i].display(); // Display the ball 
  }
}


class Ball {
  constructor(x, y) {
    this.x = x; // x coordinate of the ball
    this.y = y; // y coordinate of the ball
    this.size = random(10, 100); // Random size for ball
    this.color = color(random(255), random(255), random(255), 150); // Random color with transparency
  }
  
  // Update function to adjust the size of the ball based on the audio
  update(spectrum, level) {
    let index = floor(map(this.x, 0, width, 0, spectrum.length - 1)); // Map the x coordinate to the spectrum 
    let amp = spectrum[index]; 
    
    this.size = map(amp, 0, 255, 10, 100); // Map for a new size for the ball
  }
  
  // Display function to draw the ball on the canvas
  display() {
    fill(this.color); // fill color
    noStroke(); 
    ellipse(this.x, this.y, this.size, this.size); //  ellipse ball
  }
}
