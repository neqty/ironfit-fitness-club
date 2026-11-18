'use strict';
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') !== 'true';
    const answer = document.getElementById(button.getAttribute('aria-controls'));
    button.setAttribute('aria-expanded', String(expanded));
    answer.hidden = !expanded;
    answer.setAttribute('aria-hidden', String(!expanded));
    button.querySelector('.faq-symbol').textContent = expanded ? '−' : '+';
  });
});
