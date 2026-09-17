import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#1971c2',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#1971c2', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'SRYTAL' }
  })
}));

const mockSendExpertConsultationMail = jest.fn();
jest.mock('@services/common-services', () => ({
  sendExpertConsultationMail: (...args: any[]) => mockSendExpertConsultationMail(...args)
}));

const mockFetchCountryCodes = jest.fn();
const mockFetchCurrencies = jest.fn();
jest.mock('@utils/country-codes', () => ({
  fetchCountryCodes: () => mockFetchCountryCodes(),
  fetchCurrencies: () => mockFetchCurrencies(),
  TIMELINE_OPTIONS: [
    { value: '1-2weeks', label: '1-2 Weeks' },
    { value: '1month', label: '1 Month' },
    { value: '3months', label: '3+ Months' }
  ]
}));

import { ExpertConsultationSection } from '../ExpertConsultationSection';

const mockCountries = [
  { name: 'India', code: 'IN', dial_code: '+91', flag: '🇮🇳', currency: 'INR' },
  { name: 'United States', code: 'US', dial_code: '+1', flag: '🇺🇸', currency: 'USD' }
];

const mockCurrencies = [
  { value: 'INR', label: 'INR' },
  { value: 'USD', label: 'USD' }
];

const renderForm = () =>
  render(
    <MantineProvider>
      <ExpertConsultationSection />
    </MantineProvider>
  );

describe('ExpertConsultationSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchCountryCodes.mockResolvedValue(mockCountries);
    mockFetchCurrencies.mockResolvedValue(mockCurrencies);
  });

  it('renders the form heading', async () => {
    renderForm();
    expect(screen.getByText('Get Your Free Expert Consultation Today')).toBeInTheDocument();
  });

  it('renders all form fields', async () => {
    renderForm();
    expect(screen.getByLabelText(/Full Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Project Budget/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Timeline/)).toBeInTheDocument();
  });

  it('renders the optional company field', async () => {
    renderForm();
    expect(screen.getByLabelText(/Company/)).toBeInTheDocument();
    expect(screen.getByText('Optional')).toBeInTheDocument();
  });

  it('renders the submit button', async () => {
    renderForm();
    expect(screen.getByRole('button', { name: /Get Expert Guidance/ })).toBeInTheDocument();
  });

  it('renders the left column highlights', async () => {
    renderForm();
    expect(screen.getByText('Customer Support')).toBeInTheDocument();
    expect(screen.getByText('Consultants Available Now')).toBeInTheDocument();
  });

  it('fetches country codes on mount', async () => {
    renderForm();
    await waitFor(() => {
      expect(mockFetchCountryCodes).toHaveBeenCalled();
    });
  });

  it('fetches currencies on mount', async () => {
    renderForm();
    await waitFor(() => {
      expect(mockFetchCurrencies).toHaveBeenCalled();
    });
  });

  it('shows validation errors on empty required fields', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /Get Expert Guidance/ }));
    await waitFor(() => {
      expect(screen.getByText('Please enter your full name')).toBeInTheDocument();
    });
  });

  it('shows validation error for short name', async () => {
    renderForm();
    fireEvent.change(screen.getByLabelText(/Full Name/), { target: { value: 'A' } });
    fireEvent.click(screen.getByRole('button', { name: /Get Expert Guidance/ }));
    await waitFor(() => {
      expect(screen.getByText('Please enter your full name')).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    renderForm();
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'invalid' } });
    fireEvent.click(screen.getByRole('button', { name: /Get Expert Guidance/ }));
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('shows validation error for missing phone', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /Get Expert Guidance/ }));
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument();
    });
  });

  it('shows validation error for missing budget', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /Get Expert Guidance/ }));
    await waitFor(() => {
      expect(screen.getByText('Please enter project budget')).toBeInTheDocument();
    });
  });

  it('shows validation error for missing timeline', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /Get Expert Guidance/ }));
    await waitFor(() => {
      expect(screen.getByText('Please select a project timeline')).toBeInTheDocument();
    });
  });

  it('submits successfully with valid data', async () => {
    mockSendExpertConsultationMail.mockResolvedValueOnce({});
    renderForm();

    await waitFor(() => {
      expect(mockFetchCountryCodes).toHaveBeenCalled();
    });

    fireEvent.change(screen.getByLabelText(/Full Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Phone number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. 50,000/), { target: { value: '50000' } });
    fireEvent.change(screen.getByLabelText(/Timeline/), { target: { value: '1-2weeks' } });

    fireEvent.click(screen.getByRole('button', { name: /Get Expert Guidance/ }));

    await waitFor(() => {
      expect(mockSendExpertConsultationMail).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText(/Thank you! Your consultation request has been submitted/)).toBeInTheDocument();
    });
  });

  it('shows error notification on submission failure', async () => {
    mockSendExpertConsultationMail.mockRejectedValueOnce(new Error('fail'));
    renderForm();

    await waitFor(() => {
      expect(mockFetchCountryCodes).toHaveBeenCalled();
    });

    fireEvent.change(screen.getByLabelText(/Full Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Phone number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. 50,000/), { target: { value: '50000' } });
    fireEvent.change(screen.getByLabelText(/Timeline/), { target: { value: '1-2weeks' } });

    fireEvent.click(screen.getByRole('button', { name: /Get Expert Guidance/ }));

    await waitFor(() => {
      expect(screen.getByText(/Unable to submit your request/)).toBeInTheDocument();
    });
  });

  it('populates country select with fetched countries', async () => {
    renderForm();
    await waitFor(() => {
      expect(screen.getByText('IN (+91)')).toBeInTheDocument();
      expect(screen.getByText('US (+1)')).toBeInTheDocument();
    });
  });

  it('changes country code when a different country is selected', async () => {
    renderForm();
    await waitFor(() => {
      expect(mockFetchCountryCodes).toHaveBeenCalled();
    });

    const select = screen.getByLabelText('Country Code');
    fireEvent.change(select, { target: { value: 'US' } });

    expect(select).toHaveValue('US');
  });

  it('handles country fetch failure gracefully', async () => {
    mockFetchCountryCodes.mockRejectedValueOnce(new Error('network'));
    renderForm();
    await waitFor(() => {
      expect(mockFetchCountryCodes).toHaveBeenCalled();
    });
    expect(screen.getByText('Get Your Free Expert Consultation Today')).toBeInTheDocument();
  });

  it('handles currency fetch failure gracefully', async () => {
    mockFetchCurrencies.mockRejectedValueOnce(new Error('network'));
    renderForm();
    await waitFor(() => {
      expect(mockFetchCurrencies).toHaveBeenCalled();
    });
    expect(screen.getByText('Get Your Free Expert Consultation Today')).toBeInTheDocument();
  });

  it('renders the org name in the left column', async () => {
    renderForm();
    expect(screen.getByText(/At SRYTAL, our specialists/)).toBeInTheDocument();
  });

  it('shows sending state during submission', async () => {
    let resolvePromise: any;
    mockSendExpertConsultationMail.mockReturnValueOnce(
      new Promise(resolve => { resolvePromise = resolve; })
    );

    renderForm();

    await waitFor(() => {
      expect(mockFetchCountryCodes).toHaveBeenCalled();
    });

    fireEvent.change(screen.getByLabelText(/Full Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Phone number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. 50,000/), { target: { value: '50000' } });
    fireEvent.change(screen.getByLabelText(/Timeline/), { target: { value: '1-2weeks' } });

    fireEvent.click(screen.getByRole('button', { name: /Get Expert Guidance/ }));

    await waitFor(() => {
      expect(screen.getByText('Submitting...')).toBeInTheDocument();
    });

    resolvePromise({});
  });
});
