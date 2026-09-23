export const REOPEN_TASK_POPUP_KEY = 'srytal:reopen-add-task-popup';

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
