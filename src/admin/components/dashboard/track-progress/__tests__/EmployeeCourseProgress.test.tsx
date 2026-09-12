import { render, screen, fireEvent, act, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

let mockAssignments: any[] = [];
let mockDetail: any = null;

jest.mock('@hooks/queries/useAdminQueries', () => ({
  useGetAllCourseAssignments: () => ({
    data: mockAssignments,
    isLoading: false
  }),
  useGetCourseAssignmentDetails: () => ({
    data: mockDetail,
    isLoading: false
  })
}));

const mockUpdateDue = jest.fn();
const mockUnassign = jest.fn();
jest.mock('@hooks/mutations/useAdminMutations', () => ({
  useUpdateCourseAssignmentDueDate: () => ({
    mutateAsync: mockUpdateDue,
    isPending: false
  }),
  useUnassignCourse: () => ({
    mutateAsync: mockUnassign,
    isPending: false
  })
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ organization: 'srytal', employeeId: 'emp1' })
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
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
  getErrorMessage: (_e: any, fallback: string) => fallback
}));

jest.mock('@utils/common/constants', () => ({
  organizationAdminUrls: () => '/srytal/admin'
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

jest.mock('@mantine/dates', () => ({
  DatePickerInput: ({ value, onChange }: any) => (
    <input
      data-testid='due-date-input'
      value={value ? new Date(value).toISOString().slice(0, 10) : ''}
      onChange={e => onChange(e.target.value ? new Date(e.target.value) : null)}
    />
  )
}));

import EmployeeCourseProgress from '../EmployeeCourseProgress';

const renderComponent = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter>
          <EmployeeCourseProgress />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const employee = {
  employeeId: 'emp1',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@test.com',
  employeeCode: 'E001'
};

const mockAssignmentData = [
  {
    courseAssignmentId: 'ca1',
    courseId: 'c1',
    courseName: 'Onboarding Course',
    courseDescription: 'desc',
    employee,
    status: 'In Progress',
    assignedAt: '2024-01-01T00:00:00.000Z',
    dueDate: '',
    completedAt: null,
    isOverdue: false,
    totalModules: 2,
    progress: { totalTasks: 2, completedTasks: 1, percentComplete: 50 }
  },
  {
    courseAssignmentId: 'ca2',
    courseId: 'c2',
    courseName: 'Sales Training',
    courseDescription: 'desc',
    employee,
    status: 'Completed',
    assignedAt: '2024-01-02T00:00:00.000Z',
    dueDate: '2024-12-25T00:00:00.000Z',
    completedAt: '2024-02-10T00:00:00.000Z',
    isOverdue: false,
    totalModules: 1,
    progress: { totalTasks: 1, completedTasks: 1, percentComplete: 100 }
  },
  {
    courseAssignmentId: 'ca3',
    courseId: 'c3',
    courseName: 'Leadership',
    courseDescription: 'desc',
    employee,
    status: 'Assigned',
    assignedAt: '2024-01-03T00:00:00.000Z',
    dueDate: '',
    completedAt: null,
    isOverdue: false,
    totalModules: 4,
    progress: { totalTasks: 4, completedTasks: 0, percentComplete: 0 }
  }
];

const mockDetailData = {
  employee,
  course: {
    courseAssignmentId: 'ca1',
    courseId: 'c1',
    courseName: 'Onboarding Course',
    status: 'In Progress',
    assignedAt: '2024-01-01T00:00:00.000Z',
    dueDate: '2024-12-01T00:00:00.000Z',
    completedAt: null,
    isOverdue: false,
    totalModules: 1,
    progress: { totalTasks: 2, completedTasks: 1, percentComplete: 50 },
    modules: [
      {
        _id: 'm1',
        moduleName: 'Intro Module',
        totalTasks: 2,
        completedTasks: 1,
        tasks: [
          {
            _id: 't1',
            taskName: 'Welcome',
            type: 'link',
            isCompleted: true,
            completedAt: null
          },
          {
            _id: 't2',
            taskName: 'Assessment',
            type: 'file',
            isCompleted: false
          }
        ]
      }
    ]
  }
};

const firstDataRow = () => screen.getAllByRole('row').slice(1)[0];

describe('EmployeeCourseProgress', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAssignments = mockAssignmentData;
    mockDetail = mockDetailData;
    mockUpdateDue.mockResolvedValue({});
    mockUnassign.mockResolvedValue({ message: 'Course un-assigned!' });
  });

  it('renders the header and employee card', () => {
    renderComponent();
    expect(screen.getByText('Employee Course Progress')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('E001 · jane@test.com')).toBeInTheDocument();
  });

  it('renders each course row with status and progress', () => {
    renderComponent();
    expect(screen.getByText('Onboarding Course')).toBeInTheDocument();
    expect(screen.getByText('Sales Training')).toBeInTheDocument();
    expect(screen.getByText('Leadership')).toBeInTheDocument();
    expect(screen.getAllByText('In Progress').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Completed').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Assigned')).toBeInTheDocument();
    expect(screen.getByText('1/2 tasks')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('2 module(s)')).toBeInTheDocument();
  });

  it('shows the formatted due date or a dash when missing', () => {
    renderComponent();
    expect(screen.getByText('Dec 25, 2024')).toBeInTheDocument();
    expect(screen.getAllByText('—').length).toBeGreaterThanOrEqual(2);
  });

  it('shows the empty state when the employee has no assignments', () => {
    mockAssignments = [];
    renderComponent();
    expect(
      screen.getByText('No courses assigned to this employee')
    ).toBeInTheDocument();
  });

  it('sorts the rows by status when the header is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByText('Status'));
    expect(firstDataRow().textContent).toContain('Leadership');
  });

  it('opens the detail modal with module and task info', () => {
    renderComponent();
    fireEvent.click(screen.getByText('Onboarding Course'));

    expect(screen.getAllByText('Due Date').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Intro Module')).toBeInTheDocument();
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Assessment')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(screen.getByText('link')).toBeInTheDocument();
    expect(screen.getByText('file')).toBeInTheDocument();
  });

  it('updates the due date from the detail modal', async () => {
    renderComponent();
    fireEvent.click(screen.getByText('Onboarding Course'));

    const saveButton = screen.getByRole('button', { name: 'Save' });
    expect(saveButton).toBeDisabled();

    const dateInput = screen.getByTestId('due-date-input');
    await act(async () => {
      fireEvent.change(dateInput, { target: { value: '2025-02-10' } });
    });

    expect(saveButton).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(saveButton);
    });

    expect(mockUpdateDue).toHaveBeenCalledWith({
      courseAssignmentId: 'ca1',
      dueDate: '2025-02-10T00:00:00.000Z'
    });
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Due date updated successfully'
    );
    expect(screen.queryByTestId('due-date-input')).not.toBeInTheDocument();
  });

  it('blocks due date edits on completed courses', () => {
    mockDetail = {
      ...mockDetailData,
      course: {
        ...mockDetailData.course,
        status: 'Completed',
        progress: { totalTasks: 1, completedTasks: 1, percentComplete: 100 }
      }
    };
    renderComponent();
    fireEvent.click(screen.getByText('Sales Training'));

    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
    expect(
      screen.getByText('Due date cannot be changed for a completed course.')
    ).toBeInTheDocument();
  });

  it('shows an error toast when the due date update fails', async () => {
    mockUpdateDue.mockRejectedValue(new Error('fail'));
    renderComponent();
    fireEvent.click(screen.getByText('Onboarding Course'));

    const saveButton = screen.getByRole('button', { name: 'Save' });
    await act(async () => {
      fireEvent.change(screen.getByTestId('due-date-input'), {
        target: { value: '2025-02-10' }
      });
    });
    await act(async () => {
      fireEvent.click(saveButton);
    });

    expect(mockShowErrorToast).toHaveBeenCalledWith(
      'Failed to update due date'
    );
  });

  it('un-assigns a course through the confirmation modal', async () => {
    renderComponent();

    const rowButtons = within(firstDataRow()).getAllByRole('button');
    await act(async () => {
      fireEvent.click(rowButtons[0]);
    });

    expect(
      screen.getByText(/Are you sure you want to un-assign/)
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Un-assign' }));
    });

    expect(mockUnassign).toHaveBeenCalledWith('ca1');
    expect(mockShowSuccessToast).toHaveBeenCalledWith('Course un-assigned!');
    expect(
      screen.queryByText(/Are you sure you want to un-assign/)
    ).not.toBeInTheDocument();
  });

  it('shows an error toast when un-assigning fails', async () => {
    mockUnassign.mockRejectedValue(new Error('fail'));
    renderComponent();

    const rowButtons = within(firstDataRow()).getAllByRole('button');
    await act(async () => {
      fireEvent.click(rowButtons[0]);
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Un-assign' }));
    });

    expect(mockShowErrorToast).toHaveBeenCalledWith(
      'Failed to un-assign course'
    );
  });

  it('navigates back to the track progress page', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(mockNavigate).toHaveBeenCalledWith(
      '/srytal/admin/dashboard/track-progress'
    );
  });
});
