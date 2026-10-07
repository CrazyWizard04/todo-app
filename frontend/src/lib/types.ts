export type Task = {
  id: string;
  description: string;
  position: number;
  is_completed: boolean;
  created_at: Date;
  updated_at: Date;
};
export type TaskFilter = 'all' | 'active' | 'completed';

export type Toast = {
  id: string;
  type: ToastType;
  message: string;
};
export type ToastType = 'success' | 'error' | 'info';
