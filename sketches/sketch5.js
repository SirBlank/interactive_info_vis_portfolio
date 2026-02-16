// HW 5: Narrative Visualization
registerSketch('sk5', function (p) {
  let centerX;
  let centerY;
  let innerRadius = 50;
  let outerRadius = 300;

  p.preload = function () {
    hourlyData = p.loadJSON("./data/hourly_spotify_data.json");
  };

  p.setup = function () {
    hourlyData = Object.values(hourlyData);
    p.createCanvas(1000, 800);

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

    // Title
    p.textAlign(p.CENTER, p.TOP);
    p.noStroke();
    p.fill(50);
    p.textSize(18);
    p.textStyle(p.BOLD);
    p.text("My Personal Spotify Listening Patterns", centerX, 20);

    p.fill(100);
    p.textSize(14);
    p.textStyle(p.NORMAL);
    p.text("Mapping Minutes Played, Skip Rates, and Device Shares Across the Day by Hour (data from 2017-2026).", centerX, 50);

    p.push();
    p.translate(centerX, centerY);

    p.fill(20, 30, 60);
    p.textSize(13);
    p.arc(0, 0, innerRadius * 2, innerRadius * 2, p.PI, p.TWO_PI);
    p.fill(255, 250, 200);
    p.arc(0, 0, innerRadius * 2, innerRadius * 2, 0, p.PI);

    p.stroke(200);
    p.strokeWeight(1);
    p.line(-innerRadius, 0, innerRadius, 0);

    let sunSize = 25;
    p.noStroke();
    p.fill(255);
    p.arc(0, 0, sunSize, sunSize, p.PI, p.TWO_PI);
    p.fill(255, 204, 0);
    p.arc(0, 0, sunSize, sunSize, 0, p.PI);

    for (let i = 0; i < hourlyData.length; i++) {
      let h = hourlyData[i];
      let angleStart = p.map(i, 0, hourlyData.length, 0, p.TWO_PI) - p.HALF_PI; // Start from hour 0 at the top
      let angleEnd = p.map(i + 1, 0, hourlyData.length, 0, p.TWO_PI) - p.HALF_PI;
      
      let mobileBrightness = p.map(h.skipRate, 0, 1, 255, 20);
      let mobileColor = p.color(20, mobileBrightness, 10);
      
      let desktopBrightness = p.map(h.skipRate, 0, 1, 255, 30);
      let desktopColor = p.color(255, desktopBrightness, 50);
      
      let currentRadius = p.map(h.minutesPlayed, 0, maxMinutes, innerRadius, outerRadius);
      let mobileRadius = innerRadius + (currentRadius - innerRadius) * h.mobileShare;
      
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
    p.noStroke();
    p.fill(0);
    p.textAlign(p.LEFT);
    p.textStyle(p.NORMAL);
    p.textSize(14);
    p.text("Device Type:", legendX, legendY);

    p.fill(20, 136, 10);
    p.rect(legendX, legendY + 20, 15, 15);
    p.fill(0);
    p.text("Mobile", legendX + 20, legendY + 22);
    
    p.fill(255, 110, 30);
    p.rect(legendX, legendY + 45, 15, 15);
    p.fill(0);
    p.text("Desktop", legendX + 20, legendY + 47);

    p.textSize(10);
    p.fill(100);
    p.textAlign(p.LEFT);
    p.text("High", legendX + 100, legendY + 70);

    p.textAlign(p.RIGHT);
    p.text("Low", legendX + 20, legendY + 70);

    let gradWidth = 120;
    let gradHeight = 10;
    for (let i = 0; i < gradWidth; i++) {
      let scale = p.map(i, 0, gradWidth, 0, 1);
      let mobileGrad = p.color(20, p.map(scale, 0, 1, 255, 20), 10);
      let desktopGrad = p.color(255, p.map(scale, 0, 1, 255, 30), 50);

      p.stroke(mobileGrad);
      p.line(legendX + i, legendY + 80, legendX + i, legendY + 80 + gradHeight / 2);
      p.stroke(desktopGrad);
      p.line(legendX + i, legendY + 80 + gradHeight / 2, legendX + i, legendY + 80 + gradHeight);
    }

    p.noStroke();
    p.fill(0);
    p.textAlign(p.LEFT);
    p.textSize(14);
    p.text("Skip Rate Intensity", legendX, legendY + 110);

    // Tooltip
    let d = p.dist(p.mouseX, p.mouseY, centerX, centerY);

    if (d > innerRadius && d < outerRadius + 50) {
      let angle = p.atan2(p.mouseY - centerY, p.mouseX - centerX);
      let adjustedAngle = angle + p.HALF_PI;
      if (adjustedAngle < 0) adjustedAngle += p.TWO_PI;
      let hourIndex = p.floor(p.map(adjustedAngle, 0, p.TWO_PI, 0, hourlyData.length));

      if (hourIndex >= 0 && hourIndex < hourlyData.length) {
        let h = hourlyData[hourIndex];

        let toolWidth = 180;
        let toolHeight = 110;
        let offsetX = 15;
        let offsetY = 15;

        p.push();
        p.translate(p.mouseX + offsetX, p.mouseY + offsetY);

        p.fill(255, 245);
        p.stroke(200);
        p.strokeWeight(1);
        p.rect(0, 0, toolWidth, toolHeight, 4);

        p.noStroke();
        p.textAlign(p.LEFT, p.TOP);
        p.fill(0);
        p.textStyle(p.BOLD);
        p.textSize(14);
        p.text(`Hour ${hourIndex}`, 10, 10);

        p.textStyle(p.NORMAL);
        p.textSize(12);
        p.fill(50);
        p.text(`Minutes: ${h.minutesPlayed}`, 10, 32);
        p.text(`Skip Rate: ${(h.skipRate * 100).toFixed(1)}%`, 10, 50);

        p.fill(20, 136, 10);
        p.ellipse(15, 76, 8, 8);
        p.fill(50);
        p.text(`Mobile: ${(h.mobileShare * 100).toFixed(1)}%`, 25, 70);

        p.fill(255, 110, 30);
        p.ellipse(15, 94, 8, 8);
        p.fill(50);
        p.text(`Desktop: ${((h.desktopShare) * 100).toFixed(1)}%`, 25, 88);

        p.pop();
      }
    }
  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
