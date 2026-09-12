import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      accentColor: '#495057'
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

const mockRegister = jest.fn().mockImplementation((name: string) => ({
  name,
  onChange: jest.fn()
}));

import BankDetailsSection from '../BankDetailsSection';

const renderSection = (errors: any = {}) => {
  return render(
    <MantineProvider>
      <BankDetailsSection
        register={mockRegister as any}
        control={{ mock: true } as any}
        errors={errors}
      />
    </MantineProvider>
  );
};

describe('BankDetailsSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the section title and optional badge', () => {
    renderSection();
    expect(screen.getByText('Bank Details')).toBeInTheDocument();
    expect(screen.getByText('(Optional)')).toBeInTheDocument();
  });

  it('renders all four bank inputs', () => {
    renderSection();
    expect(screen.getByText('Account Number')).toBeInTheDocument();
    expect(screen.getByText('Account Holder Name')).toBeInTheDocument();
    expect(screen.getByText('Bank Name')).toBeInTheDocument();
    expect(screen.getByText('IFSC Code')).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('Enter account number')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter account holder name')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter bank name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter IFSC code')).toBeInTheDocument();
  });

  it('registers nested bankDetailsInfo fields with dot notation', () => {
    renderSection();
    expect(mockRegister).toHaveBeenCalledWith('bankDetailsInfo.accountNumber');
    expect(mockRegister).toHaveBeenCalledWith(
      'bankDetailsInfo.accountHolderName'
    );
    expect(mockRegister).toHaveBeenCalledWith('bankDetailsInfo.bankName');
    expect(mockRegister).toHaveBeenCalledWith('bankDetailsInfo.ifscCode');
  });

  it('shows nested field errors', () => {
    renderSection({
      bankDetailsInfo: {
        accountNumber: { message: 'Account number is required' },
        ifscCode: { message: 'IFSC code is required' }
      }
    });
    expect(screen.getByText('Account number is required')).toBeInTheDocument();
    expect(screen.getByText('IFSC code is required')).toBeInTheDocument();
  });
});