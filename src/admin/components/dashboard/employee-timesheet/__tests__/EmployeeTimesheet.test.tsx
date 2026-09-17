import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot, MutableSnapshot } from 'recoil';
import { employeeDetailsAtom } from '@atoms/employee-atom';
import { act } from 'react';

const mockGetTimesheetData = jest.fn().mockResolvedValue([]);
const mockSubmitTimeSheet = jest.fn().mockResolvedValue({ success: true });

jest.mock('@services/common-services', () => ({
  getTimesheetData: (...args: any[]) => mockGetTimesheetData(...args),
  submitTimeSheet: (...args: any[]) => mockSubmitTimeSheet(...args)
}));

const mockGetEmployeeDetails = jest.fn().mockResolvedValue({
  _id: 'emp1',
  firstName: 'John',
  lastName: 'Doe',
  employeeId: 'EMP-001',
  userRole: 'Employee'
});

jest.mock('@services/admin-services', () => ({
  getEmployeeDetailsByAdmin: (...args: any[]) => mockGetEmployeeDetails(...args)
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    organizationConfig: { organization_name: 'srytal' }
  })
}));

const mockToastError = jest.fn();
jest.mock('react-toastify', () => ({
  toast: { success: jest.fn(), error: (...args: any[]) => mockToastError(...args) }
}));

jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: jest.fn(),
    showErrorToast: jest.fn()
  })
}));

jest.mock('@common/style-components/buttons', () => ({
  BackButton: (props: any) => (
    <button
      data-testid='back-button'
      onClick={() => mockNavigate(-1)}
    >
      Back
    </button>
  )
}));

jest.mock('../components/InfoCard', () => ({
  InfoCard: (props: any) => (
    <div data-testid='info-card'>
      Employee Info - {props.employeeInfoItems?.length || 0} items
    </div>
  )
}));

jest.mock('../components/FilterSection', () => ({
  FilterSection: (props: any) => (
    <div data-testid='filter-section'>
      Filters - {props.selectedStatus || 'none'}
    </div>
  )
}));

jest.mock('../components/TimesheetDataView', () => ({
  TimesheetDataView: ({ label, data, isLoading, noDataMessage }: any) => (
    <div data-testid={`timesheet-data-${label}`}>
      <span>{label}: {data?.length || 0} items</span>
      {isLoading && <span>loading</span>}
      {data?.length === 0 && <span>{noDataMessage}</span>}
    </div>
  )
}));

jest.mock('../components/TimesheetActions', () => ({
  TimesheetActions: () => <div data-testid='timesheet-actions' />
}));

jest.mock('../../update-employee/helper-functions/add-package', () => ({
  getEmployeeInfoItems: (details: any) => details ? [{ label: 'Name', value: details.firstName }] : []
}));

jest.mock('@common/timesheet/helper', () => ({
  formatData: jest.fn().mockReturnValue([]),
  prepareSubmitData: jest.fn().mockReturnValue([])
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ employeeId: 'emp123' })
}));

const { EmployeeTimesheetAdminView: EmployeeTimesheet } = require('../employee-timesheet');

const renderEmployeeTimesheet = (initialAtom: any = null) => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(employeeDetailsAtom, initialAtom);
  };

  return render(
    <RecoilRoot initializeState={initializeState}>
      <MantineProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <EmployeeTimesheet />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

describe('EmployeeTimesheet Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetTimesheetData.mockResolvedValue([]);
    mockGetEmployeeDetails.mockResolvedValue({
      _id: 'emp1',
      firstName: 'John',
      lastName: 'Doe',
      employeeId: 'EMP-001',
      userRole: 'Employee'
    });
    mockSubmitTimeSheet.mockResolvedValue({ success: true });
  });

  describe('Rendering', () => {
    it('renders the page title', () => {
      renderEmployeeTimesheet();
      expect(screen.getByText('Timesheet Management')).toBeInTheDocument();
    });

    it('renders the info card', () => {
      renderEmployeeTimesheet();
      expect(screen.getByTestId('info-card')).toBeInTheDocument();
    });

    it('renders the filter section', () => {
      renderEmployeeTimesheet();
      expect(screen.getByTestId('filter-section')).toBeInTheDocument();
    });

    it('renders the Timesheet Entries section heading', () => {
      renderEmployeeTimesheet();
      expect(screen.getByText('Timesheet Entries')).toBeInTheDocument();
    });

    it('renders TimesheetDataView for entries', () => {
      renderEmployeeTimesheet();
      expect(screen.getAllByTestId(/timesheet-data-/).length).toBeGreaterThanOrEqual(1);
    });

    it('renders the back button', () => {
      renderEmployeeTimesheet();
      expect(screen.getByTestId('back-button')).toBeInTheDocument();
    });

    it('renders leaves section heading', () => {
      renderEmployeeTimesheet();
      expect(screen.getByText('Leaves')).toBeInTheDocument();
    });

    it('renders both work and leave data views', () => {
      renderEmployeeTimesheet();
      expect(screen.getByTestId('timesheet-data-timesheets')).toBeInTheDocument();
      expect(screen.getByTestId('timesheet-data-leaves')).toBeInTheDocument();
    });
  });

  describe('Data fetching', () => {
    it('fetches employee details on mount', async () => {
      renderEmployeeTimesheet();
      await waitFor(() => {
        expect(mockGetEmployeeDetails).toHaveBeenCalledWith('emp123');
      });
    });

    it('fetches timesheet data on mount', async () => {
      renderEmployeeTimesheet();
      await waitFor(() => {
        expect(mockGetTimesheetData).toHaveBeenCalled();
      });
    });

    it('shows error toast when employee details fetch fails', async () => {
      mockGetEmployeeDetails.mockRejectedValueOnce(new Error('fail'));
      renderEmployeeTimesheet();
      await waitFor(() => {
        expect(mockToastError).toHaveBeenCalledWith('Failed to load employee details');
      });
    });

    it('shows error toast when timesheet data fetch fails', async () => {
      mockGetTimesheetData.mockRejectedValueOnce({
        response: { data: { message: 'Server error' } }
      });
      renderEmployeeTimesheet();
      await waitFor(() => {
        expect(mockToastError).toHaveBeenCalledWith('Server error');
      });
    });

    it('shows generic error when timesheet fetch fails without response message', async () => {
      mockGetTimesheetData.mockRejectedValueOnce(new Error('Network error'));
      renderEmployeeTimesheet();
      await waitFor(() => {
        expect(mockToastError).toHaveBeenCalledWith('Failed to load timesheets');
      });
    });
  });

  describe('InfoCard', () => {
    it('passes employee info items to InfoCard', async () => {
      renderEmployeeTimesheet({ firstName: 'Jane' });
      await waitFor(() => {
        expect(screen.getByText(/1 items/)).toBeInTheDocument();
      });
    });

    it('passes empty items when no employee details', () => {
      renderEmployeeTimesheet(null);
      expect(
        within(screen.getByTestId('info-card')).getByText(/0 items/)
      ).toBeInTheDocument();
    });
  });

  describe('Back button', () => {
    it('navigates back when back button is clicked', () => {
      renderEmployeeTimesheet();
      fireEvent.click(screen.getByTestId('back-button'));
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });
});
