// HW 5: Narrative Visualization
registerSketch('sk5', function (p) {
  p.setup = function () {
    hourlyData = p.loadJSON("data/hourly_spotify_data.json")
    console.log(hourlyData)
    p.createCanvas(800, 800);
  };

  p.draw = function () {
    p.background(250);

  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
