import ANIM_CLASSES from '../global/animationClasses';

let observer;

/**
 * Attach visibility observer to the provided nodes and toggle animation classes.
 * Falls back to instantly showing targets when IntersectionObserver is unavailable.
 * @param {NodeList|Element[]|null} nodes Collection of candidate elements.
 * @return {void}
 */
const registerAnimationTargets = (nodes) => {
  if (!nodes) return;
  const list = Array.from(nodes).filter((el) => el && el.classList &&
    ANIM_CLASSES.some((cls) => el.classList.contains(cls)));

  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    list.forEach((el) => el.classList.add('anim-visible'));
    return;
  }

  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anim-visible');
        } else {
          entry.target.classList.remove('anim-visible');
        }
      });
    }, {
      rootMargin: '0px 0px -20% 0px',
      threshold: 0.15,
    });
  }

  list.forEach((el) => observer.observe(el));
};

/**
 * Query document for elements that carry animation classes and observe them.
 * Intended to be called once on page load.
 * @return {void}
 */
const initScrollAnimation = () => {
  const targets = document.querySelectorAll(
      ANIM_CLASSES.map((cls) => `.${cls}`).join(','),
  );
  registerAnimationTargets(targets);
};

export {initScrollAnimation, registerAnimationTargets};
