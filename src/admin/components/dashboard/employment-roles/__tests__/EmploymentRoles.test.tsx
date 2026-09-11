import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { act } from 'react';
import EmploymentRoles from '../EmploymentRoles';

let mockRoles: any[] = [];
let mockIsLoading = true;
let mockIsMobile = false;

jest.mock('@hooks/queries/useAdminQueries', () => ({
  useGetAllEmployeeRolesByAdmin: () => ({
    data: mockRoles,
    isLoading: mockIsLoading
  })
}));

const mockAddRole = jest.fn();
const mockUpdateRole = jest.fn();
const mockDeleteRole = jest.fn();
jest.mock('@hooks/mutations/useAdminMutations', () => ({
  useAddEmployeeRoleByAdmin: () => ({
    mutateAsync: mockAddRole,
    isPending: false
  }),
  useUpdateEmployeeRoleByAdmin: () => ({
    mutateAsync: mockUpdateRole,
    isPending: false
  }),
  useDeleteEmployeeRoleByAdmin: () => ({
    mutateAsync: mockDeleteRole,
    isPending: false
  })
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => mockIsMobile
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
    {props.isEmpty && <span>empty</span>}
    {props.children}
  </div>
));

jest.mock('@mantine/core', () => {
  const actual = jest.requireActual('@mantine/core');
  return {
    ...actual,
    Modal: ({ opened, children, title }: any) =>
      opened ? (
        <div data-testid='modal'>
          <div>{title}</div>
          {children}
        </div>
      ) : null
  };
});

const renderRoles = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <EmploymentRoles />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const mockRolesData = [
  { id: 'r1', _id: 'r1', designation: 'Developer' },
  { id: 'r2', _id: 'r2', designation: 'Manager' },
  { id: 'r3', _id: 'r3', designation: 'Designer' }
];

const clickEditOnFirstRow = () => {
  const svg = document.querySelector('.tabler-icon-edit') as HTMLElement;
  const button = svg?.closest('button');
  expect(button).toBeTruthy();
  if (button) fireEvent.click(button);
  return button;
};

describe('EmploymentRoles Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAddRole.mockReset();
    mockUpdateRole.mockReset();
    mockDeleteRole.mockReset();
    mockAddRole.mockResolvedValue({});
    mockUpdateRole.mockResolvedValue({});
    mockDeleteRole.mockResolvedValue({});
    mockRoles = [];
    mockIsLoading = true;
    mockIsMobile = false;
  });

  describe('Loading state', () => {
    it('shows the page header while loading', () => {
      renderRoles();
      expect(screen.getByText('Employment Roles')).toBeInTheDocument();
      expect(screen.getByText('loading')).toBeInTheDocument();
    });
  });

  describe('Empty state', () => {
    beforeEach(() => {
      mockRoles = [];
      mockIsLoading = false;
    });

    it('shows empty state when no employment roles exist', () => {
      renderRoles();
      expect(screen.getByText('No employment roles found')).toBeInTheDocument();
    });

    it('shows empty state helper text', () => {
      renderRoles();
      expect(
        screen.getByText('Start by adding your first employment role')
      ).toBeInTheDocument();
    });

    it('shows Add Role button in empty state', () => {
      renderRoles();
      expect(
        screen.getAllByRole('button', { name: /add role/i }).length
      ).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Data display', () => {
    beforeEach(() => {
      mockRoles = mockRolesData;
      mockIsLoading = false;
    });

    it('renders the page header and subtitle', () => {
      renderRoles();
      expect(screen.getByText('Employment Roles')).toBeInTheDocument();
      expect(
        screen.getByText(/Manage the designations employees can be assigned/)
      ).toBeInTheDocument();
    });

    it('displays all employment roles in table', () => {
      renderRoles();
      expect(screen.getByText('Developer')).toBeInTheDocument();
      expect(screen.getByText('Manager')).toBeInTheDocument();
      expect(screen.getByText('Designer')).toBeInTheDocument();
    });

    it('displays table column headers', () => {
      renderRoles();
      expect(screen.getByText('S.No')).toBeInTheDocument();
      expect(
        screen.getAllByText('Employment Role').length
      ).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('Actions')).toBeInTheDocument();
    });

    it('displays serial numbers for rows', () => {
      renderRoles();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getAllByText('3').length).toBeGreaterThanOrEqual(1);
    });

    it('shows search input', () => {
      renderRoles();
      expect(
        screen.getByPlaceholderText('Search by employment role...')
      ).toBeInTheDocument();
    });

    it('shows items per page selector', () => {
      renderRoles();
      expect(screen.getByText('Items per page:')).toBeInTheDocument();
    });
  });

  describe('Search filtering', () => {
    beforeEach(() => {
      mockRoles = mockRolesData;
      mockIsLoading = false;
    });

    it('filters roles by search query', () => {
      renderRoles();
      const searchInput = screen.getByPlaceholderText(
        'Search by employment role...'
      );
      fireEvent.change(searchInput, { target: { value: 'dev' } });
      expect(screen.getByText('Developer')).toBeInTheDocument();
      expect(screen.queryByText('Manager')).not.toBeInTheDocument();
    });

    it('shows filter count badge when search is active', () => {
      renderRoles();
      const searchInput = screen.getByPlaceholderText(
        'Search by employment role...'
      );
      fireEvent.change(searchInput, { target: { value: 'dev' } });
      expect(screen.getByText(/1 of 3 roles/)).toBeInTheDocument();
    });

    it('shows all items when search is cleared', () => {
      renderRoles();
      const searchInput = screen.getByPlaceholderText(
        'Search by employment role...'
      );
      fireEvent.change(searchInput, { target: { value: 'dev' } });
      fireEvent.change(searchInput, { target: { value: '' } });
      expect(screen.getByText('Developer')).toBeInTheDocument();
      expect(screen.getByText('Manager')).toBeInTheDocument();
    });
  });

  describe('Add Modal', () => {
    beforeEach(() => {
      mockRoles = [];
      mockIsLoading = false;
    });

    it('opens add modal when Add Role button is clicked', () => {
      renderRoles();
      fireEvent.click(screen.getAllByRole('button', { name: /add role/i })[0]);
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    it('renders add modal title and form fields', () => {
      renderRoles();
      fireEvent.click(screen.getAllByRole('button', { name: /add role/i })[0]);
      expect(screen.getByText('Add New Employment Role')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Enter role name')
      ).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('disables add button when input is empty', () => {
      renderRoles();
      fireEvent.click(screen.getAllByRole('button', { name: /add role/i })[0]);
      const addButtons = screen.getAllByRole('button', {
        name: /add role/i
      });
      const addButton = addButtons[addButtons.length - 1];
      expect(addButton).toBeDisabled();
    });

    it('rejects invalid characters in add input', () => {
      renderRoles();
      fireEvent.click(screen.getAllByRole('button', { name: /add role/i })[0]);
      const input = screen.getByPlaceholderText('Enter role name');
      fireEvent.change(input, { target: { value: 'Dev@' } });
      expect(input).toHaveValue('');
    });

    it('calls addEmployeeRole on valid submit', async () => {
      renderRoles();
      fireEvent.click(screen.getAllByRole('button', { name: /add role/i })[0]);
      const input = screen.getByPlaceholderText('Enter role name');
      fireEvent.change(input, { target: { value: 'Analyst' } });
      const addButtons = screen.getAllByRole('button', {
        name: /add role/i
      });
      expect(addButtons[addButtons.length - 1]).not.toBeDisabled();
      await act(async () => {
        fireEvent.click(addButtons[addButtons.length - 1]);
      });
      expect(mockAddRole).toHaveBeenCalledWith({ designation: 'Analyst' });
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Added successfully');
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('shows error toast for duplicate role', async () => {
      mockRoles = [...mockRolesData];
      mockIsLoading = false;
      renderRoles();
      fireEvent.click(screen.getAllByRole('button', { name: /add role/i })[0]);
      const input = screen.getByPlaceholderText('Enter role name');
      fireEvent.change(input, { target: { value: 'Developer' } });
      const addButtons = screen.getAllByRole('button', {
        name: /add role/i
      });
      await act(async () => {
        fireEvent.click(addButtons[addButtons.length - 1]);
      });
      expect(mockShowErrorToast).toHaveBeenCalledWith(
        'This role already exists'
      );
      expect(mockAddRole).not.toHaveBeenCalled();
    });

    it('shows error toast when add mutation fails', async () => {
      mockAddRole.mockRejectedValueOnce(new Error('fail'));
      renderRoles();
      fireEvent.click(screen.getAllByRole('button', { name: /add role/i })[0]);
      const input = screen.getByPlaceholderText('Enter role name');
      fireEvent.change(input, { target: { value: 'Analyst' } });
      const addButtons = screen.getAllByRole('button', {
        name: /add role/i
      });
      await act(async () => {
        fireEvent.click(addButtons[addButtons.length - 1]);
      });
      expect(mockShowErrorToast).toHaveBeenCalledWith('Failed to add');
    });

    it('closes add modal when cancel is clicked', () => {
      renderRoles();
      fireEvent.click(screen.getAllByRole('button', { name: /add role/i })[0]);
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Cancel'));
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  describe('Edit Modal', () => {
    beforeEach(() => {
      mockRoles = mockRolesData;
      mockIsLoading = false;
    });

    it('opens edit modal with prefilled role when edit icon is clicked', () => {
      renderRoles();
      clickEditOnFirstRow();
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByText('Edit Employment Role')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Developer')).toHaveValue('Developer');
    });

    it('calls updateEmployeeRole on valid submit', async () => {
      renderRoles();
      clickEditOnFirstRow();
      const input = screen.getByDisplayValue('Developer');
      fireEvent.change(input, { target: { value: 'Senior Developer' } });
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Save' }));
      });
      expect(mockUpdateRole).toHaveBeenCalledWith({
        id: 'r1',
        designation: 'Senior Developer'
      });
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Updated successfully');
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('shows error toast for duplicate role on edit', async () => {
      renderRoles();
      clickEditOnFirstRow();
      const input = screen.getByDisplayValue('Developer');
      fireEvent.change(input, { target: { value: 'Manager' } });
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Save' }));
      });
      expect(mockShowErrorToast).toHaveBeenCalledWith(
        'This role already exists'
      );
      expect(mockUpdateRole).not.toHaveBeenCalled();
    });

    it('shows error toast when update mutation fails', async () => {
      mockUpdateRole.mockRejectedValueOnce(new Error('fail'));
      renderRoles();
      clickEditOnFirstRow();
      const input = screen.getByDisplayValue('Developer');
      fireEvent.change(input, { target: { value: 'Senior Developer' } });
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Save' }));
      });
      expect(mockShowErrorToast).toHaveBeenCalledWith('Failed to update');
    });

    it('closes edit modal when cancel is clicked', () => {
      renderRoles();
      clickEditOnFirstRow();
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Cancel'));
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  describe('Delete Modal', () => {
    beforeEach(() => {
      mockRoles = mockRolesData;
      mockIsLoading = false;
    });

    it('opens delete confirmation when Delete is clicked', () => {
      renderRoles();
      clickEditOnFirstRow();
      fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0]);
      expect(screen.getByText('Delete Employment Role')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Are you sure you want to delete this employment role? This action cannot be undone.'
        )
      ).toBeInTheDocument();
    });

    it('calls deleteEmployeeRole on confirm', async () => {
      renderRoles();
      clickEditOnFirstRow();
      fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0]);
      const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
      await act(async () => {
        fireEvent.click(deleteButtons[deleteButtons.length - 1]);
      });
      expect(mockDeleteRole).toHaveBeenCalledWith('r1');
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Deleted successfully');
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('shows error toast when delete mutation fails', async () => {
      mockDeleteRole.mockRejectedValueOnce(new Error('fail'));
      renderRoles();
      clickEditOnFirstRow();
      fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0]);
      const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
      await act(async () => {
        fireEvent.click(deleteButtons[deleteButtons.length - 1]);
      });
      expect(mockShowErrorToast).toHaveBeenCalledWith('Failed to delete');
    });
  });

  describe('Mobile view', () => {
    beforeEach(() => {
      mockRoles = mockRolesData;
      mockIsLoading = false;
      mockIsMobile = true;
    });

    it('renders mobile role cards', () => {
      renderRoles();
      expect(screen.getByText('Developer')).toBeInTheDocument();
      expect(screen.getByText('Manager')).toBeInTheDocument();
      expect(screen.getByText('Designer')).toBeInTheDocument();
    });

    it('opens edit modal from a mobile card', () => {
      renderRoles();
      clickEditOnFirstRow();
      expect(screen.getByText('Edit Employment Role')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Developer')).toHaveValue('Developer');
    });
  });
});
