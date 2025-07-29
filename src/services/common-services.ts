import { LoginForm } from '../forms/login';
import { ContactForm } from '../forms/contact';
import { DateValue } from '@mantine/dates';

import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

const apiClientComm = axios.create({
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
    localStorage.clear();

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
        toast.error('Failed to refresh token. Redirecting to login...');
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
      toast.error('Refresh Token Expired. Redirecting to login...');
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
        toast.error('Session expired. Please log in again.');
        logoutUser();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const login = async (Credentials: LoginForm) => {
  try {
    const response = await apiClientComm.post('/admin/login', Credentials);

    const { token, userRole, refreshToken } = response.data;

    if (token && userRole) {
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('refreshToken', refreshToken);
    }

    return response.data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

export const forgetPassword = async (username: string) => {
  try {
    const response = await apiClientComm.post('/forgotPassword', { username });
    return response.data;
  } catch (error) {
    console.error('Forget Password Error:', error);
    throw error;
  }
};

export const getVisitorCount = async () => {
  try {
    const response = await apiClientComm.get('/getVisitorCount');
    const count = response.data.visitorCount;

    return Number(count);
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    throw error;
  }
};

export const sendContactUsMail = async (data: ContactForm) => {
  try {
    const response = await apiClientComm.post('/sendContactUsMail', data);
    return response.data;
  } catch (error) {
    console.error('Contact Us Mail Error:', error);
    throw error;
  }
};

export const getOrganizationConfig = async (organizationName: string) => {
  try {
    const response = await apiClientComm.get(
      `/getOrganizationThemes/${organizationName}`
    );
    return response.data.themesResponse;
  } catch (error) {
    console.error('Error fetching organization config:', error);
    throw error;
  }
};

export const getTimesheetData = async (
  startDate: DateValue,
  endDate: DateValue,
  employeeId?: string
) => {
  try {
    const { data } = await apiClient.post('/fetchEmployeePackageDetailsById', {
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
      ...(employeeId && { employeeId: employeeId })
    });
    return data.employeePackageDetails?.length > 0 &&
      data.employeePackageDetails[0]?.packages
      ? data.employeePackageDetails[0].packages
      : [];
  } catch (error) {
    throw error;
  }
};

export const submitTimeSheet = async (data: any, employeeId?: string) => {
  try {
    await apiClient.put('updateEmployeeTimesheet', {
      packages: data,
      ...(employeeId && { employeeId: employeeId })
    });
  } catch (error) {
    throw error;
  }
};
