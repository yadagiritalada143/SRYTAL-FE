import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
  Center,
  Avatar,
  Grid,
  ScrollArea,
  Container,
  Modal,
  rgba
} from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import {
  IconSearch,
  IconDownload,
  IconUserCircle,
  IconFileText,
  IconChevronRight,
  IconArrowLeft,
  IconEye
} from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEmployeeDetailsByAdmin } from '../../../../services/admin-services';
import {
  organizationEmployeeAtom,
  organizationThemeAtom
} from '../../../../atoms/organization-atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { EmployeeInterface } from '../../../../interfaces/employee';
import { themeAtom } from '../../../../atoms/theme';
import { getThemeConfig } from '../../../../utils/common/theme-utils';
import { downloadSalarySlip } from '../../../../services/common-services';
import { useMediaQuery } from '@mantine/hooks';

const PayrollManagement = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [employees, setEmployees] = useRecoilState<EmployeeInterface[]>(
    organizationEmployeeAtom
  );

  const isDarkTheme = useRecoilValue(themeAtom);
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeInterface | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [slipError, setSlipError] = useState<string | null>(null);

  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (employees.length > 0) {
      setIsLoading(false);
      return;
    }

    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const employeesList = await getAllEmployeeDetailsByAdmin();
        setEmployees(employeesList);
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || 'Failed to load employees';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [employees.length, setEmployees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter(
      emp =>
        `${emp.firstName} ${emp.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, employees]);

  useEffect(() => {
    const fetchSlipOnMonthChange = async () => {
      if (!selectedEmployee || !selectedMonth) return;

      setSlipError(null);
      setPreviewUrl(null);
      setPreviewLoading(true);

      const formattedMonth = selectedMonth.toLocaleString('en-US', {
        month: 'short'
      });

      const formattedYear = selectedMonth.getFullYear().toString();

      try {
        const res = await downloadSalarySlip({
          mongoId: selectedEmployee._id,
          fullName: `${selectedEmployee.firstName} ${selectedEmployee.lastName}`,
          month: formattedMonth,
          year: formattedYear
        });

        if (!res?.success) throw new Error();

        setPreviewUrl(res.data.downloadUrl);
      } catch {
        setSlipError('Salary slip not available for selected pay period.');
      } finally {
        setPreviewLoading(false);
      }
    };

    fetchSlipOnMonthChange();
  }, [selectedEmployee, selectedMonth]);

  useEffect(() => {
    setSlipError(null);
  }, [selectedMonth, selectedEmployee]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

  return (
    <Container
      p="xl"
      size="lg"
      mt="xl"
      style={{
        backgroundColor: currentThemeConfig.backgroundColor,
        transition: 'all 0.15s ease'
      }}
    >
      {' '}
      <Stack gap="xl">
        {/* HEADER */}
        <Group justify="space-between" align="flex-start">
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Title order={1} fw={700}>
              Payroll Administration
            </Title>
            <Text c={currentThemeConfig.mutedTextColor} size="sm">
              Manage salary processing and employee pay records{' '}
            </Text>
          </Box>
          <Button
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => navigate(-1)}
            variant="filled"
            radius="md"
          >
            Back
          </Button>
        </Group>

        <Grid gutter="xl">
          {/* LEFT: EMPLOYEE LIST */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card withBorder radius="md" shadow="xs" p={0}>
              <Box p="md">
                <Title order={5} fw={600}>
                  Employees
                </Title>
                <Text size="xs" c={currentThemeConfig.mutedTextColor}>
                  Select an employee to view payroll records
                </Text>
              </Box>

              <Divider />

              <Box p="md">
                <TextInput
                  placeholder="Search employee..."
                  leftSection={<IconSearch size={16} stroke={1.5} />}
                  value={search}
                  onChange={e => setSearch(e.currentTarget.value)}
                  radius="md"
                />
              </Box>

              <Divider />

              {isLoading ? (
                <Center py="xl">
                  <Text size="sm" c={currentThemeConfig.mutedTextColor}>
                    Loading employees...
                  </Text>
                </Center>
              ) : (
                <ScrollArea h={480}>
                  <Stack gap={4} p="xs">
                    {filteredEmployees.map(emp => {
                      const isActive = selectedEmployee?._id === emp._id;
                      return (
                        <Paper
                          key={emp._id}
                          p="sm"
                          radius="md"
                          withBorder={isActive}
                          onClick={() => setSelectedEmployee(emp)}
                          style={{
                            cursor: 'pointer',
                            backgroundColor: isActive
                              ? rgba(currentThemeConfig.button.color, 0.3)
                              : 'transparent',
                            border: isActive
                              ? `1px solid ${currentThemeConfig.button.color}`
                              : '1px solid transparent',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <Group justify="space-between" wrap="nowrap">
                            <Group gap="sm" wrap="nowrap">
                              <Avatar
                                radius={6}
                                style={{
                                  backgroundColor: isActive
                                    ? currentThemeConfig.color
                                    : currentThemeConfig.borderColor
                                }}
                              >
                                {emp.firstName?.[0]}
                                {emp.lastName?.[0]}
                              </Avatar>

                              <Box>
                                <Text fw={600} size="sm">
                                  {emp.firstName} {emp.lastName}
                                </Text>

                                <Text
                                  size="xs"
                                  c={currentThemeConfig.mutedTextColor}
                                >
                                  {emp.employeeId}
                                </Text>

                                <Text
                                  size="xs"
                                  c={
                                    isActive
                                      ? currentThemeConfig.mutedTextColor
                                      : currentThemeConfig.button.color
                                  }
                                  tt="capitalize"
                                  fw={500}
                                >
                                  {emp.userRole.replace('_', ' ')}
                                </Text>
                              </Box>
                            </Group>

                            <IconChevronRight
                              size={16}
                              color={currentThemeConfig.mutedTextColor}
                            />
                          </Group>
                        </Paper>
                      );
                    })}
                  </Stack>
                </ScrollArea>
              )}
            </Card>
          </Grid.Col>

          {/* RIGHT: PAYSLIP DETAILS */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            {selectedEmployee ? (
              <Stack gap="md">
                <Paper
                  withBorder
                  p="xl"
                  radius="md"
                  style={{
                    backgroundColor: currentThemeConfig.cardBackground,
                    borderColor: currentThemeConfig.borderColor
                  }}
                >
                  <Group justify="space-between" mb="xl">
                    <Group gap="lg">
                      <Avatar
                        size={60}
                        radius="md"
                        color={currentThemeConfig.button.color}
                        variant="light"
                      >
                        {selectedEmployee.firstName.charAt(0)}
                        {selectedEmployee.lastName.charAt(0)}
                      </Avatar>
                      <Box>
                        <Title order={3}>
                          {selectedEmployee.firstName}{' '}
                          {selectedEmployee.lastName}
                        </Title>{' '}
                        <Badge mt={5}>
                          {selectedEmployee.employmentType?.employmentType ||
                            '—'}
                        </Badge>{' '}
                      </Box>
                    </Group>
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
                      label="Salary Month Period"
                      placeholder="Select month"
                      value={selectedMonth}
                      onChange={value =>
                        setSelectedMonth(value ? new Date(value) : null)
                      }
                      w={300}
                      valueFormat="MMM YYYY"
                    />
                  </Group>

                  {/* Employee Info */}
                  <Paper withBorder p="md" mb="xl">
                    <Stack gap="md">
                      <Box>
                        <Text
                          fw={600}
                          mb="xs"
                          c={currentThemeConfig.mutedTextColor}
                        >
                          Employment Details
                        </Text>
                        <Grid>
                          <Grid.Col span={{ base: 12, md: 6 }}>
                            <Text
                              size="xs"
                              c={currentThemeConfig.mutedTextColor}
                            >
                              Employee ID
                            </Text>
                            <Text fw={400} c={currentThemeConfig.color}>
                              {selectedEmployee.employeeId}
                            </Text>
                          </Grid.Col>

                          <Grid.Col span={{ base: 12, md: 6 }}>
                            <Text
                              size="xs"
                              c={currentThemeConfig.mutedTextColor}
                            >
                              Role
                            </Text>
                            <Text
                              tt="capitalize"
                              fw={400}
                              c={currentThemeConfig.color}
                            >
                              {selectedEmployee.userRole}
                            </Text>
                          </Grid.Col>
                        </Grid>
                      </Box>

                      <Divider />

                      {/* Personal Info */}
                      <Box>
                        <Text
                          fw={600}
                          mb="xs"
                          c={currentThemeConfig.mutedTextColor}
                        >
                          Personal Information
                        </Text>
                        <Grid>
                          <Grid.Col span={{ base: 12, md: 6 }}>
                            <Text
                              size="xs"
                              c={currentThemeConfig.mutedTextColor}
                            >
                              Date of Birth
                            </Text>
                            <Text fw={400} c={currentThemeConfig.color}>
                              {formatDate(selectedEmployee.dateOfBirth)}
                            </Text>
                          </Grid.Col>

                          <Grid.Col span={6}>
                            <Text
                              size="xs"
                              c={currentThemeConfig.mutedTextColor}
                            >
                              Email
                            </Text>
                            <Text fw={400} c={currentThemeConfig.color}>
                              {selectedEmployee.email}
                            </Text>
                          </Grid.Col>
                        </Grid>
                      </Box>

                      <Divider />

                      {/* Identification Details */}
                      <Box>
                        <Text
                          fw={600}
                          mb="xs"
                          c={currentThemeConfig.mutedTextColor}
                        >
                          Identification Details{' '}
                        </Text>
                        <Grid>
                          <Grid.Col span={{ base: 12, md: 6 }}>
                            <Text
                              size="xs"
                              c={currentThemeConfig.mutedTextColor}
                            >
                              PAN
                            </Text>
                            <Text fw={400} c={currentThemeConfig.color}>
                              {selectedEmployee.panCardNumber || '—'}
                            </Text>
                          </Grid.Col>

                          <Grid.Col span={6}>
                            <Text
                              size="xs"
                              c={currentThemeConfig.mutedTextColor}
                            >
                              UAN / Aadhar
                            </Text>
                            <Text fw={400} c={currentThemeConfig.color}>
                              {selectedEmployee.aadharNumber || '—'}
                            </Text>
                          </Grid.Col>
                        </Grid>
                      </Box>
                    </Stack>
                  </Paper>

                  <Divider
                    label="Payroll Records"
                    labelPosition="center"
                    styles={{
                      label: { color: currentThemeConfig.button.color }
                    }}
                  />

                  {selectedMonth && previewLoading && (
                    <Center py="xl">
                      <Text>Loading salary slip...</Text>
                    </Center>
                  )}

                  {selectedMonth && slipError && !previewLoading && (
                    <Center py="xl">
                      <Stack align="center" gap="xs">
                        <IconFileText size={48} />
                        <Text c={currentThemeConfig.dangerColor} fw={500}>
                          Salary slip not available for selected pay period.
                        </Text>
                      </Stack>
                    </Center>
                  )}

                  {selectedMonth && previewUrl && !previewLoading && (
                    <Paper
                      withBorder
                      p={isMobile ? 'sm' : 'lg'}
                      mt="md"
                      style={{
                        backgroundColor: currentThemeConfig.cardBackground,
                        borderColor: currentThemeConfig.borderColor,
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <Group
                        justify="space-between"
                        mb="md"
                        wrap={isMobile ? 'wrap' : 'nowrap'}
                        gap="sm"
                      >
                        <Text fw={600} c={currentThemeConfig.color}>
                          Preview :{' '}
                          {selectedMonth.toLocaleDateString('en-IN', {
                            month: 'short',
                            year: 'numeric'
                          })}
                        </Text>

                        <ActionIcon
                          variant="light"
                          onClick={() => window.open(previewUrl, '_blank')}
                        >
                          <IconDownload
                            size={16}
                            color={currentThemeConfig.button.color}
                          />
                        </ActionIcon>
                      </Group>

                      <Box
                        style={{
                          width: '100%',
                          height: isMobile ? '65vh' : '500px',
                          borderRadius: 8,
                          overflow: 'hidden'
                        }}
                      >
                        <iframe
                          src={`${previewUrl}#toolbar=0&navpanes=0`}
                          width="100%"
                          height="100%"
                          style={{ border: 'none' }}
                          title="Salary Slip Preview"
                        />
                      </Box>
                    </Paper>
                  )}
                </Paper>
              </Stack>
            ) : (
              <Paper
                withBorder
                p={100}
                radius="md"
                style={{ borderStyle: 'dashed' }}
              >
                <Center>
                  <Stack align="center" gap="md">
                    <IconUserCircle
                      size={60}
                      stroke={1}
                      color="var(--mantine-color-gray-5)"
                    />
                    <Box style={{ textAlign: 'center' }}>
                      <Text fw={600} size="lg">
                        No Employee Selected
                      </Text>
                      <Text c={currentThemeConfig.mutedTextColor} size="sm">
                        Select an employee from the left list to view their
                        payroll history and download slips.
                      </Text>
                    </Box>
                  </Stack>
                </Center>
              </Paper>
            )}
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
};

export default PayrollManagement;
