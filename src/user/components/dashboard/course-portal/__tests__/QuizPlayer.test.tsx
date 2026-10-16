import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import QuizPlayer from '../QuizPlayer';
import { AssignedTask } from '@interfaces/course-assignment';

const mockShowSuccessToast = jest.fn();
const mockShowErrorToast = jest.fn();

jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: mockShowSuccessToast,
    showErrorToast: mockShowErrorToast
  })
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

const mockMutateAsync = jest.fn();
jest.mock('@hooks/mutations/useUserMutations', () => ({
  useUpdateMyTaskProgress: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false
  })
}));

let mockQuizData: any = null;
let mockIsLoading = false;
let mockIsError = false;

jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetAllQuizQuestions: () => ({
    data: mockQuizData,
    isLoading: mockIsLoading,
    isError: mockIsError
  })
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

const makeTask = (overrides: Partial<AssignedTask> = {}): AssignedTask => ({
  _id: 'task-100',
  taskName: 'React Fundamentals Quiz',
  taskDescription: 'Assess understanding of React core principles',
  type: 'QUIZ',
  isCompleted: false,
  ...overrides
});

const renderQuiz = (
  props: Partial<React.ComponentProps<typeof QuizPlayer>> = {}
) => {
  const task = props.task || makeTask();
  return render(
    <MantineProvider>
      <QuizPlayer task={task} {...props} />
    </MantineProvider>
  );
};

describe('QuizPlayer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsLoading = false;
    mockIsError = false;
    mockQuizData = {
      data: [
        {
          _id: 'q1',
          taskId: 'task-100',
          question: 'What is JSX?',
          type: 'RADIO',
          status: 'SHOW',
          options: [
            { value: 'JavaScript XML', isanswer: true },
            { value: 'Java Syntax Extension', isanswer: false },
            { value: 'JSON Style XML', isanswer: false },
            { value: 'Just Style Sheet', isanswer: false }
          ]
        },
        {
          _id: 'q2',
          taskId: 'task-100',
          question: 'Which of the following are React hooks?',
          type: 'CHECKBOX',
          status: 'SHOW',
          options: [
            { value: 'useState', isanswer: true },
            { value: 'useEffect', isanswer: true },
            { value: 'useQuery', isanswer: false },
            { value: 'renderHook', isanswer: false }
          ]
        }
      ]
    };
  });

  it('renders loading state when query is loading', () => {
    mockIsLoading = true;
    renderQuiz();
    expect(screen.getByText('Loading quiz questions...')).toBeInTheDocument();
  });

  it('renders empty state when there are no questions', () => {
    mockQuizData = [];
    renderQuiz();
    expect(screen.getByText('Quiz in progress')).toBeInTheDocument();
  });

  it('renders the first question and allows answering and navigating', () => {
    renderQuiz();

    expect(screen.getByText('What is JSX?')).toBeInTheDocument();
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
    expect(screen.getByText('JavaScript XML')).toBeInTheDocument();

    // Select the correct radio option
    const radio = screen.getByLabelText('JavaScript XML');
    fireEvent.click(radio);

    // Click Next
    const nextBtn = screen.getByText('Next Question');
    fireEvent.click(nextBtn);

    // Now on question 2
    expect(
      screen.getByText('Which of the following are React hooks?')
    ).toBeInTheDocument();
    expect(screen.getByText('Question 2 of 2')).toBeInTheDocument();
  });

  it('submits quiz and evaluates passing score, triggering task completion', async () => {
    const onFinished = jest.fn();
    mockMutateAsync.mockResolvedValueOnce({ success: true });

    renderQuiz({ courseAssignmentId: 'ca-123', onFinished });

    // Answer Q1
    fireEvent.click(screen.getByLabelText('JavaScript XML'));
    fireEvent.click(screen.getByText('Next Question'));

    // Answer Q2 (select both correct answers)
    fireEvent.click(screen.getByLabelText('useState'));
    fireEvent.click(screen.getByLabelText('useEffect'));

    // Submit Quiz
    const submitBtn = screen.getByText('Submit Quiz');
    fireEvent.click(submitBtn);

    // Review / Score Screen
    expect(
      screen.getByText('Congratulations! You Passed!')
    ).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();

    // Click Complete Task
    const completeBtn = screen.getByText('Complete Task');
    fireEvent.click(completeBtn);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        courseAssignmentId: 'ca-123',
        taskId: 'task-100',
        isCompleted: true
      });
      expect(onFinished).toHaveBeenCalled();
      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Quiz passed! Task marked as completed.'
      );
    });
  });

  it('allows retaking the quiz from the result screen', () => {
    renderQuiz();

    // Select wrong answer for Q1
    fireEvent.click(screen.getByLabelText('Java Syntax Extension'));
    fireEvent.click(screen.getByText('Next Question'));

    // Submit without answering Q2 correctly
    fireEvent.click(screen.getByText('Submit Quiz'));

    expect(screen.getByText('Keep Practicing!')).toBeInTheDocument();

    const retakeBtn = screen.getByText('Retake Quiz');
    fireEvent.click(retakeBtn);

    // Returned to question 1
    expect(screen.getByText('What is JSX?')).toBeInTheDocument();
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
  });
});
