import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import React from 'react';
import OfferLetterModal from '../offerletter';

jest.mock('@services/super-admin-services', () => ({
  GenerateOfferletterBySuperAdmin: jest.fn()
}));

jest.mock('react-toastify', () => ({
  toast: { success: jest.fn(), error: jest.fn() }
}));

jest.mock('@components/common/loaders/PremiumLoader', () => () => null);

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {},
    isDarkTheme: false,
    organizationConfig: {},
    appColors: {}
  })
}));

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: (name: string) => ({ name }),
    handleSubmit: (cb: any) => (e?: any) => {
      if (e?.preventDefault) e.preventDefault();
      return cb({
        subject: 'Welcome offer',
        nameOfTheCandidate: 'John Doe',
        dateOfJoining: '2026-01-01',
        compensation: '10000',
        workLocation: 'Chennai',
        role: 'employee'
      });
    },
    control: {},
    getValues: () => ({ nameOfTheCandidate: 'John Doe' }),
    reset: jest.fn(),
    formState: { errors: {}, isSubmitting: false }
  }),
  Controller: ({ name, render: renderField }: any) =>
    renderField({
      field: {
        name,
        value: 'employee',
        onChange: jest.fn(),
        onBlur: jest.fn()
      }
    })
}));

const mockGenerateOfferletterBySuperAdmin = () =>
  (jest.requireMock('@services/super-admin-services') as any)
    .GenerateOfferletterBySuperAdmin;

const renderOfferLetter = () =>
  render(
    React.createElement(
      MantineProvider,
      null,
      React.createElement(OfferLetterModal, null)
    )
  );

describe('offerletter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.URL.createObjectURL = jest.fn(() => 'blob:mock');
    window.URL.revokeObjectURL = jest.fn();
  });

  it('exports the OfferLetterModal component', () => {
    expect(OfferLetterModal).toBeDefined();
    expect(typeof OfferLetterModal).toBe('function');
  });

  it('renders the offer letter form fields', () => {
    renderOfferLetter();
    expect(screen.getByText('OFFER LETTER')).toBeInTheDocument();
    expect(screen.getByText('Subject')).toBeInTheDocument();
    expect(screen.getByText('Candidate Name')).toBeInTheDocument();
    expect(screen.getByText('Joining Date')).toBeInTheDocument();
    expect(screen.getByText('Compensation')).toBeInTheDocument();
    expect(screen.getByText('User Role')).toBeInTheDocument();
    expect(screen.getByText('Work Location')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /generate offerletter/i })
    ).toBeInTheDocument();
  });

  it('generates the offer letter on submit', () => {
    mockGenerateOfferletterBySuperAdmin().mockResolvedValue(new ArrayBuffer(8));
    renderOfferLetter();

    const submitButton = screen.getByRole('button', {
      name: /generate offerletter/i
    });
    const form = submitButton.closest('form') as HTMLFormElement;
    fireEvent.submit(form);

    expect(mockGenerateOfferletterBySuperAdmin()).toHaveBeenCalledWith({
      subject: 'Welcome offer',
      nameOfTheCandidate: 'John Doe',
      dateOfJoining: '2026-01-01',
      compensation: '10000',
      workLocation: 'Chennai',
      role: 'employee'
    });
  });

  it('shows a success toast after generating the offer letter', async () => {
    mockGenerateOfferletterBySuperAdmin().mockResolvedValue(new ArrayBuffer(8));
    renderOfferLetter();

    const submitButton = screen.getByRole('button', {
      name: /generate offerletter/i
    });
    const form = submitButton.closest('form') as HTMLFormElement;
    fireEvent.submit(form);

    await waitFor(() => {
      const { toast } = jest.requireMock('react-toastify') as any;
      expect(toast.success).toHaveBeenCalled();
      expect(window.URL.createObjectURL).toHaveBeenCalled();
    });
  });

  it('shows an error toast when generation fails', async () => {
    mockGenerateOfferletterBySuperAdmin().mockRejectedValue(
      new Error('failed')
    );
    renderOfferLetter();

    const submitButton = screen.getByRole('button', {
      name: /generate offerletter/i
    });
    const form = submitButton.closest('form') as HTMLFormElement;
    fireEvent.submit(form);

    await waitFor(() => {
      const { toast } = jest.requireMock('react-toastify') as any;
      expect(toast.error).toHaveBeenCalledWith(
        'Failed to generate Offer Letter'
      );
    });
  });
});
