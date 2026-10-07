import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { Task, TaskFilter } from '../lib/types';

type TasksContextType = {
  tasks: Task[];
  filter: TaskFilter;

  addTask: (description: string) => Promise<void> | void;
  removeTask: (id: string) => Promise<void> | void;
  removeCompletedTasks: () => Promise<void> | void;
  updateTask: (id: string, changes: Partial<Task>) => Promise<void> | void;
  updateTaskPosition: (newOrder: Task[]) => Promise<void> | void;
  setFilter: Dispatch<SetStateAction<TaskFilter>>;
};

export const TasksContext = createContext<TasksContextType | null>(null);
