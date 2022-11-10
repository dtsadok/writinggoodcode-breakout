class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.vx = 5;
    this.vy = 5;
  }

  draw() {
    push();

    fill(127);
    noStroke();

    ellipse(this.x, this.y, this.r);

    pop();
  }

  moveLeft() {
    this.vx = -Math.abs(this.vx);
  }

  moveRight() {
    this.vx = Math.abs(this.vx);
  }

  moveUp() {
    this.vy = -Math.abs(this.vy);
  }

  moveDown() {
    this.vy = Math.abs(this.vy);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }

  stop() {
    this.vx = 0;
    this.vy = 0;
  }

  debugCoords() {
    push();

    fill(0);
    stroke(0);
    textSize(32);

    text("ball.x: " + this.x, 100, 100);
    text("ball.y: " + this.y, 100, 150);

    pop();
  }
}
