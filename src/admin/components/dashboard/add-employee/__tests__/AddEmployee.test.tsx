import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import AddEmployee from '../add-employee';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate
}));

const mockMutateAsync = jest.fn();
jest.mock('@hooks/mutations/useAdminMutations', () => ({
  useRegisterEmployee: () => ({
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
    },
    organizationConfig: { organization_name: 'srytal' },
    isDarkTheme: false
  })
}));

jest.mock('@UI/Theme-background/background', () => ({
  ThemeBackground: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

jest.mock('axios', () => ({
  isAxiosError: (error: any) => error?.isAxiosError === true
}));

jest.mock('@utils/common/constants', () => ({
  organizationAdminUrls: (org: string) => `/${org}/admin`
}));

const renderAddEmployee = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <AddEmployee />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const fillAllFields = async () => {
  fireEvent.change(screen.getByPlaceholderText('Enter first name'), {
    target: { value: 'John' }
  });
  fireEvent.change(screen.getByPlaceholderText('Enter last name'), {
    target: { value: 'Doe' }
  });
  fireEvent.change(screen.getByPlaceholderText('Enter email address'), {
    target: { value: 'john@example.com' }
  });
  fireEvent.change(screen.getByPlaceholderText('Enter phone number'), {
    target: { value: '1234567890' }
  });

  const roleInput = screen.getByPlaceholderText('Select user role');
  fireEvent.focus(roleInput);
  fireEvent.change(roleInput, { target: { value: 'Emp' } });
  await waitFor(() => {
    expect(screen.getByText('Employee')).toBeInTheDocument();
  });
  fireEvent.click(screen.getByText('Employee'));
};

describe('AddEmployee Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form heading and all input fields', () => {
    renderAddEmployee();

    expect(screen.getByText('Add New Employee')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Fill in the details below to create a new employee account'
      )
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Enter first name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter last name')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter email address')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter phone number')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Select user role')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    renderAddEmployee();

    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create employee/i })
    ).toBeInTheDocument();
  });

  it('disables submit button when form is empty', () => {
    renderAddEmployee();

    expect(
      screen.getByRole('button', { name: /create employee/i })
    ).toBeDisabled();
  });

  it('shows form progress bar when form is dirty', () => {
    renderAddEmployee();

    fireEvent.change(screen.getByPlaceholderText('Enter first name'), {
      target: { value: 'John' }
    });

    expect(screen.getByText('Form Progress')).toBeInTheDocument();
    expect(screen.getByText(/\d+%/)).toBeInTheDocument();
  });

  it('shows validation error when first name is cleared after typing', async () => {
    renderAddEmployee();

    const input = screen.getByPlaceholderText('Enter first name');
    fireEvent.change(input, { target: { value: 'J' } });
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    renderAddEmployee();

    const input = screen.getByPlaceholderText('Enter email address');
    fireEvent.change(input, { target: { value: 'not-an-email' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  it('shows validation error for phone number not 10 digits', async () => {
    renderAddEmployee();

    const input = screen.getByPlaceholderText('Enter phone number');
    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(
        screen.getByText('Phone number must be 10 digits')
      ).toBeInTheDocument();
    });
  });

  it('shows validation error for non-letters in first name', async () => {
    renderAddEmployee();

    const input = screen.getByPlaceholderText('Enter first name');
    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(
        screen.getByText('First name must contain only letters and spaces')
      ).toBeInTheDocument();
    });
  });

  it('enables submit button when all fields are valid', async () => {
    renderAddEmployee();

    await fillAllFields();

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /create employee/i })
      ).not.toBeDisabled();
    });
  });

  it('submits form and navigates on success', async () => {
    mockMutateAsync.mockResolvedValueOnce({});
    renderAddEmployee();

    await fillAllFields();

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /create employee/i })
      ).not.toBeDisabled();
    });

    fireEvent.click(screen.getByRole('button', { name: /create employee/i }));

    await waitFor(
      () => {
        expect(mockMutateAsync).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('/srytal/admin/dashboard');
      },
      { timeout: 10000 }
    );
  }, 15000);

  it('shows error alert on API failure', async () => {
    mockMutateAsync.mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { message: 'Email already exists' } }
    });
    renderAddEmployee();

    await fillAllFields();

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /create employee/i })
      ).not.toBeDisabled();
    });

    fireEvent.click(screen.getByRole('button', { name: /create employee/i }));

    await waitFor(
      () => {
        expect(screen.getByText('Email already exists')).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  }, 15000);

  it('cancel button navigates to employees list', () => {
    renderAddEmployee();

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockNavigate).toHaveBeenCalledWith(
      '/srytal/admin/dashboard/employees'
    );
  });

  it('reset button appears when form is dirty and clears form on confirm', () => {
    renderAddEmployee();

    expect(
      screen.queryByRole('button', { name: /reset form/i })
    ).not.toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Enter first name'), {
      target: { value: 'John' }
    });

    expect(
      screen.getByRole('button', { name: /reset form/i })
    ).toBeInTheDocument();

    jest.spyOn(window, 'confirm').mockReturnValueOnce(true);
    fireEvent.click(screen.getByRole('button', { name: /reset form/i }));

    expect(
      (screen.getByPlaceholderText('Enter first name') as HTMLInputElement)
        .value
    ).toBe('');
  });

  it('reset button does not clear form when user cancels confirmation', () => {
    renderAddEmployee();

    fireEvent.change(screen.getByPlaceholderText('Enter first name'), {
      target: { value: 'John' }
    });

    jest.spyOn(window, 'confirm').mockReturnValueOnce(false);
    fireEvent.click(screen.getByRole('button', { name: /reset form/i }));

    expect(
      (screen.getByPlaceholderText('Enter first name') as HTMLInputElement)
        .value
    ).toBe('John');
  });
});
