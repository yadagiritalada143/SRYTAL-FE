import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useDisclosure } from '@mantine/hooks';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { EmployeeUpdateForm, employeeSchema } from '@forms/update-employee';
import {
  useUpdateEmployeeDetails,
  useDeleteEmployeeByAdmin,
  useHandlePasswordResetByAdmin
} from '@hooks/mutations/useAdminMutations';
import {
  getAllBloodGroupByAdmin,
  getEmployeeDetailsByAdmin,
  getAllEmploymentTypes,
  getAllEmployeeRoleByAdmin,
  getAllDepartmentsByAdmin
} from '@services/admin-services';
import { organizationAdminUrls } from '@utils/common/constants';
import { useCustomToast } from '@utils/common/toast';
import { useAppTheme } from '@hooks/use-app-theme';
import {
  employeeDetailsAtom,
  bloodGroupOptionsAtom,
  employmentTypesAtom,
  employeeRolesAtom,
  departmentsAtom
} from '@atoms/employee-atom';
import { normalizeDate } from './utils';

/**
 * All data + behavior for the Update Employee screen: dropdown options,
 * employee loading, the RHF form, and submit/delete/password-reset handlers.
 */
export const useUpdateEmployee = () => {
  const navigate = useNavigate();
  const { organizationConfig } = useAppTheme();
  const params = useParams();
  const employeeId = params.employeeId as string;

  const { mutateAsync: updateEmployeeMutation } = useUpdateEmployeeDetails();
  const { mutateAsync: deleteEmployeeMutation } = useDeleteEmployeeByAdmin();
  const { mutateAsync: resetPasswordMutation } =
    useHandlePasswordResetByAdmin();

  const [opened, { open, close }] = useDisclosure(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { showSuccessToast } = useCustomToast();

  const [bloodGroupOptions, setBloodGroupOptions] = useRecoilState(
    bloodGroupOptionsAtom
  );
  const [employmentRolesOptions, setEmploymentRolesOptions] =
    useRecoilState(employeeRolesAtom);
  const [employmentTypeOptions, setEmploymentTypes] =
    useRecoilState(employmentTypesAtom);
  const [departmentOptions, setDepartmentOptions] =
    useRecoilState(departmentsAtom);
  const setEmployeeDetails = useSetRecoilState(employeeDetailsAtom);

  const form = useForm<EmployeeUpdateForm>({
    resolver: zodResolver(employeeSchema),
    mode: 'onChange'
  });
  const {
    handleSubmit,
    formState: { isDirty },
    reset
  } = form;

  // Load dropdown options.
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [employmentTypes, employeeRoles, bloodGroups, departments] =
          await Promise.all([
            getAllEmploymentTypes(),
            getAllEmployeeRoleByAdmin(),
            getAllBloodGroupByAdmin(),
            getAllDepartmentsByAdmin()
          ]);

        setEmploymentTypes(
          employmentTypes.map((res: any) => ({
            value: res._id,
            label: res.employmentType
          }))
        );
        setEmploymentRolesOptions(
          employeeRoles.map((res: any) => ({
            value: res._id,
            label: res.designation
          }))
        );
        setBloodGroupOptions(
          bloodGroups.map((res: any) => ({ value: res._id, label: res.type }))
        );
        setDepartmentOptions(
          departments.map((res: any) => ({
            value: res._id,
            label: res.departmentName
          }))
        );
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to load options');
      }
    };

    loadOptions();
  }, [
    setEmploymentTypes,
    setEmploymentRolesOptions,
    setBloodGroupOptions,
    setDepartmentOptions
  ]);

  // Load the employee being edited.
  useEffect(() => {
    const loadEmployeeDetails = async () => {
      setIsLoading(true);
      try {
        const emp = await getEmployeeDetailsByAdmin(employeeId);
        const formatted = {
          ...emp,
          bloodGroup: emp.bloodGroup?.id,
          employmentType: emp.employmentType?.id,
          employeeRole: emp.employeeRole.map((role: any) => role.id),
          department: emp.department?.id,
          dateOfJoining: normalizeDate(emp.dateOfJoining),
          dateOfBirth: normalizeDate(emp.dateOfBirth),
          presentAddress: emp.presentAddress ?? '',
          permanentAddress: emp.permanentAddress ?? '',
          mobileNumber: emp.mobileNumber?.toString(),
          uanNumber: emp.uanNumber?.toString()
        };

        setEmployeeDetails(formatted);
        reset(formatted);
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || 'Failed to load employee details'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadEmployeeDetails();
  }, [employeeId, reset, setEmployeeDetails]);

  const onSubmit = async (data: EmployeeUpdateForm) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const updatedData = {
        ...data,
        employeeRole: data.employeeRole?.filter(role => role),
        mobileNumber: Number(data.mobileNumber),
        dateOfJoining: normalizeDate(data.dateOfJoining),
        dateOfBirth: normalizeDate(data.dateOfBirth),
        uanNumber: data.uanNumber ?? ''
      };

      if (
        !data.bankDetailsInfo?.accountNumber &&
        !data.bankDetailsInfo?.accountHolderName &&
        !data.bankDetailsInfo?.bankName &&
        !data.bankDetailsInfo?.ifscCode
      ) {
        delete updatedData.bankDetailsInfo;
      }

      await updateEmployeeMutation(updatedData);
      localStorage.setItem('id', employeeId);

      showSuccessToast('Employee details updated successfully!');
      navigate(-1);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to update employee';
      setSubmitError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEmployee = async () => {
    try {
      const payload = { id: employeeId, confirmDelete: agreeTerms };
      await deleteEmployeeMutation(payload);

      showSuccessToast('Employee deleted successfully!');
      navigate(
        `${organizationAdminUrls(organizationConfig.organization_name)}/dashboard/employees`
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete employee');
    }
  };

  const handlePasswordReset = async () => {
    try {
      await resetPasswordMutation(employeeId);
      showSuccessToast('Password reset successful!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to reset password');
    }
  };

  const handleBack = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );
      if (!confirmLeave) return;
    }
    navigate(-1);
  };

  return {
    employeeId,
    form,
    onSubmit: handleSubmit(onSubmit),
    isLoading,
    isSubmitting,
    submitError,
    setSubmitError,
    deleteModal: { opened, open, close },
    confirmDelete,
    setConfirmDelete,
    agreeTerms,
    setAgreeTerms,
    options: {
      bloodGroupOptions,
      employmentRolesOptions,
      employmentTypeOptions,
      departmentOptions
    },
    handleDeleteEmployee,
    handlePasswordReset,
    handleBack
  };
};
