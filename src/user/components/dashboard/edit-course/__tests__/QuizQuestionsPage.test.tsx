import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import QuizQuestionsPage from '../QuizQuestionsPage';
import { saveQuizTaskState, readQuizTaskState } from '../task-popup-state';
import { QuizQuestionApiModel } from '@interfaces/quiz';

const mockNavigate = jest.fn();
let mockSearchParams = new URLSearchParams();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ organization: 'acme' }),
  useSearchParams: () => [mockSearchParams, jest.fn()]
}));

jest.mock('@utils/common/constants', () => ({
  commonUrls: (org: string) => `/${org}/employee`
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      cardBackground: '#ffffff',
      borderColor: '#dee2e6',
      accentColor: '#1c7ed6',
      iconColor: '#228be6',
      successColor: '#2f9e44',
      dangerColor: '#c92a2a',
      mutedTextColor: '#6c757d'
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

jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetAllQuizQuestions: jest.fn()
}));

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useCreateQuizQuestion: jest.fn(),
  useUpdateQuizQuestion: jest.fn(),
  useUpdateQuizQuestionStatus: jest.fn(),
  useDeleteQuizQuestion: jest.fn()
}));

const useGetAllQuizQuestionsMock = () =>
  jest.requireMock('@hooks/queries/useUserQueries')
    .useGetAllQuizQuestions as jest.Mock;

const userMutationsMock = () =>
  jest.requireMock('@hooks/mutations/useUserMutations') as Record<
    string,
    jest.Mock
  >;

const useCreateQuizQuestionMock = () =>
  userMutationsMock().useCreateQuizQuestion;

const apiQuestion = (
  overrides: Partial<QuizQuestionApiModel> = {}
): QuizQuestionApiModel => ({
  _id: 'q1',
  taskId: 't1',
  question: 'What is your favourite colour?',
  type: 'RADIO',
  status: 'SHOW',
  options: [
    { value: 'Red', isanswer: true },
    { value: 'Green', isanswer: false }
  ],
  ...overrides
});

// Four options so the question satisfies the backend's per-type edit rules.
const editableQuestion = (
  overrides: Partial<QuizQuestionApiModel> = {}
): QuizQuestionApiModel =>
  apiQuestion({
    options: [
      { value: 'Red', isanswer: true },
      { value: 'Green', isanswer: false },
      { value: 'Blue', isanswer: false },
      { value: 'Yellow', isanswer: false }
    ],
    ...overrides
  });

const fillOption = (index: number, value: string) =>
  fireEvent.change(screen.getByLabelText(`Option ${index}`), {
    target: { value }
  });

const renderPage = () =>
  render(
    <MantineProvider>
      <QuizQuestionsPage />
    </MantineProvider>
  );

describe('QuizQuestionsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
    mockSearchParams = new URLSearchParams();
    useGetAllQuizQuestionsMock().mockReturnValue({
      data: [],
      isLoading: false,
      isError: false
    });
    useCreateQuizQuestionMock().mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false
    });
    userMutationsMock().useUpdateQuizQuestion.mockReturnValue({
      mutateAsync: jest.fn()
    });
    userMutationsMock().useUpdateQuizQuestionStatus.mockReturnValue({
      mutateAsync: jest.fn()
    });
    userMutationsMock().useDeleteQuizQuestion.mockReturnValue({
      mutateAsync: jest.fn()
    });
  });

  it('fetches and renders the task questions', () => {
    saveQuizTaskState({ courseId: 'c1', moduleId: 'm1', taskId: 't1' });
    useGetAllQuizQuestionsMock().mockReturnValue({
      data: [apiQuestion()],
      isLoading: false,
      isError: false
    });

    renderPage();

    expect(useGetAllQuizQuestionsMock()).toHaveBeenCalledWith('t1');
    expect(
      screen.getByRole('heading', { name: 'Quiz Questions' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('What is your favourite colour?')
    ).toBeInTheDocument();
    expect(screen.getByText('1 question')).toBeInTheDocument();
  });

  it('reads the task and course from the URL when provided', () => {
    mockSearchParams = new URLSearchParams('taskId=t7&courseId=c7');
    useGetAllQuizQuestionsMock().mockReturnValue({
      data: [apiQuestion({ taskId: 't7' })],
      isLoading: false,
      isError: false
    });

    renderPage();

    expect(useGetAllQuizQuestionsMock()).toHaveBeenCalledWith('t7');
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(readQuizTaskState()).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith(
      '/acme/employee/dashboard/course/c7'
    );
  });

  it('prefers the URL task over a stored quiz task', () => {
    saveQuizTaskState({ courseId: 'c1', moduleId: 'm1', taskId: 'stale' });
    mockSearchParams = new URLSearchParams('taskId=t7&courseId=c7');

    renderPage();

    expect(useGetAllQuizQuestionsMock()).toHaveBeenCalledWith('t7');
  });

  it('prompts the author to open the page from a quiz task', () => {
    renderPage();

    expect(
      screen.getByText('Open this page from a quiz task to add its questions.')
    ).toBeInTheDocument();
  });

  it('shows an error message when the fetch fails', () => {
    saveQuizTaskState({ courseId: 'c1', moduleId: 'm1', taskId: 't1' });
    useGetAllQuizQuestionsMock().mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true
    });

    renderPage();

    expect(
      screen.getByText(
        'We could not load the quiz questions. Please try again.'
      )
    ).toBeInTheDocument();
  });

  it('creates a question against the current task', async () => {
    const mutateAsync = jest
      .fn()
      .mockResolvedValue({ message: 'Quiz question created successfully !' });
    useCreateQuizQuestionMock().mockReturnValue({
      mutateAsync,
      isPending: false
    });
    saveQuizTaskState({ courseId: 'c1', moduleId: 'm1', taskId: 't1' });

    renderPage();

    fireEvent.change(screen.getByLabelText(/Question/), {
      target: { value: 'Pick a role' }
    });
    fillOption(1, 'Engineer');
    fillOption(2, 'Manager');
    fillOption(3, 'Designer');
    fillOption(4, 'Sales');
    fireEvent.click(screen.getAllByRole('radio', { name: 'Correct' })[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Add question' }));

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          taskId: 't1',
          question: 'Pick a role',
          type: 'RADIO',
          status: 'SHOW',
          options: expect.arrayContaining([
            { value: 'Engineer', isanswer: true }
          ])
        })
      );
    });
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Quiz question created successfully !'
    );
  });

  it('shows an error toast when creating a question fails', async () => {
    const mutateAsync = jest.fn().mockRejectedValue({});
    useCreateQuizQuestionMock().mockReturnValue({
      mutateAsync,
      isPending: false
    });
    saveQuizTaskState({ courseId: 'c1', moduleId: 'm1', taskId: 't1' });

    renderPage();

    fireEvent.change(screen.getByLabelText(/Question/), {
      target: { value: 'Pick a role' }
    });
    fillOption(1, 'Engineer');
    fillOption(2, 'Manager');
    fillOption(3, 'Designer');
    fillOption(4, 'Sales');
    fireEvent.click(screen.getAllByRole('radio', { name: 'Correct' })[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Add question' }));

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith('Failed to add question');
    });
  });

  it('edits an existing question', async () => {
    const mutateAsync = jest
      .fn()
      .mockResolvedValue({ message: 'Quiz question updated successfully !' });
    userMutationsMock().useUpdateQuizQuestion.mockReturnValue({ mutateAsync });
    saveQuizTaskState({ courseId: 'c1', moduleId: 'm1', taskId: 't1' });
    useGetAllQuizQuestionsMock().mockReturnValue({
      data: [editableQuestion()],
      isLoading: false,
      isError: false
    });

    renderPage();

    fireEvent.click(screen.getByLabelText('Edit question'));
    expect(screen.getByText('Edit question')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Question/), {
      target: { value: 'What is your favourite colour now?' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith({
        questionId: 'q1',
        data: expect.objectContaining({
          question: 'What is your favourite colour now?',
          type: 'RADIO',
          status: 'SHOW'
        })
      });
    });
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Quiz question updated successfully !'
    );
  });

  it('hides a question by toggling its status', async () => {
    const mutateAsync = jest
      .fn()
      .mockResolvedValue({ message: 'Quiz question hidden !' });
    userMutationsMock().useUpdateQuizQuestionStatus.mockReturnValue({
      mutateAsync
    });
    saveQuizTaskState({ courseId: 'c1', moduleId: 'm1', taskId: 't1' });
    useGetAllQuizQuestionsMock().mockReturnValue({
      data: [editableQuestion()],
      isLoading: false,
      isError: false
    });

    renderPage();

    fireEvent.click(screen.getByLabelText('Hide question'));

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith({
        questionId: 'q1',
        status: 'HIDE'
      });
    });
    expect(mockShowSuccessToast).toHaveBeenCalledWith('Quiz question hidden !');
  });

  it('deletes a question after confirming', async () => {
    const mutateAsync = jest
      .fn()
      .mockResolvedValue({ message: 'Quiz question deleted successfully !' });
    userMutationsMock().useDeleteQuizQuestion.mockReturnValue({ mutateAsync });
    saveQuizTaskState({ courseId: 'c1', moduleId: 'm1', taskId: 't1' });
    useGetAllQuizQuestionsMock().mockReturnValue({
      data: [editableQuestion()],
      isLoading: false,
      isError: false
    });

    renderPage();

    fireEvent.click(screen.getByLabelText('Delete question'));
    fireEvent.click(await screen.findByRole('button', { name: 'Yes, delete' }));

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith('q1');
    });
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Quiz question deleted successfully !'
    );
  }, 15000);

  it('shows an error toast when deleting a question fails', async () => {
    const mutateAsync = jest.fn().mockRejectedValue({});
    userMutationsMock().useDeleteQuizQuestion.mockReturnValue({ mutateAsync });
    saveQuizTaskState({ courseId: 'c1', moduleId: 'm1', taskId: 't1' });
    useGetAllQuizQuestionsMock().mockReturnValue({
      data: [editableQuestion()],
      isLoading: false,
      isError: false
    });

    renderPage();

    fireEvent.click(screen.getByLabelText('Delete question'));
    fireEvent.click(await screen.findByRole('button', { name: 'Yes, delete' }));

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith(
        'Failed to delete question'
      );
    });
  }, 15000);

  it('returns to the course and clears the quiz task state', () => {
    saveQuizTaskState({ courseId: 'c1', moduleId: 'm1', taskId: 't1' });

    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));

    expect(readQuizTaskState()).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith(
      '/acme/employee/dashboard/course/c1'
    );
  });

  it('goes back in history when there is no quiz task state', () => {
    renderPage();

    fireEvent.click(screen.getByRole('button', { name: 'Back' }));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
