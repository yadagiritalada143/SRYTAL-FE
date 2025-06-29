export interface Timesheet {
  date: Date;
  isHoliday: boolean;
  isVacation: boolean;
  isWeekOff: boolean;
  hours: number;
  comments: string;
  leaveReason: string;
  status: string;
  _id: string;
}

export interface Task {
  taskId: {
    _id: string;
    title: string;
    packageId: string;
    lastUpdatedAt: string;
    isDeleted: boolean;
  };
  timesheet: Timesheet[];
}

export interface Package {
  _id: string;
  title: string;
  description: string;
  isDeleted: boolean;
}

export interface EmployeeTimesheet {
  date: string;
  isVacation: boolean;
  isHoliday: boolean;
  isWeekOff: boolean;
  project_id: string;
  task_id: string;
  project_name: string;
  task_name: string;
  hours: number;
  comments: string;
  leaveReason: string;
  id: string;
  status: string;
}
