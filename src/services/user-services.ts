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
  UpdateTaskPayload
} from '@interfaces/contentwriter';
import {
  AssignedCourse,
  AssignedCourseDetail,
  UpdateTaskProgressPayload,
  UpdateTaskProgressResponse
} from '@interfaces/course-assignment';

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
    const response = await apiClient.get('/contentwriter/getAllCourses');
    return response.data.courses;
  } catch (error) {
    throw error;
  }
};

export const getCourseByIdContentWriter = async (id: string) => {
  try {
    const response = await apiClient.get(`/contentwriter/getCourseById/${id}`);
    // Backend responds with { success, coursedata }.
    return response.data.coursedata;
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
    const response = await apiClient.post(
      '/contentwriter/addCourse',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
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
    if (data.thumbnail) {
      formData.append('coursemodulethumbnail', data.thumbnail);
    }
    const response = await apiClient.post(
      '/contentwriter/addCourseModule',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
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
    // A task carries either an uploaded file or an external link.
    if (data.file) {
      formData.append('taskFile', data.file);
    } else if (data.link) {
      formData.append('link', data.link);
    }
    const response = await apiClient.post(
      '/contentwriter/addCourseTask',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCourseContentWriter = async (data: UpdateCoursePayload) => {
  try {
    const response = await apiClient.put('/contentwriter/updatecourse', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCourseModuleContentWriter = async (
  data: UpdateModulePayload
) => {
  try {
    const response = await apiClient.put(
      '/contentwriter/updatecoursemodule',
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCourseTaskContentWriter = async (
  data: UpdateTaskPayload
) => {
  try {
    const response = await apiClient.put(
      '/contentwriter/updatecoursetask',
      data
    );
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
  return `${base}/contentwriter/getCourseTaskContent/${taskId}?auth_token=${token}`;
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
  return response.data.course;
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

// ── Employee Dashboard ───────────────────────────────────────────────────────

export const getEmployeeDashboard = async () => {
  const response = await apiClient.get('/getEmployeeDashboard');
  return response.data;
};
