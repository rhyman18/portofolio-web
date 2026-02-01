/**
 * Lazy-load background images declared via `bg-lazy` attribute using
 * IntersectionObserver (with a simple fallback).
 */
const initialiseStyleBackgroundIntersectionObserver = () => {
  const lazyBackgrounds = Array.from(
      document.querySelectorAll('[bg-lazy]'),
  );

  if (lazyBackgrounds.length === 0) {
    return;
  }

  let lazyBackgroundObserver;

  /**
   * Apply background when target enters viewport.
   * @param {IntersectionObserverEntry} entry
   * @return {void}
   */
  const loadBackgroundIfElementOnScreen = (entry) => {
    if (entry.isIntersecting) {
      const bgLazyAttribute = entry.target.getAttribute('bg-lazy');
      entry.target.style.backgroundImage = `url('${bgLazyAttribute}')`;
      lazyBackgroundObserver.unobserve(entry.target);
    }
  };

  /**
   * Observe a lazy background element.
   * @param {Element} lazyBackground
   * @return {void}
   */
  const observeElementVisibility = (lazyBackground) => {
    lazyBackgroundObserver.observe(lazyBackground);
  };

  if (typeof window.IntersectionObserver === 'function') {
    lazyBackgroundObserver = new IntersectionObserver((entries) => {
      entries.forEach(loadBackgroundIfElementOnScreen);
    });
    lazyBackgrounds.forEach(observeElementVisibility);
  } else {
    lazyBackgrounds.forEach((lazyBackground) => {
      const bgLazyAttribute = lazyBackground.getAttribute('bg-lazy');
      lazyBackground.style.backgroundImage = `url('${bgLazyAttribute}')`;
    });
  }
};

if (
  typeof document.readyState === 'string' &&
  document.readyState === 'complete'
) {
  initialiseStyleBackgroundIntersectionObserver();
} else {
  document.addEventListener(
      'DOMContentLoaded',
      initialiseStyleBackgroundIntersectionObserver,
      true,
  );
}
