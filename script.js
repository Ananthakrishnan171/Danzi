// ===== Danzi Dance Club – Main JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
  // ── Mobile Nav Toggle ──
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ── Navbar scroll effect ──
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ── Active nav link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ── Scroll Reveal ──
  const reveals = document.querySelectorAll('.reveal, .stagger-children');
  if (reveals.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  // ── Form Validation Feedback ──
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      const page = currentPage;

      // For login/signup/contact, show a nice success animation
      if (page === 'login.html' || page === 'signup.html' || page === 'contact.html' || page === 'admission.html') {
        e.preventDefault();

        const btn = form.querySelector('[type="submit"], button[type="submit"]');
        if (btn) {
          const originalText = btn.textContent || btn.value;
          btn.style.pointerEvents = 'none';

          if (btn.tagName === 'INPUT') {
            btn.value = '✓ Submitted!';
          } else {
            btn.textContent = '✓ Submitted!';
          }

          btn.style.background = '#22c55e';
          btn.style.color = '#fff';

          setTimeout(() => {
            if (btn.tagName === 'INPUT') {
              btn.value = originalText;
            } else {
              btn.textContent = originalText;
            }
            btn.style.background = '';
            btn.style.color = '';
            btn.style.pointerEvents = '';
            form.reset();
          }, 2000);
        }
      }
    });
  });

  // ── Smooth entrance for auth pages ──
  const authCard = document.querySelector('.auth-card');
  if (authCard) {
    authCard.style.opacity = '0';
    authCard.style.transform = 'translateY(24px)';
    requestAnimationFrame(() => {
      authCard.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      authCard.style.opacity = '1';
      authCard.style.transform = 'translateY(0)';
    });
  }

  // ── Parallax subtle effect for hero ──
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroContent = heroSection.querySelector('.hero-content');
      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
        heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
      }
    }, { passive: true });
  }

  // ── Typing effect for hero heading ──
  const typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    const words = ['Confidence', 'Creativity', 'Excellence', 'Joy'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 60 : 120;

      if (!isDeleting && charIndex === currentWord.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 400;
      }

      setTimeout(typeLoop, delay);
    }

    typeLoop();
  }
});
