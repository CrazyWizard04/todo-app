import { CircleCheckBig, Info, TriangleAlert, X } from 'lucide-react';
import { easeOut, motion, type MotionStyle } from 'framer-motion';
import type { Toast, ToastType } from '../../lib/types';

type ToastNotificationProps = {
  className?: string;
  style: MotionStyle;
  removeToast: (id: string) => void;
} & Toast;

const ToastNotification = ({ removeToast, style, ...props }: ToastNotificationProps) => {
  const { Icon, title, className } = getToastStyle(props.type);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4, ease: easeOut }}
      style={style}
      className={`absolute top-0 md:right-5 flex items-center gap-5 px-10 py-5 w-full 
        max-w-9/10 md:max-w-100 bg-surface shadow-2xl rounded-lg overflow-hidden after:absolute 
        after:bottom-0 after:left-0 after:h-2 after:rounded-lg after:animate-toast-timer ${className}`}
    >
      {Icon}
      <div className="leading-5">
        <h4 className="text-text text-xl font-bold">{title}</h4>
        <p className="text-text text-sm">{props.message}</p>
      </div>

      <button
        onClick={() => removeToast(props.id)}
        className="absolute top-2 right-2 text-muted hover:text-red-500 
          transition-colors duration-200 cursor-pointer"
      >
        <X />
      </button>
    </motion.div>
  );
};

export default ToastNotification;

function getToastStyle(type: ToastType) {
  switch (type) {
    case 'success':
      return {
        Icon: <CircleCheckBig className="text-green-500 size-8" />,
        title: 'Success',
        className: 'after:bg-green-500',
      };
    case 'error':
      return {
        Icon: <TriangleAlert className="text-red-500 size-8" />,
        title: 'Error',
        className: 'after:bg-red-500',
      };
    case 'info':
      return {
        Icon: <Info className="text-blue-500 size-8" />,
        title: 'Info',
        className: 'after:bg-blue-500',
      };
  }
}
