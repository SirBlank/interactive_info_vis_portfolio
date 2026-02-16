// HW 5: Narrative Visualization
registerSketch('sk5', function (p) {
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

    for (let i = 0; i < hourlyData.length; i++) {
      let h = hourlyData[i];
      let barHeight = p.map(h.minutesPlayed, 0, maxMinutes, 0, p.height - 100);
      p.fill(0, 255, 0);
      p.noStroke();
      p.rect(i * (p.width / hourlyData.length), p.height - barHeight, (p.width / hourlyData.length) - 2, barHeight);
    }
  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
