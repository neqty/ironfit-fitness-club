// Assignment 4 · Task 5: show the visitor's current local date and time.
(() => {
  'use strict';

  const clock = document.getElementById('current-date-time');
  if (!clock) return;

  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  });

  function updateClock() {
    const now = new Date();
    clock.textContent = formatter.format(now);
    clock.dateTime = now.toISOString();
  }

  updateClock();
  window.setInterval(updateClock, 1000);
})();
