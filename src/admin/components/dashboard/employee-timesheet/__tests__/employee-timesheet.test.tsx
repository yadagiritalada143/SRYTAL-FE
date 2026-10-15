import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot, MutableSnapshot } from 'recoil';
import { employeeDetailsAtom } from '@atoms/employee-atom';
import moment from 'moment';
import { EmployeeTimesheetAdminView as EmployeeTimesheet } from '../employee-timesheet';
import { formatData } from '@common/timesheet/helper';

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
const mockShowSuccessToast = jest.fn();
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: (...args: any[]) => mockToastError(...args)
  }
}));

jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: (...args: any[]) => mockShowSuccessToast(...args),
    showErrorToast: jest.fn()
  })
}));

jest.mock('@common/style-components/buttons', () => ({
  BackButton: () => (
    <button data-testid='back-button' onClick={() => mockNavigate(-1)}>
      Back
    </button>
  )
}));

jest.mock('../components/InfoCard', () => ({
  InfoCard: (props: any) => (
    <div data-testid='info-card'>
      {props.employeeInfoItems?.length || 0} items
    </div>
  )
}));

jest.mock('../components/FilterSection', () => ({
  FilterSection: () => <div data-testid='filter-section' />
}));

jest.mock('../components/TimesheetDataView', () => ({
  TimesheetDataView: ({
    label,
    data,
    isLoading,
    noDataMessage,
    onApprove,
    onReject,
    onToggleSelect,
    onToggleAll,
    isAllSelected,
    sortOrder,
    onSort
  }: any) => (
    <div data-testid={`timesheet-data-${label}`}>
      <span>
        {label}: {data?.length || 0} items
      </span>
      {isLoading && <span>loading</span>}
      {data?.length === 0 && <span>{noDataMessage}</span>}
      {data?.length > 0 &&
        data.map((item: any) => (
          <div key={item.id} data-testid={`entry-${item.id}`}>
            <span>{item.project_name}</span>
            <span>{item.status}</span>
            <button
              data-testid={`approve-${item.id}`}
              onClick={() => onApprove(item.id)}
            >
              Approve
            </button>
            <button
              data-testid={`reject-${item.id}`}
              onClick={() => onReject(item.id)}
            >
              Reject
            </button>
          </div>
        ))}
      <span data-testid='sort-order'>{sortOrder}</span>
      <button data-testid='sort-btn' onClick={onSort}>
        Sort
      </button>
      <button
        data-testid='select-all'
        onClick={() => onToggleAll(!isAllSelected)}
      >
        Select All
      </button>
      {data?.length > 0 && (
        <button
          data-testid='select-first'
          onClick={() => onToggleSelect(data[0].id)}
        >
          Select First
        </button>
      )}
    </div>
  )
}));

jest.mock('../../update-employee/helper-functions/add-package', () => ({
  getEmployeeInfoItems: (details: any) =>
    details ? [{ label: 'Name', value: details.firstName }] : []
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

const renderComponent = (initialAtom: any = null) => {
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

describe('EmployeeTimesheetAdminView - Status Changes', () => {
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

  it('handles successful status change', async () => {
    const testDate = moment().format('YYYY-MM-DD');
    mockGetTimesheetData.mockResolvedValue([
      {
        tasks: [
          {
            timesheet: [
              {
                date: testDate,
                hours: 8,
                status: 'Waiting For Approval',
                isVacation: false,
                comments: '',
                leaveReason: '',
                _id: 'ts1',
                isHoliday: false,
                isWeekOff: false
              }
            ]
          }
        ]
      }
    ]);

    (formatData as jest.Mock).mockReturnValue([
      {
        id: 'ts1',
        date: testDate,
        project_name: 'Project Alpha',
        task_name: 'Design',
        hours: 8,
        status: 'Waiting For Approval',
        isVacation: false,
        comments: '',
        leaveReason: ''
      }
    ]);

    renderComponent();

    await waitFor(() => {
      expect(mockGetTimesheetData).toHaveBeenCalled();
    });

    const approveBtn = await screen.findByTestId('approve-ts1');
    fireEvent.click(approveBtn);

    await waitFor(() => {
      expect(mockShowSuccessToast).toHaveBeenCalled();
    });
  });

  it('handles status change failure with response message', async () => {
    const testDate = moment().format('YYYY-MM-DD');
    mockGetTimesheetData.mockResolvedValue([
      {
        tasks: [
          {
            timesheet: [
              {
                date: testDate,
                hours: 8,
                status: 'Waiting For Approval',
                isVacation: false,
                comments: '',
                leaveReason: '',
                _id: 'ts1',
                isHoliday: false,
                isWeekOff: false
              }
            ]
          }
        ]
      }
    ]);

    (formatData as jest.Mock).mockReturnValue([
      {
        id: 'ts1',
        date: testDate,
        project_name: 'Project Alpha',
        task_name: 'Design',
        hours: 8,
        status: 'Waiting For Approval',
        isVacation: false,
        comments: '',
        leaveReason: ''
      }
    ]);

    mockSubmitTimeSheet.mockRejectedValueOnce({
      response: { data: { message: 'Update failed' } }
    });

    renderComponent();

    await waitFor(() => {
      expect(mockGetTimesheetData).toHaveBeenCalled();
    });

    const approveBtn = await screen.findByTestId('approve-ts1');
    fireEvent.click(approveBtn);

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalled();
    });
  });

  it('handles status change with success false response', async () => {
    const testDate = moment().format('YYYY-MM-DD');
    mockGetTimesheetData.mockResolvedValue([
      {
        tasks: [
          {
            timesheet: [
              {
                date: testDate,
                hours: 8,
                status: 'Waiting For Approval',
                isVacation: false,
                comments: '',
                leaveReason: '',
                _id: 'ts1',
                isHoliday: false,
                isWeekOff: false
              }
            ]
          }
        ]
      }
    ]);

    (formatData as jest.Mock).mockReturnValue([
      {
        id: 'ts1',
        date: testDate,
        project_name: 'Project Alpha',
        task_name: 'Design',
        hours: 8,
        status: 'Waiting For Approval',
        isVacation: false,
        comments: '',
        leaveReason: ''
      }
    ]);

    mockSubmitTimeSheet.mockResolvedValueOnce({
      success: false,
      message: 'Partial failure'
    });

    renderComponent();

    await waitFor(() => {
      expect(mockGetTimesheetData).toHaveBeenCalled();
    });

    const approveBtn = await screen.findByTestId('approve-ts1');
    fireEvent.click(approveBtn);

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith('Partial failure');
    });
  });

  it('renders the back button and navigates', async () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('back-button'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
