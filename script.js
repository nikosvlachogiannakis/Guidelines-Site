// JavaScript Document

/*
TemplateMo 596 Electric Xtra
https://templatemo.com/tm-596-electric-xtra
Modified for Guidelines Documentation
*/


/* ===============================
   PARTICLES
================================ */

function createParticles() {

    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {

        const particle = document.createElement('div');

        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';

        if (Math.random() > 0.5) {
            particle.style.background = '#00B2FF';
        }

        particlesContainer.appendChild(particle);
    }
}


/* ===============================
   MOBILE MENU
================================ */

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

}


/* ===============================
   NAVBAR SCROLL EFFECT
================================ */

function updateActiveNav() {

    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {

            navItems.forEach(item => item.classList.remove('active'));

            const currentNav = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (currentNav) currentNav.classList.add('active');

        }

    });

}

window.addEventListener('scroll', () => {

    const navbar = document.getElementById('navbar');

    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    updateActiveNav();

});


/* ===============================
   SMOOTH SCROLL
================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        const targetID = this.getAttribute('href');

        if (targetID === '#') return;

        const target = document.querySelector(targetID);

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        }

    });

});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("pre").forEach(pre => {
        const button = document.createElement("button");
        button.className = "copy-btn";

        // Shorter, balanced clipboard icon
        const clipboardIcon = `
            <svg viewBox="0 0 24 24">
                <path d="M16 2H14.5C14.2 1.2 13.4 0.7 12.5 0.7H11.5C10.6 0.7 9.8 1.2 9.5 2H8C6.3 2 5 3.3 5 5V20C5 21.7 6.3 23 8 23H16C17.7 23 19 21.7 19 20V5C19 3.3 17.7 2 16 2ZM12 3.7C12.3 3.7 12.5 3.9 12.5 4.2C12.5 4.5 12.3 4.7 12 4.7H11C10.7 4.7 10.5 4.5 10.5 4.2C10.5 3.9 10.7 3.7 11 3.7H12ZM17 20C17 20.6 16.6 21 16 21H8C7.4 21 7 20.6 7 20V5C7 4.4 7.4 4 8 4H9.3C9.7 5.1 10.7 5.8 12 5.8C13.3 5.8 14.3 5.1 14.7 4H16C16.6 4 17 4.4 17 5V20Z"/>
            </svg>
        `;

        // Green checkmark icon
        const checkIcon = `
            <svg viewBox="0 0 24 24">
                <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20 8l-1.4-1.4z"/>
            </svg>
        `;

        button.innerHTML = clipboardIcon;
        pre.appendChild(button);

        button.addEventListener("click", () => {
            const code = pre.querySelector("code").innerText;

            navigator.clipboard.writeText(code).then(() => {
                button.classList.add("copied");
                button.innerHTML = checkIcon;

                setTimeout(() => {
                    button.classList.remove("copied");
                    button.innerHTML = clipboardIcon;
                }, 1500);
            });
        });
    });
});


/* ===============================
   HERO TEXT ROTATION
================================ */

const textSets = document.querySelectorAll('.text-set');

if (textSets.length > 0) {

    let currentIndex = 0;
    let isAnimating = false;

    function wrapTextInSpans(element) {

        const text = element.textContent;

        element.innerHTML = text.split('').map((char, i) =>
            `<span class="char" style="animation-delay:${i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');

    }

    function animateTextIn(textSet) {

        const glitchText = textSet.querySelector('.glitch-text');
        const subtitle = textSet.querySelector('.subtitle');

        wrapTextInSpans(glitchText);

        glitchText.setAttribute('data-text', glitchText.textContent);

        setTimeout(() => {
            subtitle.classList.add('visible');
        }, 800);

    }

    function animateTextOut(textSet) {

        const chars = textSet.querySelectorAll('.char');
        const subtitle = textSet.querySelector('.subtitle');

        chars.forEach((char, i) => {

            char.style.animationDelay = `${i * 0.02}s`;
            char.classList.add('out');

        });

        subtitle.classList.remove('visible');

    }

    function rotateText() {

        if (isAnimating) return;

        isAnimating = true;

        const currentSet = textSets[currentIndex];
        const nextIndex = (currentIndex + 1) % textSets.length;
        const nextSet = textSets[nextIndex];

        animateTextOut(currentSet);

        setTimeout(() => {

            currentSet.classList.remove('active');
            nextSet.classList.add('active');

            animateTextIn(nextSet);

            currentIndex = nextIndex;
            isAnimating = false;

        }, 600);

    }

    textSets[0].classList.add('active');
    animateTextIn(textSets[0]);

    setTimeout(() => {
        setInterval(rotateText, 5000);
    }, 4000);

}


/* ===============================
   RANDOM GLITCH EFFECT
================================ */

setInterval(() => {

    const glitchTexts = document.querySelectorAll('.glitch-text');

    glitchTexts.forEach(text => {

        if (Math.random() > 0.95) {

            text.style.animation = 'none';

            setTimeout(() => {
                text.style.animation = '';
            }, 200);

        }

    });

}, 3000);


/* ===============================
   INIT
================================ */

createParticles();

/* ===============================
   PASSWORD
================================ */

let isUnlocked = false;
const BOOKS_PASSWORD = "mypassword";

// Check session on page load
window.addEventListener("load", function () {
  const unlocked = sessionStorage.getItem("booksUnlocked");

  if (unlocked === "true") {
    unlockBooks();
  }
});

// Open modal
function openPasswordModal() {
  document.getElementById("passwordModal").style.display = "block";
  document.getElementById("errorMsg").textContent = "";
  setTimeout(() => {
    document.getElementById("passwordInput").focus();
  }, 100);
}

// Close modal
function closeModal() {
  document.getElementById("passwordModal").style.display = "none";
  document.getElementById("passwordInput").value = "";
}

// Submit password
function submitPassword() {
  const input = document.getElementById("passwordInput").value;

  if (input === BOOKS_PASSWORD) {
    sessionStorage.setItem("booksUnlocked", "true");
    unlockBooks();
    closeModal();
  } else {
    document.getElementById("errorMsg").textContent = "Wrong password";
  }
}

// Unlock UI
function unlockBooks() {
  isUnlocked = true;

  const section = document.getElementById("books");
  section.classList.remove("locked");

  sessionStorage.setItem("booksUnlocked", "true");

  section.scrollIntoView({ behavior: "smooth" });
}

// FOR THE NAVBAR

function handleBooksClick(event) {
  const unlocked = sessionStorage.getItem("booksUnlocked");

  if (unlocked !== "true") {
    event.preventDefault();
    openPasswordModal();
  }
}