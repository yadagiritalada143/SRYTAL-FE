import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import AddPackage from '../add-package';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ packageId: 'pkg-123' })
}));

const mockMutateAsync = jest.fn();
jest.mock('@hooks/mutations/useAdminMutations', () => ({
  useRegisterPackage: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false
  })
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#495057', textColor: '#ffffff' }
    }
  })
}));

jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: jest.fn(),
    showErrorToast: jest.fn()
  })
}));

jest.mock('@common/style-components/bg-div', () => ({
  BgDiv: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

jest.mock('@common/style-components/buttons', () => ({
  BackButton: ({ id }: { id: string }) => (
    <button data-testid='back-button' onClick={() => localStorage.setItem('id', id)}>
      Back
    </button>
  )
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

const renderAddPackage = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AddPackage />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

describe('AddPackage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders the form heading and all input fields', () => {
    renderAddPackage();

    expect(screen.getByText('Add New Package')).toBeInTheDocument();
    expect(screen.getByText('Create a new package for your organization')).toBeInTheDocument();

    expect(screen.getByLabelText(/package title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it('renders the submit and back buttons', () => {
    renderAddPackage();

    expect(screen.getByRole('button', { name: /create package/i })).toBeInTheDocument();
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
  });

  it('shows validation error for empty title', async () => {
    renderAddPackage();

    fireEvent.click(screen.getByRole('button', { name: /create package/i }));

    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument();
    });
  });

  it('shows validation error for empty description', async () => {
    renderAddPackage();

    fireEvent.click(screen.getByRole('button', { name: /create package/i }));

    await waitFor(() => {
      expect(screen.getByText('Description is required')).toBeInTheDocument();
    });
  });

  it('submits form with valid data and navigates back', async () => {
    mockMutateAsync.mockResolvedValueOnce({});
    renderAddPackage();

    fireEvent.change(screen.getByLabelText(/package title/i), { target: { value: 'Gold Package' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Premium package' } });

    const startDateInput = screen.getByLabelText(/start date/i);
    fireEvent.change(startDateInput, { target: { value: '2026-01-01' } });

    const endDateInput = screen.getByLabelText(/end date/i);
    fireEvent.change(endDateInput, { target: { value: '2026-12-31' } });

    fireEvent.click(screen.getByRole('button', { name: /create package/i }));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });

  it('shows loading state on submit button during submission', async () => {
    let resolveMutation: (value: unknown) => void;
    mockMutateAsync.mockImplementation(
      () => new Promise(resolve => { resolveMutation = resolve; })
    );
    renderAddPackage();

    fireEvent.change(screen.getByLabelText(/package title/i), { target: { value: 'Gold Package' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Premium package' } });

    const startDateInput = screen.getByLabelText(/start date/i);
    fireEvent.change(startDateInput, { target: { value: '2026-01-01' } });

    const endDateInput = screen.getByLabelText(/end date/i);
    fireEvent.change(endDateInput, { target: { value: '2026-12-31' } });

    fireEvent.click(screen.getByRole('button', { name: /create package/i }));

    await waitFor(() => {
      expect(screen.getByText('Creating...')).toBeInTheDocument();
    });

    resolveMutation!({});
  });

  it('back button stores packageId in localStorage', () => {
    renderAddPackage();

    fireEvent.click(screen.getByTestId('back-button'));
    expect(localStorage.getItem('id')).toBe('pkg-123');
  });
});
