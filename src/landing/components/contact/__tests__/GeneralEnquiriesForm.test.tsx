import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockSendContactUsMail = jest.fn();
jest.mock('@services/common-services', () => ({
  sendContactUsMail: (...args: any[]) => mockSendContactUsMail(...args)
}));

import { GeneralEnquiriesForm } from '../GeneralEnquiriesForm';

const renderForm = () =>
  render(<GeneralEnquiriesForm />);

describe('GeneralEnquiriesForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form heading', () => {
    renderForm();
    expect(screen.getByText('General Enquiries')).toBeInTheDocument();
  });

  it('renders the subtitle text', () => {
    renderForm();
    expect(screen.getByText(/Have questions or need assistance/)).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    renderForm();
    expect(screen.getByLabelText(/Company Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/)).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    renderForm();
    expect(screen.getByRole('button', { name: /Send Message/ })).toBeInTheDocument();
  });

  it('shows validation error for empty company name', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /Send Message/ }));
    await waitFor(() => {
      expect(screen.getByText('Please enter the company name !')).toBeInTheDocument();
    });
  });

  it('shows validation error for empty email', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /Send Message/ }));
    await waitFor(() => {
      expect(screen.getByText('Please enter valid email !')).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    renderForm();
    fireEvent.change(screen.getByLabelText(/Email Address/), {
      target: { value: 'not-an-email' }
    });
    fireEvent.click(screen.getByRole('button', { name: /Send Message/ }));
    await waitFor(() => {
      expect(screen.getByText('Please enter valid email !')).toBeInTheDocument();
    });
  });

  it('shows validation error for empty subject', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /Send Message/ }));
    await waitFor(() => {
      expect(screen.getByText('Please enter the Subject !')).toBeInTheDocument();
    });
  });

  it('shows validation error for empty message', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /Send Message/ }));
    await waitFor(() => {
      expect(screen.getByText('Please enter the Message !')).toBeInTheDocument();
    });
  });

  it('submits successfully and shows success notification', async () => {
    mockSendContactUsMail.mockResolvedValueOnce({});
    renderForm();

    fireEvent.change(screen.getByLabelText(/Company Name/), { target: { value: 'Acme Corp' } });
    fireEvent.change(screen.getByLabelText(/Email Address/), { target: { value: 'test@acme.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Hello' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Test message' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/ }));

    await waitFor(() => {
      expect(mockSendContactUsMail).toHaveBeenCalledWith({
        companyName: 'Acme Corp',
        customerEmail: 'test@acme.com',
        subject: 'Hello',
        message: 'Test message'
      });
    });

    await waitFor(() => {
      expect(screen.getByText(/Thank you for reaching out/)).toBeInTheDocument();
    });
  });

  it('shows error notification on submission failure', async () => {
    mockSendContactUsMail.mockRejectedValueOnce(new Error('Network error'));
    renderForm();

    fireEvent.change(screen.getByLabelText(/Company Name/), { target: { value: 'Acme Corp' } });
    fireEvent.change(screen.getByLabelText(/Email Address/), { target: { value: 'test@acme.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Hello' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Test message' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/ }));

    await waitFor(() => {
      expect(screen.getByText(/Oops! Something went wrong/)).toBeInTheDocument();
    });
  });

  it('resets form fields after successful submission', async () => {
    mockSendContactUsMail.mockResolvedValueOnce({});
    renderForm();

    fireEvent.change(screen.getByLabelText(/Company Name/), { target: { value: 'Acme Corp' } });
    fireEvent.change(screen.getByLabelText(/Email Address/), { target: { value: 'test@acme.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Hello' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Test message' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/ }));

    await waitFor(() => {
      expect(mockSendContactUsMail).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/Company Name/)).toHaveValue('');
      expect(screen.getByLabelText(/Email Address/)).toHaveValue('');
      expect(screen.getByLabelText(/Subject/)).toHaveValue('');
      expect(screen.getByLabelText(/Message/)).toHaveValue('');
    });
  });

  it('shows sending state during submission', async () => {
    let resolvePromise: any;
    mockSendContactUsMail.mockReturnValueOnce(
      new Promise(resolve => { resolvePromise = resolve; })
    );

    renderForm();
    fireEvent.change(screen.getByLabelText(/Company Name/), { target: { value: 'Acme Corp' } });
    fireEvent.change(screen.getByLabelText(/Email Address/), { target: { value: 'test@acme.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Hello' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Test message' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/ }));

    await waitFor(() => {
      expect(screen.getByText('Sending Message...')).toBeInTheDocument();
    });

    resolvePromise({});
  });
});
