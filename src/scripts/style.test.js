/**
 * Tests for theme toggle logic in style.js.
 * We build the minimal DOM structure that GLOBAL_ELEMENT queries on import.
 */

const createToggleDom = () => {
  const ids = [
    'theme-toggle-dark-icon',
    'theme-toggle-light-icon',
    'shape-divider-light',
    'shape-divider-dark',
    'theme-toggle',
  ];
  ids.forEach((id) => {
    const el = document.createElement('div');
    el.id = id;
    el.classList.add('hidden');
    document.body.appendChild(el);
  });
};

describe('style.js theme toggle', () => {
  const originalMatchMedia = window.matchMedia;
  const originalRIC = window.requestIdleCallback;

  beforeEach(() => {
    jest.resetModules();
    document.body.innerHTML = '';
    localStorage.clear();
    window.matchMedia = jest.fn().mockReturnValue({
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    });
    createToggleDom();
  });

  afterAll(() => {
    window.matchMedia = originalMatchMedia;
    window.requestIdleCallback = originalRIC;
  });

  it('shows light icon when stored theme is dark and toggles to light on click', async () => {
    localStorage.setItem('color-theme', 'dark');

    await import('./style.js');

    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    expect(lightIcon.classList.contains('hidden')).toBe(false);
    expect(darkIcon.classList.contains('hidden')).toBe(true);

    document.getElementById('theme-toggle').click();

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('color-theme')).toBe('light');
    expect(lightIcon.classList.contains('hidden')).toBe(true);
    expect(darkIcon.classList.contains('hidden')).toBe(false);
  });

  it('toggles from light to dark when no stored preference', async () => {
    localStorage.removeItem('color-theme');

    await import('./style.js');
    const toggle = document.getElementById('theme-toggle');
    toggle.click();

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('color-theme')).toBe('dark');
  });

  it('toggles to dark when localStorage has light', async () => {
    localStorage.setItem('color-theme', 'light');

    await import('./style.js');
    const toggle = document.getElementById('theme-toggle');
    toggle.click();

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('color-theme')).toBe('dark');
  });

  it('removes dark when no storage but document already dark', async () => {
    localStorage.removeItem('color-theme');
    document.documentElement.classList.add('dark');

    await import('./style.js');
    const toggle = document.getElementById('theme-toggle');
    toggle.click();

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('color-theme')).toBe('light');
  });

  it('uses requestIdleCallback when available for Flowbite load', async () => {
    const ric = jest.fn((cb) => cb());
    window.requestIdleCallback = ric;

    await import('./style.js');
    expect(ric).toHaveBeenCalled();
  });

  it('falls back to setTimeout when requestIdleCallback is missing', async () => {
    jest.useFakeTimers();
    delete window.requestIdleCallback;
    const setTimeoutSpy = jest.spyOn(window, 'setTimeout');
    await import('./style.js');
    jest.runAllTimers();
    expect(setTimeoutSpy).toHaveBeenCalled();
    jest.useRealTimers();
  });
});
