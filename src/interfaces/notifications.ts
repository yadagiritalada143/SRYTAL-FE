export interface TimesheetNotification {
  id: string;
  employeeName: string;
  date: string;
  hours: number;
  comments: string;
  status: 'Waiting For Approval' | 'Approved' | 'Rejected';
}
