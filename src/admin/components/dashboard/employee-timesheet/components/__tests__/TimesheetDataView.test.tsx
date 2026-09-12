import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { TimesheetStatus, EmployeeTimesheet } from '@interfaces/timesheet';
import { TimesheetDataView } from '../TimesheetDataView';

jest.mock('@components/common/loaders/DataView', () => (props: any) => (
  <div data-testid='data-view'>
    {props.isLoading && <span>loading</span>}
    {props.children}
  </div>
));

const themeConfig = {
  color: '#212529',
  backgroundColor: '#ffffff',
  borderColor: '#dee2e6',
  button: { color: '#495057', textColor: '#ffffff' }
};

const baseTimesheet = (overrides: Partial<EmployeeTimesheet>): EmployeeTimesheet => ({
  date: '2026-01-05T00:00:00.000Z',
  isVacation: false,
  isHoliday: false,
  isWeekOff: false,
  project_id: 'p1',
  task_id: 't1',
  project_name: 'Website',
  task_name: 'Design landing',
  hours: 8,
  comments: 'Nice work',
  leaveReason: 'Sick leave',
  id: 'ts1',
  status: TimesheetStatus.WaitingForApproval,
  ...overrides
});

const sampleData = [
  baseTimesheet({
    id: 'ts1',
    status: TimesheetStatus.WaitingForApproval,
    project_name: 'Website'
  }),
  baseTimesheet({
    id: 'ts2',
    date: '2026-01-06T00:00:00.000Z',
    status: TimesheetStatus.Approved,
    project_name: 'Mobile App'
  }),
  baseTimesheet({
    id: 'ts3',
    date: '2026-01-07T00:00:00.000Z',
    status: TimesheetStatus.Rejected,
    project_name: 'API Service'
  })
];

const defaultProps = (overrides: any = {}) => ({
  data: sampleData,
  isLoading: false,
  label: 'timesheets',
  isMobile: false,
  selectedIds: [] as string[],
  onToggleSelect: jest.fn(),
  onToggleAll: jest.fn(),
  isAllSelected: false,
  sortOrder: 'asc' as 'asc' | 'desc',
  onSort: jest.fn(),
  onApprove: jest.fn(),
  onReject: jest.fn(),
  activePage: 1,
  itemsPerPage: 10,
  themeConfig,
  noDataMessage: 'No entries found',
  isLeaves: false,
  ...overrides
});

const renderDataView = (props: any = undefined) =>
  render(
    <MantineProvider>
      <TimesheetDataView {...(props || defaultProps())} />
    </MantineProvider>
  );

describe('TimesheetDataView Component', () => {
  describe('Loading state', () => {
    it('shows loading indicator when isLoading is true', () => {
      renderDataView(defaultProps({ isLoading: true }));
      expect(screen.getByText('loading')).toBeInTheDocument();
    });
  });

  describe('Desktop table', () => {
    it('renders table headers', () => {
      renderDataView();
      expect(screen.getByText('S.No')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('Project')).toBeInTheDocument();
      expect(screen.getByText('Task')).toBeInTheDocument();
      expect(screen.getByText('Hours')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();
    });

    it('renders timesheet rows with formatted dates', () => {
      renderDataView();
      expect(screen.getByText('Jan 5, 2026')).toBeInTheDocument();
      expect(screen.getByText('Jan 6, 2026')).toBeInTheDocument();
      expect(screen.getByText('Jan 7, 2026')).toBeInTheDocument();
    });

    it('renders project and task names', () => {
      renderDataView();
      expect(screen.getByText('Website')).toBeInTheDocument();
      expect(screen.getByText('Mobile App')).toBeInTheDocument();
      expect(screen.getAllByText('Design landing').length).toBeGreaterThanOrEqual(3);
    });

    it('renders hours as badges', () => {
      renderDataView();
      expect(screen.getAllByText('8h').length).toBeGreaterThanOrEqual(3);
    });

    it('renders serial numbers starting at 1', () => {
      renderDataView();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('offsets serial numbers by active page and items per page', () => {
      renderDataView(
        defaultProps({ activePage: 2, itemsPerPage: 5, data: sampleData.slice(0, 1) })
      );
      expect(screen.getByText('6')).toBeInTheDocument();
    });

    it('renders status badges', () => {
      renderDataView();
      expect(screen.getByText('Pending')).toBeInTheDocument();
      expect(screen.getByText('Approved')).toBeInTheDocument();
      expect(screen.getByText('Rejected')).toBeInTheDocument();
    });

    it('renders Leave Reason column when isLeaves is true and hides Task', () => {
      renderDataView(defaultProps({ isLeaves: true }));
      expect(screen.getByText('Leave Reason')).toBeInTheDocument();
      expect(screen.queryByText('Task')).not.toBeInTheDocument();
      expect(screen.getAllByText('Sick leave').length).toBe(3);
    });

    it('calls onSort when the Date header is clicked', () => {
      const props = defaultProps();
      renderDataView(props);
      fireEvent.click(screen.getByText('Date'));
      expect(props.onSort).toHaveBeenCalled();
    });

    it('shows ascending sort icon and toggles on sort', () => {
      const props = defaultProps();
      renderDataView(props);
      expect(document.querySelector('.tabler-icon-sort-ascending')).toBeInTheDocument();
      expect(document.querySelector('.tabler-icon-sort-descending')).not.toBeInTheDocument();
      fireEvent.click(screen.getByText('Date'));
      expect(props.onSort).toHaveBeenCalled();
    });

    it('shows descending sort icon when sortOrder is desc', () => {
      renderDataView(defaultProps({ sortOrder: 'desc' }));
      expect(document.querySelector('.tabler-icon-sort-descending')).toBeInTheDocument();
    });

    it('calls onToggleAll when the header checkbox is toggled', () => {
      const props = defaultProps();
      renderDataView(props);
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);
      expect(props.onToggleAll).toHaveBeenCalledWith(true);
    });

    it('calls onToggleSelect when a row checkbox is toggled', () => {
      const props = defaultProps();
      renderDataView(props);
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]);
      expect(props.onToggleSelect).toHaveBeenCalledWith('ts1');
    });

    it('checks row checkboxes that are in selectedIds', () => {
      renderDataView(defaultProps({ selectedIds: ['ts2'] }));
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[2]).toBeChecked();
    });

    it('calls onApprove with the row id for pending entries', () => {
      const props = defaultProps();
      renderDataView(props);
      const approveButtons = screen.getAllByRole('button', { name: 'Approve' });
      expect(approveButtons.length).toBe(3);
      fireEvent.click(approveButtons[0]);
      expect(props.onApprove).toHaveBeenCalledWith('ts1');
    });

    it('calls onReject with the row id for pending entries', () => {
      const props = defaultProps();
      renderDataView(props);
      const rejectButtons = screen.getAllByRole('button', { name: 'Reject' });
      expect(rejectButtons.length).toBe(3);
      fireEvent.click(rejectButtons[0]);
      expect(props.onReject).toHaveBeenCalledWith('ts1');
    });

    it('disables approve and reject for non-pending rows', () => {
      renderDataView();
      const approveButtons = screen.getAllByRole('button', { name: 'Approve' });
      const rejectButtons = screen.getAllByRole('button', { name: 'Reject' });
      expect(approveButtons.length).toBe(3);
      expect(rejectButtons.length).toBe(3);
      expect(approveButtons[0]).toBeEnabled();
      expect(approveButtons[1]).toBeDisabled();
      expect(approveButtons[2]).toBeDisabled();
      expect(rejectButtons[0]).toBeEnabled();
      expect(rejectButtons[1]).toBeDisabled();
      expect(rejectButtons[2]).toBeDisabled();
    });

    it('renders no data message when list is empty', () => {
      renderDataView(defaultProps({ data: [] }));
      expect(screen.getByText('No entries found')).toBeInTheDocument();
    });

    it('renders custom no data message', () => {
      renderDataView(
        defaultProps({ data: [], noDataMessage: 'No timesheets here' })
      );
      expect(screen.getByText('No timesheets here')).toBeInTheDocument();
    });
  });

  describe('Mobile cards', () => {
    it('renders mobile cards with index number', () => {
      renderDataView(defaultProps({ isMobile: true }));
      expect(screen.getByText('#1')).toBeInTheDocument();
      expect(screen.getByText('#2')).toBeInTheDocument();
      expect(screen.getByText('#3')).toBeInTheDocument();
    });

    it('renders dates and project names on cards', () => {
      renderDataView(defaultProps({ isMobile: true }));
      expect(screen.getByText('Jan 5, 2026')).toBeInTheDocument();
      expect(screen.getByText('Website')).toBeInTheDocument();
      expect(screen.getByText('Mobile App')).toBeInTheDocument();
    });

    it('renders status badges on cards', () => {
      renderDataView(defaultProps({ isMobile: true }));
      expect(screen.getByText('Pending')).toBeInTheDocument();
      expect(screen.getByText('Approved')).toBeInTheDocument();
    });

    it('renders leave reason on leaves cards', () => {
      renderDataView(defaultProps({ isMobile: true, isLeaves: true }));
      expect(screen.getAllByText('Leave Reason').length).toBeGreaterThanOrEqual(3);
      expect(screen.getAllByText('Sick leave').length).toBe(3);
    });

    const expandFirstCard = async () => {
      fireEvent.click(screen.getByText('Jan 5, 2026'));
      await screen.findByRole('button', { name: 'Approve' });
    };

    it('renders approve and reject buttons for pending cards', async () => {
      renderDataView(defaultProps({ isMobile: true }));
      await expandFirstCard();
      expect(screen.getAllByRole('button', { name: 'Approve' }).length).toBe(1);
      expect(screen.getAllByRole('button', { name: 'Reject' }).length).toBe(1);
    });

    it('calls onApprove from a mobile card', async () => {
      const props = defaultProps({ isMobile: true });
      renderDataView(props);
      await expandFirstCard();
      fireEvent.click(screen.getByRole('button', { name: 'Approve' }));
      expect(props.onApprove).toHaveBeenCalledWith('ts1');
    });

    it('calls onReject from a mobile card', async () => {
      const props = defaultProps({ isMobile: true });
      renderDataView(props);
      await expandFirstCard();
      fireEvent.click(screen.getByRole('button', { name: 'Reject' }));
      expect(props.onReject).toHaveBeenCalledWith('ts1');
    });

    it('calls onToggleSelect when the card checkbox is toggled', () => {
      const props = defaultProps({ isMobile: true });
      renderDataView(props);
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);
      expect(props.onToggleSelect).toHaveBeenCalledWith('ts1');
    });

    it('renders no data message on mobile when empty', () => {
      renderDataView(defaultProps({ isMobile: true, data: [] }));
      expect(screen.getByText('No entries found')).toBeInTheDocument();
    });
  });
});