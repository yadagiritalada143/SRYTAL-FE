export interface Task {
  _id: string;
  taskName: string;
  taskDescription: string;
  thumbnail?: string;
  status: string;
  type?: string;
  updatedAt?: string;
}

export interface Module {
  _id: string;
  moduleName: string;
  moduleDescription: string;
  tasks: Task[];
  status: string;
  updatedAt?: string;
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
