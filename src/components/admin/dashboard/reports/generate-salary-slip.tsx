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
    description: 'Final Review',
    enabled: true
  }
];

const GenerateSalarySlipReport = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [employees, setEmployees] = useState<any[]>([]);
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
      daysInMonth: undefined,
      lopDays: 0,
      salaryComponents: [
        { label: 'Basic Salary', amount: '' },
        { label: 'Special Allowance', amount: '' }
      ]
    }
  });
  const salaryComponents = watch('salaryComponents') || [];
  const selectedMonth = watch('selectedMonth');
  const daysInMonth = watch('daysInMonth');
  const lopDays = watch('lopDays');

  const grossSalary = salaryComponents.reduce((sum, item) => {
    return sum + (parseFloat(item.amount) || 0);
  }, 0);

  const perDaySalary =
    daysInMonth && daysInMonth > 0 ? grossSalary / daysInMonth : 0;

  const lopDeduction = lopDays && lopDays > 0 ? perDaySalary * lopDays : 0;

  const netPayableSalary = grossSalary - lopDeduction;
  const finalSalary = Math.max(netPayableSalary, 0);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'salaryComponents'
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
      dob: formatDate(
        selectedEmployee.dateOfBirth || selectedEmployee.dob || ''
      ),
      bankAccount: selectedEmployee.bankDetailsInfo?.accountNumber || '',
      ifsc: selectedEmployee.bankDetailsInfo?.ifscCode || '',
      pan: selectedEmployee.panNumber || selectedEmployee.pan || ''
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
    const isValid = await trigger(['employeeId', 'selectedMonth']);

    if (!isValid) return;

    setActiveStep(current => (current < 2 ? current + 1 : current));
  };

  const prevStep = () =>
    setActiveStep(current => (current > 0 ? current - 1 : current));

  const onSubmit = async (data: GenerateSalarySlipForm) => {
    try {
      setIsGenerating(true);
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

        <form onSubmit={handleSubmit(onSubmit)}>
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
                          render={({ field }) => {
                            let dateValue = field.value;
                            if (typeof dateValue === 'string') {
                              let dateValue: Date | null = field.value;

                              if (typeof dateValue === 'string') {
                                const parsed = new Date(dateValue);
                                dateValue = isNaN(parsed.getTime())
                                  ? null
                                  : parsed;
                              }
                            }

                            return (
                              <MonthPickerInput
                                {...field}
                                value={dateValue}
                                label="Select Month"
                                required
                                placeholder="Pick month"
                                error={errors.selectedMonth?.message}
                                onChange={date => {
                                  field.onChange(date);
                                }}
                              />
                            );
                          }}
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
                      <Group justify="space-between" mb="md">
                        <Title order={5}>Salary Components</Title>

                        <Button
                          variant="light"
                          onClick={() =>
                            append({ label: 'New Component', amount: '' })
                          }
                        >
                          + Add More
                        </Button>
                      </Group>

                      <Stack gap="sm">
                        {fields.map((field, index) => (
                          <Group key={field.id} grow align="flex-end">
                            <TextInput
                              label={index === 0 ? 'Component Name' : ''}
                              placeholder="Allowance Type"
                              {...register(
                                `salaryComponents.${index}.label` as const
                              )}
                            />

                            <TextInput
                              label={index === 0 ? 'Amount (₹)' : ''}
                              placeholder="0.00"
                              type="number"
                              step="0.01"
                              {...register(
                                `salaryComponents.${index}.amount` as const
                              )}
                            />

                            {index > 1 && (
                              <Button
                                color="red"
                                variant="subtle"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </Button>
                            )}
                          </Group>
                        ))}
                      </Stack>
                    </Card>

                    <Card
                      withBorder
                      p="md"
                      radius="md"
                      shadow="md"
                      bg="green.0"
                    >
                      <Group justify="space-between">
                        <Text fw={600}>Total Earnings:</Text>

                        <Text fw={700} size="lg" c="green">
                          ₹{' '}
                          {fields
                            .reduce((total, _, index) => {
                              const value =
                                parseFloat(
                                  watch(`salaryComponents.${index}.amount`)
                                ) || 0;
                              return total + value;
                            }, 0)
                            .toFixed(2)}
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
                            {(daysInMonth || 0) - (lopDays || 0)}
                          </Text>
                        </Group>
                      </Stack>
                    </Card>

                    <Card p="md" bg="green.0" withBorder>
                      <Title order={5} mb="sm">
                        Salary Breakdown
                      </Title>

                      <Stack gap="sm">
                        {salaryComponents.map((item, index) => (
                          <Group key={index} justify="space-between">
                            <Text>{item.label}</Text>
                            <Text fw={600}>₹ {item.amount || '0.00'}</Text>
                          </Group>
                        ))}

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
                  </Stack>
                )}
              </Stepper.Step>
            ))}
          </Stepper>

          <Group justify="space-between" mt="xl" pt="md">
            <Button
              variant="default"
              disabled={activeStep === 0}
              onClick={prevStep}
            >
              Back
            </Button>

            {activeStep === 2 ? (
              <Button
                type="submit"
                color="green"
                loading={isSubmitting || isGenerating}
              >
                Generate Salary Slip PDF
              </Button>
            ) : (
              <Button onClick={nextStep}>Next</Button>
            )}
          </Group>
        </form>
      </Card>
    </Container>
  );
};

export default GenerateSalarySlipReport;
