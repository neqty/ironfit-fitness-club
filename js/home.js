'use strict';
// Start each concept statistic once when its section becomes visible.
const counters = [...document.querySelectorAll('[data-count]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function animateCounter(counter) {
  const target = Number(counter.dataset.count);
  const suffix = counter.dataset.suffix || '';
  const show = value => { counter.textContent = value.toLocaleString('en-US') + suffix; };
  if (reducedMotion.matches) { show(target); return; }
  const started = performance.now();
  function frame(now) {
    const progress = Math.min((now - started) / 1400, 1);
    show(Math.round(target * (1 - Math.pow(1 - progress, 3))));
    if (progress < 1 && !reducedMotion.matches) requestAnimationFrame(frame);
    else show(target);
  }
  requestAnimationFrame(frame);
}
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => observer.observe(counter));
}
const gallery = document.getElementById('ironfitCarousel');
// Explicit initialization enables arrow keys and touch before the first click.
if (gallery && window.bootstrap) {
  bootstrap.Carousel.getOrCreateInstance(gallery, { interval: false, touch: true, keyboard: true });
  gallery.addEventListener('slid.bs.carousel', event => {
    document.getElementById('gallery-status').textContent = `Slide ${event.to + 1} of ${gallery.querySelectorAll('.carousel-item').length}`;
  });
}
