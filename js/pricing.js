// Assignment 4 · Task 4: change the page background with JavaScript.
(() => {
  'use strict';

  const button = document.getElementById('change-background');
  const status = document.getElementById('background-status');
  if (!button || !status) return;

  const themes = [
    { name: 'Warm paper', color: '#f7f8f3' },
    { name: 'Soft mint', color: '#e8f5df' },
    { name: 'Light blue', color: '#e8f2fb' },
    { name: 'Soft peach', color: '#fbebe1' }
  ];

  let selectedIndex = 0;

  button.addEventListener('click', () => {
    selectedIndex = (selectedIndex + 1) % themes.length;
    const selected = themes[selectedIndex];
    document.body.style.backgroundColor = selected.color;
    status.textContent = `Current theme: ${selected.name}`;
  });
})();
