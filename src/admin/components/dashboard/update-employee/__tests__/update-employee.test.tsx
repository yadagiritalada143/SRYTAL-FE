import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

const mockOnSubmit = jest.fn();
const mockHandleBack = jest.fn();
const mockHandlePasswordReset = jest.fn();
const mockHandleDeleteEmployee = jest.fn();
const mockOpenDeleteModal = jest.fn();
const mockCloseDeleteModal = jest.fn();
const mockSetSubmitError = jest.fn();
const mockWatch = jest.fn();
let mockIsLoading = false;
let mockIsSubmitting = false;
let mockSubmitError: string | null = null;
let mockDeleteModalOpened = false;
let mockHookResult: any;

jest.mock('../useUpdateEmployee', () => ({
  useUpdateEmployee: () => mockHookResult
}));

jest.mock('../EmployeeSidebar', () => ({
  __esModule: true,
  default: (props: any) => (
    <aside>
      <div>{`${props.firstName} ${props.lastName}`}</div>
      <div>{props.email}</div>
      <button onClick={props.onPasswordReset}>Reset Password</button>
      <button onClick={props.onDelete}>Delete Employee</button>
    </aside>
  )
}));

const mockDeleteModalProps: any = {};

jest.mock('../DeleteEmployeeModal', () => ({
  __esModule: true,
  default: (props: any) => {
    Object.assign(mockDeleteModalProps, props);
    return null;
  }
}));

jest.mock('../sections/BasicInfoSection', () => ({
  __esModule: true,
  default: () => <section data-testid='basic-info-section' />
}));

jest.mock('../sections/PersonalDetailsSection', () => ({
  __esModule: true,
  default: () => <section data-testid='personal-details-section' />
}));

jest.mock('../sections/EmploymentDetailsSection', () => ({
  __esModule: true,
  default: () => <section data-testid='employment-details-section' />
}));

jest.mock('../sections/StatutoryDetailsSection', () => ({
  __esModule: true,
  default: () => <section data-testid='statutory-details-section' />
}));

jest.mock('../sections/BankDetailsSection', () => ({
  __esModule: true,
  default: () => <section data-testid='bank-details-section' />
}));

jest.mock('@components/common/page-header/PageHeader', () => ({
  __esModule: true,
  default: ({ title, subtitle, actions }: any) => (
    <div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <div>{actions}</div>
    </div>
  )
}));

jest.mock('@common/style-components/buttons', () => ({
  BackButton: () => null
}));

jest.mock('@components/common/loaders/DataView', () => ({
  __esModule: true,
  default: ({ children, isLoading, label }: any) => (
    <div>{isLoading ? `Loading ${label}` : children}</div>
  )
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

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#1c7ed6', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

import UpdateEmployee from '../update-employee';

const renderUpdateEmployee = () =>
  render(
    <MantineProvider>
      <UpdateEmployee />
    </MantineProvider>
  );

const installHookResult = () => {
  mockHookResult = {
    employeeId: 'emp1',
    form: {
      register: jest.fn(),
      control: {},
      watch: mockWatch,
      formState: { errors: {} }
    },
    onSubmit: mockOnSubmit,
    isLoading: mockIsLoading,
    isSubmitting: mockIsSubmitting,
    submitError: mockSubmitError,
    setSubmitError: mockSetSubmitError,
    deleteModal: {
      opened: mockDeleteModalOpened,
      open: mockOpenDeleteModal,
      close: mockCloseDeleteModal
    },
    confirmDelete: false,
    setConfirmDelete: jest.fn(),
    agreeTerms: false,
    setAgreeTerms: jest.fn(),
    options: {
      bloodGroupOptions: [],
      employmentTypeOptions: [],
      employmentRolesOptions: [],
      departmentOptions: []
    },
    handleDeleteEmployee: mockHandleDeleteEmployee,
    handlePasswordReset: mockHandlePasswordReset,
    handleBack: mockHandleBack
  };
};

describe('UpdateEmployee', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsLoading = false;
    mockIsSubmitting = false;
    mockSubmitError = null;
    mockDeleteModalOpened = false;
    deleteAllMockProps();
    mockWatch.mockImplementation(
      (key: string) =>
        (
          ({
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane@test.com',
            mobileNumber: '9876543210'
          }) as any
        )[key]
    );
    installHookResult();
  });

  it('renders the header, five sections, sidebar and action buttons', () => {
    renderUpdateEmployee();

    expect(
      screen.getByRole('heading', { name: 'Update Employee Profile' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Manage employee profile and employment details.')
    ).toBeInTheDocument();
    expect(screen.getByTestId('basic-info-section')).toBeInTheDocument();
    expect(screen.getByTestId('personal-details-section')).toBeInTheDocument();
    expect(
      screen.getByTestId('employment-details-section')
    ).toBeInTheDocument();
    expect(screen.getByTestId('statutory-details-section')).toBeInTheDocument();
    expect(screen.getByTestId('bank-details-section')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Update Employee' })
    ).toBeInTheDocument();
  });

  it('shows watched employee values in the sidebar and wires actions', () => {
    renderUpdateEmployee();

    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@test.com')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));
    expect(mockHandlePasswordReset).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Delete Employee' }));
    expect(mockOpenDeleteModal).toHaveBeenCalled();
  });

  it('submits the form when Update Employee is clicked', () => {
    const { container } = renderUpdateEmployee();

    const form = container.querySelector('form');
    expect(form).not.toBeNull();
    fireEvent.submit(form as HTMLElement);

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('shows the submitting state and disables the submit button', () => {
    mockIsSubmitting = true;
    installHookResult();
    renderUpdateEmployee();

    const submitButton = screen.getByRole('button', { name: 'Updating...' });
    expect(submitButton).toBeDisabled();
  });

  it('shows the submit error and closes the alert', () => {
    mockSubmitError = 'Invalid data';
    installHookResult();
    renderUpdateEmployee();

    expect(screen.getByText('Update Failed')).toBeInTheDocument();
    expect(screen.getByText('Invalid data')).toBeInTheDocument();

    fireEvent.click(within(screen.getByRole('alert')).getByRole('button'));
    expect(mockSetSubmitError).toHaveBeenCalledWith(null);
  });

  it('shows the loader while employee details are loading', () => {
    mockIsLoading = true;
    installHookResult();
    renderUpdateEmployee();

    expect(screen.getByText('Loading employee details')).toBeInTheDocument();
  });

  it('renders the delete modal with the current delete state', () => {
    mockDeleteModalOpened = true;
    installHookResult();
    renderUpdateEmployee();

    expect(mockDeleteModalProps.opened).toBe(true);
    expect(mockDeleteModalProps.onClose).toBe(mockCloseDeleteModal);
    expect(mockDeleteModalProps.onConfirm).toBe(mockHandleDeleteEmployee);
    expect(mockDeleteModalProps.setAgreeTerms).toBe(
      mockHookResult.setAgreeTerms
    );
    expect(mockDeleteModalProps.setConfirmDelete).toBe(
      mockHookResult.setConfirmDelete
    );
  });
});

// helper referenced only inside the module body (kept for clarity)
const deleteAllMockProps = () => {
  mockDeleteModalProps.opened = undefined;
  mockDeleteModalProps.onClose = undefined;
  mockDeleteModalProps.onConfirm = undefined;
  mockDeleteModalProps.agreeTerms = undefined;
  mockDeleteModalProps.setAgreeTerms = undefined;
  mockDeleteModalProps.confirmDelete = undefined;
  mockDeleteModalProps.setConfirmDelete = undefined;
};
