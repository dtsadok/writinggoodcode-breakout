//these will be initialized in setup()
let screen;
let ball;
let paddle;
let bricks;
let leftWall;
let rightWall;
let theFloor;

function setup() {
  createCanvas(500, 500);

  screen = new Screen();

  leftWall = new Wall("left", 25);
  rightWall = new Wall("right", 25);
  theFloor = new Floor(25);

  ball = new Ball(width/2, height/2);
  paddle = new Paddle(width/2, height-100);
  bricks = new Bricks(4, 18, 25, 10);
}

function draw() {
  screen.clear();

  if (bricks.anyLeft() === false) {
    screen.drawVictory();

    return;
  }

  leftWall.draw();
  rightWall.draw();
  theFloor.draw();
  ball.draw();
  bricks.draw();
  paddle.draw();

  ball.debugCoords();

  if (Collisions.checkBallPaddle()) {
    ball.moveUp();
  }

  if (Collisions.checkLeftWall()) {
    ball.moveRight();
  }

  if (Collisions.checkRightWall()) {
    ball.moveLeft();
  }

  if (Collisions.checkCeiling()) {
    ball.moveDown();
  }

  if (Collisions.checkFloor()) {
    //ball.stop();

    ball.moveUp();
  }

  for (let i=0; i < bricks.rows; i++) {
    for (let j=0; j < bricks.cols; j++) {
      if (bricks.active[i][j]) {
        const brickX = leftWall.w + j * bricks.brick.w;
        const brickY = i * bricks.brick.h;

        //check if ball has collided with brick
        if (Collisions.checkBrick(brickX, brickY)) {
            bricks.active[i][j] = false;
            ball.moveDown();

            break;
        }
      }
    }
  }

  ball.update();
  paddle.update();
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      paddle.moveLeft();
      break;

    case RIGHT_ARROW:
      paddle.moveRight();
      break;
  }
}

function keyReleased() {
  paddle.stop();
}
