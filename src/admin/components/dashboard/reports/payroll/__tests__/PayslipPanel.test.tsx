import { render, screen } from '@testing-library/react';
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
      cardBackground: '#ffffff',
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

jest.mock('../EmployeeInfoCard', () => () => (
  <div data-testid='employee-info-card'>EmployeeInfoCard</div>
));

import PayslipPanel from '../PayslipPanel';

const employee = {
  id: 'e1',
  employeeId: 'SRY001',
  firstName: 'Alice',
  lastName: 'Smith',
  userRole: 'Admin',
  employmentType: { employmentType: 'Full-time' }
};

const defaultProps = {
  employee: null as any,
  selectedMonth: null as Date | null,
  onMonthChange: jest.fn(),
  previewUrl: null as string | null,
  previewLoading: false,
  slipError: null as string | null
};

const renderPanel = (props: any = {}) => {
  const merged = { ...defaultProps, ...props };
  return render(
    <MantineProvider>
      <PayslipPanel {...merged} />
    </MantineProvider>
  );
};

describe('PayslipPanel Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the empty state when no employee is selected', () => {
    renderPanel();
    expect(screen.getByText('No Employee Selected')).toBeInTheDocument();
    expect(
      screen.getByText(/Select an employee from the list/)
    ).toBeInTheDocument();
  });

  it('renders the selected employee identity header', () => {
    renderPanel({ employee });
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('SRY001')).toBeInTheDocument();
    expect(screen.getByText('Full-time')).toBeInTheDocument();
  });

  it('renders the salary month period picker label', () => {
    renderPanel({ employee });
    expect(screen.getByText('Salary Month Period')).toBeInTheDocument();
  });

  it('renders the employee info card', () => {
    renderPanel({ employee });
    expect(screen.getByTestId('employee-info-card')).toBeInTheDocument();
  });

  it('prompts to select a month when none is selected', () => {
    renderPanel({ employee });
    expect(
      screen.getByText('Select a month to view the salary slip.')
    ).toBeInTheDocument();
  });

  it('shows loading text while preview is loading', () => {
    renderPanel({
      employee,
      selectedMonth: new Date(2026, 5, 1),
      previewLoading: true
    });
    expect(screen.getByText('Loading salary slip...')).toBeInTheDocument();
  });

  it('shows the slip error when present', () => {
    renderPanel({
      employee,
      selectedMonth: new Date(2026, 5, 1),
      slipError: 'Salary slip not available for selected pay period.'
    });
    expect(
      screen.getByText('Salary slip not available for selected pay period.')
    ).toBeInTheDocument();
  });

  it('renders the iframe preview when a preview URL is available', () => {
    renderPanel({
      employee,
      selectedMonth: new Date(2026, 5, 1),
      previewUrl: 'https://example.com/slip.pdf'
    });
    const iframe = document.querySelector(
      'iframe[title="Salary Slip Preview"]'
    ) as HTMLIFrameElement;
    expect(iframe).toBeInTheDocument();
    expect(iframe.src).toContain('https://example.com/slip.pdf');
    expect(screen.getByText(/Preview :/)).toBeInTheDocument();
  });
});
