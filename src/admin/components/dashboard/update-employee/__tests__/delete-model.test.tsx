import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

jest.mock('@UI/Models/base-model', () => ({
  StandardModal: ({ opened, children, title, onClose }: any) =>
    opened ? (
      <div data-testid='standard-modal'>
        <div>{title}</div>
        {children}
        <button onClick={onClose}>modal-close</button>
      </div>
    ) : null
}));

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

import { DeleteEmployeeModel } from '../delete-model';

const close = jest.fn();
const handleDelete = jest.fn();
const setConfirmDelete = jest.fn();
const setAgreeTerms = jest.fn();

const baseProps = {
  close,
  handleDeleteEmployee: handleDelete,
  setConfirmDelete,
  setAgreeTerms,
  confirmDelete: false,
  agreeTerms: false
};

const renderModal = (props: any = {}) => {
  return render(
    <MantineProvider>
      <DeleteEmployeeModel {...baseProps} {...props} />
    </MantineProvider>
  );
};

describe('DeleteEmployeeModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when closed', () => {
    renderModal({ opened: false });
    expect(screen.queryByTestId('standard-modal')).not.toBeInTheDocument();
  });

  it('renders the confirmation text when opened', () => {
    renderModal({ opened: true });
    expect(screen.getByText('Delete Action')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to delete this employee?')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/This action is irreversible/)
    ).toBeInTheDocument();
  });

  it('disables delete until the first checkbox is checked', () => {
    renderModal({ opened: true });
    const deleteButton = screen.getByText('Delete');
    expect(deleteButton.closest('button')).toBeDisabled();
  });

  it('enables delete when confirmDelete is checked', () => {
    renderModal({ opened: true, confirmDelete: true });
    const deleteButton = screen.getByText('Delete');
    expect(deleteButton.closest('button')).not.toBeDisabled();
  });

  it('confirms the deletion', () => {
    renderModal({ opened: true, confirmDelete: true });
    fireEvent.click(screen.getByText('Delete'));
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it('toggles the checkboxes', () => {
    renderModal({ opened: true });
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);

    fireEvent.click(checkboxes[0]);
    expect(setConfirmDelete).toHaveBeenCalled();

    fireEvent.click(checkboxes[1]);
    expect(setAgreeTerms).toHaveBeenCalled();
  });

  it('cancels and closes', () => {
    renderModal({ opened: true });
    fireEvent.click(screen.getByText('Cancel'));
    expect(close).toHaveBeenCalledTimes(1);
  });
});