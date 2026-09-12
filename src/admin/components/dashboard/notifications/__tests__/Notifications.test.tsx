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

jest.mock('@components/common/page-header/PageHeader', () => (props: any) => (
  <div data-testid='page-header'>
    <span>{props.title}</span>
    <span>{props.subtitle}</span>
    <span>{props.count}</span>
  </div>
));

import Notifications from '../Notifications';

const renderNotifications = () =>
  render(
    <MantineProvider>
      <Notifications />
    </MantineProvider>
  );

describe('Notifications Component', () => {
  it('renders the page header', () => {
    renderNotifications();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText(/Recent activity and alerts/)).toBeInTheDocument();
  });

  it('renders all 5 hardcoded notifications', () => {
    renderNotifications();
    expect(screen.getByText('New Employee Added')).toBeInTheDocument();
    expect(screen.getByText('Package Assigned')).toBeInTheDocument();
    expect(screen.getByText('Pending Approval')).toBeInTheDocument();
    expect(screen.getByText('Package Updated')).toBeInTheDocument();
    expect(screen.getByText('Employee Deactivated')).toBeInTheDocument();
  });

  it('renders notification messages', () => {
    renderNotifications();
    expect(
      screen.getByText('A new employee has been successfully registered.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('A package has been assigned to an employee.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Multiple employee requests are awaiting approval.')
    ).toBeInTheDocument();
  });

  it('renders time badges', () => {
    renderNotifications();
    expect(screen.getByText('5 mins ago')).toBeInTheDocument();
    expect(screen.getByText('15 mins ago')).toBeInTheDocument();
    expect(screen.getByText('30 mins ago')).toBeInTheDocument();
    expect(screen.getByText('1 hour ago')).toBeInTheDocument();
    expect(screen.getByText('2 hours ago')).toBeInTheDocument();
  });

  it('renders the count in page header', () => {
    renderNotifications();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
