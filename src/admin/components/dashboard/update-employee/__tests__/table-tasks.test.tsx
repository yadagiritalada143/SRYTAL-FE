import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';

const mockGetEmployeePackagesByAdmin = jest.fn();
const mockDeleteEmployeePackagesByAdmin = jest.fn();
const mockUpdateTaskByAdmin = jest.fn();
const mockDeleteEmployeeTasksByAdmin = jest.fn();
const mockToastError = jest.fn();
const mockToastSuccess = jest.fn();

jest.mock('@mantine/core', () => {
  const actual = jest.requireActual('@mantine/core');
  return {
    ...actual,
    Modal: ({ opened, title, onClose, children }: any) =>
      opened ? (
        <div data-testid='mantine-modal'>
          <div>{title}</div>
          {children}
          <button onClick={onClose}>modal-close</button>
        </div>
      ) : null
  };
});

jest.mock('@services/admin-services', () => ({
  getEmployeePackagesByAdmin: (...args: any[]) =>
    mockGetEmployeePackagesByAdmin(...args),
  deleteEmployeePackagesByAdmin: (...args: any[]) =>
    mockDeleteEmployeePackagesByAdmin(...args),
  updateTaskByAdmin: (...args: any[]) => mockUpdateTaskByAdmin(...args),
  deleteEmployeeTasksByAdmin: (...args: any[]) =>
    mockDeleteEmployeeTasksByAdmin(...args)
}));

jest.mock('react-toastify', () => ({
  toast: {
    error: (...args: any[]) => mockToastError(...args),
    success: (...args: any[]) => mockToastSuccess(...args)
  }
}));

jest.mock('@components/common/loaders/DataView', () => ({
  __esModule: true,
  default: ({ children, isLoading, label }: any) => (
    <div>{isLoading ? `Loading ${label}` : children}</div>
  )
}));

jest.mock('@components/common/button/CommonButton', () => ({
  __esModule: true,
  CommonButton: (props: any) => (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#1c7ed6', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

import PackagesTaskTable from '../table-tasks';

const mockPackages = {
  employeeId: 'emp1',
  packages: [
    {
      packageId: 'pkgA',
      title: 'Onboarding',
      tasks: [
        { taskId: 't1', _id: 't1', title: 'Intro' },
        { taskId: 't2', _id: 't2', title: 'Advanced' }
      ]
    },
    {
      packageId: 'pkgB',
      title: 'Compliance',
      tasks: [{ taskId: 't3', _id: 't3', title: 'Safety' }]
    }
  ]
};

const mockRefreshedPackages = {
  employeeId: 'emp1',
  packages: mockPackages.packages.map(pkg =>
    pkg.packageId === 'pkgA'
      ? {
          ...pkg,
          tasks: pkg.tasks.map(task =>
            task.taskId === 't1' ? { ...task, title: 'Intro v2' } : task
          )
        }
      : pkg
  )
};

const renderTable = (data: any = mockPackages) =>
  render(
    <MantineProvider>
      <PackagesTaskTable
        selectedPackagesData={data}
        tasks={[]}
        employeeId='emp1'
      />
    </MantineProvider>
  );

const allButtons = () => screen.getAllByRole('button');

describe('PackagesTaskTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetEmployeePackagesByAdmin.mockResolvedValue(mockRefreshedPackages);
    mockDeleteEmployeePackagesByAdmin.mockResolvedValue({});
    mockUpdateTaskByAdmin.mockResolvedValue({});
    mockDeleteEmployeeTasksByAdmin.mockResolvedValue({});
  });

  it('renders stats, packages and auto-expanded tasks', () => {
    renderTable();

    expect(screen.getByText('Total Packages')).toBeInTheDocument();
    expect(screen.getByText('Onboarding')).toBeInTheDocument();
    expect(screen.getByText('Compliance')).toBeInTheDocument();
    expect(screen.getByText('Intro')).toBeInTheDocument();
    expect(screen.getByText('Advanced')).toBeInTheDocument();
    expect(screen.getByText('Safety')).toBeInTheDocument();
    expect(screen.getByText('Tasks (2)')).toBeInTheDocument();
    expect(screen.getAllByText('Expanded')).toHaveLength(2);
  });

  it('filters packages by search term and clears the search', () => {
    renderTable();
    const searchInput = screen.getByPlaceholderText(
      'Search packages or tasks...'
    );

    fireEvent.change(searchInput, { target: { value: 'Intro' } });
    expect(screen.getByText('Onboarding')).toBeInTheDocument();
    expect(screen.queryByText('Compliance')).not.toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'zzz' } });
    expect(screen.getByText('No matching packages found')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear Search' }));
    expect(screen.getByText('Onboarding')).toBeInTheDocument();
  });

  it('shows an empty state when no packages are assigned', () => {
    renderTable({});

    expect(screen.getByText('No packages assigned yet')).toBeInTheDocument();
    expect(
      screen.getByText('Assign packages to this employee to get started.')
    ).toBeInTheDocument();
  });

  it('collapses and expands all packages', () => {
    renderTable();

    fireEvent.click(allButtons()[1]);
    expect(screen.queryByText('Intro')).not.toBeInTheDocument();
    expect(screen.getAllByText('Collapsed')).toHaveLength(2);

    fireEvent.click(allButtons()[0]);
    expect(screen.getByText('Intro')).toBeInTheDocument();
    expect(screen.getAllByText('Expanded')).toHaveLength(2);
  });

  it('edits a task title through the edit modal', async () => {
    renderTable();

    await act(async () => {
      fireEvent.click(allButtons()[4]);
    });

    expect(screen.getByText('Edit Task')).toBeInTheDocument();
    const taskNameInput = screen.getByRole('textbox', { name: /task name/i });
    expect(taskNameInput).toHaveValue('Intro');

    fireEvent.change(taskNameInput, { target: { value: 'Intro v2' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));
    });

    await waitFor(() =>
      expect(mockUpdateTaskByAdmin).toHaveBeenCalledWith('t1', 'Intro v2')
    );
    expect(mockGetEmployeePackagesByAdmin).toHaveBeenCalledWith('emp1');
    expect(mockToastSuccess).toHaveBeenCalledWith(
      'Task updated successfully',
      expect.anything()
    );
    expect(screen.queryByText('Edit Task')).not.toBeInTheDocument();
    expect(screen.getByText('Intro v2')).toBeInTheDocument();
  });

  it('keeps Save disabled while the task title is empty', async () => {
    renderTable();

    await act(async () => {
      fireEvent.click(allButtons()[4]);
    });

    const taskNameInput = screen.getByRole('textbox', { name: /task name/i });
    fireEvent.change(taskNameInput, { target: { value: '' } });

    const saveButton = screen.getByRole('button', { name: 'Save Changes' });
    expect(saveButton).toBeDisabled();

    fireEvent.change(taskNameInput, { target: { value: 'Intro v2' } });
    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeEnabled();
  });

  it('deletes a package after confirmation', async () => {
    renderTable();

    await act(async () => {
      fireEvent.click(allButtons()[3]);
    });

    expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to delete this package?')
    ).toBeInTheDocument();
    expect(screen.getAllByText('Onboarding').length).toBeGreaterThanOrEqual(1);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Delete package' }));
    });

    await waitFor(() =>
      expect(mockDeleteEmployeePackagesByAdmin).toHaveBeenCalledWith(
        'emp1',
        'pkgA'
      )
    );
    expect(mockToastSuccess).toHaveBeenCalledWith(
      'Package deleted successfully',
      expect.anything()
    );
    expect(screen.queryByTestId('mantine-modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Onboarding')).not.toBeInTheDocument();
    expect(screen.getByText('Compliance')).toBeInTheDocument();
  });

  it('deletes a task after confirmation', async () => {
    renderTable();

    await act(async () => {
      fireEvent.click(allButtons()[5]);
    });

    expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to delete this task?')
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Delete task' }));
    });

    await waitFor(() =>
      expect(mockDeleteEmployeeTasksByAdmin).toHaveBeenCalledWith(
        'emp1',
        'pkgA',
        't1'
      )
    );
    expect(mockToastSuccess).toHaveBeenCalledWith(
      'Task deleted successfully',
      expect.anything()
    );
    expect(screen.queryByTestId('mantine-modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Intro')).not.toBeInTheDocument();
    expect(screen.getByText('Onboarding')).toBeInTheDocument();
    expect(screen.getAllByText('Tasks (1)').length).toBeGreaterThanOrEqual(1);
  });

  it('cancels the delete confirmation', async () => {
    renderTable();

    await act(async () => {
      fireEvent.click(allButtons()[3]);
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    });

    expect(screen.queryByTestId('mantine-modal')).not.toBeInTheDocument();
    expect(mockDeleteEmployeePackagesByAdmin).not.toHaveBeenCalled();
    expect(screen.getByText('Onboarding')).toBeInTheDocument();
  });

  it('shows an error alert and toasts when a deletion fails', async () => {
    mockDeleteEmployeePackagesByAdmin.mockRejectedValue({
      response: { data: { message: 'Cannot delete' } }
    });
    renderTable();

    await act(async () => {
      fireEvent.click(allButtons()[3]);
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Delete package' }));
    });

    await waitFor(() =>
      expect(mockToastError).toHaveBeenCalledWith(
        'Cannot delete',
        expect.anything()
      )
    );
    expect(screen.getByText('Cannot delete')).toBeInTheDocument();
    expect(screen.getByTestId('mantine-modal')).toBeInTheDocument();
  });

  it('toasts when a task update fails', async () => {
    mockUpdateTaskByAdmin.mockRejectedValue({
      response: { data: { message: 'Bad update' } }
    });
    renderTable();

    await act(async () => {
      fireEvent.click(allButtons()[4]);
    });

    const taskNameInput = screen.getByRole('textbox', { name: /task name/i });
    fireEvent.change(taskNameInput, { target: { value: 'Intro v2' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));
    });

    await waitFor(() =>
      expect(mockToastError).toHaveBeenCalledWith(
        'Bad update',
        expect.anything()
      )
    );
    expect(screen.getByText('Edit Task')).toBeInTheDocument();
  });
});
