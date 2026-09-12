import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      iconColor: '#868e96'
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

const mockRegister = jest.fn().mockImplementation((name: string) => ({
  name,
  onChange: jest.fn()
}));

import StatutoryDetailsSection from '../StatutoryDetailsSection';

const renderSection = (errors: any = {}) => {
  return render(
    <MantineProvider>
      <StatutoryDetailsSection
        register={mockRegister as any}
        control={{ mock: true } as any}
        errors={errors}
      />
    </MantineProvider>
  );
};

describe('StatutoryDetailsSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the section title and subtitle', () => {
    renderSection();
    expect(screen.getByText('Statutory Details')).toBeInTheDocument();
    expect(
      screen.getByText('Add statutory identification details for the employee.')
    ).toBeInTheDocument();
  });

  it('renders the UAN number field', () => {
    renderSection();
    expect(screen.getByText('UAN Number')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter 12-digit UAN number')
    ).toBeInTheDocument();
  });

  it('registers the uanNumber field', () => {
    renderSection();
    expect(mockRegister).toHaveBeenCalledWith('uanNumber');
  });

  it('shows field errors', () => {
    renderSection({ uanNumber: { message: 'Enter a valid UAN number' } });
    expect(screen.getByText('Enter a valid UAN number')).toBeInTheDocument();
  });
});