// Assignment 5: filter plans and play a small sound when a choice is made.
const memberships = [
  { name: 'Basic', price: 15000 },
  { name: 'Standard', price: 25000 },
  { name: 'Premium', price: 40000 }
];
const priceSelect = document.getElementById('a5-price-select');
const priceList = document.getElementById('a5-price-list');
function playClickSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.value = 520;
    gain.gain.value = 0.03;
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.08);
    oscillator.onended = function () { context.close(); };
  } catch (error) { /* Audio is optional on unsupported devices. */ }
}
if (priceSelect && priceList) {
  priceSelect.addEventListener('change', function () {
    const max = Number(priceSelect.value);
    const filtered = memberships.filter(function (plan) { return plan.price <= max; });
    priceList.replaceChildren();
    filtered.forEach(function (plan) {
      const item = document.createElement('li');
      item.textContent = plan.name + ' — ' + plan.price.toLocaleString() + ' ₸';
      priceList.appendChild(item);
    });
    playClickSound();
    priceList.classList.remove('a5-highlight');
    void priceList.offsetWidth;
    priceList.classList.add('a5-highlight');
  });
  // Show the initial prices without playing a sound.
  const initialPlans = memberships.filter(function (plan) {
    return plan.price <= Number(priceSelect.value);
  });
  initialPlans.forEach(function (plan) {
    const item = document.createElement('li');
    item.textContent = plan.name + ' — ' + plan.price.toLocaleString() + ' ₸';
    priceList.appendChild(item);
  });
}
