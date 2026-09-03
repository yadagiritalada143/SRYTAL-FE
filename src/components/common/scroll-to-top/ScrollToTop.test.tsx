import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScrollToTop from './ScrollToTop';

describe('ScrollToTop Component', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
    document.documentElement.scrollTo = jest.fn();
    document.body.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the scroll-to-top button with accessibility label', () => {
    const { getByRole } = render(<ScrollToTop />);
    const button = getByRole('button', { name: /scroll to top/i });
    expect(button).toBeInTheDocument();
  });

  it('triggers smooth scroll to top when clicked', () => {
    const { getByRole } = render(<ScrollToTop />);
    const button = getByRole('button', { name: /scroll to top/i });

    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
  });
});
