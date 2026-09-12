import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import type { ReactNode } from 'react';

let mockSelectedPackages: string[] = [];
const mockReset = jest.fn();
const mockFieldOnChange = jest.fn();
const mockFieldOnBlur = jest.fn();
const mockGetAllPackagesByAdmin = jest.fn();
const mockGetEmployeePackagesByAdmin = jest.fn();
const mockAddPackageToEmployee = jest.fn();
const mockFormatSubmitData = jest.fn();
const mockFetchInitialData = jest.fn();
const mockLoadEmployeePackages = jest.fn();
const mockGetEmployeeInfoItems = jest.fn();
const mockToastError = jest.fn();
const mockToastSuccess = jest.fn();
const mockToastWarning = jest.fn();
let mockPackagesTaskTableProps: any = {};
let mockMultiSelectProps: any = {};
let mockSetSelectedPackagesData: any;

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    control: {},
    watch: () => mockSelectedPackages,
    reset: mockReset,
    formState: { errors: {}, isSubmitting: false, isDirty: false }
  }),
  Controller: ({ render }: any) =>
    render({
      field: {
        value: mockSelectedPackages,
        onChange: mockFieldOnChange,
        onBlur: mockFieldOnBlur,
        name: 'packagesInfo'
      }
    })
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false
}));

jest.mock('@mantine/core', () => {
  const actual = jest.requireActual('@mantine/core');
  return {
    ...actual,
    MultiSelect: (props: any) => {
      mockMultiSelectProps = props;
      return (
        <div data-testid='multi-select'>
          <label>{props.label}</label>
        </div>
      );
    }
  };
});

jest.mock('react-toastify', () => ({
  toast: {
    error: (...args: any[]) => mockToastError(...args),
    success: (...args: any[]) => mockToastSuccess(...args),
    warning: (...args: any[]) => mockToastWarning(...args)
  }
}));

const mockSetEmployeeDetails = jest.fn();

const mockTheme = {
  themeConfig: {
    color: '#212529',
    backgroundColor: '#ffffff',
    borderColor: '#dee2e6',
    button: { color: '#1c7ed6', textColor: '#ffffff' }
  },
  isDarkTheme: false,
  organizationConfig: { organization_name: 'srytal' }
};

jest.mock('recoil', () => {
  const actual = jest.requireActual('recoil');
  return {
    ...actual,
    useRecoilState: () => [null, mockSetEmployeeDetails]
  };
});

jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: () => () => ({ values: {}, errors: {} })
}));

jest.mock('@services/admin-services', () => ({
  getAllPackagesByAdmin: (...args: any[]) => mockGetAllPackagesByAdmin(...args),
  getEmployeePackagesByAdmin: (...args: any[]) =>
    mockGetEmployeePackagesByAdmin(...args),
  addPackagetoEmployeeByAdmin: (...args: any[]) =>
    mockAddPackageToEmployee(...args)
}));

jest.mock('../helper-functions/add-package', () => ({
  fetchInitialData: (...args: any[]) => mockFetchInitialData(...args),
  loadEmployeePackages: (...args: any[]) => mockLoadEmployeePackages(...args),
  formatSubmitData: (...args: any[]) => mockFormatSubmitData(...args),
  getEmployeeInfoItems: (...args: any[]) => mockGetEmployeeInfoItems(...args)
}));

jest.mock('@UI/Models/base-model', () => ({
  StandardModal: ({ opened, title, children, onClose }: any) =>
    opened ? (
      <div data-testid='standard-modal' role='dialog'>
        <div>{title}</div>
        {children}
        <button onClick={onClose}>modal-close</button>
      </div>
    ) : null
}));

jest.mock('@UI/Theme-background/background', () => ({
  ThemeBackground: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  )
}));

jest.mock('@common/style-components/buttons', () => ({
  BackButton: () => null
}));

jest.mock('@components/common/button/CommonButton', () => ({
  __esModule: true,
  CommonButton: (props: any) => (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}));

jest.mock('@components/common/loaders/DataView', () => ({
  __esModule: true,
  default: ({ children, isLoading, label }: any) => (
    <div>{isLoading ? `Loading ${label}` : children}</div>
  )
}));

jest.mock('../table-tasks', () => ({
  __esModule: true,
  default: (props: any) => {
    mockPackagesTaskTableProps = props;
    return <div data-testid='packages-table' />;
  }
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => mockTheme
}));

jest.mock('@forms/update-employee');

import PackagesFormComponent from '../add-package';

const mockPackage = {
  _id: 'pkg1',
  title: 'Onboarding',
  endDate: '2099-12-31T00:00:00.000Z',
  tasks: [{ _id: 't1', title: 'Intro' }]
};

const mockFormattedData = {
  employeeId: 'emp1',
  packages: [
    {
      packageId: 'pkg1',
      title: 'Onboarding',
      tasks: [{ taskId: 't1', title: 'Intro' }]
    }
  ]
};

const mockUpdatedData = {
  employeeId: 'emp1',
  packages: [
    {
      packageId: 'pkg1',
      title: 'Onboarding',
      tasks: [{ taskId: 't1', title: 'Intro' }]
    }
  ]
};

const mockEmployeeDetails = { firstName: 'Jane', lastName: 'Doe' };

const mockInfoItems = [
  { label: 'Name', value: 'Jane Doe' },
  { label: 'Email', value: 'jane@test.com' },
  { label: 'Phone', value: '9876543210' },
  { label: 'Join Date', value: '01-Jan-2024' },
  { label: 'Role', value: 'Engineer' }
];

const renderAddPackage = () =>
  render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter>
          <PackagesFormComponent
            employeeId='emp1'
            organizationConfig={mockTheme.organizationConfig as any}
          />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );

describe('PackagesFormComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSelectedPackages = [];
    mockPackagesTaskTableProps = {};
    mockMultiSelectProps = {};
    mockSetSelectedPackagesData = undefined;
    mockGetAllPackagesByAdmin.mockResolvedValue([mockPackage]);
    mockGetEmployeePackagesByAdmin.mockResolvedValue(mockUpdatedData);
    mockAddPackageToEmployee.mockResolvedValue({});
    mockFetchInitialData.mockImplementation((_id: string, setDetails: any) => {
      setDetails(mockEmployeeDetails);
      return Promise.resolve();
    });
    mockLoadEmployeePackages.mockImplementation(
      (_id: string, _reset: any, setSelectedPackagesData: any) => {
        mockSetSelectedPackagesData = setSelectedPackagesData;
        return Promise.resolve();
      }
    );
    mockFormatSubmitData.mockReturnValue(mockFormattedData);
    mockGetEmployeeInfoItems.mockReturnValue(mockInfoItems);
  });

  it('loads options, employee info and employee packages on mount', async () => {
    renderAddPackage();

    expect(await screen.findByText('Package Assignment')).toBeInTheDocument();
    expect(mockGetAllPackagesByAdmin).toHaveBeenCalled();
    expect(mockFetchInitialData).toHaveBeenCalledTimes(1);
    expect(mockLoadEmployeePackages).toHaveBeenCalledTimes(1);

    expect(screen.getByText('Employee Information')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@test.com')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });

  it('disables the Next button and keeps the modal closed with no packages selected', async () => {
    renderAddPackage();

    await screen.findByText('Package Assignment');

    const nextButton = screen.getByRole('button', {
      name: 'Next: Select Tasks'
    });
    expect(nextButton).toBeDisabled();

    fireEvent.click(nextButton);
    expect(screen.queryByTestId('standard-modal')).not.toBeInTheDocument();
  });

  it('shows the title instead of the id for an assigned expired package', async () => {
    renderAddPackage();

    await screen.findByText('Package Assignment');

    expect(mockSetSelectedPackagesData).toBeDefined();

    act(() =>
      mockSetSelectedPackagesData({
        employeeId: 'emp1',
        packages: [
          { packageId: 'pkgExpired', title: 'Legacy Training' },
          { packageId: 'pkg1', title: 'Onboarding' }
        ]
      })
    );

    expect(mockMultiSelectProps.data).toContainEqual({
      value: 'pkgExpired',
      label: 'Legacy Training',
      disabled: true
    });
    expect(mockMultiSelectProps.data).toContainEqual({
      value: 'pkg1',
      label: 'Onboarding'
    });
  });

  it('shows the title for an expired package passed as the raw API array shape', async () => {
    renderAddPackage();

    await screen.findByText('Package Assignment');

    expect(mockSetSelectedPackagesData).toBeDefined();

    act(() =>
      mockSetSelectedPackagesData([
        {
          packageId: {
            _id: 'pkgExpired',
            title: 'March Testing Package'
          },
          tasks: []
        }
      ])
    );

    expect(mockMultiSelectProps.data).toContainEqual({
      value: 'pkgExpired',
      label: 'March Testing Package',
      disabled: true
    });
  });

  it('selects tasks and saves the package assignment', async () => {
    mockSelectedPackages = ['pkg1'];
    renderAddPackage();

    await screen.findByText('Package Assignment');

    const nextButton = screen.getByRole('button', {
      name: 'Next: Select Tasks'
    });
    expect(nextButton).toBeEnabled();

    await act(async () => {
      fireEvent.click(nextButton);
    });

    expect(screen.getByTestId('standard-modal')).toBeInTheDocument();
    expect(screen.getByText('Select Tasks for Packages')).toBeInTheDocument();

    const saveButton = screen.getByRole('button', { name: 'Save Changes' });
    expect(saveButton).toBeDisabled();

    const introCheckbox = screen.getByRole('checkbox', { name: 'Intro' });
    await act(async () => {
      fireEvent.click(introCheckbox);
    });

    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeEnabled();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));
    });

    await waitFor(() =>
      expect(mockAddPackageToEmployee).toHaveBeenCalledTimes(1)
    );

    expect(mockFormatSubmitData).toHaveBeenCalledWith(
      ['pkg1'],
      expect.anything(),
      expect.anything(),
      'emp1'
    );
    expect(mockAddPackageToEmployee).toHaveBeenCalledWith(mockFormattedData);
    expect(mockToastSuccess).toHaveBeenCalledWith(
      'Packages and tasks updated successfully!',
      expect.anything()
    );
    expect(mockGetEmployeePackagesByAdmin).toHaveBeenCalledWith('emp1');
    expect(screen.queryByTestId('standard-modal')).not.toBeInTheDocument();
    expect(screen.getByTestId('packages-table')).toBeInTheDocument();
    expect(mockPackagesTaskTableProps.selectedPackagesData).toEqual(
      mockUpdatedData
    );
  });

  it('cancels the task selection modal', async () => {
    mockSelectedPackages = ['pkg1'];
    renderAddPackage();

    await screen.findByText('Package Assignment');

    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: 'Next: Select Tasks' })
      );
    });

    expect(screen.getByTestId('standard-modal')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    });

    expect(screen.queryByTestId('standard-modal')).not.toBeInTheDocument();
  });

  it('shows an error alert and toasts when the save fails', async () => {
    mockSelectedPackages = ['pkg1'];
    mockAddPackageToEmployee.mockRejectedValue({
      response: { data: { message: 'Nope' } }
    });
    renderAddPackage();

    await screen.findByText('Package Assignment');

    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: 'Next: Select Tasks' })
      );
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('checkbox', { name: 'Intro' }));
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));
    });

    await waitFor(() =>
      expect(mockToastError).toHaveBeenCalledWith('Nope', expect.anything())
    );
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Nope')).toBeInTheDocument();
  });

  it('toasts when the package options fail to load', async () => {
    mockGetAllPackagesByAdmin.mockRejectedValue({ message: 'packages failed' });
    renderAddPackage();

    await waitFor(() =>
      expect(mockToastError).toHaveBeenCalledWith(
        'packages failed',
        expect.anything()
      )
    );
  });

  it('toasts and shows an alert when initial employee data fails to load', async () => {
    mockFetchInitialData.mockRejectedValue(new Error('initial failed'));
    renderAddPackage();

    await waitFor(() =>
      expect(mockToastError).toHaveBeenCalledWith(
        'initial failed',
        expect.anything()
      )
    );
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('initial failed')).toBeInTheDocument();
  });

  it('toasts when the initial employee packages fail to load', async () => {
    mockLoadEmployeePackages.mockRejectedValue({
      message: 'employee packages failed'
    });
    renderAddPackage();

    await waitFor(() =>
      expect(mockToastError).toHaveBeenCalledWith(
        'employee packages failed',
        expect.anything()
      )
    );
  });
});
