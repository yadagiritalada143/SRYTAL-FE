import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      button: { color: '#495057' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/srytal/admin/settings/menu-access' }),
  Outlet: () => <div data-testid='outlet'>Outlet content</div>
}));

import SettingsLayout from '../SettingsLayout';

describe('SettingsLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderLayout = () => {
    return render(
      <MantineProvider>
        <BrowserRouter>
          <SettingsLayout />
        </BrowserRouter>
      </MantineProvider>
    );
  };

  it('renders all the settings tabs', () => {
    renderLayout();
    expect(screen.getByText('Blood Groups')).toBeInTheDocument();
    expect(screen.getByText('Employment Types')).toBeInTheDocument();
    expect(screen.getByText('Employment Roles')).toBeInTheDocument();
    expect(screen.getByText('Departments')).toBeInTheDocument();
    expect(screen.getByText('Feedback Attributes')).toBeInTheDocument();
    expect(screen.getByText('Menu Access')).toBeInTheDocument();
  });

  it('marks the current tab as active based on the location path', () => {
    renderLayout();
    const activeTab = screen.getByRole('tab', { name: /Menu Access/ });
    expect(activeTab).toHaveAttribute('data-active', 'true');
  });

  it('navigates to the clicked tab', () => {
    renderLayout();
    fireEvent.click(screen.getByRole('tab', { name: /Feedback Attributes/ }));
    expect(mockNavigate).toHaveBeenCalledWith('feedback');
  });

  it('renders the outlet content', () => {
    renderLayout();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });
});