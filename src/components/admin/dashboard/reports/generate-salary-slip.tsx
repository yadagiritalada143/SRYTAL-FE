import { useState, useEffect } from 'react';
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
  Divider
} from '@mantine/core';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MonthPickerInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { toast } from 'react-toastify';
import { IconAlertCircle } from '@tabler/icons-react';
import { getAllEmployeeDetailsByAdmin } from '../../../../services/admin-services';
import {
  generateSalarySlipSchema,
  GenerateSalarySlipForm
} from '../../../../forms/generate-salary-slip';

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
    label: 'Generate',
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

  const [empDetails, setEmpDetails] = useState({
    empId: '',
    empName: '',
    designation: '',
    email: '',
    dob: '',
    bankAccount: '',
    ifsc: '',
    pan: ''
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
    reset
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
      extraAllowances: []
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
  const extraAllowances = watch('extraAllowances') || [];

  const extraTotal = extraAllowances.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );

  const hraAmount = (basic * hra) / 100;

  const grossSalary =
    basic + hraAmount + special + conveyance + medical + other + extraTotal;

  const perDaySalary =
    daysInMonth && daysInMonth > 0 ? grossSalary / daysInMonth : 0;

  const lopDeduction = lopDays && lopDays > 0 ? perDaySalary * lopDays : 0;

  const netPayableSalary = grossSalary - lopDeduction;
  const finalSalary = Math.max(netPayableSalary, 0);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'extraAllowances'
  });

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
        email: '',
        dob: '',
        bankAccount: '',
        ifsc: '',
        pan: ''
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
      email: selectedEmployee.email || '',
      dob: formatDate(selectedEmployee.dateOfBirth || ''),
      bankAccount: selectedEmployee.bankDetailsInfo?.accountNumber || '',
      ifsc: selectedEmployee.bankDetailsInfo?.ifscCode || '',
      pan: selectedEmployee.panNumber || ''
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
    }

    setActiveStep(current => (current < 2 ? current + 1 : current));
  };

  const prevStep = () =>
    setActiveStep(current => (current > 0 ? current - 1 : current));

  const onSubmit = async (data: GenerateSalarySlipForm) => {
    try {
      setIsGenerating(true);
      if (data.lopDays > data.daysInMonth) {
        toast.error('LOP days cannot exceed total days');
        return;
      }
      const payload = {
        employeeId: data.employeeId,
        employeeName: empDetails.empName,
        designation: empDetails.designation,
        panNumber: empDetails.pan,

        payPeriod: data.selectedMonth.toISOString(),
        payDate: new Date().toISOString(),

        bankAccountNumber: empDetails.bankAccount,
        IFSCCODE: empDetails.ifsc,
        transactionType: 'Bank Transfer',

        totalWorkingDays: data.daysInMonth,
        daysWorked: data.daysInMonth - (data.lopDays || 0),
        lossOfPayDays: data.lopDays,

        basicSalary: data.basicSalary,
        hraPercentage: data.hraPercentage,
        specialAllowance: data.specialAllowance,
        conveyanceAllowance: data.conveyanceAllowance,
        medicalAllowance: data.medicalAllowance,
        otherAllowances: data.otherAllowances
      };

      toast.success('Salary slip generated successfully!');
      reset();
      setActiveStep(0);
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate salary slip');
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
    <Container size="lg" py="xl">
      <Card shadow="sm" radius="md" p="xl" withBorder>
        <Title order={2} ta="center" mb="xl">
          Generate Salary Slip
        </Title>

        <Stepper active={activeStep} mb="xl">
          {steps.map((step, index) => (
            <Stepper.Step
              key={index}
              label={step.label}
              description={step.description}
              allowStepSelect={step.enabled}
            >
              {/* ================= STEP 1 ================= */}
              {index === 0 && (
                <Stack mt="lg" gap="lg">
                  <Title order={5}>Employee Information</Title>
                  <Grid>
                    <Grid.Col span={6}>
                      <Select
                        label="Employee ID"
                        placeholder={
                          isLoadingEmployees ? 'Loading...' : 'Select employee'
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
                    <Grid.Col span={6}>
                      <TextInput
                        label="Employee Name"
                        value={empDetails.empName}
                        disabled
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <TextInput
                        label="Email"
                        value={empDetails.email}
                        disabled
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <TextInput
                        label="Designation"
                        value={empDetails.designation}
                        disabled
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <TextInput
                        label="Date of Birth"
                        value={empDetails.dob}
                        disabled
                      />
                    </Grid.Col>
                  </Grid>

                  <Divider />

                  <Title order={5}>Bank Details</Title>

                  <Grid>
                    <Grid.Col span={6}>
                      <TextInput
                        label="Bank Account Number"
                        value={empDetails.bankAccount}
                        disabled
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <TextInput
                        label="IFSC Code"
                        value={empDetails.ifsc}
                        disabled
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <TextInput
                        label="PAN Number"
                        value={empDetails.pan}
                        disabled
                      />
                    </Grid.Col>
                  </Grid>

                  <Divider />

                  <Title order={5}>Salary Period</Title>

                  <Grid align="end">
                    <Grid.Col span={4}>
                      <Controller
                        name="selectedMonth"
                        control={control}
                        render={({ field }) => (
                          <MonthPickerInput
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
                      <TextInput
                        label="Total Days"
                        value={
                          calculatedDaysInMonth > 0
                            ? String(calculatedDaysInMonth)
                            : ''
                        }
                        disabled
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
                </Stack>
              )}

              {/* ================= STEP 2 ================= */}
              {index === 1 && (
                <Stack mt="lg" gap="md">
                  <Card shadow="sm" radius="md" p="lg" withBorder>
                    <Title order={5} mb="md">
                      Earnings
                    </Title>

                    <Grid>
                      <Grid.Col span={6}>
                        <TextInput
                          label="Basic Salary"
                          type="number"
                          {...register('basicSalary', {
                            valueAsNumber: true
                          })}
                        />
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <TextInput
                          label="HRA (%)"
                          type="number"
                          {...register('hraPercentage', {
                            valueAsNumber: true
                          })}
                        />
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <TextInput
                          label="Special Allowance"
                          type="number"
                          {...register('specialAllowance', {
                            valueAsNumber: true
                          })}
                        />
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <TextInput
                          label="Conveyance Allowance"
                          type="number"
                          {...register('conveyanceAllowance', {
                            valueAsNumber: true
                          })}
                        />
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <TextInput
                          label="Medical Allowance"
                          type="number"
                          {...register('medicalAllowance', {
                            valueAsNumber: true
                          })}
                        />
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <TextInput
                          label="Other Allowances"
                          type="number"
                          {...register('otherAllowances', {
                            valueAsNumber: true
                          })}
                        />
                      </Grid.Col>
                    </Grid>
                  </Card>

                  <Card shadow="sm" radius="md" p="lg" withBorder>
                    <Group justify="space-between" mb="md">
                      <Title order={6}>Additional Allowances</Title>

                      <Button
                        type="button"
                        variant="light"
                        radius="lg"
                        onClick={() => append({ label: '', amount: 0 })}
                      >
                        + Add More
                      </Button>
                    </Group>

                    <Stack>
                      {fields.map((field, index) => (
                        <Group key={field.id} grow>
                          <TextInput
                            placeholder="Allowance Name"
                            {...register(`extraAllowances.${index}.label`)}
                          />

                          <TextInput
                            type="number"
                            placeholder="Amount"
                            {...register(`extraAllowances.${index}.amount`, {
                              valueAsNumber: true
                            })}
                          />

                          <Button
                            type="button"
                            color="red"
                            radius="md"
                            variant="subtle"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </Button>
                        </Group>
                      ))}
                    </Stack>
                  </Card>

                  <Card withBorder p="md" radius="md" shadow="md" bg="green.0">
                    <Group justify="space-between">
                      <Text fw={600}>Total Earnings:</Text>
                      <Text fw={700} size="lg" c="green">
                        ₹ {grossSalary.toFixed(2)}
                      </Text>
                    </Group>
                    {lopDays > 0 && daysInMonth > 0 && (
                      <Card withBorder p="sm" bg="red.0">
                        <Group justify="space-between">
                          <Text fw={600}>Estimated LOP Deduction:</Text>
                          <Text fw={700} c="red">
                            − ₹ {(perDaySalary * lopDays).toFixed(2)}
                          </Text>
                        </Group>
                      </Card>
                    )}
                  </Card>
                </Stack>
              )}

              {/* ================= STEP 3 ================= */}
              {index === 2 && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack mt="lg" gap="md">
                    <Title order={4}>Salary Slip Summary</Title>

                    <Alert
                      icon={<IconAlertCircle />}
                      title="Review Details"
                      color="blue"
                    >
                      Please review all details before generating the salary
                      slip
                    </Alert>

                    <Card p="md" bg="gray.0" withBorder>
                      <Stack gap="sm">
                        <Group justify="space-between">
                          <Text fw={600}>Employee:</Text>
                          <Text>{`${empDetails.empName} (${empDetails.empId})`}</Text>
                        </Group>
                        <Group justify="space-between">
                          <Text fw={600}>Email:</Text>
                          <Text>{empDetails.email}</Text>
                        </Group>
                        <Group justify="space-between">
                          <Text fw={600}>Designation:</Text>
                          <Text>{empDetails.designation}</Text>
                        </Group>
                        <Group justify="space-between">
                          <Text fw={600}>Date of Birth:</Text>
                          <Text>{empDetails.dob}</Text>
                        </Group>
                        <Group justify="space-between">
                          <Text fw={600}>PAN:</Text>
                          <Text>{empDetails.pan}</Text>
                        </Group>
                        <Group justify="space-between">
                          <Text fw={600}>Month:</Text>
                          <Text>
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

                    <Card p="md" bg="gray.0" withBorder>
                      <Stack gap="sm">
                        <Group justify="space-between">
                          <Text fw={600}>Total Days:</Text>
                          <Text>{daysInMonth}</Text>
                        </Group>
                        <Group justify="space-between">
                          <Text fw={600}>LOP Days:</Text>
                          <Text>{lopDays}</Text>
                        </Group>
                        <Group justify="space-between">
                          <Text fw={600}>Working Days:</Text>
                          <Text fw={700}>
                            {Math.max((daysInMonth || 0) - (lopDays || 0), 0)}
                          </Text>
                        </Group>
                      </Stack>
                    </Card>

                    <Card p="md" bg="green.0" withBorder>
                      <Title order={5} mb="sm">
                        Salary Breakdown
                      </Title>

                      <Stack gap="sm">
                        <Stack gap="sm">
                          <Group justify="space-between">
                            <Text>Basic Salary</Text>
                            <Text fw={600}>₹ {basic.toFixed(2)}</Text>
                          </Group>

                          <Group justify="space-between">
                            <Text>HRA</Text>
                            <Text fw={600}>
                              ₹ {((basic * hra) / 100).toFixed(2)}
                            </Text>
                          </Group>

                          <Group justify="space-between">
                            <Text>Special Allowance</Text>
                            <Text fw={600}>₹ {special.toFixed(2)}</Text>
                          </Group>

                          <Group justify="space-between">
                            <Text>Conveyance</Text>
                            <Text fw={600}>₹ {conveyance.toFixed(2)}</Text>
                          </Group>

                          <Group justify="space-between">
                            <Text>Medical</Text>
                            <Text fw={600}>₹ {medical.toFixed(2)}</Text>
                          </Group>

                          <Group justify="space-between">
                            <Text>Other Allowances</Text>
                            <Text fw={600}>₹ {other.toFixed(2)}</Text>
                          </Group>
                        </Stack>

                        <Group justify="space-between" pt="sm">
                          <Text fw={600}>Gross Salary:</Text>
                          <Text fw={700}>₹ {grossSalary.toFixed(2)}</Text>
                        </Group>

                        <Group justify="space-between">
                          <Text fw={600}>LOP Deduction ({lopDays} days):</Text>
                          <Text fw={700} c="red">
                            − ₹ {lopDeduction.toFixed(2)}
                          </Text>
                        </Group>

                        {extraAllowances.map((item, i) => (
                          <Group key={i} justify="space-between">
                            <Text>{item.label}</Text>
                            <Text fw={600}>₹ {item.amount}</Text>
                          </Group>
                        ))}

                        <Group
                          justify="space-between"
                          pt="sm"
                          style={{ borderTop: '1px solid #2f9e44' }}
                        >
                          <Text fw={700}>Final Payable Salary:</Text>
                          <Text fw={700} size="lg" c="green">
                            ₹ {finalSalary.toFixed(2)}
                          </Text>
                        </Group>
                      </Stack>
                    </Card>

                    <Group justify="space-between" mt="xl" pt="md">
                      <Button
                        variant="default"
                        radius="lg"
                        disabled={activeStep === 0}
                        onClick={prevStep}
                      >
                        Back
                      </Button>

                      {activeStep === 2 ? (
                        <Button
                          type="submit"
                          color="green"
                          radius="lg"
                          loading={isSubmitting || isGenerating}
                        >
                          Generate / Download
                        </Button>
                      ) : (
                        <Button type="button" onClick={nextStep}>
                          {activeStep === 1 ? 'Preview' : 'Next'}
                        </Button>
                      )}
                    </Group>
                  </Stack>
                </form>
              )}
            </Stepper.Step>
          ))}
        </Stepper>
        {activeStep !== 2 && (
          <Group justify="space-between" mt="xl" pt="md">
            <Button
              variant="default"
              radius="lg"
              disabled={activeStep === 0}
              onClick={prevStep}
            >
              Back
            </Button>

            <Button type="button" onClick={nextStep} radius="lg">
              {activeStep === 1 ? 'Preview' : 'Next'}
            </Button>
          </Group>
        )}
      </Card>
    </Container>
  );
};

export default GenerateSalarySlipReport;
