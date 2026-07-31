import confetti from 'canvas-confetti';

// ===========================
// PARTICLE SYSTEM
// ===========================

const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.alpha = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = `rgba(255, 105, 180, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particles = [];
for (let i = 0; i < 50; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();

// ===========================
// CURSOR HEARTS
// ===========================

document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.95) {
    createCursorHeart(e.clientX, e.clientY);
  }
});

function createCursorHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'cursor-heart';
  heart.textContent = '💗';
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  
  document.getElementById('cursor-hearts-container').appendChild(heart);
  
  setTimeout(() => heart.remove(), 1500);
}

// ===========================
// FLOATING ELEMENTS
// ===========================

const heartChars = ['💗', '💕', '💖'];
const butterflyChars = ['🦋'];
const starChars = ['✨', '⭐'];

function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.top = Math.random() * 100 + 'vh';
  heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
  heart.style.animationDuration = (Math.random() * 10 + 15) + 's';
  
  document.getElementById('floating-hearts-container').appendChild(heart);
  
  setTimeout(() => heart.remove(), 25000);
}

function createFloatingButterfly() {
  const butterfly = document.createElement('div');
  butterfly.className = 'floating-butterfly';
  butterfly.textContent = '🦋';
  butterfly.style.left = Math.random() * 100 + 'vw';
  butterfly.style.top = Math.random() * 50 + 'vh';
  butterfly.style.animationDuration = (Math.random() * 3 + 4) + 's';
  
  document.getElementById('floating-butterflies-container').appendChild(butterfly);
  
  setTimeout(() => butterfly.remove(), 8000);
}

function createFloatingStar() {
  const star = document.createElement('div');
  star.className = 'floating-star';
  star.textContent = starChars[Math.floor(Math.random() * starChars.length)];
  star.style.left = Math.random() * 100 + 'vw';
  star.style.top = Math.random() * 100 + 'vh';
  star.style.animationDuration = (Math.random() * 2 + 3) + 's';
  
  document.getElementById('floating-stars-container').appendChild(star);
  
  setTimeout(() => star.remove(), 5000);
}

// Create floating elements periodically
setInterval(createFloatingHeart, 3000);
setInterval(createFloatingButterfly, 8000);
setInterval(createFloatingStar, 5000);

// Initial floating elements
for (let i = 0; i < 3; i++) {
  createFloatingHeart();
  createFloatingButterfly();
  createFloatingStar();
}

// ===========================
// ENVELOPE INTERACTION
// ===========================

const envelope = document.getElementById('envelope');
const letterDisplay = document.getElementById('letter-display');
const bouquetSection = document.getElementById('bouquet-section');
const endingSection = document.getElementById('ending-section');

let envelopeOpened = false;

envelope.addEventListener('click', () => {
  if (!envelopeOpened) {
    envelope.classList.add('open');
    envelopeOpened = true;
    
    setTimeout(() => {
      letterDisplay.style.display = 'block';
      createRoseBouquet();
      
      // Show bouquet and ending after letter
      setTimeout(() => {
        bouquetSection.style.display = 'flex';
        endingSection.style.display = 'flex';
      }, 3000);
    }, 600);
  }
});

// ===========================
// ROSE BOUQUET ANIMATION
// ===========================

function createRoseBouquet() {
  const roses = document.querySelectorAll('.rose');
  roses.forEach((rose) => {
    const ellipses = rose.querySelectorAll('ellipse');
    const circle = rose.querySelector('circle');
    
    ellipses.forEach((ellipse) => {
      ellipse.style.opacity = '0';
    });
    
    if (circle) circle.style.opacity = '0';
  });
}

// Trigger rose blooming when bouquet section is visible
function animatePetals() {
  const petalContainer = document.getElementById('falling-petals');
  
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.textContent = '🌹';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.top = '-30px';
      petal.style.animationDuration = (Math.random() * 4 + 5) + 's';
      petal.style.animation = `fall ${petal.style.animationDuration} linear forwards`;
      
      petalContainer.appendChild(petal);
      
      setTimeout(() => petal.remove(), parseFloat(petal.style.animationDuration) * 1000);
    }, i * 200);
  }
}

// Start petals when bouquet is shown
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target.id === 'bouquet-section') {
      animatePetals();
    }
  });
});

observer.observe(bouquetSection);

// ===========================
// KISS BUTTON EFFECTS
// ===========================

const kissButton = document.getElementById('kiss-button');
const kissMessage = document.getElementById('kiss-message');

kissButton.addEventListener('click', () => {
  // Confetti burst
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });

  // Create kiss emoji burst
  createKissBurst();

  // Show message
  kissMessage.style.display = 'block';

  // Hearts rain
  createHeartRain();

  setTimeout(() => {
    kissMessage.style.display = 'none';
  }, 3000);
});

function createKissBurst() {
  const emojis = ['💋', '😘', '❤️'];
  
  for (let i = 0; i < 50; i++) {
    const emoji = document.createElement('div');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.position = 'fixed';
    emoji.style.left = kissButton.offsetLeft + kissButton.offsetWidth / 2 + 'px';
    emoji.style.top = kissButton.offsetTop + kissButton.offsetHeight / 2 + 'px';
    emoji.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
    emoji.style.pointerEvents = 'none';
    emoji.style.zIndex = '9997';
    emoji.style.animation = `burst-out ${Math.random() * 1 + 1}s ease-out forwards`;
    
    document.body.appendChild(emoji);
    
    setTimeout(() => emoji.remove(), 2000);
  }
}

function createHeartRain() {
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('div');
    heart.textContent = '💗';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '-50px';
    heart.style.fontSize = '2rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9997';
    heart.style.animation = `fall-hearts ${Math.random() * 2 + 3}s linear forwards`;
    heart.style.animationDelay = i * 0.1 + 's';
    
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), (Math.random() * 2 + 3) * 1000 + 3000);
  }
}

// Add burst-out animation
const style = document.createElement('style');
style.textContent = `
  @keyframes burst-out {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(
        calc((random(100) - 50) * 100px),
        calc((random(100) - 50) * 100px)
      ) scale(0);
      opacity: 0;
    }
  }

  @keyframes fall-hearts {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) translateX(100px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===========================
// TIMER/COUNTER
// ===========================

function updateTimer() {
  const timerElement = document.getElementById('timer');
  let seconds = 0;

  setInterval(() => {
    seconds++;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    timerElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, 1000);
}

updateTimer();

// ===========================
// SMOOTH SCROLL BEHAVIOR
// ===========================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===========================
// SCROLL ANIMATIONS
// ===========================

const galleryCards = document.querySelectorAll('.gallery-card');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'slide-up 0.6s ease-out';
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

galleryCards.forEach((card) => {
  cardObserver.observe(card);
});

// ===========================
// PAGE LOAD ANIMATION
// ===========================

window.addEventListener('load', () => {
  // Trigger any additional animations on load
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.animation = 'fade-in 1s ease-out';
  }
});

// Fade in animation
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
document.head.appendChild(fadeInStyle);

// ===========================
// ACCESSIBILITY
// ===========================

// Keyboard support for envelope
envelope.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    envelope.click();
  }
});

// Keyboard support for kiss button
kissButton.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    kissButton.click();
  }
});

console.log('✨ Romantic website loaded successfully! Happy Girlfriend\'s Day ❤️');
