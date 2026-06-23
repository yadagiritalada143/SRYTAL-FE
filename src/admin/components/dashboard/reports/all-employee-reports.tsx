import { Container, Grid, Stack } from '@mantine/core';
import { IconArrowLeft, IconReportMoney } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAppTheme } from '@hooks/use-app-theme';
import { CommonButton } from '@components/common/button/CommonButton';
import PageHeader from '@components/common/page-header/PageHeader';
import { usePayroll } from './payroll/usePayroll';
import EmployeeListPanel from './payroll/EmployeeListPanel';
import PayslipPanel from './payroll/PayslipPanel';

const PayrollManagement = () => {
  const navigate = useNavigate();
  const { themeConfig } = useAppTheme();
  const {
    search,
    setSearch,
    isLoading,
    error,
    filteredEmployees,
    selectedEmployee,
    setSelectedEmployee,
    previewUrl,
    selectedMonth,
    setSelectedMonth,
    previewLoading,
    slipError
  } = usePayroll();

  return (
    <Container
      p='xl'
      size='lg'
      mt='xl'
      style={{
        backgroundColor: themeConfig.backgroundColor,
        transition: 'all 0.15s ease'
      }}
    >
      <Stack gap='xl'>
        <PageHeader
          title='Payroll Administration'
          subtitle='Manage salary processing and employee pay records.'
          icon={<IconReportMoney size={24} />}
          actions={
            <CommonButton
              leftSection={<IconArrowLeft size={16} />}
              onClick={() => navigate(-1)}
              variant='filled'
            >
              Back
            </CommonButton>
          }
        />

        <Grid gutter='xl'>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <EmployeeListPanel
              search={search}
              onSearchChange={setSearch}
              isLoading={isLoading}
              error={error}
              employees={filteredEmployees}
              selectedId={selectedEmployee?.id}
              onSelect={setSelectedEmployee}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 8 }}>
            <PayslipPanel
              employee={selectedEmployee}
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
              previewUrl={previewUrl}
              previewLoading={previewLoading}
              slipError={slipError}
            />
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
};

export default PayrollManagement;
