import { useState, type PropsWithChildren } from 'react';
import { ToastContext } from '../../contexts/ToastContext';
import type { Toast, ToastType } from '../../lib/types';
import { AnimatePresence } from 'framer-motion';
import ToastNotification from '../ui/ToastNotification';

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function addToast(message: string, type: ToastType) {
    const newToast = { id: crypto.randomUUID(), type, message };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(newToast.id);
    }, 5000);
  }

  function removeToast(id: string) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <AnimatePresence>
        {toasts.map((toast, index) => (
          <ToastNotification
            key={toast.id}
            {...toast}
            style={{ top: 20 * (index + 1) }}
            removeToast={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
