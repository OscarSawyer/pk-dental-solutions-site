 (function () {
  function setupCarousel(trackId) {
    const track = document.getElementById(trackId);
    if (!track) return;

    const prevBtn = document.querySelector(`[data-prev="${trackId}"]`);
    const nextBtn = document.querySelector(`[data-next="${trackId}"]`);

    let currentIndex = 0;

    const getVisibleCards = () => {
      return Array.from(track.children).filter((child) => {
        return window.getComputedStyle(child).display !== 'none';
      });
    };

    const scrollToCard = (index) => {
      const visibleCards = getVisibleCards();
      if (!visibleCards.length) return;

      if (index < 0) index = visibleCards.length - 1;
      if (index >= visibleCards.length) index = 0;

      currentIndex = index;

      const targetCard = visibleCards[currentIndex];
      track.scrollTo({
        left: targetCard.offsetLeft - track.offsetLeft,
        behavior: 'smooth'
      });
    };

    const updateButtons = () => {
      const visibleCards = getVisibleCards();
      const canScroll = visibleCards.length > 1;

      if (prevBtn) prevBtn.disabled = !canScroll;
      if (nextBtn) nextBtn.disabled = !canScroll;

      if (currentIndex >= visibleCards.length) {
        currentIndex = 0;
      }
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        scrollToCard(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        scrollToCard(currentIndex + 1);
      });
    }

    window.addEventListener('resize', function () {
      updateButtons();
      scrollToCard(currentIndex);
    });

    updateButtons();
  }

  function setupServiceFilters() {
    const filterButtons = document.querySelectorAll('#serviceFilters .filter-btn');
    const serviceItems = document.querySelectorAll('#allServicesTrack .service-item');
    const track = document.getElementById('allServicesTrack');

    if (!filterButtons.length || !serviceItems.length || !track) return;

    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        filterButtons.forEach(function (btn) {
          btn.classList.remove('active');
        });

        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        serviceItems.forEach(function (item) {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });

        track.scrollTo({ left: 0, behavior: 'auto' });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupCarousel('featuredTrack');
    setupCarousel('allServicesTrack');
    setupServiceFilters();
  });
})();