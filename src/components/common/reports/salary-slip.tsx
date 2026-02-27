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
  Grid,
  Alert,
  Badge,
  ThemeIcon
} from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import {
  IconCalendar,
  IconDownload,
  IconFileText,
  IconSearch,
  IconInfoCircle,
  IconAlertCircle,
  IconFileOff,
  IconCheck
} from '@tabler/icons-react';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { themeAtom } from '../../../atoms/theme';
import { getThemeConfig } from '../../../utils/common/theme-utils';
import { useMediaQuery } from '@mantine/hooks';
import { userDetailsAtom } from '../../../atoms/user';
import { downloadSalarySlip } from '../../../services/common-services';

// ─── API ─────────────────────────────────────────────────────────────────────

interface SalarySlipResponse {
  success: boolean;
  message: string;
  data?: {
    downloadUrl: string;
    fileName: string;
  };
}

type FetchState = 'idle' | 'loading' | 'success' | 'not_found' | 'error';

const MONTH_ABBR = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const SalarySlipReport = () => {
  const [month, setMonth] = useState<Date | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);
  const currentThemeConfig = useMemo(
    () => getThemeConfig(organizationConfig, isDarkTheme),
    [organizationConfig, isDarkTheme]
  );
  const isMobile = useMediaQuery('(max-width: 768px)');
  const user = useRecoilValue(userDetailsAtom);

  const handleShow = async () => {
    if (!month) return;

    setPdfUrl(null);
    setFileName(null);
    setFetchState('loading');
    setErrorMessage('');

    try {
      const result = await downloadSalarySlip({
        mongoId: user.id,
        fullName: `${user.firstName} ${user.lastName}`,
        month: MONTH_ABBR[month.getMonth()],
        year: String(month.getFullYear())
      });

      if (result.success && result.data?.downloadUrl) {
        setPdfUrl(result.data.downloadUrl);
        setFileName(result.data.fileName ?? null);
        setFetchState('success');
      } else {
        // API returned success:false — treat as "not found"
        setFetchState('not_found');
        setErrorMessage(
          result.message ?? 'Salary slip not found for this period.'
        );
      }
    } catch (err: any) {
      // Network / server error
      setFetchState('error');
      setErrorMessage(
        err?.message ?? 'Something went wrong. Please try again.'
      );
    }
  };

  const handleDownload = () => {
    if (pdfUrl) window.open(pdfUrl, '_blank');
  };

  const formattedMonth = month?.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <Box style={{ minHeight: '100vh' }} py="xl" m="xl">
      <Container size="lg">
        <Stack gap="lg">
          {/* ── Header ─────────────────────────────────────────────── */}
          <Group
            justify="space-between"
            align={isMobile ? 'flex-start' : 'center'}
            wrap={isMobile ? 'wrap' : 'nowrap'}
            gap="md"
          >
            <div>
              <Group gap="xs" mb={4} align="center">
                <Title order={2} lts={-0.5}>
                  My Salary Slips
                </Title>
                {fetchState === 'success' && (
                  <Badge
                    color="green"
                    variant="light"
                    radius="sm"
                    leftSection={<IconCheck size={12} />}
                  >
                    Loaded
                  </Badge>
                )}
              </Group>
              <Text c={currentThemeConfig.mutedTextColor} fz="sm">
                Access and download your verified monthly earnings statements.
              </Text>
            </div>

            {fetchState === 'success' && pdfUrl && (
              <Button
                fullWidth={isMobile}
                leftSection={<IconDownload size={16} />}
                radius="md"
                variant="filled"
                onClick={handleDownload}
                style={{
                  backgroundColor: currentThemeConfig.button.color,
                  color: currentThemeConfig.button.textColor
                }}
              >
                Download {fileName ?? 'Statement'}
              </Button>
            )}
          </Group>

          {/* ── Body Grid ──────────────────────────────────────────── */}
          <Grid gutter="xl">
            {/* Left: Filters */}
            <Grid.Col span={{ base: 12, md: 4, lg: 3.8 }}>
              <Paper
                withBorder
                p={isMobile ? 'md' : 'lg'}
                radius="md"
                shadow="xs"
              >
                <Stack gap="lg">
                  <Group gap="xs">
                    <ThemeIcon
                      size="sm"
                      variant="light"
                      color={currentThemeConfig.accentColor}
                    >
                      <IconSearch size={14} />
                    </ThemeIcon>
                    <Text fw={600} fz="sm">
                      Pay Period
                    </Text>
                  </Group>

                  <Divider />

                  <MonthPickerInput
                    label="Month"
                    placeholder="Choose month"
                    leftSection={<IconCalendar size={16} stroke={1.5} />}
                    value={month}
                    maxDate={new Date()}
                    onChange={value => {
                      setMonth(value ? new Date(value) : null);
                      // Reset state when user picks a new month
                      setFetchState('idle');
                      setPdfUrl(null);
                    }}
                    radius="md"
                    size="md"
                    styles={{
                      input: {
                        backgroundColor:
                          currentThemeConfig.headerBackgroundColor,
                        color: currentThemeConfig.color,
                        borderColor: currentThemeConfig.borderColor
                      },
                      label: { color: currentThemeConfig.color }
                    }}
                  />

                  <Button
                    fullWidth
                    size="md"
                    radius="md"
                    loading={fetchState === 'loading'}
                    onClick={handleShow}
                    disabled={!month}
                    style={{
                      backgroundColor: currentThemeConfig.button.color,
                      color: currentThemeConfig.button.textColor
                    }}
                  >
                    View Salary Slip
                  </Button>

                  <Group gap={8} wrap="nowrap" align="flex-start">
                    <IconInfoCircle
                      size={15}
                      color={currentThemeConfig.mutedTextColor}
                      style={{ marginTop: 1, flexShrink: 0 }}
                    />
                    <Text fz="xs" c={currentThemeConfig.mutedTextColor}>
                      Salary slips are available after monthly payroll
                      processing is completed.
                    </Text>
                  </Group>
                </Stack>
              </Paper>
            </Grid.Col>

            {/* Right: Preview */}
            <Grid.Col span={{ base: 12, md: 8, lg: 8.2 }}>
              <Paper
                withBorder
                radius="md"
                shadow="xs"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: isMobile ? '60vh' : '80vh',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <LoadingOverlay
                  visible={fetchState === 'loading'}
                  overlayProps={{
                    blur: 2,
                    color: currentThemeConfig.backgroundColor + 'cc'
                  }}
                  loaderProps={{
                    type: 'bars',
                    color: currentThemeConfig.accentColor
                  }}
                />

                {/* ── IDLE state ── */}
                {fetchState === 'idle' && (
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
                        backgroundColor: currentThemeConfig.accentColor + '15'
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
                        Select a month and click "View Salary Slip" to see your
                        earnings breakdown.
                      </Text>
                    </Stack>
                  </Stack>
                )}

                {/* ── NOT FOUND state ── */}
                {fetchState === 'not_found' && (
                  <Stack
                    align="center"
                    justify="center"
                    flex={1}
                    gap="md"
                    py={isMobile ? 50 : 100}
                    px="xl"
                  >
                    <Box
                      p={20}
                      style={{
                        borderRadius: '50%',
                        backgroundColor: '#fd7e1415'
                      }}
                    >
                      <IconFileOff size={48} color="#fd7e14" stroke={1} />
                    </Box>
                    <Stack gap={4} align="center">
                      <Text fw={600} fz="lg">
                        No Salary Slip Found
                      </Text>
                      <Text
                        c={currentThemeConfig.mutedTextColor}
                        fz="sm"
                        maw={340}
                        ta="center"
                      >
                        {errorMessage ||
                          `We couldn't find a salary slip for ${formattedMonth}. It may not have been generated yet.`}
                      </Text>
                    </Stack>
                    <Alert
                      icon={<IconInfoCircle size={16} />}
                      color="orange"
                      variant="light"
                      radius="md"
                      maw={380}
                    >
                      <Text size="sm" c={currentThemeConfig.mutedTextColor}>
                        Salary slips are available after the completion of the
                        monthly payroll process.. If you believe this is an
                        error, please contact HR.
                      </Text>
                    </Alert>
                  </Stack>
                )}

                {/* ── ERROR state ── */}
                {fetchState === 'error' && (
                  <Stack
                    align="center"
                    justify="center"
                    flex={1}
                    gap="md"
                    py={isMobile ? 50 : 100}
                    px="xl"
                  >
                    <Alert
                      icon={<IconAlertCircle size={16} />}
                      title="Something went wrong"
                      color="red"
                      variant="light"
                      radius="md"
                      maw={400}
                    >
                      {errorMessage ||
                        'Salary slip not found for the specified month and year.'}
                    </Alert>
                    <Button
                      variant="outline"
                      color="red"
                      radius="md"
                      onClick={handleShow}
                      size="sm"
                    >
                      Retry
                    </Button>
                  </Stack>
                )}

                {/* ── SUCCESS state ── */}
                {fetchState === 'success' && pdfUrl && (
                  <Stack h="100%" gap={0} style={{ flex: 1 }}>
                    <Box
                      px="md"
                      py="sm"
                      style={{
                        borderBottom: `1px solid ${currentThemeConfig.borderColor}`,
                        backgroundColor:
                          currentThemeConfig.headerBackgroundColor
                      }}
                    >
                      <Group justify="space-between" align="center">
                        <Group gap="xs">
                          <IconFileText
                            size={15}
                            color={currentThemeConfig.accentColor}
                          />
                          <Text
                            fz="xs"
                            fw={600}
                            c={currentThemeConfig.mutedTextColor}
                            tt="uppercase"
                            lts={0.8}
                          >
                            Preview — {formattedMonth}
                          </Text>
                        </Group>
                        {fileName && (
                          <Text fz="xs" c={currentThemeConfig.mutedTextColor}>
                            {fileName}
                          </Text>
                        )}
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
