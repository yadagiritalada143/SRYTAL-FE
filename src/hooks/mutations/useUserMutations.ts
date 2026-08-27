import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addCompanyByRecruiter,
  updateCompanyByRecruiter,
  updatePasswordForEmployee,
  addCommentByRecruiter,
  addPoolCandidateCommentByRecruiter,
  addPoolCandidateByRecruiter,
  updatePoolCandidateByRecruiter,
  addCourseContentWriter,
  addCourseModuleContentWriter,
  addCourseTaskContentWriter,
  updateCourseContentWriter,
  updateCourseModuleContentWriter,
  updateCourseTaskContentWriter,
  updateMyTaskProgress
} from '@services/user-services';
import { userQueryKeys } from '../queries/useUserQueries';
import { AddCompanyForm } from '@forms/add-company';
import { UpdatePasswordForm } from '@forms/update-password';
import {
  AddCandidateForm,
  AddCommentForm,
  UpdateCandidateSchema
} from '@forms/add-candidate';
import {
  AddModulePayload,
  AddTaskPayload,
  UpdateCoursePayload,
  UpdateModulePayload,
  UpdateTaskPayload
} from '@interfaces/contentwriter';
import { UpdateTaskProgressPayload } from '@interfaces/course-assignment';

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

export const useAddCourseModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddModulePayload) => addCourseModuleContentWriter(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.course(variables.courseId)
      });
      queryClient.invalidateQueries({ queryKey: userQueryKeys.courses });
    }
  });
};

export const useAddCourseTask = (courseId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddTaskPayload) => addCourseTaskContentWriter(data),
    onSuccess: () => {
      if (courseId) {
        queryClient.invalidateQueries({
          queryKey: userQueryKeys.course(courseId)
        });
      }
    }
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCoursePayload) => updateCourseContentWriter(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.course(variables.id)
      });
      queryClient.invalidateQueries({ queryKey: userQueryKeys.courses });
    }
  });
};

/**
 * Modules and tasks are only ever read through their parent course, so both
 * update hooks refresh that course's cache entry.
 */
export const useUpdateCourseModule = (courseId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateModulePayload) =>
      updateCourseModuleContentWriter(data),
    onSuccess: () => {
      if (courseId) {
        queryClient.invalidateQueries({
          queryKey: userQueryKeys.course(courseId)
        });
      }
      queryClient.invalidateQueries({ queryKey: userQueryKeys.courses });
    }
  });
};

export const useUpdateCourseTask = (courseId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateTaskPayload) =>
      updateCourseTaskContentWriter(data),
    onSuccess: () => {
      if (courseId) {
        queryClient.invalidateQueries({
          queryKey: userQueryKeys.course(courseId)
        });
      }
      queryClient.invalidateQueries({ queryKey: userQueryKeys.courses });
    }
  });
};

/**
 * Marking a task complete changes both the open course's tree and the summary
 * shown in the course list, so both cache entries are refreshed.
 */
export const useUpdateMyTaskProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateTaskProgressPayload) => updateMyTaskProgress(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.myCourse(variables.courseAssignmentId)
      });
      queryClient.invalidateQueries({ queryKey: userQueryKeys.myCourses });
    }
  });
};
