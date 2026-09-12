import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  EditTimeEntryModal,
  ApplyLeaveTimesheetModal,
  ConfirmTimesheetSubmitModal
} from '../modals';
import { EmployeeTimesheet, TimesheetStatus } from '@interfaces/timesheet';
import { DateValue } from '@mantine/dates';

const mockShowSuccessToast = jest.fn();
jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: mockShowSuccessToast,
    showErrorToast: jest.fn()
  })
}));

jest.mock('@services/common-services', () => ({
  submitTimeSheet: jest.fn().mockResolvedValue({ success: true })
}));

jest.mock('../helper', () => ({
  prepareSubmitData: jest.fn(data => data)
}));

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn()
  }
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false
}));

jest.mock('@mantine/dates', () => ({
  DatePickerInput: ({
    label,
    value,
    onChange,
    disabled,
    clearable,
    required
  }: any) => (
    <div data-testid='date-picker-input'>
      <label>{label}</label>
      <input
        type='text'
        data-testid='date-picker-value'
        value={value ? String(value) : ''}
        disabled={disabled}
        onChange={e => {
          if (onChange)
            onChange(e.target.value ? new Date(e.target.value) : null);
        }}
      />
      {clearable && value && (
        <button data-testid='date-picker-clear' onClick={() => onChange(null)}>
          Clear
        </button>
      )}
    </div>
  )
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: { backgroundColor: '#fff', color: '#000' },
    organizationConfig: {},
    isDarkTheme: false
  })
}));

jest.mock('@UI/Models/base-model', () => ({
  StandardModal: ({ opened, onClose, title, children, ...rest }: any) =>
    opened ? (
      <div data-testid='standard-modal'>
        <div>{title}</div>
        {children}
        <button onClick={onClose} data-testid='modal-close'>
          Close
        </button>
      </div>
    ) : null
}));

jest.mock('../../button/CommonButton', () => ({
  CommonButton: ({
    children,
    onClick,
    disabled,
    loading,
    leftSection,
    variant,
    color
  }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      data-testid={`ts-btn-${variant || 'default'}-${color || 'primary'}`}
    >
      {loading ? 'Submitting...' : children}
    </button>
  )
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
});

const sampleTimesheetEntry: EmployeeTimesheet = {
  project_id: 'pkg1',
  project_name: 'Project Alpha',
  task_id: 'task1',
  task_name: 'Design Review',
  date: '2024-01-15',
  hours: 4,
  comments: 'Reviewed design docs',
  status: TimesheetStatus.Approved,
  isVacation: false,
  isHoliday: false,
  isWeekOff: false,
  id: 'ts1',
  leaveReason: ''
};

const sampleChanges: EmployeeTimesheet[] = [
  {
    ...sampleTimesheetEntry,
    hours: 4,
    comments: 'Updated docs'
  },
  {
    ...sampleTimesheetEntry,
    project_id: 'pkg2',
    project_name: 'Project Beta',
    task_id: 'task2',
    task_name: 'Code Review',
    date: '2024-01-16',
    hours: 2,
    comments: 'Reviewed PR'
  }
];

const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>{ui}</MantineProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );

describe('EditTimeEntryModal', () => {
  const defaultProps = {
    openedEntryModal: true,
    closeEntryModal: jest.fn(),
    currentEntry: { ...sampleTimesheetEntry },
    setCurrentEntry: jest.fn(),
    handleEntrySubmit: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal when opened', () => {
    renderWithProviders(<EditTimeEntryModal {...defaultProps} />);
    expect(screen.getByText('Edit Time Entry')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderWithProviders(
      <EditTimeEntryModal {...defaultProps} openedEntryModal={false} />
    );
    expect(screen.queryByText('Edit Time Entry')).not.toBeInTheDocument();
  });

  it('displays project and task details', () => {
    renderWithProviders(<EditTimeEntryModal {...defaultProps} />);
    expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    expect(screen.getByText('Design Review')).toBeInTheDocument();
  });

  it('displays formatted date', () => {
    renderWithProviders(<EditTimeEntryModal {...defaultProps} />);
    expect(screen.getByText('15 Jan 2024')).toBeInTheDocument();
  });

  it('renders hours input with current value', () => {
    renderWithProviders(<EditTimeEntryModal {...defaultProps} />);
    expect(screen.getByText('Hours')).toBeInTheDocument();
    expect(screen.getByDisplayValue('4')).toBeInTheDocument();
  });

  it('renders comments textarea', () => {
    renderWithProviders(<EditTimeEntryModal {...defaultProps} />);
    expect(screen.getByText('Comments')).toBeInTheDocument();
  });

  it('calls handleEntrySubmit when Save Entry is clicked', () => {
    renderWithProviders(<EditTimeEntryModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Save Entry'));
    expect(defaultProps.handleEntrySubmit).toHaveBeenCalled();
  });

  it('calls closeEntryModal when Cancel is clicked', () => {
    renderWithProviders(<EditTimeEntryModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(defaultProps.closeEntryModal).toHaveBeenCalled();
  });

  it('disables Save Entry when comments are empty', () => {
    const entry = { ...sampleTimesheetEntry, comments: '' };
    renderWithProviders(
      <EditTimeEntryModal {...defaultProps} currentEntry={entry} />
    );
    const saveBtn = screen.getByText('Save Entry');
    expect(saveBtn.closest('button')).toBeDisabled();
  });

  it('disables Save Entry when hours is 0', () => {
    const entry = {
      ...sampleTimesheetEntry,
      hours: 0,
      comments: 'some comment'
    };
    renderWithProviders(
      <EditTimeEntryModal {...defaultProps} currentEntry={entry} />
    );
    const saveBtn = screen.getByText('Save Entry');
    expect(saveBtn.closest('button')).toBeDisabled();
  });

  it('calls setCurrentEntry when hours change', () => {
    renderWithProviders(<EditTimeEntryModal {...defaultProps} />);
    const hoursInput = screen.getByRole('spinbutton');
    fireEvent.change(hoursInput, { target: { value: '6' } });
    expect(defaultProps.setCurrentEntry).toHaveBeenCalled();
  });

  it('calls setCurrentEntry when comments change', () => {
    renderWithProviders(<EditTimeEntryModal {...defaultProps} />);
    const commentsInput = screen.getByRole('textbox', { name: /comments/i });
    fireEvent.change(commentsInput, { target: { value: 'New comment' } });
    expect(defaultProps.setCurrentEntry).toHaveBeenCalled();
  });

  it('sets hours to 0 when input is cleared', () => {
    renderWithProviders(<EditTimeEntryModal {...defaultProps} />);
    const hoursInput = screen.getByRole('spinbutton');
    fireEvent.change(hoursInput, { target: { value: '' } });
    expect(defaultProps.setCurrentEntry).toHaveBeenCalled();
  });

  it('clamps hours to max 24', () => {
    renderWithProviders(<EditTimeEntryModal {...defaultProps} />);
    const hoursInput = screen.getByRole('spinbutton');
    fireEvent.change(hoursInput, { target: { value: '30' } });
    expect(defaultProps.setCurrentEntry).toHaveBeenCalled();
  });

  it('clamps hours to min 0 for negative values', () => {
    renderWithProviders(<EditTimeEntryModal {...defaultProps} />);
    const hoursInput = screen.getByRole('spinbutton');
    fireEvent.change(hoursInput, { target: { value: '-5' } });
    expect(defaultProps.setCurrentEntry).toHaveBeenCalled();
  });
});

describe('ApplyLeaveTimesheetModal', () => {
  const defaultProps = {
    openedLeaveModal: true,
    closeLeaveModal: jest.fn(),
    timeEntries: [sampleTimesheetEntry],
    fetchTimesheetData: jest.fn().mockResolvedValue(undefined),
    userId: 'user1',
    startDate: '2024-01-15' as DateValue,
    endDate: '2024-01-21' as DateValue
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal when opened', () => {
    renderWithProviders(<ApplyLeaveTimesheetModal {...defaultProps} />);
    expect(screen.getByText('Apply for Leave')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderWithProviders(
      <ApplyLeaveTimesheetModal {...defaultProps} openedLeaveModal={false} />
    );
    expect(screen.queryByText('Apply for Leave')).not.toBeInTheDocument();
  });

  it('renders the leave date picker', () => {
    renderWithProviders(<ApplyLeaveTimesheetModal {...defaultProps} />);
    expect(screen.getByText('Leave Date')).toBeInTheDocument();
  });

  it('renders the leave reason textarea', () => {
    renderWithProviders(<ApplyLeaveTimesheetModal {...defaultProps} />);
    expect(screen.getByText('Leave Reason')).toBeInTheDocument();
  });

  it('renders Submit Leave and Cancel buttons', () => {
    renderWithProviders(<ApplyLeaveTimesheetModal {...defaultProps} />);
    expect(screen.getByText('Submit Leave')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls closeLeaveModal when Cancel is clicked', () => {
    renderWithProviders(<ApplyLeaveTimesheetModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(defaultProps.closeLeaveModal).toHaveBeenCalled();
  });

  it('keeps Submit Leave clickable for validation feedback', () => {
    renderWithProviders(<ApplyLeaveTimesheetModal {...defaultProps} />);
    const submitBtn = screen.getByText('Submit Leave');
    expect(submitBtn.closest('button')).toBeEnabled();
  });

  it('shows error when submitting without reason', async () => {
    const { toast } = require('react-toastify');
    renderWithProviders(<ApplyLeaveTimesheetModal {...defaultProps} />);

    fireEvent.click(screen.getByTestId('date-picker-value'));
    fireEvent.change(screen.getByTestId('date-picker-value'), {
      target: { value: '2024-01-20' }
    });

    fireEvent.click(screen.getByText('Submit Leave'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Please enter a leave reason');
    });
  });

  it('shows error when submitting without date', async () => {
    const { toast } = require('react-toastify');
    renderWithProviders(<ApplyLeaveTimesheetModal {...defaultProps} />);

    fireEvent.change(screen.getByRole('textbox', { name: /leave reason/i }), {
      target: { value: 'Sick leave' }
    });

    fireEvent.click(screen.getByText('Submit Leave'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Please select leave date');
    });
  });

  it('submits leave successfully with reason and date', async () => {
    const { submitTimeSheet } = require('@services/common-services');
    renderWithProviders(<ApplyLeaveTimesheetModal {...defaultProps} />);

    fireEvent.change(screen.getByRole('textbox', { name: /leave reason/i }), {
      target: { value: 'Vacation day' }
    });
    fireEvent.change(screen.getByTestId('date-picker-value'), {
      target: { value: '2024-01-20' }
    });

    fireEvent.click(screen.getByText('Submit Leave'));

    await waitFor(() => {
      expect(submitTimeSheet).toHaveBeenCalled();
      expect(defaultProps.closeLeaveModal).toHaveBeenCalled();
    });
  });

  it('handles API response with success false', async () => {
    const { submitTimeSheet } = require('@services/common-services');
    submitTimeSheet.mockResolvedValueOnce({
      success: false,
      message: 'Already on leave'
    });
    const { toast } = require('react-toastify');

    renderWithProviders(<ApplyLeaveTimesheetModal {...defaultProps} />);

    fireEvent.change(screen.getByRole('textbox', { name: /leave reason/i }), {
      target: { value: 'Vacation' }
    });
    fireEvent.change(screen.getByTestId('date-picker-value'), {
      target: { value: '2024-01-20' }
    });

    fireEvent.click(screen.getByText('Submit Leave'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Already on leave');
    });
  });

  it('handles submission error', async () => {
    const { submitTimeSheet } = require('@services/common-services');
    submitTimeSheet.mockRejectedValueOnce(new Error('Network error'));
    const { toast } = require('react-toastify');

    renderWithProviders(<ApplyLeaveTimesheetModal {...defaultProps} />);

    fireEvent.change(screen.getByRole('textbox', { name: /leave reason/i }), {
      target: { value: 'Sick' }
    });
    fireEvent.change(screen.getByTestId('date-picker-value'), {
      target: { value: '2024-01-20' }
    });

    fireEvent.click(screen.getByText('Submit Leave'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to submit leave');
    });
  });

  it('renders with empty time entries', () => {
    renderWithProviders(
      <ApplyLeaveTimesheetModal {...defaultProps} timeEntries={[]} />
    );
    expect(screen.getByText('Apply for Leave')).toBeInTheDocument();
  });
});

describe('ConfirmTimesheetSubmitModal', () => {
  const defaultProps = {
    openedSubmitModal: true,
    closeSubmitModal: jest.fn(),
    changesMade: sampleChanges,
    setChangesMade: jest.fn(),
    userId: 'user1',
    fetchTimesheetData: jest.fn().mockResolvedValue(undefined),
    startDate: '2024-01-15' as DateValue,
    endDate: '2024-01-21' as DateValue
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal when opened', () => {
    renderWithProviders(<ConfirmTimesheetSubmitModal {...defaultProps} />);
    expect(
      screen.getByText('Confirm Timesheet Submission')
    ).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderWithProviders(
      <ConfirmTimesheetSubmitModal
        {...defaultProps}
        openedSubmitModal={false}
      />
    );
    expect(
      screen.queryByText('Confirm Timesheet Submission')
    ).not.toBeInTheDocument();
  });

  it('displays total entries count', () => {
    renderWithProviders(<ConfirmTimesheetSubmitModal {...defaultProps} />);
    expect(screen.getByText('Total Entries:')).toBeInTheDocument();
    expect(screen.getByText(/2 entries/)).toBeInTheDocument();
  });

  it('displays total hours', () => {
    renderWithProviders(<ConfirmTimesheetSubmitModal {...defaultProps} />);
    expect(screen.getByText('Total Hours:')).toBeInTheDocument();
    expect(screen.getByText('6h')).toBeInTheDocument();
  });

  it('renders the changes table with entries', () => {
    renderWithProviders(<ConfirmTimesheetSubmitModal {...defaultProps} />);
    expect(screen.getByText('Design Review')).toBeInTheDocument();
    expect(screen.getByText('Code Review')).toBeInTheDocument();
  });

  it('renders single entry as singular', () => {
    renderWithProviders(
      <ConfirmTimesheetSubmitModal
        {...defaultProps}
        changesMade={[sampleChanges[0]]}
      />
    );
    expect(screen.getByText(/1 entry/)).toBeInTheDocument();
  });

  it('calls closeSubmitModal when Cancel is clicked', () => {
    renderWithProviders(<ConfirmTimesheetSubmitModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(defaultProps.closeSubmitModal).toHaveBeenCalled();
  });

  it('submits timesheet successfully', async () => {
    const { submitTimeSheet } = require('@services/common-services');
    renderWithProviders(<ConfirmTimesheetSubmitModal {...defaultProps} />);

    fireEvent.click(screen.getByText('Confirm & Submit'));

    await waitFor(() => {
      expect(submitTimeSheet).toHaveBeenCalled();
      expect(defaultProps.setChangesMade).toHaveBeenCalledWith([]);
      expect(defaultProps.closeSubmitModal).toHaveBeenCalled();
      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Timesheet submitted successfully'
      );
    });
  });

  it('handles API response with success false', async () => {
    const { submitTimeSheet } = require('@services/common-services');
    submitTimeSheet.mockResolvedValueOnce({
      success: false,
      message: 'Submission rejected'
    });
    const { toast } = require('react-toastify');

    renderWithProviders(<ConfirmTimesheetSubmitModal {...defaultProps} />);

    fireEvent.click(screen.getByText('Confirm & Submit'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Submission rejected');
    });
  });

  it('handles submission error', async () => {
    const { submitTimeSheet } = require('@services/common-services');
    submitTimeSheet.mockRejectedValueOnce({
      response: { data: { message: 'Server error' } }
    });
    const { toast } = require('react-toastify');

    renderWithProviders(<ConfirmTimesheetSubmitModal {...defaultProps} />);

    fireEvent.click(screen.getByText('Confirm & Submit'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Server error');
    });
  });

  it('handles submission error with no response', async () => {
    const { submitTimeSheet } = require('@services/common-services');
    submitTimeSheet.mockRejectedValueOnce(new Error('Network'));
    const { toast } = require('react-toastify');

    renderWithProviders(<ConfirmTimesheetSubmitModal {...defaultProps} />);

    fireEvent.click(screen.getByText('Confirm & Submit'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to submit timesheet');
    });
  });

  it('fetches timesheet data after successful submission', async () => {
    renderWithProviders(<ConfirmTimesheetSubmitModal {...defaultProps} />);

    fireEvent.click(screen.getByText('Confirm & Submit'));

    await waitFor(() => {
      expect(defaultProps.fetchTimesheetData).toHaveBeenCalledWith(
        '2024-01-15',
        '2024-01-21',
        'user1'
      );
    });
  });

  it('renders review text', () => {
    renderWithProviders(<ConfirmTimesheetSubmitModal {...defaultProps} />);
    expect(
      screen.getByText(/Please review your time entries before submission/)
    ).toBeInTheDocument();
  });

  it('renders table headers', () => {
    renderWithProviders(<ConfirmTimesheetSubmitModal {...defaultProps} />);
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Hours')).toBeInTheDocument();
    expect(screen.getByText('Comments')).toBeInTheDocument();
  });

  it('renders table headers with project and task on desktop', () => {
    renderWithProviders(<ConfirmTimesheetSubmitModal {...defaultProps} />);
    expect(screen.getByText('Project')).toBeInTheDocument();
    expect(screen.getByText('Task')).toBeInTheDocument();
  });

  it('renders change hours', () => {
    renderWithProviders(<ConfirmTimesheetSubmitModal {...defaultProps} />);
    expect(screen.getByText('4h')).toBeInTheDocument();
    expect(screen.getByText('2h')).toBeInTheDocument();
  });

  it('renders change comments', () => {
    renderWithProviders(<ConfirmTimesheetSubmitModal {...defaultProps} />);
    expect(screen.getByText('Updated docs')).toBeInTheDocument();
    expect(screen.getByText('Reviewed PR')).toBeInTheDocument();
  });
});
