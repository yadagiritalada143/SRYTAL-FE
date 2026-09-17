import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

jest.mock('@services/super-admin-services', () => {
  const mockRegisterAdmin = jest.fn();
  const mockGenerateOfferletterBySuperAdmin = jest.fn();
  return {
    registerAdmin: mockRegisterAdmin,
    GenerateOfferletterBySuperAdmin: mockGenerateOfferletterBySuperAdmin
  };
});

const getMock = (name: string) =>
  (
    jest.requireMock('@services/super-admin-services') as Record<
      string,
      jest.Mock
    >
  )[name];

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
  useRegisterAdmin,
  useGenerateOfferLetter
} from '@hooks/mutations/useSuperAdminMutations';

beforeEach(() => jest.clearAllMocks());

describe('useRegisterAdmin', () => {
  it('calls registerAdmin and invalidates saEmployees', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('registerAdmin').mockResolvedValue({ success: true });
    queryClient.setQueryData(['saEmployees'], ['old']);

    const { result } = renderHook(() => useRegisterAdmin(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        organizationName: 'SRYTAL INC',
        adminEmail: 'admin@srytal.com',
        password: 'pass123'
      } as any);
    });

    expectCalledWithArgs(getMock('registerAdmin'), {
      organizationName: 'SRYTAL INC',
      adminEmail: 'admin@srytal.com',
      password: 'pass123'
    });
    await waitFor(() => {
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['saEmployees'] })
      ).toHaveLength(1);
    });
  });
});

describe('useGenerateOfferLetter', () => {
  it('calls GenerateOfferletterBySuperAdmin with offer form data', async () => {
    const { wrapper } = createWrapper();
    getMock('GenerateOfferletterBySuperAdmin').mockResolvedValue({
      blob: 'data'
    });

    const { result } = renderHook(() => useGenerateOfferLetter(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        fullName: 'John Doe',
        role: 'Software Engineer'
      } as any);
    });

    expectCalledWithArgs(getMock('GenerateOfferletterBySuperAdmin'), {
      fullName: 'John Doe',
      role: 'Software Engineer'
    });
  });
});
