import { render, screen } from '@testing-library/react';
import React from 'react';
import CountButton from '../Countbutton';

describe('CountButton', () => {
  it('renders children', () => {
    render(<CountButton>Submit</CountButton>);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <CountButton>
        <span>Part1</span>
        <span>Part2</span>
      </CountButton>
    );
    expect(screen.getByText('Part1')).toBeInTheDocument();
    expect(screen.getByText('Part2')).toBeInTheDocument();
  });

  it('renders inside a button element', () => {
    render(<CountButton>Click</CountButton>);
    expect(screen.getByRole('button')).toHaveTextContent('Click');
  });

  it('applies custom styles to the button', () => {
    const customStyles = { borderRadius: '20px', backgroundColor: 'red' };
    render(<CountButton styles={{ root: customStyles }}>Styled</CountButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle(customStyles);
  });

  it('does not crash without styles', () => {
    render(<CountButton>NoStyles</CountButton>);
    expect(screen.getByText('NoStyles')).toBeInTheDocument();
  });
});
