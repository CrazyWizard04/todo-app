import { useContext } from 'react';
import { TasksContext } from '../contexts/TasksContext';

export function useTask() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTask must be used within a TasksContext Provider');
  }

  return context;
}
