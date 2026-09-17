import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

const mockFieldChange = jest.fn();
jest.mock('react-hook-form', () => ({
  Controller: ({ render }: any) =>
    render({
      field: {
        value: undefined,
        onChange: mockFieldChange,
        onBlur: jest.fn(),
        ref: jest.fn()
      },
      fieldState: {},
      formState: {}
    })
}));

jest.mock('@mantine/core', () => {
  const actual = jest.requireActual('@mantine/core');
  return {
    ...actual,
    Select: ({ label, data, error, onChange }: any) => (
      <div>
        <span>{label}</span>
        <select
          data-testid={`select-${label}`}
          onChange={e => onChange(e.target.value)}
        >
          {data.map((o: any) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {error && <span>{error}</span>}
      </div>
    ),
    MultiSelect: ({ label, data, error, onChange }: any) => (
      <div>
        <span>{label}</span>
        <select
          multiple
          data-testid={`multiselect-${label}`}
          onChange={e =>
            onChange(Array.from(e.target.selectedOptions).map(o => o.value))
          }
        >
          {data.map((o: any) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {error && <span>{error}</span>}
      </div>
    )
  };
});

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      iconColor: '#868e96',
      dangerColor: '#e03131'
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

const mockRegister = jest.fn();

import EmploymentDetailsSection from '../EmploymentDetailsSection';

const renderSection = (errors: any = {}) => {
  return render(
    <MantineProvider>
      <EmploymentDetailsSection
        register={mockRegister as any}
        control={{ mock: true } as any}
        errors={errors}
        employmentTypeOptions={[
          { value: 'et1', label: 'Permanent' },
          { value: 'et2', label: 'Contract' }
        ]}
        employmentRolesOptions={[
          { value: 'r1', label: 'Developer' },
          { value: 'r2', label: 'Manager' }
        ]}
        departmentOptions={[
          { value: 'd1', label: 'Engineering' },
          { value: 'd2', label: 'HR' }
        ]}
      />
    </MantineProvider>
  );
};

describe('EmploymentDetailsSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the section title and subtitle', () => {
    renderSection();
    expect(screen.getByText('Employment Details')).toBeInTheDocument();
    expect(screen.getByText('Manage role and employment type')).toBeInTheDocument();
  });

  it('renders all three controllers with their options', () => {
    renderSection();
    expect(screen.getAllByText('Employment Type').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Employee Roles').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Department').length).toBeGreaterThanOrEqual(1);

    const typeSelect = screen.getByTestId('select-Employment Type');
    expect(typeSelect).toHaveTextContent('Permanent');
    expect(typeSelect).toHaveTextContent('Contract');

    const roleSelect = screen.getByTestId('multiselect-Employee Roles');
    expect(roleSelect).toHaveTextContent('Developer');
    expect(roleSelect).toHaveTextContent('Manager');

    const deptSelect = screen.getByTestId('select-Department');
    expect(deptSelect).toHaveTextContent('Engineering');
    expect(deptSelect).toHaveTextContent('HR');
  });

  it('forwards employment type changes through the controller', () => {
    renderSection();
    fireEvent.change(screen.getByTestId('select-Employment Type'), {
      target: { value: 'et1' }
    });
    expect(mockFieldChange).toHaveBeenCalledWith('et1');
  });

  it('forwards employee role selection through the controller', () => {
    renderSection();
    const roleSelect = screen.getByTestId('multiselect-Employee Roles') as HTMLSelectElement;
    roleSelect.selectedIndex = 0;
    fireEvent.change(roleSelect, { target: { value: ['r1'] } });
    expect(mockFieldChange).toHaveBeenCalledWith(['r1']);
  });

  it('shows field errors', () => {
    renderSection({
      employmentType: { message: 'Employment type is required' },
      employeeRole: { message: 'At least one role is required' },
      department: { message: 'Department is required' }
    });
    expect(
      screen.getByText('Employment type is required')
    ).toBeInTheDocument();
    expect(
      screen.getByText('At least one role is required')
    ).toBeInTheDocument();
    expect(screen.getByText('Department is required')).toBeInTheDocument();
  });
});