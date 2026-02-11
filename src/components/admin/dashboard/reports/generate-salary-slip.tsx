import { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Card,
  Title,
  Stepper,
  Button,
  Group,
  TextInput,
  Select,
  Stack,
  Text,
  Alert,
  Grid,
  Divider,
  rgba
} from '@mantine/core';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MonthPickerInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { toast } from 'react-toastify';
import { IconAlertCircle } from '@tabler/icons-react';
import {
  getAllEmployeeDetailsByAdmin,
  generateSalarySlip
} from '../../../../services/admin-services';
import {
  generateSalarySlipSchema,
  GenerateSalarySlipForm
} from '../../../../forms/generate-salary-slip';
import { previewSalarySlip } from '../../../../services/admin-services';
import { PreviewSalarySlipResponse } from '../../../../interfaces/salary-slip';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { themeAtom } from '../../../../atoms/theme';
import { useMediaQuery } from '@mantine/hooks';
import { useCustomToast } from '../../../../utils/common/toast';

type ReadOnlyFieldProps = {
  label: string;
  value?: string | number | null;
  color?: string;
  error?: string;
};

const ReadOnlyField = ({ label, value, color, error }: ReadOnlyFieldProps) => {
  return (
    <TextInput
      label={label}
      value={value ?? ''}
      disabled
      error={error}
      styles={{
        input: {
          backgroundColor: 'transparent',
          border: 'none',
          paddingLeft: '10px',
          color: color
        }
      }}
    />
  );
};

// Helper function to format ISO date to readable format
const formatDate = (isoDate: string): string => {
  if (!isoDate) return '';
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch {
    return isoDate;
  }
};

type Employee = {
  employeeId: string;
  firstName: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  panNumber?: string;
  bankDetailsInfo?: {
    accountNumber?: string;
    ifscCode?: string;
  };
  employeeRole?: { designation?: string }[];
};

const steps = [
  {
    label: 'Fill Details',
    description: 'Employee Info',
    enabled: true
  },
  {
    label: 'Calculation',
    description: 'Salary Breakdown',
    enabled: true
  },
  {
    label: 'Generate Salary Slip',
    description: 'Review & Generate',
    enabled: true
  }
];

const GenerateSalarySlipReport = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [calculatedDaysInMonth, setCalculatedDaysInMonth] = useState<number>(0);
  const isDarkTheme = useRecoilValue(themeAtom);
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [generatedPdf, setGeneratedPdf] = useState<Blob | null>(null);

  const dangerBorderColor = isDarkTheme
    ? currentThemeConfig.dangerColor
    : currentThemeConfig.lightDangerColor;

  const [empDetails, setEmpDetails] = useState({
    empId: '',
    empName: '',
    designation: '',
    department: 'Engineering',
    doj: '',
    email: '',
    dob: '',
    bankAccount: '',
    ifsc: '',
    bankName: 'HDFC Bank',
    pan: '',
    uan: 'N/A'
  });

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
    formState: { errors, isSubmitting }
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
      additionalAllowances: []
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

  // Watch all form values to detect changes
  const allValues = watch();

  useEffect(() => {
    if (generatedPdf) {
      setGeneratedPdf(null);
    }
  }, [JSON.stringify(allValues)]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'additionalAllowances'
  });

  const additionalAllowances = watch('additionalAllowances') || [];

  const additionalTotal = additionalAllowances.reduce(
    (sum: number, item: any) => {
      if (item.type === 'deduct') {
        return sum - (item.amount || 0);
      }
      return sum + (item.amount || 0);
    },
    0
  );

  const hraAmount = (basic * hra) / 100;

  const grossSalary =
    basic +
    hraAmount +
    special +
    conveyance +
    medical +
    other +
    additionalTotal;

  const perDaySalary =
    daysInMonth && daysInMonth > 0 ? grossSalary / daysInMonth : 0;

  const lopDeduction = lopDays && lopDays > 0 ? perDaySalary * lopDays : 0;

  // Fetch Employees List
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoadingEmployees(true);
        const list = await getAllEmployeeDetailsByAdmin();
        setEmployees(list);
      } catch (err: any) {
        const msg = err?.response?.data?.message || 'Failed to load employees';
        toast.error(msg);
      } finally {
        setIsLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, []);

  // Employee Selection Auto Fill
  const handleEmployeeChange = (selectedEmpId: string | null) => {
    setValue('employeeId', selectedEmpId || '');
    if (!selectedEmpId) {
      setEmpDetails({
        empId: '',
        empName: '',
        designation: '',
        department: 'Engineering',
        doj: '',
        email: '',
        dob: '',
        bankAccount: '',
        ifsc: '',
        bankName: 'HDFC Bank',
        pan: '',
        uan: 'N/A'
      });
      return;
    }

    const selectedEmployee = employees.find(
      emp => emp.employeeId === selectedEmpId
    );

    if (!selectedEmployee) return;

    setEmpDetails({
      empId: selectedEmployee.employeeId,
      empName:
        selectedEmployee.firstName + ' ' + (selectedEmployee.lastName || ''),
      designation: selectedEmployee.employeeRole?.[0]?.designation || '',
      department: 'Engineering', // TODO: Fetch from employee details if available
      doj: '2024-01-15', // TODO: Fetch from employee details if available
      email: selectedEmployee.email || '',
      dob: formatDate(selectedEmployee.dateOfBirth || ''),
      bankAccount: selectedEmployee.bankDetailsInfo?.accountNumber || '',
      ifsc: selectedEmployee.bankDetailsInfo?.ifscCode || '',
      bankName: 'HDFC Bank',
      pan: selectedEmployee.panNumber || '',
      uan: 'N/A'
    });
  };

  useEffect(() => {
    const monthDate = normalMonth(selectedMonth);

    if (!monthDate) {
      setCalculatedDaysInMonth(0);
      setValue('daysInMonth', 0);
      return;
    }

    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();

    setCalculatedDaysInMonth(totalDays);
    setValue('daysInMonth', totalDays);
  }, [selectedMonth, setValue]);

  const nextStep = async () => {
    if (activeStep === 0) {
      const isValid = await trigger(['employeeId', 'selectedMonth']);
      if (!isValid) return;
      setActiveStep(current => (current < 2 ? current + 1 : current));
    } else if (activeStep === 1) {
      try {
        setIsPreviewLoading(true);
        const values = watch();

        const monthNames = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ];
        const d =
          values.selectedMonth instanceof Date
            ? values.selectedMonth
            : new Date(values.selectedMonth);
        const payPeriod = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;

        const payload = {
          employeeId: values.employeeId,
          employeeName: empDetails.empName,
          designation: empDetails.designation,
          department: empDetails.department,
          dateOfJoining: empDetails.doj,
          payPeriod: payPeriod,
          payDate: new Date().toISOString().split('T')[0],
          bankName: empDetails.bankName,
          IFSCCODE: empDetails.ifsc,
          bankAccountNumber: empDetails.bankAccount,
          transactionType: 'NEFT',
          transactionId: 'TBD',
          panNumber: empDetails.pan,
          uanNumber: empDetails.uan,

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

        const response = await previewSalarySlip(payload);
        setPreviewData(response);
        setActiveStep(current => (current < 2 ? current + 1 : current));
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            'Failed to fetch salary slip preview'
        );
      } finally {
        setIsPreviewLoading(false);
      }
    } else {
      setActiveStep(current => (current < 2 ? current + 1 : current));
    }
  };

  const prevStep = () =>
    setActiveStep(current => (current > 0 ? current - 1 : current));

  const onSubmit = async (data: GenerateSalarySlipForm) => {
    try {
      if (generatedPdf) {
        const url = window.URL.createObjectURL(generatedPdf);
        const link = document.createElement('a');
        link.href = url;
        link.download = `SalarySlip_${empDetails.empId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        return;
      }

      setIsGenerating(true);

      if (data.lopDays > data.daysInMonth) {
        toast.error('LOP days cannot exceed total days');
        return;
      }
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
      const d =
        data.selectedMonth instanceof Date
          ? data.selectedMonth
          : new Date(data.selectedMonth);
      const payPeriod = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;

      const payload = {
        employeeId: data.employeeId,
        employeeName: empDetails.empName,
        designation: empDetails.designation,
        department: empDetails.department,
        dateOfJoining: empDetails.doj,
        payPeriod: payPeriod,
        payDate: new Date().toISOString().split('T')[0],
        bankName: empDetails.bankName,
        IFSCCODE: empDetails.ifsc,
        bankAccountNumber: empDetails.bankAccount,
        transactionType: 'NEFT',
        transactionId: 'TBD',
        panNumber: empDetails.pan,
        uanNumber: empDetails.uan,

        totalWorkingDays: data.daysInMonth,
        daysWorked: data.daysInMonth - (data.lopDays || 0),
        lossOfPayDays: data.lopDays,

        basicSalary: data.basicSalary,
        hraPercentage: data.hraPercentage,
        specialAllowance: data.specialAllowance,
        conveyanceAllowance: data.conveyanceAllowance,
        medicalAllowance: data.medicalAllowance,
        otherAllowances: data.otherAllowances,
        additionalAllowances: data.additionalAllowances,
        pfPercentage: 0,
        professionalTax: 0,
        incomeTax: 0,
        otherDeductions: 0
      };

      const response = await generateSalarySlip(payload);
      if (response instanceof Blob) {
        setGeneratedPdf(response);

        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = `SalarySlip_${empDetails.empId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        showSuccessToast('Salary slip generated successfully!');
      } else {
        throw new Error('Invalid PDF data');
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

  const normalMonth = (value: unknown): Date | null => {
    if (value instanceof Date && !isNaN(value.getTime())) return value;
    if (typeof value === 'string') {
      const d = new Date(value);
      return isNaN(d.getTime()) ? null : d;
    }
    return null;
  };

  return (
    <Container size="lg" py="xl" px="sm">
      <Card
        shadow="sm"
        radius="md"
        p={isMobile ? 'md' : 'xl'}
        withBorder
        style={{
          backgroundColor: currentThemeConfig.backgroundColor,
          color: currentThemeConfig.color
        }}
      >
        <Title order={2} ta="center" mb="xl">
          Generate Salary Slip
        </Title>

        <Stepper
          active={activeStep}
          size="sm"
          styles={{
            stepLabel: {
              fontSize: '12px',
              color: currentThemeConfig.color
            },
            stepDescription: {
              fontSize: '11px',
              color: currentThemeConfig.color,
              opacity: 0.8
            },
            separator: {
              height: 2,
              backgroundColor: currentThemeConfig.button.color
            }
          }}
        >
          {steps.map((step, index) => (
            <Stepper.Step
              key={index}
              label={step.label}
              description={step.description}
              allowStepSelect={step.enabled}
            >
              {/* ================= STEP 1 ================= */}
              {index === 0 && (
                <Stack mt="lg" gap="md">
                  <Card
                    shadow="sm"
                    radius="md"
                    p={isMobile ? 'md' : 'lg'}
                    withBorder
                    style={{
                      backgroundColor: currentThemeConfig.headerBackgroundColor,
                      color: currentThemeConfig.color
                    }}
                  >
                    <Title order={5} mb="md">
                      Employee Information
                    </Title>
                    <Grid mb="md">
                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <Select
                          label="Employee ID"
                          placeholder={
                            isLoadingEmployees
                              ? 'Loading...'
                              : 'Select employee'
                          }
                          searchable
                          required
                          data={employees
                            .filter(emp => emp.employeeId)
                            .map(emp => ({
                              value: emp.employeeId,
                              label: `${emp.employeeId} - ${emp.firstName} ${emp.lastName}`
                            }))}
                          value={empDetails.empId}
                          onChange={value => handleEmployeeChange(value)}
                          error={errors.employeeId?.message}
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <ReadOnlyField
                          label="Employee Name"
                          value={empDetails.empName}
                          color={currentThemeConfig.color}
                        />
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <ReadOnlyField
                          label="Email"
                          value={empDetails.email}
                          color={currentThemeConfig.color}
                        />
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <ReadOnlyField
                          label="Designation"
                          value={empDetails.designation}
                          color={currentThemeConfig.color}
                        />
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <ReadOnlyField
                          label="Date of Birth"
                          value={empDetails.dob}
                          color={currentThemeConfig.color}
                        />
                      </Grid.Col>
                    </Grid>

                    <Divider mb="md" />

                    <Title order={5} mb="md">
                      Bank Details
                    </Title>

                    <Grid>
                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <ReadOnlyField
                          label="Bank Account Number"
                          value={empDetails.bankAccount}
                          color={currentThemeConfig.color}
                        />
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <ReadOnlyField
                          label="IFSC Code"
                          value={empDetails.ifsc}
                          color={currentThemeConfig.color}
                        />
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <ReadOnlyField
                          label="PAN Number"
                          value={empDetails.pan}
                          color={currentThemeConfig.color}
                        />
                      </Grid.Col>
                    </Grid>
                  </Card>
                  <Card
                    shadow="sm"
                    radius="md"
                    p={isMobile ? 'md' : 'lg'}
                    withBorder
                    style={{
                      backgroundColor: currentThemeConfig.headerBackgroundColor,
                      color: currentThemeConfig.color
                    }}
                  >
                    <Title order={5} mb="md">
                      Salary Period
                    </Title>

                    <Grid align="flex-start">
                      <Grid.Col span={4}>
                        <Controller
                          name="selectedMonth"
                          control={control}
                          render={({ field }) => (
                            <MonthPickerInput
                              styles={{
                                input: {
                                  backgroundColor:
                                    currentThemeConfig.headerBackgroundColor,
                                  color: currentThemeConfig.color,
                                  borderColor: currentThemeConfig.borderColor
                                },
                                label: {
                                  color: currentThemeConfig.color
                                }
                              }}
                              value={
                                field.value
                                  ? field.value instanceof Date
                                    ? field.value
                                    : new Date(field.value)
                                  : null
                              }
                              onChange={field.onChange}
                              label="Select Month"
                              required
                              placeholder="Pick month"
                              error={errors.selectedMonth?.message}
                            />
                          )}
                        />
                      </Grid.Col>

                      <Grid.Col span={4}>
                        <ReadOnlyField
                          label="Total Days"
                          value={
                            calculatedDaysInMonth > 0
                              ? String(calculatedDaysInMonth)
                              : ''
                          }
                          color={currentThemeConfig.color}
                          error={errors.daysInMonth?.message}
                        />
                      </Grid.Col>

                      <Grid.Col span={4}>
                        <TextInput
                          label="LOP Days"
                          {...register('lopDays', { valueAsNumber: true })}
                          type="number"
                          placeholder="0"
                          error={errors.lopDays?.message}
                        />
                      </Grid.Col>
                    </Grid>

                    <Group justify="flex-end" mt="xl">
                      <Button onClick={nextStep} radius="lg">
                        Next
                      </Button>
                    </Group>
                  </Card>
                </Stack>
              )}

              {/* ================= STEP 2 ================= */}
              {index === 1 && (
                <Stack mt="lg" gap="md">
                  <Card
                    shadow="sm"
                    radius="md"
                    p={isMobile ? 'md' : 'lg'}
                    withBorder
                    style={{
                      backgroundColor: currentThemeConfig.headerBackgroundColor,
                      color: currentThemeConfig.color
                    }}
                  >
                    <Title order={5} mb="md">
                      Earnings
                    </Title>

                    <Grid>
                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <TextInput
                          label="Basic Salary"
                          type="number"
                          onKeyDown={e => {
                            if (['e', 'E', '+', '-'].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          {...register('basicSalary', {
                            valueAsNumber: true
                          })}
                        />
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <TextInput
                          label="HRA (%)"
                          type="number"
                          onKeyDown={e => {
                            if (['e', 'E', '+', '-'].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          {...register('hraPercentage', {
                            valueAsNumber: true
                          })}
                        />
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <TextInput
                          label="Special Allowance"
                          type="number"
                          onKeyDown={e => {
                            if (['e', 'E', '+', '-'].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          {...register('specialAllowance', {
                            valueAsNumber: true
                          })}
                        />
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <TextInput
                          label="Conveyance Allowance"
                          type="number"
                          onKeyDown={e => {
                            if (['e', 'E', '+', '-'].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          {...register('conveyanceAllowance', {
                            valueAsNumber: true
                          })}
                        />
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <TextInput
                          label="Medical Allowance"
                          type="number"
                          onKeyDown={e => {
                            if (['e', 'E', '+', '-'].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          {...register('medicalAllowance', {
                            valueAsNumber: true
                          })}
                        />
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <TextInput
                          label="Other Allowances"
                          type="number"
                          onKeyDown={e => {
                            if (['e', 'E', '+', '-'].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          {...register('otherAllowances', {
                            valueAsNumber: true
                          })}
                        />
                      </Grid.Col>
                    </Grid>
                  </Card>

                  <Card
                    shadow="sm"
                    radius="md"
                    p={isMobile ? 'md' : 'lg'}
                    withBorder
                    style={{
                      backgroundColor: currentThemeConfig.headerBackgroundColor,
                      color: currentThemeConfig.color
                    }}
                  >
                    <Group justify="space-between" mb="md">
                      <Title order={6}>Additional Allowances</Title>

                      <Button
                        type="button"
                        variant="light"
                        radius="lg"
                        onClick={() =>
                          append({ label: '', amount: 0, type: 'add' })
                        }
                      >
                        + Add More
                      </Button>
                    </Group>

                    <Stack>
                      {fields.map((field, index) => (
                        <Group key={field.id} grow>
                          <Grid grow>
                            <Grid.Col span={4}>
                              <TextInput
                                placeholder="Allowance Name"
                                {...register(
                                  `additionalAllowances.${index}.label`
                                )}
                              />
                            </Grid.Col>
                            <Grid.Col span={3}>
                              <TextInput
                                type="number"
                                placeholder="Amount"
                                onKeyDown={e => {
                                  if (['e', 'E', '+', '-'].includes(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                                {...register(
                                  `additionalAllowances.${index}.amount`,
                                  {
                                    valueAsNumber: true
                                  }
                                )}
                              />
                            </Grid.Col>
                            <Grid.Col span={3}>
                              <Select
                                data={[
                                  { value: 'add', label: 'Add' },
                                  { value: 'deduct', label: 'Deduct' }
                                ]}
                                {...register(
                                  `additionalAllowances.${index}.type`
                                )}
                                defaultValue="add"
                                onChange={value =>
                                  setValue(
                                    `additionalAllowances.${index}.type`,
                                    value as 'add' | 'deduct'
                                  )
                                }
                              />
                            </Grid.Col>
                            <Grid.Col span={2}>
                              <Button
                                type="button"
                                color="red"
                                radius="md"
                                variant="subtle"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </Button>
                            </Grid.Col>
                          </Grid>
                        </Group>
                      ))}
                    </Stack>
                  </Card>

                  <Group justify="space-between" mt="xl">
                    <Button variant="default" radius="lg" onClick={prevStep}>
                      Back
                    </Button>

                    <Button
                      loading={isPreviewLoading}
                      onClick={nextStep}
                      radius="lg"
                    >
                      Preview
                    </Button>
                  </Group>
                </Stack>
              )}

              {/* ================= STEP 3 ================= */}
              {index === 2 && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack mt="lg" gap="xl">
                    <Group justify="space-between" align="flex-end">
                      <div>
                        <Title order={3}>Salary Slip Summary</Title>
                      </div>
                      <Alert
                        icon={<IconAlertCircle size={16} />}
                        title="Review Details"
                        color={isDarkTheme ? 'cyan' : 'blue'}
                        py={5}
                        variant="light"
                      ></Alert>
                    </Group>

                    <Grid gutter="md">
                      <Grid.Col span={{ base: 4 }}>
                        <Card
                          withBorder
                          radius="md"
                          p="sm"
                          ta="center"
                          style={{
                            borderLeft: `4px solid ${currentThemeConfig.accentColor}`
                          }}
                        >
                          <Text
                            size="xs"
                            fw={700}
                            tt="uppercase"
                            c={currentThemeConfig.accentColor}
                          >
                            Total Days
                          </Text>
                          <Text
                            size="xl"
                            fw={800}
                            c={currentThemeConfig.accentColor}
                          >
                            {daysInMonth}
                          </Text>
                        </Card>
                      </Grid.Col>
                      <Grid.Col span={{ base: 4 }}>
                        <Card
                          withBorder
                          radius="md"
                          p="sm"
                          ta="center"
                          style={{
                            borderLeft: `4px solid ${dangerBorderColor}`
                          }}
                        >
                          <Text
                            size="xs"
                            fw={700}
                            tt="uppercase"
                            c={currentThemeConfig.lightDangerColor}
                          >
                            LOP Days
                          </Text>
                          <Text
                            size="xl"
                            fw={800}
                            c={currentThemeConfig.lightDangerColor}
                          >
                            {lopDays || 0}
                          </Text>
                        </Card>
                      </Grid.Col>
                      <Grid.Col span={{ base: 4 }}>
                        <Card
                          withBorder
                          radius="md"
                          p="sm"
                          ta="center"
                          style={{
                            borderLeft: `4px solid ${currentThemeConfig.successColor}`
                          }}
                        >
                          <Text
                            size="xs"
                            fw={700}
                            tt="uppercase"
                            c={currentThemeConfig.successColor}
                          >
                            Working Days
                          </Text>
                          <Text
                            size="xl"
                            fw={800}
                            c={currentThemeConfig.successColor}
                          >
                            {Math.max((daysInMonth || 0) - (lopDays || 0), 0)}
                          </Text>
                        </Card>
                      </Grid.Col>
                    </Grid>

                    <Grid gutter="xl">
                      <Grid.Col span={{ base: 12, md: 5 }}>
                        <Card withBorder radius="md" p="lg" h="100%">
                          <Text fw={700} mb="md" size="sm" tt="uppercase">
                            Employee Details
                          </Text>
                          <Stack gap="xs">
                            <Group justify="space-between">
                              <Text size="sm" opacity={0.7}>
                                Name
                              </Text>
                              <Text size="sm" fw={600}>
                                {empDetails.empName}
                              </Text>
                            </Group>

                            <Group justify="space-between">
                              <Text size="sm" opacity={0.7}>
                                Employee ID
                              </Text>
                              <Text size="sm" fw={600}>
                                {empDetails.empId}
                              </Text>
                            </Group>

                            <Group justify="space-between">
                              <Text size="sm" opacity={0.7}>
                                Designation
                              </Text>
                              <Text size="sm" fw={600}>
                                {empDetails.designation}
                              </Text>
                            </Group>

                            <Group justify="space-between">
                              <Text size="sm" opacity={0.7}>
                                Email
                              </Text>
                              <Text size="sm" fw={600}>
                                {empDetails.email}
                              </Text>
                            </Group>

                            <Group justify="space-between">
                              <Text size="sm" opacity={0.7}>
                                Date of Birth
                              </Text>
                              <Text size="sm" fw={600}>
                                {empDetails.dob}
                              </Text>
                            </Group>

                            <Group justify="space-between">
                              <Text size="sm" opacity={0.7}>
                                PAN
                              </Text>
                              <Text size="sm" fw={600}>
                                {empDetails.pan}
                              </Text>
                            </Group>
                            <Divider my="xs" />
                            <Group justify="space-between">
                              <Text size="sm" opacity={0.7}>
                                Pay Period
                              </Text>
                              <Text
                                size="sm"
                                fw={700}
                                c={currentThemeConfig.accentColor}
                              >
                                {(() => {
                                  const monthDate = normalMonth(selectedMonth);
                                  return monthDate
                                    ? monthDate.toLocaleDateString('en-US', {
                                        month: 'long',
                                        year: 'numeric'
                                      })
                                    : '-';
                                })()}
                              </Text>
                            </Group>
                          </Stack>
                        </Card>
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, md: 7 }}>
                        <Card
                          withBorder
                          radius="md"
                          p="lg"
                          style={{
                            backgroundColor:
                              currentThemeConfig.headerBackgroundColor
                          }}
                        >
                          <Text fw={700} mb="md" size="sm" tt="uppercase">
                            Salary Breakdown
                          </Text>
                          <Stack gap="xs">
                            <Group justify="space-between">
                              <Text size="sm">Basic Salary</Text>
                              <Text size="sm" fw={600}>
                                ₹{' '}
                                {(
                                  previewData?.data?.calculations
                                    ?.basicSalary ?? basic
                                ).toFixed(2)}
                              </Text>
                            </Group>
                            <Group justify="space-between">
                              <Text size="sm">HRA</Text>
                              <Text size="sm" fw={600}>
                                ₹{' '}
                                {(
                                  previewData?.data?.calculations?.hra ??
                                  (basic * hra) / 100
                                ).toFixed(2)}
                              </Text>
                            </Group>
                            <Group justify="space-between">
                              <Text size="sm">Special Allowance</Text>
                              <Text size="sm" fw={600}>
                                ₹{' '}
                                {(
                                  previewData?.data?.calculations
                                    ?.specialAllowance ?? special
                                ).toFixed(2)}
                              </Text>
                            </Group>

                            <Group justify="space-between">
                              <Text size="sm">Conveyance</Text>
                              <Text size="sm" fw={600}>
                                ₹{' '}
                                {(
                                  previewData?.data?.calculations
                                    ?.conveyanceAllowance ?? conveyance
                                ).toFixed(2)}
                              </Text>
                            </Group>

                            <Group justify="space-between">
                              <Text size="sm">Medical</Text>
                              <Text size="sm" fw={600}>
                                ₹{' '}
                                {(
                                  previewData?.data?.calculations
                                    ?.medicalAllowance ?? medical
                                ).toFixed(2)}
                              </Text>
                            </Group>

                            <Group justify="space-between">
                              <Text size="sm">Other Allowances</Text>
                              <Text size="sm" fw={600}>
                                ₹{' '}
                                {(
                                  previewData?.data?.calculations
                                    ?.otherAllowances ?? other
                                ).toFixed(2)}
                              </Text>
                            </Group>
                          </Stack>

                          <Group justify="space-between" pt="sm">
                            <Text size="sm" fw={600}>
                              Gross Salary:
                            </Text>
                            <Text size="sm" fw={700}>
                              ₹{' '}
                              {(
                                previewData?.data?.calculations
                                  ?.grossEarnings ?? grossSalary
                              ).toFixed(2)}
                            </Text>
                          </Group>

                          {(lopDeduction > 0 ||
                            (previewData?.data?.calculations?.providentFund ??
                              0) > 0 ||
                            (previewData?.data?.calculations?.professionalTax ??
                              0) > 0 ||
                            (previewData?.data?.calculations?.incomeTax ?? 0) >
                              0 ||
                            (previewData?.data?.calculations?.otherDeductions ??
                              0) > 0) && (
                            <>
                              <Divider
                                my="xs"
                                label="Deductions"
                                labelPosition="center"
                              />
                              {lopDeduction > 0 && (
                                <Group justify="space-between">
                                  <Text
                                    size="sm"
                                    c={currentThemeConfig.lightDangerColor}
                                  >
                                    LOP Deduction ({lopDays} days)
                                  </Text>
                                  <Text
                                    size="sm"
                                    fw={600}
                                    c={currentThemeConfig.lightDangerColor}
                                  >
                                    − ₹ {lopDeduction.toFixed(2)}
                                  </Text>
                                </Group>
                              )}
                              {previewData?.data?.calculations ? (
                                <>
                                  {previewData.data.calculations.providentFund >
                                    0 && (
                                    <Group justify="space-between">
                                      <Text>PF</Text>
                                      <Text fw={600} c="red">
                                        − ₹{' '}
                                        {previewData.data.calculations.providentFund.toFixed(
                                          2
                                        )}
                                      </Text>
                                    </Group>
                                  )}
                                  {previewData.data.calculations
                                    .professionalTax > 0 && (
                                    <Group justify="space-between">
                                      <Text>Professional Tax</Text>
                                      <Text fw={600} c="red">
                                        − ₹{' '}
                                        {previewData.data.calculations.professionalTax.toFixed(
                                          2
                                        )}
                                      </Text>
                                    </Group>
                                  )}
                                  {previewData.data.calculations.incomeTax >
                                    0 && (
                                    <Group justify="space-between">
                                      <Text>Income Tax</Text>
                                      <Text fw={600} c="red">
                                        − ₹{' '}
                                        {previewData.data.calculations.incomeTax.toFixed(
                                          2
                                        )}
                                      </Text>
                                    </Group>
                                  )}
                                  {previewData.data.calculations
                                    .otherDeductions > 0 && (
                                    <Group justify="space-between">
                                      <Text>Other Deductions</Text>
                                      <Text fw={600} c="red">
                                        − ₹{' '}
                                        {previewData.data.calculations.otherDeductions.toFixed(
                                          2
                                        )}
                                      </Text>
                                    </Group>
                                  )}
                                </>
                              ) : null}
                            </>
                          )}

                          {/* Extra allowances from local state are likely already included in 'otherAllowances' in API response */}
                          {!previewData &&
                            additionalAllowances.map((item, i) => (
                              <Group key={i} justify="space-between">
                                <Text>
                                  {item.label} (
                                  {item.type === 'deduct' ? '-' : '+'})
                                </Text>
                                <Text
                                  fw={600}
                                  c={item.type === 'deduct' ? 'red' : 'inherit'}
                                >
                                  {item.type === 'deduct' ? '− ' : ''}₹{' '}
                                  {item.amount}
                                </Text>
                              </Group>
                            ))}
                          <Card
                            p="md"
                            mt="md"
                            radius="md"
                            style={{
                              border: `1px dashed ${currentThemeConfig.successColor}`,
                              backgroundColor: rgba(
                                currentThemeConfig.successColor,
                                0.2
                              )
                            }}
                          >
                            <Group justify="space-between">
                              <Text
                                fw={700}
                                c={currentThemeConfig.successColor}
                              >
                                Net Payable
                              </Text>
                              <Text
                                fw={800}
                                size="xl"
                                c={currentThemeConfig.successColor}
                              >
                                ₹{' '}
                                {(
                                  previewData?.data?.calculations?.netPay ?? 0
                                ).toFixed(2)}
                              </Text>
                            </Group>
                          </Card>
                        </Card>
                      </Grid.Col>
                    </Grid>

                    <Divider mt="xl" />
                    <Group justify="space-between" pb="md">
                      <Button
                        variant="subtle"
                        color="gray"
                        radius="lg"
                        onClick={prevStep}
                      >
                        Back
                      </Button>

                      <Button type="submit" radius="lg" loading={isGenerating}>
                        Download Salary Slip
                      </Button>
                    </Group>
                  </Stack>
                </form>
              )}
            </Stepper.Step>
          ))}
        </Stepper>
      </Card>
    </Container>
  );
};

export default GenerateSalarySlipReport;
