// Header scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 80);
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: "0px 0px -100px 0px"
});

document.querySelectorAll('.reveal, .hero-content').forEach(el => {
  observer.observe(el);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
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
// === 1. Header scroll effect (desktop top bar) ===
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 80);
  }
});

// === 2. Reveal on scroll (fade-in animations) ===
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px"
  }
);

document.querySelectorAll('.reveal, .hero-content').forEach((el) => {
  revealObserver.observe(el);
});

// === 3. Smooth scrolling for anchor links ===
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Close mobile menu if it exists (future-proof)
      document.body.classList.remove('menu-open');
    }
  });
});

// === 4. Active navigation link highlighting (both desktop & mobile) ===
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinksDesktop = document.querySelectorAll('header .nav-list a');
  const navLinksMobile = document.querySelectorAll('.mobile-bottom-nav a');

  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    // Consider section active if we're past its top - offset (for better UX)
    if (window.scrollY >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });

  // Reset all links first
  [...navLinksDesktop, ...navLinksMobile].forEach((link) => {
    link.classList.remove('active');
  });

  // Highlight matching links (both menus)
  if (current) {
    // Desktop
    const desktopLink = document.querySelector(`header .nav-list a[href="#${current}"]`);
    if (desktopLink) desktopLink.classList.add('active');

    // Mobile bottom nav
    const mobileLink = document.querySelector(`.mobile-bottom-nav a[href="#${current}"]`);
    if (mobileLink) mobileLink.classList.add('active');
  }
}

// Run on scroll + on load (in case page is deep-linked)
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);
updateActiveNav(); // initial call
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault(); // prevent actual page reload

  const form = this;
  const messageDiv = document.getElementById('form-message');

  // Clear previous message
  messageDiv.classList.remove('visible', 'success', 'error');
  messageDiv.textContent = '';

  // Very basic client-side validation (optional)
  const name = form.querySelector('[name="name"]').value.trim();
  const email = form.querySelector('[name="email"]').value.trim();
  const msg = form.querySelector('[name="message"]').value.trim();

  if (!name || !email || !msg) {
    showMessage('Please fill in all fields.', 'error');
    return;
  }

  // Here you would normally send the data (fetch / Formspree / EmailJS / etc.)
  // For now we just simulate success after 800ms
  setTimeout(() => {
    showMessage('Thank you! I will get back to you as soon as possible.', 'success');
    
    // Optional: clear form after success
    form.reset();
  }, 800);
});

function showMessage(text, type) {
  const msgDiv = document.getElementById('form-message');
  msgDiv.textContent = text;
  msgDiv.classList.add('visible', type);

  // Auto hide after 6 seconds (optional)
  setTimeout(() => {
    msgDiv.classList.remove('visible');
  }, 6000);
}