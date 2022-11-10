const Collisions = {
  checkBallPaddle: function() {
    return ball.x + ball.r/2 > paddle.x &&
           ball.x - ball.r/2 < paddle.x + paddle.w &&
           ball.y + ball.r/2 > paddle.y &&
           ball.y - ball.r/2 < paddle.y + paddle.h;
  },

  //check if ball has collided with left wall
  checkLeftWall: function() {
    return ball.x - ball.r/2 < leftWall.w;
  },

  //check if ball has collided with right wall
  checkRightWall: function() {
    return ball.x + ball.r/2 > width - rightWall.w;
  },

  //check if ball has collided with the ceiling
  checkCeiling: function() {
    return ball.y - ball.r/2 < 0;
  },

  //check if ball has collided with floor
  checkFloor: function() {
    return ball.y + ball.r/2 > height - theFloor.h;
  },

  checkBrick: function(brickX, brickY) {
    return ball.x + ball.r/2 > brickX && ball.x - ball.r/2 < brickX + bricks.brick.w &&
           ball.y + ball.r/2 > brickY && ball.y - ball.r/2 < brickY + bricks.brick.h;
  }
};
