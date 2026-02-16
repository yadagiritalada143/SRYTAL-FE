export interface Task {
  taskId: string;
  title: string;
  description?: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface Mentee {
  empId: string;
  name: string;
  email: string;
  joiningDate: string;
  totalTasksAssigned: number;
  tasks?: Task[];
}
