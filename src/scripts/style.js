import '../styles/app.css';
import GLOBAL_ELEMENT from './global/globalElement';

/** Theme toggle controller for swapping light/dark UI assets. */
const themeToggleDarkIcon = GLOBAL_ELEMENT.ToggleDarkIcon;
const shapeDividerDark = GLOBAL_ELEMENT.DividerLight;
const themeToggleLightIcon = GLOBAL_ELEMENT.ToggleLightIcon;
const shapeDividerLight = GLOBAL_ELEMENT.DividerDark;

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  themeToggleLightIcon.classList.remove('hidden');
  shapeDividerLight.classList.remove('hidden');
} else {
  themeToggleDarkIcon.classList.remove('hidden');
  shapeDividerDark.classList.remove('hidden');
}

const themeToggleBtn = GLOBAL_ELEMENT.ThemeToggle;

/**
 * Toggle theme between light/dark while syncing button icons and dividers.
 */
themeToggleBtn.addEventListener('click', function() {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle('hidden');
  shapeDividerDark.classList.toggle('hidden');
  themeToggleLightIcon.classList.toggle('hidden');
  shapeDividerLight.classList.toggle('hidden');

  // if set via local storage previously
  if (localStorage.getItem('color-theme')) {
    if (localStorage.getItem('color-theme') === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  }
});

// Defer Flowbite JS to after paint to reduce initial bundle size.
const loadFlowbite = (loader = () => import('flowbite')) => {
  if (typeof loader !== 'function') return Promise.resolve();
  return loader().catch(() => {});
};
const scheduleFlowbite = () => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => loadFlowbite());
  } else {
    setTimeout(() => loadFlowbite(), 0);
  }
};
scheduleFlowbite();

// Exported for test coverage of lazy loaders.
export const _loadFlowbite = loadFlowbite;
export const _scheduleFlowbite = scheduleFlowbite;
