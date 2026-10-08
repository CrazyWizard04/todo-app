import { createContext } from 'react';
import type { Toast, ToastType } from '../lib/types';

type ToastContextType = {
  toasts: Toast[];

  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: string) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);
