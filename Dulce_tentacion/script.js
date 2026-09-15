const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  menuButton.querySelector('span').textContent = '+';
}

menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(opening));
  navigation.classList.toggle('is-open', opening);
  menuButton.querySelector('span').textContent = opening ? '−' : '+';
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.header')) closeMenu();
});

window.matchMedia('(min-width: 769px)').addEventListener('change', closeMenu);

const filters = document.querySelector('.menu-filters');
const drinks = [...document.querySelectorAll('.menu-board dl > div')];
filters.hidden = false;
filters.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;
  for (const option of filters.querySelectorAll('button')) {
    option.setAttribute('aria-pressed', String(option === button));
  }
  const category = button.dataset.filter;
  let visible = 0;
  for (const drink of drinks) {
    drink.hidden = category !== 'all' && drink.dataset.category !== category;
    if (!drink.hidden) visible++;
  }
  document.querySelector('#menu-status').textContent = `${visible} bebidas en ${button.textContent.toLowerCase()}.`;
});

// Animate on entry rather than hiding content, so it also works without JS.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
  const entranceObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      if (!reducedMotion.matches) {
        entry.target.animate([
          { opacity: 0.25, translate: '0 24px' },
          { opacity: 1, translate: '0 0' }
        ], { duration: 650, easing: 'cubic-bezier(.2,.7,.3,1)' });
      }
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 });
  document.querySelectorAll('.story-intro, .story-body, .menu-intro, .menu-board, .hands-photo, .moments-list, .visit-copy, .visit-note').forEach(element => entranceObserver.observe(element));
}
