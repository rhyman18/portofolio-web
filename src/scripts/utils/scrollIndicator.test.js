import ScrollIndicator from './scrollIndicator';

describe('ScrollIndicator', () => {
  beforeEach(() => {
    global.requestAnimationFrame = (cb) => cb();
  });

  afterEach(() => {
    ScrollIndicator.destroy();
  });

  it('updates element width on scroll', () => {
    const bar = {style: {width: '0%'}};

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 200,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 100,
      configurable: true,
    });
    Object.defineProperty(document.body, 'scrollTop', {
      value: 50,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 50,
      writable: true,
      configurable: true,
    });

    ScrollIndicator.init(bar);
    ScrollIndicator._handler();

    expect(bar.style.width).toBe('50%');
  });

  it('falls back to documentElement scrollTop when body scrollTop is zero', () => {
    const bar = {style: {width: '0%'}};
    Object.defineProperty(document.documentElement, 'scrollHeight', {value: 150, configurable: true});
    Object.defineProperty(document.documentElement, 'clientHeight', {value: 50, configurable: true});
    Object.defineProperty(document.body, 'scrollTop', {value: 0, writable: true, configurable: true});
    Object.defineProperty(document.documentElement, 'scrollTop', {value: 75, writable: true, configurable: true});

    ScrollIndicator.init(bar);
    ScrollIndicator._handler();

    expect(bar.style.width).toBe('75%');
  });

  it('skips init when element is missing', () => {
    ScrollIndicator.init(null);
    expect(ScrollIndicator._handler).toBeNull();
  });

  it('uses rAF to coalesce multiple scroll events and cleans up', () => {
    const callbacks = [];
    global.requestAnimationFrame = jest.fn((cb) => {
      callbacks.push(cb);
      return 1;
    });

    const bar = {style: {width: '0%'}};
    Object.defineProperty(document.documentElement, 'scrollHeight', {value: 200, configurable: true});
    Object.defineProperty(document.documentElement, 'clientHeight', {value: 100, configurable: true});
    Object.defineProperty(document.documentElement, 'scrollTop', {value: 50, writable: true, configurable: true});
    Object.defineProperty(document.body, 'scrollTop', {value: 50, writable: true, configurable: true});

    ScrollIndicator.init(bar);
    const handler = ScrollIndicator._handler;
    handler();
    handler(); // second call should be ignored while pending

    expect(global.requestAnimationFrame).toHaveBeenCalledTimes(1);
    callbacks[0]();
    expect(bar.style.width).toBe('50%');

    ScrollIndicator.destroy();
    expect(ScrollIndicator._handler).toBeNull();
  });
});
