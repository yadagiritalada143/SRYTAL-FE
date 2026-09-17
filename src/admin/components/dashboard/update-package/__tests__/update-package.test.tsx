import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

let mockFormValues: any = {};

const mockNavigate = jest.fn();
const mockRegister = jest.fn().mockImplementation((name: string) => ({
  name,
  onChange: jest.fn()
}));
const mockReset = jest.fn();
const mockControllerChange = jest.fn();
const mockGetPackageDetails = jest.fn();
const mockGetAllEmployees = jest.fn();
const mockUpdatePackage = jest.fn();
const mockDeletePackage = jest.fn();
const mockShowSuccessToast = jest.fn();
const mockToastError = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ packageId: 'pkg1' })
}));

jest.mock('@atoms/user', () => {
  const { atom } = jest.requireActual('recoil');
  return {
    userDetailsAtom: atom({ key: 'test-user-details', default: {} })
  };
});

jest.mock('@services/admin-services', () => ({
  getPackageDetailsByAdmin: (...args: any[]) => mockGetPackageDetails(...args),
  getAllEmployeeDetailsByAdmin: (...args: any[]) => mockGetAllEmployees(...args)
}));

jest.mock('@hooks/mutations/useAdminMutations', () => ({
  useUpdatePackageByAdmin: () => ({
    mutateAsync: mockUpdatePackage,
    isPending: false
  }),
  useDeletePackageByAdmin: () => ({
    mutateAsync: mockDeletePackage,
    isPending: false
  })
}));

jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: mockShowSuccessToast,
    showErrorToast: jest.fn()
  })
}));

jest.mock('react-toastify', () => ({
  toast: { error: (...args: any[]) => mockToastError(...args) }
}));

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: mockRegister,
    handleSubmit: (cb: any) => (e: any) => {
      e?.preventDefault?.();
      cb(mockFormValues);
    },
    formState: { errors: {} },
    control: {},
    reset: mockReset
  }),
  Controller: ({ render }: any) =>
    render({
      field: {
        value: undefined,
        onChange: mockControllerChange,
        onBlur: jest.fn(),
        ref: jest.fn()
      },
      fieldState: {},
      formState: {}
    })
}));

jest.mock('@mantine/dates', () => ({
  DateInput: ({ label, onChange }: any) => (
    <input
      data-testid='date-input'
      placeholder={`${label} picker`}
      onChange={e => onChange(new Date(e.target.value))}
    />
  )
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      dangerColor: '#e03131',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('@common/style-components/buttons', () => ({
  BackButton: () => <div data-testid='back-button'>Back</div>
}));

jest.mock('@components/common/loaders/DataView', () => (props: any) => (
  <div data-testid='data-view'>
    {props.isLoading && <span>loading</span>}
    {props.children}
  </div>
));

jest.mock('../delete-models', () => ({
  DeletePackageModel: ({ opened, handleDeletePackage, close }: any) =>
    opened ? (
      <div data-testid='delete-package-model'>
        <button type='button' onClick={() => handleDeletePackage(true)}>
          confirm-delete
        </button>
        <button type='button' onClick={close}>
          modal-close
        </button>
      </div>
    ) : null
}));

jest.mock('../add-tasks', () => ({
  __esModule: true,
  default: () => <div data-testid='add-tasks'>Add tasks</div>
}));

jest.mock('../tasks', () => ({
  __esModule: true,
  default: () => <div data-testid='package-tasks'>Package tasks</div>
}));

import UpdatePackage from '../update-package';

const renderUpdatePackage = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <UpdatePackage />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const mockPackage = {
  _id: 'pkg1',
  title: 'Onboarding',
  description: 'Intro package',
  approvers: [{ _id: 'emp1' }],
  startDate: '2024-01-01T00:00:00.000Z',
  endDate: null,
  tasks: [{ _id: 't1', title: 'Intro' }]
};

describe('UpdatePackage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFormValues = { title: 'Onboarding', description: 'Intro package' };
    mockGetPackageDetails.mockResolvedValue(mockPackage);
    mockGetAllEmployees.mockResolvedValue([
      { id: 'emp1', firstName: 'Jane', lastName: 'Doe' },
      { id: 'emp2', firstName: 'John', lastName: 'Smith' }
    ]);
    mockUpdatePackage.mockResolvedValue({});
    mockDeletePackage.mockResolvedValue({});
  });

  it('renders the page title and child components', async () => {
    renderUpdatePackage();

    expect(screen.getByText('Update Package')).toBeInTheDocument();
    expect(await screen.findByTestId('add-tasks')).toBeInTheDocument();
    expect(screen.getByTestId('package-tasks')).toBeInTheDocument();
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
  });

  it('loads package details and approvers on mount', async () => {
    renderUpdatePackage();

    await act(async () => {});

    expect(mockGetPackageDetails).toHaveBeenCalledWith('pkg1');
    expect(mockGetAllEmployees).toHaveBeenCalled();

    expect(mockReset).toHaveBeenCalledWith({
      ...mockPackage,
      approvers: ['emp1'],
      startDate: new Date('2024-01-01T00:00:00.000Z'),
      endDate: null
    });
  });

  it('renders the title and description inputs', async () => {
    renderUpdatePackage();
    expect(
      await screen.findByPlaceholderText('Enter package title')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter package description')
    ).toBeInTheDocument();
  });

  it('renders the date inputs for start and end dates', async () => {
    renderUpdatePackage();
    expect(
      await screen.findByPlaceholderText('Start Date picker')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('End Date picker')).toBeInTheDocument();
  });

  it('submits the form and updates the package', async () => {
    const { container } = renderUpdatePackage();

    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();

    await act(async () => {
      fireEvent.submit(form as HTMLElement);
    });

    expect(mockUpdatePackage).toHaveBeenCalledWith({
      id: 'pkg1',
      data: mockFormValues
    });
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Package updated successfully!'
    );
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('toasts an error when the update fails', async () => {
    mockUpdatePackage.mockRejectedValue({
      response: { data: { message: 'Update rejected' } }
    });
    const { container } = renderUpdatePackage();

    const form = container.querySelector('form');

    await act(async () => {
      fireEvent.submit(form as HTMLElement);
    });

    expect(mockToastError).toHaveBeenCalledWith('Update rejected');
  });

  it('deletes the package through the confirmation modal', async () => {
    renderUpdatePackage();

    fireEvent.click(
      await screen.findByRole('button', { name: 'Delete Package' })
    );

    await act(async () => {
      fireEvent.click(screen.getByText('confirm-delete'));
    });

    expect(mockDeletePackage).toHaveBeenCalledWith({
      id: 'pkg1',
      hardDelete: true
    });
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Package deleted successfully!'
    );
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
