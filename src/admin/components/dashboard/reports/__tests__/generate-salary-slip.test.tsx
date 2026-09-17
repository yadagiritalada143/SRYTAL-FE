import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

const mockVm: any = {
  isPreviewLoading: false,
  activeStep: 0
};

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      accentColor: '#495057',
      successColor: '#37b24d',
      dangerColor: '#e03131',
      mutedTextColor: '#868e96',
      headerBackgroundColor: '#f8f9fa',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('../generate-salary-slip/useSalarySlip', () => ({
  useSalarySlip: () => mockVm
}));

jest.mock('@common/reports-salary-slip/dynamicstepper', () => (props: any) => (
  <div data-testid='dynamic-stepper'>
    <span>active={props.active}</span>
    <div data-testid='stepper-steps'>{props.steps.length} steps</div>
    {props.children}
  </div>
));

jest.mock('../generate-salary-slip/steps/EmployeeInfoStep', () => () => (
  <div data-testid='employee-info-step'>EmployeeInfoStep</div>
));
jest.mock('../generate-salary-slip/steps/SalaryCalculationStep', () => () => (
  <div data-testid='salary-calculation-step'>SalaryCalculationStep</div>
));
jest.mock('../generate-salary-slip/steps/SummaryStep', () => () => (
  <div data-testid='summary-step'>SummaryStep</div>
));
jest.mock('../generate-salary-slip/steps/CompletedStep', () => () => (
  <div data-testid='completed-step'>CompletedStep</div>
));

jest.mock(
  '@UI/Loaders/GlobalLoader',
  () => (props: any) =>
    props.visible ? <div data-testid='global-loader'>Loading</div> : null
);

import GenerateSalarySlipReport from '../generate-salary-slip';

const renderReport = () =>
  render(
    <MantineProvider>
      <GenerateSalarySlipReport />
    </MantineProvider>
  );

describe('GenerateSalarySlipReport Component', () => {
  beforeEach(() => {
    mockVm.isPreviewLoading = false;
    mockVm.activeStep = 0;
  });

  it('renders the page title and subtitle', () => {
    renderReport();
    expect(screen.getByText('Generate Salary Slip')).toBeInTheDocument();
    expect(
      screen.getByText(/Generate and download a salary slip/)
    ).toBeInTheDocument();
  });

  it('renders the dynamic stepper with three configured steps', () => {
    renderReport();
    const stepper = screen.getByTestId('dynamic-stepper');
    expect(stepper).toBeInTheDocument();
    expect(screen.getByTestId('stepper-steps')).toHaveTextContent('3 steps');
  });

  it('passes the active step to the stepper', () => {
    mockVm.activeStep = 2;
    renderReport();
    expect(screen.getByText('active=2')).toBeInTheDocument();
  });

  it('renders all four step children inside the stepper', () => {
    renderReport();
    expect(screen.getByTestId('employee-info-step')).toBeInTheDocument();
    expect(screen.getByTestId('salary-calculation-step')).toBeInTheDocument();
    expect(screen.getByTestId('summary-step')).toBeInTheDocument();
    expect(screen.getByTestId('completed-step')).toBeInTheDocument();
  });

  it('shows the global loader while preview is loading', () => {
    mockVm.isPreviewLoading = true;
    renderReport();
    expect(screen.getByTestId('global-loader')).toBeInTheDocument();
  });

  it('hides the global loader when preview is not loading', () => {
    mockVm.isPreviewLoading = false;
    renderReport();
    expect(screen.queryByTestId('global-loader')).not.toBeInTheDocument();
  });
});
