// HW 5: Narrative Visualization
registerSketch('sk5', function (p) {
  p.preload = function () {
    hourlyData = p.loadJSON("../data/hourly_spotify_data.json");
  };

  p.setup = function () {
    p.createCanvas(800, 800);

    maxMinutes = 0;
    for (let h of Object.values(hourlyData)) {
      if (h.minutesPlayed > maxMinutes) {
        maxMinutes = h.minutesPlayed;
      }
    }
    console.log("maxMinutes:", maxMinutes)
  };

  p.draw = function () {
    p.background(250);

  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
