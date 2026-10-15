import {
  QuizOption,
  QuizQuestion,
  QuizQuestionApiModel,
  QuizQuestionApiPayload,
  QuizQuestionApiUpdatePayload,
  isMultiAnswerType,
  isTextAnswerType,
  QUIZ_MIN_OPTIONS
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
  options: [
    createQuizOption(),
    createQuizOption(),
    createQuizOption(),
    createQuizOption()
  ]
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

export const validateQuizQuestion = (question: QuizQuestion): string | null => {
  if (!question.question.trim()) return 'Question is required.';
  if (isTextAnswerType(question.type)) return null;

  const filledOptions = question.options.filter(option => option.text.trim());
  const correctOptions = filledOptions.filter(option => option.isCorrect);

  if (question.type === 'TOGGLE') {
    if (filledOptions.length !== 2)
      return 'Toggle questions must have exactly two options.';
    if (correctOptions.length !== 1)
      return 'Toggle questions must have exactly one correct option.';
    return null;
  }

  if (filledOptions.length < QUIZ_MIN_OPTIONS)
    return `Add at least ${QUIZ_MIN_OPTIONS} answer options.`;

  if (correctOptions.length === 0)
    return 'Mark at least one option as the answer.';
  if (!isMultiAnswerType(question.type) && correctOptions.length > 1)
    return 'Only one option can be the correct answer for this type.';

  return null;
};

export const toQuizQuestionPayload = (
  question: QuizQuestion,
  taskId: string
): QuizQuestionApiPayload => {
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
): QuizQuestion => ({
  id: model._id,
  question: model.question,
  type: model.type,
  status: model.status ?? 'SHOW',
  options: (model.options ?? []).map((option, index) => ({
    id: `${model._id}-option-${index}`,
    text: option.value,
    isCorrect: Boolean(option.isanswer)
  }))
});
