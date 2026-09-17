import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { act } from 'react';

let mockFeedbacks: any[] = [];
let mockIsLoading = true;

jest.mock('@hooks/queries/useAdminQueries', () => ({
  useGetAllFeedbackAttributesByAdmin: () => ({
    data: mockFeedbacks,
    isLoading: mockIsLoading
  })
}));

const mockAdd = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();
jest.mock('@hooks/mutations/useAdminMutations', () => ({
  useAddFeedbackAttributeByAdmin: () => ({
    mutateAsync: mockAdd,
    isPending: false
  }),
  useUpdateFeedbackAttributeByAdmin: () => ({
    mutateAsync: mockUpdate,
    isPending: false
  }),
  useDeleteFeedbackAttributeByAdmin: () => ({
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
    {props.children}
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

import FeedbackTable from '../FeedbackTable';

const renderFeedbackTable = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter>
          <FeedbackTable />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const mockFeedbackData = [
  { id: 'f1', name: 'Communication' },
  { id: 'f2', name: 'Teamwork' },
  { id: 'f3', name: 'Leadership' }
];

describe('FeedbackTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAdd.mockReset().mockResolvedValue({});
    mockUpdate.mockReset().mockResolvedValue({});
    mockDelete.mockReset().mockResolvedValue({});
    mockFeedbacks = [];
    mockIsLoading = false;
  });

  it('renders the page header', () => {
    renderFeedbackTable();
    expect(
      screen.getByText('Feedback Attributes', { selector: 'h2' })
    ).toBeInTheDocument();
  });

  it('renders the data rows', () => {
    mockFeedbacks = mockFeedbackData;
    renderFeedbackTable();
    expect(screen.getByText('Communication')).toBeInTheDocument();
    expect(screen.getByText('Teamwork')).toBeInTheDocument();
    expect(screen.getByText('Leadership')).toBeInTheDocument();
  });

  it('renders table column headers', () => {
    mockFeedbacks = mockFeedbackData;
    renderFeedbackTable();
    expect(screen.getByText('S.No')).toBeInTheDocument();
    expect(screen.getAllByText('Feedback Attributes').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('shows the search input', () => {
    renderFeedbackTable();
    expect(
      screen.getByPlaceholderText('Search feedback attribute...')
    ).toBeInTheDocument();
  });

  it('shows an empty state when no feedback attributes exist', () => {
    renderFeedbackTable();
    expect(
      screen.getByText('No feedback attributes found')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Start by adding your first feedback attribute')
    ).toBeInTheDocument();
  });

  it('filters by search query', () => {
    mockFeedbacks = mockFeedbackData;
    renderFeedbackTable();
    const search = screen.getByPlaceholderText('Search feedback attribute...');
    fireEvent.change(search, { target: { value: 'Team' } });
    expect(screen.getByText('Teamwork')).toBeInTheDocument();
    expect(screen.queryByText('Communication')).not.toBeInTheDocument();
  });

  it('shows the count badge when the list is filtered', () => {
    mockFeedbacks = mockFeedbackData;
    renderFeedbackTable();
    const search = screen.getByPlaceholderText('Search feedback attribute...');
    fireEvent.change(search, { target: { value: 'Team' } });
    expect(screen.getByText(/1 of 3/)).toBeInTheDocument();
  });

  it('opens the add modal and adds a new attribute', async () => {
    renderFeedbackTable();
    fireEvent.click(
      screen.getAllByRole('button', {
        name: /Add Feedback Attribute/i
      })[0]
    );
    expect(screen.getByText('Add New Feedback Attribute')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Enter the feedback attribute');
    fireEvent.change(input, { target: { value: 'Punctuality' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Add'));
    });

    expect(mockAdd).toHaveBeenCalledWith({ name: 'Punctuality' });
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Feedback attribute added successfully !!'
    );
  });

  it('edits an existing attribute', async () => {
    mockFeedbacks = [{ id: 'f1', name: 'Communication' }];
    renderFeedbackTable();

    fireEvent.click(screen.getAllByRole('button', { name: '' })[0]);
    expect(screen.getByText('Edit Feedback Attribute')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Enter the feedback attribute');
    fireEvent.change(input, { target: { value: 'Communication Skills' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
    });

    expect(mockUpdate).toHaveBeenCalledWith({
      id: 'f1',
      name: 'Communication Skills'
    });
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Feedback attribute updated successfully !!'
    );
  });

  it('deletes an attribute through the delete modal', async () => {
    mockFeedbacks = [{ id: 'f1', name: 'Communication' }];
    renderFeedbackTable();

    fireEvent.click(screen.getAllByRole('button', { name: '' })[0]);
    fireEvent.click(screen.getByText('Delete'));

    expect(
      screen.getByText('Delete Feedback Attribute')
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getAllByText('Delete')[1]);
    });

    expect(mockDelete).toHaveBeenCalledWith('f1');
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Feedback attribute deleted successfully !!'
    );
  });

  it('toasts an error when deleting fails', async () => {
    mockDelete.mockRejectedValueOnce(new Error('fail'));
    mockFeedbacks = [{ id: 'f1', name: 'Communication' }];
    renderFeedbackTable();

    fireEvent.click(screen.getAllByRole('button', { name: '' })[0]);
    fireEvent.click(screen.getByText('Delete'));

    await act(async () => {
      fireEvent.click(screen.getAllByText('Delete')[1]);
    });

    expect(mockShowErrorToast).toHaveBeenCalledWith('Failed to delete');
  });

  it('toasts an error when the add mutation fails', async () => {
    mockAdd.mockRejectedValueOnce(new Error('fail'));
    renderFeedbackTable();
    fireEvent.click(
      screen.getAllByRole('button', {
        name: /Add Feedback Attribute/i
      })[0]
    );
    const input = screen.getByPlaceholderText('Enter the feedback attribute');
    fireEvent.change(input, { target: { value: 'Punctuality' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Add'));
    });

    expect(mockShowErrorToast).toHaveBeenCalledWith('Failed to add');
  });
});