import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import QuizPlayerPreview from '../QuizPlayerPreview';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      borderColor: '#dee2e6',
      cardBackground: '#ffffff'
    },
    isDarkTheme: false
  })
}));

const makeQuestion = (overrides: any = {}) => ({
  id: 'q1',
  question: 'What is React?',
  type: 'RADIO',
  status: 'SHOW',
  options: [
    { id: 'o1', text: 'A library', isCorrect: true },
    { id: 'o2', text: 'A database', isCorrect: false }
  ],
  ...overrides
});

const renderPreview = (questions: any[]) =>
  render(
    <MantineProvider>
      <QuizPlayerPreview questions={questions} />
    </MantineProvider>
  );

const submit = () =>
  fireEvent.click(screen.getByRole('button', { name: /Submit & Grade/ }));

describe('QuizPlayerPreview', () => {
  it('shows an empty state when there are no questions', () => {
    renderPreview([]);

    expect(
      screen.getByText('No questions available to preview.')
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Submit & Grade/ })
    ).not.toBeInTheDocument();
  });

  it('renders a single-choice question with progress and navigation state', () => {
    renderPreview([makeQuestion()]);

    expect(screen.getByText('Question 1 of 1')).toBeInTheDocument();
    expect(screen.getByText('0 of 1 answered')).toBeInTheDocument();
    expect(screen.getByText('What is React?')).toBeInTheDocument();
    expect(screen.getByText('A library')).toBeInTheDocument();
    expect(screen.getByText('A database')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Previous/ })).toBeDisabled();
    expect(
      screen.getByRole('button', { name: /Submit & Grade/ })
    ).toBeEnabled();
  });

  it('scores a correct single-choice answer', () => {
    renderPreview([makeQuestion()]);

    fireEvent.click(screen.getByText('A library'));
    expect(screen.getByText('1 of 1 answered')).toBeInTheDocument();

    submit();

    expect(screen.getByText('Simulation Complete!')).toBeInTheDocument();
    expect(screen.getByText('1 / 1')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('scores an incorrect answer and allows rerunning the simulation', () => {
    renderPreview([makeQuestion()]);

    fireEvent.click(screen.getByText('A database'));
    submit();

    expect(screen.getByText('0 / 1')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: /Run simulation again/ })
    );

    expect(screen.getByText('Question 1 of 1')).toBeInTheDocument();
    expect(screen.getByText('0 of 1 answered')).toBeInTheDocument();
    expect(screen.queryByText('Simulation Complete!')).not.toBeInTheDocument();
  });

  it('moves between questions with the Next and Previous buttons', () => {
    renderPreview([
      makeQuestion(),
      makeQuestion({
        id: 'q2',
        question: 'Second question?',
        options: [{ id: 'o3', text: 'Yes', isCorrect: true }]
      })
    ]);

    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    expect(screen.getByText('Question 2 of 2')).toBeInTheDocument();
    expect(screen.getByText('Second question?')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Previous/ }));
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
  });

  it('handles multiple-choice answers and requires an exact match to score', () => {
    renderPreview([
      makeQuestion({
        id: 'q1',
        type: 'CHECKBOX',
        question: 'Pick all that apply',
        options: [
          { id: 'm1', text: 'First', isCorrect: true },
          { id: 'm2', text: 'Second', isCorrect: true },
          { id: 'm3', text: 'Third', isCorrect: false }
        ]
      })
    ]);

    fireEvent.click(screen.getByText('First'));
    fireEvent.click(screen.getByText('First')); // toggling again deselects
    expect(screen.getByText('0 of 1 answered')).toBeInTheDocument();

    fireEvent.click(screen.getByText('First'));
    fireEvent.click(screen.getByText('Third'));
    expect(screen.getByText('1 of 1 answered')).toBeInTheDocument();

    submit();

    // Two answers were selected but only one of them is correct.
    expect(screen.getByText('0 / 1')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: /Run simulation again/ })
    );

    fireEvent.click(screen.getByText('First'));
    fireEvent.click(screen.getByText('Second'));
    submit();

    expect(screen.getByText('1 / 1')).toBeInTheDocument();
  });

  it('supports toggle questions', () => {
    renderPreview([
      makeQuestion({
        id: 'q1',
        type: 'TOGGLE',
        question: 'Is React a library?',
        options: [
          { id: 't1', text: 'True', isCorrect: true },
          { id: 't2', text: 'False', isCorrect: false }
        ]
      })
    ]);

    fireEvent.click(screen.getByText('True'));
    submit();

    expect(screen.getByText('1 / 1')).toBeInTheDocument();
  });

  it('supports dropdown questions', async () => {
    renderPreview([
      makeQuestion({
        id: 'q1',
        type: 'DROPDOWN',
        question: 'Choose one',
        options: [
          { id: 'd1', text: 'Dropdown A', isCorrect: true },
          { id: 'd2', text: 'Dropdown B', isCorrect: false }
        ]
      })
    ]);

    const select = screen.getByPlaceholderText('Choose option...');
    fireEvent.click(select);

    fireEvent.click(await screen.findByRole('option', { name: 'Dropdown A' }));
    expect(screen.getByText('1 of 1 answered')).toBeInTheDocument();

    submit();
    expect(screen.getByText('1 / 1')).toBeInTheDocument();
  });

  it('counts a non-empty text answer as correct and blanks are ignored', () => {
    renderPreview([
      makeQuestion({
        id: 'q1',
        type: 'TEXTAREA',
        question: 'Explain React',
        options: []
      })
    ]);

    submit();
    expect(screen.getByText('0 / 1')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: /Run simulation again/ })
    );

    fireEvent.change(
      screen.getByPlaceholderText('Type your response here...'),
      { target: { value: 'A UI library' } }
    );
    expect(screen.getByText('1 of 1 answered')).toBeInTheDocument();
    submit();

    expect(screen.getByText('1 / 1')).toBeInTheDocument();
  });
});
