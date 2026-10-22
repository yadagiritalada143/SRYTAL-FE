export {
  isMultiAnswerType,
  isTextAnswerType,
  quizMinCorrectOptions,
  QUIZ_MIN_CORRECT_OPTIONS,
  QUIZ_MIN_OPTIONS
} from '@interfaces/quiz';
import {
  QuizOption,
  QuizQuestion,
  QuizQuestionApiModel,
  QuizQuestionApiPayload,
  QuizQuestionApiUpdatePayload,
  isMultiAnswerType,
  isTextAnswerType,
  quizMinCorrectOptions,
  QUIZ_MIN_OPTIONS
} from '@interfaces/quiz';

export type QuizQuestionField = 'question' | 'options' | 'correctAnswer';

export type QuizQuestionFieldErrors = Partial<
  Record<QuizQuestionField, string>
>;

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
  options: [
    createQuizOption(),
    createQuizOption(),
    createQuizOption(),
    createQuizOption()
  ]
});

export const TOGGLE_PRESETS = [
  { label: 'True / False', opt1: 'True', opt2: 'False' },
  { label: 'Yes / No', opt1: 'Yes', opt2: 'No' },
  { label: 'Agree / Disagree', opt1: 'Agree', opt2: 'Disagree' },
  { label: 'Pass / Fail', opt1: 'Pass', opt2: 'Fail' }
];

export const checkDuplicateQuestion = (
  questionText: string,
  questions: QuizQuestion[],
  excludeId?: string | null
): boolean => {
  const trimmed = questionText.trim().toLowerCase();
  if (!trimmed) return false;
  return questions.some(
    q => q.id !== excludeId && q.question.trim().toLowerCase() === trimmed
  );
};

export const duplicateQuizQuestion = (
  question: QuizQuestion
): QuizQuestion => ({
  id: createId('question'),
  question: `${question.question.trim()} (Copy)`,
  type: question.type,
  status: question.status,
  options: question.options.map(option => ({
    id: createId('option'),
    text: option.text,
    isCorrect: option.isCorrect
  }))
});

export const adjustOptionsForType = (
  options: QuizOption[],
  type: QuizQuestion['type']
): QuizOption[] => {
  if (isTextAnswerType(type)) return options;

  if (type === 'TOGGLE') {
    const next = options.slice(0, 2);
    while (next.length < 2) next.push(createQuizOption());
    let seenCorrect = false;
    return next.map(option => {
      if (option.isCorrect && !seenCorrect) {
        seenCorrect = true;
        return option;
      }
      return { ...option, isCorrect: false };
    });
  }

  const next = [...options];
  while (next.length < QUIZ_MIN_OPTIONS) next.push(createQuizOption());

  if (type === 'CHECKBOX') return next;

  const firstCorrect = next.find(option => option.isCorrect)?.id;
  return next.map(option => ({
    ...option,
    isCorrect: option.id === firstCorrect
  }));
};

export const countCorrectOptions = (question: QuizQuestion): number =>
  question.options.filter(option => option.isCorrect && option.text.trim())
    .length;

export const getQuizQuestionFieldErrors = (
  question: QuizQuestion
): QuizQuestionFieldErrors => {
  const errors: QuizQuestionFieldErrors = {};

  if (!question.question.trim()) {
    errors.question = 'Question is required.';
  }

  if (isTextAnswerType(question.type)) return errors;

  const filledOptions = question.options.filter(option => option.text.trim());
  const correctOptions = countCorrectOptions(question);

  if (question.type === 'TOGGLE') {
    if (filledOptions.length !== 2) {
      errors.options = 'Toggle questions must have exactly two options.';
    }
    if (correctOptions !== 1) {
      errors.correctAnswer =
        'Toggle questions must have exactly one correct option.';
    }
    return errors;
  }

  if (filledOptions.length < QUIZ_MIN_OPTIONS) {
    errors.options = `Add at least ${QUIZ_MIN_OPTIONS} answer options.`;
  }

  if (isMultiAnswerType(question.type)) {
    const minCorrect = quizMinCorrectOptions(question.type);
    if (correctOptions < minCorrect) {
      errors.correctAnswer = `Mark at least ${minCorrect} options as the correct answers.`;
    }
  } else if (correctOptions === 0) {
    errors.correctAnswer = 'Mark at least one option as the answer.';
  } else if (correctOptions > 1) {
    errors.correctAnswer =
      'Only one option can be the correct answer for this type.';
  }

  return errors;
};

export const validateQuizQuestion = (question: QuizQuestion): string | null => {
  const errors = getQuizQuestionFieldErrors(question);
  return errors.question ?? errors.options ?? errors.correctAnswer ?? null;
};

export class QuizQuestionValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuizQuestionValidationError';
    Object.setPrototypeOf(this, QuizQuestionValidationError.prototype);
  }
}

export const assertQuizQuestionIsSubmittable = (
  question: QuizQuestion
): void => {
  if (!isMultiAnswerType(question.type)) return;

  const minCorrect = quizMinCorrectOptions(question.type);
  if (countCorrectOptions(question) < minCorrect) {
    throw new QuizQuestionValidationError(
      `Mark at least ${minCorrect} options as the correct answers.`
    );
  }
};

export const toQuizQuestionPayload = (
  question: QuizQuestion,
  taskId: string
): QuizQuestionApiPayload => {
  assertQuizQuestionIsSubmittable(question);

  const payload: QuizQuestionApiPayload = {
    taskId,
    question: question.question.trim(),
    type: question.type,
    status: question.status
  };

  if (!isTextAnswerType(question.type)) {
    payload.options = question.options
      .filter(option => option.text.trim())
      .map(option => ({
        value: option.text.trim(),
        isanswer: option.isCorrect
      }));
  }

  return payload;
};

export const toQuizQuestionUpdatePayload = (
  question: QuizQuestion
): QuizQuestionApiUpdatePayload => {
  assertQuizQuestionIsSubmittable(question);

  const payload: QuizQuestionApiUpdatePayload = {
    question: question.question.trim(),
    type: question.type,
    status: question.status
  };

  if (!isTextAnswerType(question.type)) {
    payload.options = question.options
      .filter(option => option.text.trim())
      .map(option => ({
        value: option.text.trim(),
        isanswer: option.isCorrect
      }));
  }

  return payload;
};

export const fromQuizQuestionApi = (
  model: QuizQuestionApiModel
): QuizQuestion => {
  const qId = model._id || (model as any).id || (model as any).questionId || '';
  return {
    id: qId,
    question: model.question,
    type: model.type,
    status: model.status ?? 'SHOW',
    options: (model.options ?? []).map((option, index) => ({
      id: `${qId}-option-${index}`,
      text: option.value ?? (option as any).text ?? '',
      isCorrect: Boolean(option.isanswer)
    }))
  };
};
