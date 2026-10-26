import { AddCompanyForm } from '@forms/add-company';
import { UpdatePasswordForm } from '@forms/update-password';
import {
  AddCandidateForm,
  AddCommentForm,
  UpdateCandidateSchema
} from '@forms/add-candidate';

export { logoutUser } from '@utils/api-client';
import { apiClient } from '@utils/api-client';
import { BASE_URL } from '@constants';
import {
  AddModulePayload,
  AddTaskPayload,
  UpdateCoursePayload,
  UpdateModulePayload,
  UpdateTaskPayload,
  CloneCoursePayload,
  ReorderModulesPayload
} from '@interfaces/contentwriter';
import { sortCourseContent } from '@utils/common/course-order';
import {
  AssignedCourse,
  AssignedCourseDetail,
  CodeRunResult,
  CodingQuestion,
  RunCodePayload,
  UpdateMyTaskAcknowledgementPayload,
  UpdateMyTaskAcknowledgementResponse,
  UpdateTaskProgressPayload,
  UpdateTaskProgressResponse
} from '@interfaces/course-assignment';
import {
  QuizQuestionApiModel,
  QuizQuestionApiPayload,
  QuizQuestionApiUpdatePayload,
  QuizQuestionStatus,
  QuizAttempt,
  QuizValidatePayload,
  QuizValidationResult,
  QuizSubmitPayload,
  QuizSubmitResult
} from '@interfaces/quiz';

export const getCompanyDetails = async () => {
  try {
    const response = await apiClient('/recruiter/getCompanyDetails');
    return response.data.poolCompaniesResponse;
  } catch (error) {
    throw error;
  }
};

export const addCompanyByRecruiter = async (data: AddCompanyForm) => {
  try {
    const response = await apiClient.post(
      '/recruiter/addCompanyByRecruiter',
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateCompanyByRecruiter = async (
  data: AddCompanyForm,
  id: string
) => {
  try {
    const response = await apiClient.post(
      '/recruiter/updateCompanyByRecruiter',
      { ...data, id: id }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCompanyDetailsByIdByRecruiter = async (id: string) => {
  try {
    const response = await apiClient(
      `/recruiter/getCompanyDetailsByIdByRecruiter/${id}`
    );
    return response.data.poolCompanyResponse;
  } catch (error) {
    throw error;
  }
};

export const updatePasswordForEmployee = async (form: UpdatePasswordForm) => {
  try {
    await apiClient.post('/updatePassword', { ...form });
    return { success: true };
  } catch (error) {
    throw error;
  }
};

export const addCommentByRecruiter = async (id: string, comment: string) => {
  try {
    const response = await apiClient.post('/recruiter/addCommentByRecruiter', {
      id,
      comment
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addPoolCandidateCommentByRecruiter = async (
  data: AddCommentForm
) => {
  try {
    const response = await apiClient.post(
      '/recruiter/addCommentToTalentPoolCandidate',
      data
    );

    return response.data.responseAfterCommentAdded;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getAllPoolCandidatesByEmployee = async () => {
  try {
    const response = await apiClient.get(
      '/recruiter/getAllTalentPoolCandidates'
    );
    return response.data.talentPoolCandidatesList;
  } catch (error) {
    throw error;
  }
};

export const addPoolCandidateByRecruiter = async (data: AddCandidateForm) => {
  try {
    const response = await apiClient.post(
      '/recruiter/addTalentPoolCandidateToTracker',
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePoolCandidateByRecruiter = async (
  data: UpdateCandidateSchema
) => {
  try {
    const response = await apiClient.post(
      '/recruiter/updatePoolCandidateByRecruiter',
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getPoolCandidateByRecruiter = async (id: string) => {
  try {
    const response = await apiClient.get(
      `/recruiter/getTalentPoolCandidateById/${id}`
    );

    return response.data.talentPoolCandidateDetails;
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = async () => {
  try {
    const response = await apiClient.get('/getEmployeeDetails');
    return response.data.employeeDetails;
  } catch (error: any) {
    console.error(
      'Error fetching user details:',
      error?.response?.data || error.message
    );
    throw new Error('Failed to fetch user details');
  }
};

export const getAllCoursesByUser = async () => {
  // The apiClient interceptor already attaches the auth_token header.
  try {
    const response = await apiClient.get('/getAllCourses');
    const courses = response.data.courses;
    return Array.isArray(courses)
      ? courses.map(course => sortCourseContent(course))
      : courses;
  } catch (error) {
    throw error;
  }
};

export const getCourseByIdContentWriter = async (id: string) => {
  try {
    const response = await apiClient.get(`/getCourseById/${id}`);
    // Backend responds with { success, coursedata }.
    return sortCourseContent(response.data.coursedata);
  } catch (error) {
    throw error;
  }
};

export const addCourseContentWriter = async (
  name: string,
  description: string,
  image: File | null
) => {
  try {
    const formData = new FormData();
    formData.append('courseName', name);
    formData.append('courseDescription', description);
    if (image) {
      formData.append('coursethumbnail', image);
    }
    const response = await apiClient.post('/addCourse', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCourseModuleContentWriter = async (data: AddModulePayload) => {
  try {
    const formData = new FormData();
    formData.append('courseId', data.courseId);
    formData.append('moduleName', data.moduleName);
    formData.append('moduleDescription', data.moduleDescription);
    formData.append('orderIdx', String(data.orderIdx));
    if (data.thumbnail) {
      formData.append('coursemodulethumbnail', data.thumbnail);
    }
    const response = await apiClient.post('/addCourseModule', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCourseTaskContentWriter = async (data: AddTaskPayload) => {
  try {
    const formData = new FormData();
    formData.append('moduleId', data.moduleId);
    formData.append('taskName', data.taskName);
    formData.append('taskDescription', data.taskDescription);
    formData.append('type', data.type || 'LINK');
    formData.append('orderIdx', String(data.orderIdx));
    if (data.acknowledgementText !== undefined) {
      formData.append('acknowledgementText', data.acknowledgementText);
    }
    // A task carries either an uploaded file or an external link.
    if (data.file) {
      formData.append('taskFile', data.file);
    } else if (data.link) {
      formData.append('link', data.link);
    }
    if (data.thumbnail) {
      formData.append('thumbnailFile', data.thumbnail);
    }
    const response = await apiClient.post('/addcoursetask', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCourseContentWriter = async (data: UpdateCoursePayload) => {
  try {
    // The update endpoint is multipart (multer `single('thumbnail')`). Send
    // the metadata as fields and the thumbnail as a file so it can be
    // replaced; when no file is included the stored thumbnail is kept.
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('courseName', data.courseName);
    formData.append('courseDescription', data.courseDescription);
    formData.append('status', data.status);
    if (data.thumbnail) {
      formData.append('thumbnail', data.thumbnail);
    }
    const response = await apiClient.put('/updatecourse', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCourseModuleContentWriter = async (
  data: UpdateModulePayload
) => {
  try {
    // Multipart so the thumbnail file can be replaced with it (multer
    // `single('thumbnail')`).
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('moduleName', data.moduleName);
    formData.append('moduleDescription', data.moduleDescription);
    formData.append('status', data.status);
    // The backend validates orderIdx on update too.
    formData.append('orderIdx', String(data.orderIdx));
    if (data.thumbnail) {
      formData.append('thumbnail', data.thumbnail);
    }
    const response = await apiClient.put('/updatecoursemodule', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCourseTaskContentWriter = async (
  data: UpdateTaskPayload
) => {
  try {
    // Multipart — the backend accepts an optional `thumbnailFile` field
    // (`upload.fields([{ taskFile }, { thumbnailFile }])`). The file/link
    // content is still NOT editable here; only the thumbnail gets replaced.
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('taskName', data.taskName);
    formData.append('taskDescription', data.taskDescription);
    formData.append('status', data.status);
    if (data.acknowledgementText !== undefined) {
      formData.append('acknowledgementText', data.acknowledgementText);
    }
    if (data.thumbnail) {
      formData.append('thumbnailFile', data.thumbnail);
    }
    const response = await apiClient.put('/updatecoursetask', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cloneCourseContentWriter = async (data: CloneCoursePayload) => {
  try {
    const response = await apiClient.post('/clonecourse', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Persists the position of every module in a course. The backend expects the
 * complete list with unique, 1-based `orderIdx` values.
 */
export const reorderCourseModulesContentWriter = async (
  data: ReorderModulesPayload
) => {
  try {
    const response = await apiClient.put('/reordermodules', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Builds the URL that serves a task's content. The backend redirects to the
 * external link (type LINK) or streams the file inline (type FILE). The token
 * is passed as a query param so the URL can be opened directly in a new tab.
 */
export const getCourseTaskContentUrl = (taskId: string) => {
  const token = localStorage.getItem('token');
  const base = (BASE_URL || '').replace(/\/+$/, '');
  return `${base}/getCourseTaskContent/${taskId}?auth_token=${token}`;
};

export const getAllQuizQuestions = async (
  taskId: string
): Promise<QuizQuestionApiModel[]> => {
  const response = await apiClient.get(`/getAllQuizQuestions/${taskId}`);
  const list: QuizQuestionApiModel[] = response.data.data ?? [];
  return Array.isArray(list) ? list.filter(q => !q.isDeleted) : [];
};

export const createQuizQuestion = async (data: QuizQuestionApiPayload) => {
  const response = await apiClient.post('/createQuizQuestion', data);
  return response.data;
};

export const getQuizQuestionById = async (
  questionId: string
): Promise<QuizQuestionApiModel | null> => {
  const response = await apiClient.get(`/getQuizQuestion/${questionId}`);
  return response.data.data ?? null;
};

export const updateQuizQuestion = async (
  questionId: string,
  data: QuizQuestionApiUpdatePayload
) => {
  const response = await apiClient.put(
    `/updateQuizQuestion/${questionId}`,
    data
  );
  return response.data;
};

export const updateQuizQuestionStatus = async (
  questionId: string,
  status: QuizQuestionStatus
) => {
  const response = await apiClient.patch(
    `/updateQuizQuestionStatus/${questionId}`,
    { status }
  );
  return response.data;
};

export const deleteQuizQuestion = async (
  questionIdOrObj: string | { questionId: string }
) => {
  const questionId =
    typeof questionIdOrObj === 'string'
      ? questionIdOrObj
      : questionIdOrObj?.questionId;
  const response = await apiClient.delete(`/deleteQuizQuestion/${questionId}`);
  return response.data;
};

export const copyQuizQuestionsToTask = async (
  sourceTaskId: string,
  targetTaskId: string
): Promise<number> => {
  const questions = await getAllQuizQuestions(sourceTaskId);
  if (questions.length === 0) return 0;

  let copied = 0;

  for (const question of questions) {
    const payload: QuizQuestionApiPayload = {
      taskId: targetTaskId,
      question: question.question,
      type: question.type,
      status: question.status ?? 'SHOW'
    };

    if (question.type !== 'TEXTAREA') {
      payload.options = (question.options ?? []).map(option => ({
        value: option.value,
        isanswer: Boolean(option.isanswer)
      }));
    }

    await createQuizQuestion(payload);
    copied += 1;
  }

  return copied;
};

export const getQuizById = async (taskId: string): Promise<QuizAttempt> => {
  const response = await apiClient.get(`/getQuizById/${taskId}`);
  return response.data.data;
};

export const validateQuiz = async (
  data: QuizValidatePayload
): Promise<QuizValidationResult> => {
  const response = await apiClient.post('/validateQuiz', data);
  return response.data.data;
};

export const submitQuiz = async (
  data: QuizSubmitPayload
): Promise<QuizSubmitResult> => {
  const response = await apiClient.post('/submitQuiz', data);
  return response.data.data;
};

// ── My Courses (assigned to the logged-in employee) ──────────────────────────

export const getMyAssignedCourses = async (): Promise<AssignedCourse[]> => {
  const response = await apiClient.get('/getMyAssignedCourses');
  // Backend responds with { success, courses }.
  return response.data.courses;
};

export const getMyAssignedCourseById = async (
  courseAssignmentId: string
): Promise<AssignedCourseDetail> => {
  const response = await apiClient.get(
    `/getMyAssignedCourseById/${courseAssignmentId}`
  );
  // Backend responds with { success, course }.
  return sortCourseContent(response.data.course);
};

/**
 * Ticks a task off (or back on). The backend re-derives the whole assignment's
 * status and progress from the task-progress rows and returns them, so the
 * refreshed numbers come straight back with the response.
 */
export const updateMyTaskProgress = async (
  data: UpdateTaskProgressPayload
): Promise<UpdateTaskProgressResponse> => {
  const response = await apiClient.put('/updateMyTaskProgress', data);
  return response.data;
};

export const updateMyTaskAcknowledgement = async (
  data: UpdateMyTaskAcknowledgementPayload
): Promise<UpdateMyTaskAcknowledgementResponse> => {
  const response = await apiClient.put('/updateMyTaskAcknowledgement', data);
  return response.data;
};

/**
 * Fetches a coding question's allowed languages + starter code for the given
 * language (omitting `language`/`languageId` returns the default). Only
 * assigned employees may fetch it, so the payload never leaks authoring data.
 */
export const getCodingQuestion = async (
  taskId: string,
  questionId: string,
  languageId: string
): Promise<CodingQuestion> => {
  const response = await apiClient.get(
    `/getquestion/${taskId}/${questionId}/${languageId}`
  );
  // Backend responds with { success, message, data }.
  return response.data.data;
};
/**
 * Runs the learner's code against the question's test cases (trial run).
 * The scoring + per-test-case results + AI feedback come back in `data`.
 */
export const runCode = async (data: RunCodePayload): Promise<CodeRunResult> => {
  const response = await apiClient.post('/runcode', data);
  // Backend responds with { success, message, data: executionResult }.
  return response.data.data;
};

/**
 * Submits the learner's code as their final answer. The backend grades it with
 * the same engine as Run Code but only accepts when every test case passes,
 * persisting the attempt as a `type: 'submit'` record. Returns the backend
 * message (for toasts) alongside the execution result.
 */
export const submitCode = async (
  data: RunCodePayload
): Promise<{ message: string; result: CodeRunResult }> => {
  const response = await apiClient.post('/submitcode', data);
  // Backend responds with { success, message, data: executionResult }.
  return { message: response.data.message, result: response.data.data };
};

// ── Employee Dashboard ───────────────────────────────────────────────────────

export const getEmployeeDashboard = async () => {
  const response = await apiClient.get('/getEmployeeDashboard');
  return response.data;
};

// OpenRouter Key
export interface UserOpenRouterKeyResponse {
  success: boolean;
  message: string;
  data?: {
    _id?: string;
    userId?: string;
    openrouterKey?: string;
    createdAt?: string;
    updatedAt?: string;
  } | null;
}

export const saveUserOpenRouterKey = async (
  openrouterKey: string
): Promise<UserOpenRouterKeyResponse> => {
  const response = await apiClient.post(
    '/user/validateandsaveopenrouterapikey',
    {
      openrouterKey
    }
  );
  return response.data;
};

export const getUserOpenRouterKey =
  async (): Promise<UserOpenRouterKeyResponse> => {
    const response = await apiClient.get('/user/getuseropenrouterkey');
    return response.data;
  };
