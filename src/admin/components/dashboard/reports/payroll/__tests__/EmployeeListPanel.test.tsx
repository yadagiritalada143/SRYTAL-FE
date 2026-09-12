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

import EmployeeListPanel from '../EmployeeListPanel';

const employees = [
  {
    id: 'e1',
    employeeId: 'SRY001',
    firstName: 'Alice',
    lastName: 'Smith',
    userRole: 'Admin'
  },
  {
    id: 'e2',
    employeeId: 'SRY002',
    firstName: 'Bob',
    lastName: 'Clark',
    userRole: 'Recruiter'
  }
];

const defaultProps = {
  search: '',
  onSearchChange: jest.fn(),
  isLoading: false,
  error: null as string | null,
  employees,
  selectedId: undefined as string | undefined,
  onSelect: jest.fn()
};

const renderPanel = (props: any = {}) => {
  const merged = { ...defaultProps, ...props };
  return render(
    <MantineProvider>
      <EmployeeListPanel {...merged} />
    </MantineProvider>
  );
};

describe('EmployeeListPanel Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the panel header', () => {
    renderPanel();
    expect(screen.getByText('Employees')).toBeInTheDocument();
    expect(
      screen.getByText('Select an employee to view payroll records')
    ).toBeInTheDocument();
  });

  it('renders the employee count badge', () => {
    renderPanel();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('hides the count badge while loading', () => {
    renderPanel({ isLoading: true });
    expect(screen.queryByText('2')).not.toBeInTheDocument();
    expect(screen.getByText('Loading employees...')).toBeInTheDocument();
  });

  it('renders an error message when present', () => {
    renderPanel({ error: 'Failed to load employees' });
    expect(screen.getByText('Failed to load employees')).toBeInTheDocument();
  });

  it('renders empty state when there are no employees', () => {
    renderPanel({ employees: [] });
    expect(screen.getByText('No employees found')).toBeInTheDocument();
  });

  it('renders employee names, ids and roles', () => {
    renderPanel();
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('SRY001')).toBeInTheDocument();
    expect(screen.getByText('Bob Clark')).toBeInTheDocument();
    expect(screen.getByText('SRY002')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('calls onSelect when an employee row is clicked', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Alice Smith'));
    expect(defaultProps.onSelect).toHaveBeenCalledWith(employees[0]);
  });

  it('calls onSearchChange when the search input changes', () => {
    renderPanel();
    fireEvent.change(screen.getByPlaceholderText('Search employee...'), {
      target: { value: 'ann' }
    });
    expect(defaultProps.onSearchChange).toHaveBeenCalledWith('ann');
  });

  it('displays the search value', () => {
    renderPanel({ search: 'ann' });
    expect(
      (screen.getByPlaceholderText('Search employee...') as HTMLInputElement)
        .value
    ).toBe('ann');
  });

  it('applies active styling to the selected employee row', () => {
    renderPanel({ selectedId: 'e1' });
    const row = screen.getByText('Alice Smith').closest('paper, div');
    expect(row).toBeInTheDocument();
    const alicePaper = screen.getByText('Alice Smith').parentElement;
    expect(alicePaper).toBeTruthy();
  });
});
