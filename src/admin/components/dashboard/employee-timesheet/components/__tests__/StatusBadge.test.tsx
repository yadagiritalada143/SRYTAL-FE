import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { TimesheetStatus } from '@interfaces/timesheet';
import { StatusBadge } from '../StatusBadge';

const renderStatusBadge = (status: TimesheetStatus) =>
  render(
    <MantineProvider>
      <StatusBadge status={status} />
    </MantineProvider>
  );

describe('StatusBadge Component', () => {
  it('renders Approved badge for approved status', () => {
    renderStatusBadge(TimesheetStatus.Approved);
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  it('renders Rejected badge for rejected status', () => {
    renderStatusBadge(TimesheetStatus.Rejected);
    expect(screen.getByText('Rejected')).toBeInTheDocument();
  });

  it('renders Pending badge for waiting for approval status', () => {
    renderStatusBadge(TimesheetStatus.WaitingForApproval);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('renders the raw status for unknown statuses', () => {
    renderStatusBadge('Some Status' as TimesheetStatus);
    expect(screen.getByText('Some Status')).toBeInTheDocument();
  });

  it('renders Unknown when status is falsy', () => {
    renderStatusBadge('' as TimesheetStatus);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });
});