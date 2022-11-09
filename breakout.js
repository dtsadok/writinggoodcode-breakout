let ball = {
  x: null,
  y: null,
  r: 20,
  vx: 5,
  vy: 5,

  //notice change from ball to this
  draw: function() {
    push();

    fill(127);
    noStroke();

    ellipse(this.x, this.y, this.r);

    pop();
  },

  move: function() {
    this.x += this.vx;
    this.y += this.vy;
  },

  reverseX: function() {
    this.vx = -this.vx;
  },

  reverseY: function() {
    this.vy = -this.vy;
  },

  stop: function() {
    this.vx = 0;
    this.vy = 0;
  },

  debugCoords: function() {
    push();

    fill(0);
    stroke(0);
    textSize(32);

    text("ball.x: " + this.x, 100, 100);
    text("ball.y: " + this.y, 100, 150);

    pop();
  }
};

let paddle = {
  x: null,
  y: null,
  vx: 0,
  w: 80,
  h: 20,
  speed: 10,

  draw: function() {
    push();

    stroke(0);
    noFill();

    rect(this.x, this.y, this.w, this.h);

    pop();
  },

  move: function() {
    this.x += this.vx;
  },

  stop: function() {
    this.vx = 0;
  }
};

let brick = {
  w: 25,
  h: 10,
  rows: 4,
  cols: 18,

  //2D boolean array of whether bricks are there or not
  bricks: []
};

let wall = {
  w: 25,

  drawLeft: function() {
    push();

    noStroke();
    fill(200);

    rect(0, 0, this.w, height);

    pop();
  },

  drawRight: function() {
    push();

    noStroke();
    fill(200);

    rect(width-this.w, 0, this.w, height);

    pop();
  }
};

let theFloor = {
  h: 25,

  draw: function() {
    push();

    noStroke();
    fill(200);

    rect(0, height-this.h, width, this.h); //floor

    pop();
  }
};

let screen = {
  w: 500,
  h: 500,

  clear: function() {
    background(255);
  },

  drawVictory: function() {
    push();

    background("green");
    fill(255);

    const message = "You won!";
    const w = textWidth(message);

    text(message, width/2 - w/2, height/2);

    pop();
  }
};

function setup() {
  createCanvas(screen.w, screen.h);

  ball.x = width/2;
  ball.y = height/2;

  paddle.x = width/2;
  paddle.y = height-100;

  for (let i=0; i < brick.rows ; i++) {
    brick.bricks[i] = [];

    for (let j=0; j < brick.cols ; j++) {
      brick.bricks[i][j] = true;
    }
  }
}

function draw() {
  screen.clear();

  wall.drawLeft();
  wall.drawRight();
  theFloor.draw();

  if (checkForBricksLeft() === false) {
    screen.drawVictory();

    return;
  }

  ball.draw();
  drawBricks();
  paddle.draw();

  if (checkBallPaddle()) {
    ball.reverseY();
  }

  ball.debugCoords();

  if (checkLeftWall() || checkRightWall()) {
      ball.reverseX();
  }

  if (checkCeiling()) {
      ball.reverseY();
  }

  if (checkFloor()) {
    //ball.stop();

    ball.reverseY();
  }

  ball.move();
  paddle.move();
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
  paddle.stop();
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

function drawBricks() {
  push();

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
            ball.reverseY();
        }
      }
    }
  }

  pop();
}

function checkBallPaddle() {
  return ball.x + ball.r/2 > paddle.x &&
         ball.x - ball.r/2 < paddle.x + paddle.w &&
         ball.y + ball.r/2 > paddle.y &&
         ball.y - ball.r/2 < paddle.y + paddle.h;
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
