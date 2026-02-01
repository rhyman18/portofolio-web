let scrollAnimation;
let registerAnimationTargets;
let initScrollAnimation;

describe('registerAnimationTargets', () => {
  const originalIntersectionObserver = global.IntersectionObserver;

  beforeEach(() => {
    jest.resetModules();
    scrollAnimation = require('./scrollAnimation');
    ({registerAnimationTargets, initScrollAnimation} = scrollAnimation);
    document.body.innerHTML = '';
    global.IntersectionObserver = originalIntersectionObserver;
  });

  afterEach(() => {
    global.IntersectionObserver = originalIntersectionObserver;
    jest.clearAllMocks();
  });

  it('returns early when nodes are falsy', () => {
    expect(() => registerAnimationTargets(null)).not.toThrow();
  });

  it('adds anim-visible when IntersectionObserver is unavailable', () => {
    delete global.IntersectionObserver;

    const target = document.createElement('div');
    target.classList.add('anim-fade-up');
    const ignored = document.createElement('div');
    ignored.classList.add('other-class');

    registerAnimationTargets([target, ignored, null]);

    expect(target.classList.contains('anim-visible')).toBe(true);
    expect(ignored.classList.contains('anim-visible')).toBe(false);
  });

  it('observes targets and toggles visibility based on intersection', () => {
    const instances = [];

    global.IntersectionObserver = jest.fn((callback, options) => {
      const instance = {
        callback,
        options,
        observe: jest.fn(),
      };
      instances.push(instance);
      return instance;
    });

    const visible = document.createElement('div');
    visible.classList.add('anim-zoom-in');
    const hidden = document.createElement('div');
    hidden.classList.add('anim-zoom-in-up', 'anim-visible');

    registerAnimationTargets([visible, hidden]);

    expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
    expect(instances[0].options).toEqual({rootMargin: '0px 0px -20% 0px', threshold: 0.15});
    expect(instances[0].observe).toHaveBeenCalledTimes(2);

    instances[0].callback([
      {target: visible, isIntersecting: true},
      {target: hidden, isIntersecting: false},
    ]);

    expect(visible.classList.contains('anim-visible')).toBe(true);
    expect(hidden.classList.contains('anim-visible')).toBe(false);
  });

  it('initScrollAnimation queries expected selectors and registers nodes', () => {
    const first = document.createElement('div');
    first.classList.add('anim-fade-up');
    const second = document.createElement('div');
    second.classList.add('anim-zoom-in-right');
    const ignored = document.createElement('div');
    ignored.classList.add('not-anim');
    document.body.append(first, second, ignored);

    const observed = [];
    global.IntersectionObserver = jest.fn(() => ({
      observe: (el) => observed.push(el),
    }));

    initScrollAnimation();

    expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
    expect(observed).toContain(first);
    expect(observed).toContain(second);
    expect(observed).toHaveLength(2);
  });

  it('reuses existing observer on subsequent calls', () => {
    const seen = [];
    const observe = jest.fn((el) => seen.push(el));
    global.IntersectionObserver = jest.fn(() => ({observe}));

    const first = document.createElement('div');
    first.classList.add('anim-zoom-in');
    const second = document.createElement('div');
    second.classList.add('anim-zoom-in-up');

    registerAnimationTargets([first]);
    registerAnimationTargets([second]);

    expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledTimes(2);
    expect(seen).toEqual([first, second]);
  });
});
