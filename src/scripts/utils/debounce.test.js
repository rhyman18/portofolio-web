import Debounce from './debounce';

jest.useFakeTimers();

describe('Debounce', () => {
  it('delays function execution', () => {
    const fn = jest.fn();
    const debounced = Debounce.init({func: fn, wait: 300});

    debounced('a');
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(299);
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledWith('a');
  });

  it('resets timer on rapid calls', () => {
    const fn = jest.fn();
    const debounced = Debounce.init({func: fn, wait: 100});

    debounced();
    jest.advanceTimersByTime(50);
    debounced();
    jest.advanceTimersByTime(99);
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
