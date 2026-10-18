import { useState } from 'react';
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor
} from '@testing-library/react';
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
  options: [
    { id: 'o1', text: 'Red', isCorrect: true },
    { id: 'o2', text: 'Green', isCorrect: false },
    { id: 'o3', text: 'Blue', isCorrect: false },
    { id: 'o4', text: 'Yellow', isCorrect: false }
  ],
  ...overrides
});

const Harness = ({
  initial = [] as QuizQuestion[],
  onAddQuestion = undefined as
    | ((question: QuizQuestion) => Promise<void> | void)
    | undefined,
  onUpdateQuestion = undefined as
    | ((question: QuizQuestion) => Promise<void> | void)
    | undefined,
  onToggleStatus = undefined as
    | ((question: QuizQuestion) => Promise<void> | void)
    | undefined,
  onDeleteQuestion = undefined as
    | ((question: QuizQuestion) => Promise<void> | void)
    | undefined,
  isLoading = false,
  isSubmitting = false
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(initial);
  return (
    <MantineProvider>
      <QuizBuilder
        questions={questions}
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        onUpdateQuestion={onUpdateQuestion}
        onToggleStatus={onToggleStatus}
        onDeleteQuestion={
          onDeleteQuestion ??
          (question =>
            setQuestions(prev => prev.filter(item => item.id !== question.id)))
        }
        onAddQuestion={
          onAddQuestion ??
          (question => setQuestions(prev => [...prev, question]))
        }
      />
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

const fillOption = (index: number, value: string) =>
  fireEvent.change(screen.getByLabelText(`Option ${index}`), {
    target: { value }
  });

const cardFor = (questionText: string) => {
  const elements = screen.getAllByText(questionText);
  const nonTextarea = elements.find(el => el.tagName !== 'TEXTAREA');
  return (nonTextarea || elements[0]).closest(
    '.mantine-Card-root'
  ) as HTMLElement;
};

describe('validateQuizQuestion', () => {
  it('requires the question text', () => {
    expect(validateQuizQuestion(baseQuestion({ question: '  ' }))).toBe(
      'Question is required.'
    );
  });

  it('accepts a text answer type without options', () => {
    expect(
      validateQuizQuestion(baseQuestion({ type: 'TEXTAREA', options: [] }))
    ).toBeNull();
  });

  it('requires at least four filled options for choice types', () => {
    expect(
      validateQuizQuestion(
        baseQuestion({
          options: [
            { id: 'o1', text: 'Red', isCorrect: true },
            { id: 'o2', text: 'Green', isCorrect: false }
          ]
        })
      )
    ).toBe('Add at least 4 answer options.');
  });

  it('requires at least one correct answer', () => {
    expect(
      validateQuizQuestion(
        baseQuestion({
          options: baseQuestion().options.map(option => ({
            ...option,
            isCorrect: false
          }))
        })
      )
    ).toBe('Mark at least one option as the answer.');
  });

  it('rejects more than one correct answer for single-answer types', () => {
    expect(
      validateQuizQuestion(
        baseQuestion({
          options: baseQuestion().options.map(option => ({
            ...option,
            isCorrect: option.id === 'o1' || option.id === 'o2'
          }))
        })
      )
    ).toBe('Only one option can be the correct answer for this type.');
  });

  it('allows multiple correct answers for checkbox types', () => {
    expect(
      validateQuizQuestion(
        baseQuestion({
          type: 'CHECKBOX',
          options: baseQuestion().options.map(option => ({
            ...option,
            isCorrect: option.id === 'o1' || option.id === 'o2'
          }))
        })
      )
    ).toBeNull();
  });

  it('requires exactly two options for toggle questions', () => {
    expect(
      validateQuizQuestion(
        baseQuestion({
          type: 'TOGGLE',
          options: [
            { id: 'o1', text: 'Yes', isCorrect: true },
            { id: 'o2', text: 'No', isCorrect: false },
            { id: 'o3', text: 'Maybe', isCorrect: false }
          ]
        })
      )
    ).toBe('Toggle questions must have exactly two options.');
  });

  it('requires exactly one correct option for toggle questions', () => {
    expect(
      validateQuizQuestion(
        baseQuestion({
          type: 'TOGGLE',
          options: [
            { id: 'o1', text: 'Yes', isCorrect: true },
            { id: 'o2', text: 'No', isCorrect: true }
          ]
        })
      )
    ).toBe('Toggle questions must have exactly one correct option.');
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

  it('shows a loader while the questions are loading', () => {
    render(<Harness isLoading />);
    expect(
      screen.queryByText(
        'No questions yet. Add your first question to build this quiz.'
      )
    ).not.toBeInTheDocument();
  });

  it('lists saved questions with their type, status and options', () => {
    render(<Harness initial={[baseQuestion()]} />);

    const card = cardFor('What is your favourite colour?');
    expect(within(card).getByText('Single choice')).toBeInTheDocument();
    expect(within(card).getByText('Show')).toBeInTheDocument();
    expect(within(card).getByText('Red')).toBeInTheDocument();
    expect(within(card).getByText('Green')).toBeInTheDocument();
  });

  it('adds a single-answer question after filling the options', async () => {
    render(<Harness />);

    fireEvent.change(screen.getByLabelText(/Question/), {
      target: { value: 'What best describes your role?' }
    });
    fillOption(1, 'Engineer');
    fillOption(2, 'Manager');
    fillOption(3, 'Designer');
    fillOption(4, 'Sales');

    fireEvent.click(screen.getAllByRole('radio', { name: 'Correct' })[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Add question' }));

    await screen.findByText('1 question');
    const card = cardFor('What best describes your role?');
    expect(within(card).getByText('Single choice')).toBeInTheDocument();
    expect(within(card).getByText('Engineer')).toBeInTheDocument();
    expect(within(card).getByText('Manager')).toBeInTheDocument();
  });

  it('clears the editor after a question is added', async () => {
    render(<Harness />);

    fireEvent.change(screen.getByLabelText(/Question/), {
      target: { value: 'What best describes your role?' }
    });
    fillOption(1, 'Engineer');
    fillOption(2, 'Manager');
    fillOption(3, 'Designer');
    fillOption(4, 'Sales');
    fireEvent.click(screen.getAllByRole('radio', { name: 'Correct' })[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Add question' }));

    await screen.findByText('1 question');
    expect(screen.getByLabelText(/Question/)).toHaveValue('');
    expect(screen.getByLabelText('Option 1')).toHaveValue('');
  });

  it('passes the draft to onAddQuestion instead of mutating the list', async () => {
    const onAddQuestion = jest.fn().mockResolvedValue(undefined);
    render(<Harness onAddQuestion={onAddQuestion} />);

    fireEvent.change(screen.getByLabelText(/Question/), {
      target: { value: 'Pick one' }
    });
    fillOption(1, 'A');
    fillOption(2, 'B');
    fillOption(3, 'C');
    fillOption(4, 'D');
    fireEvent.click(screen.getAllByRole('radio', { name: 'Correct' })[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Add question' }));

    await screen.findByText('0 questions');
    expect(onAddQuestion).toHaveBeenCalledWith(
      expect.objectContaining({ question: 'Pick one' })
    );
  });

  it('keeps the draft when the request fails', async () => {
    const onAddQuestion = jest.fn().mockRejectedValue(new Error('boom'));
    render(<Harness onAddQuestion={onAddQuestion} />);

    fireEvent.change(screen.getByLabelText(/Question/), {
      target: { value: 'Pick one' }
    });
    fillOption(1, 'A');
    fillOption(2, 'B');
    fillOption(3, 'C');
    fillOption(4, 'D');
    fireEvent.click(screen.getAllByRole('radio', { name: 'Correct' })[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Add question' }));

    expect(await screen.findByText('0 questions')).toBeInTheDocument();
    expect(screen.getByLabelText(/Question/)).toHaveValue('Pick one');
  });

  it('validates the question before saving', () => {
    render(<Harness />);

    fireEvent.click(screen.getByRole('button', { name: 'Add question' }));

    expect(screen.getByText('Question is required.')).toBeInTheDocument();
  });

  it('hides the answer options for a short text question', async () => {
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

    await screen.findByText('1 question');
    const card = cardFor('Tell us about yourself?');
    expect(within(card).getByText('Short text')).toBeInTheDocument();
  });

  it('lets multiple answers be correct for multiple choice questions', async () => {
    render(<Harness />);

    chooseSelectOption('Type', 'Multiple choice');
    fireEvent.change(screen.getByLabelText(/Question/), {
      target: { value: 'Which are primary colours?' }
    });
    fillOption(1, 'Red');
    fillOption(2, 'Green');
    fillOption(3, 'Blue');
    fillOption(4, 'Yellow');

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[2]);

    fireEvent.click(screen.getByRole('button', { name: 'Add question' }));

    await screen.findByText('1 question');
    const card = cardFor('Which are primary colours?');
    expect(within(card).getByText('Multiple choice')).toBeInTheDocument();
    expect(within(card).getByText('Red')).toBeInTheDocument();
    expect(within(card).getByText('Blue')).toBeInTheDocument();
  });

  it('trims the available options down to two for toggle questions', () => {
    render(<Harness />);

    chooseSelectOption('Type', 'Toggle');

    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
    expect(screen.queryByLabelText('Option 3')).not.toBeInTheDocument();
  });

  it('adds answer options on demand', () => {
    render(<Harness />);

    expect(screen.queryByLabelText('Option 5')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Add option' }));
    expect(screen.getByLabelText('Option 5')).toBeInTheDocument();
  });

  it('resets the editor when Cancel is clicked', () => {
    render(<Harness />);

    fireEvent.change(screen.getByLabelText(/Question/), {
      target: { value: 'Draft question' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.getByLabelText(/Question/)).toHaveValue('');
  });

  it('disables the save button while submitting', () => {
    render(<Harness isSubmitting />);
    expect(screen.getByRole('button', { name: 'Add question' })).toBeDisabled();
  });

  it('loads a saved question into the editor in edit mode', () => {
    render(<Harness initial={[baseQuestion()]} />);

    fireEvent.click(screen.getByLabelText('Edit question'));

    expect(screen.getByText('Edit question')).toBeInTheDocument();
    expect(screen.getByLabelText(/Question/)).toHaveValue(
      'What is your favourite colour?'
    );
    expect(
      screen.getByRole('button', { name: 'Save changes' })
    ).toBeInTheDocument();
  });

  it('passes the edited question to onUpdateQuestion', async () => {
    const onUpdateQuestion = jest.fn().mockResolvedValue(undefined);
    render(
      <Harness initial={[baseQuestion()]} onUpdateQuestion={onUpdateQuestion} />
    );

    fireEvent.click(screen.getByLabelText('Edit question'));
    fireEvent.change(screen.getByLabelText(/Question/), {
      target: { value: 'Updated question?' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

    await waitFor(() =>
      expect(onUpdateQuestion).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'q1', question: 'Updated question?' })
      )
    );
  });

  it('requests a status change when the visibility action is used', () => {
    const onToggleStatus = jest.fn();
    render(
      <Harness initial={[baseQuestion()]} onToggleStatus={onToggleStatus} />
    );

    fireEvent.click(screen.getByLabelText('Hide question'));

    expect(onToggleStatus).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'q1', status: 'SHOW' })
    );
  });

  it('offers to show a hidden question', () => {
    render(<Harness initial={[baseQuestion({ status: 'HIDE' })]} />);

    expect(screen.getByLabelText('Show question')).toBeInTheDocument();
  });

  it('deletes a question only after the confirmation is accepted', async () => {
    const onDeleteQuestion = jest.fn().mockResolvedValue(undefined);
    render(
      <Harness initial={[baseQuestion()]} onDeleteQuestion={onDeleteQuestion} />
    );

    fireEvent.click(screen.getByLabelText('Delete question'));
    expect(onDeleteQuestion).not.toHaveBeenCalled();

    fireEvent.click(await screen.findByRole('button', { name: 'Yes, delete' }));

    await waitFor(() =>
      expect(onDeleteQuestion).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'q1' })
      )
    );
  }, 15000);

  it('keeps the question when the confirmation is dismissed', async () => {
    const onDeleteQuestion = jest.fn();
    render(
      <Harness initial={[baseQuestion()]} onDeleteQuestion={onDeleteQuestion} />
    );

    fireEvent.click(screen.getByLabelText('Delete question'));
    fireEvent.click(
      await screen.findByRole('button', { name: 'Keep question' })
    );

    expect(onDeleteQuestion).not.toHaveBeenCalled();
    expect(
      screen.getByText('What is your favourite colour?')
    ).toBeInTheDocument();
  }, 15000);

  it('allows deleting a question directly from the edit form', async () => {
    const onDeleteQuestion = jest.fn().mockResolvedValue(undefined);
    render(
      <Harness initial={[baseQuestion()]} onDeleteQuestion={onDeleteQuestion} />
    );

    fireEvent.click(screen.getByLabelText('Edit question'));
    expect(
      screen.getByRole('button', { name: 'Save changes' })
    ).toBeInTheDocument();

    const deleteInFormBtn = screen
      .getByText('Delete question')
      .closest('button')!;
    expect(deleteInFormBtn).toBeInTheDocument();
    fireEvent.click(deleteInFormBtn);

    fireEvent.click(await screen.findByRole('button', { name: 'Yes, delete' }));

    await waitFor(() =>
      expect(onDeleteQuestion).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'q1' })
      )
    );
  }, 15000);
});
