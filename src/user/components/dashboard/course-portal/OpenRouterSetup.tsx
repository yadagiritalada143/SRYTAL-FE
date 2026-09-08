import React, { useState } from 'react';
import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip
} from '@mantine/core';
import {
  IconAlertTriangle,
  IconArrowLeft,
  IconArrowRight,
  IconBrandGoogle,
  IconBriefcase,
  IconBuilding,
  IconCheck,
  IconConfetti,
  IconCopy,
  IconCreditCardOff,
  IconDashboard,
  IconExternalLink,
  IconFileText,
  IconInfoCircle,
  IconKey,
  IconLogin,
  IconMessageQuestion,
  IconPointer,
  IconRobot,
  IconShieldLock,
  IconSparkles,
  IconUser,
  IconUserCheck
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { useCustomToast } from '@utils/common/toast';
import { useSaveUserOpenRouterKey } from '@hooks/mutations/useUserMutations';

export const OPENROUTER_API_KEY_STORAGE = 'openrouter_api_key';

export interface OpenRouterSetupProps {
  onKeySaved: (key: string) => void;
  onCancel?: () => void;
  currentApiKey?: string;
}

interface StepItem {
  number: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  details: React.ReactNode;
  badge?: string;
}

export const OpenRouterSetup: React.FC<OpenRouterSetupProps> = ({
  onKeySaved,
  onCancel,
  currentApiKey = ''
}) => {
  const { isDarkTheme, appColors: colors } = useAppTheme();
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const saveKeyMutation = useSaveUserOpenRouterKey();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [apiKeyInput, setApiKeyInput] = useState<string>(currentApiKey);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [viewMode, setViewMode] = useState<'stepper' | 'overview'>('stepper');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [copiedMock, setCopiedMock] = useState<boolean>(false);
  const [selectedSurveyOption, setSelectedSurveyOption] = useState<string>(
    'Friend or Colleague'
  );

  const defaultBtnStyle: React.CSSProperties = colors.buttonDefault;

  const handleCopyMockKey = () => {
    setCopiedMock(true);
    showSuccessToast('Sample key format copied to clipboard!');
    setTimeout(() => setCopiedMock(false), 2500);
  };

  const steps: StepItem[] = [
    {
      number: 1,
      title: 'Open OpenRouter',
      subtitle: 'Visit the official OpenRouter website',
      icon: <IconExternalLink size={20} />,
      color: 'blue',
      badge: 'Step 1 • Portal',
      details: (
        <Stack gap='sm'>
          <Text size='sm' c={colors.secondaryText} style={{ lineHeight: 1.6 }}>
            Open a modern web browser (Google Chrome, Microsoft Edge, or Mozilla
            Firefox) and search for <strong>OpenRouter</strong>, or click the
            direct launch button below:
          </Text>
          <Group gap='sm' wrap='wrap' mt='xs'>
            <Button
              component='a'
              href='https://openrouter.ai/'
              target='_blank'
              rel='noopener noreferrer'
              leftSection={<IconExternalLink size={15} />}
              size='sm'
              radius='md'
              className='btn-modern'
              style={{
                background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                color: '#ffffff',
                border: 'none',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)'
              }}
            >
              Open OpenRouter (openrouter.ai)
            </Button>
            <Badge
              variant='outline'
              color='blue'
              size='sm'
              radius='md'
              style={{ textTransform: 'none' }}
            >
              openrouter.ai
            </Badge>
          </Group>
        </Stack>
      )
    },
    {
      number: 2,
      title: 'Click on "Get API Key"',
      subtitle: 'Start your account registration or sign-in',
      icon: <IconKey size={20} />,
      color: 'indigo',
      badge: 'Step 2 • Action',
      details: (
        <Stack gap='sm'>
          <Text size='sm' c={colors.secondaryText} style={{ lineHeight: 1.6 }}>
            On the OpenRouter homepage, locate and click the prominent{' '}
            <strong style={{ color: colors.primaryIndigoLight }}>
              "Get API Key"
            </strong>{' '}
            button situated in the top navigation header or hero section.
          </Text>
          <Paper
            withBorder
            p='sm'
            radius='md'
            style={{
              backgroundColor: colors.cardSurface,
              borderColor: colors.cardBorder
            }}
          >
            <Group gap='sm' wrap='nowrap'>
              <ThemeIcon
                size={32}
                radius='md'
                variant='light'
                color='indigo'
                style={{ flexShrink: 0 }}
              >
                <IconInfoCircle size={18} />
              </ThemeIcon>
              <div>
                <Text size='xs' fw={600} c={colors.primaryText}>
                  Instant Sign-In Prompt
                </Text>
                <Text size='xs' c={colors.mutedText} mt={2}>
                  Clicking this automatically opens the secure authentication
                  modal to sign in or create your new account.
                </Text>
              </div>
            </Group>
          </Paper>
        </Stack>
      )
    },
    {
      number: 3,
      title: 'Sign In to OpenRouter',
      subtitle: 'Choose your preferred authentication method',
      icon: <IconLogin size={20} />,
      color: 'teal',
      badge: 'Step 3 • Auth',
      details: (
        <Stack gap='sm'>
          <Text size='sm' c={colors.secondaryText} style={{ lineHeight: 1.6 }}>
            You can sign in using either of the following two standard
            authentication options:
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='sm'>
            <Paper
              withBorder
              p='sm'
              radius='md'
              style={{
                backgroundColor: colors.cardSurface,
                borderColor: colors.cardBorder
              }}
            >
              <Group gap='sm' wrap='nowrap'>
                <ThemeIcon color='blue' variant='light' size={34} radius='md'>
                  <IconUser size={18} />
                </ThemeIcon>
                <div>
                  <Text size='xs' fw={700} c={colors.primaryText}>
                    Option A: Email Address
                  </Text>
                  <Text size='xs' c={colors.mutedText} mt={2}>
                    Enter your email to receive a magic link or verification
                    code.
                  </Text>
                </div>
              </Group>
            </Paper>

            <Paper
              withBorder
              p='sm'
              radius='md'
              style={{
                backgroundColor: colors.cardSurface,
                borderColor: '#ea4335',
                borderWidth: 1.5
              }}
            >
              <Group gap='sm' wrap='nowrap'>
                <ThemeIcon color='red' variant='light' size={34} radius='md'>
                  <IconBrandGoogle size={18} />
                </ThemeIcon>
                <div>
                  <Text size='xs' fw={700} c={colors.primaryText}>
                    Option B: Continue with Google
                  </Text>
                  <Text size='xs' c={colors.mutedText} mt={2}>
                    Click <strong>"Continue with Google"</strong> for instant
                    sign-in.
                  </Text>
                </div>
              </Group>
            </Paper>
          </SimpleGrid>
        </Stack>
      )
    },
    {
      number: 4,
      title: 'Continue With Your Account',
      subtitle: 'Confirm your email selection',
      icon: <IconUserCheck size={20} />,
      color: 'cyan',
      badge: 'Step 4 • Verify',
      details: (
        <Stack gap='sm'>
          <Text size='sm' c={colors.secondaryText} style={{ lineHeight: 1.6 }}>
            After clicking Continue, Google or OpenRouter will ask you to select
            or confirm your active account. Select your desired email address
            and confirm to authenticate.
          </Text>
          <Paper
            withBorder
            p='sm'
            radius='md'
            style={{
              backgroundColor: colors.cardSurface,
              borderColor: colors.cardBorder
            }}
          >
            <Group gap='xs'>
              <ThemeIcon color='cyan' variant='light' size={28} radius='xl'>
                <IconCheck size={16} />
              </ThemeIcon>
              <Text size='xs' fw={600} c={colors.primaryText}>
                No complicated password setup required when continuing with
                Google.
              </Text>
            </Group>
          </Paper>
        </Stack>
      )
    },
    {
      number: 5,
      title: 'Accept the Legal Terms',
      subtitle: 'Review Terms of Service & Privacy Policy',
      icon: <IconFileText size={20} />,
      color: 'grape',
      badge: 'Step 5 • Legal',
      details: (
        <Stack gap='sm'>
          <Text size='sm' c={colors.secondaryText} style={{ lineHeight: 1.6 }}>
            OpenRouter will present their standard terms and user agreement.
            Please review:
          </Text>
          <Group gap='xs' wrap='wrap'>
            <Badge
              variant='outline'
              color='gray'
              size='sm'
              radius='sm'
              style={{ textTransform: 'none' }}
            >
              📄 Terms of Service
            </Badge>
            <Badge
              variant='outline'
              color='gray'
              size='sm'
              radius='sm'
              style={{ textTransform: 'none' }}
            >
              🔒 Privacy Policy
            </Badge>
          </Group>
          <Text size='xs' c={colors.secondaryText}>
            Check the required agreement checkboxes and click the{' '}
            <strong style={{ color: colors.primaryIndigoLight }}>
              "Continue"
            </strong>{' '}
            button.
          </Text>
        </Stack>
      )
    },
    {
      number: 6,
      title: 'Select Your Workspace Type',
      subtitle: 'Choose "Individual" for personal learning',
      icon: <IconBriefcase size={20} />,
      color: 'violet',
      badge: 'Step 6 • Workspace',
      details: (
        <Stack gap='sm'>
          <Text size='sm' c={colors.secondaryText} style={{ lineHeight: 1.6 }}>
            You will be prompted to select your workspace type. Choose{' '}
            <strong>Individual</strong> for personal study and course exercises:
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='sm'>
            <Paper
              withBorder
              p='md'
              radius='md'
              style={{
                borderColor: colors.primaryIndigo,
                borderWidth: 2,
                backgroundColor: isDarkTheme
                  ? 'rgba(79, 70, 229, 0.15)'
                  : 'rgba(238, 242, 255, 0.95)',
                boxShadow: '0 2px 10px rgba(79, 70, 229, 0.1)'
              }}
            >
              <Group justify='space-between' align='center' mb='xs'>
                <Group gap='xs'>
                  <ThemeIcon
                    color='violet'
                    variant='filled'
                    size={30}
                    radius='md'
                  >
                    <IconUser size={16} />
                  </ThemeIcon>
                  <Text size='sm' fw={700} c={colors.primaryText}>
                    Individual
                  </Text>
                </Group>
                <Badge color='green' variant='filled' size='xs'>
                  Recommended
                </Badge>
              </Group>
              <Text
                size='xs'
                c={colors.secondaryText}
                style={{ lineHeight: 1.4 }}
              >
                Select <strong>Individual</strong> for personal development,
                course assignments, and free LLM models.
              </Text>
            </Paper>

            <Paper
              withBorder
              p='md'
              radius='md'
              style={{
                backgroundColor: colors.cardSurface,
                borderColor: colors.cardBorder,
                opacity: 0.85
              }}
            >
              <Group gap='xs' mb='xs'>
                <ThemeIcon color='gray' variant='light' size={30} radius='md'>
                  <IconBuilding size={16} />
                </ThemeIcon>
                <Text size='sm' fw={600} c={colors.primaryText}>
                  Organization
                </Text>
              </Group>
              <Text size='xs' c={colors.mutedText} style={{ lineHeight: 1.4 }}>
                Reserved for multi-seat enterprise teams and corporate billing.
              </Text>
            </Paper>
          </SimpleGrid>
          <Text size='xs' c={colors.mutedText}>
            Click <strong>Next</strong> after selecting{' '}
            <strong>Individual</strong>.
          </Text>
        </Stack>
      )
    },
    {
      number: 7,
      title: 'Your Workspace is Ready — Copy API Key',
      subtitle: 'Copy and safely store your secret key immediately',
      icon: <IconCopy size={20} />,
      color: 'teal',
      badge: 'Step 7 • Key Generated',
      details: (
        <Stack gap='sm'>
          <Text size='sm' c={colors.secondaryText} style={{ lineHeight: 1.6 }}>
            Immediately after choosing your workspace, OpenRouter displays{' '}
            <strong style={{ color: colors.emeraldGreen }}>
              "Your workspace is ready"
            </strong>{' '}
            along with your freshly generated <strong>API key</strong>!
          </Text>

          <Paper
            withBorder
            p='md'
            radius='lg'
            style={{
              background: isDarkTheme
                ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(15, 23, 42, 0.95))'
                : 'linear-gradient(135deg, #f0fdf4, #ffffff)',
              borderColor: isDarkTheme ? '#059669' : '#86efac',
              boxShadow: '0 4px 16px rgba(16, 185, 129, 0.1)'
            }}
          >
            <Stack gap='xs'>
              <Group justify='space-between' align='center'>
                <Group gap={6}>
                  <Box
                    w={8}
                    h={8}
                    style={{ borderRadius: '50%', backgroundColor: '#ef4444' }}
                  />
                  <Box
                    w={8}
                    h={8}
                    style={{ borderRadius: '50%', backgroundColor: '#f59e0b' }}
                  />
                  <Box
                    w={8}
                    h={8}
                    style={{ borderRadius: '50%', backgroundColor: '#10b981' }}
                  />
                  <Text size='xs' fw={700} c={colors.emeraldGreen} ml={4}>
                    Dialog: "Your workspace is ready"
                  </Text>
                </Group>
                <Badge color='teal' variant='filled' size='xs'>
                  Active Key
                </Badge>
              </Group>

              <Text size='xs' c={colors.secondaryText}>
                Your secret API key is shown on this screen. Click copy right
                now:
              </Text>

              <Paper
                withBorder
                p='xs'
                radius='md'
                style={{
                  backgroundColor: colors.codeBoxBg,
                  borderColor: '#334155'
                }}
              >
                <Group
                  justify='space-between'
                  align='center'
                  wrap='wrap'
                  gap='xs'
                >
                  <Text
                    ff='monospace'
                    size='xs'
                    fw={600}
                    c='#38bdf8'
                    style={{ wordBreak: 'break-all', flex: 1 }}
                  >
                    sk-or-v1-8492048f3b92ec1094da510c...
                  </Text>
                  <Tooltip label='Test sample copy' withArrow>
                    <Button
                      size='xs'
                      variant='filled'
                      color='teal'
                      radius='md'
                      leftSection={
                        copiedMock ? (
                          <IconCheck size={12} />
                        ) : (
                          <IconCopy size={12} />
                        )
                      }
                      onClick={handleCopyMockKey}
                      style={{
                        padding: '4px 10px',
                        height: 28,
                        boxShadow: '0 2px 6px rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      {copiedMock ? 'Copied!' : 'Copy Key'}
                    </Button>
                  </Tooltip>
                </Group>
              </Paper>

              <Group justify='flex-end' mt={4}>
                <Badge
                  color='blue'
                  variant='light'
                  size='xs'
                  rightSection={<IconArrowRight size={10} />}
                >
                  Then Click "Continue" in OpenRouter
                </Badge>
              </Group>
            </Stack>
          </Paper>

          <Alert
            icon={<IconAlertTriangle size={18} />}
            title='Security Best Practice'
            color='yellow'
            radius='md'
            p='xs'
          >
            <Text size='xs'>
              <strong>Caution:</strong> Copy this API key now and keep it safe.
              Never share your API key publicly or commit it to GitHub.
            </Text>
          </Alert>
        </Stack>
      )
    },
    {
      number: 8,
      title: 'Add a Payment Method — Click "I will do it later"',
      subtitle: 'Free models require no credit card or payment details',
      icon: <IconCreditCardOff size={20} />,
      color: 'orange',
      badge: 'Step 8 • Skip Payment',
      details: (
        <Stack gap='sm'>
          <Text size='sm' c={colors.secondaryText} style={{ lineHeight: 1.6 }}>
            Next, OpenRouter presents the{' '}
            <strong style={{ color: colors.amberOrange }}>
              "Add a payment method"
            </strong>{' '}
            page requesting Full Name, Country, and Billing Address.
          </Text>

          <Paper
            withBorder
            p='md'
            radius='lg'
            style={{
              background: isDarkTheme
                ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(15, 23, 42, 0.95))'
                : 'linear-gradient(135deg, #fffbeb, #ffffff)',
              borderColor: isDarkTheme ? '#d97706' : '#fde68a',
              boxShadow: '0 4px 16px rgba(245, 158, 11, 0.1)'
            }}
          >
            <Stack gap='xs'>
              <Group justify='space-between' align='center'>
                <Group gap={6}>
                  <ThemeIcon
                    color='orange'
                    variant='light'
                    size={26}
                    radius='xl'
                  >
                    <IconCreditCardOff size={15} />
                  </ThemeIcon>
                  <Text fw={700} size='xs' c={colors.amberOrange}>
                    Screen: "Add a payment method"
                  </Text>
                </Group>
                <Badge color='green' variant='filled' size='xs'>
                  $0 Free Models
                </Badge>
              </Group>

              <Text size='xs' c={colors.secondaryText}>
                Billing details are completely optional for learning. You can{' '}
                <strong>skip this immediately</strong>:
              </Text>

              <Paper
                withBorder
                p='xs'
                radius='md'
                style={{
                  backgroundColor: colors.cardSurface,
                  borderColor: colors.cardBorder
                }}
              >
                <Stack gap={6}>
                  <Text size='xs' c={colors.mutedText}>
                    Form fields: Full Name • Country • Address (Optional)
                  </Text>
                  <Divider my={2} />
                  <Group
                    justify='space-between'
                    align='center'
                    wrap='wrap'
                    gap='xs'
                  >
                    <Group gap={4}>
                      <IconPointer
                        size={16}
                        color='#f59e0b'
                        className='attention-bounce'
                      />
                      <Text size='xs' fw={700} c={colors.amberOrange}>
                        Action on OpenRouter:
                      </Text>
                    </Group>

                    <Button
                      size='xs'
                      color='orange'
                      variant='filled'
                      radius='md'
                      className='pulse-amber-btn'
                      style={{
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        color: '#ffffff',
                        fontWeight: 700,
                        height: 28,
                        padding: '4px 12px'
                      }}
                    >
                      "I will do it later"
                    </Button>
                  </Group>
                </Stack>
              </Paper>
            </Stack>
          </Paper>

          <Alert
            icon={<IconInfoCircle size={18} />}
            title='No Credit Card Required'
            color='teal'
            radius='md'
            p='xs'
          >
            <Text size='xs'>
              OpenRouter's free tier models operate with $0 balance. Simply
              click <strong>"I will do it later"</strong> to bypass payment.
            </Text>
          </Alert>
        </Stack>
      )
    },
    {
      number: 9,
      title: 'Survey: "Where did you first hear about OpenRouter?"',
      subtitle: 'Select any option and click Continue',
      icon: <IconMessageQuestion size={20} />,
      color: 'indigo',
      badge: 'Step 9 • Quick Survey',
      details: (
        <Stack gap='sm'>
          <Text size='sm' c={colors.secondaryText} style={{ lineHeight: 1.6 }}>
            OpenRouter will present a quick one-question onboarding survey:{' '}
            <strong style={{ color: colors.primaryIndigoLight }}>
              "Where did you first hear about OpenRouter?"
            </strong>
            .
          </Text>

          <Paper
            withBorder
            p='md'
            radius='lg'
            style={{
              background: isDarkTheme
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(15, 23, 42, 0.95))'
                : 'linear-gradient(135deg, #f5f3ff, #ffffff)',
              borderColor: isDarkTheme ? '#4f46e5' : '#c7d2fe',
              boxShadow: '0 4px 16px rgba(99, 102, 241, 0.1)'
            }}
          >
            <Stack gap='xs'>
              <Group justify='space-between' align='center'>
                <Group gap={6}>
                  <ThemeIcon
                    color='indigo'
                    variant='light'
                    size={26}
                    radius='xl'
                  >
                    <IconMessageQuestion size={15} />
                  </ThemeIcon>
                  <Text fw={700} size='xs' c={colors.primaryIndigoLight}>
                    Survey: Where did you first hear about OpenRouter?
                  </Text>
                </Group>
                <Badge color='indigo' variant='light' size='xs'>
                  Pick Any
                </Badge>
              </Group>

              <Text size='xs' c={colors.mutedText}>
                Select any choice you prefer (click to preview):
              </Text>

              <Group gap={6} wrap='wrap'>
                {[
                  'Search Engine (Google)',
                  'Friend or Colleague',
                  'Social Media (Twitter/X)',
                  'Training / Course',
                  'Other'
                ].map(opt => {
                  const isSelected = selectedSurveyOption === opt;
                  return (
                    <Badge
                      key={opt}
                      size='sm'
                      variant={isSelected ? 'filled' : 'outline'}
                      color='indigo'
                      radius='md'
                      style={{
                        cursor: 'pointer',
                        padding: '6px 10px',
                        textTransform: 'none',
                        fontWeight: isSelected ? 700 : 500,
                        transition: 'all 0.15s ease'
                      }}
                      onClick={() => setSelectedSurveyOption(opt)}
                    >
                      {isSelected ? `✓ ${opt}` : opt}
                    </Badge>
                  );
                })}
              </Group>

              <Group justify='flex-end' mt={4}>
                <Button
                  size='xs'
                  variant='filled'
                  color='indigo'
                  radius='md'
                  rightSection={<IconArrowRight size={12} />}
                  style={{ height: 26, padding: '2px 10px' }}
                >
                  Click: "Continue"
                </Button>
              </Group>
            </Stack>
          </Paper>

          <Text size='xs' c={colors.mutedText}>
            After making your selection, click <strong>"Continue"</strong> to
            advance to the final screen.
          </Text>
        </Stack>
      )
    },
    {
      number: 10,
      title: 'You\'re All Set! — Click "Go to dashboard"',
      subtitle: 'Complete workspace creation and enter your account',
      icon: <IconConfetti size={20} />,
      color: 'grape',
      badge: 'Step 10 • All Set!',
      details: (
        <Stack gap='sm'>
          <Text size='sm' c={colors.secondaryText} style={{ lineHeight: 1.6 }}>
            OpenRouter will display the celebration screen:{' '}
            <strong style={{ color: colors.purpleViolet }}>
              "You're all set!"
            </strong>
            .
          </Text>

          <Paper
            withBorder
            p='md'
            radius='lg'
            className='celebration-card'
            style={{
              background: isDarkTheme
                ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(99, 102, 241, 0.15), rgba(15, 23, 42, 0.95))'
                : 'linear-gradient(135deg, #faf5ff, #ede9fe, #ffffff)',
              borderColor: isDarkTheme ? '#7c3aed' : '#e9d5ff',
              boxShadow: '0 4px 16px rgba(168, 85, 247, 0.12)'
            }}
          >
            <Stack gap='xs' align='center' py={4}>
              <ThemeIcon
                size={42}
                radius='xl'
                variant='gradient'
                gradient={{ from: 'grape', to: 'indigo', deg: 45 }}
                className='attention-bounce'
              >
                <IconSparkles size={22} />
              </ThemeIcon>

              <div style={{ textAlign: 'center' }}>
                <Text fw={800} size='sm' c={colors.primaryText}>
                  Screen: "You're all set!"
                </Text>
                <Text size='xs' c={colors.secondaryText}>
                  Your OpenRouter account and workspace are initialized.
                </Text>
              </div>

              <Button
                size='sm'
                variant='gradient'
                gradient={{ from: 'grape', to: 'indigo', deg: 90 }}
                radius='md'
                rightSection={<IconArrowRight size={14} />}
                style={{
                  fontWeight: 600,
                  height: 32,
                  boxShadow: '0 2px 8px rgba(168, 85, 247, 0.3)'
                }}
              >
                Click: "Go to dashboard"
              </Button>
            </Stack>
          </Paper>

          <Text size='xs' c={colors.mutedText}>
            Click <strong>"Go to dashboard"</strong> on OpenRouter to enter your
            main console.
          </Text>
        </Stack>
      )
    },
    {
      number: 11,
      title: 'OpenRouter Dashboard & "API Keys" Navigation',
      subtitle: 'Verify your copied key or manage keys anytime',
      icon: <IconDashboard size={20} />,
      color: 'blue',
      badge: 'Step 11 • Ready',
      details: (
        <Stack gap='sm'>
          <Text size='sm' c={colors.secondaryText} style={{ lineHeight: 1.6 }}>
            Inside the OpenRouter dashboard, find the{' '}
            <strong>"API Keys"</strong> menu item in the left navigation
            sidebar.
          </Text>

          <Paper
            withBorder
            p='md'
            radius='lg'
            style={{
              backgroundColor: colors.cardSurface,
              borderColor: colors.cardBorder
            }}
          >
            <Stack gap='xs'>
              <Group justify='space-between' align='center'>
                <Text size='xs' fw={700} c={colors.mutedText} tt='uppercase'>
                  OpenRouter Dashboard Navigation
                </Text>
                <Badge color='teal' variant='filled' size='xs'>
                  Key Active
                </Badge>
              </Group>

              <SimpleGrid cols={{ base: 1, sm: 3 }} spacing='xs'>
                <Paper
                  withBorder
                  p='xs'
                  radius='md'
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.cardBorder
                  }}
                >
                  <Text size='xs' c={colors.mutedText}>
                    Overview
                  </Text>
                </Paper>

                <Paper
                  withBorder
                  p='xs'
                  radius='md'
                  style={{
                    borderColor: colors.primaryIndigo,
                    borderWidth: 2,
                    backgroundColor: isDarkTheme
                      ? 'rgba(79, 70, 229, 0.2)'
                      : 'rgba(238, 242, 255, 0.95)'
                  }}
                >
                  <Group justify='space-between' align='center'>
                    <Group gap={4}>
                      <IconKey size={14} color='#4f46e5' />
                      <Text size='xs' fw={700} c={colors.primaryIndigo}>
                        API Keys
                      </Text>
                    </Group>
                    <IconCheck size={12} color='#10b981' />
                  </Group>
                </Paper>

                <Paper
                  withBorder
                  p='xs'
                  radius='md'
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.cardBorder
                  }}
                >
                  <Text size='xs' c={colors.mutedText}>
                    Activity & Usage
                  </Text>
                </Paper>
              </SimpleGrid>

              <Text size='xs' c={colors.secondaryText} mt={2}>
                ✓ <strong>Note:</strong> The API key you already copied after
                Step 6 is already active and listed here! If you ever need
                another key, you can click <strong>"+ New Key"</strong> here.
              </Text>
            </Stack>
          </Paper>

          <Paper
            withBorder
            p='xs'
            radius='md'
            style={{
              backgroundColor: colors.emeraldBg,
              borderColor: isDarkTheme ? '#059669' : '#86efac'
            }}
          >
            <Group justify='space-between' align='center' wrap='wrap' gap='xs'>
              <Group gap='xs'>
                <ThemeIcon color='teal' size={28} radius='xl' variant='filled'>
                  <IconCheck size={16} />
                </ThemeIcon>
                <div>
                  <Text size='xs' fw={700} c={colors.emeraldGreen}>
                    Ready to Unlock Courses!
                  </Text>
                  <Text size='xs' c={colors.secondaryText}>
                    Scroll down to paste your copied key into the verification
                    box below.
                  </Text>
                </div>
              </Group>
              <Button
                size='xs'
                color='teal'
                variant='filled'
                radius='md'
                onClick={() => {
                  const inputEl = document.getElementById(
                    'openrouter-api-key-input'
                  );
                  inputEl?.scrollIntoView({ behavior: 'smooth' });
                  inputEl?.focus();
                }}
                style={{
                  height: 28,
                  padding: '4px 10px',
                  boxShadow: '0 2px 6px rgba(16, 185, 129, 0.3)'
                }}
              >
                Go to Key Input ↓
              </Button>
            </Group>
          </Paper>
        </Stack>
      )
    }
  ];

  const handleSaveApiKey = async () => {
    const trimmed = apiKeyInput.trim();
    if (!trimmed) {
      setErrorMsg('Please enter your OpenRouter API key.');
      showErrorToast('Please enter your OpenRouter API key.');
      return;
    }

    if (trimmed.length < 15) {
      setErrorMsg(
        'API key seems too short. OpenRouter keys typically start with "sk-or-".'
      );
      showErrorToast('Invalid API key length.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await saveKeyMutation.mutateAsync(trimmed);
    } catch (apiError: any) {
      const status = apiError?.response?.status;
      const message = apiError?.response?.data?.message;
      if (status !== 409 && message !== 'USER_OPENROUTER_KEY_EXISTS') {
        console.warn('Backend save notice:', message || apiError.message);
      }
    }

    try {
      localStorage.setItem(OPENROUTER_API_KEY_STORAGE, trimmed);
      showSuccessToast(
        'OpenRouter API Key saved successfully! Courses unlocked.'
      );
      onKeySaved(trimmed);
    } catch {
      showErrorToast('Could not save API key to local storage.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercent = Math.round(((activeStep + 1) / steps.length) * 100);

  return (
    <Container
      size='lg'
      px={{ base: 'xs', sm: 'md', md: 'lg' }}
      py={{ base: 'md', sm: 'xl' }}
    >
      <style>{`
        @keyframes pulseAmber {
          0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.55); }
          70% { box-shadow: 0 0 0 8px rgba(245, 158, 11, 0); }
          100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }
        @keyframes celebrationGlow {
          0% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(168, 85, 247, 0); }
          100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0); }
        }
        @keyframes subtleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .pulse-amber-btn {
          animation: pulseAmber 2.2s infinite;
        }
        .celebration-card {
          animation: celebrationGlow 3s infinite;
        }
        .attention-bounce {
          animation: subtleBounce 2s ease-in-out infinite;
        }
        .btn-modern {
          transition: transform 0.16s ease, box-shadow 0.16s ease;
        }
        .btn-modern:hover {
          transform: translateY(-1px);
        }
      `}</style>

      <Stack gap='lg'>
        <Card
          withBorder
          radius='lg'
          p={{ base: 'md', sm: 'xl' }}
          style={{
            background: isDarkTheme
              ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
            borderColor: colors.cardBorder,
            boxShadow: isDarkTheme
              ? '0 6px 20px rgba(0, 0, 0, 0.35)'
              : '0 6px 20px rgba(0, 0, 0, 0.03)'
          }}
        >
          <Stack gap='md'>
            <Group
              justify='space-between'
              align='flex-start'
              wrap='wrap'
              gap='md'
            >
              <Group gap='md' wrap='nowrap'>
                <ThemeIcon
                  size={46}
                  radius='lg'
                  variant='gradient'
                  gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                  style={{
                    boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
                    flexShrink: 0
                  }}
                >
                  <IconRobot size={26} />
                </ThemeIcon>

                <div>
                  <Group gap='xs' wrap='wrap'>
                    <Title
                      order={1}
                      size='h3'
                      fw={800}
                      style={{
                        letterSpacing: '-0.3px',
                        color: colors.primaryText
                      }}
                    >
                      OpenRouter AI Key Setup
                    </Title>
                  </Group>
                  <Text size='xs' c={colors.secondaryText} mt={2}>
                    Follow the 11-step visual guide to generate your free
                    OpenRouter API key and unlock interactive course learning.
                  </Text>
                </div>
              </Group>

              <Group gap='xs' wrap='wrap'>
                <Button
                  component='a'
                  href='https://openrouter.ai/'
                  target='_blank'
                  rel='noopener noreferrer'
                  leftSection={<IconExternalLink size={15} />}
                  variant='gradient'
                  gradient={{ from: 'indigo', to: 'cyan', deg: 90 }}
                  radius='md'
                  size='sm'
                  className='btn-modern'
                  style={{
                    boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)',
                    height: 34
                  }}
                >
                  Visit OpenRouter.ai
                </Button>
                {onCancel && (
                  <Button
                    variant='default'
                    size='sm'
                    radius='md'
                    onClick={onCancel}
                    style={{
                      ...defaultBtnStyle,
                      height: 34
                    }}
                  >
                    Back to Courses
                  </Button>
                )}
              </Group>
            </Group>

            <Divider color={colors.cardBorder} />

            <Group justify='space-between' align='center' wrap='wrap' gap='xs'>
              <Group gap='xs' wrap='wrap'>
                <Badge
                  variant='light'
                  color='teal'
                  size='sm'
                  radius='sm'
                  leftSection={<IconRobot size={12} />}
                >
                  Free Models Available
                </Badge>
                <Badge variant='light' color='indigo' size='sm' radius='sm'>
                  11 Simple Steps
                </Badge>
              </Group>

              <Paper
                withBorder
                p={2}
                radius='xl'
                style={{
                  backgroundColor: colors.cardSurface,
                  borderColor: colors.cardBorder
                }}
              >
                <Group gap={6}>
                  <Button
                    size='compact-sm'
                    variant={viewMode === 'stepper' ? 'filled' : 'subtle'}
                    color='indigo'
                    radius='xl'
                    onClick={() => setViewMode('stepper')}
                    style={{ fontWeight: 600, fontSize: 11 }}
                  >
                    Step-by-Step
                  </Button>
                  <Button
                    size='compact-sm'
                    variant={viewMode === 'overview' ? 'filled' : 'subtle'}
                    color='indigo'
                    radius='xl'
                    onClick={() => setViewMode('overview')}
                    style={{ fontWeight: 600, fontSize: 11 }}
                  >
                    All Steps Overview
                  </Button>
                </Group>
              </Paper>
            </Group>
          </Stack>
        </Card>

        {viewMode === 'stepper' && (
          <Card
            withBorder
            radius='lg'
            p={{ base: 'md', sm: 'xl' }}
            style={{
              backgroundColor: colors.cardBackground,
              borderColor: colors.cardBorder,
              boxShadow: isDarkTheme
                ? '0 4px 16px rgba(0,0,0,0.25)'
                : '0 4px 16px rgba(0,0,0,0.02)'
            }}
          >
            <Stack gap='md'>
              {/* Stepper Header */}
              <Group
                justify='space-between'
                align='center'
                wrap='wrap'
                gap='sm'
              >
                <div>
                  <Group gap='xs'>
                    <Badge
                      variant='filled'
                      color='indigo'
                      size='xs'
                      radius='sm'
                    >
                      Step {activeStep + 1} of {steps.length}
                    </Badge>
                    <Badge
                      variant='outline'
                      color={steps[activeStep].color}
                      size='xs'
                      radius='sm'
                    >
                      {steps[activeStep].badge}
                    </Badge>
                  </Group>
                  <Title
                    order={2}
                    size='h4'
                    fw={700}
                    mt={4}
                    style={{ color: colors.primaryText }}
                  >
                    {steps[activeStep].title}
                  </Title>
                  <Text size='xs' c={colors.mutedText}>
                    {steps[activeStep].subtitle}
                  </Text>
                </div>

                <ThemeIcon
                  size={40}
                  radius='md'
                  color={steps[activeStep].color}
                  variant='light'
                  style={{
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                >
                  {steps[activeStep].icon}
                </ThemeIcon>
              </Group>

              {/* Progress bar */}
              <div>
                <Group justify='space-between' align='center' mb={4}>
                  <Text size='xs' fw={600} c={colors.mutedText}>
                    Progress
                  </Text>
                  <Text size='xs' fw={700} c='indigo'>
                    {progressPercent}%
                  </Text>
                </Group>
                <Progress
                  value={progressPercent}
                  size='sm'
                  radius='xl'
                  color='indigo'
                />
              </div>

              <Paper
                withBorder
                p={{ base: 'sm', sm: 'md' }}
                radius='md'
                style={{
                  backgroundColor: colors.cardSurface,
                  borderColor: colors.cardBorder
                }}
              >
                {steps[activeStep].details}
              </Paper>

              <Group
                justify='space-between'
                align='center'
                wrap='wrap'
                gap='xs'
                pt='xs'
              >
                <Button
                  variant='default'
                  size='sm'
                  leftSection={<IconArrowLeft size={16} />}
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                  radius='md'
                  style={{
                    ...defaultBtnStyle,
                    height: 34
                  }}
                >
                  Previous Step
                </Button>

                <Group gap='xs'>
                  {activeStep < steps.length - 1 ? (
                    <Button
                      variant='filled'
                      color='indigo'
                      size='sm'
                      rightSection={<IconArrowRight size={16} />}
                      onClick={() =>
                        setActiveStep(prev =>
                          Math.min(steps.length - 1, prev + 1)
                        )
                      }
                      radius='md'
                      className='btn-modern'
                      style={{
                        background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                        boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)',
                        fontWeight: 600,
                        height: 34
                      }}
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      variant='filled'
                      color='teal'
                      size='sm'
                      rightSection={<IconCheck size={16} />}
                      onClick={() => {
                        const inputEl = document.getElementById(
                          'openrouter-api-key-input'
                        );
                        inputEl?.scrollIntoView({ behavior: 'smooth' });
                        inputEl?.focus();
                      }}
                      radius='md'
                      className='btn-modern'
                      style={{
                        background: 'linear-gradient(135deg, #059669, #10b981)',
                        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                        fontWeight: 700,
                        height: 34
                      }}
                    >
                      I have my API key
                    </Button>
                  )}
                </Group>
              </Group>
            </Stack>
          </Card>
        )}

        {viewMode === 'overview' && (
          <Stack gap='md'>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
              {steps.map((step, idx) => (
                <Card
                  key={step.number}
                  withBorder
                  radius='lg'
                  p='md'
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderColor:
                      activeStep === idx
                        ? colors.primaryIndigo
                        : colors.cardBorder,
                    borderWidth: activeStep === idx ? 2 : 1,
                    boxShadow:
                      activeStep === idx
                        ? '0 4px 14px rgba(79, 70, 229, 0.12)'
                        : '0 2px 6px rgba(0,0,0,0.02)'
                  }}
                >
                  <Stack gap='xs'>
                    <Group justify='space-between' align='center' wrap='nowrap'>
                      <Group gap='xs' wrap='nowrap'>
                        <ThemeIcon
                          size={32}
                          radius='md'
                          color={step.color}
                          variant='light'
                          style={{ flexShrink: 0 }}
                        >
                          {step.icon}
                        </ThemeIcon>
                        <div>
                          <Text fw={700} size='xs' c={colors.primaryText}>
                            {step.number}. {step.title}
                          </Text>
                          <Text size='xs' c={colors.mutedText}>
                            {step.subtitle}
                          </Text>
                        </div>
                      </Group>
                      <Badge size='xs' variant='light' color={step.color}>
                        {step.badge}
                      </Badge>
                    </Group>
                    <Divider my={2} color={colors.cardBorder} />
                    {step.details}
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Stack>
        )}

        <Card
          id='openrouter-api-key-section'
          withBorder
          radius='lg'
          p={{ base: 'md', sm: 'xl' }}
          style={{
            borderColor: colors.emeraldGreen,
            borderWidth: 2,
            background: isDarkTheme
              ? 'linear-gradient(135deg, #0f172a 0%, #064e3b 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)',
            boxShadow: '0 6px 20px rgba(16, 185, 129, 0.12)'
          }}
        >
          <Stack gap='md'>
            <Group justify='space-between' align='center' wrap='wrap' gap='sm'>
              <Group gap='sm' wrap='nowrap'>
                <ThemeIcon
                  size={42}
                  radius='lg'
                  color='teal'
                  variant='filled'
                  style={{
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    boxShadow: '0 2px 10px rgba(16, 185, 129, 0.3)',
                    flexShrink: 0
                  }}
                >
                  <IconKey size={22} />
                </ThemeIcon>
                <div>
                  <Title
                    order={2}
                    size='h4'
                    fw={800}
                    style={{ color: colors.primaryText }}
                  >
                    Enter Your OpenRouter API Key
                  </Title>
                  <Text size='xs' c={colors.secondaryText} mt={2}>
                    Paste the key you copied in Step 7 (or retrieved from the
                    API Keys menu in Step 11)
                  </Text>
                </div>
              </Group>

              <Badge color='teal' variant='filled' size='md' radius='sm'>
                Required to Unlock
              </Badge>
            </Group>

            <Divider color={colors.cardBorder} />

            <PasswordInput
              id='openrouter-api-key-input'
              label='OpenRouter API Key'
              description='Starts with "sk-or-v1-" or similar OpenRouter key format'
              placeholder='sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
              value={apiKeyInput}
              onChange={e => {
                setApiKeyInput(e.currentTarget.value);
                if (errorMsg) setErrorMsg('');
              }}
              error={errorMsg}
              leftSection={<IconKey size={16} color='#10b981' />}
              size='md'
              radius='md'
              required
              styles={{
                input: {
                  backgroundColor: isDarkTheme ? '#0f172a' : '#ffffff',
                  borderColor: errorMsg
                    ? '#ef4444'
                    : isDarkTheme
                      ? '#475569'
                      : '#cbd5e1',
                  color: colors.primaryText,
                  fontSize: '14px',
                  height: 42
                }
              }}
            />

            <Group justify='space-between' align='center' wrap='wrap' gap='sm'>
              <Group gap='xs'>
                <IconShieldLock size={16} color='#10b981' />
                <Text size='xs' c={colors.mutedText}>
                  Stored securely in your private local browser storage.
                </Text>
              </Group>

              <Group gap='xs' wrap='wrap'>
                {onCancel && (
                  <Button
                    variant='default'
                    radius='md'
                    size='sm'
                    onClick={onCancel}
                    style={{
                      ...defaultBtnStyle,
                      height: 36
                    }}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  color='teal'
                  variant='filled'
                  radius='md'
                  size='sm'
                  leftSection={<IconCheck size={16} />}
                  onClick={handleSaveApiKey}
                  loading={isSubmitting || saveKeyMutation.isPending}
                  className='btn-modern'
                  style={{
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    boxShadow: '0 2px 10px rgba(16, 185, 129, 0.35)',
                    fontWeight: 700,
                    height: 36,
                    padding: '0 18px'
                  }}
                >
                  Verify & Unlock Courses
                </Button>
              </Group>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};

export default OpenRouterSetup;
