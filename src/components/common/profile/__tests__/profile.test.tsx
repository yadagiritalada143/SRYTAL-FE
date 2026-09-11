import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import Profile from '../profile';

let mockOpenRouterData: any = null;

jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetUserOpenRouterKey: () => ({ data: mockOpenRouterData })
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      borderColor: '#dee2e6',
      mutedTextColor: '#868e96',
      accentColor: '#4f46e5',
      iconColor: '#4f46e5',
      successColor: '#10b981',
      cardBackground: '#ffffff'
    },
    isDarkTheme: false
  })
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

jest.mock('@user/components/dashboard/course-portal/OpenRouterSetup', () => ({
  OPENROUTER_API_KEY_STORAGE: 'openrouter_api_key'
}));

jest.mock('../../profile-image/ProfileImage', () => () => (
  <span data-testid='profile-image' />
));

jest.mock('../OpenRouterKeyModal', () => (props: any) => (
  <div
    data-testid='openrouter-modal'
    data-opened={String(!!props.opened)}
    data-user-id={props.userId}
  >
    {props.opened && <button onClick={props.onClose}>close-modal</button>}
    {props.opened && (
      <button onClick={props.onOpenSetupGuide}>setup-guide</button>
    )}
  </div>
));

const mockNavigate = jest.fn();

const makeDetails = (overrides: any = {}) => ({
  id: 'u1',
  employeeId: 'EMP001',
  dateOfJoining: '2020-01-15T00:00:00.000Z',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  mobileNumber: '+911234567890',
  panCardNumber: 'ABCDE1234F',
  aadharNumber: '123456789012',
  uanNumber: 'UAN123',
  dateOfBirth: '1990-05-15',
  presentAddress: '12 MG Road, Bangalore',
  permanentAddress: '45 Gandhi Nagar, Chennai',
  userRole: 'Employee',
  passwordResetRequired: 'false',
  employeeRole: [{ _id: 'r1', designation: 'Frontend Developer' }],
  department: { _id: 'd1', departmentName: 'Engineering' },
  bloodGroup: { _id: 'bg1', type: 'O+' },
  employmentType: { _id: 'et1', employmentType: 'Full-Time' },
  bankDetailsInfo: {
    accountNumber: '1234567890',
    accountHolderName: 'John Doe',
    bankName: 'HDFC Bank',
    ifscCode: 'HDFC0001234'
  },
  ...overrides
});

const renderProfile = (details = makeDetails()) => {
  return render(
    <MantineProvider>
      <Profile details={details} />
    </MantineProvider>
  );
};

describe('Profile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOpenRouterData = null;
    localStorage.clear();
  });

  it('renders the user full name and role badge', () => {
    renderProfile();
    expect(
      screen.getByRole('heading', { name: 'John Doe' })
    ).toBeInTheDocument();
    expect(screen.getByText('Employee')).toBeInTheDocument();
    expect(screen.getByText('EMP001')).toBeInTheDocument();
  });

  it('falls back to "Unnamed User" when no names are provided', () => {
    renderProfile(makeDetails({ firstName: '', lastName: '' }));
    expect(screen.getByText('Unnamed User')).toBeInTheDocument();
  });

  it('shows email, mobile and joined date chips in the header', () => {
    renderProfile();
    expect(
      screen.getAllByText('john.doe@example.com').length
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('+911234567890').length).toBeGreaterThanOrEqual(
      1
    );
    expect(screen.getByText(/^Joined/)).toBeInTheDocument();
  });

  it('renders personal information tiles with formatted values', () => {
    renderProfile();
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('O+')).toBeInTheDocument();
    expect(screen.getByText('123456789012')).toBeInTheDocument();
    expect(screen.getByText(/May 1990/)).toBeInTheDocument();
  });

  it('shows an em dash placeholder for missing values', () => {
    renderProfile(
      makeDetails({ panCardNumber: '', aadharNumber: '', uanNumber: '' })
    );
    expect(screen.getAllByText('—').length).toBeGreaterThanOrEqual(1);
  });

  it('renders employment details in the default tab', () => {
    renderProfile();
    expect(screen.getByText('Employment Type')).toBeInTheDocument();
    expect(screen.getByText('Full-Time')).toBeInTheDocument();
    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Designations')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
  });

  it('shows the Setup Key badge when no key is configured', () => {
    renderProfile();
    expect(screen.getByText('Setup Key')).toBeInTheDocument();
  });

  it('shows the Active badge when a key is returned from the API', () => {
    mockOpenRouterData = {
      data: {
        openrouterKey: 'sk-or-v1-abcdef1234567890abcdef1234567890',
        updatedAt: '2026-09-08T10:00:00.000Z'
      }
    };
    renderProfile();
    expect(screen.getAllByText('Active').length).toBeGreaterThanOrEqual(1);
  });

  it('falls back to a key stored in localStorage', () => {
    localStorage.setItem('openrouter_api_key', 'sk-or-v1-local1234567890abcd');
    renderProfile();
    expect(screen.getAllByText('Active').length).toBeGreaterThanOrEqual(1);
  });

  it('opens the OpenRouter key modal when the header button is clicked', () => {
    renderProfile();
    fireEvent.click(
      screen.getAllByRole('button', { name: /OpenRouter API Key/i })[0]
    );
    expect(screen.getByTestId('openrouter-modal')).toHaveAttribute(
      'data-opened',
      'true'
    );
    expect(screen.getByTestId('openrouter-modal')).toHaveAttribute(
      'data-user-id',
      'u1'
    );
  });

  it('closes the modal when the close button is clicked', () => {
    renderProfile();
    fireEvent.click(
      screen.getAllByRole('button', { name: /OpenRouter API Key/i })[0]
    );
    fireEvent.click(screen.getByRole('button', { name: 'close-modal' }));
    expect(screen.getByTestId('openrouter-modal')).toHaveAttribute(
      'data-opened',
      'false'
    );
  });

  it('navigates to the setup guide when requested from the modal', () => {
    renderProfile();
    fireEvent.click(
      screen.getAllByRole('button', { name: /OpenRouter API Key/i })[0]
    );
    fireEvent.click(screen.getByRole('button', { name: 'setup-guide' }));
    expect(mockNavigate).toHaveBeenCalledWith(
      '../course-assignments?setup=true',
      { state: { openSetup: true } }
    );
  });

  it('switches to the Address tab and shows the address tiles', () => {
    renderProfile();
    fireEvent.click(screen.getByRole('tab', { name: /address/i }));
    expect(screen.getByText('Present Address')).toBeInTheDocument();
    expect(screen.getByText('12 MG Road, Bangalore')).toBeInTheDocument();
    expect(screen.getByText('Permanent Address')).toBeInTheDocument();
    expect(screen.getByText('45 Gandhi Nagar, Chennai')).toBeInTheDocument();
  });

  it('switches to the Bank Details tab and shows bank info tiles', () => {
    renderProfile();
    fireEvent.click(screen.getByRole('tab', { name: 'Bank Details' }));
    expect(screen.getByText('Account Holder')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('HDFC Bank')).toBeInTheDocument();
    expect(screen.getByText('HDFC0001234')).toBeInTheDocument();
  });

  it('switches to the OpenRouter tab and shows unattached key state', () => {
    renderProfile();
    fireEvent.click(screen.getByRole('tab', { name: 'OpenRouter API Key' }));
    expect(screen.getByText('OpenRouter API Credentials')).toBeInTheDocument();
    expect(screen.getByText('Not Configured')).toBeInTheDocument();
    expect(screen.getByText('Configure API Key')).toBeInTheDocument();
    expect(screen.getByText('Expired / Missing')).toBeInTheDocument();
  });

  it('shows a masked key when a configured key is available', () => {
    mockOpenRouterData = {
      data: {
        openrouterKey: 'sk-or-v1-abcdef1234567890abcdef1234567890',
        updatedAt: '2026-09-08T10:00:00.000Z'
      }
    };
    renderProfile();
    fireEvent.click(screen.getByRole('tab', { name: 'OpenRouter API Key' }));
    expect(screen.getByText('Active & Configured')).toBeInTheDocument();
    expect(screen.getByText('Verified & Working')).toBeInTheDocument();
    expect(screen.getByText(/sk-or-v1.*7890/)).toBeInTheDocument();
    expect(screen.getByText('Update / Rotate Key')).toBeInTheDocument();
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });
});
