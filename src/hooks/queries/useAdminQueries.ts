import { useQuery } from '@tanstack/react-query';
import {
  getEmployeeDetailsByAdmin,
  getAllEmployeeDetailsByAdmin,
  getAllPackagesByAdmin,
  getPackageDetailsByAdmin,
  getEmployeePackagesByAdmin,
  getAllBloodGroupByAdmin,
  getAllEmploymentTypes,
  getAllEmployeeRoleByAdmin,
  getAllApproversByAdmin,
  getallfeedbackattributesbyadmin
} from '@services/admin-services';

export const adminQueryKeys = {
  allEmployees: ['adminAllEmployees'] as const,
  employee: (id: string) => ['adminEmployee', id] as const,
  allPackages: ['adminAllPackages'] as const,
  package: (id: string) => ['adminPackage', id] as const,
  employeePackages: (empId: string) =>
    ['adminEmployeePackages', empId] as const,
  bloodGroups: ['adminBloodGroups'] as const,
  employmentTypes: ['adminEmploymentTypes'] as const,
  employeeRoles: ['adminEmployeeRoles'] as const,
  approvers: ['adminApprovers'] as const,
  feedbackAttributes: ['adminFeedbackAttributes'] as const
};

export const useGetAllEmployeesByAdmin = () => {
  return useQuery({
    queryKey: adminQueryKeys.allEmployees,
    queryFn: getAllEmployeeDetailsByAdmin
  });
};

export const useGetEmployeeDetailsByAdmin = (id: string, enabled = true) => {
  return useQuery({
    queryKey: adminQueryKeys.employee(id),
    queryFn: () => getEmployeeDetailsByAdmin(id),
    enabled: !!id && enabled
  });
};

export const useGetAllPackagesByAdmin = () => {
  return useQuery({
    queryKey: adminQueryKeys.allPackages,
    queryFn: getAllPackagesByAdmin
  });
};

export const useGetPackageDetailsByAdmin = (
  packageId: string,
  enabled = true
) => {
  return useQuery({
    queryKey: adminQueryKeys.package(packageId),
    queryFn: () => getPackageDetailsByAdmin(packageId),
    enabled: !!packageId && enabled
  });
};

export const useGetEmployeePackagesByAdmin = (
  employeeId: string,
  enabled = true
) => {
  return useQuery({
    queryKey: adminQueryKeys.employeePackages(employeeId),
    queryFn: () => getEmployeePackagesByAdmin(employeeId),
    enabled: !!employeeId && enabled
  });
};

export const useGetAllBloodGroupsByAdmin = () => {
  return useQuery({
    queryKey: adminQueryKeys.bloodGroups,
    queryFn: getAllBloodGroupByAdmin
  });
};

export const useGetAllEmploymentTypes = () => {
  return useQuery({
    queryKey: adminQueryKeys.employmentTypes,
    queryFn: getAllEmploymentTypes
  });
};

export const useGetAllEmployeeRolesByAdmin = () => {
  return useQuery({
    queryKey: adminQueryKeys.employeeRoles,
    queryFn: getAllEmployeeRoleByAdmin
  });
};

export const useGetAllApproversByAdmin = () => {
  return useQuery({
    queryKey: adminQueryKeys.approvers,
    queryFn: getAllApproversByAdmin
  });
};

export const useGetAllFeedbackAttributesByAdmin = () => {
  return useQuery({
    queryKey: adminQueryKeys.feedbackAttributes,
    queryFn: getallfeedbackattributesbyadmin
  });
};
