import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { TimesheetStatus, EmployeeTimesheet } from '@interfaces/timesheet';
import { TimesheetActions } from '../TimesheetActions';

const renderActions = (
  timesheet: EmployeeTimesheet,
  onApprove = jest.fn(),
  onReject = jest.fn(),
  parentOnClick: any = undefined
) => {
  return render(
    <MantineProvider>
      <div onClick={parentOnClick}>
        <TimesheetActions
          timesheet={timesheet}
          onApprove={onApprove}
          onReject={onReject}
        />
      </div>
    </MantineProvider>
  );
};

const baseTimesheet = (status: TimesheetStatus): EmployeeTimesheet => ({
  date: '2026-01-05T00:00:00.000Z',
  isVacation: false,
  isHoliday: false,
  isWeekOff: false,
  project_id: 'p1',
  task_id: 't1',
  project_name: 'Website',
  task_name: 'Design landing',
  hours: 8,
  comments: '',
  leaveReason: '',
  id: 'ts1',
  status
});

describe('TimesheetActions Component', () => {
  it('renders Approve and Reject buttons', () => {
    renderActions(baseTimesheet(TimesheetStatus.WaitingForApproval));
    expect(
      screen.getByRole('button', { name: 'Approve' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reject' })).toBeInTheDocument();
  });

  it('enables actions for pending timesheets', () => {
    renderActions(baseTimesheet(TimesheetStatus.WaitingForApproval));
    expect(
      screen.getByRole('button', { name: 'Approve' })
    ).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Reject' })).toBeEnabled();
  });

  it('disables actions for approved timesheets', () => {
    renderActions(baseTimesheet(TimesheetStatus.Approved));
    expect(screen.getByRole('button', { name: 'Approve' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Reject' })).toBeDisabled();
  });

  it('disables actions for rejected timesheets', () => {
    renderActions(baseTimesheet(TimesheetStatus.Rejected));
    expect(screen.getByRole('button', { name: 'Approve' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Reject' })).toBeDisabled();
  });

  it('calls onApprove with the timesheet id', () => {
    const onApprove = jest.fn();
    renderActions(baseTimesheet(TimesheetStatus.WaitingForApproval), onApprove);
    fireEvent.click(screen.getByRole('button', { name: 'Approve' }));
    expect(onApprove).toHaveBeenCalledWith('ts1');
  });

  it('calls onReject with the timesheet id', () => {
    const onReject = jest.fn();
    renderActions(
      baseTimesheet(TimesheetStatus.WaitingForApproval),
      jest.fn(),
      onReject
    );
    fireEvent.click(screen.getByRole('button', { name: 'Reject' }));
    expect(onReject).toHaveBeenCalledWith('ts1');
  });

  it('stops propagation before calling onApprove', () => {
    const onApprove = jest.fn();
    const parentOnClick = jest.fn();
    renderActions(
      baseTimesheet(TimesheetStatus.WaitingForApproval),
      onApprove,
      jest.fn(),
      parentOnClick
    );
    fireEvent.click(screen.getByRole('button', { name: 'Approve' }));
    expect(onApprove).toHaveBeenCalledWith('ts1');
    expect(parentOnClick).not.toHaveBeenCalled();
  });

  it('stops propagation before calling onReject', () => {
    const onReject = jest.fn();
    const parentOnClick = jest.fn();
    renderActions(
      baseTimesheet(TimesheetStatus.WaitingForApproval),
      jest.fn(),
      onReject,
      parentOnClick
    );
    fireEvent.click(screen.getByRole('button', { name: 'Reject' }));
    expect(onReject).toHaveBeenCalledWith('ts1');
    expect(parentOnClick).not.toHaveBeenCalled();
  });
});