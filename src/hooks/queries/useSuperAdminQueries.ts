import { useQuery } from '@tanstack/react-query';
import {
  getOrganizations,
  getAllEmployeeDetailsBySuperAdmin
} from '@services/super-admin-services';

export const superAdminQueryKeys = {
  organizations: ['saOrganizations'] as const,
  employeesByOrg: (orgId: string) => ['saEmployees', orgId] as const
};

export const useGetOrganizations = () => {
  return useQuery({
    queryKey: superAdminQueryKeys.organizations,
    queryFn: getOrganizations
  });
};

export const useGetAllEmployeesBySuperAdmin = (
  orgId: string,
  enabled = true
) => {
  return useQuery({
    queryKey: superAdminQueryKeys.employeesByOrg(orgId),
    queryFn: () => getAllEmployeeDetailsBySuperAdmin(orgId),
    enabled: !!orgId && enabled
  });
};
