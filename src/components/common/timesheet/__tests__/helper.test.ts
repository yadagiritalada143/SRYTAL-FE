import {
  getDateRangeArray,
  isPastDate,
  formatDisplayDate,
  navigateDateRange,
  formatData,
  trackChanges,
  getProjectTotalHours,
  getDateStatus,
  openEditModal,
  prepareSubmitData,
  getTasksByProject
} from '../helper';
import { EmployeeTimesheet, TimesheetStatus } from '@interfaces/timesheet';

jest.mock('react-toastify', () => ({
  toast: { success: jest.fn(), error: jest.fn() }
}));

describe('Timesheet Helper Functions', () => {
  describe('getDateRangeArray', () => {
    it('returns array of dates between start and end', () => {
      const start = new Date('2026-09-01');
      const end = new Date('2026-09-03');
      const result = getDateRangeArray(start, end);
      expect(result).toHaveLength(3);
      expect(result[0]).toBe('2026-09-01');
      expect(result[2]).toBe('2026-09-03');
    });

    it('returns single element array when start equals end', () => {
      const date = new Date('2026-09-01');
      const result = getDateRangeArray(date, date);
      expect(result).toHaveLength(1);
      expect(result[0]).toBe('2026-09-01');
    });

    it('returns empty array when start is null', () => {
      const result = getDateRangeArray(null, new Date());
      expect(result).toEqual([]);
    });

    it('returns empty array when end is null', () => {
      const result = getDateRangeArray(new Date(), null);
      expect(result).toEqual([]);
    });

    it('returns empty array when both are null', () => {
      const result = getDateRangeArray(null, null);
      expect(result).toEqual([]);
    });
  });

  describe('isPastDate', () => {
    it('returns false for today', () => {
      const today = new Date().toISOString().split('T')[0];
      expect(isPastDate(today)).toBe(false);
    });

    it('returns true for a date far in the past', () => {
      expect(isPastDate('2020-01-01')).toBe(true);
    });

    it('returns false for a date in the future', () => {
      const future = new Date();
      future.setFullYear(future.getFullYear() + 1);
      expect(isPastDate(future.toISOString().split('T')[0])).toBe(false);
    });
  });

  describe('formatDisplayDate', () => {
    it('formats a date string correctly', () => {
      const result = formatDisplayDate('2026-09-11');
      expect(result).toContain('Sep');
      expect(result).toContain('11');
    });
  });

  describe('navigateDateRange', () => {
    it('navigates to previous week', () => {
      const setRange = jest.fn();
      const start = new Date('2026-09-08');
      const end = new Date('2026-09-14');
      navigateDateRange('previous', [start, end], setRange);
      expect(setRange).toHaveBeenCalled();
      const [[[newStart, newEnd]]] = setRange.mock.calls;
      expect(newStart.getTime()).toBeLessThan(start.getTime());
      expect(newEnd.getTime()).toBeLessThan(end.getTime());
    });

    it('navigates to next week', () => {
      const setRange = jest.fn();
      const start = new Date('2026-09-08');
      const end = new Date('2026-09-14');
      navigateDateRange('next', [start, end], setRange);
      expect(setRange).toHaveBeenCalled();
      const [[[newStart, newEnd]]] = setRange.mock.calls;
      expect(newStart.getTime()).toBeGreaterThan(start.getTime());
      expect(newEnd.getTime()).toBeGreaterThan(end.getTime());
    });
  });

  describe('formatData', () => {
    it('formats package/task data into timesheet entries', () => {
      const data = [
        {
          packageId: {
            _id: 'pkg-1',
            title: 'Project A',
            description: '',
            isDeleted: false
          },
          tasks: [
            {
              taskId: {
                _id: 'task-1',
                title: 'Task One',
                packageId: 'pkg-1',
                lastUpdatedAt: '',
                isDeleted: false
              },
              timesheet: [
                {
                  date: '2026-09-11',
                  isHoliday: false,
                  isVacation: false,
                  isWeekOff: false,
                  hours: 5,
                  comments: 'Did some work',
                  leaveReason: '',
                  status: 'Waiting For Approval',
                  _id: 'ts-1'
                }
              ]
            }
          ]
        }
      ];

      const result = formatData(data as any);
      expect(result).toHaveLength(1);
      expect(result[0].project_id).toBe('pkg-1');
      expect(result[0].task_id).toBe('task-1');
      expect(result[0].hours).toBe(5);
      expect(result[0].project_name).toBe('Project A');
      expect(result[0].task_name).toBe('Task One');
    });

    it('returns empty array for empty input', () => {
      expect(formatData([])).toEqual([]);
    });
  });

  describe('trackChanges', () => {
    it('adds a new change when entry differs from original', () => {
      const setChangesMade = jest.fn();
      const original: EmployeeTimesheet[] = [];
      const changesMade: EmployeeTimesheet[] = [];
      const newEntry: EmployeeTimesheet = {
        date: '2026-09-11',
        isVacation: false,
        isHoliday: false,
        isWeekOff: false,
        project_id: 'p1',
        task_id: 't1',
        project_name: 'P',
        task_name: 'T',
        hours: 5,
        comments: 'new',
        leaveReason: '',
        id: '',
        status: TimesheetStatus.NotSubmitted
      };

      trackChanges(newEntry, original, changesMade, setChangesMade);
      expect(setChangesMade).toHaveBeenCalled();
    });

    it('updates an existing change entry', () => {
      const setChangesMade = jest.fn();
      const existing: EmployeeTimesheet = {
        date: '2026-09-11',
        isVacation: false,
        isHoliday: false,
        isWeekOff: false,
        project_id: 'p1',
        task_id: 't1',
        project_name: 'P',
        task_name: 'T',
        hours: 3,
        comments: 'old',
        leaveReason: '',
        id: 'e1',
        status: TimesheetStatus.NotSubmitted
      };

      const newEntry: EmployeeTimesheet = {
        ...existing,
        hours: 8,
        comments: 'updated'
      };

      trackChanges(newEntry, [existing], [existing], setChangesMade);
      expect(setChangesMade).toHaveBeenCalled();
    });

    it('removes change when it matches original', () => {
      const setChangesMade = jest.fn();
      const existing: EmployeeTimesheet = {
        date: '2026-09-11',
        isVacation: false,
        isHoliday: false,
        isWeekOff: false,
        project_id: 'p1',
        task_id: 't1',
        project_name: 'P',
        task_name: 'T',
        hours: 5,
        comments: 'same',
        leaveReason: '',
        id: 'e1',
        status: TimesheetStatus.NotSubmitted
      };

      trackChanges(existing, [existing], [existing], setChangesMade);
      expect(setChangesMade).toHaveBeenCalled();
    });

    it('assigns id from original when new entry has no id', () => {
      const setChangesMade = jest.fn();
      const original: EmployeeTimesheet = {
        date: '2026-09-11',
        isVacation: false,
        isHoliday: false,
        isWeekOff: false,
        project_id: 'p1',
        task_id: 't1',
        project_name: 'P',
        task_name: 'T',
        hours: 5,
        comments: 'work',
        leaveReason: '',
        id: 'orig-id',
        status: TimesheetStatus.Approved
      };

      const newEntry: EmployeeTimesheet = {
        ...original,
        id: '',
        hours: 10,
        comments: 'changed'
      };

      trackChanges(newEntry, [original], [], setChangesMade);
      expect(setChangesMade).toHaveBeenCalled();
    });
  });

  describe('getProjectTotalHours', () => {
    it('returns correct total hours for a project', () => {
      const entries: EmployeeTimesheet[] = [
        {
          date: '2026-09-11',
          isVacation: false,
          isHoliday: false,
          isWeekOff: false,
          project_id: 'p1',
          task_id: 't1',
          project_name: 'P',
          task_name: 'T',
          hours: 5,
          comments: '',
          leaveReason: '',
          id: '1',
          status: TimesheetStatus.Approved
        },
        {
          date: '2026-09-12',
          isVacation: false,
          isHoliday: false,
          isWeekOff: false,
          project_id: 'p1',
          task_id: 't2',
          project_name: 'P',
          task_name: 'T2',
          hours: 3,
          comments: '',
          leaveReason: '',
          id: '2',
          status: TimesheetStatus.Approved
        }
      ];

      const start = new Date('2026-09-08');
      const end = new Date('2026-09-14');
      const filteredTasksIds = new Set(['t1', 't2']);

      const total = getProjectTotalHours(
        'p1',
        entries,
        [start, end],
        filteredTasksIds
      );
      expect(total).toBe(8);
    });

    it('returns 0 for no matching entries', () => {
      const entries: EmployeeTimesheet[] = [];
      const start = new Date('2026-09-08');
      const end = new Date('2026-09-14');
      const filteredTasksIds = new Set<string>();

      const total = getProjectTotalHours(
        'p1',
        entries,
        [start, end],
        filteredTasksIds
      );
      expect(total).toBe(0);
    });

    it('excludes entries outside date range', () => {
      const entries: EmployeeTimesheet[] = [
        {
          date: '2026-08-01',
          isVacation: false,
          isHoliday: false,
          isWeekOff: false,
          project_id: 'p1',
          task_id: 't1',
          project_name: 'P',
          task_name: 'T',
          hours: 10,
          comments: '',
          leaveReason: '',
          id: '1',
          status: TimesheetStatus.Approved
        }
      ];

      const start = new Date('2026-09-08');
      const end = new Date('2026-09-14');
      const filteredTasksIds = new Set(['t1']);

      const total = getProjectTotalHours(
        'p1',
        entries,
        [start, end],
        filteredTasksIds
      );
      expect(total).toBe(0);
    });
  });

  describe('getDateStatus', () => {
    it('returns null when no entry matches', () => {
      const result = getDateStatus('2026-09-11', 't1', 'p1', []);
      expect(result).toBeNull();
    });

    it('returns weekoff status for week off entry', () => {
      const entries: EmployeeTimesheet[] = [
        {
          date: '2026-09-11',
          isVacation: false,
          isHoliday: false,
          isWeekOff: true,
          project_id: 'p1',
          task_id: 't1',
          project_name: 'P',
          task_name: 'T',
          hours: 0,
          comments: 'Weekend',
          leaveReason: '',
          id: '1',
          status: TimesheetStatus.Approved
        }
      ];

      const result = getDateStatus('2026-09-11', 't1', 'p1', entries);
      expect(result).toEqual({ label: 'weekoff', comment: 'Weekend' });
    });

    it('returns leave status for vacation entry', () => {
      const entries: EmployeeTimesheet[] = [
        {
          date: '2026-09-11',
          isVacation: true,
          isHoliday: false,
          isWeekOff: false,
          project_id: 'p1',
          task_id: 't1',
          project_name: 'P',
          task_name: 'T',
          hours: 0,
          comments: '',
          leaveReason: 'Sick leave',
          id: '1',
          status: TimesheetStatus.WaitingForApproval
        }
      ];

      const result = getDateStatus('2026-09-11', 't1', 'p1', entries);
      expect(result).toEqual({ label: 'leave', comment: 'Sick leave' });
    });

    it('returns holiday status for holiday entry', () => {
      const entries: EmployeeTimesheet[] = [
        {
          date: '2026-09-11',
          isVacation: false,
          isHoliday: true,
          isWeekOff: false,
          project_id: 'p1',
          task_id: 't1',
          project_name: 'P',
          task_name: 'T',
          hours: 0,
          comments: 'National Holiday',
          leaveReason: '',
          id: '1',
          status: TimesheetStatus.Approved
        }
      ];

      const result = getDateStatus('2026-09-11', 't1', 'p1', entries);
      expect(result).toEqual({ label: 'holiday', comment: 'National Holiday' });
    });

    it('returns null for normal work entries', () => {
      const entries: EmployeeTimesheet[] = [
        {
          date: '2026-09-11',
          isVacation: false,
          isHoliday: false,
          isWeekOff: false,
          project_id: 'p1',
          task_id: 't1',
          project_name: 'P',
          task_name: 'T',
          hours: 8,
          comments: 'Work',
          leaveReason: '',
          id: '1',
          status: TimesheetStatus.Approved
        }
      ];

      const result = getDateStatus('2026-09-11', 't1', 'p1', entries);
      expect(result).toBeNull();
    });
  });

  describe('openEditModal', () => {
    it('opens modal for current month date', () => {
      const setCurrentEntry = jest.fn();
      const openEntryModal = jest.fn();
      const today = new Date().toISOString().split('T')[0];

      const timesheet: EmployeeTimesheet = {
        date: today,
        isVacation: false,
        isHoliday: false,
        isWeekOff: false,
        project_id: 'p1',
        task_id: 't1',
        project_name: 'Project',
        task_name: 'Task',
        hours: 5,
        comments: 'Work',
        leaveReason: '',
        id: 'ts-1',
        status: TimesheetStatus.Approved
      };

      openEditModal(timesheet, setCurrentEntry, openEntryModal);
      expect(setCurrentEntry).toHaveBeenCalledWith(
        expect.objectContaining({
          project_id: 'p1',
          task_id: 't1',
          hours: 5
        })
      );
      expect(openEntryModal).toHaveBeenCalled();
    });

    it('shows error toast for past dates', () => {
      const setCurrentEntry = jest.fn();
      const openEntryModal = jest.fn();
      const { toast } = require('react-toastify');

      const timesheet: EmployeeTimesheet = {
        date: '2020-01-01',
        isVacation: false,
        isHoliday: false,
        isWeekOff: false,
        project_id: 'p1',
        task_id: 't1',
        project_name: 'P',
        task_name: 'T',
        hours: 5,
        comments: '',
        leaveReason: '',
        id: 'ts-1',
        status: TimesheetStatus.Approved
      };

      openEditModal(timesheet, setCurrentEntry, openEntryModal);
      expect(toast.error).toHaveBeenCalledWith("You can't edit for past dates");
      expect(openEntryModal).not.toHaveBeenCalled();
    });
  });

  describe('prepareSubmitData', () => {
    it('groups entries by project and task', () => {
      const changes: EmployeeTimesheet[] = [
        {
          date: '2026-09-11',
          isVacation: false,
          isHoliday: false,
          isWeekOff: false,
          project_id: 'p1',
          task_id: 't1',
          project_name: 'P',
          task_name: 'T',
          hours: 5,
          comments: 'Work',
          leaveReason: '',
          id: 'ts-1',
          status: TimesheetStatus.Approved
        },
        {
          date: '2026-09-12',
          isVacation: false,
          isHoliday: false,
          isWeekOff: false,
          project_id: 'p1',
          task_id: 't2',
          project_name: 'P',
          task_name: 'T2',
          hours: 3,
          comments: 'More work',
          leaveReason: '',
          id: 'ts-2',
          status: TimesheetStatus.Approved
        }
      ];

      const result = prepareSubmitData(changes);
      expect(result).toHaveLength(1);
      expect(result[0].packageId).toBe('p1');
      expect(result[0].tasks).toHaveLength(2);
    });

    it('sets status to Waiting For Approval by default', () => {
      const changes: EmployeeTimesheet[] = [
        {
          date: '2026-09-11',
          isVacation: false,
          isHoliday: false,
          isWeekOff: false,
          project_id: 'p1',
          task_id: 't1',
          project_name: 'P',
          task_name: 'T',
          hours: 5,
          comments: 'Work',
          leaveReason: '',
          id: 'ts-1',
          status: TimesheetStatus.Approved
        }
      ];

      const result = prepareSubmitData(changes);
      expect(result[0].tasks[0].timesheet[0].status).toBe(
        'Waiting For Approval'
      );
    });

    it('uses provided status when given', () => {
      const changes: EmployeeTimesheet[] = [
        {
          date: '2026-09-11',
          isVacation: false,
          isHoliday: false,
          isWeekOff: false,
          project_id: 'p1',
          task_id: 't1',
          project_name: 'P',
          task_name: 'T',
          hours: 5,
          comments: 'Work',
          leaveReason: '',
          id: 'ts-1',
          status: TimesheetStatus.Approved
        }
      ];

      const result = prepareSubmitData(changes, TimesheetStatus.Approved);
      expect(result[0].tasks[0].timesheet[0].status).toBe('Approved');
    });

    it('converts Not Submitted status to Waiting For Approval', () => {
      const changes: EmployeeTimesheet[] = [
        {
          date: '2026-09-11',
          isVacation: false,
          isHoliday: false,
          isWeekOff: false,
          project_id: 'p1',
          task_id: 't1',
          project_name: 'P',
          task_name: 'T',
          hours: 5,
          comments: 'Work',
          leaveReason: '',
          id: 'ts-1',
          status: TimesheetStatus.Approved
        }
      ];

      const result = prepareSubmitData(changes, TimesheetStatus.NotSubmitted);
      expect(result[0].tasks[0].timesheet[0].status).toBe(
        'Waiting For Approval'
      );
    });

    it('returns empty array for empty changes', () => {
      const result = prepareSubmitData([]);
      expect(result).toEqual([]);
    });
  });

  describe('getTasksByProject', () => {
    it('returns unique tasks for a project', () => {
      const entries: EmployeeTimesheet[] = [
        {
          date: '2026-09-11',
          isVacation: false,
          isHoliday: false,
          isWeekOff: false,
          project_id: 'p1',
          task_id: 't1',
          project_name: 'Project',
          task_name: 'Task One',
          hours: 5,
          comments: '',
          leaveReason: '',
          id: '1',
          status: TimesheetStatus.Approved
        },
        {
          date: '2026-09-12',
          isVacation: false,
          isHoliday: false,
          isWeekOff: false,
          project_id: 'p1',
          task_id: 't1',
          project_name: 'Project',
          task_name: 'Task One',
          hours: 3,
          comments: '',
          leaveReason: '',
          id: '2',
          status: TimesheetStatus.Approved
        }
      ];

      const result = getTasksByProject('p1', entries, '');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('t1');
    });

    it('filters tasks by search query', () => {
      const entries: EmployeeTimesheet[] = [
        {
          date: '2026-09-11',
          isVacation: false,
          isHoliday: false,
          isWeekOff: false,
          project_id: 'p1',
          task_id: 't1',
          project_name: 'Project',
          task_name: 'Design Task',
          hours: 5,
          comments: '',
          leaveReason: '',
          id: '1',
          status: TimesheetStatus.Approved
        },
        {
          date: '2026-09-12',
          isVacation: false,
          isHoliday: false,
          isWeekOff: false,
          project_id: 'p1',
          task_id: 't2',
          project_name: 'Project',
          task_name: 'Code Task',
          hours: 3,
          comments: '',
          leaveReason: '',
          id: '2',
          status: TimesheetStatus.Approved
        }
      ];

      const result = getTasksByProject('p1', entries, 'Design');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Design Task');
    });

    it('returns empty for non-matching project', () => {
      const entries: EmployeeTimesheet[] = [
        {
          date: '2026-09-11',
          isVacation: false,
          isHoliday: false,
          isWeekOff: false,
          project_id: 'p1',
          task_id: 't1',
          project_name: 'P',
          task_name: 'T',
          hours: 5,
          comments: '',
          leaveReason: '',
          id: '1',
          status: TimesheetStatus.Approved
        }
      ];

      const result = getTasksByProject('p2', entries, '');
      expect(result).toHaveLength(0);
    });
  });
});
