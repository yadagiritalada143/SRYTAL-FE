import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeBackground } from '../background';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#f0f0f0',
      headerBackgroundColor: '#f8f9fa',
      borderColor: '#dee2e6',
      button: { color: '#1971c2', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

describe('ThemeBackground', () => {
  it('renders children inside a themed div', () => {
    const { container } = render(<ThemeBackground>hello</ThemeBackground>);
    const div = container.firstElementChild as HTMLElement;
    expect(div.tagName).toBe('DIV');
    expect(div.style.backgroundColor).toBe('rgb(240, 240, 240)');
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('merges the transition class with a custom className', () => {
    const { container } = render(
      <ThemeBackground className='p-4'>x</ThemeBackground>
    );
    expect(container.firstElementChild!.className).toContain(
      'transition-colors duration-300 ease-in-out'
    );
    expect(container.firstElementChild!.className).toContain('p-4');
  });

  it('lets style override the theme background color', () => {
    const { container } = render(
      <ThemeBackground style={{ backgroundColor: 'blue' }}>x</ThemeBackground>
    );
    expect(
      (container.firstElementChild as HTMLElement).style.backgroundColor
    ).toBe('blue');
  });
});
