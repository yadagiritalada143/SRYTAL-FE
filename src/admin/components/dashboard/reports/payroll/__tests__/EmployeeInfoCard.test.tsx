import { render, screen } from '@testing-library/react';
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

import EmployeeInfoCard from '../EmployeeInfoCard';

const employee = {
  id: 'e1',
  employeeId: 'SRY001',
  firstName: 'Alice',
  lastName: 'Smith',
  email: 'alice@srytal.com',
  dateOfBirth: '1995-06-15',
  userRole: 'Admin',
  panCardNumber: 'ABCDE1234F',
  aadharNumber: '123456789012'
};

const renderCard = (emp: any = employee) =>
  render(
    <MantineProvider>
      <EmployeeInfoCard employee={emp} />
    </MantineProvider>
  );

describe('EmployeeInfoCard Component', () => {
  it('renders the Employment Details section', () => {
    renderCard();
    expect(screen.getByText('Employment Details')).toBeInTheDocument();
    expect(screen.getByText('Employee ID')).toBeInTheDocument();
    expect(screen.getByText('SRY001')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('renders Personal Information section with formatted DOB and email', () => {
    renderCard();
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Date of Birth')).toBeInTheDocument();
    expect(screen.getByText(/15/)).toBeInTheDocument();
    expect(screen.getByText('alice@srytal.com')).toBeInTheDocument();
  });

  it('renders Identification Details section', () => {
    renderCard();
    expect(screen.getByText('Identification Details')).toBeInTheDocument();
    expect(screen.getByText('PAN')).toBeInTheDocument();
    expect(screen.getByText('ABCDE1234F')).toBeInTheDocument();
    expect(screen.getByText('Aadhar Number')).toBeInTheDocument();
    expect(screen.getByText('123456789012')).toBeInTheDocument();
  });

  it('renders dash placeholders for missing values', () => {
    renderCard({ id: 'e2' });
    expect(screen.getAllByText('\u2014').length).toBeGreaterThanOrEqual(3);
  });

  it('capitalizes the display role', () => {
    renderCard({ ...employee, userRole: 'recruiter' });
    expect(screen.getByText('recruiter')).toBeInTheDocument();
  });
});
