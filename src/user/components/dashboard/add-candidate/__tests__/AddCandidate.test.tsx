import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import AddPoolCandidate from '../add-candidate';

const mockAddCandidate = jest.fn();
jest.mock('@hooks/mutations/useUserMutations', () => ({
  useAddCandidate: () => ({
    mutateAsync: mockAddCandidate,
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

jest.mock('@mantine/dates', () => ({
  DateTimePicker: ({ label, value, onChange }: any) => (
    <label>
      {label}
      <input
        aria-label={label}
        value={value ? new Date(value).toISOString() : ''}
        onChange={e =>
          onChange?.(e.target.value ? new Date(e.target.value) : null)
        }
      />
    </label>
  )
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
          <AddPoolCandidate />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const addSkill = (skill: string) => {
  fireEvent.change(screen.getByPlaceholderText('e.g., React, Python, AWS'), {
    target: { value: skill }
  });
  fireEvent.click(screen.getByRole('button', { name: 'Add' }));
};

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText(/Candidate Name/), {
    target: { value: 'John Doe' }
  });
  fireEvent.change(screen.getByLabelText(/Email/), {
    target: { value: 'john@example.com' }
  });
  fireEvent.change(screen.getByLabelText(/Phone/), {
    target: { value: '1234567890' }
  });
  fireEvent.change(screen.getByLabelText(/Total Experience \(Years\)/), {
    target: { value: '5' }
  });
  fireEvent.change(screen.getByLabelText(/Relevant Experience \(Years\)/), {
    target: { value: '3' }
  });
  fireEvent.change(screen.getByLabelText(/Comment/), {
    target: { value: 'Great candidate' }
  });
  fireEvent.change(screen.getByLabelText(/Call Start Time/), {
    target: { value: '2024-01-01T10:00:00.000Z' }
  });
  fireEvent.change(screen.getByLabelText(/Call End Time/), {
    target: { value: '2024-01-01T11:00:00.000Z' }
  });
};

const submitForm = () => {
  fireEvent.click(screen.getByRole('button', { name: 'Add Candidate' }));
};

describe('AddPoolCandidate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAddCandidate.mockResolvedValue({});
  });

  describe('Rendering', () => {
    it('renders the page header with title and subtitle', () => {
      renderForm();
      expect(screen.getByText('Add New Candidate')).toBeInTheDocument();
      expect(
        screen.getByText(/Add a new candidate to your recruitment pool/i)
      ).toBeInTheDocument();
    });

    it('renders the form section headings', () => {
      renderForm();
      expect(screen.getByText('Basic Information')).toBeInTheDocument();
      expect(screen.getByText('Contact Information')).toBeInTheDocument();
      expect(screen.getByText('Experience')).toBeInTheDocument();
      expect(screen.getByText('Skills & Expertise')).toBeInTheDocument();
      expect(
        screen.getByText('Initial Comments & Call Details')
      ).toBeInTheDocument();
    });

    it('renders the required input fields', () => {
      renderForm();
      expect(screen.getByLabelText(/Candidate Name/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Phone/)).toBeInTheDocument();
      expect(
        screen.getByLabelText(/Total Experience \(Years\)/)
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/Relevant Experience \(Years\)/)
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/Comment/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Call Start Time/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Call End Time/)).toBeInTheDocument();
    });

    it('renders the submit, cancel and back buttons', () => {
      renderForm();
      expect(
        screen.getByRole('button', { name: 'Add Candidate' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Cancel' })
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('shows validation errors when submitting an empty form', async () => {
      renderForm();
      submitForm();
      expect(await screen.findByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
      expect(
        screen.getByText('Phone number must be at least 10 digits')
      ).toBeInTheDocument();
      expect(screen.getByText('Comment is required')).toBeInTheDocument();
      expect(mockAddCandidate).not.toHaveBeenCalled();
    });

    it('rejects a phone number that is too short', async () => {
      renderForm();
      fireEvent.change(screen.getByLabelText(/Phone/), {
        target: { value: '12345' }
      });
      submitForm();
      expect(
        await screen.findByText('Phone number must be at least 10 digits')
      ).toBeInTheDocument();
    });

    it('rejects a name that does not match the letters-only constraint', async () => {
      renderForm();
      fireEvent.change(screen.getByLabelText(/Candidate Name/), {
        target: { value: 'John123' }
      });
      submitForm();
      expect(
        await screen.findByText('Name must contain only letters and spaces')
      ).toBeInTheDocument();
    });

    it('shows an error when relevant experience exceeds total experience', async () => {
      renderForm();
      fireEvent.change(screen.getByLabelText(/Total Experience \(Years\)/), {
        target: { value: '2' }
      });
      fireEvent.change(screen.getByLabelText(/Relevant Experience \(Years\)/), {
        target: { value: '5' }
      });
      expect(
        await screen.findByText('Cannot exceed total experience')
      ).toBeInTheDocument();
    });
  });

  describe('Skills', () => {
    it('disables the Add button when the skill input is empty', () => {
      renderForm();
      expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled();
    });

    it('adds a skill and shows the skill count', () => {
      renderForm();
      expect(screen.queryByText('Added Skills')).not.toBeInTheDocument();
      addSkill('React');
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('1 skill')).toBeInTheDocument();
    });

    it('does not add duplicate skills', () => {
      renderForm();
      addSkill('React');
      addSkill('React');
      expect(screen.getByText('1 skill')).toBeInTheDocument();
    });

    it('removes a skill when its badge is clicked', () => {
      renderForm();
      addSkill('React');
      addSkill('Node.js');
      expect(screen.getByText('2 skills')).toBeInTheDocument();
      fireEvent.click(screen.getByText('React'));
      expect(screen.queryByText('React')).not.toBeInTheDocument();
      expect(screen.getByText('1 skill')).toBeInTheDocument();
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
      addSkill('React');
      submitForm();

      await waitFor(() => {
        expect(mockAddCandidate).toHaveBeenCalledTimes(1);
      });

      const payload = mockAddCandidate.mock.calls[0][0];
      expect(payload).toMatchObject({
        candidateName: 'John Doe',
        contact: { email: 'john@example.com', phone: '1234567890' },
        evaluatedSkills: 'React'
      });
      expect(Number(payload.totalYearsOfExperience)).toBe(5);
      expect(Number(payload.relaventYearsOfExperience)).toBe(3);
      expect(payload.comments[0]).toMatchObject({
        comment: 'Great candidate',
        callStartsAt: '2024-01-01T10:00:00.000Z',
        callEndsAt: '2024-01-01T11:00:00.000Z'
      });

      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Candidate added successfully!'
      );
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it('leaves evaluatedSkills empty when no skills were added', async () => {
      renderForm();
      fillValidForm();
      submitForm();

      await waitFor(() => {
        expect(mockAddCandidate).toHaveBeenCalledTimes(1);
      });

      const payload = mockAddCandidate.mock.calls[0][0];
      expect(payload.evaluatedSkills).toBe('');
    });

    it('shows the server error message when the mutation fails', async () => {
      mockAddCandidate.mockRejectedValueOnce({
        response: { data: { message: 'Server rejected candidate' } }
      });
      renderForm();
      fillValidForm();
      submitForm();

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalledWith(
          'Server rejected candidate'
        );
      });
      expect(mockShowSuccessToast).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('shows a fallback error message when the error has no message', async () => {
      mockAddCandidate.mockRejectedValueOnce(new Error('boom'));
      renderForm();
      fillValidForm();
      submitForm();

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalledWith(
          'Failed to add candidate'
        );
      });
    });
  });
});
