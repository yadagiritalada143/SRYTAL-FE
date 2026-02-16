import { Stepper, Stack } from '@mantine/core';
import { StepConfig } from '../../../interfaces/reports';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../../../atoms/theme';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { useMemo } from 'react';

interface Props {
  steps: StepConfig[];
  active: number;
  children: React.ReactNode[];
}

const DynamicStepper = ({ steps, active, children }: Props) => {
  const isDarkTheme = useRecoilValue(themeAtom);
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

  return (
    <Stepper
      active={active}
      allowNextStepsSelect={false}
      styles={{
        stepLabel: {
          fontSize: '15px',
          fontWeight: 700,
          color: currentThemeConfig.color
        },
        stepDescription: {
          fontSize: '12px',
          color: currentThemeConfig.color,
          opacity: 0.7
        },
        separator: {
          backgroundColor: currentThemeConfig.button.color,
          height: 2
        },
        stepIcon: {
          borderWidth: 3,
          borderColor: isDarkTheme ? currentThemeConfig.button.color : '',
          '&[data-active]': {
            backgroundColor: currentThemeConfig.accentColor,
            borderColor: currentThemeConfig.accentColor,
            color: '#fff'
          },
          '&[data-completed]': {
            backgroundColor: currentThemeConfig.successColor,
            borderColor: currentThemeConfig.successColor,
            color: '#fff'
          }
        }
      }}
    >
      {steps.map((step, index) => (
        <Stepper.Step
          key={index}
          label={step.label}
          description={step.description}
          disabled={step.enabled === false}
        >
          <Stack mt="xl">{children[index]}</Stack>
        </Stepper.Step>
      ))}

      <Stepper.Completed>
        <Stack align="center" py="xl">
          {children[steps.length]}
        </Stack>
      </Stepper.Completed>
    </Stepper>
  );
};

export default DynamicStepper;
