 (function () {
  function setupCarousel(trackId, options = {}) {
    const track = document.getElementById(trackId);
    if (!track) return null;

    const prevBtn = document.querySelector(`[data-prev="${trackId}"]`);
    const nextBtn = document.querySelector(`[data-next="${trackId}"]`);

    const settings = {
      autoPlay: options.autoPlay ?? true,
      interval: options.interval ?? 4000,
      pauseAfterInteraction: options.pauseAfterInteraction ?? 7000
    };

    let currentIndex = 0;
    let autoTimer = null;
    let resumeTimer = null;

    const getVisibleCards = () => {
      return Array.from(track.children).filter((child) => {
        return window.getComputedStyle(child).display !== 'none';
      });
    };

    const normalizeIndex = (index, total) => {
      if (total <= 0) return 0;
      if (index < 0) return total - 1;
      if (index >= total) return 0;
      return index;
    };

    const scrollToCard = (index, behavior = 'smooth') => {
      const visibleCards = getVisibleCards();
      if (!visibleCards.length) return;

      currentIndex = normalizeIndex(index, visibleCards.length);

      const targetCard = visibleCards[currentIndex];
      const left = targetCard.offsetLeft - track.offsetLeft;

      track.scrollTo({
        left,
        behavior
      });
    };

    const updateButtons = () => {
      const visibleCards = getVisibleCards();
      const canScroll = visibleCards.length > 1;

      if (prevBtn) prevBtn.disabled = !canScroll;
      if (nextBtn) nextBtn.disabled = !canScroll;

      currentIndex = normalizeIndex(currentIndex, visibleCards.length);
    };

    const stopAutoPlay = () => {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    };

    const startAutoPlay = () => {
      stopAutoPlay();

      const visibleCards = getVisibleCards();
      if (!settings.autoPlay || visibleCards.length <= 1) return;

      autoTimer = setInterval(() => {
        scrollToCard(currentIndex + 1);
      }, settings.interval);
    };

    const pauseThenResume = () => {
      stopAutoPlay();

      if (resumeTimer) {
        clearTimeout(resumeTimer);
      }

      resumeTimer = setTimeout(() => {
        startAutoPlay();
      }, settings.pauseAfterInteraction);
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        scrollToCard(currentIndex - 1);
        pauseThenResume();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        scrollToCard(currentIndex + 1);
        pauseThenResume();
      });
    }

    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    track.addEventListener('touchstart', pauseThenResume, { passive: true });
    track.addEventListener('mousedown', pauseThenResume);

    window.addEventListener('resize', () => {
      updateButtons();
      scrollToCard(currentIndex, 'auto');
      startAutoPlay();
    });

    updateButtons();
    scrollToCard(0, 'auto');
    startAutoPlay();

    return {
      refresh() {
        updateButtons();
        scrollToCard(0, 'auto');
        startAutoPlay();
      }
    };
  }

  function setupServiceFilters(carouselApi) {
    const filterButtons = document.querySelectorAll('#serviceFilters .filter-btn');
    const serviceItems = document.querySelectorAll('#allServicesTrack .service-item');
    const track = document.getElementById('allServicesTrack');

    if (!filterButtons.length || !serviceItems.length || !track) return;

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        serviceItems.forEach((item) => {
          const category = item.getAttribute('data-category');
          item.style.display = filter === 'all' || category === filter ? '' : 'none';
        });

        track.scrollTo({ left: 0, behavior: 'auto' });

        if (carouselApi && typeof carouselApi.refresh === 'function') {
          carouselApi.refresh();
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupCarousel('featuredTrack', {
      autoPlay: true,
      interval: 4000,
      pauseAfterInteraction: 7000
    });

    const allServicesCarousel = setupCarousel('allServicesTrack', {
      autoPlay: true,
      interval: 4500,
      pauseAfterInteraction: 7000
    });

    setupServiceFilters(allServicesCarousel);
  });
})();