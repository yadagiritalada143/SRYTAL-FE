import { Container, Card, Title, Text, Group, Box, rgba } from '@mantine/core';
import '@mantine/dates/styles.css';
import { useMediaQuery } from '@mantine/hooks';
import { IconReceipt2 } from '@tabler/icons-react';
import DynamicStepper from '@common/reports-salary-slip/dynamicstepper';
import GlobalLoader from '@UI/Loaders/GlobalLoader';
import { useAppTheme } from '@hooks/use-app-theme';
import { useSalarySlip } from './generate-salary-slip/useSalarySlip';
import { STEPS_CONFIG } from './generate-salary-slip/constants';
import EmployeeInfoStep from './generate-salary-slip/steps/EmployeeInfoStep';
import SalaryCalculationStep from './generate-salary-slip/steps/SalaryCalculationStep';
import SummaryStep from './generate-salary-slip/steps/SummaryStep';
import CompletedStep from './generate-salary-slip/steps/CompletedStep';

const GenerateSalarySlipReport = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { themeConfig } = useAppTheme();
  const vm = useSalarySlip();

  return (
    <Container size='lg' py='xl' px='sm' mt='xl'>
      <GlobalLoader visible={vm.isPreviewLoading} />
      <Card
        shadow='sm'
        radius='lg'
        p={isMobile ? 'md' : 'xl'}
        withBorder
        style={{ borderColor: themeConfig.borderColor }}
      >
        <Group justify='center' gap='sm' mb='xs'>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: 12,
              color: themeConfig.accentColor,
              backgroundColor: rgba(themeConfig.accentColor, 0.14)
            }}
          >
            <IconReceipt2 size={24} />
          </Box>
          <Title order={2}>Generate Salary Slip</Title>
        </Group>
        <Text ta='center' c={themeConfig.mutedTextColor} mb='xl'>
          Generate and download a salary slip in three simple steps.
        </Text>
        <DynamicStepper steps={STEPS_CONFIG} active={vm.activeStep}>
          {[
            <EmployeeInfoStep key='step1' vm={vm} />,
            <SalaryCalculationStep key='step2' vm={vm} />,
            <SummaryStep key='step3' vm={vm} />,
            <CompletedStep key='completed' />
          ]}
        </DynamicStepper>
      </Card>
    </Container>
  );
};

export default GenerateSalarySlipReport;
