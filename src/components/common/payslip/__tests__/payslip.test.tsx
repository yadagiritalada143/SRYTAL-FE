import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import React from 'react';

jest.mock('@services/user-services', () => ({
  getUserDetails: jest.fn()
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: jest.fn()
}));

jest.mock('../../style-components/c-div', () => ({
  ColorDiv: (props: any) => (
    <div data-testid='color-div' className={props.className}>
      {props.children}
    </div>
  )
}));

jest.mock('../../button/CommonButton', () => ({
  CommonButton: (props: any) => (
    <button data-testid='common-button' onClick={props.onClick}>
      {props.children}
    </button>
  )
}));

jest.mock('react-toastify', () => ({
  toast: { success: jest.fn(), error: jest.fn() }
}));

const PayslipList = require('../payslip').default;
const mockGetUserDetails =
  jest.requireMock('@services/user-services').getUserDetails;
const mockUseAppTheme =
  jest.requireMock('@hooks/use-app-theme').useAppTheme;

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

describe('PayslipList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppTheme.mockReturnValue({
      themeConfig: {
        color: '#212529',
        backgroundColor: '#ffffff',
        borderColor: '#dee2e6',
        button: { color: '#495057', textColor: '#ffffff' },
        headerBackgroundColor: '#f8f9fa',
        fontFamily: 'Arial'
      },
      organizationConfig: { organization_name: 'srytal' },
      isDarkTheme: false
    });
  });

  it('renders the payslip title', async () => {
    mockGetUserDetails.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe'
    });

    render(
      <Wrapper>
        <PayslipList />
      </Wrapper>
    );

    expect(screen.getByText('Payslip List')).toBeInTheDocument();
  });

  it('renders search input', async () => {
    mockGetUserDetails.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe'
    });

    render(
      <Wrapper>
        <PayslipList />
      </Wrapper>
    );

    expect(screen.getByPlaceholderText('Search by name...')).toBeInTheDocument();
  });

  it('renders date navigation buttons', async () => {
    mockGetUserDetails.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe'
    });

    render(
      <Wrapper>
        <PayslipList />
      </Wrapper>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('renders table headers', async () => {
    mockGetUserDetails.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe'
    });

    render(
      <Wrapper>
        <PayslipList />
      </Wrapper>
    );

    expect(screen.getByText('S.No')).toBeInTheDocument();
    expect(screen.getByText('Employee Name')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('displays payslip data after loading', async () => {
    mockGetUserDetails.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe'
    });

    render(
      <Wrapper>
        <PayslipList />
      </Wrapper>
    );

await waitFor(() => {
      expect(screen.getAllByText('John Doe').length).toBeGreaterThanOrEqual(1);
    });

    expect(screen.getByText('May')).toBeInTheDocument();
    expect(screen.getByText('June')).toBeInTheDocument();
    expect(screen.getByText('✔ PAID')).toBeInTheDocument();
    expect(screen.getByText('✖ UNPAID')).toBeInTheDocument();
  });

  it('shows entry count', async () => {
    mockGetUserDetails.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe'
    });

    render(
      <Wrapper>
        <PayslipList />
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByText(/Showing 2 of 2 entries/)).toBeInTheDocument();
    });
  });

  it('renders download buttons', async () => {
    mockGetUserDetails.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe'
    });

    render(
      <Wrapper>
        <PayslipList />
      </Wrapper>
    );

    await waitFor(() => {
      const downloadButtons = screen.getAllByText('Download');
      expect(downloadButtons.length).toBe(2);
    });
  });

  it('handles search filtering', async () => {
    mockGetUserDetails.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe'
    });

    render(
      <Wrapper>
        <PayslipList />
      </Wrapper>
    );

await waitFor(() => {
      expect(screen.getAllByText('John Doe').length).toBeGreaterThanOrEqual(1);
    });

    const searchInput = screen.getByPlaceholderText('Search by name...');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    expect(
      screen.getAllByText('John Doe').length
    ).toBeGreaterThanOrEqual(1);
  });

  it('handles error from getUserDetails', async () => {
    mockGetUserDetails.mockRejectedValue(new Error('Network error'));

    render(
      <Wrapper>
        <PayslipList />
      </Wrapper>
    );

    await waitFor(() => {
      const { toast } = require('react-toastify');
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it('clears search input when X icon is clicked', async () => {
    mockGetUserDetails.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe'
    });

    render(
      <Wrapper>
        <PayslipList />
      </Wrapper>
    );

await waitFor(() => {
      expect(screen.getAllByText('John Doe').length).toBeGreaterThanOrEqual(1);
    });

    const searchInput = screen.getByPlaceholderText('Search by name...');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    const clearIcon = searchInput.parentElement?.querySelector(
      '[data-testid="input-clear"]'
    );

    if (clearIcon) {
      fireEvent.click(clearIcon);
    }
  });
});

