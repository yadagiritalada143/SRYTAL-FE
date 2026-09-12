import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { act } from 'react';
import EmploymentType from '../EmploymentType';

let mockTypes: any[] = [];
let mockIsLoading = true;
let mockIsMobile = false;

jest.mock('@hooks/queries/useAdminQueries', () => ({
  useGetAllEmploymentTypes: () => ({
    data: mockTypes,
    isLoading: mockIsLoading
  })
}));

const mockAddType = jest.fn();
const mockUpdateType = jest.fn();
const mockDeleteType = jest.fn();
jest.mock('@hooks/mutations/useAdminMutations', () => ({
  useAddEmploymentTypeByAdmin: () => ({
    mutateAsync: mockAddType,
    isPending: false
  }),
  useUpdateEmploymentTypeByAdmin: () => ({
    mutateAsync: mockUpdateType,
    isPending: false
  }),
  useDeleteEmploymentTypeByAdmin: () => ({
    mutateAsync: mockDeleteType,
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

const renderTypes = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <EmploymentType />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const mockTypesData = [
  { id: 'et1', _id: 'et1', employmentType: 'Full-time' },
  { id: 'et2', _id: 'et2', employmentType: 'Contract' },
  { id: 'et3', _id: 'et3', employmentType: 'Intern' }
];

const clickEditOnFirstRow = () => {
  const svg = document.querySelector('.tabler-icon-edit') as HTMLElement;
  const button = svg?.closest('button');
  expect(button).toBeTruthy();
  if (button) fireEvent.click(button);
  return button;
};

describe('EmploymentType Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAddType.mockReset();
    mockUpdateType.mockReset();
    mockDeleteType.mockReset();
    mockAddType.mockResolvedValue({});
    mockUpdateType.mockResolvedValue({});
    mockDeleteType.mockResolvedValue({});
    mockTypes = [];
    mockIsLoading = true;
    mockIsMobile = false;
  });

  describe('Loading state', () => {
    it('shows the page header while loading', () => {
      renderTypes();
      expect(screen.getByText('Employment Types')).toBeInTheDocument();
      expect(screen.getByText('loading')).toBeInTheDocument();
    });
  });

  describe('Empty state', () => {
    beforeEach(() => {
      mockTypes = [];
      mockIsLoading = false;
    });

    it('shows empty state when no employment types exist', () => {
      renderTypes();
      expect(screen.getByText('No employment types found')).toBeInTheDocument();
    });

    it('shows empty state helper text', () => {
      renderTypes();
      expect(
        screen.getByText('Start by adding your first employment type')
      ).toBeInTheDocument();
    });

    it('shows Add Type button in empty state', () => {
      renderTypes();
      expect(
        screen.getAllByRole('button', { name: /add type/i }).length
      ).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Data display', () => {
    beforeEach(() => {
      mockTypes = mockTypesData;
      mockIsLoading = false;
    });

    it('renders the page header and subtitle', () => {
      renderTypes();
      expect(screen.getByText('Employment Types')).toBeInTheDocument();
      expect(
        screen.getByText(/Define the employment types/)
      ).toBeInTheDocument();
    });

    it('displays all employment types in table', () => {
      renderTypes();
      expect(screen.getByText('Full-time')).toBeInTheDocument();
      expect(screen.getByText('Contract')).toBeInTheDocument();
      expect(screen.getByText('Intern')).toBeInTheDocument();
    });

    it('displays table column headers', () => {
      renderTypes();
      expect(screen.getByText('S.No')).toBeInTheDocument();
      expect(
        screen.getAllByText('Employment Type').length
      ).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('Actions')).toBeInTheDocument();
    });

    it('displays serial numbers for rows', () => {
      renderTypes();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getAllByText('3').length).toBeGreaterThanOrEqual(1);
    });

    it('shows search input', () => {
      renderTypes();
      expect(
        screen.getByPlaceholderText('Search by employment type...')
      ).toBeInTheDocument();
    });

    it('shows items per page selector', () => {
      renderTypes();
      expect(screen.getByText('Items per page:')).toBeInTheDocument();
    });
  });

  describe('Search filtering', () => {
    beforeEach(() => {
      mockTypes = mockTypesData;
      mockIsLoading = false;
    });

    it('filters types by search query', () => {
      renderTypes();
      const searchInput = screen.getByPlaceholderText(
        'Search by employment type...'
      );
      fireEvent.change(searchInput, { target: { value: 'contract' } });
      expect(screen.getByText('Contract')).toBeInTheDocument();
      expect(screen.queryByText('Full-time')).not.toBeInTheDocument();
    });

    it('shows filter count badge when search is active', () => {
      renderTypes();
      const searchInput = screen.getByPlaceholderText(
        'Search by employment type...'
      );
      fireEvent.change(searchInput, { target: { value: 'contract' } });
      expect(screen.getByText(/1 of 3 types/)).toBeInTheDocument();
    });

    it('shows all items when search is cleared', () => {
      renderTypes();
      const searchInput = screen.getByPlaceholderText(
        'Search by employment type...'
      );
      fireEvent.change(searchInput, { target: { value: 'contract' } });
      fireEvent.change(searchInput, { target: { value: '' } });
      expect(screen.getByText('Full-time')).toBeInTheDocument();
      expect(screen.getByText('Contract')).toBeInTheDocument();
    });
  });

  describe('Add Modal', () => {
    beforeEach(() => {
      mockTypes = [];
      mockIsLoading = false;
    });

    it('opens add modal when Add Type button is clicked', () => {
      renderTypes();
      fireEvent.click(screen.getAllByRole('button', { name: /add type/i })[0]);
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    it('renders add modal title and form fields', () => {
      renderTypes();
      fireEvent.click(screen.getAllByRole('button', { name: /add type/i })[0]);
      expect(screen.getByText('Add New Employment Type')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Enter type name')
      ).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('disables add button when input is empty', () => {
      renderTypes();
      fireEvent.click(screen.getAllByRole('button', { name: /add type/i })[0]);
      const addButtons = screen.getAllByRole('button', {
        name: /add type/i
      });
      expect(addButtons[addButtons.length - 1]).toBeDisabled();
    });

    it('rejects invalid characters in add input', () => {
      renderTypes();
      fireEvent.click(screen.getAllByRole('button', { name: /add type/i })[0]);
      const input = screen.getByPlaceholderText('Enter type name');
      fireEvent.change(input, { target: { value: 'Full@' } });
      expect(input).toHaveValue('');
    });

    it('calls addEmploymentType on valid submit', async () => {
      renderTypes();
      fireEvent.click(screen.getAllByRole('button', { name: /add type/i })[0]);
      const input = screen.getByPlaceholderText('Enter type name');
      fireEvent.change(input, { target: { value: 'Permanent' } });
      const addButtons = screen.getAllByRole('button', {
        name: /add type/i
      });
      expect(addButtons[addButtons.length - 1]).not.toBeDisabled();
      await act(async () => {
        fireEvent.click(addButtons[addButtons.length - 1]);
      });
      expect(mockAddType).toHaveBeenCalledWith({
        employmentType: 'Permanent'
      });
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Added successfully');
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('shows error toast for duplicate type', async () => {
      mockTypes = [...mockTypesData];
      mockIsLoading = false;
      renderTypes();
      fireEvent.click(screen.getAllByRole('button', { name: /add type/i })[0]);
      const input = screen.getByPlaceholderText('Enter type name');
      fireEvent.change(input, { target: { value: 'Full-time' } });
      const addButtons = screen.getAllByRole('button', {
        name: /add type/i
      });
      await act(async () => {
        fireEvent.click(addButtons[addButtons.length - 1]);
      });
      expect(mockShowErrorToast).toHaveBeenCalledWith(
        'This employment type already exists'
      );
      expect(mockAddType).not.toHaveBeenCalled();
    });

    it('shows error toast when add mutation fails', async () => {
      mockAddType.mockRejectedValueOnce(new Error('fail'));
      renderTypes();
      fireEvent.click(screen.getAllByRole('button', { name: /add type/i })[0]);
      const input = screen.getByPlaceholderText('Enter type name');
      fireEvent.change(input, { target: { value: 'Permanent' } });
      const addButtons = screen.getAllByRole('button', {
        name: /add type/i
      });
      await act(async () => {
        fireEvent.click(addButtons[addButtons.length - 1]);
      });
      expect(mockShowErrorToast).toHaveBeenCalledWith('Failed to add');
    });

    it('closes add modal when cancel is clicked', () => {
      renderTypes();
      fireEvent.click(screen.getAllByRole('button', { name: /add type/i })[0]);
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Cancel'));
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  describe('Edit Modal', () => {
    beforeEach(() => {
      mockTypes = mockTypesData;
      mockIsLoading = false;
    });

    it('opens edit modal with prefilled type when edit icon is clicked', () => {
      renderTypes();
      clickEditOnFirstRow();
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByText('Edit Employment Type')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Full-time')).toHaveValue('Full-time');
    });

    it('calls updateEmploymentType on valid submit', async () => {
      renderTypes();
      clickEditOnFirstRow();
      const input = screen.getByDisplayValue('Full-time');
      fireEvent.change(input, { target: { value: 'Part Time' } });
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Save' }));
      });
      expect(mockUpdateType).toHaveBeenCalledWith({
        id: 'et1',
        employmentType: 'Part Time'
      });
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Updated successfully');
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('shows error toast for duplicate type on edit', async () => {
      renderTypes();
      clickEditOnFirstRow();
      const input = screen.getByDisplayValue('Full-time');
      fireEvent.change(input, { target: { value: 'Contract' } });
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Save' }));
      });
      expect(mockShowErrorToast).toHaveBeenCalledWith(
        'This employment type already exists'
      );
      expect(mockUpdateType).not.toHaveBeenCalled();
    });

    it('shows error toast when update mutation fails', async () => {
      mockUpdateType.mockRejectedValueOnce(new Error('fail'));
      renderTypes();
      clickEditOnFirstRow();
      const input = screen.getByDisplayValue('Full-time');
      fireEvent.change(input, { target: { value: 'Part Time' } });
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Save' }));
      });
      expect(mockShowErrorToast).toHaveBeenCalledWith('Failed to update');
    });

    it('closes edit modal when cancel is clicked', () => {
      renderTypes();
      clickEditOnFirstRow();
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Cancel'));
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  describe('Delete Modal', () => {
    beforeEach(() => {
      mockTypes = mockTypesData;
      mockIsLoading = false;
    });

    it('opens delete confirmation when Delete is clicked', () => {
      renderTypes();
      clickEditOnFirstRow();
      fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0]);
      expect(screen.getByText('Delete Employment Type')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Are you sure you want to delete this employment type? This action cannot be undone.'
        )
      ).toBeInTheDocument();
    });

    it('calls deleteEmploymentType on confirm', async () => {
      renderTypes();
      clickEditOnFirstRow();
      fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0]);
      const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
      await act(async () => {
        fireEvent.click(deleteButtons[deleteButtons.length - 1]);
      });
      expect(mockDeleteType).toHaveBeenCalledWith('et1');
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Deleted successfully');
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('shows error toast when delete mutation fails', async () => {
      mockDeleteType.mockRejectedValueOnce(new Error('fail'));
      renderTypes();
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
      mockTypes = mockTypesData;
      mockIsLoading = false;
      mockIsMobile = true;
    });

    it('renders mobile type cards', () => {
      renderTypes();
      expect(screen.getByText('Full-time')).toBeInTheDocument();
      expect(screen.getByText('Contract')).toBeInTheDocument();
      expect(screen.getByText('Intern')).toBeInTheDocument();
    });

    it('opens edit modal from a mobile card', () => {
      renderTypes();
      clickEditOnFirstRow();
      expect(screen.getByText('Edit Employment Type')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Full-time')).toHaveValue('Full-time');
    });
  });
});
