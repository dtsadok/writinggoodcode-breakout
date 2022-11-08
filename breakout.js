//Ball properties
var ballX;
var ballY;
var ballVelX;
var ballVelY;

var paddleX;
var paddleVelX;

//2D boolean array of whether bricks are there or not
var bricks = [];

function setup() {
  createCanvas(500, 500);

  ballX = width/2;
  ballY = height/2;
  ballVelX = 5; //right
  ballVelY = 5; //down

  paddleX = width/2;
  paddleVelX = 0;

  for (let i=0; i < 4 ; i++) {
    bricks[i] = [];

    for (let j=0; j < 20 ; j++) {
      bricks[i][j] = true;
    }
  }
}

function draw() {
  //clear screen
  background(255);

  noStroke();
  fill(200);

  //draw walls
  rect(0, 0, 25, height); //left wall
  rect(width-25, 0, 25, height); //right wall
  rect(0, height-25, width, 25); //floor

  //check if there are any bricks left
  var bricksLeft = false;
  for (let i=0; i < 4 ; i++) {
    for (let j=0; j < 20 ; j++) {
      if (bricks[i][j]) {
        bricksLeft = true;
        break;
      }
    }
  }

  if (!bricksLeft) {
    //draw victory screen
    background("green");
    fill(255);
    var message = "You won!";
    var w = textWidth(message);
    text(message, width/2 - w/2, height/2);

    return;
  }

  //draw ball
  ellipse(ballX, ballY, 20);

  //draw bricks
  noFill();
  stroke(0);
  for (let i=0; i < 4; i++) {
    for (let j=0; j < 18; j++) {
      if (bricks[i][j]) {
        rect(25 + j * 25, i * 10, 25, 10);

        //check if ball has collided with brick
        if (ballX > j*25 - 10 && ballX < j*25 + 25 &&
            ballY > i*10 - 10 && ballY < i*10 + 30) {
            bricks[i][j] = false;

            //ballVelX = -ballVelX;
            ballVelY = -ballVelY;
        }
      }
    }
  }

  //draw paddle
  stroke(0);
  noFill();
  rect(paddleX, height-100, 80, 20);

  //check if ball has collided with paddle
  if (ballX > paddleX-5 && ballX < paddleX+85 &&
      ballY > height-110 && ballY < height-100) {
      ballVelY = -ballVelY;
  }

  //debug ballX, ballY
  fill(0);
  stroke(0);
  textSize(32);
  text("ballX: " + ballX, 100, 100);
  text("ballY: " + ballY, 100, 150);

  //check if ball has collided with walls
  if (ballX < 35 || ballX > width-35) {
      ballVelX = -ballVelX;
  }

  //check if ball has collided with the ceiling
  if (ballY < 10) {
      ballVelY = -ballVelY;
  }

  //check if ball has collided with floor
  if (ballY > height-30) {
    //ballVelX = 0;
    //ballVelY = 0;

    ballVelY = -ballVelY;
  }

  //move ball
  ballX += ballVelX;
  ballY += ballVelY;

  paddleX += paddleVelX;
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      paddleVelX = paddleX > 0 ? -10 : 0;
      break;

    case RIGHT_ARROW:
      paddleVelX = paddleX < width-80 ? 10 : 0;
      break;
  }
}

function keyReleased() {
  paddleVelX = 0;
}
