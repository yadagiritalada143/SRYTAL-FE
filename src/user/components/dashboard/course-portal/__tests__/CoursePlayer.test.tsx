import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import CoursePlayer from '../CoursePlayer';
import { AssignedCourseDetail } from '@interfaces/course-assignment';

let mockCourse: AssignedCourseDetail | null | undefined = undefined;
let mockIsLoading = false;
let mockError: any = null;
let mockMutateFn: jest.Mock = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ courseAssignmentId: 'ca1' }),
  useNavigate: () => mockNavigate
}));

jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetMyAssignedCourse: () => ({
    data: mockCourse,
    isLoading: mockIsLoading,
    error: mockError,
    refetch: jest.fn()
  })
}));

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useUpdateMyTaskProgress: () => ({
    mutate: mockMutateFn,
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
      borderColor: '#dee2e6',
      mutedTextColor: '#868e96',
      primaryColor: '#1971c2',
      cardBackground: '#ffffff'
    },
    isDarkTheme: false
  })
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, ...rest }: any) => (
    <button
      type='button'
      onClick={onClick}
      disabled={rest.disabled}
      data-loading={rest.loading}
    >
      {children}
    </button>
  )
}));

jest.mock('@components/common/loaders/DataView', () => ({ children }: any) => (
  <div>{children}</div>
));

jest.mock('../CurriculumSidebar', () => (props: any) => (
  <div data-testid='curriculum'>
    {props.modules.map((m: any) => (
      <span key={m._id}>{m.moduleName}</span>
    ))}
  </div>
));

jest.mock('../TaskContentViewer', () => (props: any) => (
  <div
    data-testid='task-viewer'
    data-finished={JSON.stringify(props.onFinished)}
  >
    {props.task?.taskName}
  </div>
));

const mockNavigate = jest.fn();

const makeTask = (overrides: any = {}) => ({
  _id: 't1',
  taskName: 'First Task',
  taskDescription: '',
  type: 'FILE',
  isCompleted: false,
  ...overrides
});

const makeCourse = (
  overrides: Partial<AssignedCourseDetail> = {}
): AssignedCourseDetail => ({
  courseAssignmentId: 'ca1',
  courseId: 'c1',
  courseName: 'React Mastery',
  courseDescription: '',
  thumbnailUrl: '',
  status: 'In Progress',
  assignedAt: '2024-05-01T00:00:00Z',
  dueDate: '2025-01-15T00:00:00Z',
  isOverdue: false,
  totalModules: 2,
  progress: {
    totalTasks: 4,
    completedTasks: 1,
    percentComplete: 25
  },
  modules: [
    {
      _id: 'm1',
      moduleName: 'Basics',
      moduleDescription: '',
      totalTasks: 2,
      completedTasks: 0,
      tasks: [
        makeTask({ _id: 't1', taskName: 'Intro' }),
        makeTask({ _id: 't2', taskName: 'Video', type: 'LINK' })
      ]
    },
    {
      _id: 'm2',
      moduleName: 'Advanced',
      moduleDescription: '',
      totalTasks: 2,
      completedTasks: 1,
      tasks: [
        makeTask({
          _id: 't3',
          taskName: 'Hooks',
          isCompleted: true,
          completedAt: '2024-06-01T00:00:00Z'
        }),
        makeTask({
          _id: 't4',
          taskName: 'Patterns',
          taskDescription: '<p>Read this</p>'
        })
      ]
    }
  ],
  ...overrides
});

const renderPlayer = () => {
  return render(
    <MantineProvider>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <CoursePlayer />
      </BrowserRouter>
    </MantineProvider>
  );
};

describe('CoursePlayer', () => {
  beforeEach(() => {
    mockCourse = makeCourse();
    mockIsLoading = false;
    mockError = null;
    mockMutateFn = jest.fn((_payload, options) => {
      options?.onSuccess?.({
        courseStatus: 'In Progress',
        progress: { totalTasks: 4, completedTasks: 2, percentComplete: 50 }
      });
    });
    mockNavigate.mockClear();
    mockShowSuccessToast.mockClear();
    mockShowErrorToast.mockClear();
  });

  it('shows the course name, status badge and progress', async () => {
    renderPlayer();

    expect(screen.getByText('React Mastery')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
    expect(screen.getByText('1 of 4 items complete')).toBeInTheDocument();
  });

  it('displays the due date', () => {
    renderPlayer();
    expect(screen.getByText(/Due/)).toBeInTheDocument();
  });

  it('navigates back to the courses list', () => {
    renderPlayer();
    fireEvent.click(screen.getByLabelText('Back to my courses'));

    expect(mockNavigate).toHaveBeenCalledWith('../course-assignments');
  });

  it('auto-selects the first incomplete task on load', async () => {
    renderPlayer();

    await waitFor(() => {
      expect(screen.getByTestId('task-viewer')).toHaveTextContent('Intro');
    });
  });

  it('shows the item position and module name for the active task', async () => {
    renderPlayer();

    await waitFor(() => {
      expect(screen.getByText(/Item 1 of 4/)).toBeInTheDocument();
    });
  });

  it('navigates to the next task when Next is clicked', async () => {
    renderPlayer();

    await waitFor(() => {
      expect(screen.getByTestId('task-viewer')).toHaveTextContent('Intro');
    });

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    await waitFor(() => {
      expect(screen.getByTestId('task-viewer')).toHaveTextContent('Video');
    });
  });

  it('disables Previous on the first task and Next on the last', async () => {
    renderPlayer();

    await waitFor(() => {
      expect(screen.getByTestId('task-viewer')).toHaveTextContent('Intro');
    });

    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    await waitFor(() => {
      expect(screen.getByTestId('task-viewer')).toHaveTextContent('Patterns');
    });

    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Previous' })).not.toBeDisabled();
  });

  it('completes an incomplete task and shows a success toast', async () => {
    renderPlayer();

    await waitFor(() => {
      expect(screen.getByTestId('task-viewer')).toHaveTextContent('Intro');
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Complete and continue' })
    );

    await waitFor(() => {
      expect(mockMutateFn).toHaveBeenCalledWith(
        { courseAssignmentId: 'ca1', taskId: 't1', isCompleted: true },
        expect.objectContaining({ onSuccess: expect.any(Function) })
      );
    });
    expect(mockShowSuccessToast).toHaveBeenCalledWith('Marked as complete');
  });

  it('advances to the next task after completing the current one', async () => {
    renderPlayer();

    await waitFor(() => {
      expect(screen.getByTestId('task-viewer')).toHaveTextContent('Intro');
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Complete and continue' })
    );

    await waitFor(() => {
      expect(screen.getByTestId('task-viewer')).toHaveTextContent('Video');
    });
  });

  it('shows "Course completed" toast when all tasks are finished', async () => {
    mockMutateFn = jest.fn((_payload, options) => {
      options?.onSuccess?.({
        courseStatus: 'Completed',
        progress: { totalTasks: 4, completedTasks: 4, percentComplete: 100 }
      });
    });

    renderPlayer();

    await waitFor(() => {
      expect(screen.getByTestId('task-viewer')).toHaveTextContent('Intro');
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Complete and continue' })
    );

    await waitFor(() => {
      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Course completed. Well done!'
      );
    });
  });

  it('uncompletes a completed task and shows no success toast', async () => {
    mockMutateFn.mockClear();
    renderPlayer();

    // navigate to the completed task t3 (index 2)
    await waitFor(() => {
      expect(screen.getByTestId('task-viewer')).toHaveTextContent('Intro');
    });
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    await waitFor(() => {
      expect(screen.getByTestId('task-viewer')).toHaveTextContent('Hooks');
    });

    fireEvent.click(screen.getByRole('button', { name: 'Mark as incomplete' }));

    expect(mockMutateFn).toHaveBeenCalledWith(
      { courseAssignmentId: 'ca1', taskId: 't3', isCompleted: false },
      expect.objectContaining({ onSuccess: expect.any(Function) })
    );
    expect(mockShowSuccessToast).not.toHaveBeenCalled();
  });

  it('shows an error toast when progress update fails', async () => {
    mockMutateFn = jest.fn((_payload, options) => {
      options?.onError?.({ message: 'Network error' });
    });

    renderPlayer();

    await waitFor(() => {
      expect(screen.getByTestId('task-viewer')).toHaveTextContent('Intro');
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Complete and continue' })
    );

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith('Network error');
    });
  });

  it('renders the curriculum sidebar with all modules', async () => {
    renderPlayer();

    await waitFor(() => {
      expect(screen.getByTestId('curriculum')).toBeInTheDocument();
      expect(screen.getByText('Basics')).toBeInTheDocument();
      expect(screen.getByText('Advanced')).toBeInTheDocument();
    });
  });

  it('shows an empty state message when the course has no tasks', async () => {
    mockCourse = makeCourse({
      modules: [
        {
          _id: 'm1',
          moduleName: 'Empty',
          moduleDescription: '',
          totalTasks: 0,
          completedTasks: 0,
          tasks: []
        }
      ]
    });

    renderPlayer();

    expect(
      screen.getByText(/This course has no published content yet/)
    ).toBeInTheDocument();
  });
});
