import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  navQueryKeys,
  useGetMyNavMenu,
  useGetNavCatalog,
  useGetNavRoleAccess,
  useGetNavUserAccess
} from '@hooks/queries/useNavQueries';

jest.mock('@services/common-services', () => ({
  getMyNavMenu: jest.fn()
}));

jest.mock('@services/admin-services', () => ({
  getNavCatalogByAdmin: jest.fn(),
  getNavRoleAccessByAdmin: jest.fn(),
  getNavUserAccessByAdmin: jest.fn()
}));

const commonService = () =>
  jest.requireMock('@services/common-services') as any;

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

describe('useNavQueries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('navQueryKeys', () => {
    it('exposes the expected key shapes', () => {
      expect(navQueryKeys.myMenu).toEqual(['myNavMenu']);
      expect(navQueryKeys.catalog()).toEqual(['navCatalog', 'all']);
      expect(navQueryKeys.catalog('admin')).toEqual(['navCatalog', 'admin']);
      expect(navQueryKeys.roleAccess('Admin')).toEqual([
        'navRoleAccess',
        'Admin'
      ]);
      expect(navQueryKeys.userAccess('u1')).toEqual(['navUserAccess', 'u1']);
    });
  });

  describe('useGetMyNavMenu', () => {
    it('fetches the effective menu for the user', async () => {
      commonService().getMyNavMenu.mockResolvedValue([
        { url: '/dashboard', label: 'Dashboard' }
      ]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetMyNavMenu(), { wrapper });

      expect(commonService().getMyNavMenu).toHaveBeenCalled();
      await waitFor(() =>
        expect(result.current.data).toEqual([
          { url: '/dashboard', label: 'Dashboard' }
        ])
      );
    });
  });

  describe('useGetNavCatalog', () => {
    it('fetches the full catalog when no surface is given', async () => {
      adminService().getNavCatalogByAdmin.mockResolvedValue([
        { name: 'dashboard' }
      ]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetNavCatalog(), { wrapper });

      expect(adminService().getNavCatalogByAdmin).toHaveBeenCalledWith(
        undefined
      );
      await waitFor(() =>
        expect(result.current.data).toEqual([{ name: 'dashboard' }])
      );
    });

    it('fetches the catalog for the given surface', async () => {
      adminService().getNavCatalogByAdmin.mockResolvedValue([
        { name: 'settings' }
      ]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetNavCatalog('admin'), {
        wrapper
      });

      expect(adminService().getNavCatalogByAdmin).toHaveBeenCalledWith(
        'admin'
      );
      await waitFor(() =>
        expect(result.current.data).toEqual([{ name: 'settings' }])
      );
    });
  });

  describe('useGetNavRoleAccess', () => {
    it('fetches role access for the given role', async () => {
      adminService().getNavRoleAccessByAdmin.mockResolvedValue([
        { role: 'Admin', navItemId: 'n1' }
      ]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetNavRoleAccess('Admin'), {
        wrapper
      });

      expect(adminService().getNavRoleAccessByAdmin).toHaveBeenCalledWith(
        'Admin'
      );
      await waitFor(() =>
        expect(result.current.data).toEqual([
          { role: 'Admin', navItemId: 'n1' }
        ])
      );
    });

    it('does not fetch when enabled is false', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetNavRoleAccess('Admin', false),
        { wrapper }
      );

      expect(adminService().getNavRoleAccessByAdmin).not.toHaveBeenCalled();
    });

    it('does not fetch when the role is an empty string', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetNavRoleAccess(''), { wrapper });

      expect(adminService().getNavRoleAccessByAdmin).not.toHaveBeenCalled();
    });
  });

  describe('useGetNavUserAccess', () => {
    it('fetches user access for the given user', async () => {
      adminService().getNavUserAccessByAdmin.mockResolvedValue([
        { userId: 'u1', navItemId: 'n1' }
      ]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetNavUserAccess('u1'), {
        wrapper
      });

      expect(adminService().getNavUserAccessByAdmin).toHaveBeenCalledWith(
        'u1'
      );
      await waitFor(() =>
        expect(result.current.data).toEqual([
          { userId: 'u1', navItemId: 'n1' }
        ])
      );
    });

    it('does not fetch when enabled is false', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetNavUserAccess('u1', false),
        { wrapper }
      );

      expect(adminService().getNavUserAccessByAdmin).not.toHaveBeenCalled();
    });

    it('does not fetch when the user id is an empty string', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetNavUserAccess(''), { wrapper });

      expect(adminService().getNavUserAccessByAdmin).not.toHaveBeenCalled();
    });
  });
});