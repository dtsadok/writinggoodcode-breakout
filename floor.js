class Floor {
  //h is height
  constructor(h) {
    this.h = h;
  }

  draw() {
    push();

    noStroke();
    fill(200);

    rect(0, height-this.h, width, this.h); //floor

    pop();
  }
};
