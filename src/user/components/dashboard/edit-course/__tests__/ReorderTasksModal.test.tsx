import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import ReorderTasksModal from '../ReorderTasksModal';

const mockReorderTasks = jest.fn();

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useReorderCourseTasks: () => ({
    mutateAsync: mockReorderTasks,
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
        <div data-testid='reorder-tasks-modal'>
          <h2>{title}</h2>
          {children}
        </div>
      ) : null
  };
});

const mockOnClose = jest.fn();

const makeModule = () => ({
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
    },
    {
      _id: 't2',
      taskName: 'Reading material',
      taskDescription: '',
      status: 'ACTIVE',
      type: 'FILE'
    },
    {
      _id: 't3',
      taskName: 'Deep dive',
      taskDescription: '',
      status: 'ACTIVE',
      type: 'LINK'
    }
  ]
});

const renderModal = (opened = true) =>
  render(
    <MantineProvider>
      <ReorderTasksModal
        opened={opened}
        onClose={mockOnClose}
        courseId='c1'
        module={makeModule()}
      />
    </MantineProvider>
  );

const dragTask = (fromId: string, toId: string) => {
  const dataTransfer = {
    effectAllowed: 'none',
    dropEffect: 'none',
    setData: jest.fn(),
    getData: jest.fn()
  };
  const source = screen.getByTestId(`task-${fromId}`);
  const target = screen.getByTestId(`task-${toId}`);

  fireEvent.dragStart(source, { dataTransfer });
  fireEvent.dragOver(target, { dataTransfer });
  fireEvent.drop(target, { dataTransfer });
  fireEvent.dragEnd(source, { dataTransfer });
};

describe('ReorderTasksModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockReorderTasks.mockResolvedValue({ success: true });
  });

  it('renders nothing when closed', () => {
    renderModal(false);
    expect(screen.queryByTestId('reorder-tasks-modal')).not.toBeInTheDocument();
  });

  it('lists only the tasks of the selected module', () => {
    renderModal();

    expect(screen.getByText('Intro video')).toBeInTheDocument();
    expect(screen.getByText('Reading material')).toBeInTheDocument();
    expect(screen.getByText('Deep dive')).toBeInTheDocument();
  });

  it('keeps Save disabled until something moves', () => {
    renderModal();

    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeDisabled();
  });

  it('makes every task draggable', () => {
    renderModal();

    expect(screen.getByTestId('task-t1')).toHaveAttribute('draggable', 'true');
    expect(screen.getByTestId('task-t2')).toHaveAttribute('draggable', 'true');
    expect(screen.getByTestId('task-t3')).toHaveAttribute('draggable', 'true');
  });

  it('saves the new task order', async () => {
    renderModal();

    dragTask('t2', 't1');
    dragTask('t3', 't1');
    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

    await waitFor(() => {
      expect(mockReorderTasks).toHaveBeenCalledWith({
        moduleId: 'm1',
        tasks: [
          { taskId: 't2', orderIdx: 1 },
          { taskId: 't3', orderIdx: 2 },
          { taskId: 't1', orderIdx: 3 }
        ]
      });
    });
    expect(mockShowSuccessToast).toHaveBeenCalledWith('Task order updated.');
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('keeps the modal open and reports the error when saving fails', async () => {
    mockReorderTasks.mockRejectedValue(new Error('Network error'));
    renderModal();

    dragTask('t2', 't1');
    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith('Network error');
    });
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('closes without saving when Cancel is clicked', () => {
    renderModal();

    dragTask('t2', 't1');
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(mockReorderTasks).not.toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });
});
