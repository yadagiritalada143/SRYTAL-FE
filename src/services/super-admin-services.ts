import { RegisterAdminBySuperAdminForm } from '@forms/register-admin-superadmin';
import { OfferLetterForm } from '@forms/offerletter';
import { apiClient } from '@utils/api-client';

export const getOrganizations = async () => {
  try {
    const response = await apiClient.get(
      'superadmin/getAllOrganisationsBySuperadmin'
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerAdmin = async (
  adminDetails: RegisterAdminBySuperAdminForm
) => {
  try {
    const response = await apiClient.post(
      '/admin/registerEmployeeByAdmin',
      adminDetails
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllEmployeeDetailsBySuperAdmin = async (
  organizationId: string
) => {
  try {
    const response = await apiClient.get(
      `/superadmin/getAllEmployeesBySuperAdmin/${organizationId}`
    );
    return response.data.superadminEmployeeList;
  } catch (error) {
    throw error;
  }
};
export const GenerateOfferletterBySuperAdmin = async (
  data: OfferLetterForm
) => {
  try {
    const response = await apiClient.post(
      `/superadmin/generateofferletter`,
      data,
      { responseType: 'blob' }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
