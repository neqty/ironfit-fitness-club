'use strict';
const FormValidation = {
  error(field, form) {
    const value = field.value.trim();
    if (!value) return 'Please fill in this field.';
    switch (field.id) {
      case 'name': return value.length >= 2 ? '' : 'Enter at least 2 characters for your name.';
      case 'email': return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter an email like name@example.com.';
      case 'phone': {
        const digits = value.replace(/[\s()\-]/g, '');
        return /^\+?\d{10,15}$/.test(digits) ? '' : 'Use 10–15 digits, with an optional +, spaces, brackets or hyphens.';
      }
      case 'password': return field.value.length >= 8 && /[a-z]/.test(field.value) && /[A-Z]/.test(field.value) && /\d/.test(field.value) && /[^A-Za-z0-9\s]/.test(field.value) ? '' : 'Use 8+ characters, uppercase, lowercase, a number and a symbol.';
      case 'confirm-password': return field.value === form.querySelector('#password').value ? '' : 'Passwords must match.';
      case 'plan': return ['Basic', 'Standard', 'Premium'].includes(value) ? '' : 'Choose a membership from the list.';
      default: return '';
    }
  },
  field(field, form) {
    const message = this.error(field, form);
    const error = document.getElementById(`${field.id}-error`);
    if (error) error.textContent = message;
    field.classList.toggle('is-invalid', Boolean(message));
    field.setAttribute('aria-invalid', String(Boolean(message)));
    return !message;
  },
  validate(form) {
    const fields = [...form.querySelectorAll('input:not([type="radio"]), select, textarea')];
    const invalid = fields.filter(field => !this.field(field, form));
    const timeError = form.querySelector('#time-error');
    if (timeError) {
      const valid = ['morning', 'evening'].includes(form.querySelector('[name="time"]:checked')?.value);
      timeError.textContent = valid ? '' : 'Choose morning or evening.';
      if (!valid) invalid.push(form.querySelector('[name="time"]'));
    }
    const status = form.querySelector('#form-status');
    status.classList.toggle('is-error', invalid.length > 0);
    status.textContent = invalid.length ? 'Please correct the highlighted fields.' : '';
    if (invalid.length) invalid[0].focus();
    return !invalid.length;
  }
};
document.querySelectorAll('form[data-form]').forEach(form => {
  form.querySelectorAll('input:not([type="radio"]), select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') FormValidation.field(field, form);
      const confirmation = form.querySelector('#confirm-password');
      if (field.id === 'password' && confirmation?.value) FormValidation.field(confirmation, form);
      form.querySelector('#form-status').textContent = '';
    });
  });
});
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!FormValidation.validate(contactForm)) return;
    const status = document.getElementById('form-status');
    try {
      const enquiry = Object.fromEntries(new FormData(contactForm));
      enquiry.email = enquiry.email.trim().toLowerCase();
      Ironfit.write('ironfit-enquiry', enquiry);
      status.classList.remove('is-error');
      status.textContent = 'Enquiry saved on this device. Nothing was sent to the club. Log in with the same email to see it in your profile.';
      contactForm.reset();
    } catch (_) {
      status.classList.add('is-error');
      status.textContent = 'Your browser could not save the enquiry. Enable local storage and try again.';
    }
  });
}
