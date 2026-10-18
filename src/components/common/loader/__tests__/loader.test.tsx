import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from '../loader';

describe('Loader', () => {
  it('renders the three rotating rings and the loading label', () => {
    const { container } = render(<Loader />);

    expect(container.querySelectorAll('svg')).toHaveLength(3);
    expect(container.querySelectorAll('circle')).toHaveLength(7);
    expect(container.querySelector('[data-text="Loading"]')).toBeInTheDocument();
  });
});
