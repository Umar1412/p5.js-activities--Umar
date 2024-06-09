// Define variables 
let bird;
let pipes = [];
let gameOver = false;
let score = 0;
let lives = 3;  // 3 lives
let gameStarted = false;
let bgImage;

// background image
function preload() {
  bgImage = loadImage('images-8.jpeg'); image
}

function setup() {
  createCanvas(500, 470); // Create canvas
  bird = new Bird();
}

function draw() {
  background(bgImage); // Set background image

  // Information about what keys to use before game starts
  if (!gameStarted) {
    textSize(32);
    fill(255); // White color
    textAlign(CENTER, CENTER);
    text('Enter = Start, Top Arrow jump!', width / 2, height / 2); 
  } 
  
  // if the game started
  else if (!gameOver) {
    bird.update(); // Update bird 
    bird.display(); // Display bird
    
    // Generate pipes every 80 frames
    if (frameCount % 80 === 0) {
      pipes.push(new Pipe());
    }

    // Update and display each pipe
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].display();

      // Score goes higher when pipe is offscreen
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
        score++;
      }

      // Check if you hit the pipe with the bird
      if (pipes[i].hits(bird)) {
        lives--; // Reduce lives
        if (lives <= 0) {
          gameOver = true; // if you used all your lives
        } else {
          resetBird(); // Reset bird when you have lives 
        }
      }
    }

    // Display score and lives
    fill(255); // white color for score
    textSize(32);
    text("Score: " + score, 10, 30); 
    fill(100,0,0); // Red color for Lives
    text("Lives: " + lives, 10, 60); 
    textAlign(LEFT);
  } else {
    // Display game over text
    textSize(32);
    fill(255); // White
    textAlign(CENTER, CENTER);
    text('Game Over!', width / 2, height / 2); 
    fill(100,0,0); // red color for message if you lost all lives and want to restart
    text('Press ENTER and Try Again!', width / 2, height / 2 + 40); 
  }
}

// Key press Function
function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (gameStarted && !gameOver) {
      bird.up(); // Bird jumps with up arrow
    }
  } else if (keyCode === ENTER) {
    if (!gameStarted || gameOver) {
      startGame(); // Enter to start or restart
    }
  }
}


function startGame() {
  gameStarted = true;
  gameOver = false;
  score = 0;
  lives = 4; // Reset lives 
  bird = new Bird(); // Reset bird position
  pipes = []; // reset pipes
}

// Function to reset bird 
function resetBird() {
  bird = new Bird();
}

// Bird class
class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;
    this.gravity = 0.8;
    this.lift = -17;
    this.velocity = 0;
  }

  
  update() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    // When bird touches the bottom
    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
      lives--; // lose lives
      if (lives <= 0) {
        gameOver = true; // game over if no lives left
      } else {
        resetBird(); // Reset bird position theres lives left
      }
    }

    // Check if bird touches top
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }

  // Display bird
  display() {
    fill(255, 182, 193); // Set bird color to light pink
    rect(this.x, this.y, 50, 50); // Draw bird rectangle
  }

  // Make bird jump
  up() {
    this.velocity = this.lift;
  }
}

// Pipe class
class Pipe {
  constructor() {
    this.spacing = 200;
    this.top = random(height / 6, (3 / 4) * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 80;
    this.speed = 4;
  }

  // Update pipe position
  update() {
    this.x -= this.speed;
  }

  // Display pipe
  display() {
    fill(34, 139, 34); // Set pipe color to green
    rect(this.x, 0, this.w, this.top); // Draw upper pipe
    rect(this.x, height - this.bottom, this.w, this.bottom); // Draw lower pipe
  }

  
  offscreen() {
    return this.x < -this.w;
  }

  // When pipe hits the bird
  hits(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false; // Did not touch
  }
}
