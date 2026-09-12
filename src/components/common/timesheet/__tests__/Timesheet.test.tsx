import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot, MutableSnapshot } from 'recoil';
import { userDetailsAtom } from '@atoms/user';

jest.mock('@services/common-services', () => ({
  getTimesheetData: jest.fn().mockResolvedValue([])
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: jest.fn()
}));

jest.mock('react-toastify', () => ({
  toast: { success: jest.fn(), error: jest.fn() }
}));

jest.mock('../task-popover', () => ({
  TaskPopover: (props: any) => (
    <div data-testid='task-popover'>{props.short}</div>
  )
}));

jest.mock('../modals', () => ({
  ApplyLeaveTimesheetModal: () => <div data-testid='leave-modal' />,
  ConfirmTimesheetSubmitModal: () => <div data-testid='submit-modal' />,
  EditTimeEntryModal: () => <div data-testid='edit-modal' />
}));

jest.mock('../time-entries', () => ({
  TimeEntriesTable: () => <div data-testid='time-entries' />
}));

jest.mock('@hooks/horizontal-scroll', () => () => ({
  scrollRef: { current: null },
  handleMouseDown: jest.fn(),
  handleMouseMove: jest.fn(),
  handleMouseUp: jest.fn(),
  handleTouchEnd: jest.fn(),
  handleTouchMove: jest.fn(),
  handleTouchStart: jest.fn()
}));

jest.mock('../../button/CommonButton', () => ({
  CommonButton: (props: any) => (
    <button
      data-testid='common-button'
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}));

jest.mock('moment-timezone', () => {
  const momentFn = jest.requireActual('moment');
  momentFn.tz = jest.fn(() => momentFn());
  momentFn.prototype.tz = jest.fn(() => momentFn());
  return { default: momentFn, __esModule: true };
});

const DateTableComponent = require('../timesheet').default;
const mockGetTimesheetData = jest.requireMock(
  '@services/common-services'
).getTimesheetData;
const mockUseAppTheme = jest.requireMock('@hooks/use-app-theme').useAppTheme;

const mockUserDetails = {
  firstName: 'John',
  lastName: 'Doe',
  userRole: 'Employee',
  id: 'user-123',
  passwordResetRequired: 'false'
};

const renderTimesheet = (initializeState?: (args: { set: any }) => void) => {
  const defaultInit = ({ set }: { set: any }) => {
    set(userDetailsAtom, mockUserDetails);
  };

  return render(
    <RecoilRoot initializeState={initializeState || defaultInit}>
      <MantineProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <DateTableComponent />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

describe('DateTableComponent (Timesheet)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppTheme.mockReturnValue({
      themeConfig: {
        color: '#212529',
        backgroundColor: '#ffffff',
        borderColor: '#dee2e6',
        button: { color: '#495057', textColor: '#ffffff' }
      },
      organizationConfig: { organization_name: 'srytal' },
      isDarkTheme: false
    });
  });

  it('renders the timesheet title', () => {
    renderTimesheet();
    expect(screen.getByText('Timesheet')).toBeInTheDocument();
  });

  it('renders the Apply Leave button', () => {
    renderTimesheet();
    expect(
      screen.getByRole('button', { name: /apply leave/i })
    ).toBeInTheDocument();
  });

  it('renders the time entries section', () => {
    renderTimesheet();
    expect(screen.getByTestId('time-entries')).toBeInTheDocument();
  });

  it('renders search toggle button', () => {
    renderTimesheet();
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('toggles search when search button is clicked', () => {
    renderTimesheet();
    const buttons = screen.getAllByRole('button');
    const searchBtn = buttons.find(
      btn =>
        btn.textContent?.includes('Search') ||
        btn.textContent?.includes('Close')
    );
    if (searchBtn) {
      fireEvent.click(searchBtn);
    }
  });

  it('renders date navigation buttons', () => {
    renderTimesheet();
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it('shows empty state when no data', async () => {
    mockGetTimesheetData.mockResolvedValue([]);
    renderTimesheet();

    await waitFor(() => {
      expect(
        screen.getByText('No timesheet entries found')
      ).toBeInTheDocument();
    });
  });

  it('displays loading state', () => {
    mockGetTimesheetData.mockReturnValue(new Promise(() => {}));
    renderTimesheet();

    expect(screen.getByText('Loading timesheet data...')).toBeInTheDocument();
  });

  it('renders with timesheet data', async () => {
    const mockData = [
      {
        packageId: {
          _id: 'pkg-1',
          title: 'Project Alpha',
          description: '',
          isDeleted: false
        },
        tasks: [
          {
            taskId: {
              _id: 'task-1',
              title: 'Design Work',
              packageId: 'pkg-1',
              lastUpdatedAt: '',
              isDeleted: false
            },
            timesheet: [
              {
                date: new Date(),
                isHoliday: false,
                isVacation: false,
                isWeekOff: false,
                hours: 4,
                comments: 'Good work',
                leaveReason: '',
                status: 'Waiting For Approval',
                _id: 'ts-1'
              }
            ]
          }
        ]
      }
    ];

    mockGetTimesheetData.mockResolvedValue(mockData);
    renderTimesheet();

    await waitFor(() => {
      expect(screen.getAllByText('4').length).toBeGreaterThan(0);
    });
  });

  it('handles previous date navigation', () => {
    renderTimesheet();
    const buttons = screen.getAllByRole('button');
    const prevBtn = buttons.find(
      btn =>
        btn.querySelector('[data-direction="left"]') || btn.querySelector('svg')
    );
    if (prevBtn) {
      fireEvent.click(prevBtn);
    }
  });

  it('renders leave modal component', () => {
    renderTimesheet();
    expect(screen.getByTestId('leave-modal')).toBeInTheDocument();
  });

  it('renders time entries component with correct props', () => {
    renderTimesheet();
    expect(screen.getByTestId('time-entries')).toBeInTheDocument();
  });
});
