//Ball properties
var ballX;
var ballY;
var ballR = 20;
var ballVelX;
var ballVelY;

var paddleX;
var paddleY;
var paddleVelX;
var paddleW = 80;
var paddleH = 20;
var paddleSpeed = 10;

var brickW = 25;
var brickH = 10;
var brickRows = 4;
var brickCols = 18;

//2D boolean array of whether bricks are there or not
var bricks = [];

var wallW = 25;
var floorH = 25;

function setup() {
  createCanvas(500, 500);

  ballX = width/2;
  ballY = height/2;
  ballVelX = 5; //right
  ballVelY = 5; //down

  paddleX = width/2;
  paddleY = height-100;
  paddleVelX = 0;

  for (let i=0; i < brickRows ; i++) {
    bricks[i] = [];

    for (let j=0; j < brickCols ; j++) {
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
  rect(0, 0, wallW, height); //left wall
  rect(width-wallW, 0, wallW, height); //right wall
  rect(0, height-floorH, width, floorH); //floor

  //check if there are any bricks left
  var bricksLeft = false;
  for (let i=0; i < brickRows ; i++) {
    for (let j=0; j < brickCols ; j++) {
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
  ellipse(ballX, ballY, ballR);

  //draw bricks
  noFill();
  stroke(0);
  for (let i=0; i < brickRows; i++) {
    for (let j=0; j < brickCols; j++) {
      if (bricks[i][j]) {
        var brickX = wallW + j * brickW;
        var brickY = i * brickH;

        rect(brickX, brickY, brickW, brickH);

        //check if ball has collided with brick
        if (ballX + ballR/2 > brickX && ballX - ballR/2 < brickX + brickW &&
            ballY + ballR/2 > brickY && ballY - ballR/2 < brickY + brickH) {
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
  rect(paddleX, paddleY, paddleW, paddleH);

  //check if ball has collided with paddle
  if (ballX + ballR/2 > paddleX && ballX - ballR/2 < paddleX+paddleW &&
      ballY + ballR/2 > paddleY && ballY - ballR/2 < paddleY+paddleH) {
      ballVelY = -ballVelY;
  }

  //debug ballX, ballY
  fill(0);
  stroke(0);
  textSize(32);
  text("ballX: " + ballX, 100, 100);
  text("ballY: " + ballY, 100, 150);

  //check if ball has collided with walls
  if (ballX - ballR/2 < wallW || ballX + ballR/2 > width - wallW) {
      ballVelX = -ballVelX;
  }

  //check if ball has collided with the ceiling
  if (ballY - ballR/2 < 0) {
      ballVelY = -ballVelY;
  }

  //check if ball has collided with floor
  if (ballY + ballR/2 > height - floorH) {
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
      paddleVelX = paddleX > 0 ? -paddleSpeed : 0;
      break;

    case RIGHT_ARROW:
      paddleVelX = paddleX + paddleW < width ? paddleSpeed : 0;
      break;
  }
}

function keyReleased() {
  paddleVelX = 0;
}
