import { useState } from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import QuizBuilder from '../QuizBuilder';
import { validateQuizQuestion } from '../quiz-helpers';
import { QuizQuestion } from '@interfaces/quiz';

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

const baseQuestion = (overrides: Partial<QuizQuestion> = {}): QuizQuestion => ({
  id: 'q1',
  question: 'What is your favourite colour?',
  type: 'RADIO',
  status: 'SHOW',
  required: true,
  options: [
    { id: 'o1', text: 'Red', isCorrect: true },
    { id: 'o2', text: 'Green', isCorrect: false }
  ],
  isDeleted: false,
  ...overrides
});

const Harness = ({ initial = [] as QuizQuestion[] }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(initial);
  return (
    <MantineProvider>
      <QuizBuilder value={questions} onChange={setQuestions} />
    </MantineProvider>
  );
};

/** Opens a Mantine Select by label and clicks one of its options. */
const chooseSelectOption = (label: string, optionText: string) => {
  const input = screen
    .getAllByLabelText(label)
    .find(element => element.tagName === 'INPUT') as HTMLInputElement;
  fireEvent.click(input);
  const option = screen
    .getAllByText(optionText)
    .find(el => el.closest('[data-combobox-option]'));
  fireEvent.click(option as HTMLElement);
};

const cardFor = (questionText: string) =>
  screen.getByText(questionText).closest('.mantine-Card-root') as HTMLElement;

describe('validateQuizQuestion', () => {
  it('requires the question text', () => {
    expect(validateQuizQuestion(baseQuestion({ question: '  ' }))).toBe(
      'Question is required.'
    );
  });

  it('accepts a text answer type without options', () => {
    expect(
      validateQuizQuestion(baseQuestion({ type: 'TEXT', options: [] }))
    ).toBeNull();
  });

  it('requires at least two filled options for choice types', () => {
    expect(
      validateQuizQuestion(
        baseQuestion({
          options: [
            { id: 'o1', text: 'Red', isCorrect: true },
            { id: 'o2', text: '   ', isCorrect: false }
          ]
        })
      )
    ).toBe('Add at least two answer options.');
  });

  it('requires at least one correct answer', () => {
    expect(
      validateQuizQuestion(
        baseQuestion({
          options: [
            { id: 'o1', text: 'Red', isCorrect: false },
            { id: 'o2', text: 'Green', isCorrect: false }
          ]
        })
      )
    ).toBe('Mark at least one option as the answer.');
  });

  it('rejects more than one correct answer for single-answer types', () => {
    expect(
      validateQuizQuestion(
        baseQuestion({
          options: [
            { id: 'o1', text: 'Red', isCorrect: true },
            { id: 'o2', text: 'Green', isCorrect: true }
          ]
        })
      )
    ).toBe('Only one option can be the correct answer for this type.');
  });

  it('allows multiple correct answers for checkbox types', () => {
    expect(
      validateQuizQuestion(
        baseQuestion({
          type: 'CHECKBOX',
          options: [
            { id: 'o1', text: 'Red', isCorrect: true },
            { id: 'o2', text: 'Green', isCorrect: true }
          ]
        })
      )
    ).toBeNull();
  });
});

describe('QuizBuilder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows the empty state when there are no questions', () => {
    render(<Harness />);
    expect(
      screen.getByText(
        'No questions yet. Add your first question to build this quiz.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('0 questions')).toBeInTheDocument();
    expect(screen.getByText('Add a question')).toBeInTheDocument();
    expect(screen.getByText('Existing questions')).toBeInTheDocument();
  });

  it('lists saved questions with their type, required flag and options', () => {
    render(<Harness initial={[baseQuestion()]} />);

    const card = cardFor('What is your favourite colour?');
    expect(within(card).getByText('Single choice')).toBeInTheDocument();
    expect(within(card).getByText('Required')).toBeInTheDocument();
    expect(within(card).getByText('Red')).toBeInTheDocument();
    expect(within(card).getByText('Green')).toBeInTheDocument();
  });

  it('marks optional questions as optional', () => {
    render(<Harness initial={[baseQuestion({ required: false })]} />);

    const card = cardFor('What is your favourite colour?');
    expect(within(card).getByText('Optional')).toBeInTheDocument();
  });

  it('adds a single-answer question after marking the correct option', () => {
    render(<Harness />);

    fireEvent.change(screen.getByLabelText(/Question/), {
      target: { value: 'What best describes your role?' }
    });
    fireEvent.change(screen.getByLabelText('Option 1'), {
      target: { value: 'Engineer' }
    });
    fireEvent.change(screen.getByLabelText('Option 2'), {
      target: { value: 'Manager' }
    });

    fireEvent.click(screen.getAllByRole('radio', { name: 'Correct' })[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Add question' }));

    const card = cardFor('What best describes your role?');
    expect(within(card).getByText('Single choice')).toBeInTheDocument();
    expect(within(card).getByText('Engineer')).toBeInTheDocument();
    expect(within(card).getByText('Manager')).toBeInTheDocument();
    expect(screen.getByText('1 question')).toBeInTheDocument();
  });

  it('clears the editor after a question is added', () => {
    render(<Harness />);

    fireEvent.change(screen.getByLabelText(/Question/), {
      target: { value: 'What best describes your role?' }
    });
    fireEvent.change(screen.getByLabelText('Option 1'), {
      target: { value: 'Engineer' }
    });
    fireEvent.change(screen.getByLabelText('Option 2'), {
      target: { value: 'Manager' }
    });
    fireEvent.click(screen.getAllByRole('radio', { name: 'Correct' })[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Add question' }));

    expect(screen.getByLabelText(/Question/)).toHaveValue('');
    expect(screen.getByLabelText('Option 1')).toHaveValue('');
  });

  it('validates the question before saving', () => {
    render(<Harness />);

    fireEvent.click(screen.getByRole('button', { name: 'Add question' }));

    expect(screen.getByText('Question is required.')).toBeInTheDocument();
  });

  it('hides the answer options for a short text question', () => {
    render(<Harness />);

    chooseSelectOption('Type', 'Short text');

    expect(screen.queryByLabelText('Option 1')).not.toBeInTheDocument();
    expect(
      screen.getByText(
        'Learners type their answer into a free-text box. No options are needed for this type.'
      )
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Question/), {
      target: { value: 'Tell us about yourself?' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add question' }));

    const card = cardFor('Tell us about yourself?');
    expect(within(card).getByText('Short text')).toBeInTheDocument();
  });

  it('lets multiple answers be correct for multiple choice questions', () => {
    render(<Harness />);

    chooseSelectOption('Type', 'Multiple choice');
    fireEvent.change(screen.getByLabelText(/Question/), {
      target: { value: 'Which are primary colours?' }
    });
    fireEvent.change(screen.getByLabelText('Option 1'), {
      target: { value: 'Red' }
    });
    fireEvent.change(screen.getByLabelText('Option 2'), {
      target: { value: 'Green' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add option' }));
    fireEvent.change(screen.getByLabelText('Option 3'), {
      target: { value: 'Blue' }
    });

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[2]);

    fireEvent.click(screen.getByRole('button', { name: 'Add question' }));

    const card = cardFor('Which are primary colours?');
    expect(within(card).getByText('Multiple choice')).toBeInTheDocument();
    expect(within(card).getByText('Red')).toBeInTheDocument();
    expect(within(card).getByText('Green')).toBeInTheDocument();
    expect(within(card).getByText('Blue')).toBeInTheDocument();
  });

  it('adds answer options on demand', () => {
    render(<Harness />);

    expect(screen.queryByLabelText('Option 3')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Add option' }));
    expect(screen.getByLabelText('Option 3')).toBeInTheDocument();
  });

  it('updates an existing question', () => {
    render(<Harness initial={[baseQuestion()]} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Edit question: What is your favourite colour?'
      })
    );
    fireEvent.change(screen.getByLabelText(/Question/), {
      target: { value: 'What is your favourite hue?' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

    expect(screen.getByText('What is your favourite hue?')).toBeInTheDocument();
    expect(
      screen.queryByText('What is your favourite colour?')
    ).not.toBeInTheDocument();
  });

  it('toggles a question between required and optional', () => {
    render(<Harness />);

    fireEvent.change(screen.getByLabelText(/Question/), {
      target: { value: 'How do you work under pressure?' }
    });
    fireEvent.change(screen.getByLabelText('Option 1'), {
      target: { value: 'Good' }
    });
    fireEvent.change(screen.getByLabelText('Option 2'), {
      target: { value: 'Bad' }
    });
    fireEvent.click(screen.getAllByRole('radio', { name: 'Correct' })[0]);
    fireEvent.click(screen.getByRole('radio', { name: 'Optional' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add question' }));

    const card = cardFor('How do you work under pressure?');
    expect(within(card).getByText('Optional')).toBeInTheDocument();
  });

  it('soft deletes a question and can restore it', () => {
    render(<Harness initial={[baseQuestion()]} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Delete question: What is your favourite colour?'
      })
    );

    // Hidden from the active list but still retained (soft delete).
    expect(
      screen.queryByText('What is your favourite colour?')
    ).not.toBeInTheDocument();
    expect(screen.getByLabelText('Show deleted questions')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Show deleted questions'));

    expect(
      within(cardFor('What is your favourite colour?')).getByText('Deleted')
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Restore question: What is your favourite colour?'
      })
    );

    expect(screen.getByText('1 question')).toBeInTheDocument();
    expect(
      screen.queryByLabelText('Show deleted questions')
    ).not.toBeInTheDocument();
  });

  it('cancels editing without saving changes', () => {
    render(<Harness />);

    fireEvent.change(screen.getByLabelText(/Question/), {
      target: { value: 'Draft question' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.getByLabelText(/Question/)).toHaveValue('');
    expect(screen.queryByText('Draft question')).not.toBeInTheDocument();
  });
});
