import { LoginForm } from '../forms/login';
import { ContactForm } from '../forms/contact';
import { apiClient } from './user-services';
import { DateValue } from '@mantine/dates';
export const login = async (Credentials: LoginForm) => {
  try {
    const response = await apiClient.post('/admin/login', Credentials);

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
    const response = await apiClient.post('/forgotPassword', { username });
    return response.data;
  } catch (error) {
    console.error('Forget Password Error:', error);
    throw error;
  }
};

export const getVisitorCount = async () => {
  try {
    const response = await apiClient.get('/getVisitorCount');
    const count = response.data.visitorCount;

    return Number(count);
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    throw error;
  }
};

export const sendContactUsMail = async (data: ContactForm) => {
  try {
    const response = await apiClient.post('/sendContactUsMail', data);
    return response.data;
  } catch (error) {
    console.error('Contact Us Mail Error:', error);
    throw error;
  }
};

export const getOrganizationConfig = async (organizationName: string) => {
  try {
    const response = await apiClient.get(
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
  endDate: DateValue
) => {
  try {
    const { data } = await apiClient.post('/fetchEmployeePackageDetailsById', {
      fromDate: startDate,
      toDate: endDate,
    });
    return data.employeePackageDetails?.length > 0 &&
      data.employeePackageDetails[0]?.packages
      ? data.employeePackageDetails[0].packages
      : [];
  } catch (error) {
    throw error;
  }
};
