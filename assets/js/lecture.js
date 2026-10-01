(() => {
  const deck = document.querySelector('[data-lecture]');
  if (!deck) return;
  document.documentElement.classList.add('lecture-document');

  const slides = [...deck.querySelectorAll('[data-lecture-slide]')];
  const controls = document.querySelector('[data-lecture-controls]');
  const modeButtons = [...controls.querySelectorAll('[data-mode]')];
  const previous = controls.querySelector('[data-lecture-previous]');
  const next = controls.querySelector('[data-lecture-next]');
  const counter = controls.querySelector('[data-lecture-counter]');
  const label = controls.querySelector('[data-lecture-label]');
  const progress = controls.querySelector('[data-lecture-progress]');
  const status = document.querySelector('[data-lecture-status]');
  const fullscreen = controls.querySelector('[data-fullscreen]');
  const narrowScreen = window.matchMedia('(max-width: 900px)');
  let mode = new URLSearchParams(location.search).get('mode') === 'scroll' ? 'scroll' : 'slides';
  let current = Math.max(0, slides.findIndex((slide) => `#${slide.id}` === location.hash));
  let scrollFrame = null;

  function updateControls(announce = false) {
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    label.textContent = slides[current].dataset.title;
    previous.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    progress.style.width = `${((current + 1) / slides.length) * 100}%`;
    if (announce) status.textContent = `Slide ${current + 1} of ${slides.length}: ${slides[current].dataset.title}`;
  }

  function updateURL() {
    const url = new URL(location.href);
    url.hash = slides[current].id;
    url.searchParams.set('mode', mode);
    history.replaceState(null, '', url);
  }

  function showSlide(index, { focus = false, updateLocation = true } = {}) {
    const destination = Math.max(0, Math.min(slides.length - 1, index));
    const focusWillBeHidden = mode === 'slides' && slides[current].contains(document.activeElement) && destination !== current;
    current = destination;
    slides.forEach((slide, position) => {
      slide.hidden = mode === 'slides' && position !== current;
    });
    updateControls(true);
    if (focus || focusWillBeHidden) slides[current].querySelector('h1, h2').focus({ preventScroll: true });
    if (mode === 'scroll') slides[current].scrollIntoView({ behavior: 'instant', block: 'start' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
    if (updateLocation) updateURL();
  }

  function setMode(value, updateLocation = true) {
    mode = value;
    document.body.dataset.lectureMode = mode;
    modeButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)));
    showSlide(current, { updateLocation });
  }

  // In scroll mode the section crossing the upper part of the viewport is current.
  function trackScroll() {
    if (mode !== 'scroll' || scrollFrame !== null) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = null;
      if (mode !== 'scroll') return;
      const headerHeight = narrowScreen.matches ? 144 : 0;
      const readingLine = headerHeight + (window.innerHeight - headerHeight) * .35;
      let index = 0;
      slides.forEach((slide, position) => {
        if (slide.getBoundingClientRect().top <= readingLine) index = position;
      });
      if (index !== current) {
        current = index;
        updateControls();
        updateURL();
      }
    });
  }

  previous.addEventListener('click', () => showSlide(current - 1));
  next.addEventListener('click', () => showSlide(current + 1));
  modeButtons.forEach((button) => button.addEventListener('click', () => setMode(button.dataset.mode)));
  deck.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const index = slides.findIndex((slide) => `#${slide.id}` === link.getAttribute('href'));
    if (index === -1) return;
    event.preventDefault();
    showSlide(index, { focus: true });
  });
  window.addEventListener('scroll', trackScroll, { passive: true });
  window.addEventListener('resize', trackScroll);
  window.addEventListener('hashchange', () => {
    const index = slides.findIndex((slide) => `#${slide.id}` === location.hash);
    if (index !== -1) showSlide(index, { updateLocation: false });
  });

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      status.textContent = 'Fullscreen is unavailable in this browser. You can still use Slides or Scroll mode.';
    }
  }
  if (document.fullscreenEnabled) {
    fullscreen.hidden = false;
    fullscreen.addEventListener('click', toggleFullscreen);
  }
  document.addEventListener('fullscreenchange', () => {
    fullscreen.setAttribute('aria-label', document.fullscreenElement ? 'Exit fullscreen' : 'Enter fullscreen');
  });

  document.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
    // Leave native link/button activation and the product carousel's arrows alone.
    if (event.target.closest('button, a') && [' ', 'Enter'].includes(event.key)) return;
    let target;
    if (event.key === 'ArrowRight' || event.key === 'PageDown') target = current + 1;
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') target = current - 1;
    if (mode === 'slides') {
      if (event.key === ' ') target = current + (event.shiftKey ? -1 : 1);
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = slides.length - 1;
    }
    if (target !== undefined) {
      event.preventDefault();
      showSlide(target);
    }
    if (event.key.toLowerCase() === 'f' && document.fullscreenEnabled) {
      event.preventDefault();
      toggleFullscreen();
    }
  });

  const carousel = deck.querySelector('[data-lecture-carousel]');
  const products = [...carousel.querySelectorAll('[data-lecture-product]')];
  const productButtons = [...carousel.querySelectorAll('[data-product-to]')];
  const productStatus = carousel.querySelector('[data-product-status]');
  let productIndex = 0;
  function showProduct(index, announce = true) {
    productIndex = (index + products.length) % products.length;
    products.forEach((product, position) => { product.hidden = position !== productIndex; });
    productButtons.forEach((button, position) => button.setAttribute('aria-pressed', String(position === productIndex)));
    carousel.querySelector('[data-product-count]').textContent = `${productIndex + 1} / ${products.length}`;
    if (announce) productStatus.textContent = `${products[productIndex].dataset.name}, startup ${productIndex + 1} of ${products.length}`;
  }
  productButtons.forEach((button) => button.addEventListener('click', () => showProduct(Number(button.dataset.productTo))));
  carousel.querySelector('[data-product-previous]').addEventListener('click', () => showProduct(productIndex - 1));
  carousel.querySelector('[data-product-next]').addEventListener('click', () => showProduct(productIndex + 1));
  carousel.addEventListener('keydown', (event) => {
    if (!event.target.closest('[data-product-controls]') || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    showProduct(productIndex + (event.key === 'ArrowRight' ? 1 : -1));
  });
  carousel.querySelector('[data-product-controls]').hidden = false;
  showProduct(0, false);
  controls.hidden = false;
  setMode(mode, false);
})();
