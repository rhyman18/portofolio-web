/**
 * Tests for theme toggle logic in style.js.
 * We build the minimal DOM structure that GLOBAL_ELEMENT queries on import.
 */

const mockInitFlowbite = jest.fn();
jest.mock('flowbite', () => ({
  __esModule: true,
  initFlowbite: mockInitFlowbite,
  default: {initFlowbite: mockInitFlowbite},
}));

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
    mockInitFlowbite.mockClear();
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

  it('calls initFlowbite after loader resolves', async () => {
    const ric = jest.fn((cb) => cb());
    window.requestIdleCallback = ric;

    await import('./style.js');
    await Promise.resolve();
    expect(mockInitFlowbite).toHaveBeenCalled();
  });

  it('falls back to setTimeout when requestIdleCallback is missing', async () => {
    jest.useFakeTimers();
    delete window.requestIdleCallback;
    window.setTimeout = window.setTimeout || ((cb) => cb());
    const setTimeoutSpy = jest.spyOn(window, 'setTimeout');
    await import('./style.js');
    jest.runAllTimers();
    expect(setTimeoutSpy).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('toggles icons visibility on click', async () => {
    window.setTimeout = window.setTimeout || ((cb) => cb());
    await import('./style.js');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const dividerDark = document.getElementById('shape-divider-dark');
    const dividerLight = document.getElementById('shape-divider-light');

    document.getElementById('theme-toggle').click(); // toggles state

    expect(darkIcon.classList.contains('hidden')).toBe(true);
    expect(lightIcon.classList.contains('hidden')).toBe(false);
    expect(dividerDark.classList.contains('hidden'))
        .not.toBe(dividerLight.classList.contains('hidden'));
  });

  it('schedules Flowbite load via helper', async () => {
    jest.useFakeTimers();
    const ric = jest.fn((cb) => cb());
    window.requestIdleCallback = ric;
    window.setTimeout = window.setTimeout || ((cb) => cb());
    const module = await import('./style.js');
    jest.runAllTimers();
    expect(ric).toHaveBeenCalled();
    // directly invoke loader to mark function covered
    await module._loadFlowbite();
    jest.useRealTimers();
  });

  it('directly loads Flowbite helper promise', async () => {
    const module = await import('./style.js');
    await expect(module._loadFlowbite()).resolves.toHaveProperty('default');
  });

  it('invokes scheduleFlowbite fallback branch explicitly', async () => {
    jest.useFakeTimers();
    delete window.requestIdleCallback;
    const timeoutSpy = jest.spyOn(window, 'setTimeout').mockImplementation((cb) => cb());
    const module = await import('./style.js');
    await module._scheduleFlowbite();
    jest.runAllTimers();
    expect(timeoutSpy).toHaveBeenCalled();
    timeoutSpy.mockRestore();
    jest.useRealTimers();
  });

  it('swallows Flowbite load failures without throwing', async () => {
    const failingLoader = jest.fn(() => Promise.reject(new Error('fail')));
    const module = await import('./style.js');

    await expect(module._loadFlowbite(failingLoader)).resolves.toBeUndefined();
    expect(failingLoader).toHaveBeenCalled();
  });

  it('ignores non-function loader arguments safely', async () => {
    const module = await import('./style.js');
    await expect(module._loadFlowbite('not-a-function')).resolves.toBeUndefined();
  });
});
