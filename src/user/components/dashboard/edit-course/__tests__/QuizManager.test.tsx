import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { QuizManager } from '../QuizManager';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      borderColor: '#dee2e6',
      cardBackground: '#ffffff',
      backgroundColor: '#ffffff',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false
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

let mockApiQuestions: any[] = [];
let mockIsLoading = false;
let mockIsError = false;
jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetAllQuizQuestions: () => ({
    data: mockApiQuestions,
    isLoading: mockIsLoading,
    isError: mockIsError
  })
}));

const mockCreateQuestion = jest.fn();
const mockUpdateQuestion = jest.fn();
const mockUpdateQuestionStatus = jest.fn();
const mockDeleteQuestion = jest.fn();
let mockIsCreating = false;
let mockIsUpdating = false;
jest.mock('@hooks/mutations/useUserMutations', () => ({
  useCreateQuizQuestion: () => ({
    mutateAsync: mockCreateQuestion,
    isPending: mockIsCreating
  }),
  useUpdateQuizQuestion: () => ({
    mutateAsync: mockUpdateQuestion,
    isPending: mockIsUpdating
  }),
  useUpdateQuizQuestionStatus: () => ({
    mutateAsync: mockUpdateQuestionStatus
  }),
  useDeleteQuizQuestion: () => ({
    mutateAsync: mockDeleteQuestion
  })
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, disabled }: any) => (
    <button type='button' onClick={onClick} disabled={Boolean(disabled)}>
      {children}
    </button>
  )
}));

const mockBuilderQuestion: any = {
  id: 'q1',
  question: 'What is React?',
  type: 'RADIO',
  status: 'SHOW',
  options: [
    { id: 'o1', text: 'A library', isCorrect: true },
    { id: 'o2', text: '  ', isCorrect: false }
  ]
};

jest.mock('../QuizBuilder', () => (props: any) => (
  <div
    data-testid='quiz-builder'
    data-loading={String(Boolean(props.isLoading))}
    data-submitting={String(Boolean(props.isSubmitting))}
  >
    <span data-testid='builder-questions'>{props.questions.length}</span>
    <button
      type='button'
      onClick={() => {
        props.onAddQuestion(mockBuilderQuestion).catch(() => {});
      }}
    >
      add
    </button>
    <button
      type='button'
      onClick={() => {
        props.onUpdateQuestion(mockBuilderQuestion).catch(() => {});
      }}
    >
      update
    </button>
    <button
      type='button'
      onClick={() => {
        props.onToggleStatus(mockBuilderQuestion).catch(() => {});
      }}
    >
      toggle
    </button>
    <button
      type='button'
      onClick={() => {
        props.onDeleteQuestion(mockBuilderQuestion).catch(() => {});
      }}
    >
      delete
    </button>
  </div>
));

jest.mock('../QuizPlayerPreview', () => (props: any) => (
  <div data-testid='quiz-player-preview'>
    preview:{props.questions.length}
  </div>
));

const mockOnBack = jest.fn();
const mockOnBackToCourse = jest.fn();

const makeApiQuestion = (id: string, overrides: any = {}) => ({
  _id: id,
  question: `Question ${id}`,
  type: 'RADIO',
  status: 'SHOW',
  options: [
    { value: 'A', isanswer: true },
    { value: 'B' }
  ],
  ...overrides
});

const renderManager = (props: any = {}) =>
  render(
    <MantineProvider>
      <QuizManager taskId='t1' onBack={mockOnBack} {...props} />
    </MantineProvider>
  );

const statValue = (label: string) => {
  const card = screen
    .getByText(label)
    .closest('.mantine-Card-root') as HTMLElement;
  return within(card).getByText(/^\d+$/).textContent;
};

describe('QuizManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockApiQuestions = [];
    mockIsLoading = false;
    mockIsError = false;
    mockIsCreating = false;
    mockIsUpdating = false;
    mockBuilderQuestion.id = 'q1';
    mockBuilderQuestion.question = 'What is React?';
    mockBuilderQuestion.type = 'RADIO';
    mockBuilderQuestion.status = 'SHOW';
    mockBuilderQuestion.options = [
      { id: 'o1', text: 'A library', isCorrect: true },
      { id: 'o2', text: '  ', isCorrect: false }
    ];
  });

  describe('Header', () => {
    it('renders the task title, badge and course/module breadcrumbs', () => {
      renderManager({
        taskName: 'My Quiz',
        courseName: 'Course A',
        moduleName: 'Module A',
        onBackToCourse: mockOnBackToCourse
      });

      expect(screen.getByText('My Quiz')).toBeInTheDocument();
      expect(screen.getByText('Quiz Task')).toBeInTheDocument();
      expect(screen.getByText(/Course:/)).toBeInTheDocument();
      expect(screen.getByText('Course A')).toBeInTheDocument();
      expect(screen.getByText('Module A')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'All Quizzes' }));
      expect(mockOnBack).toHaveBeenCalledTimes(1);

      fireEvent.click(screen.getByRole('button', { name: 'Back to Course' }));
      expect(mockOnBackToCourse).toHaveBeenCalledTimes(1);
    });

    it('shows just the module when no course is provided', () => {
      renderManager({ moduleName: 'Solo Module' });

      expect(screen.queryByText(/Course:/)).not.toBeInTheDocument();
      expect(screen.getByText('Solo Module')).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Back to Course' })
      ).not.toBeInTheDocument();
    });
  });

  describe('Stats and builder', () => {
    it('counts total, visible and hidden questions, ignoring deleted ones', () => {
      mockApiQuestions = [
        makeApiQuestion('q1', { status: 'SHOW' }),
        makeApiQuestion('q2', { status: 'HIDE' }),
        makeApiQuestion('q3', { status: 'SHOW', isDeleted: true })
      ];

      renderManager();

      expect(statValue('Total Questions')).toBe('2');
      expect(statValue('Published (Show)')).toBe('1');
      expect(statValue('Draft / Hidden (Hide)')).toBe('1');
      expect(screen.getByTestId('builder-questions')).toHaveTextContent('2');
      expect(
        screen.getByRole('button', { name: 'Simulate Quiz' })
      ).toBeInTheDocument();
    });

    it('hides stats and the simulate button when there are no questions', () => {
      renderManager();

      expect(screen.queryByText('Total Questions')).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Simulate Quiz' })
      ).not.toBeInTheDocument();
      expect(screen.getByTestId('builder-questions')).toHaveTextContent('0');
    });

    it('forwards the loading and submitting flags to the builder', () => {
      mockIsLoading = true;
      mockIsCreating = true;
      mockIsUpdating = true;

      renderManager();

      const builder = screen.getByTestId('quiz-builder');
      expect(builder).toHaveAttribute('data-loading', 'true');
      expect(builder).toHaveAttribute('data-submitting', 'true');
    });

    it('shows an error state instead of the builder when loading fails', () => {
      mockIsError = true;
      mockApiQuestions = [makeApiQuestion('q1')];

      renderManager();

      expect(
        screen.getByText(/Failed to load quiz questions/)
      ).toBeInTheDocument();
      expect(screen.queryByTestId('quiz-builder')).not.toBeInTheDocument();
    });

    it('opens the learner simulation modal for existing questions', async () => {
      mockApiQuestions = [makeApiQuestion('q1')];
      renderManager();

      fireEvent.click(screen.getByRole('button', { name: 'Simulate Quiz' }));

      expect(
        await screen.findByText('Learner Quiz Simulation')
      ).toBeInTheDocument();
      expect(screen.getByTestId('quiz-player-preview')).toHaveTextContent(
        'preview:1'
      );
    });
  });

  describe('Add question', () => {
    it('creates the question and shows the API message', async () => {
      mockCreateQuestion.mockResolvedValue({ message: 'Added!' });
      renderManager();

      fireEvent.click(screen.getByRole('button', { name: 'add' }));

      await waitFor(() =>
        expect(mockShowSuccessToast).toHaveBeenCalledWith('Added!')
      );
      expect(mockCreateQuestion).toHaveBeenCalledWith({
        taskId: 't1',
        question: 'What is React?',
        type: 'RADIO',
        status: 'SHOW',
        options: [{ value: 'A library', isanswer: true }]
      });
    });

    it('falls back to a default message and reports failures', async () => {
      mockCreateQuestion.mockResolvedValue({});
      renderManager();

      fireEvent.click(screen.getByRole('button', { name: 'add' }));
      await waitFor(() =>
        expect(mockShowSuccessToast).toHaveBeenCalledWith(
          'Question added successfully!'
        )
      );

      mockCreateQuestion.mockRejectedValue({
        response: { data: { message: 'Duplicate question' } }
      });
      fireEvent.click(screen.getByRole('button', { name: 'add' }));

      await waitFor(() =>
        expect(mockShowErrorToast).toHaveBeenCalledWith('Duplicate question')
      );
    });
  });

  describe('Update question', () => {
    it('updates the question with the trimmed payload', async () => {
      mockUpdateQuestion.mockResolvedValue({ message: 'Saved' });
      renderManager();

      fireEvent.click(screen.getByRole('button', { name: 'update' }));

      await waitFor(() =>
        expect(mockShowSuccessToast).toHaveBeenCalledWith('Saved')
      );
      expect(mockUpdateQuestion).toHaveBeenCalledWith({
        questionId: 'q1',
        data: {
          question: 'What is React?',
          type: 'RADIO',
          status: 'SHOW',
          options: [{ value: 'A library', isanswer: true }]
        }
      });
    });

    it('uses the fallback message when updating fails', async () => {
      mockUpdateQuestion.mockRejectedValue({});
      renderManager();

      fireEvent.click(screen.getByRole('button', { name: 'update' }));

      await waitFor(() =>
        expect(mockShowErrorToast).toHaveBeenCalledWith(
          'Failed to update question'
        )
      );
      expect(mockShowSuccessToast).not.toHaveBeenCalled();
    });
  });

  describe('Toggle question status', () => {
    it('hides a visible question with the default message', async () => {
      mockUpdateQuestionStatus.mockResolvedValue({});
      renderManager();

      fireEvent.click(screen.getByRole('button', { name: 'toggle' }));

      await waitFor(() =>
        expect(mockShowSuccessToast).toHaveBeenCalledWith('Question hidden.')
      );
      expect(mockUpdateQuestionStatus).toHaveBeenCalledWith({
        questionId: 'q1',
        status: 'HIDE'
      });
    });

    it('shows a hidden question and prefers the API message', async () => {
      mockBuilderQuestion.status = 'HIDE';
      mockUpdateQuestionStatus.mockResolvedValue({ message: 'Now live' });
      renderManager();

      fireEvent.click(screen.getByRole('button', { name: 'toggle' }));

      await waitFor(() =>
        expect(mockShowSuccessToast).toHaveBeenCalledWith('Now live')
      );
      expect(mockUpdateQuestionStatus).toHaveBeenCalledWith({
        questionId: 'q1',
        status: 'SHOW'
      });
    });

    it('reports status update failures', async () => {
      mockUpdateQuestionStatus.mockRejectedValue({});
      renderManager();

      fireEvent.click(screen.getByRole('button', { name: 'toggle' }));

      await waitFor(() =>
        expect(mockShowErrorToast).toHaveBeenCalledWith(
          'Failed to update question status'
        )
      );
    });
  });

  describe('Delete question', () => {
    it('deletes a question using its id', async () => {
      mockDeleteQuestion.mockResolvedValue({ message: 'Gone' });
      renderManager();

      fireEvent.click(screen.getByRole('button', { name: 'delete' }));

      await waitFor(() =>
        expect(mockShowSuccessToast).toHaveBeenCalledWith('Gone')
      );
      expect(mockDeleteQuestion).toHaveBeenCalledWith('q1');
    });

    it('falls back to the _id and a default message', async () => {
      mockBuilderQuestion.id = undefined;
      mockBuilderQuestion._id = 'legacy-1';
      mockDeleteQuestion.mockResolvedValue({});
      renderManager();

      fireEvent.click(screen.getByRole('button', { name: 'delete' }));

      await waitFor(() =>
        expect(mockShowSuccessToast).toHaveBeenCalledWith(
          'Question deleted successfully!'
        )
      );
      expect(mockDeleteQuestion).toHaveBeenCalledWith('legacy-1');
    });

    it('refuses to delete without an id', async () => {
      mockBuilderQuestion.id = '';
      mockBuilderQuestion._id = undefined;
      renderManager();

      fireEvent.click(screen.getByRole('button', { name: 'delete' }));

      await waitFor(() =>
        expect(mockShowErrorToast).toHaveBeenCalledWith(
          'Question ID is missing.'
        )
      );
      expect(mockDeleteQuestion).not.toHaveBeenCalled();
    });

    it('reports delete failures', async () => {
      mockDeleteQuestion.mockRejectedValue({
        response: { data: { message: 'Locked' } }
      });
      renderManager();

      fireEvent.click(screen.getByRole('button', { name: 'delete' }));

      await waitFor(() =>
        expect(mockShowErrorToast).toHaveBeenCalledWith('Locked')
      );
    });
  });
});
