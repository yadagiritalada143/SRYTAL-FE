import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

const mockAddTasks = jest.fn();
jest.mock('@services/admin-services', () => ({
  addTasksByAdmin: (...args: any[]) => mockAddTasks(...args)
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

import AddTasksPackage from '../add-tasks';

const fetchPackageDetails = jest.fn();

const renderAddTasks = (props: any = {}) => {
  return render(
    <MantineProvider>
      <AddTasksPackage
        organizationConfig={{ organization_name: 'srytal' } as any}
        user={{} as any}
        packageId='pkg1'
        required={true}
        fetchPackageDetails={fetchPackageDetails}
        {...props}
      />
    </MantineProvider>
  );
};

describe('AddTasksPackage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the section title and textarea', () => {
    renderAddTasks();
    expect(screen.getByText('Add New Task')).toBeInTheDocument();
    expect(screen.getByText('Task Description')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter task details...')
    ).toBeInTheDocument();
  });

  it('keeps the add button disabled while the textarea is empty when required', () => {
    renderAddTasks();
    const addButton = screen.getByRole('button', { name: 'Add Task' });
    expect(addButton).toBeDisabled();
  });

  it('enables the add button when required is false and the textarea is empty', () => {
    renderAddTasks({ required: false });
    expect(
      screen.getByRole('button', { name: 'Add Task' })
    ).not.toBeDisabled();
  });

  it('adds a task and refreshes package details', async () => {
    mockAddTasks.mockResolvedValue({});
    renderAddTasks();

    const textarea = screen.getByPlaceholderText('Enter task details...');
    fireEvent.change(textarea, { target: { value: '  Write intro module  ' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));
    });

    expect(mockAddTasks).toHaveBeenCalledWith('pkg1', 'Write intro module');
    expect(mockShowSuccessToast).toHaveBeenCalledWith('Task added successfully!');
    expect(fetchPackageDetails).toHaveBeenCalledTimes(1);
    expect((textarea as HTMLTextAreaElement).value).toBe('');
  });

  it('submits the trimmed description when required is false', async () => {
    mockAddTasks.mockResolvedValue({});
    renderAddTasks({ required: false });

    const textarea = screen.getByPlaceholderText('Enter task details...');
    fireEvent.change(textarea, { target: { value: '  optional description  ' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));
    });

    expect(mockAddTasks).toHaveBeenCalledWith('pkg1', 'optional description');
  });

  it('toasts an error when the api call fails', async () => {
    mockAddTasks.mockRejectedValue({
      response: { data: { message: 'Backend refused' } }
    });
    renderAddTasks();

    const textarea = screen.getByPlaceholderText('Enter task details...');
    fireEvent.change(textarea, { target: { value: 'task' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));
    });

    expect(mockToastError).toHaveBeenCalledWith('Backend refused');
  });
});