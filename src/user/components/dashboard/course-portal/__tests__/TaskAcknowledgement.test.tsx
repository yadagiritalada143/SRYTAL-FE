import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import TaskAcknowledgement from '../TaskAcknowledgement';
import { requiresTaskAcknowledgement } from '../task-content';

const mockAcknowledge = jest.fn();

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useUpdateMyTaskAcknowledgement: () => ({
    mutateAsync: mockAcknowledge,
    isPending: false
  })
}));

const mockShowSuccessToast = jest.fn();
const mockShowErrorToast = jest.fn();
jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: mockShowSuccessToast,
    showErrorToast: mockShowErrorToast
  })
}));

jest.mock('@utils/common/get-error-message', () => ({
  getErrorMessage: (error: any, fallback: string) =>
    error?.response?.data?.message || error?.message || fallback
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      cardBackground: '#ffffff',
      borderColor: '#dee2e6',
      mutedTextColor: '#868e96'
    },
    isDarkTheme: false
  })
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, disabled, loading }: any) => (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      data-loading={loading}
    >
      {children}
    </button>
  )
}));

const ACKNOWLEDGEMENT_LABEL = 'I have read the acceptable use policy.';

const makeTask = (overrides: any = {}) => ({
  _id: 't1',
  taskName: 'Acceptable use policy',
  taskDescription: '',
  type: 'FILE',
  acknowledgementText: 'I have read the acceptable use policy.',
  acknowledged: false,
  isCompleted: false,
  ...overrides
});

const renderComponent = (
  task: any = makeTask(),
  onAcknowledged?: () => void
) =>
  render(
    <MantineProvider>
      <TaskAcknowledgement
        courseAssignmentId='ca1'
        task={task}
        onAcknowledged={onAcknowledged}
      />
    </MantineProvider>
  );

describe('requiresTaskAcknowledgement', () => {
  it('is true only for FILE tasks with an unacknowledged statement', () => {
    expect(requiresTaskAcknowledgement(makeTask())).toBe(true);
    expect(requiresTaskAcknowledgement(makeTask({ acknowledged: true }))).toBe(
      false
    );
    expect(
      requiresTaskAcknowledgement(makeTask({ acknowledgementText: '   ' }))
    ).toBe(false);
    expect(requiresTaskAcknowledgement(makeTask({ type: 'LINK' }))).toBe(false);
    expect(
      requiresTaskAcknowledgement(makeTask({ type: 'CODE', isCoding: true }))
    ).toBe(false);
  });
});

describe('TaskAcknowledgement', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAcknowledge.mockResolvedValue({ success: true });
  });

  it('renders nothing for a LINK task', () => {
    renderComponent(makeTask({ type: 'LINK' }));
    expect(screen.queryByText('Acknowledgement')).not.toBeInTheDocument();
  });

  it('renders nothing for a FILE task without a statement', () => {
    renderComponent(makeTask({ acknowledgementText: '' }));
    expect(screen.queryByText('Acknowledgement')).not.toBeInTheDocument();
  });

  it('renders the acknowledgement gate for a gated FILE task', () => {
    renderComponent();
    expect(screen.getByText('Acknowledgement')).toBeInTheDocument();
    expect(
      screen.getByLabelText(ACKNOWLEDGEMENT_LABEL)
    ).toBeInTheDocument();
  });

  it('renders the statement supplied by the backend', () => {
    renderComponent(
      makeTask({ acknowledgementText: 'Please read the security policy.' })
    );
    expect(
      screen.getByLabelText('Please read the security policy.')
    ).toBeInTheDocument();
  });

  it('shows the recorded state once the task is acknowledged', () => {
    renderComponent(
      makeTask({ acknowledged: true, acknowledgedAt: '2024-06-01T00:00:00Z' })
    );
    expect(
      screen.getByText(/You acknowledged this document/)
    ).toBeInTheDocument();
  });

  it('keeps the Acknowledge button disabled until the checkbox is ticked', () => {
    renderComponent();
    const button = screen.getByRole('button', { name: 'Acknowledge' });
    expect(button).toBeDisabled();

    fireEvent.click(
      screen.getByLabelText(ACKNOWLEDGEMENT_LABEL)
    );
    expect(button).not.toBeDisabled();
  });

  it('records the acknowledgement with the assignment and task ids', async () => {
    renderComponent();

    fireEvent.click(
      screen.getByLabelText(ACKNOWLEDGEMENT_LABEL)
    );
    fireEvent.click(screen.getByRole('button', { name: 'Acknowledge' }));

    await waitFor(() => {
      expect(mockAcknowledge).toHaveBeenCalledWith({
        courseAssignmentId: 'ca1',
        taskId: 't1',
        acknowledged: true
      });
    });
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Acknowledgement recorded'
    );
  });

  it('notifies the parent once the acknowledgement is recorded', async () => {
    const onAcknowledged = jest.fn();
    renderComponent(makeTask(), onAcknowledged);

    fireEvent.click(
      screen.getByLabelText(ACKNOWLEDGEMENT_LABEL)
    );
    fireEvent.click(screen.getByRole('button', { name: 'Acknowledge' }));

    await waitFor(() => {
      expect(onAcknowledged).toHaveBeenCalledTimes(1);
    });
  });

  it('does not notify the parent when the mutation fails', async () => {
    const onAcknowledged = jest.fn();
    mockAcknowledge.mockRejectedValueOnce({ message: 'boom' });
    renderComponent(makeTask(), onAcknowledged);

    fireEvent.click(
      screen.getByLabelText(ACKNOWLEDGEMENT_LABEL)
    );
    fireEvent.click(screen.getByRole('button', { name: 'Acknowledge' }));

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalled();
    });
    expect(onAcknowledged).not.toHaveBeenCalled();
  });

  it('shows an error toast when the mutation fails', async () => {
    mockAcknowledge.mockRejectedValueOnce({
      response: { data: { message: 'Acknowledgement is applicable only for file tasks !' } }
    });
    renderComponent();

    fireEvent.click(
      screen.getByLabelText(ACKNOWLEDGEMENT_LABEL)
    );
    fireEvent.click(screen.getByRole('button', { name: 'Acknowledge' }));

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith(
        'Acknowledgement is applicable only for file tasks !'
      );
    });
    expect(mockShowSuccessToast).not.toHaveBeenCalled();
  });
});
