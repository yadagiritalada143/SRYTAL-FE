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
  agreeTerms: false,
  confirmDelete: false
};

describe('DeleteEmployeeModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when closed', () => {
    renderModal({ ...baseProps, opened: false });
    expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
  });

  it('renders the title and warning when opened', () => {
    renderModal({ ...baseProps, opened: true });
    expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(
      screen.getByText(/This action cannot be undone/)
    ).toBeInTheDocument();
  });

  it('disables delete until both checkboxes are accepted', () => {
    renderModal({ ...baseProps, opened: true });
    const deleteButton = screen.getByRole('button', {
      name: 'Delete Employee'
    });
    expect(deleteButton).toBeDisabled();
  });

  it('enables delete when both checkboxes are checked and confirms', () => {
    renderModal({
      ...baseProps,
      opened: true,
      agreeTerms: true,
      confirmDelete: true
    });
    const deleteButton = screen.getByRole('button', {
      name: 'Delete Employee'
    });
    expect(deleteButton).not.toBeDisabled();

    fireEvent.click(deleteButton);
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('toggles agreements through their checkboxes', () => {
    renderModal({ ...baseProps, opened: true });
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect(setAgreeTerms).toHaveBeenCalled();

    fireEvent.click(checkboxes[1]);
    expect(setConfirmDelete).toHaveBeenCalled();
  });

  it('cancels and closes', () => {
    renderModal({ ...baseProps, opened: true });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});