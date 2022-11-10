class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.w = 80;
    this.h = 20;
    this.speed = 10;
  }

  draw() {
    push();

    stroke(0);
    noFill();

    rect(this.x, this.y, this.w, this.h);

    pop();
  }

  moveLeft() {
    this.vx = paddle.x > leftWall.w ? -this.speed : 0;
  }

  moveRight() {
    this.vx = this.x + this.w < width - rightWall.w ? this.speed : 0;
  }

  update() {
    this.x += this.vx;
  }

  stop() {
    this.vx = 0;
  }
}
