registerSketch('sk2', function (p) {
  let minInput;
  let secInput;
  let startButton;
  let stopButton;
  let resetButton;
  let pausedTime = 0;
  let totalTime = 0;
  let timeLeft = 0;
  let startTime = null;
  let isRunning = false;

  let particles = [];
  let numParticles = 40;
  let minSpeed = 0.2;
  let maxSpeed = 10;

  p.setup = function () {
    p.createCanvas(800, 800);

    minlabel = p.createSpan('Minutes: ')
    minInput = p.createInput('0');
    minInput.style('margin-right', '15px');
    minInput.style('width', '60px');

    secLabel = p.createSpan('Seconds: ')
    secInput = p.createInput('15');
    secInput.style('margin-right', '15px');
    secInput.style('width', '60px');

    startButton = p.createButton('Start Timer');
    startButton.mousePressed(startTimer);
    startButton.style('margin-right', '15px');
    startButton.style('width', '120px')

    stopButton = p.createButton('Stop');
    stopButton.mousePressed(stopTimer);
    stopButton.style('margin-right', '15px');
    stopButton.style('width', '60px');

    resetButton = p.createButton('Reset');
    resetButton.mousePressed(resetTimer);
    resetButton.style('width', '60px');

    particleY = p.height / 2;

    p.textSize(32);
    // p.textAlign(p.CENTER, p.CENTER);

    updateStartButtonLabel();
  };

  function startTimer() {
    let minutes = Number(minInput.value());
    let seconds = Number(secInput.value());

    if (isNaN(minutes) || isNaN(seconds) || minutes < 0 || seconds < 0 || seconds >= 60) {
      alert('Please enter valid minutes (0 or more) and seconds (0-59).');
      return;
    }

    if (!startTime || timeLeft === totalTime) {
      totalTime = minutes * 60 + seconds;
      timeLeft = totalTime;
      pausedTime = 0;

      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: p.random(p.width),
          y: p.random(p.height),
          color: randomParticleColor()
        });
      }
    }

    startTime = p.millis();
    isRunning = true;

    updateStartButtonLabel();
  }

  function stopTimer() {
    if (!isRunning) return;

    pausedTime += (p.millis() - startTime);
    isRunning = false;

    updateStartButtonLabel();
  }

  function resetTimer() {
    let minutes = Number(minInput.value());
    let seconds = Number(secInput.value());

    if (isNaN(minutes) || isNaN(seconds) || minutes < 0 || seconds < 0 || seconds >= 60) return;

    totalTime = minutes * 60 + seconds;
    timeLeft = totalTime;

    isRunning = false;
    startTime = null;
    pausedTime = 0;

    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: p.random(p.width),
        y: p.random(p.height),
      });
    }

    updateStartButtonLabel();
  }

  function updateStartButtonLabel() {
    if (!isRunning && pausedTime > 0 && timeLeft > 0) {
      startButton.html('Resume Timer');
    } else {
      startButton.html('Start Timer')
    }
  }

  function randomParticleColor() {
    return p.color(p.random(255), p.random(255), p.random(255));
  }

  p.draw = function () {
    p.background(220);

    if (isRunning) {
      let elapsed = (pausedTime + (p.millis() - startTime)) / 1000;
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
        pausedTime = 0;
        updateStartButtonLabel();
      }
    }

    p.fill(0);
    p.noStroke();
    for (let particle of particles) {
      p.fill(particle.color);
      p.circle(particle.x, particle.y, 8);
    }

    let displayMin = Math.floor(timeLeft / 60);
    let displaySec = Math.floor(timeLeft % 60);

    p.fill(0);
    p.textAlign(p.RIGHT, p.BOTTOM);
    let padding = 20;
    p.text(
      `Time Left: ${displayMin}:${displaySec.toString().padStart(2, '0')}`,
      p.width - padding,
      p.height - padding
    );
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});
