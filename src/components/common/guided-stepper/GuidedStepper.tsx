import React from 'react';
import {
  Badge,
  Button,
  Card,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  ThemeIcon,
  Title
} from '@mantine/core';
import { IconArrowLeft, IconArrowRight, IconCheck } from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';

export interface GuidedStepItem {
  number: number;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: string;
  badge?: string;
  details: React.ReactNode;
}

export interface GuidedStepperProps {
  steps: GuidedStepItem[];
  activeStep: number;
  onStepChange: (stepIndex: number) => void;
  onFinish?: () => void;
  finishButtonText?: string;
  finishButtonIcon?: React.ReactNode;
  finishButtonColor?: string;
  nextButtonColor?: string;
  showProgress?: boolean;
}

export const GuidedStepper: React.FC<GuidedStepperProps> = ({
  steps,
  activeStep,
  onStepChange,
  onFinish,
  finishButtonText = 'Finish',
  finishButtonIcon = <IconCheck size={16} />,
  finishButtonColor = 'teal',
  nextButtonColor = 'indigo',
  showProgress = true
}) => {
  const { isDarkTheme, appColors: colors } = useAppTheme();

  if (!steps || steps.length === 0) {
    return null;
  }

  const currentStep = steps[activeStep] || steps[0];

  const progressPercent =
    steps.length <= 1 ? 0 : Math.round((activeStep / (steps.length - 1)) * 100);

  const defaultBtnStyle = {
    backgroundColor: isDarkTheme ? '#1e293b' : '#ffffff',
    borderColor: isDarkTheme ? '#334155' : '#cbd5e1',
    color: colors.primaryText
  };

  return (
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
        <Group justify='space-between' align='center' wrap='wrap' gap='sm'>
          <div>
            <Group gap='xs'>
              <Badge
                variant='filled'
                color={currentStep.color || 'indigo'}
                size='xs'
                radius='sm'
              >
                Step {activeStep + 1} of {steps.length}
              </Badge>
              {currentStep.badge && (
                <Badge
                  variant='outline'
                  color={currentStep.color || 'indigo'}
                  size='xs'
                  radius='sm'
                >
                  {currentStep.badge}
                </Badge>
              )}
            </Group>
            <Title
              order={2}
              size='h4'
              fw={700}
              mt={4}
              style={{ color: colors.primaryText }}
            >
              {currentStep.title}
            </Title>
            {currentStep.subtitle && (
              <Text size='xs' c={colors.mutedText}>
                {currentStep.subtitle}
              </Text>
            )}
          </div>

          {currentStep.icon && (
            <ThemeIcon
              size={40}
              radius='md'
              color={currentStep.color || 'indigo'}
              variant='light'
              style={{
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              {currentStep.icon}
            </ThemeIcon>
          )}
        </Group>

        {showProgress && (
          <div>
            <Group justify='space-between' align='center' mb={4}>
              <Text size='xs' fw={600} c={colors.mutedText}>
                Progress
              </Text>
              <Text size='xs' fw={700} c={currentStep.color || 'indigo'}>
                {progressPercent}%
              </Text>
            </Group>
            <Progress
              value={progressPercent}
              size='sm'
              radius='xl'
              color={currentStep.color || 'indigo'}
            />
          </div>
        )}

        <Paper
          withBorder
          p={{ base: 'sm', sm: 'md' }}
          radius='md'
          style={{
            backgroundColor: colors.cardSurface,
            borderColor: colors.cardBorder
          }}
        >
          {currentStep.details}
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
            onClick={() => onStepChange(Math.max(0, activeStep - 1))}
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
                color={nextButtonColor}
                size='sm'
                rightSection={<IconArrowRight size={16} />}
                onClick={() =>
                  onStepChange(Math.min(steps.length - 1, activeStep + 1))
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
                color={finishButtonColor}
                size='sm'
                rightSection={finishButtonIcon}
                onClick={onFinish}
                radius='md'
                className='btn-modern'
                style={{
                  background: 'linear-gradient(135deg, #059669, #10b981)',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                  fontWeight: 700,
                  height: 34
                }}
              >
                {finishButtonText}
              </Button>
            )}
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};

export default GuidedStepper;
