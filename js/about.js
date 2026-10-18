// Assignment 4 · Task 2: interactive accordion with smooth CSS animation.
(() => {
  'use strict';

  document.querySelectorAll('.faq-question').forEach((button) => {
    const answer = document.getElementById(button.getAttribute('aria-controls'));
    if (!answer) return;

    button.addEventListener('click', () => {
      const opening = button.getAttribute('aria-expanded') !== 'true';

      button.setAttribute('aria-expanded', String(opening));
      answer.setAttribute('aria-hidden', String(!opening));
      answer.classList.toggle('is-open', opening);
      answer.inert = !opening;
    });

    answer.inert = true;
  });
})();
