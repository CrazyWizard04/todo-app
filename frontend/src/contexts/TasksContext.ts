import { createContext } from 'react';
import type { Task } from '../lib/types';

type TasksContextType = {
  tasks: Task[];

  addTask: (description: string) => Promise<void> | void;
  removeTask: (id: string) => Promise<void> | void;
  updateTask: (id: string, changes: Partial<Task>) => Promise<void> | void;
  // updateTaskPosition: (id: string) => Promise<void> | void;
};

export const TasksContext = createContext<TasksContextType | null>(null);
