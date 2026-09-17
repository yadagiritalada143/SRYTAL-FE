import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

jest.mock('@services/common-services', () => {
  const mockGetProfileImage = jest.fn();
  return { getProfileImage: mockGetProfileImage };
});

jest.mock('@services/user-services', () => {
  const mockAddCompanyByRecruiter = jest.fn();
  const mockUpdateCompanyByRecruiter = jest.fn();
  const mockUpdatePasswordForEmployee = jest.fn();
  const mockAddCommentByRecruiter = jest.fn();
  const mockAddPoolCandidateCommentByRecruiter = jest.fn();
  const mockAddPoolCandidateByRecruiter = jest.fn();
  const mockUpdatePoolCandidateByRecruiter = jest.fn();
  const mockAddCourseContentWriter = jest.fn();
  const mockAddCourseModuleContentWriter = jest.fn();
  const mockAddCourseTaskContentWriter = jest.fn();
  const mockUpdateCourseContentWriter = jest.fn();
  const mockUpdateCourseModuleContentWriter = jest.fn();
  const mockUpdateCourseTaskContentWriter = jest.fn();
  const mockUpdateMyTaskProgress = jest.fn();
  const mockSaveUserOpenRouterKey = jest.fn();
  return {
    addCompanyByRecruiter: mockAddCompanyByRecruiter,
    updateCompanyByRecruiter: mockUpdateCompanyByRecruiter,
    updatePasswordForEmployee: mockUpdatePasswordForEmployee,
    addCommentByRecruiter: mockAddCommentByRecruiter,
    addPoolCandidateCommentByRecruiter: mockAddPoolCandidateCommentByRecruiter,
    addPoolCandidateByRecruiter: mockAddPoolCandidateByRecruiter,
    updatePoolCandidateByRecruiter: mockUpdatePoolCandidateByRecruiter,
    addCourseContentWriter: mockAddCourseContentWriter,
    addCourseModuleContentWriter: mockAddCourseModuleContentWriter,
    addCourseTaskContentWriter: mockAddCourseTaskContentWriter,
    updateCourseContentWriter: mockUpdateCourseContentWriter,
    updateCourseModuleContentWriter: mockUpdateCourseModuleContentWriter,
    updateCourseTaskContentWriter: mockUpdateCourseTaskContentWriter,
    updateMyTaskProgress: mockUpdateMyTaskProgress,
    saveUserOpenRouterKey: mockSaveUserOpenRouterKey
  };
});

const getMock = (name: string) =>
  (jest.requireMock('@services/user-services') as Record<string, jest.Mock>)[
    name
  ];

const expectCalledWithArgs = (fn: jest.Mock, ...expected: unknown[]) => {
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn.mock.calls[0]).toEqual(expected);
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
  useAddCompany,
  useUpdateCompany,
  useUpdatePassword,
  useAddCompanyComment,
  useAddCandidateComment,
  useAddCandidate,
  useUpdateCandidate,
  useAddCourse,
  useAddCourseModule,
  useAddCourseTask,
  useUpdateCourse,
  useUpdateCourseModule,
  useUpdateCourseTask,
  useUpdateMyTaskProgress,
  useSaveUserOpenRouterKey
} from '@hooks/mutations/useUserMutations';

beforeEach(() => jest.clearAllMocks());

describe('useAddCompany', () => {
  it('calls addCompanyByRecruiter and invalidates companies', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('addCompanyByRecruiter').mockResolvedValue({ success: true });
    queryClient.setQueryData(['poolCompanies'], ['old']);

    const { result } = renderHook(() => useAddCompany(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({ name: 'Acme' } as any);
    });

    expectCalledWithArgs(getMock('addCompanyByRecruiter'), { name: 'Acme' });
    await waitFor(() => {
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['poolCompanies'] })
      ).toHaveLength(1);
    });
  });
});

describe('useUpdateCompany', () => {
  it('calls updateCompanyByRecruiter and invalidates companies + specific company', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('updateCompanyByRecruiter').mockResolvedValue({ updated: true });
    queryClient.setQueryData(['poolCompanies'], ['old']);
    queryClient.setQueryData(['poolCompany', 'co1'], { name: 'old' });

    const { result } = renderHook(() => useUpdateCompany(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        data: { name: 'New' } as any,
        id: 'co1'
      });
    });

    expectCalledWithArgs(
      getMock('updateCompanyByRecruiter'),
      { name: 'New' },
      'co1'
    );
    await waitFor(() => {
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['poolCompanies'] })
      ).toHaveLength(1);
      expect(
        queryClient
          .getQueryCache()
          .findAll({ queryKey: ['poolCompany', 'co1'] })
      ).toHaveLength(1);
    });
  });
});

describe('useUpdatePassword', () => {
  it('calls updatePasswordForEmployee', async () => {
    const { wrapper } = createWrapper();
    getMock('updatePasswordForEmployee').mockResolvedValue({ success: true });

    const { result } = renderHook(() => useUpdatePassword(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        oldPassword: 'old',
        newPassword: 'new'
      } as any);
    });

    expectCalledWithArgs(getMock('updatePasswordForEmployee'), {
      oldPassword: 'old',
      newPassword: 'new'
    });
  });
});

describe('useAddCompanyComment', () => {
  it('calls addCommentByRecruiter and invalidates specific company', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('addCommentByRecruiter').mockResolvedValue({ success: true });
    queryClient.setQueryData(['poolCompany', 'co1'], { comments: [] });

    const { result } = renderHook(() => useAddCompanyComment(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({ id: 'co1', comment: 'Great company' });
    });

    expectCalledWithArgs(
      getMock('addCommentByRecruiter'),
      'co1',
      'Great company'
    );
    await waitFor(() => {
      expect(
        queryClient
          .getQueryCache()
          .findAll({ queryKey: ['poolCompany', 'co1'] })
      ).toHaveLength(1);
    });
  });
});

describe('useAddCandidateComment', () => {
  it('calls addPoolCandidateCommentByRecruiter and invalidates specific candidate', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('addPoolCandidateCommentByRecruiter').mockResolvedValue({
      success: true
    });
    queryClient.setQueryData(['poolCandidate', 'c1'], { comments: [] });

    const { result } = renderHook(() => useAddCandidateComment(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        id: 'c1',
        comment: 'Good skills'
      } as any);
    });

    expectCalledWithArgs(getMock('addPoolCandidateCommentByRecruiter'), {
      id: 'c1',
      comment: 'Good skills'
    });
    await waitFor(() => {
      expect(
        queryClient
          .getQueryCache()
          .findAll({ queryKey: ['poolCandidate', 'c1'] })
      ).toHaveLength(1);
    });
  });
});

describe('useAddCandidate', () => {
  it('calls addPoolCandidateByRecruiter and invalidates candidates', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('addPoolCandidateByRecruiter').mockResolvedValue({ success: true });
    queryClient.setQueryData(['poolCandidates'], ['old']);

    const { result } = renderHook(() => useAddCandidate(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        candidateName: 'Alice',
        contact: { email: 'a@test.com', phone: '1234567890' },
        totalYearsOfExperience: 5,
        relaventYearsOfExperience: 3,
        evaluatedSkills: 'React',
        comments: []
      } as any);
    });

    expectCalledWithArgs(getMock('addPoolCandidateByRecruiter'), {
      candidateName: 'Alice',
      contact: { email: 'a@test.com', phone: '1234567890' },
      totalYearsOfExperience: 5,
      relaventYearsOfExperience: 3,
      evaluatedSkills: 'React',
      comments: []
    });
    await waitFor(() => {
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['poolCandidates'] })
      ).toHaveLength(1);
    });
  });
});

describe('useUpdateCandidate', () => {
  it('calls updatePoolCandidateByRecruiter and invalidates candidates + specific candidate', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('updatePoolCandidateByRecruiter').mockResolvedValue({
      updated: true
    });
    queryClient.setQueryData(['poolCandidates'], ['old']);
    queryClient.setQueryData(['poolCandidate', 'c1'], { name: 'old' });

    const { result } = renderHook(() => useUpdateCandidate(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        id: 'c1',
        candidateName: 'Bob'
      } as any);
    });

    expectCalledWithArgs(getMock('updatePoolCandidateByRecruiter'), {
      id: 'c1',
      candidateName: 'Bob'
    });
    await waitFor(() => {
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['poolCandidates'] })
      ).toHaveLength(1);
      expect(
        queryClient
          .getQueryCache()
          .findAll({ queryKey: ['poolCandidate', 'c1'] })
      ).toHaveLength(1);
    });
  });
});

describe('useAddCourse', () => {
  it('calls addCourseContentWriter and invalidates courses', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('addCourseContentWriter').mockResolvedValue({ success: true });
    queryClient.setQueryData(['userCourses'], ['old']);

    const { result } = renderHook(() => useAddCourse(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        name: 'React 101',
        description: 'Learn React',
        image: null
      });
    });

    expectCalledWithArgs(
      getMock('addCourseContentWriter'),
      'React 101',
      'Learn React',
      null
    );
    await waitFor(() => {
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['userCourses'] })
      ).toHaveLength(1);
    });
  });
});

describe('useAddCourseModule', () => {
  it('calls addCourseModuleContentWriter and invalidates course + courses', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('addCourseModuleContentWriter').mockResolvedValue({
      success: true
    });
    queryClient.setQueryData(['userCourse', 'course1'], { modules: [] });
    queryClient.setQueryData(['userCourses'], ['old']);

    const { result } = renderHook(() => useAddCourseModule(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        courseId: 'course1',
        moduleName: 'Intro',
        moduleDescription: 'First module'
      });
    });

    expectCalledWithArgs(getMock('addCourseModuleContentWriter'), {
      courseId: 'course1',
      moduleName: 'Intro',
      moduleDescription: 'First module'
    });
    await waitFor(() => {
      expect(
        queryClient
          .getQueryCache()
          .findAll({ queryKey: ['userCourse', 'course1'] })
      ).toHaveLength(1);
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['userCourses'] })
      ).toHaveLength(1);
    });
  });
});

describe('useAddCourseTask', () => {
  it('calls addCourseTaskContentWriter and invalidates course when courseId given', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('addCourseTaskContentWriter').mockResolvedValue({ success: true });
    queryClient.setQueryData(['userCourse', 'course1'], { modules: [] });

    const { result } = renderHook(() => useAddCourseTask('course1'), {
      wrapper
    });

    await act(async () => {
      await result.current.mutateAsync({
        moduleId: 'm1',
        taskName: 'Task 1',
        taskDescription: 'Do it',
        link: 'https://example.com'
      });
    });

    expectCalledWithArgs(getMock('addCourseTaskContentWriter'), {
      moduleId: 'm1',
      taskName: 'Task 1',
      taskDescription: 'Do it',
      link: 'https://example.com'
    });
    await waitFor(() => {
      expect(
        queryClient
          .getQueryCache()
          .findAll({ queryKey: ['userCourse', 'course1'] })
      ).toHaveLength(1);
    });
  });

  it('does not invalidate course when courseId is omitted', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('addCourseTaskContentWriter').mockResolvedValue({ success: true });

    const { result } = renderHook(() => useAddCourseTask(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        moduleId: 'm1',
        taskName: 'Task 1',
        taskDescription: 'Do it',
        link: 'https://example.com'
      });
    });

    expect(
      queryClient
        .getQueryCache()
        .findAll({ queryKey: ['userCourse', 'course1'] })
    ).toHaveLength(0);
  });
});

describe('useUpdateCourse', () => {
  it('calls updateCourseContentWriter and invalidates course + courses', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('updateCourseContentWriter').mockResolvedValue({ updated: true });
    queryClient.setQueryData(['userCourse', 'course1'], { name: 'old' });
    queryClient.setQueryData(['userCourses'], ['old']);

    const { result } = renderHook(() => useUpdateCourse(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        id: 'course1',
        courseName: 'Updated',
        courseDescription: 'Updated desc',
        status: 'ACTIVE'
      } as any);
    });

    expectCalledWithArgs(getMock('updateCourseContentWriter'), {
      id: 'course1',
      courseName: 'Updated',
      courseDescription: 'Updated desc',
      status: 'ACTIVE'
    });
    await waitFor(() => {
      expect(
        queryClient
          .getQueryCache()
          .findAll({ queryKey: ['userCourse', 'course1'] })
      ).toHaveLength(1);
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['userCourses'] })
      ).toHaveLength(1);
    });
  });
});

describe('useUpdateCourseModule', () => {
  it('calls updateCourseModuleContentWriter and invalidates course + courses', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('updateCourseModuleContentWriter').mockResolvedValue({
      updated: true
    });
    queryClient.setQueryData(['userCourse', 'course1'], { modules: [] });
    queryClient.setQueryData(['userCourses'], ['old']);

    const { result } = renderHook(() => useUpdateCourseModule('course1'), {
      wrapper
    });

    await act(async () => {
      await result.current.mutateAsync({
        id: 'm1',
        moduleName: 'Intro v2',
        moduleDescription: 'Updated',
        status: 'ACTIVE'
      });
    });

    expectCalledWithArgs(getMock('updateCourseModuleContentWriter'), {
      id: 'm1',
      moduleName: 'Intro v2',
      moduleDescription: 'Updated',
      status: 'ACTIVE'
    });
    await waitFor(() => {
      expect(
        queryClient
          .getQueryCache()
          .findAll({ queryKey: ['userCourse', 'course1'] })
      ).toHaveLength(1);
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['userCourses'] })
      ).toHaveLength(1);
    });
  });
});

describe('useUpdateCourseTask', () => {
  it('calls updateCourseTaskContentWriter and invalidates course + courses', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('updateCourseTaskContentWriter').mockResolvedValue({
      updated: true
    });
    queryClient.setQueryData(['userCourse', 'course1'], { modules: [] });
    queryClient.setQueryData(['userCourses'], ['old']);

    const { result } = renderHook(() => useUpdateCourseTask('course1'), {
      wrapper
    });

    await act(async () => {
      await result.current.mutateAsync({
        id: 't1',
        taskName: 'Task v2',
        taskDescription: 'Updated',
        status: 'ACTIVE'
      });
    });

    expectCalledWithArgs(getMock('updateCourseTaskContentWriter'), {
      id: 't1',
      taskName: 'Task v2',
      taskDescription: 'Updated',
      status: 'ACTIVE'
    });
    await waitFor(() => {
      expect(
        queryClient
          .getQueryCache()
          .findAll({ queryKey: ['userCourse', 'course1'] })
      ).toHaveLength(1);
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['userCourses'] })
      ).toHaveLength(1);
    });
  });
});

describe('useUpdateMyTaskProgress', () => {
  it('calls updateMyTaskProgress and invalidates myCourse + myCourses', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('updateMyTaskProgress').mockResolvedValue({
      success: true,
      courseStatus: 'In Progress'
    });
    queryClient.setQueryData(['myAssignedCourses'], ['old']);
    queryClient.setQueryData(['myAssignedCourse', 'ca1'], { modules: [] });

    const { result } = renderHook(() => useUpdateMyTaskProgress(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        courseAssignmentId: 'ca1',
        taskId: 't1',
        isCompleted: true
      });
    });

    expectCalledWithArgs(getMock('updateMyTaskProgress'), {
      courseAssignmentId: 'ca1',
      taskId: 't1',
      isCompleted: true
    });
    await waitFor(() => {
      expect(
        queryClient
          .getQueryCache()
          .findAll({ queryKey: ['myAssignedCourse', 'ca1'] })
      ).toHaveLength(1);
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['myAssignedCourses'] })
      ).toHaveLength(1);
    });
  });
});

describe('useSaveUserOpenRouterKey', () => {
  it('calls saveUserOpenRouterKey and invalidates userOpenRouterKey', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('saveUserOpenRouterKey').mockResolvedValue({ success: true });
    queryClient.setQueryData(['userOpenRouterKey'], 'old-key');

    const { result } = renderHook(() => useSaveUserOpenRouterKey(), {
      wrapper
    });

    await act(async () => {
      await result.current.mutateAsync('sk-new-key-123');
    });

    expectCalledWithArgs(getMock('saveUserOpenRouterKey'), 'sk-new-key-123');
    await waitFor(() => {
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['userOpenRouterKey'] })
      ).toHaveLength(1);
    });
  });
});
