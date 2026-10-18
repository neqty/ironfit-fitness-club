// Assignment 4 · Task 3: open/close a popup subscription form using JavaScript.
(() => {
  'use strict';

  const overlay = document.getElementById('subscribe-modal');
  const openButton = document.getElementById('open-subscribe');
  const closeButton = document.getElementById('close-subscribe');
  const dialog = overlay?.querySelector('[role="dialog"]');
  const form = document.getElementById('subscribe-form');
  const emailInput = document.getElementById('subscribe-email');
  const emailError = document.getElementById('subscribe-error');
  const status = document.getElementById('subscribe-status');

  if (!overlay || !openButton || !closeButton || !dialog || !form || !emailInput || !emailError || !status) return;

  let previousFocus = null;

  function openPopup() {
    previousFocus = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add('popup-open');
    emailError.textContent = '';
    status.textContent = '';
    emailInput.classList.remove('is-invalid');
    emailInput.removeAttribute('aria-invalid');
    emailInput.focus();
  }

  function closePopup() {
    overlay.hidden = true;
    document.body.classList.remove('popup-open');
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  }

  openButton.addEventListener('click', openPopup);
  closeButton.addEventListener('click', closePopup);

  // Clicking outside the actual dialog closes the popup.
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closePopup();
  });

  document.addEventListener('keydown', (event) => {
    if (overlay.hidden) return;

    if (event.key === 'Escape') {
      closePopup();
      return;
    }

    // Keep keyboard focus within the open modal.
    if (event.key === 'Tab') {
      const controls = [...dialog.querySelectorAll('button, input, select, textarea, a[href]')]
        .filter((element) => !element.disabled);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  emailInput.addEventListener('input', () => {
    emailError.textContent = '';
    status.textContent = '';
    emailInput.classList.remove('is-invalid');
    emailInput.removeAttribute('aria-invalid');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Demo only: there is no backend for sending data.
    const email = emailInput.value.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!validEmail) {
      emailError.textContent = 'Enter a valid email address.';
      emailInput.classList.add('is-invalid');
      emailInput.setAttribute('aria-invalid', 'true');
      status.textContent = '';
      emailInput.focus();
      return;
    }

    emailInput.classList.remove('is-invalid');
    emailInput.removeAttribute('aria-invalid');
    emailError.textContent = '';
    status.textContent = 'Demo successful: the email passed validation. Nothing was sent or saved.';
    form.reset();
  });
})();
