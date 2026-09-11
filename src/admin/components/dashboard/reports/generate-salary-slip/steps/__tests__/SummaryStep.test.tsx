import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

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
      lightDangerColor: '#e03131',
      mutedTextColor: '#868e96',
      headerBackgroundColor: '#f8f9fa',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({
    children,
    onClick,
    loading,
    type,
    disabled
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    loading?: boolean;
    type?: 'button' | 'reset' | 'submit';
    disabled?: boolean;
  }) => (
    <button
      type={type || 'button'}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {children}
    </button>
  )
}));

const mockSubmit = jest.fn();
const mockPrevStep = jest.fn();

const baseEmpDetails = {
  empName: 'Alice Smith',
  empId: 'SRY001',
  designation: 'Developer',
  department: 'Engineering',
  email: 'alice@srytal.com',
  dob: '15-06-1995',
  pan: 'ABCDE1234F'
};

const buildVm = (overrides: any = {}) => ({
  submit: mockSubmit,
  daysInMonth: 31,
  lopDays: 2,
  empDetails: { ...baseEmpDetails },
  selectedMonth: new Date(2026, 5, 1),
  payDate: '2026-07-01',
  transactionId: 'TXN123',
  previewData: null,
  basic: 100000,
  hra: 10,
  special: 5000,
  conveyance: 2000,
  medical: 1500,
  other: 800,
  additionalAllowances: [],
  isGenerating: false,
  activeStep: 2,
  prevStep: mockPrevStep,
  ...overrides
});

import SummaryStep from '../SummaryStep';

const renderStep = (vm: any) =>
  render(
    <MantineProvider>
      <SummaryStep vm={vm} />
    </MantineProvider>
  );

describe('SummaryStep Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the salary slip summary heading', () => {
    renderStep(buildVm());
    expect(screen.getByText('Salary Slip Summary')).toBeInTheDocument();
    expect(screen.getByText('Review Details')).toBeInTheDocument();
  });

  it('shows the days summary cards', () => {
    renderStep(buildVm());
    expect(screen.getByText('Total Days')).toBeInTheDocument();
    expect(screen.getByText('LOP Days')).toBeInTheDocument();
    expect(screen.getByText('Working Days')).toBeInTheDocument();
    const working = screen.getByText('Working Days');
    expect(working).toBeInTheDocument();
    expect(screen.getByText('29')).toBeInTheDocument();
  });

  it('renders the employee details card', () => {
    renderStep(buildVm());
    expect(screen.getByText('Employee Details')).toBeInTheDocument();
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('SRY001')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('alice@srytal.com')).toBeInTheDocument();
  });

  it('renders the formatted pay period from the selected month', () => {
    renderStep(buildVm());
    expect(screen.getByText('June 2026')).toBeInTheDocument();
  });

  it('renders transaction id from the form', () => {
    renderStep(buildVm());
    expect(screen.getByText('TXN123')).toBeInTheDocument();
  });

  it('show the transaction id from preview data when present', () => {
    renderStep(
      buildVm({
        previewData: { data: { transactionId: 'PREVIEW123' } }
      })
    );
    expect(screen.getByText('PREVIEW123')).toBeInTheDocument();
  });

  it('renders the salary breakdown with fallback values', () => {
    renderStep(buildVm());
    expect(screen.getByText('Salary Breakdown')).toBeInTheDocument();
    expect(screen.getByText('Basic Salary')).toBeInTheDocument();
    expect(screen.getByText('Gross Salary:')).toBeInTheDocument();
    expect(screen.getByText('Net Payable')).toBeInTheDocument();
  });

  it('renders server-calculated values when preview data exists', () => {
    const vm = buildVm({
      previewData: {
        data: {
          calculations: {
            basicSalary: 90000,
            hra: 9000,
            specialAllowance: 3000,
            conveyanceAllowance: 1600,
            medicalAllowance: 1250,
            otherAllowances: 500,
            grossEarnings: 105350,
            netPay: 97000,
            lossOfPayAmount: 2500,
            providentFund: 0,
            professionalTax: 200,
            incomeTax: 1000,
            otherDeductions: 350
          }
        }
      }
    });
    renderStep(vm);
    expect(screen.getByText('₹ 97000.00')).toBeInTheDocument();
    expect(screen.getByText('Deductions')).toBeInTheDocument();
    expect(screen.getByText('Professional Tax')).toBeInTheDocument();
    expect(screen.getByText('Income Tax')).toBeInTheDocument();
    expect(screen.getByText('Other Deductions')).toBeInTheDocument();
  });

  it('lists local additional allowances before preview', () => {
    renderStep(
      buildVm({
        additionalAllowances: [
          { label: 'Performance', amount: 5000, type: 'add' }
        ]
      })
    );
    expect(screen.getByText('Performance (+)')).toBeInTheDocument();
    expect(screen.getByText('₹ 5000')).toBeInTheDocument();
  });

  it('does not list local additional allowances after preview', () => {
    renderStep(
      buildVm({
        previewData: { data: { calculations: {} } },
        additionalAllowances: [
          { label: 'Performance', amount: 5000, type: 'add' }
        ]
      })
    );
    expect(screen.queryByText('Performance (+)')).not.toBeInTheDocument();
  });

  it('submits the form when Download Salary Slip is clicked', () => {
    renderStep(buildVm());
    fireEvent.click(screen.getByText('Download Salary Slip'));
    expect(mockSubmit).toHaveBeenCalled();
  });

  it('shows the generated state label at step 3', () => {
    renderStep(buildVm({ activeStep: 3 }));
    expect(screen.getByText('Salary Slip Generated')).toBeInTheDocument();
  });

  it('disables Back when active step is 3', () => {
    renderStep(buildVm({ activeStep: 3 }));
    expect(screen.getByText('Back')).toBeDisabled();
  });

  it('fires prevStep when Back is clicked', () => {
    renderStep(buildVm());
    fireEvent.click(screen.getByText('Back'));
    expect(mockPrevStep).toHaveBeenCalled();
  });
});
