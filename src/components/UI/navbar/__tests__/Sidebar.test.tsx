import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot, MutableSnapshot } from 'recoil';
import { sidebarCollapsedAtom } from '@atoms/sidebar';
import SidebarMenu, { type SidebarMenuNode } from '../Sidebar';

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

jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: jest.fn(),
    showErrorToast: jest.fn()
  })
}));

jest.mock('@services/user-services', () => ({
  logoutUser: jest.fn()
}));

const mockNavigate = jest.fn();
const mockLocation = { pathname: '/srytal/dashboard' };

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation
}));

jest.mock('../iconMap', () => ({
  resolveIcon: () => () => <span data-testid='mock-icon' />
}));

jest.mock('../../Buttons/buttons', () => ({
  LogoutButton: ({ handleLogout }: any) => (
    <button data-testid='logout-button' onClick={handleLogout}>
      Logout
    </button>
  )
}));

jest.mock('../OrgLogo', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid='org-logo'>{props.name}</div>
}));

jest.mock('../Sidebar.module.css', () => ({
  sidebar: 'sidebar',
  header: 'header',
  nav: 'nav',
  footer: 'footer',
  hamburger: 'hamburger',
  desktopOpen: 'desktopOpen',
  collapseBtn: 'collapseBtn',
  backdrop: 'backdrop',
  mobilePanel: 'mobilePanel',
  closeBtn: 'closeBtn',
  desktopOnly: 'desktopOnly'
}));

const defaultOrgConfig = {
  organization_name: 'srytal',
  organization_theme: { logo: 'logo.png' }
} as any;

const defaultMenu = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    url: 'dashboard',
    icon: 'IconLayoutDashboard',
    isSystem: true
  },
  {
    key: 'employees',
    label: 'Employees',
    url: 'employees',
    icon: 'IconUsers'
  }
];

const menuWithChildren = [
  {
    key: 'reports',
    label: 'Reports',
    icon: 'IconReport',
    children: [
      {
        key: 'report1',
        label: 'Payroll',
        url: 'reports/payroll',
        icon: 'IconReportMoney'
      },
      {
        key: 'report2',
        label: 'Timesheet',
        url: 'reports/timesheet',
        icon: 'IconCalendarTime'
      }
    ]
  }
];

const renderSidebar = (
  menu: SidebarMenuNode[] = defaultMenu,
  collapsed = false,
  isLoading = false
) => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(sidebarCollapsedAtom, collapsed);
  };

  return render(
    <RecoilRoot initializeState={initializeState}>
      <MantineProvider>
        <BrowserRouter>
          <SidebarMenu
            menu={menu}
            organizationConfig={defaultOrgConfig}
            isLoading={isLoading}
          />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

describe('Sidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the org logo', () => {
    renderSidebar();
    expect(screen.getByTestId('org-logo')).toBeInTheDocument();
  });

  it('renders nav items from the menu', () => {
    renderSidebar();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Employees')).toBeInTheDocument();
  });

  it('renders the logout button', () => {
    renderSidebar();
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
  });

  it('renders the sign out label', () => {
    renderSidebar();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('renders loading skeletons when isLoading is true', () => {
    renderSidebar(defaultMenu, false, true);
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('highlights the active nav item based on current path', () => {
    mockLocation.pathname = '/srytal/dashboard';
    renderSidebar();
    const dashboardBtn = screen.getByText('Dashboard').closest('button');
    expect(dashboardBtn).toHaveAttribute('aria-current', 'page');
  });

  it('does not highlight non-active nav items', () => {
    mockLocation.pathname = '/srytal/dashboard';
    renderSidebar();
    const employeesBtn = screen.getByText('Employees').closest('button');
    expect(employeesBtn).not.toHaveAttribute('aria-current', 'page');
  });

  it('navigates when a nav item is clicked', () => {
    mockLocation.pathname = '/srytal/other';
    renderSidebar();
    fireEvent.click(screen.getByText('Employees'));
    expect(mockNavigate).toHaveBeenCalledWith('/srytal/employees');
  });

  it('toggles expanded state for parent nodes with children', () => {
    mockLocation.pathname = '/srytal/other';
    renderSidebar(menuWithChildren);
    const reportsBtn = screen.getByText('Reports').closest('button');
    expect(reportsBtn).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(screen.getByText('Reports'));
    expect(reportsBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Payroll')).toBeInTheDocument();
    expect(screen.getByText('Timesheet')).toBeInTheDocument();
  });

  it('navigates to child item URL when child is clicked', () => {
    mockLocation.pathname = '/srytal/other';
    renderSidebar(menuWithChildren);
    fireEvent.click(screen.getByText('Reports'));
    fireEvent.click(screen.getByText('Payroll'));
    expect(mockNavigate).toHaveBeenCalledWith('/srytal/reports/payroll');
  });

  it('collapses children when parent is clicked again', () => {
    mockLocation.pathname = '/srytal/other';
    renderSidebar(menuWithChildren);
    const reportsBtn = screen.getByText('Reports').closest('button');
    fireEvent.click(screen.getByText('Reports'));
    expect(reportsBtn).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(screen.getByText('Reports'));
    expect(reportsBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders the hamburger button for mobile', () => {
    renderSidebar();
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('opens mobile drawer when hamburger is clicked', () => {
    renderSidebar();
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    expect(screen.getAllByText('Sign out').length).toBeGreaterThanOrEqual(1);
  });

  it('closes mobile drawer when close button is clicked', () => {
    renderSidebar();
    fireEvent.click(screen.getByLabelText('Open menu'));
    fireEvent.click(screen.getByLabelText('Close menu'));
    expect(screen.queryByLabelText('Close menu')).not.toBeInTheDocument();
  });

  it('shows the desktop sidebar when not collapsed', () => {
    renderSidebar(defaultMenu, false);
    expect(screen.getByLabelText('Collapse sidebar')).toBeInTheDocument();
  });

  it('shows the desktop reopen button when collapsed', () => {
    renderSidebar(defaultMenu, true);
    expect(screen.getByLabelText('Open sidebar')).toBeInTheDocument();
  });

  it('expands the sidebar when the reopen button is clicked', () => {
    renderSidebar(defaultMenu, true);
    fireEvent.click(screen.getByLabelText('Open sidebar'));
    expect(screen.queryByLabelText('Open sidebar')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Collapse sidebar')).toBeInTheDocument();
  });
});
