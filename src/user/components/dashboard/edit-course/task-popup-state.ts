export const REOPEN_TASK_POPUP_KEY = 'srytal:reopen-add-task-popup';
export const QUIZ_TASK_STATE_KEY = 'srytal:quiz-task-state';

interface TaskPopupState {
  courseId: string;
  moduleId: string;
}

export const saveTaskPopupState = (state: TaskPopupState): void => {
  sessionStorage.setItem(REOPEN_TASK_POPUP_KEY, JSON.stringify(state));
};

export const readTaskPopupState = (): TaskPopupState | null => {
  try {
    const raw = sessionStorage.getItem(REOPEN_TASK_POPUP_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.courseId && parsed?.moduleId ? parsed : null;
  } catch {
    return null;
  }
};

export const clearTaskPopupState = (): void => {
  sessionStorage.removeItem(REOPEN_TASK_POPUP_KEY);
};

export interface QuizTaskState {
  courseId: string;
  moduleId: string;
  taskId: string;
}

export const saveQuizTaskState = (state: QuizTaskState): void => {
  sessionStorage.setItem(QUIZ_TASK_STATE_KEY, JSON.stringify(state));
};

export const readQuizTaskState = (): QuizTaskState | null => {
  try {
    const raw = sessionStorage.getItem(QUIZ_TASK_STATE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.courseId && parsed?.taskId ? parsed : null;
  } catch {
    return null;
  }
};

export const clearQuizTaskState = (): void => {
  sessionStorage.removeItem(QUIZ_TASK_STATE_KEY);
};

export type AddTaskContentMode = 'LINK' | 'FILE' | 'CODING' | 'QUIZ';

export interface AddTaskDraft extends TaskPopupState {
  taskName: string;
  taskDescription: string;
  mode: AddTaskContentMode;
  link: string;
  file: File | null;
  thumbnail: File | null;
}

let taskDraft: AddTaskDraft | null = null;

export const saveTaskDraft = (draft: AddTaskDraft): void => {
  taskDraft = draft;
};

export const readTaskDraft = (): AddTaskDraft | null => taskDraft;

export const clearTaskDraft = (): void => {
  taskDraft = null;
};

export const taskRequiresAcknowledgement = (
  acknowledgementText?: string | null
): boolean => Boolean(acknowledgementText?.trim());
