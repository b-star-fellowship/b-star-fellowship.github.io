(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.header-inner')) closeMenu();
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
})();

(() => {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('[data-slide]')];
  if (slides.length < 2) return;

  const controls = carousel.querySelector('[data-carousel-controls]');
  const picker = carousel.querySelector('.carousel-pagination');
  const choices = [...carousel.querySelectorAll('[data-slide-to]')];
  const playback = carousel.querySelector('[data-rotation]');
  const playbackLabel = carousel.querySelector('[data-rotation-label]');
  const counter = carousel.querySelector('[data-counter]');
  const status = carousel.querySelector('[data-carousel-status]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const delay = 6000;
  let current = 0;
  let paused = reducedMotion.matches;
  let hovered = false;
  let inView = !('IntersectionObserver' in window);
  let timer;

  function schedule() {
    window.clearTimeout(timer);
    playbackLabel.textContent = paused ? 'Play' : 'Pause';
    playback.setAttribute('aria-label', paused ? 'Start automatic rotation' : 'Pause automatic rotation');
    if (paused || hovered || !inView || document.hidden) return;
    timer = window.setTimeout(() => show(current + 1), delay);
  }

  function show(index, announce = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, position) => {
      const selected = position === current;
      slide.setAttribute('aria-hidden', String(!selected));
      slide.inert = !selected;
      choices[position].setAttribute('aria-pressed', String(selected));
    });
    const choice = choices[current];
    if (choice.offsetLeft < picker.scrollLeft) picker.scrollLeft = choice.offsetLeft;
    else if (choice.offsetLeft + choice.offsetWidth > picker.scrollLeft + picker.clientWidth) {
      picker.scrollLeft = choice.offsetLeft + choice.offsetWidth - picker.clientWidth;
    }
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    // Automatic changes stay silent for assistive technology.
    if (announce) status.textContent = `${slides[current].dataset.name}, product ${current + 1} of ${slides.length}`;
    schedule();
  }

  function select(index) {
    paused = true;
    show(index, true);
  }

  carousel.querySelector('[data-previous]').addEventListener('click', () => select(current - 1));
  carousel.querySelector('[data-next]').addEventListener('click', () => select(current + 1));
  choices.forEach((button) => button.addEventListener('click', () => select(Number(button.dataset.slideTo))));
  playback.addEventListener('click', () => {
    paused = !paused;
    schedule();
  });
  carousel.addEventListener('mouseenter', () => { hovered = true; schedule(); });
  carousel.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  carousel.addEventListener('focusin', (event) => {
    // Keep the rotation control usable; moving focus into a slide or selector stops rotation.
    if (!playback.contains(event.target)) { paused = true; schedule(); }
  });
  carousel.addEventListener('keydown', (event) => {
    if (!event.target.closest('.carousel-controls, .carousel-pagination')) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      select(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) paused = true;
    schedule();
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      schedule();
    }, { threshold: 0.25 });
    observer.observe(carousel);
  }
  controls.hidden = false;
  show(0);
})();
