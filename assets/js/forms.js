document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.smart-form');

  const validators = {
  required: (value) => value.trim().length > 0,
  email: (value) => value.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  phone: (value) => /^[0-9+\-\s()]{7,}$/.test(value.trim())
};

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      let valid = true;
      const message = form.querySelector('.form-message');
      const fields = form.querySelectorAll('input, select, textarea');

      if (message) {
        message.textContent = '';
      }

 fields.forEach((field) => {
  field.style.borderColor = '';

  if (field.name === 'bot-field') return;

  if (field.hasAttribute('required') && !validators.required(field.value)) {
    valid = false;
    field.style.borderColor = '#c7372f';
  }

  if (field.type === 'email' && !validators.email(field.value)) {
    valid = false;
    field.style.borderColor = '#c7372f';
  }

  if (field.type === 'tel' && !validators.phone(field.value)) {
    valid = false;
    field.style.borderColor = '#c7372f';
  }
});

      if (!valid) {
        event.preventDefault();
        if (message) {
          message.textContent =  'Please complete the highlighted fields correctly. Appointment times must be between 8:00 AM and 5:30 PM.';
        }
        return;
      }

      if (message) {
        message.textContent = 'Submitting your appointment request...';
      }
    });
  });
});