export const organizationEmployeeUrls = (organizationName: string) => {
  return `/${organizationName}/employee`;
};
export const organizationAdminUrls = (organizationName: string) => {
  return `/${organizationName}/admin`;
};

export const commonUrls = (organizationName: string) => {
  const userRole = localStorage.getItem("userRole");
  if (userRole === "admin") {
    return `/${organizationName}/admin`;
  } else {
    return `/${organizationName}/employee`;
  }
};
