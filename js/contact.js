// Assignment 4 · Task 1: client-side registration form validation.
(() => {
  'use strict';

  const form = document.getElementById('registration-form');
  const status = document.getElementById('registration-status');
  if (!form || !status) return;

  const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    confirm: document.getElementById('confirm-password'),
    message: document.getElementById('message')
  };

  const errorElements = {
    name: document.getElementById('name-error'),
    email: document.getElementById('email-error'),
    password: document.getElementById('password-error'),
    confirm: document.getElementById('confirm-password-error'),
    message: document.getElementById('message-error')
  };

  function errorMessage(fieldName) {
    const name = fields.name.value.trim();
    const email = fields.email.value.trim();
    const password = fields.password.value;
    const confirmation = fields.confirm.value;
    const message = fields.message.value.trim();

    switch (fieldName) {
      case 'name':
        return name.length >= 2 ? '' : 'Enter your name (at least 2 characters).';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? '' : 'Enter a valid email address.';
      case 'password':
        return password.length >= 8 ? '' : 'Password must be at least 8 characters.';
      case 'confirm':
        return confirmation && confirmation === password ? '' : 'Passwords must match.';
      case 'message':
        return message ? '' : 'Enter a short message about your goal.';
      default:
        return '';
    }
  }

  function validateField(fieldName) {
    const field = fields[fieldName];
    const message = errorMessage(fieldName);
    errorElements[fieldName].textContent = message;
    field.classList.toggle('is-invalid', Boolean(message));
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
    return !message;
  }

  Object.keys(fields).forEach((name) => {
    fields[name].addEventListener('input', () => {
      if (fields[name].getAttribute('aria-invalid') === 'true') {
        validateField(name);
      }
      // Re-check confirmation when the main password changes.
      if (name === 'password' && fields.confirm.value) validateField('confirm');
      status.textContent = '';
      status.classList.remove('is-error');
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Demo only; no server-side registration.
    const invalidFields = Object.keys(fields).filter((name) => !validateField(name));

    if (invalidFields.length) {
      status.classList.add('is-error');
      status.textContent = 'Please correct the highlighted fields.';
      fields[invalidFields[0]].focus();
      return;
    }

    status.classList.remove('is-error');
    status.textContent = 'Demo validation passed! No information was sent or saved.';
    form.reset();
    Object.keys(fields).forEach((name) => {
      errorElements[name].textContent = '';
      fields[name].classList.remove('is-invalid');
      fields[name].removeAttribute('aria-invalid');
    });
  });
})();
