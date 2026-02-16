// HW 5: Narrative Visualization
registerSketch('sk5', function (p) {
  let centerX;
  let centerY;
  let innerRadius = 50;
  let outerRadius = 300;

  p.preload = function () {
    hourlyData = p.loadJSON("../data/hourly_spotify_data.json");
  };

  p.setup = function () {
    hourlyData = Object.values(hourlyData);
    p.createCanvas(700, 700);

    maxMinutes = 0;
    for (let h of hourlyData) {
      if (h.minutesPlayed > maxMinutes) {
        maxMinutes = h.minutesPlayed;
      }
    }
    console.log("maxMinutes:", maxMinutes)
  };

  p.draw = function () {
    p.background(250);
    centerX = p.width / 2;
    centerY = p.height / 2;

    p.push();
    p.translate(centerX, centerY);

    for (let i = 0; i < hourlyData.length; i++) {
      let h = hourlyData[i];
      let angleStart = p.map(i, 0, hourlyData.length, 0, p.TWO_PI) - p.HALF_PI; // Start from hour 0 at the top
      let angleEnd = p.map(i + 1, 0, hourlyData.length, 0, p.TWO_PI) - p.HALF_PI;
      
      let currentRadius = p.map(h.minutesPlayed, 0, maxMinutes, innerRadius, outerRadius);
      p.fill(0, 255, 0, 200);
      p.stroke(200);
      p.beginShape();
      for (let a = angleStart; a <= angleEnd; a += 0.01) {
        p.vertex(p.cos(a) * currentRadius, p.sin(a) * currentRadius);
      }
      for (let a = angleEnd; a >= angleStart; a -= 0.01) {
        p.vertex(p.cos(a) * innerRadius, p.sin(a) * innerRadius);
      }
      p.endShape(p.CLOSE);

      p.noStroke();
      p.fill(150);
      p.textAlign(p.CENTER, p.CENTER);
      let labelR = outerRadius+ 20;
      p.text(i, p.cos(angleStart) * labelR, p.sin(angleStart) * labelR);
    }
  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
