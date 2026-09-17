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

import { DeleteTaskModel } from '../delete-task';

const close = jest.fn();
const handleDeleteTask = jest.fn();
const setConfirmDelete = jest.fn();
const setAgreeTerms = jest.fn();

const baseProps = {
  close,
  handleDeleteTask,
  setConfirmDelete,
  setAgreeTerms,
  confirmDelete: false,
  agreeTerms: false,
  selectedTask: 'task-1'
};

const renderModal = (props: any = {}) => {
  return render(
    <MantineProvider>
      <DeleteTaskModel {...baseProps} {...props} />
    </MantineProvider>
  );
};

describe('DeleteTaskModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when closed', () => {
    renderModal({ opened: false });
    expect(screen.queryByTestId('standard-modal')).not.toBeInTheDocument();
  });

  it('renders the confirmation copy when opened', () => {
    renderModal({ opened: true });
    expect(screen.getByText('Delete Task', { selector: 'p' })).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to delete this task?')
    ).toBeInTheDocument();
  });

  it('keeps the delete button disabled until acknowledged', () => {
    renderModal({ opened: true });
    const deleteButton = screen.getByRole('button', { name: 'Delete Task' });
    expect(deleteButton).toBeDisabled();
  });

  it('deletes with the selected task id and agreeTerms flag', () => {
    renderModal({ opened: true, confirmDelete: true, agreeTerms: true });
    fireEvent.click(screen.getByRole('button', { name: 'Delete Task' }));
    expect(handleDeleteTask).toHaveBeenCalledWith('task-1', true);
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