export type QuizAnswerType =
  | 'RADIO'
  | 'CHECKBOX'
  | 'TOGGLE'
  | 'DROPDOWN'
  | 'TEXTAREA';

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
  options: QuizOption[];
}

export interface QuizQuestionApiOption {
  value: string;
  isanswer?: boolean;
}

export interface QuizQuestionApiPayload {
  taskId: string;
  question: string;
  type: QuizAnswerType;
  status: QuizQuestionStatus;
  options?: QuizQuestionApiOption[];
}

export interface QuizQuestionApiUpdatePayload {
  question?: string;
  type?: QuizAnswerType;
  options?: QuizQuestionApiOption[];
  status?: QuizQuestionStatus;
}

export interface QuizQuestionApiModel {
  _id: string;
  taskId?: string;
  question: string;
  type: QuizAnswerType;
  status: QuizQuestionStatus;
  options?: QuizQuestionApiOption[];
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const QUIZ_ANSWER_TYPES: Array<{
  value: QuizAnswerType;
  label: string;
}> = [
  { value: 'RADIO', label: 'Single choice' },
  { value: 'CHECKBOX', label: 'Multiple choice' },
  { value: 'DROPDOWN', label: 'Dropdown' },
  { value: 'TEXTAREA', label: 'Short text' },
  { value: 'TOGGLE', label: 'Toggle' }
];

export const QUIZ_QUESTION_STATUSES: Array<{
  value: QuizQuestionStatus;
  label: string;
}> = [
  { value: 'SHOW', label: 'Show' },
  { value: 'HIDE', label: 'Hide' }
];

export const QUIZ_MIN_OPTIONS = 2;

export const QUIZ_MULTI_ANSWER_TYPES: QuizAnswerType[] = ['CHECKBOX'];

export const isMultiAnswerType = (type: QuizAnswerType): boolean =>
  QUIZ_MULTI_ANSWER_TYPES.includes(type);

export const isTextAnswerType = (type: QuizAnswerType): boolean =>
  type === 'TEXTAREA';

export const quizAnswerTypeLabel = (type: QuizAnswerType): string =>
  QUIZ_ANSWER_TYPES.find(entry => entry.value === type)?.label ?? type;

export const quizQuestionStatusLabel = (status: QuizQuestionStatus): string =>
  QUIZ_QUESTION_STATUSES.find(entry => entry.value === status)?.label ?? status;

export interface CourseQuizItem {
  courseId: string;
  courseName: string;
  courseStatus: string;
  moduleId: string;
  moduleName: string;
  taskId: string;
  taskName: string;
  taskDescription: string;
  status: string;
  updatedAt?: string;
}

export interface ModuleGroup {
  moduleId: string;
  moduleName: string;
  quizzes: CourseQuizItem[];
}

export interface CourseGroup {
  courseId: string;
  courseName: string;
  courseStatus: string;
  modules: ModuleGroup[];
  totalQuizzes: number;
}

export interface QuizAttemptOption {
  optionId: string;
  value: string;
}

export interface QuizAttemptQuestion {
  questionId: string;
  question: string;
  type: string;
  options?: QuizAttemptOption[];
}

export interface QuizAttempt {
  taskId: string;
  attemptId?: string;
  taskName?: string;
  totalQuestions?: number;
  questions: QuizAttemptQuestion[];
}

export interface QuizAnswerSubmission {
  questionId: string;
  selectedOptionIds?: string[];
  textAnswer?: string;
}

export interface QuizValidatePayload {
  taskId: string;
  attemptId: string;
  answers: QuizAnswerSubmission[];
}

export interface QuizReviewQuestion {
  questionId: string;
  question: string;
  type: string;
  isCorrect?: boolean | null;
  correctOptionIds?: string[];
  correctOptionValues?: string[];
  selectedOptionIds?: string[];
  selectedOptionValues?: string[];
  textAnswer?: string;
}

export interface QuizValidationResult {
  taskId: string;
  attemptId: string;
  totalScoredQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  percentage: number | null;
  passingPercentage: number;
  passed: boolean | null;
  review: QuizReviewQuestion[];
}

export interface QuizProgress {
  totalTasks: number;
  completedTasks: number;
  percentComplete: number;
}

export interface QuizSubmitPayload {
  taskId: string;
  attemptId: string;
}

export interface QuizSubmitResult {
  taskId: string;
  attemptId: string;
  attemptNumber?: number;
  totalScoredQuestions?: number;
  correctAnswers?: number;
  incorrectAnswers?: number;
  percentage?: number | null;
  passingPercentage?: number;
  passed?: boolean | null;
  alreadySubmitted?: boolean;
  reattemptRequired?: boolean;
  courseStatus?: string;
  progress?: QuizProgress;
  isCompleted?: boolean;
  completedAt?: string | null;
}
