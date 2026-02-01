import ANIM_CLASSES from '../global/animationClasses';

let observer;

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

const initScrollAnimation = () => {
  const targets = document.querySelectorAll(
      ANIM_CLASSES.map((cls) => `.${cls}`).join(','),
  );
  registerAnimationTargets(targets);
};

export {initScrollAnimation, registerAnimationTargets};
