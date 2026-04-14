document.addEventListener('DOMContentLoaded', () => {
  const trackedLinks = document.querySelectorAll('[data-track]');

  const safeGtag = (eventName, params = {}) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  };

  trackedLinks.forEach((element) => {
    element.addEventListener('click', () => {
      const trackType = element.dataset.track;
      const label = element.dataset.trackLabel || 'Unlabeled Interaction';

      if (trackType === 'call') {
        safeGtag('call_click', {
          event_category: 'engagement',
          event_label: label
        });
      }

      if (trackType === 'whatsapp') {
        safeGtag('whatsapp_click', {
          event_category: 'engagement',
          event_label: label
        });
      }

      if (trackType === 'book_click') {
        safeGtag('book_click', {
          event_category: 'engagement',
          event_label: label
        });
      }
    });
  });
});