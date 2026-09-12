import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

jest.mock('@services/common-services', () => {
  const mockGetMyNavMenu = jest.fn();
  return { getMyNavMenu: mockGetMyNavMenu };
});

jest.mock('@services/admin-services', () => {
  const mockUpdateNavRoleAccessByAdmin = jest.fn();
  const mockUpdateNavUserAccessByAdmin = jest.fn();
  return {
    updateNavRoleAccessByAdmin: mockUpdateNavRoleAccessByAdmin,
    updateNavUserAccessByAdmin: mockUpdateNavUserAccessByAdmin
  };
});

const getMock = (name: string) =>
  (jest.requireMock('@services/admin-services') as Record<string, jest.Mock>)[
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
  useUpdateNavRoleAccess,
  useUpdateNavUserAccess
} from '@hooks/mutations/useNavMutations';

beforeEach(() => jest.clearAllMocks());

describe('useUpdateNavRoleAccess', () => {
  it('calls updateNavRoleAccessByAdmin and invalidates roleAccess + myMenu', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('updateNavRoleAccessByAdmin').mockResolvedValue({ ok: true });
    queryClient.setQueryData(['navRoleAccess', 'admin'], { navKeys: [] });
    queryClient.setQueryData(['myNavMenu'], { items: [] });

    const { result } = renderHook(() => useUpdateNavRoleAccess(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        role: 'admin',
        navKeys: ['dashboard', 'employees']
      });
    });

    expectCalledWithArgs(getMock('updateNavRoleAccessByAdmin'), 'admin', [
      'dashboard',
      'employees'
    ]);
    await waitFor(() => {
      expect(
        queryClient
          .getQueryCache()
          .findAll({ queryKey: ['navRoleAccess', 'admin'] })
      ).toHaveLength(1);
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['myNavMenu'] })
      ).toHaveLength(1);
    });
  });
});

describe('useUpdateNavUserAccess', () => {
  it('calls updateNavUserAccessByAdmin and invalidates userAccess + myMenu', async () => {
    const { queryClient, wrapper } = createWrapper();
    getMock('updateNavUserAccessByAdmin').mockResolvedValue({ ok: true });
    queryClient.setQueryData(['navUserAccess', 'u1'], { keys: [] });
    queryClient.setQueryData(['myNavMenu'], { items: [] });

    const { result } = renderHook(() => useUpdateNavUserAccess(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        userId: 'u1',
        addedKeys: ['settings'],
        removedKeys: ['reports']
      });
    });

    expectCalledWithArgs(
      getMock('updateNavUserAccessByAdmin'),
      'u1',
      ['settings'],
      ['reports']
    );
    await waitFor(() => {
      expect(
        queryClient
          .getQueryCache()
          .findAll({ queryKey: ['navUserAccess', 'u1'] })
      ).toHaveLength(1);
      expect(
        queryClient.getQueryCache().findAll({ queryKey: ['myNavMenu'] })
      ).toHaveLength(1);
    });
  });
});
