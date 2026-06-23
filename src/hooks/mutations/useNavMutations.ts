import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateNavRoleAccessByAdmin,
  updateNavUserAccessByAdmin
} from '@services/admin-services';
import { navQueryKeys } from '../queries/useNavQueries';

export const useUpdateNavRoleAccess = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ role, navKeys }: { role: string; navKeys: string[] }) =>
      updateNavRoleAccessByAdmin(role, navKeys),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: navQueryKeys.roleAccess(variables.role) });
      queryClient.invalidateQueries({ queryKey: navQueryKeys.myMenu });
    }
  });
};

export const useUpdateNavUserAccess = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      addedKeys,
      removedKeys
    }: {
      userId: string;
      addedKeys: string[];
      removedKeys: string[];
    }) => updateNavUserAccessByAdmin(userId, addedKeys, removedKeys),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: navQueryKeys.userAccess(variables.userId) });
      queryClient.invalidateQueries({ queryKey: navQueryKeys.myMenu });
    }
  });
};
