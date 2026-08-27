import { CourseAssignmentStatus } from '@interfaces/course-assignment';

/**
 * Presentation helpers shared by the course list and the course player, so a
 * course's status reads the same in both places.
 */

export const COURSE_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'In Progress', label: 'In progress' },
  { value: 'Assigned', label: 'Not started' },
  { value: 'Completed', label: 'Completed' }
] as const;

export type CourseFilter = (typeof COURSE_FILTERS)[number]['value'];

/** Overdue wins over the stored status — it is the thing that needs attention. */
export const statusColor = (
  status?: CourseAssignmentStatus | string,
  isOverdue?: boolean
): string => {
  if (isOverdue && status !== 'Completed') return 'red';
  if (status === 'Completed') return 'teal';
  if (status === 'In Progress') return 'blue';
  return 'gray';
};

export const statusLabel = (
  status?: CourseAssignmentStatus | string
): string => (status === 'Assigned' ? 'Not started' : status || 'Not started');

export const formatDueDate = (dueDate?: string): string => {
  if (!dueDate) return 'No due date';
  const date = new Date(dueDate);
  if (isNaN(date.getTime())) return 'No due date';
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/** Whole days until the due date; negative once it has passed. */
export const daysUntilDue = (dueDate?: string): number | null => {
  if (!dueDate) return null;
  const date = new Date(dueDate);
  if (isNaN(date.getTime())) return null;
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return Math.round((date.getTime() - startOfToday.getTime()) / 86400000);
};
