import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import ReorderModulesModal from '../ReorderModulesModal';

const mockReorderModules = jest.fn();

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useReorderCourseModules: () => ({
    mutateAsync: mockReorderModules,
    isPending: false
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

jest.mock('@utils/common/get-error-message', () => ({
  getErrorMessage: (error: any, fallback: string) =>
    error?.response?.data?.message || error?.message || fallback
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      headerBackgroundColor: '#f8f9fa',
      cardBackground: '#ffffff',
      borderColor: '#dee2e6'
    }
  })
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, disabled, loading }: any) => (
    <button type='button' onClick={onClick} disabled={disabled}>
      {loading ? 'Saving...' : children}
    </button>
  )
}));

jest.mock('@mantine/core', () => {
  const actual = jest.requireActual('@mantine/core');
  return {
    ...actual,
    Modal: ({ opened, children, title }: any) =>
      opened ? (
        <div data-testid='reorder-modal'>
          <h2>{title}</h2>
          {children}
        </div>
      ) : null
  };
});

const mockOnClose = jest.fn();

const makeModules = () => [
  {
    _id: 'm1',
    moduleName: 'Fundamentals',
    moduleDescription: '',
    status: 'ACTIVE',
    tasks: [
      {
        _id: 't1',
        taskName: 'Intro video',
        taskDescription: '',
        status: 'ACTIVE',
        type: 'LINK'
      }
    ]
  },
  {
    _id: 'm2',
    moduleName: 'Advanced',
    moduleDescription: '',
    status: 'ACTIVE',
    tasks: []
  }
];

const renderModal = (opened = true) =>
  render(
    <MantineProvider>
      <ReorderModulesModal
        opened={opened}
        onClose={mockOnClose}
        courseId='c1'
        modules={makeModules()}
      />
    </MantineProvider>
  );

const dragModule = (fromId: string, toId: string) => {
  const dataTransfer = {
    effectAllowed: 'none',
    dropEffect: 'none',
    setData: jest.fn(),
    getData: jest.fn()
  };
  const source = screen.getByTestId(`module-${fromId}`);
  const target = screen.getByTestId(`module-${toId}`);

  fireEvent.dragStart(source, { dataTransfer });
  fireEvent.dragOver(target, { dataTransfer });
  fireEvent.drop(target, { dataTransfer });
  fireEvent.dragEnd(source, { dataTransfer });
};

describe('ReorderModulesModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockReorderModules.mockResolvedValue({ success: true });
  });

  it('renders nothing when closed', () => {
    renderModal(false);
    expect(screen.queryByTestId('reorder-modal')).not.toBeInTheDocument();
  });

  it('lists every module but not its tasks', () => {
    renderModal();

    expect(screen.getByText('Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('Advanced')).toBeInTheDocument();
    expect(screen.queryByText('Intro video')).not.toBeInTheDocument();
  });

  it('keeps Save disabled until something moves', () => {
    renderModal();

    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeDisabled();
  });

  it('makes every module draggable', () => {
    renderModal();

    expect(screen.getByTestId('module-m1')).toHaveAttribute(
      'draggable',
      'true'
    );
    expect(screen.getByTestId('module-m2')).toHaveAttribute(
      'draggable',
      'true'
    );
  });

  it('saves the new module order', async () => {
    renderModal();

    dragModule('m2', 'm1');
    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

    await waitFor(() => {
      expect(mockReorderModules).toHaveBeenCalledWith({
        courseId: 'c1',
        modules: [
          { moduleId: 'm2', orderIdx: 1 },
          { moduleId: 'm1', orderIdx: 2 }
        ]
      });
    });
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Module order updated.'
    );
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('keeps the modal open and reports the error when saving fails', async () => {
    mockReorderModules.mockRejectedValue(new Error('Network error'));
    renderModal();

    dragModule('m2', 'm1');
    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith('Network error');
    });
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('closes without saving when Cancel is clicked', () => {
    renderModal();

    dragModule('m2', 'm1');
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(mockReorderModules).not.toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });
});
