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
        data-testid='basic-date-input'
        onChange={e => onChange(new Date(e.target.value))}
      />
      {error && <span data-testid='basic-date-error'>{error}</span>}
    </div>
  )
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      iconColor: '#868e96',
      dangerColor: '#e03131',
      successColor: '#37b24d',
      headerBackgroundColor: '#f8f9fa'
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

const mockInputChange = jest.fn();
const mockRegister = jest.fn().mockImplementation((name: string) => ({
  name,
  onChange: mockInputChange
}));

import BasicInfoSection from '../BasicInfoSection';

const renderSection = (errors: any = {}) => {
  return render(
    <MantineProvider>
      <BasicInfoSection
        register={mockRegister as any}
        control={{ mock: true } as any}
        errors={errors}
      />
    </MantineProvider>
  );
};

describe('BasicInfoSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the section title and subtitle', () => {
    renderSection();
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
    expect(
      screen.getByText('Employee identity and contact information.')
    ).toBeInTheDocument();
  });

  it('renders all input labels', () => {
    renderSection();
    expect(screen.getByText('Employee ID')).toBeInTheDocument();
    expect(screen.getByText('Date of Joining')).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByText('Mobile Number')).toBeInTheDocument();
    expect(screen.getByText('Aadhar Number')).toBeInTheDocument();
    expect(screen.getByText('PAN Card Number')).toBeInTheDocument();
  });

  it('renders placeholders for the text inputs', () => {
    renderSection();
    expect(screen.getByPlaceholderText('Enter employee ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter first name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Aadhaar number')).toBeInTheDocument();
  });

  it('registers every basic field', () => {
    renderSection();
    expect(mockRegister).toHaveBeenCalledWith('employeeId');
    expect(mockRegister).toHaveBeenCalledWith('firstName');
    expect(mockRegister).toHaveBeenCalledWith('lastName');
    expect(mockRegister).toHaveBeenCalledWith('email');
    expect(mockRegister).toHaveBeenCalledWith('mobileNumber');
    expect(mockRegister).toHaveBeenCalledWith('aadharNumber');
    expect(mockRegister).toHaveBeenCalledWith('panCardNumber');
  });

  it('shows field errors', () => {
    renderSection({
      firstName: { message: 'First name is required' },
      panCardNumber: { message: 'PAN number is required' }
    });
    expect(screen.getByText('First name is required')).toBeInTheDocument();
    expect(screen.getByText('PAN number is required')).toBeInTheDocument();
  });

  it('lowercases nothing but uppercases PAN input on change', () => {
    renderSection();
    const panInput = screen.getByPlaceholderText('Enter PAN Card number');
    fireEvent.change(panInput, { target: { value: 'abcde1234f' } });

    expect(mockInputChange).toHaveBeenCalledTimes(1);
    const event = mockInputChange.mock.calls[0][0];
    expect(event.target.value).toBe('ABCDE1234F');
  });

  it('converts the date of joining to an ISO date string', () => {
    renderSection();
    const dateInput = screen.getByTestId('basic-date-input');
    fireEvent.change(dateInput, { target: { value: '2024-03-14' } });

    expect(mockFieldChange).toHaveBeenCalled();
    const isoValue = mockFieldChange.mock.calls[0][0];
    expect(isoValue).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});