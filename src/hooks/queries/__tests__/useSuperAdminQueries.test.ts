import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  superAdminQueryKeys,
  useGetOrganizations,
  useGetAllEmployeesBySuperAdmin
} from '@hooks/queries/useSuperAdminQueries';

jest.mock('@services/super-admin-services', () => ({
  getOrganizations: jest.fn(),
  getAllEmployeeDetailsBySuperAdmin: jest.fn()
}));

const superAdminService = () =>
  jest.requireMock('@services/super-admin-services') as any;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } }
  });
  return {
    queryClient,
    wrapper: ({ children }: { children: React.ReactNode }) =>
      React.createElement(
        QueryClientProvider,
        { client: queryClient },
        children
      )
  };
};

describe('useSuperAdminQueries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('superAdminQueryKeys', () => {
    it('exposes the expected key shapes', () => {
      expect(superAdminQueryKeys.organizations).toEqual(['saOrganizations']);
      expect(superAdminQueryKeys.employeesByOrg('org1')).toEqual([
        'saEmployees',
        'org1'
      ]);
    });
  });

  describe('useGetOrganizations', () => {
    it('fetches all organizations', async () => {
      superAdminService().getOrganizations.mockResolvedValue([
        { id: 'org1' }
      ]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetOrganizations(), { wrapper });

      expect(superAdminService().getOrganizations).toHaveBeenCalled();
      await waitFor(() =>
        expect(result.current.data).toEqual([{ id: 'org1' }])
      );
    });
  });

  describe('useGetAllEmployeesBySuperAdmin', () => {
    it('fetches all employees for the given organization', async () => {
      superAdminService().getAllEmployeeDetailsBySuperAdmin.mockResolvedValue([
        { id: 'emp1', organization: 'org1' }
      ]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetAllEmployeesBySuperAdmin('org1'),
        { wrapper }
      );

      expect(
        superAdminService().getAllEmployeeDetailsBySuperAdmin
      ).toHaveBeenCalledWith('org1');
      await waitFor(() =>
        expect(result.current.data).toEqual([
          { id: 'emp1', organization: 'org1' }
        ])
      );
    });

    it('does not fetch when enabled is false', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetAllEmployeesBySuperAdmin('org1', false),
        { wrapper }
      );

      expect(
        superAdminService().getAllEmployeeDetailsBySuperAdmin
      ).not.toHaveBeenCalled();
    });

    it('does not fetch when the org id is an empty string', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetAllEmployeesBySuperAdmin(''),
        { wrapper }
      );

      expect(
        superAdminService().getAllEmployeeDetailsBySuperAdmin
      ).not.toHaveBeenCalled();
    });
  });
});