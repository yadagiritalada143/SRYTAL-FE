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

import { DeletePackageModel } from '../delete-models';

const close = jest.fn();
const handleDeletePackage = jest.fn();
const setConfirmDelete = jest.fn();
const setAgreeTerms = jest.fn();

const baseProps = {
  close,
  handleDeletePackage,
  setConfirmDelete,
  setAgreeTerms,
  confirmDelete: false,
  agreeTerms: false
};

const renderModal = (props: any = {}) => {
  return render(
    <MantineProvider>
      <DeletePackageModel {...baseProps} {...props} />
    </MantineProvider>
  );
};

describe('DeletePackageModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when closed', () => {
    renderModal({ opened: false });
    expect(screen.queryByTestId('standard-modal')).not.toBeInTheDocument();
  });

  it('renders the confirmation copy when opened', () => {
    renderModal({ opened: true });
    expect(screen.getByText('Delete Package', { selector: 'p' })).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to delete this package?')
    ).toBeInTheDocument();
  });

  it('keeps the delete button disabled until the action is confirmed', () => {
    renderModal({ opened: true });
    const deleteButton = screen.getByRole('button', {
      name: 'Delete Package'
    });
    expect(deleteButton).toBeDisabled();
  });

  it('deletes with the agreeTerms flag', () => {
    renderModal({ opened: true, confirmDelete: true, agreeTerms: true });
    fireEvent.click(screen.getByRole('button', { name: 'Delete Package' }));
    expect(handleDeletePackage).toHaveBeenCalledWith(true);
  });

  it('passes disagree false when the agree checkbox is unset', () => {
    renderModal({ opened: true, confirmDelete: true, agreeTerms: false });
    fireEvent.click(screen.getByRole('button', { name: 'Delete Package' }));
    expect(handleDeletePackage).toHaveBeenCalledWith(false);
  });

  it('toggles agreement checkboxes', () => {
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
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(close).toHaveBeenCalledTimes(1);
  });
});