function launchConfetti(count = 1000) {
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");

      // Random position and color
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;

      // Random size
      const size = Math.random() * 8 + 4;
      confetti.style.width = size + "px";
      confetti.style.height = size + "px";

      // Random animation delay
      confetti.style.animationDuration = 2 + Math.random() * 2 + "s";
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

      document.body.appendChild(confetti);

      // Remove from DOM after animation
      confetti.addEventListener("animationend", () => {
        confetti.remove();
      });
    }
  }



 

  function launchFirework(x, y, color = null) {
    const count = 30; // number of particles
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      // Random direction
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 100 + 50; // 50 to 150px
      const dx = Math.cos(angle) * distance + "px";
      const dy = Math.sin(angle) * distance + "px";
      particle.style.setProperty('--dx', dx);
      particle.style.setProperty('--dy', dy);

      // Random color or given one
      particle.style.backgroundColor = color || `hsl(${Math.random() * 360}, 100%, 60%)`;

      // Starting position
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      document.body.appendChild(particle);

      // Clean up after animation
      particle.addEventListener("animationend", () => {
        particle.remove();
      });
    }
  }


  let confettiInterval;
  // Function to launch a wave of confetti
  // USE --> launchConfettiWave(500, 100);
  function launchConfettiWave(count = 500, interval = 1) {
    let spawnedConfetti = 0;
    
    confettiInterval = setInterval(() => {
      if (spawnedConfetti >= count) {
        clearInterval(confettiInterval); // Stop the wave once the count is reached
        return;
      }
  
      // Create a single confetti piece
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
  
      // Random position and color
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;
  
      // Random size
      const size = Math.random() * 8 + 4;
      confetti.style.width = size + "px";
      confetti.style.height = size + "px";
  
      // Random animation delay
      confetti.style.animationDuration = 2 + Math.random() * 2 + "s";
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
  
      document.body.appendChild(confetti);
  
      // Remove confetti after animation ends
      confetti.addEventListener("animationend", () => {
        confetti.remove();
      });
  
      spawnedConfetti++;
    }, interval); // Delay between each spawn (ms)
  }

  function removeConfettiWave() {
    if (confettiInterval) {
      clearInterval(confettiInterval); // Stop the wave
      confettiInterval = null; // Reset the interval variable
    }
  }


  function triggerWrongAnswerEffect() {
    // Red flash
    const flash = document.createElement('div');
    flash.classList.add('flash');
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 400);

    // Shake
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 400);

    // Burst of red X's
    launchXExplosion();
  }

  function launchXExplosion() {
  const count = 40;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Max radius based on viewport
  const maxRadius = Math.max(window.innerWidth, window.innerHeight) * 0.5;

  for (let i = 0; i < count; i++) {
    const xEl = document.createElement('div');
    xEl.classList.add('x-particle');
    xEl.textContent = '✖'; // or ❌

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * maxRadius;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    xEl.style.left = centerX + 'px';
    xEl.style.top = centerY + 'px';
    xEl.style.setProperty('--dx', dx + 'px');
    xEl.style.setProperty('--dy', dy + 'px');

    document.body.appendChild(xEl);

    xEl.addEventListener('animationend', () => xEl.remove());
  }
}
