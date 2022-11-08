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
  clearScreen();

  //draw walls
  drawWalls();
  drawFloor();

  //check if there are any bricks left
  if (checkForBricksLeft() === false) {
    //draw victory screen
    drawVictoryScreen();

    return;
  }

  //draw ball
  drawBall();

  //draw bricks
  drawBricks();

  //draw paddle
  drawPaddle();

  //check if ball has collided with paddle
  if (checkBallPaddle()) {
    reverseBallY();
  }

  //debug ballX, ballY
  debugBallCoords();

  //check if ball has collided with walls
  if (checkLeftWall() || checkRightWall()) {
      ballVelX = -ballVelX;
  }

  //check if ball has collided with the ceiling
  if (checkCeiling()) {
      reverseBallY();
  }

  //check if ball has collided with floor
  if (checkFloor()) {
    //stopBall();

    reverseBallY();
  }

  //move ball
  moveBall();

  //move paddle
  movePaddle();
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

function clearScreen() {
  background(255);
}

function drawWalls() {
  noStroke();
  fill(200);

  rect(0, 0, wallW, height); //left wall
  rect(width-wallW, 0, wallW, height); //right wall
}

function drawFloor() {
  noStroke();
  fill(200);

  rect(0, height-floorH, width, floorH); //floor
}

function checkForBricksLeft() {
  for (let i=0; i < brickRows; i++) {
    for (let j=0; j < brickCols; j++) {
      if (bricks[i][j]) {
        return true;
      }
    }
  }

  return false;
}

function drawVictoryScreen() {
    background("green");
    fill(255);

    var message = "You won!";
    var w = textWidth(message);

    text(message, width/2 - w/2, height/2);
}

function drawBall() {
  fill(127);
  noStroke();

  ellipse(ballX, ballY, ballR);
}

function drawBricks() {
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

            //reverseBallX();
            reverseBallY();
        }
      }
    }
  }
}

function drawPaddle() {
  stroke(0);
  noFill();
  rect(paddleX, paddleY, paddleW, paddleH);
}

function checkBallPaddle() {
  return ballX + ballR/2 > paddleX &&
         ballX - ballR/2 < paddleX + paddleW &&
         ballY + ballR/2 > paddleY &&
         ballY - ballR/2 < paddleY + paddleH;
}

function debugBallCoords() {
  fill(0);
  stroke(0);
  textSize(32);
  text("ballX: " + ballX, 100, 100);
  text("ballY: " + ballY, 100, 150);
}

function checkLeftWall() {
  return ballX - ballR/2 < wallW;
}

function checkRightWall() {
  return ballX + ballR/2 > width - wallW;
}

function checkCeiling() {
  return ballY - ballR/2 < 0;
}

function checkFloor() {
  return ballY + ballR/2 > height - floorH;
}

function moveBall() {
  ballX += ballVelX;
  ballY += ballVelY;
}

function movePaddle() {
  paddleX += paddleVelX;
}

function reverseBallX() {
  ballVelX = -ballVelX;
}

function reverseBallY() {
  ballVelY = -ballVelY;
}

function stopBall() {
  ballVelX = 0;
  ballVelY = 0;
}
