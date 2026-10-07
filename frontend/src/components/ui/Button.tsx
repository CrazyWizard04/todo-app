import { type ComponentProps } from 'react';
import type { LucideIcon } from 'lucide-react';

type ButtonProps = {
  Icon?: LucideIcon;
  IconSize?: number;
  description?: string;
} & ComponentProps<'button'>;

const Button = ({ Icon, IconSize, description, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`cursor-pointer transition-colors duration-200 ${className}`}
    >
      {Icon && <Icon size={IconSize ?? 20} className="stroke-2" />}
      {description}
    </button>
  );
};

export default Button;
