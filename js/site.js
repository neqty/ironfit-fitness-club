'use strict';
const Ironfit = {
  read(key, fallback = null) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (_) { return fallback; }
  },
  write(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
  user() {
    const users = this.read('ironfit-users', []);
    const session = this.read('ironfit-session');
    return Array.isArray(users) ? users.find(user => user && user.email === session) : null;
  },
  updateNavigation() {
    const signedIn = Boolean(this.user());
    document.querySelectorAll('[data-auth-link]').forEach(link => {
      link.textContent = signedIn ? 'Profile' : 'Log In';
      link.href = signedIn ? 'profile.html' : 'login.html';
    });
  }
};
const themeButton = document.getElementById('theme-toggle');
function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
  document.getElementById('theme-label').textContent = dark ? 'Light' : 'Dark';
}
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('ironfit-theme', theme); } catch (_) {
    themeButton.title = 'Browser storage is unavailable. This theme will last for this page only.';
  }
  updateThemeButton();
});
updateThemeButton();
Ironfit.updateNavigation();
window.addEventListener('pageshow', () => Ironfit.updateNavigation());
window.addEventListener('storage', event => {
  if (event.key === 'ironfit-theme') {
    document.documentElement.dataset.theme = event.newValue === 'dark' ? 'dark' : 'light';
    updateThemeButton();
  }
  Ironfit.updateNavigation();
});
