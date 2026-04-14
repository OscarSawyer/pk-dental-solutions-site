document.addEventListener('DOMContentLoaded', () => {
  const trackedLinks = document.querySelectorAll('[data-track]');
  const appointmentForm = document.querySelector('[data-track-form="appointment"]');

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

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', () => {
      const selectedService = appointmentForm.querySelector('[name="service"]')?.value || 'Not selected';
      const selectedContactMethod = appointmentForm.querySelector('[name="contactMethod"]')?.value || 'Not selected';
      const selectedBranch = appointmentForm.querySelector('[name="branchPreference"]')?.value || 'Not selected';

      safeGtag('form_submit', {
        event_category: 'conversion',
        event_label: 'Appointment Form Submission'
      });

      safeGtag('appointment_form_submit', {
        event_category: 'conversion',
        event_label: 'Appointment Form Submission',
        service_requested: selectedService,
        preferred_contact_method: selectedContactMethod,
        branch_preference: selectedBranch
      });
    });
  }
});