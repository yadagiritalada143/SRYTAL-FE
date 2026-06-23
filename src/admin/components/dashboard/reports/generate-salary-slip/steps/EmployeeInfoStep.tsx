import {
  Stack,
  Card,
  Grid,
  Select,
  Group,
  TextInput,
  Text,
  Avatar,
  Badge,
  Box,
  Divider,
  Center,
  rgba
} from '@mantine/core';
import { Controller } from 'react-hook-form';
import { MonthPickerInput } from '@mantine/dates';
import {
  IconUserSearch,
  IconMail,
  IconCalendar,
  IconBuildingBank,
  IconId,
  IconCreditCard,
  IconCalendarMonth,
  IconUserOff
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { CommonButton } from '@components/common/button/CommonButton';
import InfoField from '../InfoField';
import type { SalarySlipVM } from '../useSalarySlip';

const SectionTitle = ({
  icon,
  children
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  const { themeConfig } = useAppTheme();
  return (
    <Group gap='xs' mb='xs'>
      <Box style={{ color: themeConfig.accentColor, display: 'flex' }}>
        {icon}
      </Box>
      <Text fw={700} size='sm' tt='uppercase' style={{ letterSpacing: 0.4 }}>
        {children}
      </Text>
    </Group>
  );
};

const EmployeeInfoStep = ({ vm }: { vm: SalarySlipVM }) => {
  const { themeConfig } = useAppTheme();
  const {
    employees,
    isLoadingEmployees,
    empDetails,
    handleEmployeeChange,
    errors,
    control,
    register,
    calculatedDaysInMonth,
    nextStep
  } = vm;

  const hasEmployee = Boolean(empDetails.empId);

  return (
    <Stack mt='lg' gap='lg'>
      {/* Employee picker */}
      <Card
        withBorder
        radius='md'
        p='lg'
        style={{ borderColor: themeConfig.borderColor }}
      >
        <SectionTitle icon={<IconUserSearch size={16} />}>
          Select Employee
        </SectionTitle>
        <Select
          placeholder={isLoadingEmployees ? 'Loading...' : 'Search employee...'}
          searchable
          required
          size='md'
          data={employees
            .filter(emp => emp.employeeId)
            .map(emp => ({
              value: emp.employeeId,
              label: `${emp.employeeId} - ${emp.firstName} ${emp.lastName}`
            }))}
          value={empDetails.empId || null}
          onChange={value => handleEmployeeChange(value)}
          error={errors.employeeId?.message}
          leftSection={<IconUserSearch size={16} />}
        />
      </Card>

      {/* Selected employee details */}
      {hasEmployee ? (
        <Card
          withBorder
          radius='md'
          p={0}
          style={{
            borderColor: themeConfig.borderColor,
            overflow: 'hidden'
          }}
        >
          {/* Identity banner */}
          <Group
            gap='md'
            p='lg'
            wrap='nowrap'
            style={{
              background: `linear-gradient(135deg, ${rgba(
                themeConfig.accentColor,
                0.16
              )}, ${rgba(themeConfig.accentColor, 0.02)})`
            }}
          >
            <Avatar
              size={56}
              radius='md'
              color={themeConfig.accentColor}
              variant='filled'
            >
              {empDetails.empName?.charAt(0)}
            </Avatar>
            <Box style={{ minWidth: 0 }}>
              <Text fw={700} size='lg' lineClamp={1}>
                {empDetails.empName}
              </Text>
              <Group gap='xs' mt={4}>
                {empDetails.designation && (
                  <Badge variant='light' color={themeConfig.accentColor}>
                    {empDetails.designation}
                  </Badge>
                )}
                {empDetails.department && (
                  <Text size='sm' c={themeConfig.mutedTextColor}>
                    {empDetails.department}
                  </Text>
                )}
              </Group>
            </Box>
          </Group>

          <Box p='lg'>
            <SectionTitle icon={<IconMail size={16} />}>
              Personal Information
            </SectionTitle>
            <Grid gutter='lg'>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <InfoField
                  label='Email'
                  value={empDetails.email}
                  icon={<IconMail size={16} />}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <InfoField
                  label='Date of Birth'
                  value={empDetails.dob}
                  icon={<IconCalendar size={16} />}
                />
              </Grid.Col>
            </Grid>

            <Divider my='lg' color={themeConfig.borderColor} />

            <SectionTitle icon={<IconBuildingBank size={16} />}>
              Bank Details
            </SectionTitle>
            <Grid gutter='lg'>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <InfoField
                  label='Bank Account Number'
                  value={empDetails.bankAccount}
                  icon={<IconCreditCard size={16} />}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <InfoField
                  label='Bank Name'
                  value={empDetails.bankName}
                  icon={<IconBuildingBank size={16} />}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <InfoField
                  label='IFSC Code'
                  value={empDetails.ifsc}
                  icon={<IconBuildingBank size={16} />}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <InfoField
                  label='PAN Number'
                  value={empDetails.pan}
                  icon={<IconId size={16} />}
                />
              </Grid.Col>
            </Grid>
          </Box>
        </Card>
      ) : (
        <Card
          withBorder
          radius='md'
          p='xl'
          style={{
            borderColor: themeConfig.borderColor,
            borderStyle: 'dashed'
          }}
        >
          <Center py='md'>
            <Stack align='center' gap='xs'>
              <IconUserOff
                size={40}
                stroke={1.5}
                color={themeConfig.mutedTextColor}
              />
              <Text c={themeConfig.mutedTextColor} size='sm'>
                Select an employee to load their details.
              </Text>
            </Stack>
          </Center>
        </Card>
      )}

      {/* Salary period */}
      <Card
        withBorder
        radius='md'
        p='lg'
        style={{ borderColor: themeConfig.borderColor }}
      >
        <SectionTitle icon={<IconCalendarMonth size={16} />}>
          Salary Period
        </SectionTitle>
        <Grid align='flex-end' gutter='md'>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Controller
              name='selectedMonth'
              control={control}
              render={({ field }) => (
                <MonthPickerInput
                  styles={{
                    input: {
                      backgroundColor: themeConfig.headerBackgroundColor,
                      color: themeConfig.color,
                      borderColor: themeConfig.borderColor
                    },
                    label: { color: themeConfig.color }
                  }}
                  value={
                    field.value
                      ? field.value instanceof Date
                        ? field.value
                        : new Date(field.value)
                      : null
                  }
                  onChange={field.onChange}
                  label='Select Month'
                  required
                  placeholder='Pick month'
                  error={errors.selectedMonth?.message}
                />
              )}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 6, sm: 4 }}>
            <TextInput
              label='Total Days'
              value={
                calculatedDaysInMonth > 0 ? String(calculatedDaysInMonth) : '—'
              }
              readOnly
              error={errors.daysInMonth?.message}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 6, sm: 4 }}>
            <TextInput
              label='LOP Days'
              {...register('lopDays', { valueAsNumber: true })}
              type='number'
              placeholder='0'
              error={errors.lopDays?.message}
            />
          </Grid.Col>
        </Grid>
      </Card>

      <Group justify='flex-end' mt='md'>
        <CommonButton onClick={nextStep} size='md'>
          Next
        </CommonButton>
      </Group>
    </Stack>
  );
};

export default EmployeeInfoStep;
