import {
  buildQuizAnswers,
  getQuizSubmitFailure,
  SelectedOptions,
  TextAnswers
} from '../quiz-attempt';
import { QuizAttemptQuestion, QuizSubmitResult } from '@interfaces/quiz';

const questions: QuizAttemptQuestion[] = [
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
    question: 'Pick many',
    type: 'CHECKBOX',
    options: [
      { optionId: 'opt-0', value: 'A' },
      { optionId: 'opt-1', value: 'B' }
    ]
  },
  {
    questionId: 'q3',
    question: 'Explain',
    type: 'TEXTAREA'
  }
];

describe('buildQuizAnswers', () => {
  it('maps option questions to selectedOptionIds and text questions to textAnswer', () => {
    const selected: SelectedOptions = { q1: ['opt-1'], q2: ['opt-0', 'opt-1'] };
    const text: TextAnswers = { q3: 'Because' };

    expect(buildQuizAnswers(questions, selected, text)).toEqual([
      { questionId: 'q1', selectedOptionIds: ['opt-1'] },
      { questionId: 'q2', selectedOptionIds: ['opt-0', 'opt-1'] },
      { questionId: 'q3', textAnswer: 'Because' }
    ]);
  });

  it('includes every question, sending unanswered ones over empty', () => {
    expect(buildQuizAnswers(questions, {}, {})).toEqual([
      { questionId: 'q1', selectedOptionIds: [] },
      { questionId: 'q2', selectedOptionIds: [] },
      { questionId: 'q3', textAnswer: '' }
    ]);
  });

  it('treats an unknown/blank type as an option question', () => {
    const oddQuestions: QuizAttemptQuestion[] = [
      { questionId: 'q1', question: 'Weird', type: '' }
    ];
    expect(buildQuizAnswers(oddQuestions, { q1: ['opt-0'] }, {})).toEqual([
      { questionId: 'q1', selectedOptionIds: ['opt-0'] }
    ]);
  });
});

describe('getQuizSubmitFailure', () => {
  const failure: QuizSubmitResult = {
    taskId: 't1',
    attemptId: 'a1',
    passed: false,
    percentage: 0,
    passingPercentage: 70,
    reattemptRequired: true
  };

  it('returns the result when a failed submit needs a new attempt', () => {
    const error = { response: { data: { data: failure } } };
    expect(getQuizSubmitFailure(error)).toEqual(failure);
  });

  it('returns null for a generic error', () => {
    expect(getQuizSubmitFailure(new Error('boom'))).toBeNull();
    expect(getQuizSubmitFailure({ response: { data: {} } })).toBeNull();
    expect(
      getQuizSubmitFailure({ response: { data: { data: { passed: false } } } })
    ).toBeNull();
  });
});
