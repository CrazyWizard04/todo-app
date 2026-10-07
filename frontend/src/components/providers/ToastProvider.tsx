import { useEffect, useState, type PropsWithChildren } from 'react';
import { ToastContext } from '../../contexts/ToastContext';
import type { Toast, ToastType } from '../../lib/types';

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function addToast(message: string, type: ToastType) {
    const newToast = { id: crypto.randomUUID(), type, message };
    setToasts((prev) => [...prev, newToast]);
  }

  function removeToast(id: string) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  useEffect(() => {
    if (toasts.length === 0) return;

    const timeout = setTimeout(() => {
      removeToast(toasts[0].id);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
