import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot, MutableSnapshot } from 'recoil';
import { userDetailsAtom } from '@atoms/user';
import { sidebarCollapsedAtom } from '@atoms/sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockOpen = jest.fn();
const mockClose = jest.fn();
let mockPasswordResetRequired: string | undefined;

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useDisclosure: () => [false, { open: mockOpen, close: mockClose }]
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('@hooks/queries/useNavQueries', () => ({
  useGetMyNavMenu: () => ({
    data: { menu: [{ id: '1', label: 'Dashboard', url: '/dashboard' }] },
    isLoading: false
  })
}));

jest.mock('@components/UI/navbar/Sidebar', () => (props: any) => (
  <div data-testid='sidebar' data-menu={JSON.stringify(props.menu)}>
    Sidebar
  </div>
));

jest.mock('@components/UI/Models/updatePassword', () => ({
  ChangePasswordPopup: (props: any) => (
    <div data-testid='change-password-popup'>
      ChangePasswordPopup
    </div>
  )
}));

jest.mock('@components/UI/Theme-background/background', () => ({
  ThemeBackground: ({ children, ...props }: any) => (
    <div data-testid='theme-background' {...props}>
      {children}
    </div>
  )
}));

const UserDashboard = require('../dashboard').default;

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } }
});

const renderDashboard = (userOverrides: any = {}) => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(userDetailsAtom, {
      passwordResetRequired: mockPasswordResetRequired,
      ...userOverrides
    } as any);
    set(sidebarCollapsedAtom, false);
  };

  return render(
    <RecoilRoot initializeState={initializeState}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true
            }}
          >
            <UserDashboard />
          </BrowserRouter>
        </MantineProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

describe('UserDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPasswordResetRequired = undefined;
  });

  it('renders the sidebar', () => {
    renderDashboard();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('renders the theme background wrapper', () => {
    renderDashboard();
    expect(screen.getByTestId('theme-background')).toBeInTheDocument();
  });

  it('passes menu data to the sidebar', () => {
    renderDashboard();
    const sidebar = screen.getByTestId('sidebar');
    const menu = JSON.parse(sidebar.getAttribute('data-menu') || '[]');
    expect(menu).toHaveLength(1);
    expect(menu[0].label).toBe('Dashboard');
  });

  it('opens password popup when passwordResetRequired is "true"', () => {
    mockPasswordResetRequired = 'true';
    renderDashboard();
    expect(mockOpen).toHaveBeenCalled();
  });

  it('does not open password popup when passwordResetRequired is not set', () => {
    mockPasswordResetRequired = undefined;
    renderDashboard();
    expect(mockOpen).not.toHaveBeenCalled();
  });

  it('does not open password popup when passwordResetRequired is "false"', () => {
    mockPasswordResetRequired = 'false';
    renderDashboard();
    expect(mockOpen).not.toHaveBeenCalled();
  });

  it('renders the change password popup component', () => {
    renderDashboard();
    expect(screen.getByTestId('change-password-popup')).toBeInTheDocument();
  });
});
