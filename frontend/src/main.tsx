import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import ThemeProvider from './components/providers/ThemeProvider.tsx';
import LocalTasksProvider from './components/providers/LocalTasksProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LocalTasksProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LocalTasksProvider>
    </ThemeProvider>
  </StrictMode>,
);
