class Bricks {
  constructor(rows, cols, w, h) {
    this.rows = rows;
    this.cols = cols;
    this.brick = {w: w, h: h};

    //2D boolean array of whether bricks are there or not
    this.active = [];

    for (let i=0; i < this.rows; i++) {
      this.active[i] = [];

      for (let j=0; j < this.cols; j++) {
        this.active[i][j] = true;
      }
    }
  }

  anyLeft() {
    //flat() will turn the array into a 1D array,
    //and indexOf() here will look for the first
    //true value in the flattened array.  If none
    //found, it will return -1.
    return this.active.flat().indexOf(true) > -1;
  }

  drawBrick(x, y) {
    rect(x, y, this.brick.w, this.brick.h);
  }

  draw() {
    push();

    noFill();
    stroke(0);

    for (let i=0; i < this.rows; i++) {
      for (let j=0; j < this.cols; j++) {
        if (this.active[i][j]) {
          const brickX = leftWall.w + j * this.brick.w;
          const brickY = i * this.brick.h;

          this.drawBrick(brickX, brickY);
        }
      }
    }

    pop();
  }
};
