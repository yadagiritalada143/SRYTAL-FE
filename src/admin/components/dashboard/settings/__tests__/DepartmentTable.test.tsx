import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { act } from 'react';

let mockDepartments: any[] = [];
let mockIsLoading = true;
const mockIsMobile = jest.fn(() => false);

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => mockIsMobile()
}));

jest.mock('@hooks/queries/useAdminQueries', () => ({
  useGetAllDepartmentsByAdmin: () => ({
    data: mockDepartments,
    isLoading: mockIsLoading
  })
}));

const mockAdd = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();
jest.mock('@hooks/mutations/useAdminMutations', () => ({
  useAddDepartmentByAdmin: () => ({ mutateAsync: mockAdd, isPending: false }),
  useUpdateDepartmentByAdmin: () => ({
    mutateAsync: mockUpdate,
    isPending: false
  }),
  useDeleteDepartmentByAdmin: () => ({
    mutateAsync: mockDelete,
    isPending: false
  })
}));

const mockShowSuccessToast = jest.fn();
const mockShowErrorToast = jest.fn();
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

jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: mockShowSuccessToast,
    showErrorToast: mockShowErrorToast
  })
}));

jest.mock('@utils/common/debounce', () => ({
  debounce: (fn: any) => fn
}));

jest.mock('@components/common/loaders/DataView', () => (props: any) => (
  <div data-testid='data-view'>
    {props.isLoading && <span>loading</span>}
    {props.children}
  </div>
));

jest.mock('@components/common/page-header/PageHeader', () => (props: any) => (
  <div data-testid='page-header'>
    <h2>{props.title}</h2>
    {props.actions}
  </div>
));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({
    children,
    onClick,
    disabled,
    type
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'reset' | 'submit';
  }) => (
    <button type={type ?? 'button'} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}));

jest.mock('@mantine/core', () => {
  const actual = jest.requireActual('@mantine/core');
  return {
    ...actual,
    Modal: ({ opened, children, title, onClose, ...rest }: any) =>
      opened ? (
        <div data-testid='modal'>
          <div>{title}</div>
          {children}
        </div>
      ) : null
  };
});

import DepartmentTable from '../DepartmentTable';

const renderDepartmentTable = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter>
          <DepartmentTable />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const mockDepartmentData = [
  { _id: 'd1', id: 'd1', departmentName: 'Engineering' },
  { _id: 'd2', id: 'd2', departmentName: 'Design' }
];

describe('DepartmentTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsMobile.mockReturnValue(false);
    mockAdd.mockReset().mockResolvedValue({});
    mockUpdate.mockReset().mockResolvedValue({});
    mockDelete.mockReset().mockResolvedValue({});
    mockDepartments = [];
    mockIsLoading = false;
  });

  it('renders the page header', () => {
    renderDepartmentTable();
    expect(
      screen.getByText('Departments', { selector: 'h2' })
    ).toBeInTheDocument();
  });

  it('renders the data rows', () => {
    mockDepartments = mockDepartmentData;
    renderDepartmentTable();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
  });

  it('renders table column headers', () => {
    mockDepartments = mockDepartmentData;
    renderDepartmentTable();
    expect(screen.getByText('S.No')).toBeInTheDocument();
    expect(screen.getAllByText('Departments').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('shows the search input', () => {
    renderDepartmentTable();
    expect(
      screen.getByPlaceholderText('Search departments...')
    ).toBeInTheDocument();
  });

  it('filters by search query', () => {
    mockDepartments = mockDepartmentData;
    renderDepartmentTable();
    const search = screen.getByPlaceholderText('Search departments...');
    fireEvent.change(search, { target: { value: 'Design' } });
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.queryByText('Engineering')).not.toBeInTheDocument();
  });

  it('shows the empty state on mobile when there are no departments', () => {
    mockIsMobile.mockReturnValue(true);
    renderDepartmentTable();
    expect(screen.getByText('No departments found')).toBeInTheDocument();
    expect(
      screen.getByText('Start by adding your first department')
    ).toBeInTheDocument();
  });

  it('adds a new department', async () => {
    renderDepartmentTable();
    fireEvent.click(
      screen.getAllByRole('button', { name: /Add Department/i })[0]
    );
    expect(screen.getByText('Add New Department')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Enter the department');
    fireEvent.change(input, { target: { value: 'Marketing' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Add'));
    });

    expect(mockAdd).toHaveBeenCalledWith({ departmentName: 'Marketing' });
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Department added successfully'
    );
  });

  it('edits an existing department', async () => {
    mockDepartments = [{ _id: 'd1', departmentName: 'Engineering' }];
    renderDepartmentTable();

    fireEvent.click(screen.getAllByRole('button', { name: '' })[0]);
    expect(screen.getByText('Edit Department')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Enter the department');
    fireEvent.change(input, { target: { value: 'Engineering II' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
    });

    expect(mockUpdate).toHaveBeenCalledWith({
      id: 'd1',
      departmentName: 'Engineering II'
    });
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Department updated successfully'
    );
  });

  it('deletes a department through the delete modal', async () => {
    mockDepartments = [{ _id: 'd1', departmentName: 'Engineering' }];
    renderDepartmentTable();

    fireEvent.click(screen.getAllByRole('button', { name: '' })[0]);
    fireEvent.click(screen.getByText('Delete'));

    expect(screen.getByText('Delete Department')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getAllByText('Delete')[1]);
    });

    expect(mockDelete).toHaveBeenCalledWith('d1');
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Department deleted successfully'
    );
  });

  it('toasts an error when the add mutation fails', async () => {
    mockAdd.mockRejectedValueOnce(new Error('fail'));
    renderDepartmentTable();
    fireEvent.click(
      screen.getAllByRole('button', { name: /Add Department/i })[0]
    );
    const input = screen.getByPlaceholderText('Enter the department');
    fireEvent.change(input, { target: { value: 'Marketing' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Add'));
    });

    expect(mockShowErrorToast).toHaveBeenCalledWith('Failed to add');
  });
});
