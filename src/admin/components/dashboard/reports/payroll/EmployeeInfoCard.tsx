import { Box, Divider, Grid, Paper, Stack, Text } from '@mantine/core';
import { useAppTheme } from '@hooks/use-app-theme';
import type { EmployeeInterface } from '@interfaces/employee';
import { formatDate } from './utils';

interface FieldProps {
  label: string;
  value?: React.ReactNode;
}

const Field = ({ label, value }: FieldProps) => {
  const { themeConfig } = useAppTheme();
  return (
    <Box>
      <Text size='xs' c={themeConfig.mutedTextColor}>
        {label}
      </Text>
      <Text fw={400} c={themeConfig.color}>
        {value || '—'}
      </Text>
    </Box>
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => {
  const { themeConfig } = useAppTheme();
  return (
    <Text fw={600} mb='xs' c={themeConfig.mutedTextColor}>
      {children}
    </Text>
  );
};

/** Read-only summary of an employee's employment, personal and ID details. */
const EmployeeInfoCard = ({ employee }: { employee: EmployeeInterface }) => (
  <Paper withBorder p='md' mb='xl'>
    <Stack gap='md'>
      <Box>
        <SectionLabel>Employment Details</SectionLabel>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Field label='Employee ID' value={employee.employeeId} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Field
              label='Role'
              value={
                <Text tt='capitalize' fw={400} inherit>
                  {employee.userRole}
                </Text>
              }
            />
          </Grid.Col>
        </Grid>
      </Box>

      <Divider />

      <Box>
        <SectionLabel>Personal Information</SectionLabel>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Field
              label='Date of Birth'
              value={formatDate(employee.dateOfBirth)}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Field label='Email' value={employee.email} />
          </Grid.Col>
        </Grid>
      </Box>

      <Divider />

      <Box>
        <SectionLabel>Identification Details</SectionLabel>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Field label='PAN' value={employee.panCardNumber} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Field label='Aadhar Number' value={employee.aadharNumber} />
          </Grid.Col>
        </Grid>
      </Box>
    </Stack>
  </Paper>
);

export default EmployeeInfoCard;
