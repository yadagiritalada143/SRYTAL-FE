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
      mutedTextColor: '#868e96',
      headerBackgroundColor: '#f8f9fa',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('@mantine/dates', () => ({
  DatePickerInput: (props: any) => (
    <div>
      <label>{props.label}</label>
      <input
        data-testid='date-picker-input'
        placeholder={props.placeholder}
        readOnly
      />
    </div>
  )
}));

jest.mock('react-hook-form', () => ({
  Controller: ({ render }: any) =>
    render({
      field: {
        value: '2026-06-15',
        onChange: jest.fn(),
        onBlur: jest.fn(),
        ref: jest.fn()
      }
    })
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({
    children,
    onClick,
    loading,
    type
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    loading?: boolean;
    type?: 'button' | 'reset' | 'submit';
  }) => (
    <button type={type || 'button'} onClick={onClick} disabled={loading}>
      {children}
    </button>
  )
}));

const mockAppend = jest.fn();
const mockRemove = jest.fn();
const mockPrevStep = jest.fn();
const mockNextStep = jest.fn();
const mockSetValue = jest.fn();

const buildVm = (overrides: any = {}) => ({
  register: (name: string, options: any) => ({
    name,
    onChange: options?.onChange
  }),
  control: {},
  errors: {},
  setValue: mockSetValue,
  fields: [],
  append: mockAppend,
  remove: mockRemove,
  isPreviewLoading: false,
  prevStep: mockPrevStep,
  nextStep: mockNextStep,
  basic: 0,
  hra: 0,
  special: 0,
  conveyance: 0,
  medical: 0,
  other: 0,
  additionalAllowances: [],
  ...overrides
});

import SalaryCalculationStep from '../SalaryCalculationStep';

const renderStep = (vm: any) =>
  render(
    <MantineProvider>
      <SalaryCalculationStep vm={vm} />
    </MantineProvider>
  );

describe('SalaryCalculationStep Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Earnings Breakdown card and fields', () => {
    renderStep(buildVm());
    expect(screen.getByText('Earnings Breakdown')).toBeInTheDocument();
    expect(screen.getByText('Basic Salary')).toBeInTheDocument();
    expect(screen.getByText('HRA (%)')).toBeInTheDocument();
    expect(screen.getByText('Special Allowance')).toBeInTheDocument();
    expect(screen.getByText('Conveyance Allowance')).toBeInTheDocument();
    expect(screen.getByText('Medical Allowance')).toBeInTheDocument();
    expect(screen.getByText('Other Allowances')).toBeInTheDocument();
  });

  it('renders Pay Date and Transaction ID fields', () => {
    renderStep(buildVm());
    expect(screen.getByText('Pay Date')).toBeInTheDocument();
    expect(screen.getByText('Transaction ID')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter transaction ID')
    ).toBeInTheDocument();
  });

  it('renders the Additional Allowances section', () => {
    renderStep(buildVm());
    expect(screen.getByText('Additional Allowances')).toBeInTheDocument();
    expect(
      screen.getByText('No additional allowances added.')
    ).toBeInTheDocument();
  });

  it('appends an allowance when Add More is clicked', () => {
    renderStep(buildVm());
    fireEvent.click(screen.getByText('Add More'));
    expect(mockAppend).toHaveBeenCalled();
    expect(mockAppend).toHaveBeenCalledWith({
      label: '',
      amount: 0,
      type: 'add'
    });
  });

  it('lists existing additional allowances with a remove action', () => {
    const vm = buildVm({
      fields: [
        { id: 'f1', label: 'Bonus', amount: 1000, type: 'add' },
        { id: 'f2', label: 'Penalty', amount: 200, type: 'deduct' }
      ],
      additionalAllowances: [
        { label: 'Bonus', amount: 1000, type: 'add' },
        { label: 'Penalty', amount: 200, type: 'deduct' }
      ]
    });
    renderStep(vm);
    expect(screen.getAllByLabelText('Remove allowance').length).toBe(2);
    expect(screen.getAllByPlaceholderText('Allowance name').length).toBe(2);
  });

  it('removes an allowance when the remove button is clicked', () => {
    const vm = buildVm({
      fields: [{ id: 'f1', label: 'Bonus', amount: 1000, type: 'add' }],
      additionalAllowances: [{ label: 'Bonus', amount: 1000, type: 'add' }]
    });
    renderStep(vm);
    fireEvent.click(screen.getByLabelText('Remove allowance'));
    expect(mockRemove).toHaveBeenCalledWith(0);
  });

  it('renders the Estimated Earnings section with breakdown labels', () => {
    renderStep(
      buildVm({ basic: 100000, hra: 10, special: 5000, conveyance: 2000 })
    );
    expect(screen.getByText('Estimated Earnings')).toBeInTheDocument();
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('HRA (10%)')).toBeInTheDocument();
    expect(screen.getByText('Special')).toBeInTheDocument();
    expect(screen.getByText('Conveyance')).toBeInTheDocument();
    expect(screen.getByText('Medical')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  it('shows the gross estimate total', () => {
    renderStep(
      buildVm({ basic: 100000, hra: 10, special: 5000, conveyance: 2000 })
    );
    expect(screen.getByText('Gross Earnings (est.)')).toBeInTheDocument();
  });

  it('upserts the transaction id in uppercase', () => {
    renderStep(buildVm());
    const input = screen.getByPlaceholderText('Enter transaction ID');
    fireEvent.change(input, { target: { value: 'txn123' } });
    expect(mockSetValue).toHaveBeenCalledWith('transactionId', 'TXN123');
  });

  it('fires prevStep when Back is clicked', () => {
    renderStep(buildVm());
    fireEvent.click(screen.getByText('Back'));
    expect(mockPrevStep).toHaveBeenCalled();
  });

  it('fires nextStep when Preview is clicked', () => {
    renderStep(buildVm());
    fireEvent.click(screen.getByText('Preview'));
    expect(mockNextStep).toHaveBeenCalled();
  });

  it('disables the Preview button while loading the preview', () => {
    renderStep(buildVm({ isPreviewLoading: true }));
    expect(screen.getByText('Preview')).toBeDisabled();
  });
});
