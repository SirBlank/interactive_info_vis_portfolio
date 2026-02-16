// HW 5: Narrative Visualization
registerSketch('sk5', function (p) {
  let centerX;
  let centerY;
  let innerRadius = 100;
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
      let angle = p.map(i, 0, hourlyData.length, 0, p.TWO_PI);
      p.stroke(200);
      p.line(p.cos(angle) * innerRadius, p.sin(angle) * innerRadius, p.cos(angle) * outerRadius, p.sin(angle) * outerRadius);

    }
  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
