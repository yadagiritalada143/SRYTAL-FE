import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { TimesheetStatus } from '@interfaces/timesheet';
import { FilterSection } from '../FilterSection';

let mockIsMobile = false;

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => mockIsMobile
}));

jest.mock('@mantine/dates', () => ({
  DatePickerInput: ({ value, onChange }: any) => (
    <div>
      <label>Date Range</label>
      <input
        data-testid='date-range-input'
        placeholder='Pick dates range'
        value={value && value.length ? `${value.length} dates` : ''}
        onChange={() =>
          onChange([new Date('2026-01-01'), new Date('2026-01-31')])
        }
      />
    </div>
  )
}));

const defaultProps = () => ({
  searchQuery: '',
  setSearchQuery: jest.fn(),
  selectedStatus: null,
  setSelectedStatus: jest.fn(),
  dateRange: null as any,
  setDateRange: jest.fn(),
  filtersExpanded: true,
  setFiltersExpanded: jest.fn(),
  resetFilters: jest.fn(),
  statusOptions: [
    { value: TimesheetStatus.Approved, label: 'Approved' },
    { value: TimesheetStatus.Rejected, label: 'Rejected' },
    { value: TimesheetStatus.WaitingForApproval, label: 'Pending' }
  ]
});

const renderFilterSection = (props: any = undefined) =>
  render(
    <MantineProvider>
      <FilterSection {...(props || defaultProps())} />
    </MantineProvider>
  );

describe('FilterSection Component', () => {
  beforeEach(() => {
    mockIsMobile = false;
  });

  it('renders the Status select', () => {
    renderFilterSection();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Filter by status')
    ).toBeInTheDocument();
  });

  it('renders the Date Range picker', () => {
    renderFilterSection();
    expect(screen.getByText('Date Range')).toBeInTheDocument();
    expect(screen.getByTestId('date-range-input')).toBeInTheDocument();
  });

  it('renders the Search input', () => {
    renderFilterSection();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Search projects, tasks, comments...')
    ).toBeInTheDocument();
  });

  it('renders the Reset Filters button', () => {
    renderFilterSection();
    expect(screen.getByRole('button', { name: /reset filters/i })).toBeInTheDocument();
  });

  it('calls setSearchQuery on search input change', () => {
    const props = defaultProps();
    renderFilterSection(props);
    fireEvent.change(
      screen.getByPlaceholderText('Search projects, tasks, comments...'),
      { target: { value: 'Website' } }
    );
    expect(props.setSearchQuery).toHaveBeenCalledWith('Website');
  });

  it('calls resetFilters when Reset Filters is clicked', () => {
    const props = defaultProps();
    renderFilterSection(props);
    fireEvent.click(screen.getByRole('button', { name: /reset filters/i }));
    expect(props.resetFilters).toHaveBeenCalled();
  });

  it('calls setSelectedStatus when a status option is chosen', () => {
    const props = defaultProps();
    renderFilterSection(props);
    fireEvent.mouseDown(
      screen.getByPlaceholderText('Filter by status')
    );
    fireEvent.click(screen.getByText('Rejected'));
    expect(props.setSelectedStatus).toHaveBeenCalledWith(
      TimesheetStatus.Rejected
    );
  });

  it('calls setDateRange when the date range changes', () => {
    const props = defaultProps();
    renderFilterSection(props);
    fireEvent.change(screen.getByTestId('date-range-input'), {
      target: { value: '2 dates' }
    });
    expect(props.setDateRange).toHaveBeenCalledWith([
      new Date('2026-01-01'),
      new Date('2026-01-31')
    ]);
  });

  it('has no Show Filters toggle on desktop', () => {
    renderFilterSection();
    expect(screen.queryByText('Show Filters')).not.toBeInTheDocument();
    expect(screen.queryByText('Hide Filters')).not.toBeInTheDocument();
  });

  it('shows the Show Filters toggle on mobile', () => {
    mockIsMobile = true;
    const props = defaultProps();
    props.filtersExpanded = false;
    renderFilterSection(props);
    expect(screen.getByText('Show Filters')).toBeInTheDocument();
  });

  it('toggles filters when the mobile toggle is clicked', () => {
    mockIsMobile = true;
    const props = defaultProps();
    props.filtersExpanded = false;
    renderFilterSection(props);
    fireEvent.click(screen.getByText('Show Filters'));
    expect(props.setFiltersExpanded).toHaveBeenCalledWith(true);
  });

  it('shows the Hide Filters toggle when expanded on mobile', () => {
    mockIsMobile = true;
    const props = defaultProps();
    props.filtersExpanded = true;
    renderFilterSection(props);
    expect(screen.getByText('Hide Filters')).toBeInTheDocument();
  });
});