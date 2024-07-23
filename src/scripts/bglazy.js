const initialiseStyleBackgroundIntersectionObserver = () => {
  const lazyBackgrounds = Array.from(
      document.querySelectorAll('[bg-lazy]'),
  );

  if (lazyBackgrounds.length === 0) {
    return;
  }

  let lazyBackgroundObserver;

  const loadBackgroundIfElementOnScreen = (entry) => {
    if (entry.isIntersecting) {
      const bgLazyAttribute = entry.target.getAttribute('bg-lazy');
      entry.target.style.backgroundImage = `url('${bgLazyAttribute}')`;
      lazyBackgroundObserver.unobserve(entry.target);
    }
  };

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
