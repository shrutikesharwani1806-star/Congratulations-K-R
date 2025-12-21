const text = "Congratulations Keshav & Rishika";
let index = 0;
const speed = 90;

function typeEffect() {
  const target = document.getElementById("typingText");
  if (!target) return;
  if (index < text.length) {
    target.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, speed);
  } else {
    const date = document.getElementById("dateText");
    if (date) {
      date.classList.remove("opacity-0");
      date.classList.add("transition-opacity", "duration-[1000ms]", "opacity-100");
    }
  }
}

window.addEventListener("DOMContentLoaded", typeEffect);

const page = document.getElementById("weddingPage");
const left = document.getElementById("leftSide");
const right = document.getElementById("rightSide");

let hasPlayed = false;

function revealPage() {
  if (hasPlayed) return;
  hasPlayed = true;

  page.classList.remove("opacity-0");
  page.classList.add("opacity-100");

  left.classList.remove("opacity-0", "translate-x-[-5vw]");
  left.classList.add("opacity-100", "translate-x-0");

  right.classList.remove("opacity-0", "scale-[0.9]");
  right.classList.add("opacity-100", "scale-100");

  typeEffect();
}

/* ---------- DESKTOP: HOVER ---------- */
page.addEventListener("mouseenter", () => {
  if (window.matchMedia("(hover: hover)").matches) {
    revealPage();
  }
});

/* ---------- MOBILE: AUTO REVEAL ---------- */
window.addEventListener("load", () => {
  if (!window.matchMedia("(hover: hover)").matches) {
    setTimeout(revealPage, 300);
  }
});

const frame = document.getElementById("weddingFrame");
const initials = document.getElementById("initials");

// Intersection Observer (auto reveal on scroll)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        frame.classList.remove("opacity-0", "scale-90");
        frame.classList.add("opacity-100", "scale-100", "float-romantic", "frame-hover");

        setTimeout(() => {
          initials.classList.remove("opacity-0");
          initials.classList.add("opacity-100", "transition-opacity", "duration-[1200ms]");
        }, 600);

        observer.unobserve(frame);
      }
    });
  },
  { threshold: 0.4 }
);

observer.observe(frame);

  const elements = document.querySelectorAll(".fade-up");

  const heeler = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.3 }
  );

  elements.forEach(el => heeler.observe(el));

  /* ================= SLIDESHOW + MUSIC ================= */

const slideshowImages = [
  "./images/keshav-rishika7.jpeg",
  "./images/keshav-rishika6.jpeg",
  "./images/keshav-rishika.jpeg",
  "./images/keshav-rishika3.jpeg"
];

let slideIndex = 0;
const slideImg = document.getElementById("slideshowImage");
const audio = document.getElementById("romanticAudio");
const audioToggle = document.getElementById("audioToggle");
let audioPlayedOnce = false;

if (audio) {
  // mark finished playback
  audio.addEventListener('ended', () => {
    audioPlayedOnce = true;
  });
}

if (audio) {
  audio.addEventListener('error', () => {
    console.error('Audio failed to load', audio.error);
  });
}

if (audioToggle) {
  audioToggle.addEventListener('click', () => {
    if (!audio) return;
    // user gesture: unmute and play
    audio.muted = false;
    audio.play().then(() => {
      audioToggle.classList.add('hidden');
      audioToggle.setAttribute('aria-hidden', 'true');
    }).catch((e) => {
      console.warn('Play failed after user gesture:', e);
    });
  });
}

function startSlideshow() {
  setInterval(() => {
    slideImg.classList.remove("slide-animate");
    slideImg.style.opacity = 0;

    setTimeout(() => {
      slideIndex = (slideIndex + 1) % slideshowImages.length;
      slideImg.src = slideshowImages[slideIndex];
      slideImg.style.opacity = 1;
      slideImg.classList.add("slide-animate");
    }, 500);
  }, 3000);
}

/* Intersection Observer for Music + Slideshow */
const slideshowSection = document.getElementById("slideshowSection");

let slideshowStarted = false;

const slideObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!slideshowStarted) {
              startSlideshow();
              slideshowStarted = true;
            }

            // Attempt muted autoplay only if the song hasn't played yet
            if (audio && !audioPlayedOnce) {
              audio.muted = true;
              audio.play().then(() => {
                audioPlayedOnce = true;
                if (audioToggle) {
                  audioToggle.classList.remove('hidden');
                  audioToggle.setAttribute('aria-hidden', 'false');
                  audioToggle.textContent = 'Unmute music';
                }
              }).catch(() => {
                if (audioToggle) {
                  audioToggle.classList.remove('hidden');
                  audioToggle.setAttribute('aria-hidden', 'false');
                  audioToggle.textContent = 'Play music';
                }
              });
            }
          } else {
            if (audio && !audioPlayedOnce) {
              audio.pause();
              audio.muted = true;
            }
            if (audioToggle) {
              audioToggle.classList.add('hidden');
              audioToggle.setAttribute('aria-hidden', 'true');
            }
          }
    });
  },
  { threshold: 0.5 }
);

slideObserver.observe(slideshowSection);
