import { AddCompanyForm } from '@forms/add-company';
import { UpdatePasswordForm } from '@forms/update-password';
import {
  AddCandidateForm,
  AddCommentForm,
  UpdateCandidateSchema
} from '@forms/add-candidate';

export { logoutUser } from '@utils/api-client';
import { apiClient } from '@utils/api-client';

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
  const token = localStorage.getItem('token');
  try {
    const response = await apiClient.get('/contentwriter/getAllCourses', {
      headers: { auth_token: token }
    });
    return response.data.courses;
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
      { formData },
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
