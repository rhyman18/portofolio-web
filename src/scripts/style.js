import '../styles/app.css';
import 'flowbite';

const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const shapeDividerDark = document.getElementById('shape-divider-light');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const shapeDividerLight = document.getElementById('shape-divider-dark');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  themeToggleLightIcon.classList.remove('hidden');
  shapeDividerLight.classList.remove('hidden');
} else {
  themeToggleDarkIcon.classList.remove('hidden');
  shapeDividerDark.classList.remove('hidden');
}

const themeToggleBtn = document.getElementById('theme-toggle');

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
