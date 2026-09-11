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

jest.mock('@mantine/dates', () => ({
  DatePickerInput: ({ label, error, onChange }: any) => (
    <div>
      <span>{label}</span>
      <input
        data-testid='personal-date-input'
        onChange={e => onChange(new Date(e.target.value))}
      />
      {error && <span>{error}</span>}
    </div>
  )
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
      dangerColor: '#e03131',
      successColor: '#37b24d'
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

const mockRegister = jest.fn();

import PersonalDetailsSection from '../PersonalDetailsSection';

const renderSection = (errors: any = {}) => {
  return render(
    <MantineProvider>
      <PersonalDetailsSection
        register={mockRegister as any}
        control={{ mock: true } as any}
        errors={errors}
        bloodGroupOptions={[
          { value: 'bg1', label: 'A+ (A positive)' },
          { value: 'bg2', label: 'O- (O negative)' }
        ]}
      />
    </MantineProvider>
  );
};

describe('PersonalDetailsSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the section title and optional badge', () => {
    renderSection();
    expect(screen.getByText('Personal Details')).toBeInTheDocument();
    expect(screen.getByText('(Optional)')).toBeInTheDocument();
  });

  it('renders the blood group select with options', () => {
    renderSection();
    expect(screen.getByText('Blood Group')).toBeInTheDocument();
    const select = screen.getByTestId('select-Blood Group').querySelectorAll('option');
    expect(select).toHaveLength(2);
    expect(select[0]).toHaveTextContent('A+ (A positive)');
    expect(select[1]).toHaveTextContent('O- (O negative)');
  });

  it('renders the date of birth picker and address fields', () => {
    renderSection();
    expect(screen.getByText('Date of Birth')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter present address')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter permanent address')
    ).toBeInTheDocument();
  });

  it('registers the address fields', () => {
    renderSection();
    expect(mockRegister).toHaveBeenCalledWith('presentAddress');
    expect(mockRegister).toHaveBeenCalledWith('permanentAddress');
  });

  it('forwards blood group selection through the controller', () => {
    renderSection();
    fireEvent.change(screen.getByTestId('select-Blood Group'), {
      target: { value: 'bg1' }
    });
    expect(mockFieldChange).toHaveBeenCalledWith('bg1');
  });

  it('shows field errors', () => {
    renderSection({
      bloodGroup: { message: 'Blood group is required' },
      presentAddress: { message: 'Present address is required' }
    });
    expect(screen.getByText('Blood group is required')).toBeInTheDocument();
    expect(
      screen.getByText('Present address is required')
    ).toBeInTheDocument();
  });
});