import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { act } from 'react';

let mockLanguages: any[] = [];
let mockIsLoading = true;
const mockIsMobile = jest.fn(() => false);

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => mockIsMobile()
}));

jest.mock('@hooks/queries/useAdminQueries', () => ({
  useGetAllProgrammingLanguages: () => ({
    data: mockLanguages,
    isLoading: mockIsLoading
  })
}));

const mockAdd = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();
jest.mock('@hooks/mutations/useAdminMutations', () => ({
  useAddProgrammingLanguage: () => ({ mutateAsync: mockAdd, isPending: false }),
  useUpdateProgrammingLanguage: () => ({
    mutateAsync: mockUpdate,
    isPending: false
  }),
  useDeleteProgrammingLanguage: () => ({
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

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
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
    Modal: ({
      opened,
      children,
      title
    }: {
      opened: boolean;
      children: React.ReactNode;
      title: React.ReactNode;
    }) =>
      opened ? (
        <div data-testid='modal'>
          <div>{title}</div>
          {children}
        </div>
      ) : null
  };
});

import ProgrammingLanguagesTable from '../ProgrammingLanguagesTable';

const renderTable = (showBackButton = false) => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter>
          <ProgrammingLanguagesTable showBackButton={showBackButton} />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const mockLanguageData = [
  { _id: 'l1', languageName: 'JavaScript' },
  { _id: 'l2', languageName: 'TypeScript' },
  { _id: 'l3', languageName: 'Node JS' }
];

describe('ProgrammingLanguagesTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsMobile.mockReturnValue(false);
    mockAdd.mockReset().mockResolvedValue({
      success: true,
      message: 'Programming language added successfully !'
    });
    mockUpdate.mockReset().mockResolvedValue({
      success: true,
      message: 'Programming language updated successfully !'
    });
    mockDelete.mockReset().mockResolvedValue({
      success: true,
      message: 'Programming language deleted successfully !'
    });
    mockLanguages = [];
    mockIsLoading = false;
  });

  it('renders the page header', () => {
    renderTable();
    expect(
      screen.getByText('Programming Languages', { selector: 'h2' })
    ).toBeInTheDocument();
  });

  it('renders the data rows', () => {
    mockLanguages = mockLanguageData;
    renderTable();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node JS')).toBeInTheDocument();
  });

  it('renders table column headers', () => {
    mockLanguages = mockLanguageData;
    renderTable();
    expect(screen.getByText('S.No')).toBeInTheDocument();
    expect(screen.getByText('Programming Language')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('shows the search input', () => {
    renderTable();
    expect(
      screen.getByPlaceholderText('Search languages...')
    ).toBeInTheDocument();
  });

  it('filters by search query', () => {
    mockLanguages = mockLanguageData;
    renderTable();
    const search = screen.getByPlaceholderText('Search languages...');
    fireEvent.change(search, { target: { value: 'Type' } });
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.queryByText('JavaScript')).not.toBeInTheDocument();
  });

  it('shows the empty state on mobile when there are no languages', () => {
    mockIsMobile.mockReturnValue(true);
    renderTable();
    expect(
      screen.getByText('No programming languages found')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Start by adding your first language')
    ).toBeInTheDocument();
  });

  it('adds a new programming language', async () => {
    renderTable();
    fireEvent.click(
      screen.getAllByRole('button', { name: /Add Language/i })[0]
    );
    expect(screen.getByText('Add Programming Language')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Enter the programming language');
    fireEvent.change(input, { target: { value: 'Python' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Add'));
    });

    expect(mockAdd).toHaveBeenCalledWith({ languageName: 'Python' });
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Programming language added successfully !'
    );
  });

  it('edits an existing programming language', async () => {
    mockLanguages = [{ _id: 'l1', languageName: 'JavaScript' }];
    renderTable();

    fireEvent.click(screen.getAllByRole('button', { name: '' })[0]);
    expect(screen.getByText('Edit Programming Language')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Enter the programming language');
    fireEvent.change(input, { target: { value: 'JavaScript ES6' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
    });

    expect(mockUpdate).toHaveBeenCalledWith({
      id: 'l1',
      languageName: 'JavaScript ES6'
    });
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Programming language updated successfully !'
    );
  });

  it('toasts the backend message when the add mutation fails', async () => {
    mockAdd.mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        data: {
          message: 'An error occurred while adding programming language !'
        }
      }
    });
    renderTable();
    fireEvent.click(
      screen.getAllByRole('button', { name: /Add Language/i })[0]
    );
    const input = screen.getByPlaceholderText('Enter the programming language');
    fireEvent.change(input, { target: { value: 'Python' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Add'));
    });

    expect(mockShowErrorToast).toHaveBeenCalledWith(
      'An error occurred while adding programming language !'
    );
  });

  it('does not render the Back button by default', () => {
    renderTable();
    expect(
      screen.queryByRole('button', { name: 'Back' })
    ).not.toBeInTheDocument();
  });

  it('renders the Back button when showBackButton is set', () => {
    renderTable(true);
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  it('navigates back when the Back button is clicked', () => {
    renderTable(true);
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('deletes a programming language after confirmation', async () => {
    mockLanguages = [{ _id: 'l1', languageName: 'JavaScript' }];
    renderTable();

    fireEvent.click(screen.getAllByRole('button', { name: '' })[0]);
    expect(screen.getByText('Edit Programming Language')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Delete'));
    expect(screen.getByText('Delete Programming Language')).toBeInTheDocument();

    await act(async () => {
      const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
      fireEvent.click(deleteButtons[deleteButtons.length - 1]);
    });

    expect(mockDelete).toHaveBeenCalledWith('l1');
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Programming language deleted successfully !'
    );
  });
});
