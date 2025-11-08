export interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
  tags: string[];
}

export interface Category {
  id: number;
  name: string;
  color: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
}