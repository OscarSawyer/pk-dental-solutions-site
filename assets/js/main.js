 document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  const backToTop = document.getElementById('backToTop');

  // Mobile nav toggle
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      siteNav.classList.toggle('open');
    });

    // Close mobile nav when a nav link is clicked
    const navLinks = siteNav.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 880) {
          siteNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Reset nav state when resizing to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 880) {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Header shadow on scroll
  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    }
  });

  // Back to top
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    if (!button) return;

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // Testimonials
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  if (testimonialCards.length > 1) {
    let current = 0;
    setInterval(() => {
      testimonialCards[current].classList.remove('active');
      current = (current + 1) % testimonialCards.length;
      testimonialCards[current].classList.add('active');
    }, 4200);
  }

  // Reveal on scroll
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // Counters
  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach((counter) => {
    const target = Number(counter.dataset.counter);
    if (!target || Number.isNaN(target)) return;

    let current = 0;
    const step = Math.max(1, Math.floor(target / 50));

    const run = () => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = current;
        requestAnimationFrame(run);
      }
    };

    run();
  });

  // Service filters
  const filterButtons = document.querySelectorAll('#serviceFilters .filter-btn');
  const serviceItems = document.querySelectorAll('.service-item');

  if (filterButtons.length && serviceItems.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        serviceItems.forEach((item) => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }
});