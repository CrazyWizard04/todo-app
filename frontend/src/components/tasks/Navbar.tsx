import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="w-full flex justify-between text-white">
      <span className="text-3xl font-bold tracking-[10px] uppercase">todo</span>
      <button type="button" onClick={toggleDarkMode} className="cursor-pointer">
        {isDarkMode ? <Sun className="size-8" /> : <Moon className="size-8" />}
      </button>
    </nav>
  );
};

export default Navbar;
