import { AxiosError } from 'axios';
import {
  QuizAnswerSubmission,
  QuizAttemptQuestion,
  QuizSubmitResult
} from '@interfaces/quiz';

export type SelectedOptions = Record<string, string[]>;
export type TextAnswers = Record<string, string>;

export const buildQuizAnswers = (
  questions: QuizAttemptQuestion[],
  selectedOptions: SelectedOptions,
  textAnswers: TextAnswers
): QuizAnswerSubmission[] =>
  questions.map(question => {
    const type = String(question.type || '').toUpperCase();

    if (type === 'TEXTAREA') {
      return {
        questionId: question.questionId,
        textAnswer: textAnswers[question.questionId] ?? ''
      };
    }

    return {
      questionId: question.questionId,
      selectedOptionIds: selectedOptions[question.questionId] ?? []
    };
  });

export const getQuizSubmitFailure = (
  error: unknown
): QuizSubmitResult | null => {
  const data = (error as AxiosError<{ data?: QuizSubmitResult }>)?.response
    ?.data?.data;
  if (data && typeof data === 'object' && data.reattemptRequired) {
    return data;
  }
  return null;
};
