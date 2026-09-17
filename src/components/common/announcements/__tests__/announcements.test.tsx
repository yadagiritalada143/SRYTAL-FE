import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Announcements from '../announcements';

jest.mock('@mantine/core', () => ({
  useMantineTheme: () => ({ fontFamily: 'TestFont, sans-serif' })
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      headerBackgroundColor: '#f8f9fa',
      borderColor: '#dee2e6',
      button: { color: '#1971c2', textColor: '#004488' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

describe('Announcements', () => {
  it('renders the announcements heading', () => {
    render(<Announcements />);
    expect(
      screen.getByRole('heading', { name: 'Announcements' })
    ).toBeInTheDocument();
  });

  it('applies the theme text color and font family', () => {
    const { container } = render(<Announcements />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.color).toBe('rgb(0, 68, 136)');
    expect(wrapper.style.fontFamily).toBe('TestFont, sans-serif');
  });
});