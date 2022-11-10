class Wall {
  //type is either "left" or "right"
  //w is width
  constructor(type, w) {
    this.type = type;
    this.w = w;
  }

  draw() {
    push();

    noStroke();
    fill(200);

    if (this.type == "left") {
      rect(0, 0, this.w, height);
    }
    else if (this.type == "right") {
      rect(width-this.w, 0, this.w, height);
    }

    pop();
  }
};
