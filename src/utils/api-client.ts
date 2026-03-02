import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '@constants';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const apiClientComm = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const logoutUser = async () => {
  const pathnameParts = window.location.pathname.split('/');
  const subdomain = pathnameParts[1];
  const userRole = pathnameParts[2];

  let loginPath = `/`;
  if (subdomain && userRole) {
    loginPath = `/${subdomain}/${userRole}/login`;
  }

  try {
    await apiClient('/admin/logout');
  } catch (error) {
    console.log('Error during logout:', error);
  } finally {
    localStorage.clear();
    window.location.href = loginPath;
  }
};

export const refreshAccessToken = async () => {
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
    await logoutUser();
    throw error;
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
        await logoutUser();
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

    if (originalRequest.url?.includes('/admin/refreshToken')) {
      toast.error('Refresh Token Expired. Redirecting to login...');
      await logoutUser();
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
        await logoutUser();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
