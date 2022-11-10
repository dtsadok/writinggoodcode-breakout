const Collisions = {
  checkBallPaddle: function(ball, paddle) {
    return ball.x + ball.r/2 > paddle.x &&
           ball.x - ball.r/2 < paddle.x + paddle.w &&
           ball.y + ball.r/2 > paddle.y &&
           ball.y - ball.r/2 < paddle.y + paddle.h;
  },

  //check if ball has collided with left wall
  checkLeftWall: function(ball, leftWall) {
    return ball.x - ball.r/2 < leftWall.w;
  },

  //check if ball has collided with right wall
  checkRightWall: function(ball, rightWall) {
    return ball.x + ball.r/2 > width - rightWall.w;
  },

  //check if ball has collided with the ceiling
  checkCeiling: function(ball) {
    return ball.y - ball.r/2 < 0;
  },

  //check if ball has collided with floor
  checkFloor: function(ball, theFloor) {
    return ball.y + ball.r/2 > height - theFloor.h;
  },

  checkBrick: function(ball, brickX, brickY) {
    return ball.x + ball.r/2 > brickX && ball.x - ball.r/2 < brickX + game.bricks.brick.w &&
           ball.y + ball.r/2 > brickY && ball.y - ball.r/2 < brickY + game.bricks.brick.h;
  }
};
