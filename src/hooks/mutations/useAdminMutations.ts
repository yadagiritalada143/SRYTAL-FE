import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  registerEmployee,
  registerPackage,
  updateEmployeeDetailsByAdmin,
  updatePackageByAdmin,
  handlePasswordResetByAdmin,
  deleteEmployeeByAdmin,
  deletePackageByAdmin,
  deleteTaskByAdmin,
  deleteEmployeePackagesByAdmin,
  deleteEmployeeTasksByAdmin,
  deletePoolCandidatesByAdmin,
  deletePoolCompanyByAdmin,
  addBloodGroupByAdmin,
  addEmploymentTypeByAdmin,
  addEmployeeRoleByAdmin,
  addPackagetoEmployeeByAdmin,
  updateBloodGroupByAdmin,
  updateEmployeeRoleByAdmin,
  updateEmploymentTypeByAdmin,
  addTasksByAdmin,
  updateTaskByAdmin,
  deleteEmployeeRoleByAdmin,
  deleteBloodGroupByAdmin,
  deleteEmploymentTypeByAdmin,
  updateEmployeePackageByAdmin,
  previewSalarySlip,
  generateSalarySlip,
  addFeedbackAttributeByAdmin,
  updateFeedbackAttributeByAdmin,
  deleteFeedbackAttributeByAdmin,
  addDepartmentByAdmin,
  updateDepartmentByAdmin,
  deleteDepartmentByAdmin
} from '@services/admin-services';
import { adminQueryKeys } from '../queries/useAdminQueries';
import { AddEmployeeForm } from '@forms/add-employee';
import { EmployeeUpdateForm } from '@forms/update-employee';
import { AddPackageForm } from '@forms/add-package';
import { PackageUpdateForm } from '@forms/update-package';

export const useRegisterEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddEmployeeForm) => registerEmployee(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.allEmployees })
  });
};

export const useRegisterPackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddPackageForm) => registerPackage(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.allPackages })
  });
};

export const useUpdateEmployeeDetails = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EmployeeUpdateForm) =>
      updateEmployeeDetailsByAdmin(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.allEmployees });
    }
  });
};

export const useUpdatePackageByAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PackageUpdateForm }) =>
      updatePackageByAdmin(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.allPackages });
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.package(variables.id)
      });
    }
  });
};

// Simple hook factory for mutations to avoid excessive boilerplate in this file
const createMutationHook = <TVariables = void, TData = any>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  invalidateKeys: any[] = []
) => {
  return () => {
    const queryClient = useQueryClient();
    return useMutation<TData, Error, TVariables>({
      mutationFn,
      onSuccess: () => {
        invalidateKeys.forEach(key =>
          queryClient.invalidateQueries({ queryKey: key })
        );
      }
    });
  };
};

export const useHandlePasswordResetByAdmin = createMutationHook(
  handlePasswordResetByAdmin
);
export const useDeleteEmployeeByAdmin = createMutationHook(
  deleteEmployeeByAdmin,
  [adminQueryKeys.allEmployees]
);
export const useDeletePackageByAdmin = createMutationHook(
  ({ id, hardDelete }: { id: string; hardDelete: boolean }) =>
    deletePackageByAdmin(id, hardDelete),
  [adminQueryKeys.allPackages]
);
export const useDeleteTaskByAdmin = createMutationHook(
  ({ taskId, hardDelete }: { taskId: string; hardDelete: boolean }) =>
    deleteTaskByAdmin(taskId, hardDelete),
  [adminQueryKeys.allPackages]
);

export const useDeleteEmployeePackagesByAdmin = createMutationHook(
  ({ employeeId, packageId }: { employeeId: string; packageId: string }) =>
    deleteEmployeePackagesByAdmin(employeeId, packageId),
  [adminQueryKeys.allEmployees] // Simplified cache invalidation
);
export const useDeleteEmployeeTasksByAdmin = createMutationHook(
  ({
    employeeId,
    packageId,
    taskId
  }: {
    employeeId: string;
    packageId: string;
    taskId: string;
  }) => deleteEmployeeTasksByAdmin(employeeId, packageId, taskId)
);
export const useDeletePoolCandidatesByAdmin = createMutationHook(
  deletePoolCandidatesByAdmin
);
export const useDeletePoolCompanyByAdmin = createMutationHook(
  deletePoolCompanyByAdmin
);

export const useAddBloodGroupByAdmin = createMutationHook(
  addBloodGroupByAdmin,
  [adminQueryKeys.bloodGroups]
);
export const useAddEmploymentTypeByAdmin = createMutationHook(
  addEmploymentTypeByAdmin,
  [adminQueryKeys.employmentTypes]
);
export const useAddEmployeeRoleByAdmin = createMutationHook(
  addEmployeeRoleByAdmin,
  [adminQueryKeys.employeeRoles]
);
export const useAddPackagetoEmployeeByAdmin = createMutationHook(
  addPackagetoEmployeeByAdmin
);

export const useUpdateBloodGroupByAdmin = createMutationHook<{
  id: string;
  type: string;
}>(
  ({ id, type }: { id: string; type: string }) =>
    updateBloodGroupByAdmin(id, type),
  [adminQueryKeys.bloodGroups]
);
export const useUpdateEmployeeRoleByAdmin = createMutationHook<{
  id: string;
  designation: string;
}>(
  ({ id, designation }: { id: string; designation: string }) =>
    updateEmployeeRoleByAdmin(id, designation),
  [adminQueryKeys.employeeRoles]
);
export const useUpdateEmploymentTypeByAdmin = createMutationHook<{
  id: string;
  employmentType: string;
}>(
  ({ id, employmentType }: { id: string; employmentType: string }) =>
    updateEmploymentTypeByAdmin(id, employmentType),
  [adminQueryKeys.employmentTypes]
);

export const useAddTasksByAdmin = createMutationHook(
  ({ packageId, title }: { packageId: string; title: string }) =>
    addTasksByAdmin(packageId, title),
  [adminQueryKeys.allPackages]
);

export const useUpdateTaskByAdmin = createMutationHook(
  ({ id, title }: { id: string; title: string }) =>
    updateTaskByAdmin(id, title),
  [adminQueryKeys.allPackages]
);

export const useDeleteEmployeeRoleByAdmin = createMutationHook<string>(
  deleteEmployeeRoleByAdmin,
  [adminQueryKeys.employeeRoles]
);
export const useDeleteBloodGroupByAdmin = createMutationHook(
  deleteBloodGroupByAdmin,
  [adminQueryKeys.bloodGroups]
);
export const useDeleteEmploymentTypeByAdmin = createMutationHook(
  deleteEmploymentTypeByAdmin,
  [adminQueryKeys.employmentTypes]
);

export const useUpdateEmployeePackageByAdmin = createMutationHook(
  updateEmployeePackageByAdmin
);

export const usePreviewSalarySlip = createMutationHook(previewSalarySlip);
export const useGenerateSalarySlip = createMutationHook(generateSalarySlip);

export const useAddFeedbackAttributeByAdmin = createMutationHook(
  addFeedbackAttributeByAdmin,
  [adminQueryKeys.feedbackAttributes]
);
export const useUpdateFeedbackAttributeByAdmin = createMutationHook(
  ({ id, name }: { id: string; name: string }) =>
    updateFeedbackAttributeByAdmin(id, name),
  [adminQueryKeys.feedbackAttributes]
);
export const useDeleteFeedbackAttributeByAdmin = createMutationHook(
  deleteFeedbackAttributeByAdmin,
  [adminQueryKeys.feedbackAttributes]
);

export const useAddDepartmentByAdmin = createMutationHook(
  addDepartmentByAdmin,
  [adminQueryKeys.departments]
);

export const useUpdateDepartmentByAdmin = createMutationHook(
  ({ id, departmentName }: { id: string; departmentName: string }) =>
    updateDepartmentByAdmin(id, departmentName),
  [adminQueryKeys.departments]
);

export const useDeleteDepartmentByAdmin = createMutationHook(
  deleteDepartmentByAdmin,
  [adminQueryKeys.departments]
);
