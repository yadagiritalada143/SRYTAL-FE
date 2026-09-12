import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      dangerColor: '#e03131',
      successColor: '#37b24d'
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({
    children,
    onClick,
    disabled,
    type
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'reset' | 'submit';
  }) => (
    <button type={type ?? 'button'} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}));

import EmployeeSidebar from '../EmployeeSidebar';

const onPasswordReset = jest.fn();
const onDelete = jest.fn();

const renderSidebar = (props: any = {}) => {
  return render(
    <MantineProvider>
      <EmployeeSidebar
        firstName='John'
        lastName='Doe'
        email='john@test.com'
        mobileNumber='9876543210'
        onPasswordReset={onPasswordReset}
        onDelete={onDelete}
        {...props}
      />
    </MantineProvider>
  );
};

describe('EmployeeSidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the employee name, email and phone', () => {
    renderSidebar();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@test.com')).toBeInTheDocument();
    expect(screen.getByText('9876543210')).toBeInTheDocument();
  });

  it('renders the delete employee section copy', () => {
    renderSidebar();
    expect(
      screen.getByText('Deactivate / Delete Employee', { selector: 'p' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Deactivate this employee to hide their account and keep their data, or permanently delete them and all associated records.'
      )
    ).toBeInTheDocument();
  });

  it('calls the password reset handler', () => {
    renderSidebar();
    fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));
    expect(onPasswordReset).toHaveBeenCalledTimes(1);
  });

  it('calls the delete handler', () => {
    renderSidebar();
    fireEvent.click(
      screen.getByRole('button', { name: 'Deactivate or Delete' })
    );
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
