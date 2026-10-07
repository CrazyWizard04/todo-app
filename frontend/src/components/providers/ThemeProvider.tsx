import { useEffect, useState, type PropsWithChildren } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [isDarkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  function toggleDarkMode() {
    setDarkMode((prev: boolean) => {
      const newTheme = !prev;
      const html = document.documentElement;

      if (newTheme) {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newTheme;
    });
  }

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
