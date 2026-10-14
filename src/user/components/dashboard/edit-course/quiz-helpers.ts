import {
  QuizOption,
  QuizQuestion,
  isMultiAnswerType,
  isTextAnswerType
} from '@interfaces/quiz';

let quizIdCounter = 0;

const createId = (prefix: string): string => `${prefix}-${++quizIdCounter}`;

export const createQuizOption = (text = '', isCorrect = false): QuizOption => ({
  id: createId('option'),
  text,
  isCorrect
});

export const createQuizQuestion = (): QuizQuestion => ({
  id: createId('question'),
  question: '',
  type: 'RADIO',
  status: 'SHOW',
  required: true,
  options: [createQuizOption(), createQuizOption()],
  isDeleted: false
});

export const validateQuizQuestion = (question: QuizQuestion): string | null => {
  if (!question.question.trim()) return 'Question is required.';
  if (isTextAnswerType(question.type)) return null;

  const filledOptions = question.options.filter(option => option.text.trim());
  if (filledOptions.length < 2) return 'Add at least two answer options.';

  const correctOptions = filledOptions.filter(option => option.isCorrect);
  if (correctOptions.length === 0)
    return 'Mark at least one option as the answer.';
  if (!isMultiAnswerType(question.type) && correctOptions.length > 1)
    return 'Only one option can be the correct answer for this type.';

  return null;
};
