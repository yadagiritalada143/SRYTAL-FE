import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      accentColor: '#495057',
      successColor: '#37b24d',
      dangerColor: '#e03131',
      mutedTextColor: '#868e96',
      headerBackgroundColor: '#f8f9fa',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

import InfoField from '../InfoField';

const renderField = (props: any) =>
  render(
    <MantineProvider>
      <InfoField {...props} />
    </MantineProvider>
  );

describe('InfoField Component', () => {
  it('renders the label', () => {
    renderField({ label: 'Email', value: 'a@b.com' });
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders the value', () => {
    renderField({ label: 'Email', value: 'a@b.com' });
    expect(screen.getByText('a@b.com')).toBeInTheDocument();
  });

  it('renders a dash when value is empty', () => {
    renderField({ label: 'Email', value: '' });
    expect(screen.getByText('\u2014')).toBeInTheDocument();
  });

  it('renders a dash when value is null', () => {
    renderField({ label: 'Email', value: null });
    expect(screen.getByText('\u2014')).toBeInTheDocument();
  });

  it('renders a dash when value is undefined', () => {
    renderField({ label: 'Email' });
    expect(screen.getByText('\u2014')).toBeInTheDocument();
  });

  it('renders a numeric value', () => {
    renderField({ label: 'Count', value: 42 });
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders with an icon when provided', () => {
    renderField({
      label: 'Name',
      value: 'John',
      icon: <span data-testid='icon'>★</span>
    });
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('does not render icon container when no icon provided', () => {
    const { container } = renderField({ label: 'Name', value: 'John' });
    expect(
      container.querySelector('[data-testid="icon"]')
    ).not.toBeInTheDocument();
  });
});
