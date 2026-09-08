import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { GuidedStepper, GuidedStepItem } from './GuidedStepper';

const mockSteps: GuidedStepItem[] = [
  {
    number: 1,
    title: 'First Step Title',
    subtitle: 'First Step Subtitle',
    color: 'blue',
    badge: 'Step 1 • Intro',
    details: <div>First step details content</div>
  },
  {
    number: 2,
    title: 'Second Step Title',
    subtitle: 'Second Step Subtitle',
    color: 'indigo',
    badge: 'Step 2 • Action',
    details: <div>Second step details content</div>
  },
  {
    number: 3,
    title: 'Final Step Title',
    subtitle: 'Final Step Subtitle',
    color: 'teal',
    badge: 'Step 3 • Finish',
    details: <div>Final step details content</div>
  }
];

import { RecoilRoot } from 'recoil';

const TestWrapper: React.FC<{
  initialStep?: number;
  onFinish?: () => void;
  finishButtonText?: string;
}> = ({ initialStep = 0, onFinish = jest.fn(), finishButtonText }) => {
  const [activeStep, setActiveStep] = useState(initialStep);

  return (
    <RecoilRoot>
      <MantineProvider>
        <GuidedStepper
          steps={mockSteps}
          activeStep={activeStep}
          onStepChange={setActiveStep}
          onFinish={onFinish}
          finishButtonText={finishButtonText}
        />
      </MantineProvider>
    </RecoilRoot>
  );
};

describe('GuidedStepper Component', () => {
  it('renders Step 1 with 0% progress by default', () => {
    render(<TestWrapper />);

    expect(screen.getByText('First Step Title')).toBeInTheDocument();
    expect(screen.getByText('First Step Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
    expect(screen.getByText('First step details content')).toBeInTheDocument();

    // Verify progress starts at 0%
    expect(screen.getByText('0%')).toBeInTheDocument();

    // Previous step button is disabled on first step
    const prevBtn = screen.getByRole('button', { name: /previous step/i });
    expect(prevBtn).toBeDisabled();
  });

  it('navigates to next step and calculates progress accurately', () => {
    render(<TestWrapper />);

    const nextBtn = screen.getByRole('button', { name: /next step/i });
    fireEvent.click(nextBtn);

    expect(screen.getByText('Second Step Title')).toBeInTheDocument();
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
    expect(screen.getByText('Second step details content')).toBeInTheDocument();

    // For 3 steps: step 0 = 0%, step 1 = 50%, step 2 = 100%
    expect(screen.getByText('50%')).toBeInTheDocument();

    // Previous step button is now enabled
    const prevBtn = screen.getByRole('button', { name: /previous step/i });
    expect(prevBtn).not.toBeDisabled();

    // Go back to step 1
    fireEvent.click(prevBtn);
    expect(screen.getByText('First Step Title')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('displays finish button on the final step and triggers onFinish callback', () => {
    const onFinish = jest.fn();
    render(
      <TestWrapper
        initialStep={2}
        onFinish={onFinish}
        finishButtonText='Complete Onboarding'
      />
    );

    expect(screen.getByText('Final Step Title')).toBeInTheDocument();
    expect(screen.getByText('Step 3 of 3')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();

    const finishBtn = screen.getByRole('button', {
      name: /complete onboarding/i
    });
    expect(finishBtn).toBeInTheDocument();

    fireEvent.click(finishBtn);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });
});
