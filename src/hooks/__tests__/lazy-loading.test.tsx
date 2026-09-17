import React from 'react';
import { render, screen } from '@testing-library/react';
import { LazySection } from '../lazy-loading';
import { useInView } from 'react-intersection-observer';

jest.mock('react-intersection-observer');

const mockedUseInView = useInView as jest.MockedFunction<typeof useInView>;

describe('LazySection', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders children when inView is true', () => {
    mockedUseInView.mockReturnValue({ ref: jest.fn(), inView: true } as any);

    render(
      <LazySection>
        <div>Lazy content</div>
      </LazySection>
    );

    expect(screen.getByText('Lazy content')).toBeInTheDocument();
  });

  it('does not render children when inView is false', () => {
    mockedUseInView.mockReturnValue({ ref: jest.fn(), inView: false } as any);

    render(
      <LazySection>
        <div>Lazy content</div>
      </LazySection>
    );

    expect(screen.queryByText('Lazy content')).not.toBeInTheDocument();
  });

  it('calls useInView with triggerOnce and threshold', () => {
    mockedUseInView.mockReturnValue({ ref: jest.fn(), inView: false } as any);

    render(
      <LazySection>
        <div>Content</div>
      </LazySection>
    );

    expect(mockedUseInView).toHaveBeenCalledWith({
      triggerOnce: true,
      threshold: 0.1,
    });
  });

  it('always renders the wrapper div', () => {
    mockedUseInView.mockReturnValue({ ref: jest.fn(), inView: false } as any);

    const { container } = render(
      <LazySection>
        <div>Content</div>
      </LazySection>
    );

    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
