export type TaskContentType = 'FILE' | 'LINK';

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
  updatedAt?: string;
}

export interface Module {
  _id: string;
  moduleName: string;
  moduleDescription: string;
  courseId?: string;
  thumbnail?: string;
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

export interface AddTaskPayload {
  moduleId: string;
  taskName: string;
  taskDescription: string;
  // Provide exactly one of `file` or `link`.
  file?: File | null;
  link?: string;
}

export interface Course {
  _id: string;
  courseName: string;
  courseDescription: string;
  thumbnail?: string;
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
