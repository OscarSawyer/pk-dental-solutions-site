(function () {
  function setupHeroRotator(rotatorId, intervalMs) {
    const rotator = document.getElementById(rotatorId);
    if (!rotator) return;

    const slides = Array.from(rotator.querySelectorAll('.hero-visual-slide'));
    const dots = Array.from(rotator.querySelectorAll('.hero-visual-dot'));

    if (slides.length < 2) return;

    let currentIndex = 0;
    let timer = null;
    let isPaused = false;

    function showSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;

      currentIndex = index;

      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === currentIndex);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === currentIndex);
      });
    }

    function nextSlide() {
      showSlide(currentIndex + 1);
    }

    function start() {
      stop();
      timer = window.setInterval(() => {
        if (!isPaused) nextSlide();
      }, intervalMs);
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    rotator.addEventListener('mouseenter', function () {
      isPaused = true;
      rotator.classList.add('is-paused');
    });

    rotator.addEventListener('mouseleave', function () {
      isPaused = false;
      rotator.classList.remove('is-paused');
    });

    rotator.addEventListener('focusin', function () {
      isPaused = true;
      rotator.classList.add('is-paused');
    });

    rotator.addEventListener('focusout', function () {
      isPaused = false;
      rotator.classList.remove('is-paused');
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', function () {
        showSlide(index);
        start();
      });
    });

    showSlide(0);
    start();
  }

  function setupAutoScrollCarousel(options) {
    const track = document.getElementById(options.trackId);
    if (!track) return;

    const prevBtn = document.querySelector(`[data-home-prev="${options.trackId}"]`);
    const nextBtn = document.querySelector(`[data-home-next="${options.trackId}"]`);
    const dotsWrap = document.getElementById(options.dotsId);
    const cards = Array.from(track.children);
    const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('button')) : [];

    if (!cards.length) return;

    let currentIndex = 0;
    let timer = null;
    let isPaused = false;

    function goTo(index) {
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
    }

    function next() {
      goTo(currentIndex + 1);
    }

    function prev() {
      goTo(currentIndex - 1);
    }

    function start() {
      stop();
      timer = window.setInterval(() => {
        if (!isPaused) next();
      }, options.intervalMs);
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prev();
        start();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        next();
        start();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', function () {
        goTo(index);
        start();
      });
    });

    track.addEventListener('mouseenter', function () {
      isPaused = true;
      track.classList.add('is-paused');
    });

    track.addEventListener('mouseleave', function () {
      isPaused = false;
      track.classList.remove('is-paused');
    });

    track.addEventListener('focusin', function () {
      isPaused = true;
      track.classList.add('is-paused');
    });

    track.addEventListener('focusout', function () {
      isPaused = false;
      track.classList.remove('is-paused');
    });

    window.addEventListener('resize', function () {
      goTo(currentIndex);
    });

    goTo(0);
    start();
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupHeroRotator('heroVisualRotator', 5200);
    setupAutoScrollCarousel({
      trackId: 'homeIntroTrack',
      dotsId: 'homeIntroDots',
      intervalMs: 4600
    });
  });
})();