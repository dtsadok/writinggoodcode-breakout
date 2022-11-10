class Screen {
  clear() {
    background(255);
  }

  drawVictory() {
    push();

    background("green");
    fill(255);

    const message = "You won!";
    const w = textWidth(message);

    text(message, width/2 - w/2, height/2);

    pop();
  }
}
