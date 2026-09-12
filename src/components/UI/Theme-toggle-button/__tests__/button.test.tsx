import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeToggleButton } from '../button';

describe('ThemeToggleButton', () => {
  it('renders a checkbox reflecting isDarkTheme', () => {
    const { rerender } = render(
      <ThemeToggleButton isDarkTheme={false} setTheme={jest.fn()} />
    );
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    rerender(<ThemeToggleButton isDarkTheme setTheme={jest.fn()} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls setTheme with the opposite value when toggled', () => {
    const setTheme = jest.fn();
    const { rerender } = render(
      <ThemeToggleButton isDarkTheme={false} setTheme={setTheme} />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(setTheme).toHaveBeenCalledWith(true);

    setTheme.mockClear();
    rerender(<ThemeToggleButton isDarkTheme setTheme={setTheme} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(setTheme).toHaveBeenCalledWith(false);
  });
});