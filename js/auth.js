'use strict';
// A salted digest avoids storing the password as plain text. This remains a
// browser-only classroom simulation: local data and sessions can be modified.
async function passwordDigest(password, salt) {
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
}
function getUsers() {
  const users = Ironfit.read('ironfit-users', []);
  return Array.isArray(users) ? users.filter(user => user && typeof user.email === 'string') : [];
}
function showAuthError(message) {
  const status = document.getElementById('form-status');
  status.classList.add('is-error');
  status.textContent = message;
}
const signupForm = document.getElementById('signup-form');
if (signupForm) signupForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (!FormValidation.validate(signupForm)) return;
  const button = signupForm.querySelector('[type="submit"]');
  button.disabled = true;
  try {
    const data = Object.fromEntries(new FormData(signupForm));
    const email = data.email.trim().toLowerCase();
    if (getUsers().some(user => user.email === email)) {
      showAuthError('An account with this email already exists on this device. Please log in.');
      return;
    }
    const salt = crypto.randomUUID();
    const digest = await passwordDigest(data.password, salt);
    // Re-read after hashing so another tab's completed registration is preserved.
    const users = getUsers();
    if (users.some(user => user.email === email)) { showAuthError('This email is already registered. Please log in.'); return; }
    users.push({ name: data.name.trim(), email, phone: data.phone.trim(), plan: data.plan, salt, passwordHash: digest });
    Ironfit.write('ironfit-users', users);
    location.assign('login.html?registered=1');
  } catch (_) {
    showAuthError('Account could not be saved. Open the site using localhost or HTTPS and enable browser storage.');
  } finally { button.disabled = false; }
});
const loginForm = document.getElementById('login-form');
if (loginForm) {
  if (new URLSearchParams(location.search).get('registered') === '1') {
    document.getElementById('form-status').textContent = 'Account created on this device. Log in to continue.';
  }
  loginForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (!FormValidation.validate(loginForm)) return;
    const button = loginForm.querySelector('[type="submit"]');
    button.disabled = true;
    try {
      const email = loginForm.querySelector('#email').value.trim().toLowerCase();
      const user = getUsers().find(user => user.email === email);
      if (!user || await passwordDigest(loginForm.querySelector('#password').value, user.salt) !== user.passwordHash) {
        showAuthError('Email or password is incorrect. Use an account created on this device.');
        return;
      }
      Ironfit.write('ironfit-session', email);
      location.assign('profile.html');
    } catch (_) { showAuthError('Could not log in. Enable browser storage and open the site using localhost or HTTPS.'); }
    finally { button.disabled = false; }
  });
}
function renderProfile() {
  if (!document.getElementById('profile-content')) return;
  const user = Ironfit.user();
  if (!user) { location.replace('login.html'); return; }
  ['name', 'email', 'phone', 'plan'].forEach(key => {
    document.getElementById(`profile-${key}`).textContent = user[key] || 'Not set';
  });
  const enquiry = Ironfit.read('ironfit-enquiry');
  if (enquiry?.email === user.email) {
    document.getElementById('profile-enquiry').textContent = `${enquiry.plan} · ${enquiry.time}\n${enquiry.message}\nSaved locally; not sent.`;
  } else document.getElementById('profile-enquiry').textContent = 'No saved enquiry for this account.';
  document.getElementById('profile-content').hidden = false;
  document.getElementById('profile-status').textContent = '';
}
renderProfile();
window.addEventListener('pageshow', renderProfile);
window.addEventListener('storage', renderProfile);
document.getElementById('logout')?.addEventListener('click', () => {
  try { localStorage.removeItem('ironfit-session'); location.replace('login.html'); }
  catch (_) { document.getElementById('profile-status').textContent = 'Could not clear your session. Enable browser storage and try again.'; }
});
