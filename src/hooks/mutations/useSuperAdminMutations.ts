import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  registerAdmin,
  GenerateOfferletterBySuperAdmin
} from '@services/super-admin-services';
import { RegisterAdminBySuperAdminForm } from '@forms/register-admin-superadmin';
import { OfferLetterForm } from '@forms/offerletter';

export const useRegisterAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RegisterAdminBySuperAdminForm) => registerAdmin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saEmployees'] });
    }
  });
};

export const useGenerateOfferLetter = () => {
  return useMutation({
    mutationFn: (data: OfferLetterForm) => GenerateOfferletterBySuperAdmin(data)
  });
};
