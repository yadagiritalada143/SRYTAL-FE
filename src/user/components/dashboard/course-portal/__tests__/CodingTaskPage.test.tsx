import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import CodingTaskPage from '../CodingTaskPage';

const mockNavigate = jest.fn();
const mockParams = { courseAssignmentId: 'ca1', taskId: 't1' };
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => mockParams
}));

const mockUpdateProgress = jest.fn();
jest.mock('@hooks/mutations/useUserMutations', () => ({
  useUpdateMyTaskProgress: () => ({
    mutate: mockUpdateProgress,
    isPending: false
  })
}));

jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetMyAssignedCourse: (courseAssignmentId: string) => ({
    data: {
      courseAssignmentId,
      courseId: 'c1',
      courseName: 'Intro to JavaScript',
      status: 'In Progress',
      modules: [
        {
          _id: 'm1',
          moduleName: 'Basics',
          moduleDescription: '',
          tasks: [
            {
              _id: 't1',
              taskName: 'Two Sum',
              taskDescription: '<p>Sum two numbers.</p>',
              type: 'LINK',
              link: '',
              isCompleted: false
            }
          ],
          totalTasks: 1,
          completedTasks: 0
        }
      ],
      progress: { totalTasks: 1, completedTasks: 0, percentComplete: 0 }
    },
    isLoading: false,
    error: null,
    refetch: jest.fn()
  })
}));

let mockViewerProps: any;
jest.mock('../CodingQuestionViewer', () => (props: any) => {
  mockViewerProps = props;
  return (
    <div data-testid='coding-question-viewer' data-task-id={props.task._id} />
  );
});

jest.mock('@components/common/loaders/DataView', () => ({ children }: any) => (
  <>{children}</>
));

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
      cardBackground: '#ffffff'
    },
    isDarkTheme: false
  })
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, disabled, loading }: any) => (
    <button type='button' onClick={onClick} disabled={disabled}>
      {loading ? 'Saving...' : children}
    </button>
  )
}));

const renderPage = () => {
  return render(
    <MantineProvider>
      <CodingTaskPage />
    </MantineProvider>
  );
};

describe('CodingTaskPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockViewerProps = undefined;
  });

  it('shows the problem title, its editor and the complete action', () => {
    renderPage();

    expect(screen.getByText('Two Sum')).toBeInTheDocument();
    expect(screen.getByText('Intro to JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Coding')).toBeInTheDocument();
    expect(screen.getByTestId('coding-question-viewer')).toHaveAttribute(
      'data-task-id',
      't1'
    );
    expect(
      screen.getByRole('button', { name: 'Complete task' })
    ).toBeInTheDocument();
  });

  it('marks the task complete', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Complete task' }));

    expect(mockUpdateProgress).toHaveBeenCalledWith(
      { courseAssignmentId: 'ca1', taskId: 't1', isCompleted: true },
      expect.objectContaining({ onSuccess: expect.any(Function) })
    );
  });

  it('marks the task complete when the submission succeeds', () => {
    renderPage();
    mockViewerProps.onSubmitted();

    expect(mockUpdateProgress).toHaveBeenCalledWith(
      { courseAssignmentId: 'ca1', taskId: 't1', isCompleted: true },
      expect.objectContaining({ onError: expect.any(Function) })
    );
  });

  it('navigates back to the course player', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));

    expect(mockNavigate).toHaveBeenCalledWith('../', { relative: 'path' });
  });
});
