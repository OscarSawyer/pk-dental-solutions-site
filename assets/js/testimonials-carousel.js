document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('testimonialsTrack');
  if (!track) return;

  const prevBtn = document.querySelector('[data-testimonial-prev="testimonialsTrack"]');
  const nextBtn = document.querySelector('[data-testimonial-next="testimonialsTrack"]');
  const cards = Array.from(track.children);
  const dots = Array.from(document.querySelectorAll('#testimonialDots .testimonial-dot'));

  if (!cards.length) return;

  let currentIndex = 0;
  let timer = null;
  let isPaused = false;
  const intervalMs = 5000;

  const goTo = (index) => {
    if (index < 0) index = cards.length - 1;
    if (index >= cards.length) index = 0;

    currentIndex = index;

    const target = cards[currentIndex];
    track.scrollTo({
      left: target.offsetLeft - track.offsetLeft,
      behavior: 'smooth'
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentIndex);
    });
  };

  const next = () => goTo(currentIndex + 1);
  const prev = () => goTo(currentIndex - 1);

  const start = () => {
    stop();
    timer = window.setInterval(() => {
      if (!isPaused) next();
    }, intervalMs);
  };

  const stop = () => {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prev();
      start();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      next();
      start();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goTo(index);
      start();
    });
  });

  track.addEventListener('mouseenter', () => {
    isPaused = true;
  });

  track.addEventListener('mouseleave', () => {
    isPaused = false;
  });

  track.addEventListener('focusin', () => {
    isPaused = true;
  });

  track.addEventListener('focusout', () => {
    isPaused = false;
  });

  window.addEventListener('resize', () => {
    goTo(currentIndex);
  });

  goTo(0);
  start();
});