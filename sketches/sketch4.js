registerSketch('sk4', function (p) {
  let radius;
  let lastClickDiff = null;
  let easyMode = false;
  
  p.setup = function () {
    p.createCanvas(800, 800);
    radius = p.min(p.width, p.height) / 3;
  };

  p.mousePressed = function () {
    let currentTime = p.second() * 1000 + p.millis() % 1000;
    let goalSecond = Math.floor(p.second() / 10) * 10;
    let goalTimeMs = goalSecond * 1000;

    lastClickDiff = ((currentTime - goalTimeMs + 5000) % 10000) - 5000;
  };

  p.keyPressed = function () {
    if (p.key === 'e' || p.key === 'E') {
      easyMode = !easyMode;
    }
  };

  p.draw = function () {
    p.background(220);
    p.translate(p.width / 2, p.height / 2);

    p.stroke(0);
    for (let i = 0; i < 60; i++) {
      let angle = p.TWO_PI * i / 60;
      let x1 = radius * 0.9 * p.cos(angle);
      let y1 = radius * 0.9 * p.sin(angle);
      let x2 = radius * p.cos(angle);
      let y2 = radius * p.sin(angle);
      p.strokeWeight(i % 5 === 0 ? 3 : 1);
      p.line(x1, y1, x2, y2);
    }

    let s = p.second();
    let ms = p.millis() % 1000;
    let goalSecond = Math.floor(s / 10) * 10;
    let angle = p.TWO_PI * (goalSecond / 60) - p.HALF_PI;
    let dotX = radius * 0.8 * p.cos(angle);
    let dotY = radius * 0.8 * p.sin(angle);

    p.fill(255, 0, 0);
    p.noStroke();
    p.ellipse(dotX, dotY, 20, 20);

    if (easyMode) {
      let h = p.hour();
      let m = p.minute();
      let s = p.second();
      let ms = p.millis() % 1000;
      let timestr = p.nf(h, 2) + ":" + p.nf(m, 2) + ":" + p.nf(s, 2) + "." + p.nf(ms, 3);
      p.fill(0);
      p.textSize(24);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(timestr, 0, -radius - 40);
    }

    if (lastClickDiff !== null) {
      p.fill(0);
      p.textSize(16);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(`Last click difference: ${lastClickDiff} ms`, 0, radius + 50);
    }

    p.fill(0);
    p.textSize(14);
    p.textAlign(p.LEFT, p.BOTTOM);
    p.text("Mode: " + (easyMode ? "Easy" : "Hard") + " (Press 'E' to toggle)", -radius, radius + 80);
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    radius = p.min(p.width, p.height) / 3;
  };
});
