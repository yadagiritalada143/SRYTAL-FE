import { render, screen, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressBar from '../ProgressBar';

describe('ProgressBar', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('starts at 0%', () => {
    render(<ProgressBar progress={50} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('animates towards the target progress', () => {
    render(<ProgressBar progress={50} />);
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('reaches 100% when progress is 100', () => {
    render(<ProgressBar progress={100} />);
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('keeps 0% as the animation target when progress is 0', () => {
    render(<ProgressBar progress={0} />);
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('cleans up its interval on unmount', () => {
    const { unmount } = render(<ProgressBar progress={50} />);
    unmount();
    expect(() => {
      act(() => {
        jest.advanceTimersByTime(1500);
      });
    }).not.toThrow();
  });
});