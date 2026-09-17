import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonAnimate from '../Button';

describe('ButtonAnimate', () => {
  it('renders the button with primary text', () => {
    render(<ButtonAnimate primaryText='Submit' />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('S', { selector: 'span[data-label="S"]' })).toBeInTheDocument();
  });

  it('renders each character of primary text as a span', () => {
    const { container } = render(<ButtonAnimate primaryText='Go' />);
    expect(container.querySelectorAll('.char span')).toHaveLength(2);
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<ButtonAnimate primaryText='Submit' onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders the splash svg', () => {
    const { container } = render(<ButtonAnimate primaryText='Submit' />);
    expect(container.querySelector('svg.splash')).toBeInTheDocument();
  });

  it('renders the path svg', () => {
    const { container } = render(<ButtonAnimate primaryText='Submit' />);
    expect(container.querySelector('svg.path')).toBeInTheDocument();
  });

  it('renders the icon element', () => {
    const { container } = render(<ButtonAnimate primaryText='Submit' />);
    expect(container.querySelector('.icon')).toBeInTheDocument();
  });

  it('handles an empty primary text', () => {
    render(<ButtonAnimate primaryText='' />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders a long primary text without error', () => {
    const { container } = render(<ButtonAnimate primaryText='Generate Offer Letter' />);
    const chars = container.querySelectorAll('.char span');
    expect(chars.length).toBe(21);
  });
});