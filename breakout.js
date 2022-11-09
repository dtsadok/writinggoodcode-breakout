let ball = {
  x: null,
  y: null,
  r: 20,
  vx: null,
  vy: null
};

let paddle = {
  x: null,
  y: null,
  vx: null,
  w: 80,
  h: 20,
  speed: 10
};

let brick = {
  w: 25,
  h: 10,
  rows: 4,
  cols: 18,
  //2D boolean array of whether bricks are there or not
  bricks: []
};

let wall = { w: 25 };
let theFloor = { h: 25 };

function setup() {
  createCanvas(500, 500);

  ball.x = width/2;
  ball.y = height/2;
  ball.vx = 5; //right
  ball.vy = 5; //down

  paddle.x = width/2;
  paddle.y = height-100;
  paddle.vx = 0;

  for (let i=0; i < brick.rows ; i++) {
    brick.bricks[i] = [];

    for (let j=0; j < brick.cols ; j++) {
      brick.bricks[i][j] = true;
    }
  }
}

function draw() {
  clearScreen();

  drawWalls();
  drawFloor();

  if (checkForBricksLeft() === false) {
    drawVictoryScreen();

    return;
  }

  drawBall();
  drawBricks();
  drawPaddle();

  if (checkBallPaddle()) {
    reverseBallY();
  }

  //debug ball.x, ball.y
  debugBallCoords();

  if (checkLeftWall() || checkRightWall()) {
      reverseBallX();
  }

  if (checkCeiling()) {
      reverseBallY();
  }

  if (checkFloor()) {
    //stopBall();

    reverseBallY();
  }

  moveBall();
  movePaddle();
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      paddle.vx = paddle.x > 0 ? -paddle.speed : 0;
      break;

    case RIGHT_ARROW:
      paddle.vx = paddle.x + paddle.w < width ? paddle.speed : 0;
      break;
  }
}

function keyReleased() {
  paddle.vx = 0;
}

function clearScreen() {
  background(255);
}

function drawWalls() {
  noStroke();
  fill(200);

  rect(0, 0, wall.w, height); //left wall
  rect(width-wall.w, 0, wall.w, height); //right wall
}

function drawFloor() {
  noStroke();
  fill(200);

  rect(0, height-theFloor.h, width, theFloor.h); //floor
}

//check if there are any bricks left
function checkForBricksLeft() {
  for (let i=0; i < brick.rows; i++) {
    for (let j=0; j < brick.cols; j++) {
      if (brick.bricks[i][j]) {
        return true;
      }
    }
  }

  return false;
}

function drawVictoryScreen() {
    background("green");
    fill(255);

    const message = "You won!";
    const w = textWidth(message);

    text(message, width/2 - w/2, height/2);
}

function drawBall() {
  fill(127);
  noStroke();

  ellipse(ball.x, ball.y, ball.r);
}

function drawBricks() {
  noFill();
  stroke(0);

  for (let i=0; i < brick.rows; i++) {
    for (let j=0; j < brick.cols; j++) {
      if (brick.bricks[i][j]) {
        const brickX = wall.w + j * brick.w;
        const brickY = i * brick.h;

        rect(brickX, brickY, brick.w, brick.h);

        //check if ball has collided with brick
        if (ball.x + ball.r/2 > brickX && ball.x - ball.r/2 < brickX + brick.w &&
            ball.y + ball.r/2 > brickY && ball.y - ball.r/2 < brickY + brick.h) {
            brick.bricks[i][j] = false;

            //reverseballX();
            reverseBallY();
        }
      }
    }
  }
}

function drawPaddle() {
  stroke(0);
  noFill();

  rect(paddle.x, paddle.y, paddle.w, paddle.h);
}

//check if ball has collided with paddle
function checkBallPaddle() {
  return ball.x + ball.r/2 > paddle.x &&
         ball.x - ball.r/2 < paddle.x + paddle.w &&
         ball.y + ball.r/2 > paddle.y &&
         ball.y - ball.r/2 < paddle.y + paddle.h;
}

function debugBallCoords() {
  fill(0);
  stroke(0);
  textSize(32);
  text("ball.x: " + ball.x, 100, 100);
  text("ball.y: " + ball.y, 100, 150);
}

//check if ball has collided with left wall
function checkLeftWall() {
  return ball.x - ball.r/2 < wall.w;
}

//check if ball has collided with right wall
function checkRightWall() {
  return ball.x + ball.r/2 > width - wall.w;
}

//check if ball has collided with the ceiling
function checkCeiling() {
  return ball.y - ball.r/2 < 0;
}

//check if ball has collided with floor
function checkFloor() {
  return ball.y + ball.r/2 > height - theFloor.h;
}

function moveBall() {
  ball.x += ball.vx;
  ball.y += ball.vy;
}

function movePaddle() {
  paddle.x += paddle.vx;
}

function reverseBallX() {
  ball.vx = -ball.vx;
}

function reverseBallY() {
  ball.vy = -ball.vy;
}

function stopBall() {
  ball.vx = 0;
  ball.vy = 0;
}
