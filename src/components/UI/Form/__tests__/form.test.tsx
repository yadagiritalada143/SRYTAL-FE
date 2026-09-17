import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeForm } from '../form';

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

describe('ThemeForm', () => {
  it('renders children inside a themed form', () => {
    const { container } = render(<ThemeForm>hello</ThemeForm>);
    const form = container.firstElementChild!;
    expect(form.tagName).toBe('FORM');
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('applies the theme colors and border', () => {
    const { container } = render(<ThemeForm>x</ThemeForm>);
    const form = container.firstElementChild as HTMLElement;
    expect(form.style.backgroundColor).toBe('rgb(248, 249, 250)');
    expect(form.style.color).toBe('rgb(33, 37, 41)');
    expect(form.style.border).toBe('1px solid #dee2e6');
  });

  it('merges the base classes with a custom className', () => {
    const { container } = render(<ThemeForm className='p-4'>x</ThemeForm>);
    expect(container.firstElementChild!.className).toContain('shadow-xl');
    expect(container.firstElementChild!.className).toContain('rounded-lg');
    expect(container.firstElementChild!.className).toContain('p-4');
  });

  it('lets style override the theme colors', () => {
    const { container } = render(
      <ThemeForm style={{ backgroundColor: 'blue', color: 'red' }}>x</ThemeForm>
    );
    const form = container.firstElementChild as HTMLElement;
    expect(form.style.backgroundColor).toBe('blue');
    expect(form.style.color).toBe('red');
  });

  it('calls onSubmit when the form is submitted', () => {
    const onSubmit = jest.fn();
    render(
      <ThemeForm onSubmit={onSubmit}>
        <button type='submit'>Submit</button>
      </ThemeForm>
    );
    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});