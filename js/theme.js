// Apply the saved preference before the first paint to avoid a theme flash.
(() => {
  let theme = 'light';
  try { theme = localStorage.getItem('ironfit-theme') === 'dark' ? 'dark' : 'light'; } catch (_) { /* Storage may be disabled. */ }
  document.documentElement.dataset.theme = theme;
})();
