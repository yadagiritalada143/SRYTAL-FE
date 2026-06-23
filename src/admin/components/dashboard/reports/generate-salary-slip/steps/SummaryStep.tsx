import {
  Stack,
  Group,
  Title,
  Alert,
  Grid,
  Card,
  Text,
  Divider,
  rgba
} from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useAppTheme } from '@hooks/use-app-theme';
import { CommonButton } from '@components/common/button/CommonButton';
import { normalMonth } from '../utils';
import type { SalarySlipVM } from '../useSalarySlip';

const SummaryStep = ({ vm }: { vm: SalarySlipVM }) => {
  const { themeConfig, isDarkTheme } = useAppTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const {
    submit,
    daysInMonth,
    lopDays,
    empDetails,
    selectedMonth,
    payDate,
    transactionId,
    previewData,
    basic,
    hra,
    special,
    conveyance,
    medical,
    other,
    additionalAllowances,
    isGenerating,
    activeStep,
    prevStep
  } = vm;

  const dangerBorderColor = isDarkTheme
    ? themeConfig.dangerColor
    : themeConfig.lightDangerColor;

  const calc = previewData?.data?.calculations;

  return (
    <form onSubmit={submit}>
      <Stack mt='lg' gap='xl'>
        <Group justify='space-between' align='flex-end'>
          <div>
            <Title order={3}>Salary Slip Summary</Title>
          </div>
          <Alert
            icon={<IconAlertCircle size={16} />}
            title='Review Details'
            color={isDarkTheme ? 'cyan' : 'blue'}
            py={5}
            variant='light'
          />
        </Group>

        <Grid gutter='md'>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Card
              withBorder
              radius='md'
              p={isMobile ? 'xs' : 'sm'}
              ta='center'
              style={{ borderLeft: `4px solid ${themeConfig.accentColor}` }}
            >
              <Text
                size='xs'
                fw={700}
                tt='uppercase'
                c={themeConfig.accentColor}
              >
                Total Days
              </Text>
              <Text
                size={isMobile ? 'lg' : 'xl'}
                fw={800}
                c={themeConfig.accentColor}
              >
                {daysInMonth}
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Card
              withBorder
              radius='md'
              p={isMobile ? 'xs' : 'sm'}
              ta='center'
              style={{ borderLeft: `4px solid ${dangerBorderColor}` }}
            >
              <Text
                size='xs'
                fw={700}
                tt='uppercase'
                c={themeConfig.lightDangerColor}
              >
                LOP Days
              </Text>
              <Text
                size={isMobile ? 'lg' : 'xl'}
                fw={800}
                c={themeConfig.lightDangerColor}
              >
                {lopDays || 0}
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Card
              withBorder
              radius='md'
              p={isMobile ? 'xs' : 'sm'}
              ta='center'
              style={{ borderLeft: `4px solid ${themeConfig.successColor}` }}
            >
              <Text
                size='xs'
                fw={700}
                tt='uppercase'
                c={themeConfig.successColor}
              >
                Working Days
              </Text>
              <Text
                size={isMobile ? 'lg' : 'xl'}
                fw={800}
                c={themeConfig.successColor}
              >
                {Math.max((daysInMonth || 0) - (lopDays || 0), 0)}
              </Text>
            </Card>
          </Grid.Col>
        </Grid>

        <Grid gutter='xl'>
          {/* Employee details */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Card withBorder radius='md' p='lg' h='100%'>
              <Text fw={700} mb='md' size='sm' tt='uppercase'>
                Employee Details
              </Text>
              <Stack gap='xs'>
                <Group justify='space-between'>
                  <Text size='sm'>Name</Text>
                  <Text size='sm' fw={600}>
                    {empDetails.empName}
                  </Text>
                </Group>
                <Group justify='space-between'>
                  <Text size='sm'>Employee ID</Text>
                  <Text size='sm' fw={600}>
                    {empDetails.empId}
                  </Text>
                </Group>
                <Group justify='space-between'>
                  <Text size='sm'>Designation</Text>
                  <Text size='sm' fw={600}>
                    {empDetails.designation}
                  </Text>
                </Group>
                <Group justify='space-between'>
                  <Text size='sm'>Department</Text>
                  <Text size='sm' fw={600}>
                    {empDetails.department}
                  </Text>
                </Group>
                <Group justify='space-between'>
                  <Text size='sm'>Email</Text>
                  <Text size='sm' fw={600}>
                    {empDetails.email}
                  </Text>
                </Group>
                <Group justify='space-between'>
                  <Text size='sm'>Date of Birth</Text>
                  <Text size='sm' fw={600}>
                    {empDetails.dob}
                  </Text>
                </Group>
                <Group justify='space-between'>
                  <Text size='sm'>PAN</Text>
                  <Text size='sm' fw={600}>
                    {empDetails.pan}
                  </Text>
                </Group>
                <Divider my='xs' />
                <Group justify='space-between'>
                  <Text size='sm'>Pay Period</Text>
                  <Text size='sm' fw={700} c={themeConfig.accentColor}>
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
                <Group justify='space-between'>
                  <Text size='sm'>Pay Date</Text>
                  <Text size='sm' fw={600} c={themeConfig.accentColor}>
                    {payDate
                      ? new Date(payDate).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit'
                        })
                      : '-'}
                  </Text>
                </Group>
                <Group justify='space-between'>
                  <Text size='sm'>Transaction ID</Text>
                  <Text size='sm' fw={600} c={themeConfig.accentColor}>
                    {previewData?.data?.transactionId ?? transactionId ?? '-'}
                  </Text>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>

          {/* Salary breakdown */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Card
              withBorder
              radius='md'
              p='lg'
              style={{ backgroundColor: themeConfig.headerBackgroundColor }}
            >
              <Text fw={700} mb='md' size='sm' tt='uppercase'>
                Salary Breakdown
              </Text>
              <Stack gap='xs'>
                <Group justify='space-between'>
                  <Text size='sm'>Basic Salary</Text>
                  <Text size='sm' fw={600}>
                    ₹ {(calc?.basicSalary ?? basic).toFixed(2)}
                  </Text>
                </Group>
                <Group justify='space-between'>
                  <Text size='sm'>HRA</Text>
                  <Text size='sm' fw={600}>
                    ₹ {(calc?.hra ?? (basic * hra) / 100).toFixed(2)}
                  </Text>
                </Group>
                <Group justify='space-between'>
                  <Text size='sm'>Special Allowance</Text>
                  <Text size='sm' fw={600}>
                    ₹ {(calc?.specialAllowance ?? special).toFixed(2)}
                  </Text>
                </Group>
                <Group justify='space-between'>
                  <Text size='sm'>Conveyance</Text>
                  <Text size='sm' fw={600}>
                    ₹ {(calc?.conveyanceAllowance ?? conveyance).toFixed(2)}
                  </Text>
                </Group>
                <Group justify='space-between'>
                  <Text size='sm'>Medical</Text>
                  <Text size='sm' fw={600}>
                    ₹ {(calc?.medicalAllowance ?? medical).toFixed(2)}
                  </Text>
                </Group>
                <Group justify='space-between'>
                  <Text size='sm'>Other Allowances</Text>
                  <Text size='sm' fw={600}>
                    ₹ {(calc?.otherAllowances ?? other).toFixed(2)}
                  </Text>
                </Group>
              </Stack>

              <Group justify='space-between' pt='sm'>
                <Text size='sm' fw={600}>
                  Gross Salary:
                </Text>
                <Text size='sm' fw={700}>
                  ₹ {calc?.grossEarnings?.toFixed(2)}
                </Text>
              </Group>

              {(calc?.lossOfPayAmount ||
                calc?.professionalTax ||
                calc?.incomeTax ||
                calc?.otherDeductions) && (
                <>
                  <Divider my='xs' label='Deductions' labelPosition='center' />
                  {calc?.lossOfPayAmount && calc.lossOfPayAmount > 0 && (
                    <Group justify='space-between'>
                      <Text size='sm' c={themeConfig.lightDangerColor}>
                        LOP Deduction ({lopDays} days)
                      </Text>
                      <Text size='sm' fw={600} c={themeConfig.lightDangerColor}>
                        − ₹ {calc.lossOfPayAmount.toFixed(2)}
                      </Text>
                    </Group>
                  )}
                  {calc ? (
                    <>
                      {calc.providentFund > 0 && (
                        <Group justify='space-between'>
                          <Text>PF</Text>
                          <Text fw={600} c='red'>
                            − ₹ {calc.providentFund.toFixed(2)}
                          </Text>
                        </Group>
                      )}
                      {calc.professionalTax > 0 && (
                        <Group justify='space-between'>
                          <Text>Professional Tax</Text>
                          <Text fw={600} c='red'>
                            − ₹ {calc.professionalTax.toFixed(2)}
                          </Text>
                        </Group>
                      )}
                      {calc.incomeTax > 0 && (
                        <Group justify='space-between'>
                          <Text>Income Tax</Text>
                          <Text fw={600} c='red'>
                            − ₹ {calc.incomeTax.toFixed(2)}
                          </Text>
                        </Group>
                      )}
                      {calc.otherDeductions > 0 && (
                        <Group justify='space-between'>
                          <Text>Other Deductions</Text>
                          <Text fw={600} c='red'>
                            − ₹ {calc.otherDeductions.toFixed(2)}
                          </Text>
                        </Group>
                      )}
                    </>
                  ) : null}
                </>
              )}

              {/* Local additional allowances (shown only before a preview) */}
              {!previewData &&
                additionalAllowances.map((item, i) => (
                  <Group key={i} justify='space-between'>
                    <Text>
                      {item.label} ({item.type === 'deduct' ? '-' : '+'})
                    </Text>
                    <Text
                      fw={600}
                      c={item.type === 'deduct' ? 'red' : 'inherit'}
                    >
                      {item.type === 'deduct' ? '− ' : ''}₹ {item.amount}
                    </Text>
                  </Group>
                ))}

              <Card
                p='md'
                mt='md'
                radius='md'
                style={{
                  border: `1px dashed ${themeConfig.successColor}`,
                  backgroundColor: rgba(themeConfig.successColor, 0.2)
                }}
              >
                <Group justify='space-between'>
                  <Text fw={700} c={themeConfig.successColor}>
                    Net Payable
                  </Text>
                  <Text fw={800} size='xl' c={themeConfig.successColor}>
                    ₹ {(calc?.netPay ?? 0).toFixed(2)}
                  </Text>
                </Group>
              </Card>
            </Card>
          </Grid.Col>
        </Grid>

        <Divider mt='xl' />
        <Group justify='space-between' pb='md'>
          <CommonButton
            variant='subtle'
            color='gray'
            onClick={prevStep}
            disabled={activeStep === 3}
          >
            Back
          </CommonButton>

          <CommonButton
            type='submit'
            loading={isGenerating}
            leftSection={activeStep === 3 ? <IconCheck size={16} /> : null}
          >
            {activeStep === 3
              ? 'Salary Slip Generated'
              : 'Download Salary Slip'}
          </CommonButton>
        </Group>
      </Stack>
    </form>
  );
};

export default SummaryStep;
