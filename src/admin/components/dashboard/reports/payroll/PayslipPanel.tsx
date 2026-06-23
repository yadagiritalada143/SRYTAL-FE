import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Center,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
  rgba
} from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import {
  IconDownload,
  IconFileText,
  IconUserCircle,
  IconReceipt2
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useAppTheme } from '@hooks/use-app-theme';
import type { EmployeeInterface } from '@interfaces/employee';
import EmployeeInfoCard from './EmployeeInfoCard';

interface PayslipPanelProps {
  employee: EmployeeInterface | null;
  selectedMonth: Date | null;
  onMonthChange: (value: Date | null) => void;
  previewUrl: string | null;
  previewLoading: boolean;
  slipError: string | null;
}

const EmptyState = () => {
  const { themeConfig } = useAppTheme();
  return (
    <Paper
      withBorder
      p={64}
      radius='lg'
      style={{
        borderStyle: 'dashed',
        borderColor: themeConfig.borderColor
      }}
    >
      <Center>
        <Stack align='center' gap='sm'>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: '50%',
              color: themeConfig.accentColor,
              backgroundColor: rgba(themeConfig.accentColor, 0.12)
            }}
          >
            <IconUserCircle size={36} stroke={1.5} />
          </Box>
          <Text fw={600} size='lg'>
            No Employee Selected
          </Text>
          <Text c={themeConfig.mutedTextColor} size='sm' ta='center' maw={320}>
            Select an employee from the list to view their payroll history and
            download salary slips.
          </Text>
        </Stack>
      </Center>
    </Paper>
  );
};

const PayslipPanel = ({
  employee,
  selectedMonth,
  onMonthChange,
  previewUrl,
  previewLoading,
  slipError
}: PayslipPanelProps) => {
  const { themeConfig } = useAppTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (!employee) return <EmptyState />;

  return (
    <Stack gap='md'>
      <Paper
        withBorder
        radius='lg'
        p={0}
        style={{
          backgroundColor: themeConfig.cardBackground,
          borderColor: themeConfig.borderColor,
          overflow: 'hidden'
        }}
      >
        {/* Accent-tinted identity header */}
        <Box
          p={isMobile ? 'md' : 'xl'}
          style={{
            background: `linear-gradient(135deg, ${rgba(
              themeConfig.accentColor,
              0.16
            )}, ${rgba(themeConfig.accentColor, 0.02)})`
          }}
        >
          <Group
            justify='space-between'
            align={isMobile ? 'flex-start' : 'center'}
            wrap={isMobile ? 'wrap' : 'nowrap'}
            gap='md'
          >
            <Group gap='lg' wrap='nowrap'>
              <Avatar
                size={isMobile ? 52 : 64}
                radius='md'
                color={themeConfig.accentColor}
                variant='filled'
              >
                {employee.firstName.charAt(0)}
                {employee.lastName.charAt(0)}
              </Avatar>
              <Box style={{ minWidth: 0 }}>
                <Title order={3} lineClamp={1}>
                  {employee.firstName} {employee.lastName}
                </Title>
                <Group gap='xs' mt={6}>
                  <Badge variant='light' color={themeConfig.accentColor}>
                    {employee.employmentType?.employmentType || '—'}
                  </Badge>
                  <Text size='sm' c={themeConfig.mutedTextColor}>
                    {employee.employeeId}
                  </Text>
                </Group>
              </Box>
            </Group>

            <MonthPickerInput
              styles={{
                input: {
                  backgroundColor: themeConfig.headerBackgroundColor,
                  color: themeConfig.color,
                  borderColor: themeConfig.borderColor
                },
                label: { color: themeConfig.color }
              }}
              label='Salary Month Period'
              placeholder='Select month'
              value={selectedMonth}
              onChange={value => onMonthChange(value ? new Date(value) : null)}
              w={isMobile ? '100%' : 260}
              valueFormat='MMM YYYY'
            />
          </Group>
        </Box>

        <Box p={isMobile ? 'md' : 'xl'} pt='md'>
          <EmployeeInfoCard employee={employee} />

          <Divider
            label='Payroll Records'
            labelPosition='center'
            styles={{ label: { color: themeConfig.button.color } }}
          />

          {!selectedMonth && (
            <Center py='xl'>
              <Stack align='center' gap='xs'>
                <IconReceipt2
                  size={40}
                  stroke={1.5}
                  color={themeConfig.mutedTextColor}
                />
                <Text size='sm' c={themeConfig.mutedTextColor}>
                  Select a month to view the salary slip.
                </Text>
              </Stack>
            </Center>
          )}

          {selectedMonth && previewLoading && (
            <Center py='xl'>
              <Text>Loading salary slip...</Text>
            </Center>
          )}

          {selectedMonth && slipError && !previewLoading && (
            <Center py='xl'>
              <Stack align='center' gap='xs'>
                <IconFileText size={48} color={themeConfig.dangerColor} />
                <Text c={themeConfig.dangerColor} fw={500} ta='center'>
                  {slipError}
                </Text>
              </Stack>
            </Center>
          )}

          {selectedMonth && previewUrl && !previewLoading && (
            <Paper
              withBorder
              p={isMobile ? 'sm' : 'lg'}
              mt='md'
              radius='md'
              style={{
                backgroundColor: themeConfig.cardBackground,
                borderColor: themeConfig.borderColor
              }}
            >
              <Group
                justify='space-between'
                mb='md'
                wrap={isMobile ? 'wrap' : 'nowrap'}
                gap='sm'
              >
                <Text fw={600} c={themeConfig.color}>
                  Preview :{' '}
                  {selectedMonth.toLocaleDateString('en-IN', {
                    month: 'short',
                    year: 'numeric'
                  })}
                </Text>

                <Tooltip label='Open / download'>
                  <ActionIcon
                    variant='light'
                    size='lg'
                    radius='md'
                    onClick={() => window.open(previewUrl, '_blank')}
                  >
                    <IconDownload size={18} color={themeConfig.button.color} />
                  </ActionIcon>
                </Tooltip>
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
                  width='100%'
                  height='100%'
                  style={{ border: 'none' }}
                  title='Salary Slip Preview'
                />
              </Box>
            </Paper>
          )}
        </Box>
      </Paper>
    </Stack>
  );
};

export default PayslipPanel;
