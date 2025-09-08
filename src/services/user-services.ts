import { AddCompanyForm } from '../forms/add-company';
import { UpdatePasswordForm } from '../forms/update-password';
import {
  AddCandidateForm,
  AddCommentForm,
  UpdateCandidateSchema
} from '../forms/add-candidate';

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token found.');
    }

    const response = await apiClient.get('/admin/refreshToken', {
      headers: { refresh_token: refreshToken }
    });

    const { token: newAccessToken } = response.data;

    localStorage.setItem('token', newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error('Refresh Token Expired. Redirecting to Login...');
    logoutUser();
    throw error;
  }
};

export const logoutUser = async () => {
  const pathnameParts = window.location.pathname.split('/');
  const subdomain = pathnameParts[1];
  const userRole = pathnameParts[2];

  let loginPath = `/`;

  loginPath = `/${subdomain}/${userRole}/login`;

  try {
    await apiClient('/admin/logout');
  } catch (error) {
    console.log(error);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('createdAt');

    window.location.href = loginPath;
  }
};

apiClient.interceptors.request.use(
  async config => {
    let token = localStorage.getItem('token');

    if (!token) {
      try {
        token = await refreshAccessToken();
      } catch (error) {
        console.error('Failed to refresh token. Redirecting to login...');
        logoutUser();
        return Promise.reject(error);
      }
    }

    config.headers['auth_token'] = token;
    return config;
  },
  error => Promise.reject(error)
);

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (originalRequest.url.includes('/admin/refreshToken')) {
      console.error('Refresh Token Expired. Redirecting to login...');
      logoutUser();
      return Promise.reject(error);
    }

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers['auth_token'] = newAccessToken;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Session expired. Please log in again.');
        logoutUser();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

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

export const uploadProfileImage = async (image: File) => {
  try {
    const formData = new FormData();
    formData.append('profileImage', image);

    const response = await apiClient.post('/uploadProfileImage', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return response.data;
  } catch (error: any) {
    console.error(
      'Profile Image Upload Error:',
      error?.response?.data || error.message
    );
    throw new Error('Failed to upload profile image');
  }
};

export const getProfileImage = async (): Promise<Blob> => {
  try {
    const response = await apiClient.get('/getProfileImage', {
      responseType: 'blob'
    });

    if (response.data.size === 0) {
      throw new Error('No image found');
    }

    return response.data;
  } catch (error: any) {
    console.error(
      'Error fetching profile image:',
      error?.response?.data || error.message
    );
    throw new Error('Failed to fetch profile image');
  }
};
