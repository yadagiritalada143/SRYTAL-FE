import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  userQueryKeys,
  useGetCompanyDetails,
  useGetCompanyById,
  useGetAllPoolCandidates,
  useGetPoolCandidateById,
  useGetUserDetails,
  useGetProfileImage,
  useGetAllCoursesByUser,
  useGetCourseById,
  useGetEmployeeDashboard,
  useGetMyAssignedCourses,
  useGetMyAssignedCourse,
  useGetUserOpenRouterKey
} from '@hooks/queries/useUserQueries';

jest.mock('@services/user-services', () => ({
  getCompanyDetails: jest.fn(),
  getCompanyDetailsByIdByRecruiter: jest.fn(),
  getAllPoolCandidatesByEmployee: jest.fn(),
  getPoolCandidateByRecruiter: jest.fn(),
  getUserDetails: jest.fn(),
  getAllCoursesByUser: jest.fn(),
  getCourseByIdContentWriter: jest.fn(),
  getEmployeeDashboard: jest.fn(),
  getMyAssignedCourses: jest.fn(),
  getMyAssignedCourseById: jest.fn(),
  getUserOpenRouterKey: jest.fn()
}));

jest.mock('@services/common-services', () => ({
  getProfileImage: jest.fn()
}));

const userService = () => jest.requireMock('@services/user-services') as any;

const commonService = () =>
  jest.requireMock('@services/common-services') as any;

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

describe('useUserQueries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('userQueryKeys', () => {
    it('exposes the expected static keys', () => {
      expect(userQueryKeys.companies).toEqual(['poolCompanies']);
      expect(userQueryKeys.candidates).toEqual(['poolCandidates']);
      expect(userQueryKeys.userDetails).toEqual(['userDetails']);
      expect(userQueryKeys.profileImage).toEqual(['profileImage']);
      expect(userQueryKeys.courses).toEqual(['userCourses']);
      expect(userQueryKeys.employeeDashboard).toEqual(['employeeDashboard']);
      expect(userQueryKeys.myCourses).toEqual(['myAssignedCourses']);
    });

    it('exposes the expected id-scoped keys', () => {
      expect(userQueryKeys.company('co1')).toEqual(['poolCompany', 'co1']);
      expect(userQueryKeys.candidate('c1')).toEqual(['poolCandidate', 'c1']);
      expect(userQueryKeys.course('crs1')).toEqual(['userCourse', 'crs1']);
      expect(userQueryKeys.myCourse('ca1')).toEqual([
        'myAssignedCourse',
        'ca1'
      ]);
      expect(userQueryKeys.openRouterKey('u1')).toEqual([
        'userOpenRouterKey',
        'u1'
      ]);
    });
  });

  describe('useGetCompanyDetails', () => {
    it('fetches the pool companies', async () => {
      userService().getCompanyDetails.mockResolvedValue([{ id: 'co1' }]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetCompanyDetails(), { wrapper });

      expect(userService().getCompanyDetails).toHaveBeenCalled();
      await waitFor(() => expect(result.current.data).toEqual([{ id: 'co1' }]));
    });
  });

  describe('useGetCompanyById', () => {
    it('fetches the company with the given id', async () => {
      userService().getCompanyDetailsByIdByRecruiter.mockResolvedValue({
        id: 'co1'
      });
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetCompanyById('co1'), {
        wrapper
      });

      expect(
        userService().getCompanyDetailsByIdByRecruiter
      ).toHaveBeenCalledWith('co1');
      await waitFor(() => expect(result.current.data).toEqual({ id: 'co1' }));
    });

    it('does not fetch when enabled is false', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetCompanyById('co1', false), {
        wrapper
      });

      expect(userService().getCompanyDetailsByIdByRecruiter).not.toHaveBeenCalled();
    });

    it('does not fetch when the id is an empty string', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetCompanyById(''), { wrapper });

      expect(userService().getCompanyDetailsByIdByRecruiter).not.toHaveBeenCalled();
    });
  });

  describe('useGetAllPoolCandidates', () => {
    it('fetches all pool candidates', async () => {
      userService().getAllPoolCandidatesByEmployee.mockResolvedValue([
        { id: 'c1' }
      ]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetAllPoolCandidates(), {
        wrapper
      });

      expect(userService().getAllPoolCandidatesByEmployee).toHaveBeenCalled();
      await waitFor(() =>
        expect(result.current.data).toEqual([{ id: 'c1' }])
      );
    });
  });

  describe('useGetPoolCandidateById', () => {
    it('fetches the pool candidate with the given id', async () => {
      userService().getPoolCandidateByRecruiter.mockResolvedValue({ id: 'c1' });
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetPoolCandidateById('c1'), {
        wrapper
      });

      expect(userService().getPoolCandidateByRecruiter).toHaveBeenCalledWith(
        'c1'
      );
      await waitFor(() => expect(result.current.data).toEqual({ id: 'c1' }));
    });

    it('does not fetch when enabled is false', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetPoolCandidateById('c1', false),
        { wrapper }
      );

      expect(userService().getPoolCandidateByRecruiter).not.toHaveBeenCalled();
    });

    it('does not fetch when the id is an empty string', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetPoolCandidateById(''), {
        wrapper
      });

      expect(userService().getPoolCandidateByRecruiter).not.toHaveBeenCalled();
    });
  });

  describe('useGetUserDetails', () => {
    it('fetches the user details', async () => {
      userService().getUserDetails.mockResolvedValue({ id: 'emp1' });
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetUserDetails(), { wrapper });

      expect(userService().getUserDetails).toHaveBeenCalled();
      await waitFor(() => expect(result.current.data).toEqual({ id: 'emp1' }));
    });
  });

  describe('useGetProfileImage', () => {
    it('fetches the profile image', async () => {
      const blob = new Blob(['x'], { type: 'image/png' });
      commonService().getProfileImage.mockResolvedValue(blob);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetProfileImage(), { wrapper });

      expect(commonService().getProfileImage).toHaveBeenCalled();
      await waitFor(() => expect(result.current.data).toEqual(blob));
    });
  });

  describe('useGetAllCoursesByUser', () => {
    it('fetches all courses', async () => {
      userService().getAllCoursesByUser.mockResolvedValue([{ id: 'crs1' }]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetAllCoursesByUser(), {
        wrapper
      });

      expect(userService().getAllCoursesByUser).toHaveBeenCalled();
      await waitFor(() =>
        expect(result.current.data).toEqual([{ id: 'crs1' }])
      );
    });
  });

  describe('useGetCourseById', () => {
    it('fetches the course with the given id', async () => {
      userService().getCourseByIdContentWriter.mockResolvedValue({ id: 'crs1' });
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetCourseById('crs1'), {
        wrapper
      });

      expect(userService().getCourseByIdContentWriter).toHaveBeenCalledWith(
        'crs1'
      );
      await waitFor(() => expect(result.current.data).toEqual({ id: 'crs1' }));
    });

    it('does not fetch when enabled is false', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetCourseById('crs1', false), {
        wrapper
      });

      expect(userService().getCourseByIdContentWriter).not.toHaveBeenCalled();
    });

    it('does not fetch when the id is an empty string', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetCourseById(''), { wrapper });

      expect(userService().getCourseByIdContentWriter).not.toHaveBeenCalled();
    });
  });

  describe('useGetEmployeeDashboard', () => {
    it('fetches the employee dashboard data', async () => {
      userService().getEmployeeDashboard.mockResolvedValue({ hours: 120 });
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetEmployeeDashboard(), {
        wrapper
      });

      expect(userService().getEmployeeDashboard).toHaveBeenCalled();
      await waitFor(() =>
        expect(result.current.data).toEqual({ hours: 120 })
      );
    });
  });

  describe('useGetMyAssignedCourses', () => {
    it('fetches the assigned courses', async () => {
      userService().getMyAssignedCourses.mockResolvedValue([{ id: 'ca1' }]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetMyAssignedCourses(), {
        wrapper
      });

      expect(userService().getMyAssignedCourses).toHaveBeenCalled();
      await waitFor(() =>
        expect(result.current.data).toEqual([{ id: 'ca1' }])
      );
    });
  });

  describe('useGetMyAssignedCourse', () => {
    it('fetches the assigned course with the given id', async () => {
      userService().getMyAssignedCourseById.mockResolvedValue({ id: 'ca1' });
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetMyAssignedCourse('ca1'),
        { wrapper }
      );

      expect(userService().getMyAssignedCourseById).toHaveBeenCalledWith(
        'ca1'
      );
      await waitFor(() => expect(result.current.data).toEqual({ id: 'ca1' }));
    });

    it('does not fetch when enabled is false', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetMyAssignedCourse('ca1', false),
        { wrapper }
      );

      expect(userService().getMyAssignedCourseById).not.toHaveBeenCalled();
    });

    it('does not fetch when the id is an empty string', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetMyAssignedCourse(''), {
        wrapper
      });

      expect(userService().getMyAssignedCourseById).not.toHaveBeenCalled();
    });
  });

  describe('useGetUserOpenRouterKey', () => {
    it('fetches the open router key for the given user', async () => {
      userService().getUserOpenRouterKey.mockResolvedValue({
        success: true,
        data: null
      });
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetUserOpenRouterKey('u1'), {
        wrapper
      });

      expect(userService().getUserOpenRouterKey).toHaveBeenCalled();
      await waitFor(() =>
        expect(result.current.data).toEqual({ success: true, data: null })
      );
    });

    it('does not fetch when enabled is false', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetUserOpenRouterKey('u1', false),
        { wrapper }
      );

      expect(userService().getUserOpenRouterKey).not.toHaveBeenCalled();
    });

    it('defaults the query key to current when no user id is passed', async () => {
      userService().getUserOpenRouterKey.mockResolvedValue({
        success: true,
        data: 'sk-test'
      });
      const { wrapper, queryClient } = createWrapper();

      const { result } = renderHook(() => useGetUserOpenRouterKey(), {
        wrapper
      });

      await waitFor(() =>
        expect(result.current.data).toEqual({
          success: true,
          data: 'sk-test'
        })
      );

      const cached = queryClient.getQueryCache().findAll();
      expect(cached.map((q) => q.queryKey)).toContainEqual([
        'userOpenRouterKey',
        'current'
      ]);
    });
  });
});