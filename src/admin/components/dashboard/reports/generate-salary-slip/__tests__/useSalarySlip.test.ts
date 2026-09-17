import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';

let watchState: any = {};
const mockTrigger = jest.fn();
const mockSetValue = jest.fn();
const mockWatch = jest.fn();
const mockRegister = jest.fn(() => ({}));

let onSubmitRef: { current: any } = { current: null };

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: mockRegister,
    control: {},
    handleSubmit: (cb: any) => {
      onSubmitRef.current = cb;
      return (data: any) => cb(data);
    },
    watch: mockWatch,
    trigger: mockTrigger,
    setValue: mockSetValue,
    formState: { errors: {} }
  }),
  useFieldArray: () => ({
    fields: [],
    append: jest.fn(),
    remove: jest.fn()
  })
}));

jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: () => (values: any) => ({ values, errors: {} })
}));

const mockGetEmployees = jest.fn();
const mockGenerateSalarySlip = jest.fn();
const mockPreviewSalarySlip = jest.fn();
jest.mock('@services/admin-services', () => ({
  getAllEmployeeDetailsByAdmin: mockGetEmployees,
  generateSalarySlip: mockGenerateSalarySlip,
  previewSalarySlip: mockPreviewSalarySlip
}));

const mockToastError = jest.fn();
jest.mock('react-toastify', () => ({
  toast: { error: mockToastError }
}));

const mockShowSuccessToast = jest.fn();
jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({ showSuccessToast: mockShowSuccessToast })
}));

import { useSalarySlip } from '../useSalarySlip';

const employeesList = [
  {
    id: 'emp1',
    employeeId: 'SRY001',
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice@srytal.com',
    dateOfBirth: '1995-06-15',
    department: { departmentName: 'Engineering' },
    dateOfJoining: '2024-01-01',
    uanNumber: 'UAN1',
    bankDetailsInfo: {
      accountNumber: 'ACC123',
      bankName: 'HDFC',
      ifscCode: 'HDFC0001'
    },
    panCardNumber: 'PAN123',
    aadharNumber: 'AAD123',
    employeeRole: [{ designation: 'Developer' }]
  }
];

const today = new Date().toISOString().split('T')[0];

beforeEach(() => {
  jest.clearAllMocks();
  onSubmitRef = { current: null };
  watchState = {
    employeeId: '',
    selectedMonth: undefined,
    daysInMonth: 0,
    lopDays: 0,
    basicSalary: 0,
    hraPercentage: 0,
    specialAllowance: 0,
    conveyanceAllowance: 0,
    medicalAllowance: 0,
    otherAllowances: 0,
    additionalAllowances: [],
    payDate: today,
    transactionId: ''
  };
  mockWatch.mockImplementation((name: string) =>
    name ? watchState[name] : watchState
  );
  mockSetValue.mockImplementation((name: string, value: any) => {
    watchState[name] = value;
  });
  mockTrigger.mockResolvedValue(true);
  mockGetEmployees.mockResolvedValue(employeesList);
});

describe('useSalarySlip hook', () => {
  it('starts on step 0 with empty form state', () => {
    const { result } = renderHook(() => useSalarySlip());
    expect(result.current.activeStep).toBe(0);
    expect(result.current.employees).toEqual([]);
    expect(result.current.empDetails.empId).toBe('');
  });

  it('fetches employees on mount', async () => {
    const { result } = renderHook(() => useSalarySlip());
    await waitFor(() => expect(result.current.isLoadingEmployees).toBe(false));
    expect(mockGetEmployees).toHaveBeenCalled();
    expect(result.current.employees).toEqual(employeesList);
  });

  it('fills employee details when an employee is selected', async () => {
    const { result } = renderHook(() => useSalarySlip());
    await waitFor(() => expect(result.current.isLoadingEmployees).toBe(false));
    act(() => {
      result.current.handleEmployeeChange('SRY001');
    });
    expect(result.current.empDetails.empId).toBe('SRY001');
    expect(result.current.empDetails.empName).toBe('Alice Smith');
    expect(result.current.empDetails.email).toBe('alice@srytal.com');
    expect(result.current.empDetails.designation).toBe('Developer');
    expect(result.current.empDetails.department).toBe('Engineering');
    expect(result.current.empDetails.bankAccount).toBe('ACC123');
    expect(result.current.empDetails.ifsc).toBe('HDFC0001');
    expect(result.current.empDetails.bankName).toBe('HDFC');
    expect(result.current.empDetails.pan).toBe('PAN123');
  });

  it('clears employee details when selection is cleared', async () => {
    const { result } = renderHook(() => useSalarySlip());
    await waitFor(() => expect(result.current.isLoadingEmployees).toBe(false));
    act(() => {
      result.current.handleEmployeeChange('SRY001');
      result.current.handleEmployeeChange(null);
    });
    expect(result.current.empDetails.empId).toBe('');
    expect(result.current.empDetails.empName).toBe('');
  });

  it('recomputes days in month when the selected month changes', () => {
    const { result, rerender } = renderHook(() => useSalarySlip());
    act(() => {
      watchState.selectedMonth = new Date(2026, 5, 1);
    });
    rerender();
    expect(result.current.calculatedDaysInMonth).toBe(30);
    expect(watchState.daysInMonth).toBe(30);
  });

  it('zeroes days in month for an invalid month', () => {
    const { result, rerender } = renderHook(() => useSalarySlip());
    act(() => {
      watchState.selectedMonth = 'garbage';
    });
    rerender();
    expect(result.current.calculatedDaysInMonth).toBe(0);
  });

  it('advances a step when validation passes', async () => {
    const { result } = renderHook(() => useSalarySlip());
    await act(async () => {
      await result.current.nextStep();
    });
    expect(mockTrigger).toHaveBeenCalledWith(['employeeId', 'selectedMonth']);
    expect(result.current.activeStep).toBe(1);
  });

  it('does not advance when validation fails', async () => {
    mockTrigger.mockResolvedValueOnce(false);
    const { result } = renderHook(() => useSalarySlip());
    await act(async () => {
      await result.current.nextStep();
    });
    expect(result.current.activeStep).toBe(0);
  });

  it('goes back a step with prevStep', () => {
    const { result } = renderHook(() => useSalarySlip());
    act(() => {
      result.current.prevStep();
    });
    expect(result.current.activeStep).toBe(0);
  });

  it('previews the slip and advances to step 2', async () => {
    mockPreviewSalarySlip.mockResolvedValue({ data: { calculations: {} } });
    const { result } = renderHook(() => useSalarySlip());
    await waitFor(() => expect(result.current.isLoadingEmployees).toBe(false));
    act(() => {
      result.current.handleEmployeeChange('SRY001');
      watchState.basicSalary = 100000;
    });
    await act(async () => {
      await result.current.nextStep();
    });
    await act(async () => {
      await result.current.nextStep();
    });
    expect(mockPreviewSalarySlip).toHaveBeenCalled();
    expect(result.current.previewData).toEqual({ data: { calculations: {} } });
    expect(result.current.activeStep).toBe(2);
  });

  it('shows an error when previewing without an employee email', async () => {
    const { result } = renderHook(() => useSalarySlip());
    await waitFor(() => expect(result.current.isLoadingEmployees).toBe(false));
    await act(async () => {
      await result.current.nextStep();
    });
    await act(async () => {
      await result.current.nextStep();
    });
    expect(mockToastError).toHaveBeenCalledWith('Employee email is missing');
    expect(mockPreviewSalarySlip).not.toHaveBeenCalled();
    expect(result.current.activeStep).toBe(1);
  });

  it('generates and downloads the salary slip on submit', async () => {
    const createObjectURL = jest.fn(() => 'blob:mock');
    const revokeObjectURL = jest.fn();
    window.URL.createObjectURL = createObjectURL;
    window.URL.revokeObjectURL = revokeObjectURL;
    const anchorClick = jest.fn();
    HTMLAnchorElement.prototype.click = anchorClick;

    mockGenerateSalarySlip.mockResolvedValue(new Blob(['x']));
    const { result } = renderHook(() => useSalarySlip());
    await waitFor(() => expect(result.current.isLoadingEmployees).toBe(false));
    act(() => {
      result.current.handleEmployeeChange('SRY001');
    });

    const values = {
      employeeId: 'SRY001',
      selectedMonth: new Date(2026, 5, 1),
      daysInMonth: 30,
      lopDays: 1,
      basicSalary: 100000,
      hraPercentage: 10,
      specialAllowance: 5000,
      conveyanceAllowance: 2000,
      medicalAllowance: 1500,
      otherAllowances: 800,
      additionalAllowances: [],
      payDate: today,
      transactionId: 'BANK123456'
    };

    await act(async () => {
      await result.current.submit(values as any);
    });
    expect(mockGenerateSalarySlip).toHaveBeenCalled();
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Salary slip generated successfully!'
    );
    expect(anchorClick).toHaveBeenCalled();
    expect(createObjectURL).toHaveBeenCalled();
    expect(result.current.activeStep).toBe(3);
  });

  it('blocks submit when LOP days exceed total days', async () => {
    mockPreviewSalarySlip.mockResolvedValue({ data: {} });
    const { result } = renderHook(() => useSalarySlip());
    await waitFor(() => expect(result.current.isLoadingEmployees).toBe(false));
    act(() => {
      result.current.handleEmployeeChange('SRY001');
    });
    const values = {
      employeeId: 'SRY001',
      selectedMonth: new Date(2026, 5, 1),
      daysInMonth: 30,
      lopDays: 40,
      basicSalary: 100000,
      hraPercentage: 10,
      specialAllowance: 0,
      conveyanceAllowance: 0,
      medicalAllowance: 0,
      otherAllowances: 0,
      additionalAllowances: [],
      payDate: today,
      transactionId: 'BANK123456'
    };
    await act(async () => {
      await result.current.submit(values as any);
    });
    expect(mockToastError).toHaveBeenCalledWith(
      'LOP days cannot exceed total days'
    );
    expect(mockGenerateSalarySlip).not.toHaveBeenCalled();
  });

  it('blocks submit when employee email is missing', async () => {
    const { result } = renderHook(() => useSalarySlip());
    await waitFor(() => {
      expect(result.current.isLoadingEmployees).toBe(false);
    });
    const values = {
      employeeId: 'SRY001',
      selectedMonth: new Date(2026, 5, 1),
      daysInMonth: 30,
      lopDays: 0,
      basicSalary: 100000,
      hraPercentage: 10,
      specialAllowance: 0,
      conveyanceAllowance: 0,
      medicalAllowance: 0,
      otherAllowances: 0,
      additionalAllowances: [],
      payDate: today,
      transactionId: 'BANK123456'
    };
    await act(async () => {
      await result.current.submit(values as any);
    });
    expect(mockToastError).toHaveBeenCalledWith('Employee email is missing');
    expect(mockGenerateSalarySlip).not.toHaveBeenCalled();
  });
});
