import { useState, type PropsWithChildren } from 'react';
import { TasksContext } from '../../contexts/TasksContext';
import type { Task } from '../../lib/types';

const LocalTasksProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  function addTask(description: string) {
    const existing = tasks.find((task) => task.description === description);
    if (existing) return;

    const newTask = {
      id: crypto.randomUUID(),
      description,
      position: tasks.length,
      is_completed: true,
      created_at: new Date(),
      updated_at: new Date(),
    } as Task;
    setTasks((prev) => [...prev, newTask]);
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function updateTask(id: string, changes: Partial<Task>) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, changes } : task)),
    );
  }

  return (
    <TasksContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export default LocalTasksProvider;
