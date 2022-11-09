# Consider the following function:
 
    function drawBall() {
      fill(127);
      noStroke();

      ellipse(ballX, ballY, ballRad);

      if (ballX - ballRad/2 < 57) {
        ballVelX = -ballVelX;
      }
    }

 * Is the function appropriately named?  Why or why not?
 * Is this code avoiding magic numbers?  Why is this important?
 * Is this code avoiding global variables?  Why is this important?
 * Is there anything else that is confusing or hard to understand about this code?
 * Describe (in English, not code) two changes that could improve this code.
