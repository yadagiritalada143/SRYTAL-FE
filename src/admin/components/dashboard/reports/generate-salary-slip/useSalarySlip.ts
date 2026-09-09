import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import {
  getAllEmployeeDetailsByAdmin,
  generateSalarySlip,
  previewSalarySlip
} from '@services/admin-services';
import {
  generateSalarySlipSchema,
  GenerateSalarySlipForm
} from '@forms/generate-salary-slip';
import { PreviewSalarySlipResponse } from '@interfaces/salary-slip';
import { useCustomToast } from '@utils/common/toast';
import { Employee } from './types';
import { EMPTY_EMP_DETAILS, MONTH_NAMES } from './constants';
import { formatDate } from './utils';

/**
 * Holds all state, form wiring and handlers for the multi-step
 * "Generate Salary Slip" flow. The returned object is consumed by the step
 * components, keeping each step purely presentational.
 */
export const useSalarySlip = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [calculatedDaysInMonth, setCalculatedDaysInMonth] = useState<number>(0);
  const [generatedPdf, setGeneratedPdf] = useState<Blob | null>(null);
  const [empDetails, setEmpDetails] = useState({ ...EMPTY_EMP_DETAILS });
  const [previewData, setPreviewData] =
    useState<PreviewSalarySlipResponse | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const { showSuccessToast } = useCustomToast();

  const {
    register,
    control,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors }
  } = useForm<GenerateSalarySlipForm>({
    resolver: zodResolver(generateSalarySlipSchema),
    defaultValues: {
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
      payDate: new Date().toISOString().split('T')[0],
      transactionId: ''
    }
  });

  const selectedMonth = watch('selectedMonth');
  const daysInMonth = watch('daysInMonth');
  const lopDays = watch('lopDays');
  const basic = watch('basicSalary') || 0;
  const hra = watch('hraPercentage') || 0;
  const special = watch('specialAllowance') || 0;
  const conveyance = watch('conveyanceAllowance') || 0;
  const medical = watch('medicalAllowance') || 0;
  const other = watch('otherAllowances') || 0;
  const payDate = watch('payDate');
  const transactionId = watch('transactionId');
  const allValues = watch();

  // Invalidate any previously generated PDF whenever inputs change.
  useEffect(() => {
    if (generatedPdf) {
      setGeneratedPdf(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(allValues)]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'additionalAllowances'
  });

  const additionalAllowances = watch('additionalAllowances') || [];

  // Fetch the employee list once.
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoadingEmployees(true);
        const list = await getAllEmployeeDetailsByAdmin();
        setEmployees(list);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || 'Failed to load employees');
      } finally {
        setIsLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, []);

  // Auto-fill employee details when an employee is selected.
  const handleEmployeeChange = (selectedEmpId: string | null) => {
    setValue('employeeId', selectedEmpId || '');
    if (!selectedEmpId) {
      setEmpDetails({ ...EMPTY_EMP_DETAILS });
      return;
    }

    const selectedEmployee = employees.find(
      emp => emp.employeeId === selectedEmpId
    );
    if (!selectedEmployee) return;

    setEmpDetails({
      _id: selectedEmployee.id,
      empId: selectedEmployee.employeeId,
      empName:
        selectedEmployee.firstName + ' ' + (selectedEmployee.lastName || ''),
      designation: selectedEmployee.employeeRole?.[0]?.designation || '',
      department: selectedEmployee.department?.departmentName || '',
      dateOfJoining: selectedEmployee.dateOfJoining || '',
      uanNumber: selectedEmployee.uanNumber || '',
      email: selectedEmployee.email ?? '',
      dob: formatDate(selectedEmployee.dateOfBirth || ''),
      bankAccount: selectedEmployee.bankDetailsInfo?.accountNumber || '',
      ifsc: selectedEmployee.bankDetailsInfo?.ifscCode || '',
      bankName: selectedEmployee.bankDetailsInfo?.bankName || '',
      pan: selectedEmployee.panCardNumber || '',
      aadharNumber: selectedEmployee.aadharNumber || ''
    });
  };

  // Recompute total days when the selected month changes.
  useEffect(() => {
    const monthDate =
      selectedMonth instanceof Date
        ? selectedMonth
        : selectedMonth
          ? new Date(selectedMonth)
          : null;

    if (!monthDate || isNaN(monthDate.getTime())) {
      setCalculatedDaysInMonth(0);
      setValue('daysInMonth', 0);
      return;
    }

    const totalDays = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth() + 1,
      0
    ).getDate();

    setCalculatedDaysInMonth(totalDays);
    setValue('daysInMonth', totalDays);
  }, [selectedMonth, setValue]);

  const buildPayload = (values: GenerateSalarySlipForm) => {
    const d =
      values.selectedMonth instanceof Date
        ? values.selectedMonth
        : new Date(values.selectedMonth);
    const payPeriod = `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;

    return {
      employeeId: values.employeeId,
      employeeName: empDetails.empName,
      employeeEmail: empDetails.email,
      designation: empDetails.designation,
      department: empDetails.department,
      dateOfJoining: empDetails.dateOfJoining,
      payPeriod,
      bankName: empDetails.bankName,
      IFSCCODE: empDetails.ifsc,
      bankAccountNumber: empDetails.bankAccount,
      transactionType: 'NEFT',
      panNumber: empDetails.pan,
      uanNumber: empDetails.uanNumber || 'N/A',
      totalWorkingDays: values.daysInMonth,
      daysWorked: values.daysInMonth - (values.lopDays || 0),
      lossOfPayDays: values.lopDays,
      basicSalary: values.basicSalary,
      hraPercentage: values.hraPercentage,
      specialAllowance: values.specialAllowance,
      conveyanceAllowance: values.conveyanceAllowance,
      medicalAllowance: values.medicalAllowance,
      otherAllowances: values.otherAllowances,
      additionalAllowances: values.additionalAllowances,
      pfPercentage: 0,
      professionalTax: 0,
      incomeTax: 0,
      otherDeductions: 0
    };
  };

  const nextStep = async () => {
    if (activeStep === 0) {
      const isValid = await trigger(['employeeId', 'selectedMonth']);
      if (!isValid) return;
      setActiveStep(current => (current < 2 ? current + 1 : current));
    } else if (activeStep === 1) {
      const isValid = await trigger([
        'basicSalary',
        'payDate',
        'transactionId'
      ]);
      if (!isValid) return;
      if (!empDetails.email) {
        toast.error('Employee email is missing');
        return;
      }
      try {
        setIsPreviewLoading(true);
        const values = watch();
        const payload = {
          ...buildPayload(values),
          payDate: values.payDate
            ? new Date(values.payDate).toISOString().split('T')[0]
            : '',
          transactionId: values.transactionId || undefined
        };

        const response = await previewSalarySlip(payload);
        setPreviewData(response);
        setActiveStep(2);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            'Failed to fetch salary slip preview'
        );
      } finally {
        setIsPreviewLoading(false);
      }
    }
  };

  const prevStep = () =>
    setActiveStep(current => (current > 0 ? current - 1 : current));

  const downloadPdf = (pdf: Blob) => {
    const url = window.URL.createObjectURL(pdf);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SalarySlip_${empDetails.empId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const onSubmit = async (data: GenerateSalarySlipForm) => {
    try {
      if (!empDetails.email) {
        toast.error('Employee email is missing');
        return;
      }
      if (generatedPdf) {
        downloadPdf(generatedPdf);
        return;
      }

      setIsGenerating(true);

      if (data.lopDays > data.daysInMonth) {
        toast.error('LOP days cannot exceed total days');
        return;
      }

      const payload = {
        _id: empDetails._id,
        ...buildPayload(data),
        payDate: data.payDate,
        transactionId: data.transactionId
      };

      const response = await generateSalarySlip(payload);
      if (response instanceof Blob) {
        setGeneratedPdf(response);
        downloadPdf(response);
        showSuccessToast('Salary slip generated successfully!');
        setActiveStep(3);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to generate salary slip'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    activeStep,
    employees,
    isLoadingEmployees,
    isGenerating,
    isPreviewLoading,
    calculatedDaysInMonth,
    empDetails,
    previewData,
    // form
    register,
    control,
    errors,
    setValue,
    fields,
    append,
    remove,
    submit: handleSubmit(onSubmit),
    // watched values
    selectedMonth,
    daysInMonth,
    lopDays,
    basic,
    hra,
    special,
    conveyance,
    medical,
    other,
    payDate,
    transactionId,
    additionalAllowances,
    // handlers
    handleEmployeeChange,
    nextStep,
    prevStep
  };
};

export type SalarySlipVM = ReturnType<typeof useSalarySlip>;
