import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  adminQueryKeys,
  useGetDashboardStatsByAdmin,
  useGetAllEmployeesByAdmin,
  useGetEmployeeDetailsByAdmin,
  useGetAllPackagesByAdmin,
  useGetPackageDetailsByAdmin,
  useGetEmployeePackagesByAdmin,
  useGetAllBloodGroupsByAdmin,
  useGetAllEmploymentTypes,
  useGetAllEmployeeRolesByAdmin,
  useGetAllApproversByAdmin,
  useGetAllFeedbackAttributesByAdmin,
  useGetAllDepartmentsByAdmin,
  useGetAllCoursesByAdmin,
  useGetCourseByIdAdmin,
  useGetAllCourseAssignments,
  useGetCourseAssignmentDetails
} from '@hooks/queries/useAdminQueries';

jest.mock('@services/admin-services', () => ({
  getDashboardStatsByAdmin: jest.fn(),
  getAllEmployeeDetailsByAdmin: jest.fn(),
  getEmployeeDetailsByAdmin: jest.fn(),
  getAllPackagesByAdmin: jest.fn(),
  getPackageDetailsByAdmin: jest.fn(),
  getEmployeePackagesByAdmin: jest.fn(),
  getAllBloodGroupByAdmin: jest.fn(),
  getAllEmploymentTypes: jest.fn(),
  getAllEmployeeRoleByAdmin: jest.fn(),
  getAllApproversByAdmin: jest.fn(),
  getallfeedbackattributesbyadmin: jest.fn(),
  getAllDepartmentsByAdmin: jest.fn(),
  getAllCoursesByAdmin: jest.fn(),
  getCourseByIdAdmin: jest.fn(),
  getAllCourseAssignments: jest.fn(),
  getCourseAssignmentDetails: jest.fn()
}));

const adminService = () =>
  jest.requireMock('@services/admin-services') as any;

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

describe('useAdminQueries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('adminQueryKeys', () => {
    it('exposes the expected static keys', () => {
      expect(adminQueryKeys.allEmployees).toEqual(['adminAllEmployees']);
      expect(adminQueryKeys.allPackages).toEqual(['adminAllPackages']);
      expect(adminQueryKeys.employeePackages('emp1')).toEqual([
        'adminEmployeePackages',
        'emp1'
      ]);
      expect(adminQueryKeys.bloodGroups).toEqual(['adminBloodGroups']);
      expect(adminQueryKeys.employmentTypes).toEqual([
        'adminEmploymentTypes'
      ]);
      expect(adminQueryKeys.employeeRoles).toEqual(['adminEmployeeRoles']);
      expect(adminQueryKeys.approvers).toEqual(['adminApprovers']);
      expect(adminQueryKeys.feedbackAttributes).toEqual([
        'adminFeedbackAttributes'
      ]);
      expect(adminQueryKeys.departments).toEqual(['adminDepartments']);
      expect(adminQueryKeys.dashboardStats).toEqual(['adminDashboardStats']);
      expect(adminQueryKeys.courses).toEqual(['adminCourses']);
      expect(adminQueryKeys.courseAssignments).toEqual([
        'adminCourseAssignments'
      ]);
    });

    it('exposes the expected id-scoped keys', () => {
      expect(adminQueryKeys.employee('emp1')).toEqual([
        'adminEmployee',
        'emp1'
      ]);
      expect(adminQueryKeys.package('pkg1')).toEqual([
        'adminPackage',
        'pkg1'
      ]);
      expect(adminQueryKeys.course('crs1')).toEqual(['adminCourse', 'crs1']);
      expect(adminQueryKeys.courseAssignmentDetail('ca1')).toEqual([
        'adminCourseAssignmentDetail',
        'ca1'
      ]);
    });
  });

  describe('useGetDashboardStatsByAdmin', () => {
    it('fetches dashboard stats', async () => {
      adminService().getDashboardStatsByAdmin.mockResolvedValue({
        headcount: 10
      });
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetDashboardStatsByAdmin(), {
        wrapper
      });

      expect(adminService().getDashboardStatsByAdmin).toHaveBeenCalled();
      await waitFor(() =>
        expect(result.current.data).toEqual({ headcount: 10 })
      );
    });
  });

  describe('useGetAllEmployeesByAdmin', () => {
    it('fetches all employees', async () => {
      adminService().getAllEmployeeDetailsByAdmin.mockResolvedValue([
        { id: 'emp1' }
      ]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetAllEmployeesByAdmin(), {
        wrapper
      });

      expect(adminService().getAllEmployeeDetailsByAdmin).toHaveBeenCalled();
      await waitFor(() =>
        expect(result.current.data).toEqual([{ id: 'emp1' }])
      );
    });
  });

  describe('useGetEmployeeDetailsByAdmin', () => {
    it('fetches the employee with the given id', async () => {
      adminService().getEmployeeDetailsByAdmin.mockResolvedValue({
        id: 'emp1'
      });
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetEmployeeDetailsByAdmin('emp1'),
        { wrapper }
      );

      expect(adminService().getEmployeeDetailsByAdmin).toHaveBeenCalledWith(
        'emp1'
      );
      await waitFor(() => expect(result.current.data).toEqual({ id: 'emp1' }));
    });

    it('does not fetch when enabled is false', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetEmployeeDetailsByAdmin('emp1', false),
        { wrapper }
      );

      expect(adminService().getEmployeeDetailsByAdmin).not.toHaveBeenCalled();
    });

    it('does not fetch when the id is an empty string', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetEmployeeDetailsByAdmin(''),
        { wrapper }
      );

      expect(adminService().getEmployeeDetailsByAdmin).not.toHaveBeenCalled();
    });
  });

  describe('useGetAllPackagesByAdmin', () => {
    it('fetches all packages', async () => {
      adminService().getAllPackagesByAdmin.mockResolvedValue([
        { id: 'pkg1' }
      ]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetAllPackagesByAdmin(), {
        wrapper
      });

      expect(adminService().getAllPackagesByAdmin).toHaveBeenCalled();
      await waitFor(() =>
        expect(result.current.data).toEqual([{ id: 'pkg1' }])
      );
    });
  });

  describe('useGetPackageDetailsByAdmin', () => {
    it('fetches the package with the given id', async () => {
      adminService().getPackageDetailsByAdmin.mockResolvedValue({
        id: 'pkg1'
      });
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetPackageDetailsByAdmin('pkg1'),
        { wrapper }
      );

      expect(adminService().getPackageDetailsByAdmin).toHaveBeenCalledWith(
        'pkg1'
      );
      await waitFor(() => expect(result.current.data).toEqual({ id: 'pkg1' }));
    });

    it('does not fetch when enabled is false', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetPackageDetailsByAdmin('pkg1', false),
        { wrapper }
      );

      expect(adminService().getPackageDetailsByAdmin).not.toHaveBeenCalled();
    });

    it('does not fetch when the id is an empty string', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetPackageDetailsByAdmin(''),
        { wrapper }
      );

      expect(adminService().getPackageDetailsByAdmin).not.toHaveBeenCalled();
    });
  });

  describe('useGetEmployeePackagesByAdmin', () => {
    it('fetches the employee packages', async () => {
      adminService().getEmployeePackagesByAdmin.mockResolvedValue([
        { id: 'ep1' }
      ]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetEmployeePackagesByAdmin('emp1'),
        { wrapper }
      );

      expect(adminService().getEmployeePackagesByAdmin).toHaveBeenCalledWith(
        'emp1'
      );
      await waitFor(() =>
        expect(result.current.data).toEqual([{ id: 'ep1' }])
      );
    });

    it('does not fetch when enabled is false', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetEmployeePackagesByAdmin('emp1', false),
        { wrapper }
      );

      expect(adminService().getEmployeePackagesByAdmin).not.toHaveBeenCalled();
    });

    it('does not fetch when the id is an empty string', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetEmployeePackagesByAdmin(''),
        { wrapper }
      );

      expect(adminService().getEmployeePackagesByAdmin).not.toHaveBeenCalled();
    });
  });

  describe('useGetAllBloodGroupsByAdmin', () => {
    it('fetches all blood groups', async () => {
      adminService().getAllBloodGroupByAdmin.mockResolvedValue([
        { label: 'O+' }
      ]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetAllBloodGroupsByAdmin(), {
        wrapper
      });

      expect(adminService().getAllBloodGroupByAdmin).toHaveBeenCalled();
      await waitFor(() =>
        expect(result.current.data).toEqual([{ label: 'O+' }])
      );
    });
  });

  describe('useGetAllEmploymentTypes', () => {
    it('fetches all employment types', async () => {
      adminService().getAllEmploymentTypes.mockResolvedValue([
        { label: 'Permanent' }
      ]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetAllEmploymentTypes(), {
        wrapper
      });

      expect(adminService().getAllEmploymentTypes).toHaveBeenCalled();
      await waitFor(() =>
        expect(result.current.data).toEqual([{ label: 'Permanent' }])
      );
    });
  });

  describe('useGetAllEmployeeRolesByAdmin', () => {
    it('fetches all employee roles', async () => {
      adminService().getAllEmployeeRoleByAdmin.mockResolvedValue([
        { label: 'Engineer' }
      ]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetAllEmployeeRolesByAdmin(), {
        wrapper
      });

      expect(adminService().getAllEmployeeRoleByAdmin).toHaveBeenCalled();
      await waitFor(() =>
        expect(result.current.data).toEqual([{ label: 'Engineer' }])
      );
    });
  });

  describe('useGetAllApproversByAdmin', () => {
    it('fetches all approvers', async () => {
      adminService().getAllApproversByAdmin.mockResolvedValue([
        { id: 'emp2' }
      ]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetAllApproversByAdmin(), {
        wrapper
      });

      expect(adminService().getAllApproversByAdmin).toHaveBeenCalled();
      await waitFor(() =>
        expect(result.current.data).toEqual([{ id: 'emp2' }])
      );
    });
  });

  describe('useGetAllFeedbackAttributesByAdmin', () => {
    it('fetches all feedback attributes', async () => {
      adminService().getallfeedbackattributesbyadmin.mockResolvedValue([
        { label: 'Punctuality' }
      ]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetAllFeedbackAttributesByAdmin(), {
        wrapper
      });

      expect(adminService().getallfeedbackattributesbyadmin).toHaveBeenCalled();
      await waitFor(() =>
        expect(result.current.data).toEqual([{ label: 'Punctuality' }])
      );
    });
  });

  describe('useGetAllDepartmentsByAdmin', () => {
    it('fetches all departments', async () => {
      adminService().getAllDepartmentsByAdmin.mockResolvedValue([
        { label: 'IT' }
      ]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetAllDepartmentsByAdmin(), {
        wrapper
      });

      expect(adminService().getAllDepartmentsByAdmin).toHaveBeenCalled();
      await waitFor(() =>
        expect(result.current.data).toEqual([{ label: 'IT' }])
      );
    });
  });

  describe('useGetAllCoursesByAdmin', () => {
    it('fetches all courses', async () => {
      adminService().getAllCoursesByAdmin.mockResolvedValue([{ id: 'crs1' }]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetAllCoursesByAdmin(), {
        wrapper
      });

      expect(adminService().getAllCoursesByAdmin).toHaveBeenCalled();
      await waitFor(() =>
        expect(result.current.data).toEqual([{ id: 'crs1' }])
      );
    });
  });

  describe('useGetCourseByIdAdmin', () => {
    it('fetches the course with the given id', async () => {
      adminService().getCourseByIdAdmin.mockResolvedValue({ id: 'crs1' });
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetCourseByIdAdmin('crs1'), {
        wrapper
      });

      expect(adminService().getCourseByIdAdmin).toHaveBeenCalledWith('crs1');
      await waitFor(() => expect(result.current.data).toEqual({ id: 'crs1' }));
    });

    it('does not fetch when enabled is false', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetCourseByIdAdmin('crs1', false),
        { wrapper }
      );

      expect(adminService().getCourseByIdAdmin).not.toHaveBeenCalled();
    });

    it('does not fetch when the id is an empty string', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetCourseByIdAdmin(''), {
        wrapper
      });

      expect(adminService().getCourseByIdAdmin).not.toHaveBeenCalled();
    });
  });

  describe('useGetAllCourseAssignments', () => {
    it('fetches all course assignments', async () => {
      adminService().getAllCourseAssignments.mockResolvedValue([
        { id: 'ca1' }
      ]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetAllCourseAssignments(), {
        wrapper
      });

      expect(adminService().getAllCourseAssignments).toHaveBeenCalled();
      await waitFor(() =>
        expect(result.current.data).toEqual([{ id: 'ca1' }])
      );
    });
  });

  describe('useGetCourseAssignmentDetails', () => {
    it('fetches the course assignment with the given id', async () => {
      adminService().getCourseAssignmentDetails.mockResolvedValue({
        id: 'ca1'
      });
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetCourseAssignmentDetails('ca1'),
        { wrapper }
      );

      expect(adminService().getCourseAssignmentDetails).toHaveBeenCalledWith(
        'ca1'
      );
      await waitFor(() => expect(result.current.data).toEqual({ id: 'ca1' }));
    });

    it('does not fetch when enabled is false', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetCourseAssignmentDetails('ca1', false),
        { wrapper }
      );

      expect(adminService().getCourseAssignmentDetails).not.toHaveBeenCalled();
    });

    it('does not fetch when the id is an empty string', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetCourseAssignmentDetails(''),
        { wrapper }
      );

      expect(adminService().getCourseAssignmentDetails).not.toHaveBeenCalled();
    });
  });
});