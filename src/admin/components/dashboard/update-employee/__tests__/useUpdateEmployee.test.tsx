import { renderHook, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';
import type { ReactNode } from 'react';

let mockIsDirty = false;
const mockNavigate = jest.fn();
const mockReset = jest.fn();
const mockUpdateEmployee = jest.fn();
const mockDeleteEmployee = jest.fn();
const mockResetPassword = jest.fn();
const mockShowSuccessToast = jest.fn();
const mockToastError = jest.fn();
const mockGetAllEmploymentTypes = jest.fn();
const mockGetAllEmployeeRoleByAdmin = jest.fn();
const mockGetAllBloodGroupByAdmin = jest.fn();
const mockGetAllDepartmentsByAdmin = jest.fn();
const mockGetEmployeeDetailsByAdmin = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ employeeId: 'emp1' })
}));

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    handleSubmit: (cb: any) => (data?: any) => cb(data ?? {}),
    formState: {
      get isDirty() {
        return mockIsDirty;
      }
    },
    reset: mockReset,
    register: jest.fn(),
    control: {},
    watch: jest.fn()
  })
}));

jest.mock('react-toastify', () => ({
  toast: { error: (...args: any[]) => mockToastError(...args) }
}));

jest.mock('@hooks/mutations/useAdminMutations', () => ({
  useUpdateEmployeeDetails: () => ({ mutateAsync: mockUpdateEmployee }),
  useDeleteEmployeeByAdmin: () => ({ mutateAsync: mockDeleteEmployee }),
  useHandlePasswordResetByAdmin: () => ({ mutateAsync: mockResetPassword })
}));

jest.mock('@services/admin-services', () => ({
  getAllEmploymentTypes: (...args: any[]) => mockGetAllEmploymentTypes(...args),
  getAllEmployeeRoleByAdmin: (...args: any[]) =>
    mockGetAllEmployeeRoleByAdmin(...args),
  getAllBloodGroupByAdmin: (...args: any[]) =>
    mockGetAllBloodGroupByAdmin(...args),
  getAllDepartmentsByAdmin: (...args: any[]) =>
    mockGetAllDepartmentsByAdmin(...args),
  getEmployeeDetailsByAdmin: (...args: any[]) =>
    mockGetEmployeeDetailsByAdmin(...args)
}));

jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: mockShowSuccessToast,
    showErrorToast: jest.fn()
  })
}));

jest.mock('@utils/common/constants', () => ({
  organizationAdminUrls: () => '/srytal/admin'
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6'
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('@atoms/employee-atom', () => {
  const { atom } = jest.requireActual('recoil');
  return {
    employeeDetailsAtom: atom({
      key: 'test-hook-employee-details',
      default: null
    }),
    bloodGroupOptionsAtom: atom({ key: 'test-hook-blood-group', default: [] }),
    employmentTypesAtom: atom({
      key: 'test-hook-employment-type',
      default: []
    }),
    employeeRolesAtom: atom({ key: 'test-hook-employee-role', default: [] }),
    departmentsAtom: atom({ key: 'test-hook-department', default: [] })
  };
});

import { useUpdateEmployee } from '../useUpdateEmployee';

const wrapper = ({ children }: { children: ReactNode }) => (
  <RecoilRoot>{children}</RecoilRoot>
);

const mockEmployee = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@test.com',
  bloodGroup: { id: 'b1' },
  employmentType: { id: 'et1' },
  employeeRole: [{ id: 'r1' }],
  department: { id: 'd1' },
  dateOfJoining: '2024-01-01T00:00:00.000Z',
  dateOfBirth: '1990-05-15T00:00:00.000Z',
  presentAddress: 'Addr',
  permanentAddress: 'Perm',
  mobileNumber: '9876543210',
  uanNumber: 'UAN123'
};

const submitData = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@test.com',
  mobileNumber: '9876543210',
  employeeRole: ['r1', ''],
  uanNumber: 'UAN123',
  dateOfJoining: '2024-01-01T00:00:00.000Z',
  dateOfBirth: '1990-05-15T00:00:00.000Z'
};

const installOptions = () => {
  mockGetAllEmploymentTypes.mockResolvedValue([
    { _id: 'et1', employmentType: 'Permanent' }
  ]);
  mockGetAllEmployeeRoleByAdmin.mockResolvedValue([
    { _id: 'r1', designation: 'Engineer' }
  ]);
  mockGetAllBloodGroupByAdmin.mockResolvedValue([{ _id: 'b1', type: 'A+' }]);
  mockGetAllDepartmentsByAdmin.mockResolvedValue([
    { _id: 'd1', departmentName: 'Engineering' }
  ]);
};

describe('useUpdateEmployee', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsDirty = false;
    localStorage.clear();
    installOptions();
    mockGetEmployeeDetailsByAdmin.mockResolvedValue(mockEmployee);
    mockUpdateEmployee.mockResolvedValue({});
    mockDeleteEmployee.mockResolvedValue({});
    mockResetPassword.mockResolvedValue({});
  });

  it('loads the dropdown options from the option endpoints', async () => {
    const { result } = renderHook(() => useUpdateEmployee(), { wrapper });

    await waitFor(() =>
      expect(result.current.options.bloodGroupOptions).toHaveLength(1)
    );

    expect(result.current.options.bloodGroupOptions).toEqual([
      { value: 'b1', label: 'A+' }
    ]);
    expect(result.current.options.employmentTypeOptions).toEqual([
      { value: 'et1', label: 'Permanent' }
    ]);
    expect(result.current.options.employmentRolesOptions).toEqual([
      { value: 'r1', label: 'Engineer' }
    ]);
    expect(result.current.options.departmentOptions).toEqual([
      { value: 'd1', label: 'Engineering' }
    ]);
  });

  it('loads and formats the employee details into the form', async () => {
    const { result } = renderHook(() => useUpdateEmployee(), { wrapper });

    await waitFor(() =>
      expect(mockGetEmployeeDetailsByAdmin).toHaveBeenCalledWith('emp1')
    );
    await waitFor(() => expect(mockReset).toHaveBeenCalled());

    expect(mockReset).toHaveBeenCalledWith({
      ...mockEmployee,
      bloodGroup: 'b1',
      employmentType: 'et1',
      employeeRole: ['r1'],
      department: 'd1',
      dateOfJoining: '01-Jan-2024',
      dateOfBirth: '15-May-1990',
      presentAddress: 'Addr',
      permanentAddress: 'Perm',
      mobileNumber: '9876543210',
      uanNumber: 'UAN123'
    });
    expect(result.current.isLoading).toBe(false);
  });

  it('toasts an error when the employee details fail to load', async () => {
    mockGetEmployeeDetailsByAdmin.mockRejectedValue({
      response: { data: { message: 'Employee missing' } }
    });

    renderHook(() => useUpdateEmployee(), { wrapper });

    await waitFor(() =>
      expect(mockToastError).toHaveBeenCalledWith('Employee missing')
    );
  });

  it('submits formatted data and navigates back on success', async () => {
    const { result } = renderHook(() => useUpdateEmployee(), { wrapper });
    await waitFor(() => expect(mockReset).toHaveBeenCalled());

    await act(async () => {
      await result.current.onSubmit(submitData as any);
    });

    expect(mockUpdateEmployee).toHaveBeenCalledTimes(1);
    const payload = mockUpdateEmployee.mock.calls[0][0];
    expect(payload.employeeRole).toEqual(['r1']);
    expect(payload.mobileNumber).toBe(9876543210);
    expect(payload.dateOfJoining).toBe('01-Jan-2024');
    expect(payload.dateOfBirth).toBe('15-May-1990');
    expect(payload.uanNumber).toBe('UAN123');
    expect(localStorage.getItem('id')).toBe('emp1');
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Employee details updated successfully!'
    );
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('omits bank details when all bank fields are empty', async () => {
    const { result } = renderHook(() => useUpdateEmployee(), { wrapper });
    await waitFor(() => expect(mockReset).toHaveBeenCalled());

    await act(async () => {
      await result.current.onSubmit({
        ...submitData,
        bankDetailsInfo: {
          accountNumber: '',
          accountHolderName: '',
          bankName: '',
          ifscCode: ''
        }
      } as any);
    });

    const payload = mockUpdateEmployee.mock.calls[0][0];
    expect(payload).not.toHaveProperty('bankDetailsInfo');
  });

  it('records the submit error and toasts it when the update fails', async () => {
    mockUpdateEmployee.mockRejectedValue({
      response: { data: { message: 'Rejected update' } }
    });
    const { result } = renderHook(() => useUpdateEmployee(), { wrapper });
    await waitFor(() => expect(mockReset).toHaveBeenCalled());

    await act(async () => {
      await result.current.onSubmit(submitData as any);
    });

    expect(result.current.submitError).toBe('Rejected update');
    expect(mockToastError).toHaveBeenCalledWith('Rejected update');
    expect(result.current.isSubmitting).toBe(false);
  });

  it('deactivates the employee (soft delete) and navigates to the employees list', async () => {
    const { result } = renderHook(() => useUpdateEmployee(), { wrapper });
    await waitFor(() => expect(mockReset).toHaveBeenCalled());

    await act(async () => {
      await result.current.handleDeleteEmployee('deactivate');
    });

    expect(mockDeleteEmployee).toHaveBeenCalledWith({
      id: 'emp1',
      confirmDelete: false
    });
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Employee deactivated successfully!'
    );
    expect(mockNavigate).toHaveBeenCalledWith(
      '/srytal/admin/dashboard/employees'
    );
  });

  it('permanently deletes the employee (hard delete)', async () => {
    const { result } = renderHook(() => useUpdateEmployee(), { wrapper });
    await waitFor(() => expect(mockReset).toHaveBeenCalled());

    await act(async () => {
      await result.current.handleDeleteEmployee('permanent');
    });

    expect(mockDeleteEmployee).toHaveBeenCalledWith({
      id: 'emp1',
      confirmDelete: true
    });
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Employee permanently deleted!'
    );
    expect(mockNavigate).toHaveBeenCalledWith(
      '/srytal/admin/dashboard/employees'
    );
  });

  it('requests a password reset for the employee', async () => {
    const { result } = renderHook(() => useUpdateEmployee(), { wrapper });
    await waitFor(() => expect(mockReset).toHaveBeenCalled());

    await act(async () => {
      await result.current.handlePasswordReset();
    });

    expect(mockResetPassword).toHaveBeenCalledWith('emp1');
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Password reset successful!'
    );
  });

  it('navigates back without prompting when the form is clean', async () => {
    const confirmSpy = jest.spyOn(window, 'confirm');
    const { result } = renderHook(() => useUpdateEmployee(), { wrapper });
    await waitFor(() => expect(mockReset).toHaveBeenCalled());

    act(() => {
      result.current.handleBack();
    });

    expect(mockNavigate).toHaveBeenCalledWith(-1);
    expect(confirmSpy).not.toHaveBeenCalled();
    confirmSpy.mockRestore();
  });

  it('prompts before leaving when the form is dirty', async () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    mockIsDirty = true;
    const { result } = renderHook(() => useUpdateEmployee(), { wrapper });
    await waitFor(() => expect(mockReset).toHaveBeenCalled());

    act(() => {
      result.current.handleBack();
    });

    expect(confirmSpy).toHaveBeenCalledWith(
      'You have unsaved changes. Are you sure you want to leave?'
    );
    expect(mockNavigate).toHaveBeenCalledWith(-1);

    mockIsDirty = true;
    confirmSpy.mockReturnValue(false);
    act(() => {
      result.current.handleBack();
    });

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    confirmSpy.mockRestore();
  });
});
