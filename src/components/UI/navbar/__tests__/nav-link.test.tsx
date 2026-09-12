import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#1971c2',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#1971c2', textColor: '#ffffff' },
      headerBackgroundColor: '#f8f9fa',
      linkColor: '#1971c2'
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

const mockNavigate = jest.fn();
const mockLocation = { pathname: '/srytal/dashboard' };

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation
}));

import { NavbarLink } from '../nav-link';

const MockIcon = (props: any) => <span data-testid='icon'>{props.size}</span>;

const defaultOrganization = {
  organization_name: 'srytal',
  organization_theme: { logo: '' }
} as any;

const defaultProps = {
  icon: MockIcon,
  name: 'Dashboard',
  url: 'dashboard',
  organization: defaultOrganization,
  isActive: false,
  setIsDrawerOpen: jest.fn(),
  role: 'Employee'
};

const renderNavLink = (props: Partial<typeof defaultProps> = {}) => {
  return render(
    <MantineProvider>
      <BrowserRouter>
        <NavbarLink {...defaultProps} {...props} />
      </BrowserRouter>
    </MantineProvider>
  );
};

describe('NavbarLink', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the link with the name', () => {
    renderNavLink();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    renderNavLink();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('navigates when clicked (leaf link)', () => {
    renderNavLink();
    fireEvent.click(screen.getByText('Dashboard'));
    expect(mockNavigate).toHaveBeenCalledWith('/srytal/dashboard', { replace: false });
  });

  it('calls setIsDrawerOpen when clicked', () => {
    const setIsDrawerOpen = jest.fn();
    renderNavLink({ setIsDrawerOpen });
    fireEvent.click(screen.getByText('Dashboard'));
    expect(setIsDrawerOpen).toHaveBeenCalled();
  });

  it('calls onClick callback when provided', () => {
    const onClick = jest.fn();
    renderNavLink({ onClick });
    fireEvent.click(screen.getByText('Dashboard'));
    expect(onClick).toHaveBeenCalled();
  });

  it('sets aria-current page when isActive is true', () => {
    renderNavLink({ isActive: true });
    const btn = screen.getByRole('menuitem');
    expect(btn).toHaveAttribute('aria-current', 'page');
  });

  it('does not set aria-current when isActive is false', () => {
    renderNavLink({ isActive: false });
    const btn = screen.getByRole('menuitem');
    expect(btn).not.toHaveAttribute('aria-current', 'page');
  });

  it('sets data-active when isActive is true', () => {
    renderNavLink({ isActive: true });
    const btn = screen.getByRole('menuitem');
    expect(btn).toHaveAttribute('data-active', 'true');
  });

  it('does not set data-active when isActive is false', () => {
    renderNavLink({ isActive: false });
    const btn = screen.getByRole('menuitem');
    expect(btn).not.toHaveAttribute('data-active');
  });

  it('renders chevron when children are provided', () => {
    renderNavLink({
      children: [
        { name: 'Sub Item 1', url: 'sub1' },
        { name: 'Sub Item 2', url: 'sub2' }
      ]
    });
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('expands children when clicked and has children', () => {
    mockLocation.pathname = '/srytal/other';
    renderNavLink({
      children: [
        { name: 'Sub Item 1', url: 'sub1' },
        { name: 'Sub Item 2', url: 'sub2' }
      ]
    });
    fireEvent.click(screen.getByText('Dashboard'));
    expect(screen.getByText('Sub Item 1')).toBeInTheDocument();
    expect(screen.getByText('Sub Item 2')).toBeInTheDocument();
  });

  it('navigates to child URL when child is clicked', () => {
    mockLocation.pathname = '/srytal/other';
    renderNavLink({
      children: [
        { name: 'Sub Item 1', url: 'sub1' }
      ]
    });
    fireEvent.click(screen.getByText('Dashboard'));
    fireEvent.click(screen.getByText('Sub Item 1'));
    expect(mockNavigate).toHaveBeenCalledWith('/srytal/sub1', { replace: false });
  });

  it('auto-expands when a child is active', () => {
    mockLocation.pathname = '/srytal/sub1';
    renderNavLink({
      children: [
        { name: 'Sub Item 1', url: 'sub1' }
      ]
    });
    expect(screen.getByText('Sub Item 1')).toBeInTheDocument();
  });

  it('does not navigate when clicked without a url', () => {
    renderNavLink({ url: undefined });
    fireEvent.click(screen.getByText('Dashboard'));
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('does not call onClick when there are children', () => {
    const onClick = jest.fn();
    renderNavLink({
      onClick,
      children: [{ name: 'Sub', url: 'sub' }]
    });
    fireEvent.click(screen.getByText('Dashboard'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
