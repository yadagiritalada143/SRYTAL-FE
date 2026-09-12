import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import AddCompany from '../add-company';

const mockAddCompany = jest.fn();
jest.mock('@hooks/mutations/useUserMutations', () => ({
  useAddCompany: () => ({
    mutateAsync: mockAddCompany,
    isPending: false
  })
}));

const mockShowSuccessToast = jest.fn();
const mockShowErrorToast = jest.fn();
jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: mockShowSuccessToast,
    showErrorToast: mockShowErrorToast
  })
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, disabled, type }: any) => (
    <button type={type ?? 'button'} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}));

jest.mock('@components/common/loaders/PremiumLoader', () => () => (
  <div data-testid='premium-loader' />
));

jest.mock('@components/common/page-header/PageHeader', () => (props: any) => (
  <div data-testid='page-header'>
    <span>{props.title}</span>
    <span>{props.subtitle}</span>
    {props.actions}
  </div>
));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const renderForm = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <AddCompany />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

// Primary contact comes first in the DOM, then secondary 1, then secondary 2.
const fillPrimaryContact = ({
  name = 'John Doe',
  email = 'john@acme.com',
  phone = '1234567890'
} = {}) => {
  if (name !== undefined) {
    fireEvent.change(screen.getAllByLabelText(/^Name/)[0], {
      target: { value: name }
    });
  }
  if (email !== undefined) {
    fireEvent.change(screen.getAllByLabelText(/^Email/)[0], {
      target: { value: email }
    });
  }
  if (phone !== undefined) {
    fireEvent.change(screen.getAllByLabelText(/^Phone/)[0], {
      target: { value: phone }
    });
  }
};

const fillSecondaryContact = (
  index: number,
  { name = 'Jane Smith', email = 'jane@acme.com', phone = '0987654321' } = {}
) => {
  fireEvent.change(screen.getAllByLabelText(/^Name/)[index], {
    target: { value: name }
  });
  fireEvent.change(screen.getAllByLabelText(/^Email/)[index], {
    target: { value: email }
  });
  fireEvent.change(screen.getAllByLabelText(/^Phone/)[index], {
    target: { value: phone }
  });
};

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText(/Company Name/), {
    target: { value: 'Acme Corp' }
  });
  fillPrimaryContact();
  fillSecondaryContact(1);
};

const submitForm = () => {
  fireEvent.click(screen.getByRole('button', { name: 'Add Company' }));
};

describe('AddCompany', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAddCompany.mockResolvedValue({});
  });

  describe('Rendering', () => {
    it('renders the page header with title and subtitle', () => {
      renderForm();
      expect(screen.getByText('Add New Company')).toBeInTheDocument();
      expect(
        screen.getByText(/Add a new company to your recruitment pool/i)
      ).toBeInTheDocument();
    });

    it('renders the form section headings', () => {
      renderForm();
      expect(screen.getByText('Company Information')).toBeInTheDocument();
      expect(screen.getByText('Primary Contact')).toBeInTheDocument();
      expect(
        screen.getByText('Secondary Contacts (Optional)')
      ).toBeInTheDocument();
      expect(screen.getByText('Secondary Contact 1')).toBeInTheDocument();
      expect(screen.getByText('Secondary Contact 2')).toBeInTheDocument();
    });

    it('renders the company name field', () => {
      renderForm();
      expect(screen.getByLabelText(/Company Name/)).toBeInTheDocument();
    });

    it('renders name, email and phone fields for the primary and both secondary contacts', () => {
      renderForm();
      expect(screen.getAllByLabelText(/^Name/)).toHaveLength(3);
      expect(screen.getAllByLabelText(/^Email/)).toHaveLength(3);
      expect(screen.getAllByLabelText(/^Phone/)).toHaveLength(3);
    });

    it('renders the submit, cancel and back buttons', () => {
      renderForm();
      expect(
        screen.getByRole('button', { name: 'Add Company' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Cancel' })
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('shows an error when submitting an empty form', async () => {
      renderForm();
      submitForm();
      expect(
        await screen.findByText('Please enter company name')
      ).toBeInTheDocument();
      expect(mockAddCompany).not.toHaveBeenCalled();
    });

    it('rejects a primary phone number that is too short', async () => {
      renderForm();
      fillPrimaryContact({ name: undefined, email: undefined, phone: '12345' });
      submitForm();
      expect(
        await screen.findByText('Phone number must be 10 digits')
      ).toBeInTheDocument();
      expect(mockAddCompany).not.toHaveBeenCalled();
    });

    it('rejects a primary phone number that contains non-digits', async () => {
      renderForm();
      fillPrimaryContact({
        name: undefined,
        email: undefined,
        phone: 'abcdefghij'
      });
      submitForm();
      expect(
        await screen.findByText('Phone number must contain only digits')
      ).toBeInTheDocument();
      expect(mockAddCompany).not.toHaveBeenCalled();
    });

    it('rejects an invalid primary email', async () => {
      renderForm();
      fillPrimaryContact({ name: '', email: 'not-an-email', phone: '' });
      // jsdom enforces native HTML5 email validation on submit, which would
      // block the form before RHF runs. Disable it so the schema validation
      // path is exercised.
      (document.querySelector('form') as HTMLFormElement).noValidate = true;
      submitForm();
      expect(
        await screen.findByText('Please enter a valid email')
      ).toBeInTheDocument();
      expect(mockAddCompany).not.toHaveBeenCalled();
    });

    it('accepts the form when only the company name is provided', async () => {
      renderForm();
      fireEvent.change(screen.getByLabelText(/Company Name/), {
        target: { value: 'Acme Corp' }
      });
      submitForm();

      await waitFor(() => {
        expect(mockAddCompany).toHaveBeenCalledTimes(1);
      });

      expect(
        screen.queryByText('Please enter company name')
      ).not.toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('navigates back when the Back button is clicked', () => {
      renderForm();
      fireEvent.click(screen.getByRole('button', { name: 'Back' }));
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it('navigates back when the Cancel button is clicked', () => {
      renderForm();
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });

  describe('Submit', () => {
    it('submits the form and shows a success toast then navigates back', async () => {
      renderForm();
      fillValidForm();
      submitForm();

      await waitFor(() => {
        expect(mockAddCompany).toHaveBeenCalledTimes(1);
      });

      const payload = mockAddCompany.mock.calls[0][0];
      expect(payload).toMatchObject({
        companyName: 'Acme Corp',
        primaryContact: {
          name: 'John Doe',
          email: 'john@acme.com',
          phone: '1234567890'
        },
        secondaryContact_1: {
          name: 'Jane Smith',
          email: 'jane@acme.com',
          phone: '0987654321'
        }
      });

      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Company added successfully!'
      );
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it('resets the form after a successful submit', async () => {
      renderForm();
      fillValidForm();
      submitForm();

      await waitFor(() => {
        expect(mockAddCompany).toHaveBeenCalledTimes(1);
      });

      await waitFor(() => {
        expect(screen.getByLabelText(/Company Name/)).toHaveValue('');
      });
    });

    it('sends the second secondary contact fields', async () => {
      renderForm();
      fireEvent.change(screen.getByLabelText(/Company Name/), {
        target: { value: 'Beta LLC' }
      });
      fillPrimaryContact();
      fillSecondaryContact(2, {
        name: 'Carl',
        email: 'carl@beta.com',
        phone: '5555555555'
      });
      submitForm();

      await waitFor(() => {
        expect(mockAddCompany).toHaveBeenCalledTimes(1);
      });

      const payload = mockAddCompany.mock.calls[0][0];
      expect(payload.secondaryContact_2).toMatchObject({
        name: 'Carl',
        email: 'carl@beta.com',
        phone: '5555555555'
      });
    });

    it('shows the server error message when the mutation fails', async () => {
      mockAddCompany.mockRejectedValueOnce({
        response: { data: { message: 'Server rejected company' } }
      });
      renderForm();
      fillValidForm();
      submitForm();

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalledWith(
          'Server rejected company'
        );
      });
      expect(mockShowSuccessToast).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('shows a fallback error message when the error has no message', async () => {
      mockAddCompany.mockRejectedValueOnce(new Error('boom'));
      renderForm();
      fillValidForm();
      submitForm();

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalledWith(
          'Failed to add company'
        );
      });
    });
  });
});
