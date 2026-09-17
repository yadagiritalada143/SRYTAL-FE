import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

jest.mock('@services/common-services', () => {
  const mockLogin = jest.fn();
  const mockForgetPassword = jest.fn();
  const mockSendContactUsMail = jest.fn();
  const mockSubmitTimeSheet = jest.fn();
  const mockDownloadSalarySlip = jest.fn();
  const mockUploadProfileImage = jest.fn();
  return {
    login: mockLogin,
    forgetPassword: mockForgetPassword,
    sendContactUsMail: mockSendContactUsMail,
    submitTimeSheet: mockSubmitTimeSheet,
    downloadSalarySlip: mockDownloadSalarySlip,
    uploadProfileImage: mockUploadProfileImage
  };
});

const getMock = (name: string) =>
  (jest.requireMock('@services/common-services') as Record<string, jest.Mock>)[
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
  useLogin,
  useForgetPassword,
  useSendContactUsMail,
  useSubmitTimeSheet,
  useDownloadSalarySlip,
  useUploadProfileImage
} from '@hooks/mutations/useCommonMutations';

beforeEach(() => jest.clearAllMocks());

describe('useLogin', () => {
  it('calls login with credentials', async () => {
    const { wrapper } = createWrapper();
    getMock('login').mockResolvedValue({ token: 'abc', userRole: 'Employee' });

    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        username: 'john',
        password: 'pass123'
      } as any);
    });

    expectCalledWithArgs(getMock('login'), {
      username: 'john',
      password: 'pass123'
    });
  });
});

describe('useForgetPassword', () => {
  it('calls forgetPassword with username', async () => {
    const { wrapper } = createWrapper();
    getMock('forgetPassword').mockResolvedValue({ success: true });

    const { result } = renderHook(() => useForgetPassword(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync('john');
    });

    expectCalledWithArgs(getMock('forgetPassword'), 'john');
  });
});

describe('useSendContactUsMail', () => {
  it('calls sendContactUsMail with form data', async () => {
    const { wrapper } = createWrapper();
    getMock('sendContactUsMail').mockResolvedValue({ success: true });

    const { result } = renderHook(() => useSendContactUsMail(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        name: 'Jane',
        email: 'jane@test.com',
        message: 'Hello'
      } as any);
    });

    expectCalledWithArgs(getMock('sendContactUsMail'), {
      name: 'Jane',
      email: 'jane@test.com',
      message: 'Hello'
    });
  });
});

describe('useSubmitTimeSheet', () => {
  it('calls submitTimeSheet and invalidates timesheet', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('submitTimeSheet').mockResolvedValue({ success: true });
    queryClient.setQueryData(['timesheet'], [{ date: '2026-01-01' }]);

    const { result } = renderHook(() => useSubmitTimeSheet(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        data: { date: '2026-01-01', hours: 8 },
        employeeId: 'emp1'
      });
    });

    expectCalledWithArgs(
      getMock('submitTimeSheet'),
      {
        date: '2026-01-01',
        hours: 8
      },
      'emp1'
    );
    await waitFor(() => {
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['timesheet'] })
      ).toHaveLength(1);
    });
  });
});

describe('useDownloadSalarySlip', () => {
  it('calls downloadSalarySlip with employee data', async () => {
    const { wrapper } = createWrapper();
    getMock('downloadSalarySlip').mockResolvedValue({ blob: 'data' });

    const { result } = renderHook(() => useDownloadSalarySlip(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        mongoId: 'emp1',
        fullName: 'John Doe',
        month: 'January',
        year: '2026'
      });
    });

    expectCalledWithArgs(getMock('downloadSalarySlip'), {
      mongoId: 'emp1',
      fullName: 'John Doe',
      month: 'January',
      year: '2026'
    });
  });
});

describe('useUploadProfileImage', () => {
  it('calls uploadProfileImage and invalidates profileImage', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('uploadProfileImage').mockResolvedValue({ success: true });
    queryClient.setQueryData(['profileImage'], 'old-url');

    const file = new File(['dummy'], 'avatar.png', { type: 'image/png' });
    const { result } = renderHook(() => useUploadProfileImage(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({ file, userId: 'u1' });
    });

    const calls = getMock('uploadProfileImage').mock.calls;
    expect(calls[0][0]).toBe(file);
    expect(calls[0][1]).toBe('u1');
    await waitFor(() => {
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['profileImage'] })
      ).toHaveLength(1);
    });
  });
});
