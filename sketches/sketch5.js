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
      
      let mobileBrightness = p.map(h.skipRate, 0, 1, 255, 20);
      let mobileColor = p.color(20, mobileBrightness, 10);
      
      let desktopBrightness = p.map(h.skipRate, 0, 1, 255, 30);
      let desktopColor = p.color(255, desktopBrightness, 50);
      
      let currentRadius = p.map(h.minutesPlayed, 0, maxMinutes, innerRadius, outerRadius);
      let mobileRadius = p.map(h.minutesPlayed * h.mobileShare, 0, maxMinutes, 0, currentRadius - innerRadius) + innerRadius;
      
      // Mobile segment
      p.fill(mobileColor);
      p.stroke(200);
      p.beginShape();
      for (let a = angleStart; a <= angleEnd; a += 0.01) {
        p.vertex(p.cos(a) * mobileRadius, p.sin(a) * mobileRadius);
      }
      for (let a = angleEnd; a >= angleStart; a -= 0.01) {
        p.vertex(p.cos(a) * innerRadius, p.sin(a) * innerRadius);
      }
      p.endShape(p.CLOSE);

      // desktop segment
      p.fill(desktopColor);
      p.stroke(200);
      p.beginShape();
      for (let a = angleStart; a <= angleEnd; a += 0.01) {
        p.vertex(p.cos(a) * currentRadius, p.sin(a) * currentRadius);
      }
      for (let a = angleEnd; a >= angleStart; a -= 0.01) {
        p.vertex(p.cos(a) * mobileRadius, p.sin(a) * mobileRadius);
      }
      p.endShape(p.CLOSE);

      p.noStroke();
      p.fill(150);
      p.textAlign(p.CENTER, p.CENTER);
      let labelR = outerRadius+ 20;
      p.text(i, p.cos(angleStart) * labelR, p.sin(angleStart) * labelR);
    }
    p.pop();

    let legendX = 20;
    let legendY = 20;
    p.fill(0);
    p.textAlign(p.LEFT);
    p.textSize(14);
    p.text("Device Type:", legendX, legendY);

    p.fill(20, 136, 10);
    p.rect(legendX, legendY + 10, 15, 15);
    p.fill(0);
    p.text("Mobile", legendX + 20, legendY + 22);
    
    p.fill(255, 110, 30);
    p.rect(legendX, legendY + 35, 15, 15);
    p.fill(0);
    p.text("Desktop", legendX + 20, legendY + 47);
  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
