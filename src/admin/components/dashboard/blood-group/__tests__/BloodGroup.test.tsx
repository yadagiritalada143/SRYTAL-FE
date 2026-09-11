import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { act } from 'react';

let mockBloodGroups: any[] = [];
let mockIsLoading = true;

jest.mock('@hooks/queries/useAdminQueries', () => ({
  useGetAllBloodGroupsByAdmin: () => ({
    data: mockBloodGroups,
    isLoading: mockIsLoading
  })
}));

const mockMutateAsync = jest.fn();
jest.mock('@hooks/mutations/useAdminMutations', () => ({
  useAddBloodGroupByAdmin: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false
  }),
  useUpdateBloodGroupByAdmin: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false
  }),
  useDeleteBloodGroupByAdmin: () => ({
    mutateAsync: mockMutateAsync,
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
    {props.isEmpty && <span>empty</span>}
    {props.children}
  </div>
));

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

const BloodGroup = require('../BloodGroup').default;

const renderBloodGroup = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <BloodGroup />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const mockBloodGroupData = [
  { id: 'bg1', _id: 'bg1', type: 'A+', organization: 'srytal' },
  { id: 'bg2', _id: 'bg2', type: 'B+', organization: 'srytal' },
  { id: 'bg3', _id: 'bg3', type: 'O-', organization: 'srytal' },
  { id: 'bg4', _id: 'bg4', type: 'AB+', organization: 'srytal' },
  { id: 'bg5', _id: 'bg5', type: 'A-', organization: 'srytal' }
];

describe('BloodGroup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockMutateAsync.mockReset();
    mockMutateAsync.mockResolvedValue({});
    mockBloodGroups = [];
    mockIsLoading = true;
  });

  describe('Loading state', () => {
    it('shows the page header while loading', () => {
      renderBloodGroup();
      expect(screen.getByText('Blood Groups')).toBeInTheDocument();
    });
  });

  describe('Empty state', () => {
    beforeEach(() => {
      mockBloodGroups = [];
      mockIsLoading = false;
    });

    it('shows empty state when no blood groups exist', () => {
      renderBloodGroup();
      expect(screen.getByText('No blood groups found')).toBeInTheDocument();
    });

    it('shows empty state helper text', () => {
      renderBloodGroup();
      expect(screen.getByText('Start by adding your first blood group')).toBeInTheDocument();
    });

    it('shows Add Blood Group button in empty state', () => {
      renderBloodGroup();
      expect(
        screen.getAllByRole('button', { name: /add blood group/i }).length
      ).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Data display', () => {
    beforeEach(() => {
      mockBloodGroups = mockBloodGroupData;
      mockIsLoading = false;
    });

    it('renders the page header', () => {
      renderBloodGroup();
      expect(screen.getByText('Blood Groups')).toBeInTheDocument();
    });

    it('renders the subtitle', () => {
      renderBloodGroup();
      expect(screen.getByText(/Manage the blood group options/)).toBeInTheDocument();
    });

    it('displays all blood groups in table', () => {
      renderBloodGroup();
      expect(screen.getByText('A+')).toBeInTheDocument();
      expect(screen.getByText('B+')).toBeInTheDocument();
      expect(screen.getByText('O-')).toBeInTheDocument();
      expect(screen.getByText('AB+')).toBeInTheDocument();
      expect(screen.getByText('A-')).toBeInTheDocument();
    });

    it('shows search input', () => {
      renderBloodGroup();
      expect(screen.getByPlaceholderText('Search by blood group...')).toBeInTheDocument();
    });

    it('displays table column headers', () => {
      renderBloodGroup();
      expect(screen.getByText('S.No')).toBeInTheDocument();
      expect(screen.getAllByText('Blood Group').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('Actions')).toBeInTheDocument();
    });

    it('displays serial numbers for rows', () => {
      renderBloodGroup();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('shows items per page selector', () => {
      renderBloodGroup();
      expect(screen.getByText('Items per page:')).toBeInTheDocument();
    });
  });

  describe('Search filtering', () => {
    beforeEach(() => {
      mockBloodGroups = mockBloodGroupData;
      mockIsLoading = false;
    });

    it('filters blood groups by search query', () => {
      renderBloodGroup();
      const searchInput = screen.getByPlaceholderText('Search by blood group...');
      fireEvent.change(searchInput, { target: { value: 'A+' } });
      expect(screen.getByText('A+')).toBeInTheDocument();
      expect(screen.queryByText('B+')).not.toBeInTheDocument();
    });

    it('shows filter count badge when search is active', () => {
      renderBloodGroup();
      const searchInput = screen.getByPlaceholderText('Search by blood group...');
      fireEvent.change(searchInput, { target: { value: 'A' } });
      expect(screen.getByText(/of 5 groups/)).toBeInTheDocument();
    });

    it('shows all items when search is cleared', () => {
      renderBloodGroup();
      const searchInput = screen.getByPlaceholderText('Search by blood group...');
      fireEvent.change(searchInput, { target: { value: 'A' } });
      fireEvent.change(searchInput, { target: { value: '' } });
      expect(screen.getByText('A+')).toBeInTheDocument();
      expect(screen.getByText('B+')).toBeInTheDocument();
    });
  });

  describe('Add Modal', () => {
    beforeEach(() => {
      mockBloodGroups = [];
      mockIsLoading = false;
    });

    it('opens add modal when Add Blood Group button is clicked', () => {
      renderBloodGroup();
      fireEvent.click(
        screen.getAllByRole('button', { name: /add blood group/i })[0]
      );
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    it('renders add modal title', () => {
      renderBloodGroup();
      fireEvent.click(
        screen.getAllByRole('button', { name: /add blood group/i })[0]
      );
      expect(screen.getByText('Add New Blood Group')).toBeInTheDocument();
    });

    it('renders add modal form fields', () => {
      renderBloodGroup();
      fireEvent.click(
        screen.getAllByRole('button', { name: /add blood group/i })[0]
      );
      expect(screen.getByPlaceholderText('e.g., A+, B-, AB+, O-')).toBeInTheDocument();
    });

    it('renders add modal Cancel button', () => {
      renderBloodGroup();
      fireEvent.click(
        screen.getAllByRole('button', { name: /add blood group/i })[0]
      );
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('disables add button when input is empty', () => {
      renderBloodGroup();
      fireEvent.click(
        screen.getAllByRole('button', { name: /add blood group/i })[0]
      );
      const addButtons = screen.getAllByText('Add Blood Group');
      const addButton = addButtons[addButtons.length - 1];
      expect(addButton.closest('button')).toBeDisabled();
    });

    it('calls addBloodGroup on valid submit', async () => {
      mockMutateAsync.mockResolvedValueOnce({});
      renderBloodGroup();
      fireEvent.click(screen.getAllByRole('button', { name: /add blood group/i })[0]);
      const input = screen.getByPlaceholderText('e.g., A+, B-, AB+, O-');
      fireEvent.change(input, { target: { value: 'A+' } });
      const addBtns = screen.getAllByText('Add Blood Group');
      const addBtn = addBtns[addBtns.length - 1];
      expect(addBtn).not.toBeDisabled();
      await act(async () => { fireEvent.click(addBtn); });
      expect(mockMutateAsync).toHaveBeenCalledWith({ type: 'A+' });
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Added successfully');
    });

    it('shows error toast for invalid blood group format', async () => {
      renderBloodGroup();
      fireEvent.click(screen.getAllByRole('button', { name: /add blood group/i })[0]);
      const input = screen.getByPlaceholderText('e.g., A+, B-, AB+, O-');
      fireEvent.change(input, { target: { value: 'X+' } });
      const addBtns = screen.getAllByText('Add Blood Group');
      const addBtn = addBtns[addBtns.length - 1];
      await act(async () => { fireEvent.click(addBtn); });
      expect(mockShowErrorToast).toHaveBeenCalledWith('Invalid blood group format (e.g., A+, B-, AB+, O-)');
    });

    it('shows error toast for duplicate blood group', async () => {
      mockBloodGroups = [...mockBloodGroupData];
      mockIsLoading = false;
      renderBloodGroup();
      fireEvent.click(screen.getByRole('button', { name: /add blood group/i }));
      const input = screen.getByPlaceholderText('e.g., A+, B-, AB+, O-');
      fireEvent.change(input, { target: { value: 'A+' } });
      const addBtns = screen.getAllByText('Add Blood Group');
      const addBtn = addBtns[addBtns.length - 1];
      await act(async () => { fireEvent.click(addBtn); });
      expect(mockShowErrorToast).toHaveBeenCalledWith('This blood group already exists');
    });

    it('shows error toast when add mutation fails', async () => {
      mockMutateAsync.mockRejectedValueOnce(new Error('fail'));
      renderBloodGroup();
      fireEvent.click(screen.getAllByRole('button', { name: /add blood group/i })[0]);
      const input = screen.getByPlaceholderText('e.g., A+, B-, AB+, O-');
      fireEvent.change(input, { target: { value: 'A+' } });
      const addBtns = screen.getAllByText('Add Blood Group');
      const addBtn = addBtns[addBtns.length - 1];
      await act(async () => { fireEvent.click(addBtn); });
      expect(mockShowErrorToast).toHaveBeenCalledWith('Failed to add');
    });

    it('closes add modal when cancel is clicked', () => {
      renderBloodGroup();
      fireEvent.click(screen.getAllByRole('button', { name: /add blood group/i })[0]);
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Cancel'));
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });
});
