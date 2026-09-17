import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { IconUser, IconUsers, IconFile3d } from '@tabler/icons-react';
import SuperAdminNavbar from '../nav-bar/nav-bar';

const mockToggleDrawer = jest.fn();

const mockNavLinks = [
  { url: 'dashboard/register-admin', icon: IconUser, name: 'Register Admin' },
  { url: 'dashboard/employees', icon: IconUsers, name: 'Manage Employees' },
  { url: 'dashboard/documents', icon: IconFile3d, name: 'Documents' }
];

const renderNavbar = (props = {}) => {
  return render(
    <BrowserRouter>
      <SuperAdminNavbar
        navLinks={mockNavLinks}
        isDrawerOpen={false}
        toggleDrawer={mockToggleDrawer}
        {...props}
      />
    </BrowserRouter>
  );
};

describe('SuperAdminNavbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all nav links', () => {
    renderNavbar();
    expect(screen.getByText('Register Admin')).toBeInTheDocument();
    expect(screen.getByText('Manage Employees')).toBeInTheDocument();
    expect(screen.getByText('Documents')).toBeInTheDocument();
  });

  it('renders "Dashboard" heading', () => {
    renderNavbar();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('calls toggleDrawer when close button is clicked', () => {
    renderNavbar({ isDrawerOpen: true });
    const closeButton = screen.getAllByRole('button')[0];
    fireEvent.click(closeButton);
    expect(mockToggleDrawer).toHaveBeenCalledTimes(1);
  });
});
