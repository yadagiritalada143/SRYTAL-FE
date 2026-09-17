import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

const mockNumericValue = jest.fn();

let mockPayroll: any = {
  search: '',
  setSearch: jest.fn(),
  isLoading: false,
  error: null,
  filteredEmployees: [],
  selectedEmployee: null,
  setSelectedEmployee: jest.fn(),
  previewUrl: null,
  selectedMonth: null,
  setSelectedMonth: jest.fn(),
  previewLoading: false,
  slipError: null
};

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

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNumericValue
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({
    children,
    onClick
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>
}));

jest.mock('@components/common/page-header/PageHeader', () => (props: any) => (
  <div data-testid='page-header'>
    <span>{props.title}</span>
    <span>{props.subtitle}</span>
    <div>{props.actions}</div>
  </div>
));

jest.mock('../payroll/usePayroll', () => ({
  usePayroll: () => mockPayroll
}));

let employeeListPanelProps: any = null;
jest.mock('../payroll/EmployeeListPanel', () => (props: any) => {
  employeeListPanelProps = props;
  return <div data-testid='employee-list-panel'>EmployeeListPanel</div>;
});

let payslipPanelProps: any = null;
jest.mock('../payroll/PayslipPanel', () => (props: any) => {
  payslipPanelProps = props;
  return <div data-testid='payslip-panel'>PayslipPanel</div>;
});

import PayrollManagement from '../all-employee-reports';

const renderPage = () =>
  render(
    <MantineProvider>
      <MemoryRouter>
        <PayrollManagement />
      </MemoryRouter>
    </MantineProvider>
  );

describe('PayrollManagement (all-employee-reports) Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    employeeListPanelProps = null;
    payslipPanelProps = null;
    mockPayroll = {
      search: 'ann',
      setSearch: jest.fn(),
      isLoading: false,
      error: null,
      filteredEmployees: [],
      selectedEmployee: null,
      setSelectedEmployee: jest.fn(),
      previewUrl: null,
      selectedMonth: null,
      setSelectedMonth: jest.fn(),
      previewLoading: false,
      slipError: null
    };
  });

  it('renders the page header', () => {
    renderPage();
    expect(screen.getByTestId('page-header')).toBeInTheDocument();
    expect(screen.getByText('Payroll Administration')).toBeInTheDocument();
    expect(screen.getByText(/Manage salary processing/)).toBeInTheDocument();
  });

  it('renders the Back button', () => {
    renderPage();
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('renders the employee list panel and payslip panel', () => {
    renderPage();
    expect(screen.getByTestId('employee-list-panel')).toBeInTheDocument();
    expect(screen.getByTestId('payslip-panel')).toBeInTheDocument();
  });

  it('passes payroll state into the employee list panel', () => {
    const employees = [{ id: 'e1', firstName: 'Ann' }];
    mockPayroll = { ...mockPayroll, filteredEmployees: employees };
    renderPage();
    expect(employeeListPanelProps).not.toBeNull();
    expect(employeeListPanelProps.search).toBe('ann');
    expect(employeeListPanelProps.employees).toEqual(employees);
    expect(employeeListPanelProps.isLoading).toBe(false);
    expect(employeeListPanelProps.error).toBeNull();
    expect(typeof employeeListPanelProps.onSearchChange).toBe('function');
    expect(typeof employeeListPanelProps.onSelect).toBe('function');
  });

  it('passes payroll state into the payslip panel', () => {
    const emp = { id: 'e1', firstName: 'Ann' };
    const month = new Date(2026, 5, 1);
    mockPayroll = {
      ...mockPayroll,
      selectedEmployee: emp,
      selectedMonth: month,
      previewUrl: 'https://example.com/slip.pdf',
      previewLoading: true,
      slipError: null
    };
    renderPage();
    expect(payslipPanelProps).not.toBeNull();
    expect(payslipPanelProps.employee).toEqual(emp);
    expect(payslipPanelProps.selectedMonth).toEqual(month);
    expect(payslipPanelProps.previewUrl).toBe('https://example.com/slip.pdf');
    expect(payslipPanelProps.previewLoading).toBe(true);
    expect(typeof payslipPanelProps.onMonthChange).toBe('function');
  });
});
