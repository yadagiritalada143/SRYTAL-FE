import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

const mockGetOrganizations = jest.fn();
const mockGetAllEmployeeDetailsBySuperAdmin = jest.fn();
jest.mock('@services/super-admin-services', () => ({
  getOrganizations: (...args: any[]) => mockGetOrganizations(...args),
  getAllEmployeeDetailsBySuperAdmin: (...args: any[]) =>
    mockGetAllEmployeeDetailsBySuperAdmin(...args)
}));

const mockToastError = jest.fn();
jest.mock('react-toastify', () => ({
  toast: Object.assign((...args: any[]) => mockToastError(...args), {
    error: (...args: any[]) => mockToastError(...args)
  })
}));

jest.mock('@components/common/loaders/DataView', () => ({
  __esModule: true,
  default: ({ children, isLoading, isEmpty }: any) => (
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
  CommonButton: ({ children, disabled, type, ...rest }: any) => (
    <button
      disabled={disabled}
      type={type}
      {...rest}
      data-testid='common-button'
    >
      {children}
    </button>
  )
}));

import EmployeesForSuperadmin from '../employees/employee';

const selectOrg = async (orgName: string) => {
  const orgSelect = screen.getByPlaceholderText('Select organization');
  fireEvent.mouseDown(orgSelect);
  await waitFor(() => {
    expect(screen.getAllByText(new RegExp(orgName)).length).toBeGreaterThan(0);
  });
  fireEvent.click(screen.getAllByText(new RegExp(orgName))[0]);
};

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
    mockGetOrganizations.mockResolvedValue({
      organizations: [
        { organizationName: 'SRYTAL', id: 'org-1' },
        { organizationName: 'Acme Corp', id: 'org-2' }
      ]
    });
  });

  it('renders the search form', () => {
    renderEmployees();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Select organization')
    ).toBeInTheDocument();
  });

  it('calls getOrganizations on mount', async () => {
    renderEmployees();
    await waitFor(() => {
      expect(mockGetOrganizations).toHaveBeenCalledTimes(1);
    });
  });

  it('shows empty state initially', () => {
    renderEmployees();
    expect(screen.getByTestId('data-view')).toBeInTheDocument();
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  it('submits search and displays employee results', async () => {
    mockGetAllEmployeeDetailsBySuperAdmin.mockResolvedValueOnce([
      {
        id: 'emp-1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        mobileNumber: '1234567890',
        userRole: 'Employee',
        employmentType: { employmentType: 'Full-Time' },
        bloodGroup: { type: 'O+' },
        employeeRole: [{ _id: 'r1', designation: 'Developer' }]
      }
    ]);

    renderEmployees();

    await waitFor(() => {
      expect(mockGetOrganizations).toHaveBeenCalled();
    });

    await selectOrg('SRYTAL');

    fireEvent.click(screen.getByTestId('common-button'));

    await waitFor(() => {
      expect(mockGetAllEmployeeDetailsBySuperAdmin).toHaveBeenCalledWith(
        'org-1'
      );
    });

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });

  it('displays the table headers', async () => {
    mockGetAllEmployeeDetailsBySuperAdmin.mockResolvedValueOnce([
      {
        id: 'emp-1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        mobileNumber: '1234567890',
        userRole: 'Employee',
        employmentType: { employmentType: 'Full-Time' },
        bloodGroup: { type: 'O+' },
        employeeRole: [{ _id: 'r1', designation: 'Developer' }]
      }
    ]);

    renderEmployees();

    await waitFor(() => {
      expect(mockGetOrganizations).toHaveBeenCalled();
    });

    await selectOrg('SRYTAL');

    fireEvent.click(screen.getByTestId('common-button'));

    await waitFor(() => {
      expect(screen.getByText('First Name')).toBeInTheDocument();
      expect(screen.getByText('Last Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Mobile Number')).toBeInTheDocument();
      expect(screen.getByText('Role')).toBeInTheDocument();
      expect(screen.getByText('Employment Type')).toBeInTheDocument();
      expect(screen.getByText('Blood Group')).toBeInTheDocument();
      expect(screen.getByText('Employee Role')).toBeInTheDocument();
      expect(screen.getByText('Update Details')).toBeInTheDocument();
    });
  });

  it('shows error toast on fetch failure', async () => {
    mockGetAllEmployeeDetailsBySuperAdmin.mockRejectedValueOnce(
      new Error('fail')
    );

    renderEmployees();

    await waitFor(() => {
      expect(mockGetOrganizations).toHaveBeenCalled();
    });

    await selectOrg('SRYTAL');

    fireEvent.click(screen.getByTestId('common-button'));

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalled();
    });
  });

  it('shows error toast when organizations fetch fails', async () => {
    mockGetOrganizations.mockRejectedValueOnce('Network error');

    renderEmployees();

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalled();
    });
  });

  it('displays employee roles as a numbered list', async () => {
    mockGetAllEmployeeDetailsBySuperAdmin.mockResolvedValueOnce([
      {
        id: 'emp-1',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        mobileNumber: '0987654321',
        userRole: 'Recruiter',
        employmentType: { employmentType: 'Contract' },
        bloodGroup: { type: 'A+' },
        employeeRole: [
          { _id: 'r1', designation: 'Recruiter' },
          { _id: 'r2', designation: 'Interviewer' }
        ]
      }
    ]);

    renderEmployees();

    await waitFor(() => {
      expect(mockGetOrganizations).toHaveBeenCalled();
    });

    await selectOrg('SRYTAL');

    fireEvent.click(screen.getByTestId('common-button'));

    await waitFor(() => {
      expect(screen.getByText('1. Recruiter')).toBeInTheDocument();
      expect(screen.getByText('2. Interviewer')).toBeInTheDocument();
    });
  });

  it('shows empty state when no employees found', async () => {
    mockGetAllEmployeeDetailsBySuperAdmin.mockResolvedValueOnce([]);

    renderEmployees();

    await waitFor(() => {
      expect(mockGetOrganizations).toHaveBeenCalled();
    });

    await selectOrg('SRYTAL');

    fireEvent.click(screen.getByTestId('common-button'));

    await waitFor(() => {
      expect(mockGetAllEmployeeDetailsBySuperAdmin).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    });
  });
});
