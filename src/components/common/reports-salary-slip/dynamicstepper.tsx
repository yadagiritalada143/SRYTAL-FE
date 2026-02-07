import { Stepper } from '@mantine/core';
import { StepConfig } from '../../../interfaces/reports';

interface Props {
  steps: StepConfig[];
  active: number;
  children: React.ReactNode[];
}

const DynamicStepper = ({ steps, active, children }: Props) => {
  return (
    <Stepper active={active} mb="xl">
      {steps.map((step, index) => (
        <Stepper.Step
          key={index}
          label={step.label}
          description={step.description}
          disabled={step.enabled === false}
        >
          {children[index]}
        </Stepper.Step>
      ))}
    </Stepper>
  );
};

export default DynamicStepper;
