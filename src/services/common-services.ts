import { LoginForm } from '@forms/login';
import { ContactForm } from '@forms/contact';
import { ConsultationForm } from '@forms/consultation';
import { DateValue } from '@mantine/dates';

import moment from 'moment';
import { UserDetails } from '@interfaces/user';
export { logoutUser } from '@utils/api-client';
import { apiClient, apiClientComm } from '@utils/api-client';

export const getMyNavMenu = async () => {
  const response = await apiClient.get('/getMyNavMenu');
  return response.data;
};

export const login = async (Credentials: LoginForm): Promise<UserDetails> => {
  try {
    const response = await apiClientComm.post('/admin/login', Credentials);

    const { token, userRole, refreshToken } = response.data;

    if (token && userRole) {
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('createdAt', new Date().toISOString());
    }

    return response.data;
  } catch (error) {
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
    const payload = {
      ...data,
      companyName: data.companyName?.trim() || 'Individual / General Enquiry'
    };
    const response = await apiClientComm.post('/sendContactUsMail', payload);
    return response.data;
  } catch (error) {
    console.error('Contact Us Mail Error:', error);
    throw error;
  }
};

export const sendExpertConsultationMail = async (data: ConsultationForm) => {
  const payload = {
    fullName: data.fullName,
    email: data.email,
    phoneNumber: `${data.countryCode} ${data.phone}`,
    company: data.company?.trim() || 'Individual / Not specified',
    projectBudget: `${data.currency} ${data.budget}`,
    timeline: data.timeline
  };

  try {
    const response = await apiClientComm.post(
      '/createExpertConsultation',
      payload
    );
    return response.data;
  } catch (error) {
    console.warn(
      'createExpertConsultation failed, attempting fallback to sendContactUsMail:',
      error
    );
    const fallbackPayload = {
      companyName: data.company?.trim() || `${data.fullName} (Individual)`,
      customerEmail: data.email,
      subject: `[Expert Consultation] ${data.fullName} - ${data.timeline}`,
      message: `New Expert Consultation Request:
- Full Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.countryCode} ${data.phone} (Country: ${data.countryIso})
- Company: ${data.company?.trim() || 'Not specified (Individual)'}
- Project Budget: ${data.currency} ${data.budget}
- Timeline: ${data.timeline}
- Terms & Privacy: Agreed to Terms & Privacy Policy`
    };
    const fallbackResponse = await apiClientComm.post(
      '/sendContactUsMail',
      fallbackPayload
    );
    return fallbackResponse.data;
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
  employeeId: string
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

export const submitTimeSheet = async (data: any, employeeId: string) => {
  try {
    const response = await apiClient.put('updateEmployeeTimesheet', {
      packages: data,
      ...(employeeId && { employeeId: employeeId })
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const downloadSalarySlip = async ({
  mongoId,
  fullName,
  month,
  year
}: {
  mongoId: string;
  fullName: string;
  month: string;
  year: string;
}) => {
  try {
    const response = await apiClient.post('/downloadSalarySlip', {
      mongoId,
      fullName,
      month,
      year
    });
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return error.response.data;
    }
  }
};

export const uploadProfileImage = async (image: File, employeeId: string) => {
  try {
    const formData = new FormData();
    formData.append('profileImage', image);
    formData.append('userId', employeeId);

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
