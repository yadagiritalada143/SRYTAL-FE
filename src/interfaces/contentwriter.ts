export type TaskContentType = 'FILE' | 'LINK';

// Mirrors the backend `validStatusValues` whitelist. The update endpoints
// reject anything else with a 400.
export type CourseStatus = 'ACTIVE' | 'ARCHIVE';

export const COURSE_STATUSES: CourseStatus[] = ['ACTIVE', 'ARCHIVE'];

export interface Task {
  _id: string;
  moduleId?: string;
  taskName: string;
  taskDescription: string;
  thumbnail?: string;
  status: string;
  // 'FILE' (uploaded file served from S3) or 'LINK' (external URL).
  type?: TaskContentType | string;
  content?: string;
  contentMimeType?: string;
  contentFileName?: string;
  thumbnailUrl?: string;
  updatedAt?: string;
}

export interface Module {
  _id: string;
  moduleName: string;
  moduleDescription: string;
  courseId?: string;
  thumbnail?: string;
  thumbnailUrl?: string;
  tasks: Task[];
  status: string;
  updatedAt?: string;
}

export interface AddModulePayload {
  courseId: string;
  moduleName: string;
  moduleDescription: string;
  thumbnail?: File | null;
}

export interface UpdateCoursePayload {
  id: string;
  courseName: string;
  courseDescription: string;
  // A new file uploads over the existing thumbnail (multer field `thumbnail`).
  // When omitted, the stored thumbnail is kept as-is.
  thumbnail?: File | null;
  status: CourseStatus;
}

export interface UpdateModulePayload {
  id: string;
  moduleName: string;
  moduleDescription: string;
  // A new file uploads over the existing thumbnail (multer field `thumbnail`).
  // When omitted, the stored thumbnail is kept as-is.
  thumbnail?: File | null;
  status: CourseStatus;
}

export interface UpdateTaskPayload {
  id: string;
  taskName: string;
  taskDescription: string;
  // A new file uploads over the existing thumbnail (multer field
  // `thumbnailFile`). When omitted, the stored thumbnail is kept as-is.
  thumbnail?: File | null;
  status: CourseStatus;
}

export interface AddTaskPayload {
  moduleId: string;
  taskName: string;
  taskDescription: string;
  // Provide exactly one of `file` or `link`.
  file?: File | null;
  link?: string;
  // Optional task thumbnail image (multer field `thumbnailFile`).
  thumbnail?: File | null;
}

export interface Course {
  _id: string;
  courseName: string;
  courseDescription: string;
  // The stored S3 object key. Not loadable directly — use `thumbnailUrl` to
  // render it. A new file uploaded via the update endpoint replaces it.
  thumbnail?: string;
  // The resolved, signed URL the API returns alongside it. Render with this.
  thumbnailUrl: string;
  status: string;
  modules?: Module[];
  updatedAt?: string;
  createdAt?: string;
}

export interface DashboardData {
  overview: {
    title: string;
    banner: {
      headline: string;
      thumbnail: string;
      tag: string;
    };
    status: {
      totalCourses: number;
      totalModules: number;
      totalTasks: number;
    };
  };
  recentActivity: {
    id: string;
    title: string;
    thumbnail: string;
    type: string;
    updatedAt?: string;
  }[];
}
