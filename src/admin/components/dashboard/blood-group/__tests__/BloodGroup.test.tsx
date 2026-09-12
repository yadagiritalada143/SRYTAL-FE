import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import React from 'react';
import BloodGroup from '../BloodGroup';

let mockGroups: any[] = [];
let mockIsLoading = false;
let mockIsMobile = false;

jest.mock('@hooks/queries/useAdminQueries', () => ({
  useGetAllBloodGroupsByAdmin: () => ({
    data: mockGroups,
    isLoading: mockIsLoading
  })
}));

const mockAddBloodGroup = jest.fn();
const mockUpdateBloodGroup = jest.fn();
const mockDeleteBloodGroup = jest.fn();
jest.mock('@hooks/mutations/useAdminMutations', () => ({
  useAddBloodGroupByAdmin: () => ({
    mutateAsync: mockAddBloodGroup,
    isPending: false
  }),
  useUpdateBloodGroupByAdmin: () => ({
    mutateAsync: mockUpdateBloodGroup,
    isPending: false
  }),
  useDeleteBloodGroupByAdmin: () => ({
    mutateAsync: mockDeleteBloodGroup,
    isPending: false
  })
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => mockIsMobile
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
    organizationConfig: { organization_name: 'srytal' },
    appColors: {}
  })
}));

const mockShowSuccessToast = jest.fn();
const mockShowErrorToast = jest.fn();
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

const renderBloodGroup = () => {
  return render(
    <RecoilRoot>
      <MantineProvider env='test'>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <BloodGroup />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const mockGroupsData = [
  { id: 'bg1', type: 'A+' },
  { id: 'bg2', type: 'B-' },
  { id: 'bg3', type: 'AB+' }
];

const clickIcon = (className: string) => {
  const svg = document.querySelector(`.${className}`) as HTMLElement;
  const button = svg?.closest('button');
  expect(button).toBeTruthy();
  if (button) fireEvent.click(button);
  return button;
};

describe('BloodGroup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    mockGroups = [];
    mockIsLoading = false;
    mockIsMobile = false;
    mockAddBloodGroup.mockResolvedValue(undefined);
    mockUpdateBloodGroup.mockResolvedValue(undefined);
    mockDeleteBloodGroup.mockResolvedValue(undefined);
  });

  it('renders the page header', () => {
    mockGroups = mockGroupsData;
    renderBloodGroup();
    expect(screen.getByText('Blood Groups')).toBeInTheDocument();
  });

  it('shows a loading state while fetching', () => {
    mockIsLoading = true;
    renderBloodGroup();
    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('renders the list of blood groups', () => {
    mockGroups = mockGroupsData;
    renderBloodGroup();
    expect(screen.getByText('A+')).toBeInTheDocument();
    expect(screen.getByText('B-')).toBeInTheDocument();
    expect(screen.getByText('AB+')).toBeInTheDocument();
  });

  it('shows an empty state when no blood groups exist', () => {
    renderBloodGroup();
    expect(screen.getByText('empty')).toBeInTheDocument();
    expect(screen.getByText('No blood groups found')).toBeInTheDocument();
    expect(
      screen.getByText('Start by adding your first blood group')
    ).toBeInTheDocument();
  });

  it('filters the list based on the search query', () => {
    mockGroups = mockGroupsData;
    renderBloodGroup();
    fireEvent.change(screen.getByPlaceholderText('Search by blood group...'), {
      target: { value: 'A+' }
    });
    expect(screen.getByText('A+')).toBeInTheDocument();
    expect(screen.queryByText('B-')).not.toBeInTheDocument();
  });

  it('shows a filtered count badge while searching', () => {
    mockGroups = mockGroupsData;
    renderBloodGroup();
    fireEvent.change(screen.getByPlaceholderText('Search by blood group...'), {
      target: { value: 'A+' }
    });
    expect(screen.getByText('1 of 3 groups')).toBeInTheDocument();
  });

  it('adds a new blood group', async () => {
    mockGroups = [];
    renderBloodGroup();
    fireEvent.click(
      screen.getAllByRole('button', { name: /add blood group/i })[0]
    );
    fireEvent.change(screen.getByPlaceholderText('e.g., A+, B-, AB+, O-'), {
      target: { value: 'O+' }
    });
    const addButtons = screen.getAllByRole('button', {
      name: 'Add Blood Group'
    });
    fireEvent.click(addButtons[addButtons.length - 1]);
    expect(mockAddBloodGroup).toHaveBeenCalledWith({ type: 'O+' });
    await waitFor(() => {
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Added successfully');
    });
  });

  it('rejects an invalid new blood group', () => {
    mockGroups = [];
    renderBloodGroup();
    fireEvent.click(
      screen.getAllByRole('button', { name: /add blood group/i })[0]
    );
    fireEvent.change(screen.getByPlaceholderText('e.g., A+, B-, AB+, O-'), {
      target: { value: 'X' }
    });
    const addButtons = screen.getAllByRole('button', {
      name: 'Add Blood Group'
    });
    fireEvent.click(addButtons[addButtons.length - 1]);
    expect(mockAddBloodGroup).not.toHaveBeenCalled();
    expect(mockShowErrorToast).toHaveBeenCalledWith(
      'Invalid blood group format (e.g., A+, B-, AB+, O-)'
    );
  });

  it('rejects a duplicate new blood group', () => {
    mockGroups = mockGroupsData;
    renderBloodGroup();
    fireEvent.click(
      screen.getAllByRole('button', { name: /add blood group/i })[0]
    );
    fireEvent.change(screen.getByPlaceholderText('e.g., A+, B-, AB+, O-'), {
      target: { value: 'A+' }
    });
    const addButtons = screen.getAllByRole('button', {
      name: 'Add Blood Group'
    });
    fireEvent.click(addButtons[addButtons.length - 1]);
    expect(mockAddBloodGroup).not.toHaveBeenCalled();
    expect(mockShowErrorToast).toHaveBeenCalledWith(
      'This blood group already exists'
    );
  });

  it('edits an existing blood group', async () => {
    mockGroups = mockGroupsData;
    renderBloodGroup();
    clickIcon('tabler-icon-edit');
    fireEvent.change(screen.getByDisplayValue('A+'), {
      target: { value: 'O-' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(mockUpdateBloodGroup).toHaveBeenCalledWith({
      id: 'bg1',
      type: 'O-'
    });
    await waitFor(() => {
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Updated successfully');
    });
  });

  it('deletes a blood group after confirmation', async () => {
    mockGroups = mockGroupsData;
    renderBloodGroup();
    clickIcon('tabler-icon-edit');
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButtons[deleteButtons.length - 1]);
    expect(mockDeleteBloodGroup).toHaveBeenCalledWith('bg1');
    await waitFor(() => {
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Deleted successfully');
    });
  });

  it('renders mobile cards in mobile view', () => {
    mockGroups = mockGroupsData;
    mockIsMobile = true;
    renderBloodGroup();
    expect(screen.getAllByText('A+').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Blood Group').length).toBeGreaterThanOrEqual(1);
  });
});
