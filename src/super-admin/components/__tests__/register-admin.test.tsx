import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

jest.mock('@services/super-admin-services', () => ({
  getOrganizations: jest.fn(),
  registerAdmin: jest.fn()
}));
const getOrganizationsMock = () =>
  (jest.requireMock('@services/super-admin-services') as any)
    .getOrganizations as jest.Mock;

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
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

import RegisterAdminBySuperAdmin from '../regsiter-admin/register-admin';

const renderForm = () =>
  render(
    <MantineProvider>
      <BrowserRouter>
        <RegisterAdminBySuperAdmin />
      </BrowserRouter>
    </MantineProvider>
  );

describe('RegisterAdminBySuperAdmin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getOrganizationsMock().mockResolvedValue({
      organizations: [
        { organizationName: 'SRYTAL', id: 'org-1' },
        { organizationName: 'Acme Corp', id: 'org-2' }
      ]
    });
  });

  it('renders the form with all fields', async () => {
    renderForm();
    expect(screen.getByText('Register admin')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('Create Admin')).toBeInTheDocument();
  });

  it('calls getOrganizations on mount', async () => {
    renderForm();
    await waitFor(() => {
      expect(getOrganizationsMock()).toHaveBeenCalledTimes(1);
    });
  });

  it('shows validation errors on empty submit', async () => {
    renderForm();
    fireEvent.click(screen.getByText('Create Admin'));
    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument();
    });
  });
});
