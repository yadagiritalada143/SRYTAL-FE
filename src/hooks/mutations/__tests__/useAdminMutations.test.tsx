import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

jest.mock('@services/admin-services', () => {
  const mockRegisterEmployee = jest.fn();
  const mockRegisterPackage = jest.fn();
  const mockUpdateEmployeeDetailsByAdmin = jest.fn();
  const mockUpdatePackageByAdmin = jest.fn();
  const mockDeleteEmployeeByAdmin = jest.fn();
  const mockAddBloodGroupByAdmin = jest.fn();
  const mockAddDepartmentByAdmin = jest.fn();
  const mockUpdateCourseAssignmentDueDate = jest.fn();
  const mockUnassignCourse = jest.fn();
  return {
    registerEmployee: mockRegisterEmployee,
    registerPackage: mockRegisterPackage,
    updateEmployeeDetailsByAdmin: mockUpdateEmployeeDetailsByAdmin,
    updatePackageByAdmin: mockUpdatePackageByAdmin,
    deleteEmployeeByAdmin: mockDeleteEmployeeByAdmin,
    addBloodGroupByAdmin: mockAddBloodGroupByAdmin,
    addDepartmentByAdmin: mockAddDepartmentByAdmin,
    updateCourseAssignmentDueDate: mockUpdateCourseAssignmentDueDate,
    unassignCourse: mockUnassignCourse
  };
});

const getMock = (name: string) =>
  (jest.requireMock('@services/admin-services') as Record<string, jest.Mock>)[
    name
  ];

const expectCalledWithFirstArg = (fn: jest.Mock, expected: unknown) => {
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn.mock.calls[0][0]).toEqual(expected);
};

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  });

const createWrapper = () => {
  const queryClient = createQueryClient();
  return {
    queryClient,
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  };
};

import {
  useRegisterEmployee,
  useRegisterPackage,
  useUpdateEmployeeDetails,
  useUpdatePackageByAdmin,
  useDeleteEmployeeByAdmin,
  useAddBloodGroupByAdmin,
  useAddDepartmentByAdmin,
  useUpdateCourseAssignmentDueDate,
  useUnassignCourse
} from '@hooks/mutations/useAdminMutations';

beforeEach(() => jest.clearAllMocks());

describe('useRegisterEmployee', () => {
  it('calls registerEmployee and invalidates allEmployees', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('registerEmployee').mockResolvedValue({ success: true });
    queryClient.setQueryData(['adminAllEmployees'], ['old']);

    const { result } = renderHook(() => useRegisterEmployee(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({ firstName: 'John' } as any);
    });

    expectCalledWithFirstArg(getMock('registerEmployee'), {
      firstName: 'John'
    });
    await waitFor(() => {
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['adminAllEmployees'] })
      ).toHaveLength(1);
    });
  });
});

describe('useRegisterPackage', () => {
  it('calls registerPackage and invalidates allPackages', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('registerPackage').mockResolvedValue({ success: true });
    queryClient.setQueryData(['adminAllPackages'], ['old']);

    const { result } = renderHook(() => useRegisterPackage(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        title: 'Onboarding',
        startDate: '2026-01-01',
        endDate: '2026-12-31'
      } as any);
    });

    expectCalledWithFirstArg(getMock('registerPackage'), {
      title: 'Onboarding',
      startDate: '2026-01-01',
      endDate: '2026-12-31'
    });
    await waitFor(() => {
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['adminAllPackages'] })
      ).toHaveLength(1);
    });
  });
});

describe('useUpdateEmployeeDetails', () => {
  it('calls updateEmployeeDetailsByAdmin and invalidates allEmployees', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('updateEmployeeDetailsByAdmin').mockResolvedValue({
      updated: true
    });
    queryClient.setQueryData(['adminAllEmployees'], ['old']);

    const { result } = renderHook(() => useUpdateEmployeeDetails(), {
      wrapper
    });

    await act(async () => {
      await result.current.mutateAsync({
        id: 'emp1',
        firstName: 'Jane'
      } as any);
    });

    expectCalledWithFirstArg(getMock('updateEmployeeDetailsByAdmin'), {
      id: 'emp1',
      firstName: 'Jane'
    });
    await waitFor(() => {
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['adminAllEmployees'] })
      ).toHaveLength(1);
    });
  });
});

describe('useUpdatePackageByAdmin', () => {
  it('calls updatePackageByAdmin and invalidates allPackages + specific package', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('updatePackageByAdmin').mockResolvedValue({ updated: true });
    queryClient.setQueryData(['adminAllPackages'], ['old']);
    queryClient.setQueryData(['adminPackage', 'pkg1'], { title: 'old' });

    const { result } = renderHook(() => useUpdatePackageByAdmin(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        id: 'pkg1',
        data: { title: 'New Title' } as any
      });
    });

    const calls = getMock('updatePackageByAdmin').mock.calls;
    expect(calls[0][0]).toBe('pkg1');
    expect(calls[0][1]).toEqual({ title: 'New Title' });
    await waitFor(() => {
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['adminAllPackages'] })
      ).toHaveLength(1);
      expect(
        queryClient.getQueryCache().findAll({
          queryKey: ['adminPackage', 'pkg1']
        })
      ).toHaveLength(1);
    });
  });
});

describe('useUpdateCourseAssignmentDueDate', () => {
  it('calls updateCourseAssignmentDueDate and invalidates assignment keys', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('updateCourseAssignmentDueDate').mockResolvedValue({ ok: true });
    queryClient.setQueryData(['adminCourseAssignments'], ['old']);
    queryClient.setQueryData(['adminCourseAssignmentDetail', 'ca1'], {
      detail: 'old'
    });

    const { result } = renderHook(() => useUpdateCourseAssignmentDueDate(), {
      wrapper
    });

    await act(async () => {
      await result.current.mutateAsync({
        courseAssignmentId: 'ca1',
        dueDate: '2026-06-01'
      });
    });

    const calls = getMock('updateCourseAssignmentDueDate').mock.calls;
    expect(calls[0][0]).toBe('ca1');
    expect(calls[0][1]).toBe('2026-06-01');
    await waitFor(() => {
      expect(
        queryClient
          .getQueryCache()
          .findAll({ queryKey: ['adminCourseAssignments'] })
      ).toHaveLength(1);
      expect(
        queryClient.getQueryCache().findAll({
          queryKey: ['adminCourseAssignmentDetail', 'ca1']
        })
      ).toHaveLength(1);
    });
  });
});

describe('useUnassignCourse', () => {
  it('calls unassignCourse and invalidates assignment keys', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('unassignCourse').mockResolvedValue({ ok: true });
    queryClient.setQueryData(['adminCourseAssignments'], ['old']);
    queryClient.setQueryData(['adminCourseAssignmentDetail', 'ca2'], {
      detail: 'old'
    });

    const { result } = renderHook(() => useUnassignCourse(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync('ca2');
    });

    expectCalledWithFirstArg(getMock('unassignCourse'), 'ca2');
    await waitFor(() => {
      expect(
        queryClient
          .getQueryCache()
          .findAll({ queryKey: ['adminCourseAssignments'] })
      ).toHaveLength(1);
      expect(
        queryClient.getQueryCache().findAll({
          queryKey: ['adminCourseAssignmentDetail', 'ca2']
        })
      ).toHaveLength(1);
    });
  });
});

describe('useDeleteEmployeeByAdmin (createMutationHook)', () => {
  it('calls deleteEmployeeByAdmin and invalidates allEmployees', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('deleteEmployeeByAdmin').mockResolvedValue({ deleted: true });
    queryClient.setQueryData(['adminAllEmployees'], ['old']);

    const { result } = renderHook(() => useDeleteEmployeeByAdmin(), {
      wrapper
    });

    await act(async () => {
      await result.current.mutateAsync({
        id: 'emp1',
        confirmDelete: true
      });
    });

    expectCalledWithFirstArg(getMock('deleteEmployeeByAdmin'), {
      id: 'emp1',
      confirmDelete: true
    });
    await waitFor(() => {
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['adminAllEmployees'] })
      ).toHaveLength(1);
    });
  });
});

describe('useAddBloodGroupByAdmin (createMutationHook)', () => {
  it('calls addBloodGroupByAdmin and invalidates bloodGroups', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('addBloodGroupByAdmin').mockResolvedValue({ success: true });
    queryClient.setQueryData(['adminBloodGroups'], ['old']);

    const { result } = renderHook(() => useAddBloodGroupByAdmin(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({ type: 'AB+' });
    });

    expectCalledWithFirstArg(getMock('addBloodGroupByAdmin'), { type: 'AB+' });
    await waitFor(() => {
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['adminBloodGroups'] })
      ).toHaveLength(1);
    });
  });
});

describe('useAddDepartmentByAdmin (createMutationHook)', () => {
  it('calls addDepartmentByAdmin and invalidates departments', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('addDepartmentByAdmin').mockResolvedValue({ success: true });
    queryClient.setQueryData(['adminDepartments'], ['old']);

    const { result } = renderHook(() => useAddDepartmentByAdmin(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({ departmentName: 'Engineering' });
    });

    expectCalledWithFirstArg(getMock('addDepartmentByAdmin'), {
      departmentName: 'Engineering'
    });
    await waitFor(() => {
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['adminDepartments'] })
      ).toHaveLength(1);
    });
  });
});
