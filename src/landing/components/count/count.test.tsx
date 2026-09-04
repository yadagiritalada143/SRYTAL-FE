import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import VisitorCount from './count';
import { getVisitorCount } from '../../../services/common-services';

jest.mock('../../../services/common-services', () => ({
  getVisitorCount: jest.fn().mockResolvedValue(12500)
}));

class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe(target: Element) {
    this.callback(
      [{ isIntersecting: true, target } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    );
  }
  unobserve() {}
  disconnect() {}
}

window.IntersectionObserver = MockIntersectionObserver as any;

describe('VisitorCount Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the visitor counter card with live badge and title', async () => {
    await act(async () => {
      render(<VisitorCount />);
    });

    expect(screen.getByText(/Live Platform Engagement/i)).toBeInTheDocument();
    expect(screen.getByText(/Global Platform Visitors/i)).toBeInTheDocument();
    expect(screen.getByText(/Worldwide Reach/i)).toBeInTheDocument();
    expect(screen.getByText(/99.9% Uptime/i)).toBeInTheDocument();
  });

  it('fetches visitor count from service on mount', async () => {
    await act(async () => {
      render(<VisitorCount />);
    });

    await waitFor(() => {
      expect(getVisitorCount).toHaveBeenCalled();
    });
  });
});
