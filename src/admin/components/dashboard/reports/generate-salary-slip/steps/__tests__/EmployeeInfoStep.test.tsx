import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

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
  MonthPickerInput: (props: any) => (
    <div>
      <label>{props.label}</label>
      <input
        data-testid='month-picker-input'
        placeholder={props.placeholder}
        readOnly
      />
    </div>
  )
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({
    children,
    onClick,
    type
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'reset' | 'submit';
  }) => (
    <button type={type || 'button'} onClick={onClick}>
      {children}
    </button>
  )
}));

jest.mock('react-hook-form', () => ({
  Controller: ({ render }: any) =>
    render({
      field: {
        value: null,
        onChange: jest.fn(),
        onBlur: jest.fn(),
        ref: jest.fn()
      }
    })
}));

jest.mock('../../InfoField', () => (props: any) => (
  <div data-testid='info-field'>
    {props.label}: {props.value || '\u2014'}
  </div>
));

const mockHandleEmployeeChange = jest.fn();
const mockNextStep = jest.fn();

const buildVm = (overrides: any = {}) => ({
  employees: [],
  isLoadingEmployees: false,
  empDetails: {
    _id: '',
    empId: '',
    empName: '',
    designation: '',
    department: '',
    dateOfJoining: '',
    uanNumber: '',
    email: '',
    dob: '',
    bankAccount: '',
    ifsc: '',
    bankName: '',
    pan: '',
    aadharNumber: ''
  },
  handleEmployeeChange: mockHandleEmployeeChange,
  errors: {},
  control: {},
  register: jest.fn(() => ({})),
  calculatedDaysInMonth: 0,
  nextStep: mockNextStep,
  ...overrides
});

import EmployeeInfoStep from '../EmployeeInfoStep';

const renderStep = (vm: any) =>
  render(
    <MantineProvider>
      <EmployeeInfoStep vm={vm} />
    </MantineProvider>
  );

afterEach(() => {
  document
    .querySelectorAll('[data-mantine-shared-portal-node]')
    .forEach(node => node.replaceChildren());
});

describe('EmployeeInfoStep Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Select Employee section', () => {
    renderStep(buildVm());
    expect(screen.getByText('Select Employee')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Search employee...')
    ).toBeInTheDocument();
  });

  it('shows Loading placeholder while employees load', () => {
    renderStep(buildVm({ isLoadingEmployees: true }));
    expect(screen.getByPlaceholderText('Loading...')).toBeInTheDocument();
  });

  it('renders employee options in the select', () => {
    const employees = [
      {
        id: 'emp1',
        employeeId: 'SRY001',
        firstName: 'Alice',
        lastName: 'Smith'
      },
      {
        id: 'emp2',
        employeeId: 'SRY002',
        firstName: 'Bob',
        lastName: 'Clark'
      }
    ];
    renderStep(buildVm({ employees }));
    expect(screen.getByText('SRY001 - Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('SRY002 - Bob Clark')).toBeInTheDocument();
  });

  it('calls handleEmployeeChange when an employee option is clicked', () => {
    const employees = [
      {
        id: 'emp1',
        employeeId: 'SRY001',
        firstName: 'Alice',
        lastName: 'Smith'
      }
    ];
    renderStep(buildVm({ employees }));
    const option = screen
      .getAllByText('SRY001 - Alice Smith')
      .find(el => el.closest('[data-combobox-option]'));
    expect(option).toBeTruthy();
    if (option) fireEvent.click(option);
    expect(mockHandleEmployeeChange).toHaveBeenCalledWith('SRY001');
  });

  it('shows the empty prompt when no employee is selected', () => {
    renderStep(buildVm());
    expect(
      screen.getByText('Select an employee to load their details.')
    ).toBeInTheDocument();
  });

  it('renders the selected employee identity details', () => {
    renderStep(
      buildVm({
        empDetails: {
          _id: 'emp1',
          empId: 'SRY001',
          empName: 'Alice Smith',
          designation: 'Developer',
          department: 'Engineering',
          dateOfJoining: '2024-01-01',
          uanNumber: '',
          email: 'alice@srytal.com',
          dob: '15-06-1995',
          bankAccount: '123456',
          ifsc: 'IFSC001',
          bankName: 'HDFC',
          pan: 'ABCDE1234F',
          aadharNumber: '1234'
        }
      })
    );
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText(/alice@srytal.com/)).toBeInTheDocument();
    expect(screen.getByText(/15-06-1995/)).toBeInTheDocument();
    expect(screen.getByText(/123456/)).toBeInTheDocument();
    expect(screen.getByText(/HDFC/)).toBeInTheDocument();
    expect(screen.getByText(/IFSC001/)).toBeInTheDocument();
    expect(screen.getByText(/ABCDE1234F/)).toBeInTheDocument();
  });

  it('renders the Salary Period card', () => {
    renderStep(buildVm());
    expect(screen.getByText('Salary Period')).toBeInTheDocument();
    expect(screen.getByText('Select Month')).toBeInTheDocument();
    expect(screen.getByText('Total Days')).toBeInTheDocument();
    expect(screen.getByText('LOP Days')).toBeInTheDocument();
  });

  it('displays the calculated total days', () => {
    renderStep(buildVm({ calculatedDaysInMonth: 31 }));
    expect(screen.getByDisplayValue('31')).toBeInTheDocument();
  });

  it('fires nextStep when the Next button is clicked', () => {
    renderStep(buildVm());
    fireEvent.click(screen.getByText('Next'));
    expect(mockNextStep).toHaveBeenCalled();
  });
});
