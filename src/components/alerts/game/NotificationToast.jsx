import { useEffect } from 'react';
import { AlertBox } from "@/components";

const NotificationToast = ({ 
  onClose, 
  duration = 5000,
  variant = 'success',
  title = 'Success!',
  description = 'Account created successfully!'
}) => {
  // Auto-close after duration
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    // Cleanup timer if component unmounts early
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  // Optional: Add manual close button/click-away
  const handleManualClose = () => {
    onClose?.();
  };

  return (
    <AlertBox
      className="w-lg"
      variant={variant}
      title={title}
      description={description}
      onClose={handleManualClose}
    />
  );
};

export default NotificationToast;
