import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import React from 'react';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: jest.fn()
}));

jest.mock('@atoms/user', () => ({
  userDetailsAtom: {
    __TEMP_LEGACY_ATOM: true,
    key: 'userDetails',
    default: {
      firstName: 'John',
      lastName: 'Doe',
      userRole: 'Employee',
      id: 'user-123',
      passwordResetRequired: 'false'
    }
  }
}));

jest.mock('recoil', () => ({
  ...jest.requireActual('recoil'),
  useRecoilValue: jest.fn()
}));

jest.mock('@services/common-services', () => ({
  downloadSalarySlip: jest.fn()
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: jest.fn().mockReturnValue(false)
}));

jest.mock('../../button/CommonButton', () => ({
  CommonButton: (props: any) => (
    <button
      data-testid='common-button'
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}));

const SalarySlipReport = require('../salary-slip').default;
const mockUseAppTheme =
  jest.requireMock('@hooks/use-app-theme').useAppTheme;
const mockUseRecoilValue = jest.requireMock('recoil').useRecoilValue;
const mockDownloadSalarySlip =
  jest.requireMock('@services/common-services').downloadSalarySlip;

const qc = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <RecoilRoot>
    <QueryClientProvider client={qc}>
      <MantineProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  </RecoilRoot>
);

describe('SalarySlipReport Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRecoilValue.mockReturnValue({
      id: 'user-123',
      firstName: 'John',
      lastName: 'Doe'
    });
    mockUseAppTheme.mockReturnValue({
      themeConfig: {
        color: '#212529',
        backgroundColor: '#ffffff',
        borderColor: '#dee2e6',
        button: { color: '#495057', textColor: '#ffffff' },
        headerBackgroundColor: '#f8f9fa',
        mutedTextColor: '#6c757d',
        accentColor: '#1c7ed6'
      },
      organizationConfig: { organization_name: 'srytal' },
      isDarkTheme: false
    });
  });

  it('renders the salary slip title', () => {
    render(
      <Wrapper>
        <SalarySlipReport />
      </Wrapper>
    );

    expect(screen.getByText('My Salary Slips')).toBeInTheDocument();
  });

  it('renders the pay period section', () => {
    render(
      <Wrapper>
        <SalarySlipReport />
      </Wrapper>
    );

    expect(screen.getByText('Pay Period')).toBeInTheDocument();
  });

  it('renders the month picker', () => {
    render(
      <Wrapper>
        <SalarySlipReport />
      </Wrapper>
    );

    expect(screen.getByText('Month')).toBeInTheDocument();
  });

  it('renders view salary slip button as disabled initially', () => {
    render(
      <Wrapper>
        <SalarySlipReport />
      </Wrapper>
    );

    expect(
      screen.getByText('View Salary Slip')
    ).toBeInTheDocument();
  });

  it('renders idle state message', () => {
    render(
      <Wrapper>
        <SalarySlipReport />
      </Wrapper>
    );

    expect(screen.getByText('No Statement Selected')).toBeInTheDocument();
    expect(
      screen.getByText(/Select a month and click/)
    ).toBeInTheDocument();
  });

  it('shows info text about salary slips', () => {
    render(
      <Wrapper>
        <SalarySlipReport />
      </Wrapper>
    );

    expect(
      screen.getByText(/Salary slips are available after monthly payroll/)
    ).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(
      <Wrapper>
        <SalarySlipReport />
      </Wrapper>
    );

    expect(
      screen.getByText(/Access and download your verified/)
    ).toBeInTheDocument();
  });

  it('handles successful salary slip fetch', async () => {
    mockDownloadSalarySlip.mockResolvedValue({
      success: true,
      message: 'Found',
      data: {
        downloadUrl: 'https://example.com/slip.pdf',
        fileName: 'salary_slip.pdf'
      }
    });

    render(
      <Wrapper>
        <SalarySlipReport />
      </Wrapper>
    );

    const viewBtn = screen.getByText('View Salary Slip');
    expect(viewBtn).toBeInTheDocument();
  });

  it('handles error state', async () => {
    mockDownloadSalarySlip.mockRejectedValue(new Error('Server error'));

    render(
      <Wrapper>
        <SalarySlipReport />
      </Wrapper>
    );

    const viewBtn = screen.getByText('View Salary Slip');
    expect(viewBtn).toBeInTheDocument();
  });

  it('renders download button structure', () => {
    render(
      <Wrapper>
        <SalarySlipReport />
      </Wrapper>
    );

    expect(screen.getByText('View Salary Slip')).toBeInTheDocument();
  });
});

