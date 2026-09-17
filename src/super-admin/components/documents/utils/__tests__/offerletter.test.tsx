import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

const mockGenerateOfferletterBySuperAdmin = jest.fn();
jest.mock('@services/super-admin-services', () => ({
  GenerateOfferletterBySuperAdmin: (...args: any[]) =>
    mockGenerateOfferletterBySuperAdmin(...args)
}));

const mockToastSuccess = jest.fn();
const mockToastError = jest.fn();
jest.mock('react-toastify', () => ({
  toast: {
    success: (...args: any[]) => mockToastSuccess(...args),
    error: (...args: any[]) => mockToastError(...args)
  }
}));

jest.mock('@components/common/loaders/PremiumLoader', () => ({
  __esModule: true,
  default: () => <span data-testid='premium-loader' />
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, disabled, type, ...rest }: any) => (
    <button
      disabled={disabled}
      type={type}
      {...rest}
      data-testid='common-button'
    >
      {children}
    </button>
  )
}));

import OfferLetterModal from '../offerletter';

const renderForm = () =>
  render(
    <MantineProvider>
      <OfferLetterModal />
    </MantineProvider>
  );

const selectRole = async (role: string) => {
  const roleSelect = screen.getByPlaceholderText('Select user role');
  fireEvent.mouseDown(roleSelect);
  await waitFor(() => {
    expect(screen.getAllByText(new RegExp(role)).length).toBeGreaterThan(0);
  });
  fireEvent.click(screen.getAllByText(new RegExp(role))[0]);
};

const fillValidForm = async (role = 'employee') => {
  fireEvent.change(screen.getByLabelText('Subject'), {
    target: { value: 'Offer for John' }
  });
  fireEvent.change(screen.getByLabelText('Candidate Name'), {
    target: { value: 'John Doe' }
  });
  fireEvent.change(screen.getByLabelText('Joining Date'), {
    target: { value: '2026-10-01' }
  });
  fireEvent.change(screen.getByLabelText('Compensation'), {
    target: { value: '50000' }
  });
  fireEvent.change(screen.getByLabelText('Work Location'), {
    target: { value: 'New York' }
  });
  await selectRole(role);
};

describe('OfferLetterModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.URL.createObjectURL = jest.fn(() => 'blob:http://localhost/test');
    window.URL.revokeObjectURL = jest.fn();
  });

  it('renders the form heading', () => {
    renderForm();
    expect(screen.getByText('OFFER LETTER')).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    renderForm();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
    expect(screen.getByLabelText('Candidate Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Joining Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Compensation')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Select user role')).toBeInTheDocument();
    expect(screen.getByLabelText('Work Location')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    renderForm();
    expect(screen.getByTestId('common-button')).toBeInTheDocument();
    expect(screen.getByText('Generate OfferLetter')).toBeInTheDocument();
  });

  it('submits successfully with valid data', async () => {
    const mockPdf = new ArrayBuffer(8);
    mockGenerateOfferletterBySuperAdmin.mockResolvedValueOnce(mockPdf);

    renderForm();
    await fillValidForm('employee');

    fireEvent.click(screen.getByTestId('common-button'));

    await waitFor(() => {
      expect(mockGenerateOfferletterBySuperAdmin).toHaveBeenCalledWith({
        subject: 'Offer for John',
        nameOfTheCandidate: 'John Doe',
        dateOfJoining: '2026-10-01',
        compensation: '50000',
        role: 'employee',
        workLocation: 'New York'
      });
    });

    await waitFor(() => {
      expect(mockToastSuccess).toHaveBeenCalled();
    });
  });

  it('shows error toast on submission failure', async () => {
    mockGenerateOfferletterBySuperAdmin.mockRejectedValueOnce({
      response: { data: { message: 'Generation failed' } }
    });

    renderForm();
    await fillValidForm('employee');

    fireEvent.click(screen.getByTestId('common-button'));

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith('Generation failed');
    });
  });

  it('shows generic error when no response message', async () => {
    mockGenerateOfferletterBySuperAdmin.mockRejectedValueOnce(
      new Error('Network')
    );

    renderForm();
    await fillValidForm('employee');

    fireEvent.click(screen.getByTestId('common-button'));

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith(
        'Failed to generate Offer Letter'
      );
    });
  });

  it('does not submit with validation errors', async () => {
    renderForm();
    fireEvent.click(screen.getByTestId('common-button'));

    await waitFor(() => {
      expect(mockGenerateOfferletterBySuperAdmin).not.toHaveBeenCalled();
    });
  });

  it('shows submitting state during submission', async () => {
    let resolvePromise: any;
    mockGenerateOfferletterBySuperAdmin.mockReturnValueOnce(
      new Promise(resolve => {
        resolvePromise = resolve;
      })
    );

    renderForm();
    await fillValidForm('employee');

    fireEvent.click(screen.getByTestId('common-button'));

    await waitFor(() => {
      expect(screen.getByText('Generating...')).toBeInTheDocument();
    });

    resolvePromise(new ArrayBuffer(8));
  });

  it('resets the form after successful submission', async () => {
    mockGenerateOfferletterBySuperAdmin.mockResolvedValueOnce(
      new ArrayBuffer(8)
    );

    renderForm();
    await fillValidForm('employee');

    fireEvent.click(screen.getByTestId('common-button'));

    await waitFor(() => {
      expect(screen.getByLabelText('Candidate Name')).toHaveValue('');
    });
  });

  it('allows selecting recruiter role', async () => {
    mockGenerateOfferletterBySuperAdmin.mockResolvedValueOnce(
      new ArrayBuffer(8)
    );

    renderForm();
    await fillValidForm('recruiter');

    fireEvent.click(screen.getByTestId('common-button'));

    await waitFor(() => {
      expect(mockGenerateOfferletterBySuperAdmin).toHaveBeenCalledWith(
        expect.objectContaining({ role: 'recruiter' })
      );
    });
  });
});
