import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      dangerColor: '#e03131'
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('@mantine/core', () => {
  const actual = jest.requireActual('@mantine/core');
  return {
    ...actual,
    Modal: ({ opened, children, title, onClose }: any) =>
      opened ? (
        <div data-testid='delete-modal'>
          <div>{title}</div>
          {children}
          <button onClick={onClose}>close-modal</button>
        </div>
      ) : null
  };
});

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({
    children,
    onClick,
    disabled,
    ...rest
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <button type='button' onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}));

import DeleteEmployeeModal from '../DeleteEmployeeModal';

const onClose = jest.fn();
const onConfirm = jest.fn();
const setAgreeTerms = jest.fn();
const setConfirmDelete = jest.fn();
const setDeleteMode = jest.fn();

const renderModal = (props: any) => {
  return render(
    <MantineProvider>
      <DeleteEmployeeModal {...props} />
    </MantineProvider>
  );
};

const baseProps = {
  onClose,
  onConfirm,
  setAgreeTerms,
  setConfirmDelete,
  setDeleteMode,
  agreeTerms: false,
  confirmDelete: false,
  deleteMode: 'deactivate' as const
};

describe('DeleteEmployeeModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when closed', () => {
    renderModal({ ...baseProps, opened: false });
    expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
  });

  it('renders the title and deactivate mode by default', () => {
    renderModal({ ...baseProps, opened: true });
    expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();
    expect(screen.getByText('Deactivate')).toBeInTheDocument();
    expect(
      screen.getByText(/hidden from the employee list/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('radio', { name: /deactivate employee/i })
    ).toBeChecked();
  });

  it('disables deactivate until the checkbox is accepted', () => {
    renderModal({ ...baseProps, opened: true });
    const deleteButton = screen.getByRole('button', {
      name: 'Deactivate Employee'
    });
    expect(deleteButton).toBeDisabled();
  });

  it('enables deactivate when accepted and confirms with the mode', () => {
    renderModal({ ...baseProps, opened: true, agreeTerms: true });
    const deleteButton = screen.getByRole('button', {
      name: 'Deactivate Employee'
    });
    expect(deleteButton).not.toBeDisabled();

    fireEvent.click(deleteButton);
    expect(onConfirm).toHaveBeenCalledWith('deactivate');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('switches to permanent mode with a warning and two confirmations', () => {
    renderModal({ ...baseProps, opened: true, deleteMode: 'permanent' });
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(
      screen.getByText(/This action cannot be undone/)
    ).toBeInTheDocument();

    const permanentlyDeleteButton = screen.getByRole('button', {
      name: 'Permanently Delete'
    });
    expect(permanentlyDeleteButton).toBeDisabled();

    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  it('enables permanent delete only when both checkboxes are checked and confirms', () => {
    renderModal({
      ...baseProps,
      opened: true,
      deleteMode: 'permanent',
      agreeTerms: true,
      confirmDelete: true
    });
    const deleteButton = screen.getByRole('button', {
      name: 'Permanently Delete'
    });
    expect(deleteButton).not.toBeDisabled();

    fireEvent.click(deleteButton);
    expect(onConfirm).toHaveBeenCalledWith('permanent');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('toggles agreements through their checkboxes', () => {
    renderModal({ ...baseProps, opened: true });
    fireEvent.click(screen.getByRole('checkbox'));
    expect(setAgreeTerms).toHaveBeenCalled();
  });

  it('cancels and closes', () => {
    renderModal({ ...baseProps, opened: true });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
