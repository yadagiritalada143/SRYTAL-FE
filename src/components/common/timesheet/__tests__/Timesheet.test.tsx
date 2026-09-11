import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot, MutableSnapshot } from 'recoil';
import { userDetailsAtom } from '@atoms/user';

jest.mock('@services/common-services', () => ({
  getTimesheetData: jest.fn().mockResolvedValue([])
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

jest.mock('react-toastify', () => ({
  toast: { success: jest.fn(), error: jest.fn() }
}));

jest.mock('@common/timesheet/task-popover', () => ({
  TaskPopover: () => <div data-testid='task-popover' />
}));

jest.mock('@common/timesheet/modals', () => ({
  ApplyLeaveTimesheetModal: () => <div data-testid='leave-modal' />,
  ConfirmTimesheetSubmitModal: () => <div data-testid='submit-modal' />,
  EditTimeEntryModal: () => <div data-testid='edit-modal' />
}));

jest.mock('@common/timesheet/time-entries', () => ({
  TimeEntriesTable: () => <div data-testid='time-entries' />
}));

const Timesheet = require('../timesheet').default;

const mockUserDetails = {
  firstName: 'John',
  lastName: 'Doe',
  userRole: 'Employee',
  id: 'user-123',
  passwordResetRequired: 'false'
};

const renderTimesheet = () => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(userDetailsAtom, mockUserDetails);
  };

  return render(
    <RecoilRoot initializeState={initializeState}>
      <MantineProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Timesheet />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

describe('Timesheet Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the timesheet title', () => {
      renderTimesheet();
      expect(screen.getByText('Timesheet')).toBeInTheDocument();
    });

    it('renders date navigation controls', () => {
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
  });

  describe('Search functionality', () => {
    it('toggles search input visibility', () => {
      renderTimesheet();
      const searchToggle = screen.getAllByRole('button').find(btn =>
        btn.querySelector('svg')
      );
      expect(searchToggle).toBeInTheDocument();
    });
  });
});
