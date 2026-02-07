registerSketch('sk4', function (p) {
  let radius;
  
  p.setup = function () {
    p.createCanvas(800, 800);
    radius = p.min(p.width, p.height) / 3;
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
    let goalSecond = Math.floor(s / 10) * 10;
    let angle = p.TWO_PI * (goalSecond / 60) - p.HALF_PI;
    let dotX = radius * 0.8 * p.cos(angle);
    let dotY = radius * 0.8 * p.sin(angle);

    p.fill(255, 0, 0);
    p.noStroke();
    p.ellipse(dotX, dotY, 20, 20);
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    radius = p.min(p.width, p.height) / 3;
  };
});
