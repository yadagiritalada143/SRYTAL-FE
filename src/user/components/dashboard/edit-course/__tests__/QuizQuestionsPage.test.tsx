import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import QuizQuestionsPage from '../QuizQuestionsPage';
import {
  REOPEN_TASK_POPUP_KEY,
  saveTaskDraft,
  readTaskDraft,
  clearTaskDraft
} from '../task-popup-state';
import { QuizQuestion } from '@interfaces/quiz';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ organization: 'acme' })
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

const parkDraft = (quizQuestions: QuizQuestion[] = []) =>
  saveTaskDraft({
    courseId: 'c1',
    moduleId: 'm1',
    taskName: 'Colour quiz',
    taskDescription: 'Pick a colour.',
    mode: 'QUIZ',
    link: '',
    file: null,
    thumbnail: null,
    quizQuestions
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
    clearTaskDraft();
  });

  it('renders the questions parked in the task draft', () => {
    parkDraft([
      {
        id: 'q1',
        question: 'What is your favourite colour?',
        type: 'RADIO',
        status: 'SHOW',
        required: true,
        options: [
          { id: 'o1', text: 'Red', isCorrect: true },
          { id: 'o2', text: 'Green', isCorrect: false }
        ],
        isDeleted: false
      }
    ]);

    renderPage();

    expect(
      screen.getByRole('heading', { name: 'Quiz Questions' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('What is your favourite colour?')
    ).toBeInTheDocument();
    expect(screen.getByText('1 question')).toBeInTheDocument();
  });

  it('writes the questions back to the draft and returns to the course', () => {
    parkDraft();
    renderPage();

    fireEvent.click(screen.getByRole('button', { name: 'Back' }));

    expect(readTaskDraft()).toEqual(
      expect.objectContaining({
        courseId: 'c1',
        moduleId: 'm1',
        mode: 'QUIZ',
        quizQuestions: []
      })
    );
    expect(
      JSON.parse(sessionStorage.getItem(REOPEN_TASK_POPUP_KEY) || '{}')
    ).toEqual({ courseId: 'c1', moduleId: 'm1' });
    expect(mockNavigate).toHaveBeenCalledWith(
      '/acme/employee/dashboard/course/c1'
    );
  });

  it('goes back in history when there is no draft to return to', () => {
    renderPage();

    fireEvent.click(screen.getByRole('button', { name: 'Back' }));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
    expect(readTaskDraft()).toBeNull();
  });
});
