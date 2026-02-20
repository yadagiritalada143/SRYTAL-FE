import { useMemo, useState } from 'react';
import {
  Container,
  Paper,
  Title,
  Group,
  Button,
  Stack,
  Text,
  Box,
  LoadingOverlay,
  Divider,
  Grid
} from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import {
  IconCalendar,
  IconDownload,
  IconFileText,
  IconSearch,
  IconInfoCircle
} from '@tabler/icons-react';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { themeAtom } from '../../../atoms/theme';
import { getThemeConfig } from '../../../utils/common/theme-utils';
import { useMediaQuery } from '@mantine/hooks';

const SalarySlipReport = () => {
  const [month, setMonth] = useState<Date | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);
  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleShow = () => {
    if (!month) return;
    setLoading(true);
    setTimeout(() => {
      setPdfUrl('/sample.pdf');
      setLoading(false);
    }, 2000);
  };

  return (
    <Box style={{ minHeight: '100vh' }} py="xl">
      <Container size="lg">
        <Stack gap="lg">
          {/* Header */}
          <Group
            justify="space-between"
            align={isMobile ? 'flex-start' : 'center'}
            wrap={isMobile ? 'wrap' : 'nowrap'}
            gap="md"
          >
            <div>
              <Group gap="xs" mb={4}>
                <Title order={2} lts={-0.5}>
                  My Salary Slips
                </Title>
              </Group>
              <Text c={currentThemeConfig.mutedTextColor} fz="sm">
                Access and download your verified monthly earnings statements.
              </Text>
            </div>

            {pdfUrl && (
              <Group gap="sm" style={{ width: isMobile ? '100%' : 'auto' }}>
                <Button
                  fullWidth={isMobile}
                  leftSection={<IconDownload size={18} />}
                  radius="md"
                  onClick={() => window.open(pdfUrl)}
                  style={{
                    backgroundColor: currentThemeConfig.button.color,
                    color: currentThemeConfig.button.textColor
                  }}
                >
                  Download Statement
                </Button>
              </Group>
            )}
          </Group>
          <Grid gutter="xl">
            {/* Left Column */}
            <Grid.Col span={{ base: 12, md: 4, lg: 3.8 }}>
              <Stack gap="md">
                <Paper
                  withBorder
                  p={isMobile ? 'md' : 'lg'}
                  radius="md"
                  shadow="sm"
                >
                  <Stack gap="lg">
                    <Group gap="xs">
                      <IconSearch
                        size={18}
                        color={currentThemeConfig.accentColor}
                      />
                      <Text fw={700} fz="sm">
                        Pay Period
                      </Text>
                    </Group>

                    <Divider />

                    <MonthPickerInput
                      label="Month"
                      placeholder="Choose month"
                      leftSection={<IconCalendar size={18} stroke={1.5} />}
                      value={month}
                      onChange={value =>
                        setMonth(value ? new Date(value) : null)
                      }
                      radius="md"
                      size="md"
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
                    />

                    <Button
                      fullWidth
                      size="md"
                      radius="md"
                      loading={loading}
                      onClick={handleShow}
                      disabled={!month}
                      style={{
                        backgroundColor: currentThemeConfig.button.color,
                        color: currentThemeConfig.button.textColor
                      }}
                    >
                      View Salary Slip
                    </Button>

                    <Group gap={8} wrap="nowrap">
                      <IconInfoCircle
                        size={16}
                        color={currentThemeConfig.mutedTextColor}
                      />
                      <Text fz="xs" c={currentThemeConfig.mutedTextColor}>
                        Salary slips are typically available after the 25th of
                        each month.
                      </Text>
                    </Group>
                  </Stack>
                </Paper>
              </Stack>
            </Grid.Col>

            {/* Right Column */}
            <Grid.Col span={{ base: 12, md: 8, lg: 8.2 }}>
              <Paper
                withBorder
                radius="md"
                shadow="sm"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: isMobile ? '60vh' : '80vh',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <LoadingOverlay
                  visible={loading}
                  overlayProps={{
                    blur: 1,
                    color: currentThemeConfig.backgroundColor + 'cc'
                  }}
                  loaderProps={{
                    type: 'bars',
                    color: currentThemeConfig.accentColor
                  }}
                />

                {!pdfUrl && !loading ? (
                  <Stack
                    align="center"
                    justify="center"
                    flex={1}
                    gap="md"
                    py={isMobile ? 50 : 100}
                  >
                    <Box
                      p={20}
                      style={{
                        borderRadius: '50%',
                        backgroundColor: currentThemeConfig.accentColor + '20'
                      }}
                    >
                      <IconFileText
                        size={48}
                        color={currentThemeConfig.accentColor}
                        stroke={1}
                      />
                    </Box>
                    <Stack gap={4} align="center">
                      <Text fw={600} fz="lg">
                        No Statement Selected
                      </Text>
                      <Text
                        c={currentThemeConfig.mutedTextColor}
                        fz="sm"
                        maw={300}
                        ta="center"
                      >
                        Select a month from the sidebar to view your detailed
                        salary breakdown.
                      </Text>
                    </Stack>
                  </Stack>
                ) : (
                  <Stack h="100%" gap={0} style={{ flex: 1 }}>
                    <Box
                      p="sm"
                      style={{
                        borderBottom: `1px solid ${currentThemeConfig.borderColor}`
                      }}
                    >
                      <Group justify="space-between">
                        <Text
                          fz="xs"
                          fw={700}
                          c={currentThemeConfig.mutedTextColor}
                          tt="uppercase"
                          lts={1}
                        >
                          Live Preview:{' '}
                          {month?.toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric'
                          })}
                        </Text>
                      </Group>
                    </Box>
                    <iframe
                      src={`${pdfUrl}#toolbar=0&navpanes=0`}
                      width="100%"
                      height="100%"
                      style={{
                        border: 'none',
                        flexGrow: 1,
                        minHeight: '500px'
                      }}
                      title="Salary Slip"
                    />
                  </Stack>
                )}
              </Paper>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default SalarySlipReport;
