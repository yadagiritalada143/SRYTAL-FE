import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CancelStyledButton, LogoutButton } from '../buttons';

describe('CancelStyledButton', () => {
  it('renders a button with the label characters split into spans', () => {
    render(<CancelStyledButton label='Cancel' />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    ['C', 'a', 'n', 'c', 'e', 'l'].forEach(ch => {
      expect(screen.getAllByText(ch)).toHaveLength(2);
    });
  });

  it('applies the default size class', () => {
    render(<CancelStyledButton label='Cancel' />);
    expect(screen.getByRole('button')).toHaveClass('button', 'md');
  });

  it('applies the given size class', () => {
    render(<CancelStyledButton label='Cancel' size='lg' />);
    expect(screen.getByRole('button')).toHaveClass('button', 'lg');
  });

  it('renders the top and bottom span containers', () => {
    const { container } = render(<CancelStyledButton label='Cancel' />);
    expect(container.querySelectorAll('span.span-mother')).toHaveLength(1);
    expect(container.querySelectorAll('span.span-mother2')).toHaveLength(1);
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<CancelStyledButton label='Cancel' onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('respects the disabled attribute', () => {
    render(<CancelStyledButton label='Cancel' disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

describe('LogoutButton', () => {
  it('renders a logout button containing an icon', () => {
    const { container } = render(<LogoutButton handleLogout={jest.fn()} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('logoutBtn');
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('calls handleLogout when clicked', () => {
    const handleLogout = jest.fn();
    render(<LogoutButton handleLogout={handleLogout} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleLogout).toHaveBeenCalledTimes(1);
  });
});