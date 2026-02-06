registerSketch('sk2', function (p) {
  let input;
  let button;
  let totalTime = 0;
  let timeLeft = 0;
  let startTime = null;
  let isRunning = false;

  let particles = [];
  let numParticles = 40;
  let minSpeed = 0.2;
  let maxSpeed = 6;

  p.setup = function () {
    p.createCanvas(800, 800);

    input = p.createInput('10');
    button = p.createButton('Start Timer');
    button.mousePressed(startTimer);

    particleY = p.height / 2;

    p.textSize(32);
    p.textAlign(p.CENTER, p.CENTER);
  };

  function startTimer() {
    totalTime = Number(input.value());
    if (isNaN(totalTime) || totalTime <= 0) return;

    timeLeft = totalTime;
    startTime = p.millis();
    isRunning = true;

    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: p.random(p.width),
        y: p.random(p.height),
      });
    }
  }

  p.draw = function () {
    p.background(220);

    if (isRunning) {
      let elapsed = (p.millis() - startTime) / 1000;
      timeLeft = p.max(0, totalTime - elapsed);

      let timeFactor = timeLeft / totalTime;
      let speed = minSpeed + timeFactor * (maxSpeed - minSpeed);

      for (let particle of particles) {
        particle.x += speed;
        if (particle.x > p.width) {
          particle.x = 0;
          particle.y = p.random(p.height);
        }
      }

      if (timeLeft === 0) {
        isRunning = false;
      }
    }

    p.fill(0);
    for (let particle of particles) {
      p.circle(particle.x, particle.y, 8);
    }

    p.text(
      `Time Left: ${timeLeft.toFixed(1)}s`,
      p.width / 2,
      p.height / 2
    );
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});
