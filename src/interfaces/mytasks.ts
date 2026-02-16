export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  pdfUrl?: string;
  link?: string;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Task {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'In Progress' | 'Completed';
  image: string;
  duration?: string;
  sections?: Section[];
}
