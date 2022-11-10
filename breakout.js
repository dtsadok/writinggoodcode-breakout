let game = {};

function setup() {
  createCanvas(500, 500);

  game.screen = new Screen();

  game.leftWall = new Wall("left", 25);
  game.rightWall = new Wall("right", 25);
  game.floor = new Floor(25);

  game.ball = new Ball(width/2, height/2);
  game.paddle = new Paddle(width/2, height-100);
  game.bricks = new Bricks(4, 18, 25, 10);
}

function draw() {
  game.screen.clear();

  if (game.bricks.anyLeft() === false) {
    game.screen.drawVictory();

    return;
  }

  game.leftWall.draw();
  game.rightWall.draw();
  game.floor.draw();
  game.ball.draw();
  game.bricks.draw();
  game.paddle.draw();

  game.ball.debugCoords();

  if (Collisions.checkBallPaddle(game.ball, game.paddle)) {
    game.ball.moveUp();
  }

  if (Collisions.checkLeftWall(game.ball, game.leftWall)) {
    game.ball.moveRight();
  }

  if (Collisions.checkRightWall(game.ball, game.rightWall)) {
    game.ball.moveLeft();
  }

  if (Collisions.checkCeiling(game.ball)) {
    game.ball.moveDown();
  }

  if (Collisions.checkFloor(game.ball, game.floor)) {
    //ball.stop();

    game.ball.moveUp();
  }

  for (let i=0; i < game.bricks.rows; i++) {
    for (let j=0; j < game.bricks.cols; j++) {
      if (game.bricks.active[i][j]) {
        const brickX = game.leftWall.w + j * game.bricks.brick.w;
        const brickY = i * game.bricks.brick.h;

        //check if ball has collided with brick
        if (Collisions.checkBrick(game.ball, brickX, brickY)) {
            game.bricks.active[i][j] = false;
            game.ball.moveDown();

            break;
        }
      }
    }
  }

  game.ball.update();
  game.paddle.update();
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      game.paddle.moveLeft();
      break;

    case RIGHT_ARROW:
      game.paddle.moveRight();
      break;
  }
}

function keyReleased() {
  game.paddle.stop();
}
