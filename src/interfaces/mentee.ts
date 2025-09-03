export interface Task {
  taskId: string;
  title: string;
  status: string;
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
