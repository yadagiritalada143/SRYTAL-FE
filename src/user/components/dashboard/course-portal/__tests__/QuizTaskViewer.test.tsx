import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import QuizTaskViewer from '../QuizTaskViewer';
import { AssignedTask } from '@interfaces/course-assignment';

const mockUseGetQuiz = jest.fn();
jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetQuiz: (taskId: string, enabled: boolean) =>
    mockUseGetQuiz(taskId, enabled)
}));

const mockValidateQuiz = jest.fn();
const mockSubmitQuiz = jest.fn();
jest.mock('@hooks/mutations/useUserMutations', () => ({
  useValidateQuiz: () => ({ mutateAsync: mockValidateQuiz, isPending: false }),
  useSubmitQuiz: () => ({ mutateAsync: mockSubmitQuiz, isPending: false })
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
      cardBackground: '#ffffff'
    },
    isDarkTheme: false
  })
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, disabled, loading, ...rest }: any) => {
    const {
      leftSection: _leftSection,
      rightSection: _rightSection,
      ...buttonProps
    } = rest;
    void _leftSection;
    void _rightSection;
    void loading;
    return (
      <button
        type='button'
        onClick={onClick}
        disabled={disabled}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }
}));

const makeTask = (overrides: any = {}): AssignedTask => ({
  _id: 't1',
  taskName: 'Safety quiz',
  taskDescription: '',
  type: 'QUIZ',
  isCompleted: false,
  ...overrides
});

const quizData = {
  taskId: 't1',
  attemptId: 'a1',
  taskName: 'Safety quiz',
  totalQuestions: 2,
  questions: [
    {
      questionId: 'q1',
      question: 'Pick one',
      type: 'RADIO',
      options: [
        { optionId: 'opt-0', value: 'Red' },
        { optionId: 'opt-1', value: 'Blue' }
      ]
    },
    {
      questionId: 'q2',
      question: 'Explain',
      type: 'TEXTAREA'
    }
  ]
};

const validationResult = {
  taskId: 't1',
  attemptId: 'a1',
  totalScoredQuestions: 1,
  correctAnswers: 1,
  incorrectAnswers: 0,
  percentage: 100,
  passingPercentage: 70,
  passed: true,
  review: [
    {
      questionId: 'q1',
      question: 'Pick one',
      type: 'RADIO',
      isCorrect: true,
      correctOptionIds: ['opt-0'],
      correctOptionValues: ['Red'],
      selectedOptionIds: ['opt-0'],
      selectedOptionValues: ['Red']
    },
    {
      questionId: 'q2',
      question: 'Explain',
      type: 'TEXTAREA',
      isCorrect: null,
      textAnswer: 'Because'
    }
  ]
};

const mockRefetch = jest.fn();

const queryResult = (overrides: any = {}) => ({
  data: quizData,
  isLoading: false,
  isError: false,
  error: null,
  isFetching: false,
  refetch: mockRefetch,
  ...overrides
});

const renderViewer = (task: AssignedTask = makeTask(), onPassed?: () => void) =>
  render(
    <MantineProvider>
      <QuizTaskViewer task={task} onPassed={onPassed} />
    </MantineProvider>
  );

describe('QuizTaskViewer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetQuiz.mockReturnValue(queryResult());
    mockRefetch.mockResolvedValue({ data: quizData });
    mockValidateQuiz.mockResolvedValue(validationResult);
    mockSubmitQuiz.mockResolvedValue({
      taskId: 't1',
      attemptId: 'a1',
      attemptNumber: 1,
      percentage: 100,
      passingPercentage: 70,
      passed: true,
      alreadySubmitted: false,
      isCompleted: true
    });
  });

  it('renders the questions with a single Validate action', () => {
    renderViewer();

    expect(screen.getByText('1. Pick one')).toBeInTheDocument();
    expect(screen.getByText('2. Explain')).toBeInTheDocument();
    expect(screen.getByLabelText('Red')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Validate' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Submit' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Re-attempt' })
    ).not.toBeInTheDocument();
  });

  it('validates the answers and reveals the review with re-attempt + submit', async () => {
    renderViewer();

    fireEvent.click(screen.getByLabelText('Red'));
    fireEvent.change(screen.getByPlaceholderText('Type your answer'), {
      target: { value: 'Because' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Validate' }));

    await waitFor(() => {
      expect(mockValidateQuiz).toHaveBeenCalledWith({
        taskId: 't1',
        attemptId: 'a1',
        answers: [
          { questionId: 'q1', selectedOptionIds: ['opt-0'] },
          { questionId: 'q2', textAnswer: 'Because' }
        ]
      });
    });

    expect(
      screen.getByRole('button', { name: 'Re-attempt' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Validate' })).toBeNull();
    expect(screen.getAllByText('Correct').length).toBeGreaterThan(0);
    // The passing threshold and the placeholder badge for untouched options
    // are intentionally hidden from learners.
    expect(screen.queryByText(/Passing/)).toBeNull();
    expect(screen.queryByText('—')).toBeNull();
  });

  it('submits a validated attempt and reports a pass to the parent', async () => {
    const onPassed = jest.fn();
    renderViewer(makeTask(), onPassed);

    fireEvent.click(screen.getByLabelText('Red'));
    fireEvent.click(screen.getByRole('button', { name: 'Validate' }));
    await screen.findByRole('button', { name: 'Submit' });

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(mockSubmitQuiz).toHaveBeenCalledWith({
        taskId: 't1',
        attemptId: 'a1'
      });
    });

    await waitFor(() => expect(onPassed).toHaveBeenCalledTimes(1));
    expect(
      screen.getByText('Quiz submitted successfully.')
    ).toBeInTheDocument();
    // Once submitted, the Re-attempt and Submit actions are gone.
    expect(screen.queryByRole('button', { name: 'Re-attempt' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Submit' })).toBeNull();
  });

  it('renders Next Task button and handles click when quiz is submitted successfully', async () => {
    const onNextMock = jest.fn();
    mockSubmitQuiz.mockResolvedValue({
      attemptId: 'att-1',
      score: 10,
      total: 10,
      percentage: 100,
      passed: true,
      alreadySubmitted: false,
      submittedAt: '2026-03-30T10:05:00Z'
    });

    render(
      <MantineProvider>
        <QuizTaskViewer
          task={makeTask()}
          onNext={onNextMock}
          hasNext={true}
          nextTaskName='Next Module Lesson'
        />
      </MantineProvider>
    );

    await screen.findByRole('button', { name: 'Validate' });
    fireEvent.click(screen.getByLabelText('Red'));
    fireEvent.click(screen.getByRole('button', { name: 'Validate' }));

    await screen.findByRole('button', { name: 'Submit' });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    const nextButtons = await screen.findAllByRole('button', {
      name: /Next Task/i
    });
    expect(nextButtons.length).toBeGreaterThan(0);
    fireEvent.click(nextButtons[0]);
    expect(onNextMock).toHaveBeenCalled();
  });

  it('keeps a failed submit in a re-attempt-only state', async () => {
    const onPassed = jest.fn();
    mockSubmitQuiz.mockRejectedValue({
      response: {
        data: {
          message: 'You did not meet the passing percentage',
          data: {
            taskId: 't1',
            attemptId: 'a1',
            passed: false,
            percentage: 0,
            passingPercentage: 70,
            reattemptRequired: true
          }
        }
      }
    });

    renderViewer(makeTask(), onPassed);

    fireEvent.click(screen.getByLabelText('Red'));
    fireEvent.click(screen.getByRole('button', { name: 'Validate' }));
    await screen.findByRole('button', { name: 'Submit' });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(
        screen.getAllByText(/did not meet the passing percentage/).length
      ).toBeGreaterThan(0);
    });

    expect(onPassed).not.toHaveBeenCalled();
    expect(screen.queryByRole('button', { name: 'Submit' })).toBeNull();
    expect(
      screen.getByRole('button', { name: 'Re-attempt' })
    ).toBeInTheDocument();
  });

  it('starts a fresh attempt and clears the review on re-attempt', async () => {
    renderViewer();

    fireEvent.click(screen.getByLabelText('Red'));
    fireEvent.click(screen.getByRole('button', { name: 'Validate' }));
    await screen.findByRole('button', { name: 'Re-attempt' });

    fireEvent.click(screen.getByRole('button', { name: 'Re-attempt' }));

    await waitFor(() => expect(mockRefetch).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Validate' })
      ).toBeInTheDocument();
    });
    expect(screen.queryByRole('button', { name: 'Submit' })).toBeNull();
  });

  it('shows validation error and prevents submission when clicking Validate without answering', async () => {
    renderViewer();

    fireEvent.click(screen.getByRole('button', { name: 'Validate' }));

    expect(mockValidateQuiz).not.toHaveBeenCalled();
    expect(mockShowErrorToast).toHaveBeenCalledWith(
      'Please select an answer before validating your quiz.'
    );
    expect(
      screen.getByText('Please answer the quiz questions before validating.')
    ).toBeInTheDocument();
    expect(screen.getAllByText('Answer required').length).toBeGreaterThan(0);

    // Real-time clearance upon answering
    fireEvent.click(screen.getByLabelText('Red'));
    expect(
      screen.queryByText('Please answer the quiz questions before validating.')
    ).not.toBeInTheDocument();
  });

  it('shows a completed state without fetching a completed quiz', () => {
    renderViewer(makeTask({ isCompleted: true }));

    expect(screen.getByText('Quiz completed')).toBeInTheDocument();
    expect(mockUseGetQuiz).toHaveBeenCalledWith('t1', false);
  });
});
