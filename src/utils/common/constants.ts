import { ROLES } from '@constants';

export const organizationEmployeeUrls = (organizationName: string) => {
  return `/${organizationName}/employee`;
};
export const organizationAdminUrls = (organizationName: string) => {
  return `/${organizationName}/admin`;
};

export const commonUrls = (organizationName: string) => {
  const userRole = localStorage.getItem('userRole');
  if (userRole === ROLES.ADMIN) {
    return `/${organizationName}/admin`;
  } else {
    return `/${organizationName}/employee`;
  }
};
