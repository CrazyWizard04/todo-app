import { useEffect, useState, type PropsWithChildren } from 'react';
import { TasksContext } from '../../contexts/TasksContext';
import type { Task, TaskFilter } from '../../lib/types';
import { useToast } from '../../hooks/useToast';

const LocalTasksProvider = ({ children }: PropsWithChildren) => {
  const { addToast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<TaskFilter>('all');

  function addTask(description: string) {
    const existing = tasks.find((task) => task.description === description);
    if (existing) return addToast('Task with this description already exists', 'error');

    const newTask = {
      id: crypto.randomUUID(),
      description,
      position: tasks.length,
      is_completed: false,
      created_at: new Date(),
      updated_at: new Date(),
    } as Task;
    setTasks((prev) => [...prev, newTask]);
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function removeCompletedTasks() {
    setTasks((prev) => prev.filter((task) => !task.is_completed));
  }

  function updateTask(id: string, changes: Partial<Task>) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...changes } : task)),
    );
  }

  function updateTaskPosition(newOrder: Task[]) {
    if (filter !== 'all') return setTasks(newOrder);

    const updated = newOrder.map((task, index) => ({ ...task, position: index }));
    setTasks(updated);
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        filter,
        addTask,
        removeTask,
        removeCompletedTasks,
        updateTask,
        updateTaskPosition,
        setFilter,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default LocalTasksProvider;
