export type QuizAnswerType =
  | 'RADIO'
  | 'CHECKBOX'
  | 'TOGGLE'
  | 'DROPDOWN'
  | 'TEXT';

export type QuizQuestionStatus = 'SHOW' | 'HIDE';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: QuizAnswerType;
  status: QuizQuestionStatus;
  required: boolean;
  options: QuizOption[];
  isDeleted: boolean;
}

export const QUIZ_ANSWER_TYPES: Array<{
  value: QuizAnswerType;
  label: string;
}> = [
  { value: 'RADIO', label: 'Single choice' },
  { value: 'CHECKBOX', label: 'Multiple choice' },
  { value: 'DROPDOWN', label: 'Dropdown' },
  { value: 'TEXT', label: 'Short text' },
  { value: 'TOGGLE', label: 'Toggle' }
];

export const QUIZ_QUESTION_STATUSES: Array<{
  value: QuizQuestionStatus;
  label: string;
}> = [
  { value: 'SHOW', label: 'Show' },
  { value: 'HIDE', label: 'Hide' }
];

export const QUIZ_MULTI_ANSWER_TYPES: QuizAnswerType[] = ['CHECKBOX', 'TOGGLE'];

export const isMultiAnswerType = (type: QuizAnswerType): boolean =>
  QUIZ_MULTI_ANSWER_TYPES.includes(type);

export const isTextAnswerType = (type: QuizAnswerType): boolean =>
  type === 'TEXT';

export const quizAnswerTypeLabel = (type: QuizAnswerType): string =>
  QUIZ_ANSWER_TYPES.find(entry => entry.value === type)?.label ?? type;

export const quizQuestionStatusLabel = (status: QuizQuestionStatus): string =>
  QUIZ_QUESTION_STATUSES.find(entry => entry.value === status)?.label ?? status;
