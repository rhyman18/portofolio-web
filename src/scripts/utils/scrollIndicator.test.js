import ScrollIndicator from './scrollIndicator';

describe('ScrollIndicator', () => {
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
    window.onscroll();

    expect(bar.style.width).toBe('50%');
  });

  it('falls back to documentElement scrollTop when body scrollTop is zero', () => {
    const bar = {style: {width: '0%'}};
    Object.defineProperty(document.documentElement, 'scrollHeight', {value: 150, configurable: true});
    Object.defineProperty(document.documentElement, 'clientHeight', {value: 50, configurable: true});
    Object.defineProperty(document.body, 'scrollTop', {value: 0, writable: true, configurable: true});
    Object.defineProperty(document.documentElement, 'scrollTop', {value: 75, writable: true, configurable: true});

    ScrollIndicator.init(bar);
    window.onscroll();

    expect(bar.style.width).toBe('75%');
  });
});
