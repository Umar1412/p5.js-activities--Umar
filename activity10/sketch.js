let birdImg;
let bird;
let pipes = [];
let gameOver = false;
let score = 0;
let lives = 4;
let gameStarted = false;
let backgroundImage; // Variable to store background image

function preload() {
  birdImg = loadImage('flappy birddd.png'); // Load bird image
  backgroundImage = loadImage('starss.jpg'); // Load background image
}

function setup() {
  createCanvas(500, 470);
  bird = new Bird();
}

function draw() {
  background(135, 206, 235);
  image(backgroundImage, 0, 0, width, height);

  if (!gameStarted) {
    textSize(32);
    fill(255); // Green color
    textAlign(CENTER, CENTER);
    text('Press ENTER to Start', width / 2, height / 2);
  } else if (!gameOver) {
    bird.update();
    bird.display();

    //generate new pipe every 80 frame
    if (frameCount % 80 === 0) { 
      pipes.push(new Pipe());
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].display();

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1); //remove pipe when off screen and add score
        score++;
      }

      if (pipes[i].hits(bird)) { //if bird hits then lives reduces and if lives are 0 the game over is shown
        lives--;
        if (lives <= 0) {
          gameOver = true;
        } else {
          resetBird();
        }
      }
    }

    fill(255); // Green color
    textSize(32);
    text("Score: " + score, 10, 30);
    text("Lives: " + lives, 10, 60);
    textAlign(LEFT)
  } else {
    textSize(32);
    fill(255); // Green color
    textAlign(CENTER, CENTER);
    text('Game Over!', width / 2, height / 2);
    text('Press ENTER to Restart', width / 2, height / 2 + 40);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) { //bird jumps if up arrow key is pressed
    if (gameStarted && !gameOver) {
      bird.up(); 
    }
  } else if (key === ' ') { // if space bar is pressed you can start or restart
    if (!gameStarted || gameOver) {
      startGame(); 
    }
  }
}



function startGame() {
  gameStarted = true;
  gameOver = false;
  score = 0;
  lives = 4;
  bird = new Bird();
  pipes = [];
}

function resetBird() {
  bird = new Bird();
}

class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;
    this.gravity = 0.8; // Increased gravity
    this.lift = -17; // Adjusted lift for balance
    this.velocity = 0;
  }

  update() {
    this.velocity += this.gravity;
    this.velocity *= 0.9; // smoother movement
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
      lives--;
      if (lives <= 0) {
        gameOver = true;
      } else {
        resetBird();
      }
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }

  display() {
    // Draw bird image at current position
    image(birdImg, this.x, this.y, 50, 50);
  }

  up() {
    this.velocity = this.lift; // Directly set the velocity for consistent jumps
  }
}

class Pipe {
  constructor() {
    this.spacing = 200; // Increase spacing between pipes
    this.top = random(height / 6, (3 / 4) * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 80;
    this.speed = 6; // Increased speed to make the game faster
  }

  update() {
    this.x -= this.speed;
  }

  display() {
    fill(34, 139, 34);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  offscreen() {
    return this.x < -this.w;
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }
}
