import type { PropsWithChildren } from 'react';
import LocalTasksProvider from './LocalTasksProvider';
import ThemeProvider from './ThemeProvider';
import ToastProvider from './ToastProvider';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <LocalTasksProvider>{children}</LocalTasksProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default Providers;
