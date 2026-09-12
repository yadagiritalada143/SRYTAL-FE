import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

const mockDeleteTask = jest.fn();
const mockUpdateTask = jest.fn();
jest.mock('@services/admin-services', () => ({
  deleteTaskByAdmin: (...args: any[]) => mockDeleteTask(...args),
  updateTaskByAdmin: (...args: any[]) => mockUpdateTask(...args)
}));

const mockShowSuccessToast = jest.fn();
jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: mockShowSuccessToast,
    showErrorToast: jest.fn()
  })
}));

const mockToastError = jest.fn();
jest.mock('react-toastify', () => ({
  toast: { error: (...args: any[]) => mockToastError(...args) }
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
      accentColor: '#495057',
      dangerColor: '#e03131',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('../delete-task', () => ({
  DeleteTaskModel: ({
    opened,
    handleDeleteTask,
    selectedTask,
    agreeTerms,
    close
  }: any) =>
    opened ? (
      <div data-testid='delete-task-model'>
        <button
          type='button'
          onClick={() => handleDeleteTask(selectedTask, agreeTerms)}
        >
          confirm-delete
        </button>
        <button type='button' onClick={close}>
          modal-close
        </button>
      </div>
    ) : null
}));

jest.mock('@mantine/core', () => {
  const actual = jest.requireActual('@mantine/core');
  return {
    ...actual,
    Modal: ({ opened, title, onClose, children }: any) =>
      opened ? (
        <div data-testid='mantine-modal'>
          <div>{title}</div>
          {children}
          <button type='button' onClick={onClose}>
            modal-close
          </button>
        </div>
      ) : null
  };
});

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

import PackageTasksTable from '../tasks';

const fetchPackageDetails = jest.fn();

const mockTasks = [
  {
    _id: 'task-1',
    title: 'Write Intro',
    createdAt: '2024-01-10T09:00:00.000Z',
    createdBy: { firstName: 'Jane', lastName: 'Doe' }
  },
  {
    _id: 'task-2',
    title: 'Record Video',
    createdAt: '2024-02-15T10:30:00.000Z',
    createdBy: { firstName: 'John', lastName: 'Smith' }
  }
];

const renderTable = (tasks: any[] = mockTasks) => {
  return render(
    <MantineProvider>
      <PackageTasksTable
        organizationConfig={{ organization_name: 'srytal' } as any}
        tasks={tasks}
        fetchPackageDetails={fetchPackageDetails}
      />
    </MantineProvider>
  );
};

describe('PackageTasksTable (update-package)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the task count in the header', () => {
    renderTable();
    expect(
      screen.getByText('Package Tasks (2)')
    ).toBeInTheDocument();
  });

  it('renders each task title and created by name', () => {
    renderTable();
    expect(screen.getByText('Write Intro')).toBeInTheDocument();
    expect(screen.getByText('Record Video')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('John Smith')).toBeInTheDocument();
  });

  it('shows the created at date', () => {
    renderTable([mockTasks[0]]);
    expect(screen.getByText(/Jan 10, 2024/)).toBeInTheDocument();
  });

  it('shows an empty state when there are no tasks', () => {
    renderTable([]);
    expect(screen.getByText('No tasks available')).toBeInTheDocument();
    expect(
      screen.getByText('Add your first task to get started')
    ).toBeInTheDocument();
  });

  it('opens the edit modal and updates the task title', async () => {
    const fetchMock = fetchPackageDetails;
    mockUpdateTask.mockResolvedValue({});
    renderTable([mockTasks[0]]);

    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByText('Edit Task')).toBeInTheDocument();

    const titleInput = screen.getByPlaceholderText('Enter task title');
    fireEvent.change(titleInput, { target: { value: 'Write Advanced Intro' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));
    });

    expect(mockUpdateTask).toHaveBeenCalledWith('task-1', 'Write Advanced Intro');
    expect(mockShowSuccessToast).toHaveBeenCalledWith('Task updated successfully');
    expect(fetchMock).toHaveBeenCalled();
  });

  it('deletes a task through the confirmation modal', async () => {
    mockDeleteTask.mockResolvedValue({});
    renderTable([mockTasks[0]]);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[buttons.length - 1]);
    expect(screen.getByTestId('delete-task-model')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText('confirm-delete'));
    });

    expect(mockDeleteTask).toHaveBeenCalledWith('task-1', false);
    expect(mockShowSuccessToast).toHaveBeenCalledWith('Task deleted successfully');
    expect(fetchPackageDetails).toHaveBeenCalled();
    expect(screen.queryByText('Write Intro')).not.toBeInTheDocument();
  });

  it('toasts an error when updating fails', async () => {
    mockUpdateTask.mockRejectedValue(new Error('fail'));
    renderTable([mockTasks[0]]);

    fireEvent.click(screen.getAllByRole('button')[0]);
    const titleInput = screen.getByPlaceholderText('Enter task title');
    fireEvent.change(titleInput, { target: { value: 'New Title' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));
    });

    expect(mockToastError).toHaveBeenCalledWith('Failed to update task');
  });

  it('toasts an error when deleting fails', async () => {
    mockDeleteTask.mockRejectedValue(new Error('fail'));
    renderTable([mockTasks[0]]);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[buttons.length - 1]);

    await act(async () => {
      fireEvent.click(screen.getByText('confirm-delete'));
    });

    expect(mockToastError).toHaveBeenCalledWith('Failed to delete task');
  });
});