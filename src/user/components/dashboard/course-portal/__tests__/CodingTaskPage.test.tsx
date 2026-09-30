import { render, screen, fireEvent, act } from '@testing-library/react';
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

const mockRefetchCourse = jest.fn(() => Promise.resolve());
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
              isCompleted: false,
              questionCount: 2
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
    refetch: mockRefetchCourse
  }),
  useGetCourseTaskQuestions: () => ({
    data: {
      success: true,
      taskId: 't1',
      taskName: 'Two Sum',
      isCoding: true,
      questionCount: 2,
      activeQuestionCount: 2,
      questions: [
        {
          questionId: 'q1',
          question: 'First question',
          description: '',
          status: 'ACTIVE',
          order: 1
        },
        {
          questionId: 'q2',
          question: 'Second question',
          description: '',
          status: 'ACTIVE',
          order: 2
        }
      ]
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
      cardBackground: '#ffffff',
      successColor: '#2f9e44',
      warningColor: '#f08c00'
    },
    isDarkTheme: false
  })
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, disabled, loading, style }: any) => (
    <button type='button' onClick={onClick} disabled={disabled} style={style}>
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

  it('shows the problem title and its editor', () => {
    renderPage();

    expect(screen.getByText('Two Sum')).toBeInTheDocument();
    expect(screen.getByTestId('coding-question-viewer')).toHaveAttribute(
      'data-task-id',
      't1'
    );
    expect(screen.queryByText('Intro to JavaScript')).not.toBeInTheDocument();
    expect(screen.queryByText('Coding')).not.toBeInTheDocument();
  });

  it('refreshes the course when a submission succeeds', () => {
    renderPage();
    mockViewerProps.onSubmitted();

    expect(mockRefetchCourse).toHaveBeenCalled();
    expect(mockUpdateProgress).not.toHaveBeenCalled();
  });

  it('navigates back to the course player', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));

    expect(mockNavigate).toHaveBeenCalledWith('../..', { relative: 'path' });
  });

  it('hands the question picker state to the viewer and tracks the active question', () => {
    renderPage();

    expect(mockViewerProps.questionId).toBe('q1');
    expect(mockViewerProps.questionCount).toBe(2);
    expect(mockViewerProps.activeQuestionIndex).toBe(0);

    // The viewer renders the chips; switching one remounts it per question.
    act(() => mockViewerProps.onSelectQuestion(1));

    expect(mockViewerProps.questionId).toBe('q2');
    expect(mockViewerProps.activeQuestionIndex).toBe(1);
  });
});
