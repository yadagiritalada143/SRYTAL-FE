import { TaskContentType } from './contentwriter';

/**
 * Employee-facing view of a course. These mirror the response of
 * `/getMyAssignedCourses`, `/getMyAssignedCourseById/:courseAssignmentId` and
 * `/updateMyTaskProgress` — deliberately different from the content-writer
 * `Course`/`Module`/`Task` types in `contentwriter.ts`, which are the authoring
 * shapes and carry S3 keys the employee never receives.
 */

// Mirrors the enum stored on `course-assignments.status`. The backend re-derives
// it from task progress on every write, so it is read-only for the client.
export type CourseAssignmentStatus = 'Assigned' | 'In Progress' | 'Completed';

export interface CourseProgress {
  totalTasks: number;
  completedTasks: number;
  /** Whole-number percentage (0-100). */
  percentComplete: number;
}

export interface AssignedTask {
  _id: string;
  taskName: string;
  taskDescription: string;
  status?: string;
  type?: TaskContentType | string;
  /** External URL — only present on LINK tasks. */
  link?: string;
  contentMimeType?: string;
  contentFileName?: string;
  isCompleted: boolean;
  completedAt?: string | null;
}

export interface AssignedModule {
  _id: string;
  moduleName: string;
  moduleDescription: string;
  status?: string;
  tasks: AssignedTask[];
  totalTasks: number;
  completedTasks: number;
}

export interface AssignedCourse {
  courseAssignmentId: string;
  courseId: string;
  courseName: string;
  courseDescription: string;
  thumbnailUrl: string;
  status: CourseAssignmentStatus;
  assignedAt: string;
  dueDate: string;
  completedAt?: string | null;
  isOverdue: boolean;
  totalModules: number;
  progress: CourseProgress;
}

export interface AssignedCourseDetail extends AssignedCourse {
  modules: AssignedModule[];
}

export interface UpdateTaskProgressPayload {
  courseAssignmentId: string;
  taskId: string;
  isCompleted: boolean;
}

export interface UpdateTaskProgressResponse {
  success: boolean;
  message?: string;
  courseStatus: CourseAssignmentStatus;
  progress: CourseProgress;
  task: { taskId: string; isCompleted: boolean; completedAt?: string | null };
}
