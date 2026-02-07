registerSketch('sk3', function (p) {

  p.setup = function () {
    p.createCanvas(800, 450);
  };

  p.draw = function () {
    p.background(220);

    let h = p.hour() % 24;

    drawRadioList({
      x: 40,
      y: 80,
      title: "HOURS",
      count: 24,
      selected: h,
      columns: 2
    });

    drawRadioList({
      x: 300,
      y: 80,
      title: "MINUTES",
      count: 60,
      selected: p.minute(),
      columns: 4
    })
  };

  function drawRadioList({ x, y, title, count, selected, columns }) {
    let rowHeight = 22;
    let colWidth = 70;
    let radioR = 6;
    let rows = Math.ceil(count / columns);

    p.fill(0);
    p.textSize(14);
    p.text(title, x, y - 28);

    for (let i = 0; i < count; i++) {
      let row = i % rows;
      let col = Math.floor(i / rows);

      let rx = x + col * colWidth;
      let ry = y + row * rowHeight;

      p.stroke(0);
      p.noFill();
      p.circle(rx, ry + 7, radioR * 2);

      if (i === selected) {
        p.noStroke();
        p.fill(0, 255, 0);
        p.circle(rx, ry + 7, radioR);
      }

      p.fill(0);
      p.textSize(12);
      p.textAlign(p.LEFT, p.CENTER);
      p.text(p.nf(i, 2), rx + 14, ry + 7);
    }
  }

});
