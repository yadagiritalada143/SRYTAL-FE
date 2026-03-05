import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addCompanyByRecruiter,
  updateCompanyByRecruiter,
  updatePasswordForEmployee,
  addCommentByRecruiter,
  addPoolCandidateCommentByRecruiter,
  addPoolCandidateByRecruiter,
  updatePoolCandidateByRecruiter,
  uploadProfileImage,
  addCourseContentWriter
} from '@services/user-services';
import { userQueryKeys } from '../queries/useUserQueries';
import { AddCompanyForm } from '@forms/add-company';
import { UpdatePasswordForm } from '@forms/update-password';
import {
  AddCandidateForm,
  AddCommentForm,
  UpdateCandidateSchema
} from '@forms/add-candidate';

export const useAddCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddCompanyForm) => addCompanyByRecruiter(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.companies });
    }
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: AddCompanyForm; id: string }) =>
      updateCompanyByRecruiter(data, id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.companies });
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.company(variables.id)
      });
    }
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (data: UpdatePasswordForm) => updatePasswordForEmployee(data)
  });
};

export const useAddCompanyComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comment }: { id: string; comment: string }) =>
      addCommentByRecruiter(id, comment),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.company(variables.id)
      });
    }
  });
};

export const useAddCandidateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddCommentForm) =>
      addPoolCandidateCommentByRecruiter(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.candidate(variables.id as string)
      });
    }
  });
};

export const useAddCandidate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddCandidateForm) => addPoolCandidateByRecruiter(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.candidates });
    }
  });
};

export const useUpdateCandidate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCandidateSchema) =>
      updatePoolCandidateByRecruiter(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.candidates });
      if (variables.id) {
        queryClient.invalidateQueries({
          queryKey: userQueryKeys.candidate(variables.id!)
        });
      }
    }
  });
};

export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadProfileImage(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.profileImage });
    }
  });
};

export const useAddCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      name,
      description,
      image
    }: {
      name: string;
      description: string;
      image: File | null;
    }) => addCourseContentWriter(name, description, image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.courses });
    }
  });
};
