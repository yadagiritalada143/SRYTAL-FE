import { useQuery } from '@tanstack/react-query';
import { getMyNavMenu } from '@services/common-services';
import {
  getNavCatalogByAdmin,
  getNavRoleAccessByAdmin,
  getNavUserAccessByAdmin
} from '@services/admin-services';

export const navQueryKeys = {
  myMenu: ['myNavMenu'] as const,
  catalog: (surface?: string) => ['navCatalog', surface ?? 'all'] as const,
  roleAccess: (role: string) => ['navRoleAccess', role] as const,
  userAccess: (userId: string) => ['navUserAccess', userId] as const
};

// Effective menu for the logged-in user (drives the sidebar + route guard).
export const useGetMyNavMenu = () => {
  return useQuery({
    queryKey: navQueryKeys.myMenu,
    queryFn: getMyNavMenu,
    staleTime: 60_000
  });
};

export const useGetNavCatalog = (surface?: string) => {
  return useQuery({
    queryKey: navQueryKeys.catalog(surface),
    queryFn: () => getNavCatalogByAdmin(surface)
  });
};

export const useGetNavRoleAccess = (role: string, enabled = true) => {
  return useQuery({
    queryKey: navQueryKeys.roleAccess(role),
    queryFn: () => getNavRoleAccessByAdmin(role),
    enabled: !!role && enabled
  });
};

export const useGetNavUserAccess = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: navQueryKeys.userAccess(userId),
    queryFn: () => getNavUserAccessByAdmin(userId),
    enabled: !!userId && enabled
  });
};
