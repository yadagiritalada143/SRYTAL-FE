import { useQuery } from '@tanstack/react-query';
import {
  getVisitorCount,
  getOrganizationConfig,
  getTimesheetData
} from '@services/common-services';
import { DateValue } from '@mantine/dates';

export const commonQueryKeys = {
  visitorCount: ['visitorCount'] as const,
  organizationConfig: (orgName: string) => ['orgConfig', orgName] as const,
  timesheetData: (
    startDate: DateValue,
    endDate: DateValue,
    employeeId?: string
  ) => ['timesheet', startDate, endDate, employeeId] as const
};

export const useGetVisitorCount = () => {
  return useQuery({
    queryKey: commonQueryKeys.visitorCount,
    queryFn: getVisitorCount
  });
};

export const useGetOrganizationConfig = (orgName: string, enabled = true) => {
  return useQuery({
    queryKey: commonQueryKeys.organizationConfig(orgName),
    queryFn: () => getOrganizationConfig(orgName),
    enabled: !!orgName && enabled,
    staleTime: Infinity // Org config rarely changes
  });
};

export const useGetTimesheetData = (
  startDate: DateValue,
  endDate: DateValue,
  employeeId?: string,
  enabled = true
) => {
  return useQuery({
    queryKey: commonQueryKeys.timesheetData(startDate, endDate, employeeId),
    queryFn: () => getTimesheetData(startDate, endDate, employeeId),
    enabled: !!startDate && !!endDate && enabled
  });
};
