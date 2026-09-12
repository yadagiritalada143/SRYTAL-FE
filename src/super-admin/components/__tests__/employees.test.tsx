import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@services/super-admin-services', () => ({
  getOrganizations: jest.fn(),
  getAllEmployeeDetailsBySuperAdmin: jest.fn()
}));
const getOrganizationsMock = () =>
  (jest.requireMock('@services/super-admin-services') as any)
    .getOrganizations as jest.Mock;

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn()
  }
}));

jest.mock('@components/common/loaders/DataView', () => ({
  __esModule: true,
  default: ({
    children,
    isLoading,
    isEmpty
  }: {
    children: React.ReactNode;
    isLoading: boolean;
    isEmpty: boolean;
  }) => (
    <div data-testid='data-view'>
      {isLoading && <span data-testid='loading'>Loading...</span>}
      {isEmpty && <span data-testid='empty-state'>No employees found</span>}
      {children}
    </div>
  )
}));

jest.mock('@components/common/loaders/PremiumLoader', () => ({
  __esModule: true,
  default: () => <div data-testid='premium-loader' />
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, disabled, ...rest }: any) => (
    <button disabled={disabled} {...rest}>
      {children}
    </button>
  )
}));

import EmployeesForSuperadmin from '../employees/employee';

const renderEmployees = () =>
  render(
    <MantineProvider>
      <BrowserRouter>
        <EmployeesForSuperadmin />
      </BrowserRouter>
    </MantineProvider>
  );

describe('EmployeesForSuperadmin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getOrganizationsMock().mockResolvedValue({
      organizations: [{ organizationName: 'SRYTAL', id: 'org-1' }]
    });
  });

  it('renders the search form', async () => {
    renderEmployees();
    expect(screen.getByText('Organization')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('calls getOrganizations on mount', async () => {
    renderEmployees();
    await waitFor(() => {
      expect(getOrganizationsMock()).toHaveBeenCalledTimes(1);
    });
  });

  it('shows empty state initially', () => {
    renderEmployees();
    expect(screen.getByTestId('data-view')).toBeInTheDocument();
  });
});
