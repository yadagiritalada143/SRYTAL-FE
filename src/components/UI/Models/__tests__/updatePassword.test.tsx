import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { ChangePasswordPopup } from '../updatePassword';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      headerBackgroundColor: '#f8f9fa',
      borderColor: '#dee2e6',
      button: { color: '#1971c2', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('react-toastify', () => ({
  toast: { error: jest.fn() }
}));

const toast = jest.requireMock('react-toastify').toast;

const mockShowSuccessToast = jest.fn();
jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({ showSuccessToast: mockShowSuccessToast })
}));

const mockUpdatePasswordForEmployee = jest.fn();
jest.mock('@services/user-services', () => ({
  updatePasswordForEmployee: (...args: any[]) =>
    mockUpdatePasswordForEmployee(...args)
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, disabled, loading, ...rest }: any) => (
    <button onClick={onClick} disabled={disabled || loading} {...rest}>
      {loading ? '...' : children}
    </button>
  )
}));

jest.mock('../base-model', () => ({
  StandardModal: ({ opened, children, title }: any) =>
    opened ? (
      <div data-testid='standard-modal'>
        {title}
        {children}
      </div>
    ) : null
}));

const mockClose = jest.fn();

const renderPopup = (props: any = {}) =>
  render(
    <MantineProvider>
      <ChangePasswordPopup
        opened
        close={mockClose}
        {...props}
      />
    </MantineProvider>
  );

const fillForm = (
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string
) => {
  fireEvent.change(screen.getByPlaceholderText('Enter your current password'), {
    target: { value: oldPassword }
  });
  fireEvent.change(screen.getByPlaceholderText('Enter your new password'), {
    target: { value: newPassword }
  });
  fireEvent.change(screen.getByPlaceholderText('Re-enter your new password'), {
    target: { value: confirmNewPassword }
  });
};

describe('ChangePasswordPopup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when closed', () => {
    render(
      <MantineProvider>
        <ChangePasswordPopup opened={false} close={mockClose} />
      </MantineProvider>
    );
    expect(screen.queryByTestId('standard-modal')).not.toBeInTheDocument();
  });

  it('renders the password fields and title when opened', () => {
    renderPopup();
    expect(screen.getByPlaceholderText('Enter your current password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your new password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Re-enter your new password')).toBeInTheDocument();
    expect(screen.getByText('Update Your Password')).toBeInTheDocument();
  });

  it('renders a Cancel button when forceUpdate is false', () => {
    renderPopup();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Update Password' })
    ).toBeInTheDocument();
  });

  it('hides the Cancel button when forceUpdate is true', () => {
    renderPopup({ forceUpdate: true });
    expect(
      screen.queryByRole('button', { name: 'Cancel' })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Update Password' })
    ).toBeInTheDocument();
  });

  it('shows validation errors before calling the service', async () => {
    renderPopup();
    fireEvent.click(screen.getByRole('button', { name: 'Update Password' }));
    await waitFor(() =>
      expect(screen.getAllByText('Password must be 8 characters long').length).toBeGreaterThanOrEqual(
        1
      )
    );
    expect(mockUpdatePasswordForEmployee).not.toHaveBeenCalled();
  });

  it('rejects a password/confirmation mismatch locally', async () => {
    renderPopup();
    fillForm('OldPassw0rd!', 'NewPassw0rd!', 'Different1!');
    fireEvent.click(screen.getByRole('button', { name: 'Update Password' }));
    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        'New password and confirmation do not match'
      )
    );
    expect(mockUpdatePasswordForEmployee).not.toHaveBeenCalled();
    expect(mockClose).not.toHaveBeenCalled();
  });

  it('resets and closes on a successful update', async () => {
    mockUpdatePasswordForEmployee.mockResolvedValueOnce({ success: true });
    renderPopup();
    fillForm('OldPassw0rd!', 'NewPassw0rd!', 'NewPassw0rd!');
    fireEvent.click(screen.getByRole('button', { name: 'Update Password' }));

    await waitFor(() =>
      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Password updated successfully'
      )
    );
    expect(mockClose).toHaveBeenCalledTimes(1);
    expect(mockUpdatePasswordForEmployee).toHaveBeenCalledWith({
      oldPassword: 'OldPassw0rd!',
      newPassword: 'NewPassw0rd!',
      confirmNewPassword: 'NewPassw0rd!'
    });
  });

  it('shows the returned message when the backend rejects the update', async () => {
    mockUpdatePasswordForEmployee.mockResolvedValueOnce({
      success: false,
      message: 'Old password is incorrect'
    });
    renderPopup();
    fillForm('OldPassw0rd!', 'NewPassw0rd!', 'NewPassw0rd!');
    fireEvent.click(screen.getByRole('button', { name: 'Update Password' }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith('Old password is incorrect')
    );
    expect(mockClose).not.toHaveBeenCalled();
  });

  it('falls back to a generic message when the rejection has none', async () => {
    mockUpdatePasswordForEmployee.mockResolvedValueOnce({ success: false });
    renderPopup();
    fillForm('OldPassw0rd!', 'NewPassw0rd!', 'NewPassw0rd!');
    fireEvent.click(screen.getByRole('button', { name: 'Update Password' }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith('Failed to update password')
    );
  });

  it('shows the API error message when the call throws', async () => {
    mockUpdatePasswordForEmployee.mockRejectedValueOnce({
      response: { data: { message: 'Server exploded' } }
    });
    renderPopup();
    fillForm('OldPassw0rd!', 'NewPassw0rd!', 'NewPassw0rd!');
    fireEvent.click(screen.getByRole('button', { name: 'Update Password' }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith('Server exploded')
    );
  });

  it('uses a fallback message when the thrown error has no response', async () => {
    mockUpdatePasswordForEmployee.mockRejectedValueOnce(new Error('boom'));
    renderPopup();
    fillForm('OldPassw0rd!', 'NewPassw0rd!', 'NewPassw0rd!');
    fireEvent.click(screen.getByRole('button', { name: 'Update Password' }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        'An error occurred while updating password'
      )
    );
  });

  it('closes via the Cancel button without calling the service', () => {
    renderPopup();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(mockClose).toHaveBeenCalledTimes(1);
    expect(mockUpdatePasswordForEmployee).not.toHaveBeenCalled();
  });
});