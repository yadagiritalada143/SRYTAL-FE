import { DatesRangeValue, DateValue } from '@mantine/dates';
import moment from 'moment';
import {
  EmployeeTimesheet,
  Package,
  Task,
  TimesheetStatus
} from '../../../interfaces/timesheet';
import { toast } from 'react-toastify';

export const getDateRangeArray = (
  start: DateValue,
  end: DateValue
): string[] => {
  if (start && end) {
    const dates: string[] = [];
    const current = new Date(start);

    while (current <= end) {
      dates.push(moment(current).format('YYYY-MM-DD'));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }
  return [];
};

export const isPastDate = (date: string) => {
  const input = moment(date);
  const today = moment();
  if (input.month() === today.month() && input.year() === today.year()) {
    return false;
  }
  return input.isBefore(today, 'day');
};

export const formatDisplayDate = (date: string) => {
  return moment(date).format('DD MMM ddd');
};

export const navigateDateRange = (
  direction: 'previous' | 'next',
  dateRange: DatesRangeValue,
  setDateRange: (value: React.SetStateAction<DatesRangeValue>) => void
) => {
  const [start, end] = dateRange;
  const daysDiff = moment(end).diff(start, 'days') + 1;

  if (direction === 'previous') {
    const newStart = moment(start).subtract(daysDiff, 'days').toDate();
    const newEnd = moment(end).subtract(daysDiff, 'days').toDate();
    setDateRange([newStart, newEnd]);
  } else {
    const newStart = moment(start).add(daysDiff, 'days').toDate();
    const newEnd = moment(end).add(daysDiff, 'days').toDate();
    setDateRange([newStart, newEnd]);
  }
};

export const formatData = (data: { packageId: Package; tasks: Task[] }[]) => {
  return data.flatMap(pkg =>
    pkg.tasks.flatMap(task =>
      task.timesheet.map(timesheet => {
        const status = timesheet.status;
        return {
          date: moment(timesheet.date).format('YYYY-MM-DD'),
          isVacation: timesheet.isVacation ?? false,
          isHoliday: timesheet.isHoliday ?? false,
          isWeekOff: timesheet.isWeekOff ?? false,
          project_id: pkg.packageId._id,
          task_id: task.taskId._id,
          project_name: pkg.packageId.title,
          task_name: task.taskId.title,
          hours: timesheet.hours ?? 0,
          comments: timesheet.comments ?? '',
          id: timesheet._id,
          leaveReason: timesheet.leaveReason,
          status: status as TimesheetStatus
        };
      })
    )
  );
};

export const trackChanges = (
  newEntry: EmployeeTimesheet,
  originalEntries: EmployeeTimesheet[],
  changesMade: EmployeeTimesheet[],
  setChangesMade: (value: React.SetStateAction<EmployeeTimesheet[]>) => void
) => {
  const originalEntry = originalEntries.find(
    e =>
      e.project_id === newEntry.project_id &&
      e.task_id === newEntry.task_id &&
      e.date === newEntry.date
  );
  if (originalEntry && !newEntry.id) {
    newEntry.id = originalEntry.id;
  }

  if (
    !originalEntry ||
    originalEntry.hours !== newEntry.hours ||
    originalEntry.comments !== newEntry.comments
  ) {
    const existingChangeIndex = changesMade.findIndex(
      c =>
        c.project_id === newEntry.project_id &&
        c.task_id === newEntry.task_id &&
        c.date === newEntry.date
    );

    if (existingChangeIndex >= 0) {
      setChangesMade(prev =>
        prev.map((change, idx) =>
          idx === existingChangeIndex ? newEntry : change
        )
      );
    } else {
      setChangesMade(prev => [...prev, newEntry]);
    }
  } else {
    setChangesMade(prev =>
      prev.filter(
        c =>
          !(
            c.project_id === newEntry.project_id &&
            c.task_id === newEntry.task_id &&
            c.date === newEntry.date
          )
      )
    );
  }
};

export const getProjectTotalHours = (
  projectId: string,
  timeEntries: EmployeeTimesheet[],
  dateRange: DatesRangeValue,
  filteredTasksIds: Set<string>
) => {
  const dateStrings = getDateRangeArray(...dateRange);

  return timeEntries
    .filter(
      entry =>
        entry.project_id === projectId && filteredTasksIds.has(entry.task_id)
    )
    .reduce((total, entry) => {
      if (dateStrings.includes(moment(entry.date).format('YYYY-MM-DD'))) {
        return total + (entry.hours || 0);
      }
      return total;
    }, 0);
};

export const getDateStatus = (
  date: string,
  taskId: string,
  projectId: string,
  timeEntries: EmployeeTimesheet[]
) => {
  const formattedDate = moment(date).format('YYYY-MM-DD');
  const entry = timeEntries.find(
    e =>
      e.date === formattedDate &&
      e.task_id === taskId &&
      e.project_id === projectId
  );

  if (!entry) return null;

  if (entry.isWeekOff) return { label: 'weekoff', comment: entry.comments };
  if (entry.isVacation) return { label: 'leave', comment: entry.leaveReason };
  if (entry.isHoliday) return { label: 'holiday', comment: entry.comments };

  return null;
};

export const openEditModal = (
  timesheet: EmployeeTimesheet,
  setCurrentEntry: (
    value: React.SetStateAction<EmployeeTimesheet | undefined>
  ) => void,
  openEntryModal: () => void
) => {
  const {
    date,
    project_id,
    project_name,
    task_id,
    task_name,
    id,
    hours,
    isHoliday,
    isVacation,
    isWeekOff,
    leaveReason,
    comments,
    status
  } = timesheet;
  if (isPastDate(date)) {
    toast.error("You can't edit for past dates");
    return;
  }

  setCurrentEntry({
    project_id,
    project_name,
    isHoliday,
    isVacation,
    isWeekOff,
    leaveReason,
    task_id,
    task_name,
    date,
    hours,
    comments,
    id,
    status
  });
  openEntryModal();
};

export const prepareSubmitData = (
  changesMade: EmployeeTimesheet[],
  status?: TimesheetStatus
) => {
  const packagesMap = new Map<string, any>();
  changesMade.forEach(entry => {
    if (!packagesMap.has(entry.project_id)) {
      packagesMap.set(entry.project_id, {
        packageId: entry.project_id,
        tasks: []
      });
    }

    const pkg = packagesMap.get(entry.project_id)!;
    let task = pkg.tasks.find((t: any) => t.taskId._id === entry.task_id);

    if (!task) {
      task = {
        taskId: entry.task_id,
        timesheet: []
      };
      pkg.tasks.push(task);
    }

    task.timesheet.push({
      date: moment(entry.date).format('YYYY-MM-DD'),
      hours: entry.hours,
      comments: entry.comments,
      isVacation: false,
      isHoliday: false,
      isWeekOff: false,
      id: entry.id,
      leaveReason: '',
      status: status
        ? status === 'Not Submitted'
          ? 'Waiting For Approval'
          : status
        : 'Waiting For Approval'
    });
  });

  return Array.from(packagesMap.values());
};

export const getTasksByProject = (
  projectId: string,
  timeEntries: EmployeeTimesheet[],
  searchQuery: string
) => {
  const seen = new Set();
  return timeEntries
    .filter(
      entry =>
        entry.project_id === projectId &&
        (entry.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.task_name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .map(entry => ({ id: entry.task_id, title: entry.task_name }))
    .filter(task => {
      if (seen.has(task.id)) return false;
      seen.add(task.id);
      return true;
    });
};
