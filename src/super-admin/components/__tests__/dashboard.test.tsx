import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';

jest.mock('@super-admin/components/nav-bar/nav-bar', () => ({
  __esModule: true,
  default: ({
    navLinks,
    toggleDrawer
  }: {
    navLinks: Array<{ name: string }>;
    toggleDrawer: () => void;
  }) => (
    <nav data-testid='super-admin-navbar'>
      {navLinks.map(link => (
        <span key={link.name}>{link.name}</span>
      ))}
      <button onClick={toggleDrawer} data-testid='nav-drawer-button'>
        toggle
      </button>
    </nav>
  )
}));

jest.mock('@super-admin/components/header/header', () => ({
  __esModule: true,
  default: () => <div data-testid='super-admin-header'>SUPER ADMIN</div>
}));

jest.mock('@utils/super-admin/nav-links/super-admin-nav-links', () => ({
  SuperAdminNavLinks: [
    {
      url: 'dashboard/register-admin',
      icon: () => null,
      name: 'Register Admin'
    },
    { url: 'dashboard/employees', icon: () => null, name: 'Manage Employees' },
    { url: 'dashboard/documents', icon: () => null, name: 'Documents' }
  ]
}));

import SuperadminDashboard from '../../pages/dashboard/dashboard';

const renderDashboard = () =>
  render(
    <MemoryRouter>
      <MantineProvider>
        <SuperadminDashboard />
      </MantineProvider>
    </MemoryRouter>
  );

describe('SuperadminDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the SuperAdminHeader', () => {
    renderDashboard();
    expect(screen.getByTestId('super-admin-header')).toBeInTheDocument();
  });

  it('renders the SuperAdminNavbar with nav links', () => {
    renderDashboard();
    expect(screen.getByTestId('super-admin-navbar')).toBeInTheDocument();
    expect(screen.getByText('Register Admin')).toBeInTheDocument();
    expect(screen.getByText('Manage Employees')).toBeInTheDocument();
    expect(screen.getByText('Documents')).toBeInTheDocument();
  });

  it('renders the menu toggle button for mobile', () => {
    renderDashboard();
    // The mobile menu button is rendered (only visible on small screens via CSS)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });
});
