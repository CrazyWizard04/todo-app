import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import Button from '../ui/Button';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="flex justify-between text-white">
      <span className="text-3xl font-bold tracking-[10px] uppercase">todo</span>
      <Button Icon={isDarkMode ? Sun : Moon} IconSize={32} onClick={toggleDarkMode} />
    </nav>
  );
};

export default Navbar;
