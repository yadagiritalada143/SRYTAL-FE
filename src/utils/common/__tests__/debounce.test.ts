import { debounce } from '../debounce';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('calls the function after the delay', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 300);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('resets the timer on subsequent calls within the delay', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 300);

    debounced();
    jest.advanceTimersByTime(200);
    debounced();
    jest.advanceTimersByTime(200);
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes arguments correctly', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);

    debounced('a', 'b');
    jest.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith('a', 'b');
  });

  it('clears pending call when called again before delay', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 500);

    debounced('first');
    jest.advanceTimersByTime(300);
    debounced('second');
    jest.advanceTimersByTime(500);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('second');
  });
});
