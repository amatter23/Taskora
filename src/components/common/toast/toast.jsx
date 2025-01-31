/**
 * Toast component that provides notification functionality using react-hot-toast
 * This component should be rendered at the root level of your application
 * @returns {JSX.Element} Toaster component with custom styling
 */
import { Toaster } from 'react-hot-toast';
const Toast = () => {
  return (
    <Toaster
      // Position the toast notifications at the bottom-right corner
      position='bottom-right'
      toastOptions={{
        // Default options for all toasts
        // Duration in milliseconds before toast auto-closes
        duration: 3000,
        // Base styling for all toast notifications
        style: {
          background: 'var(--background-color)',
          color: 'var(--text-color)',
          border: '1px solid var(--border-color)',
        },
        // Custom styling for success notifications
        success: {
          iconTheme: {
            primary: 'var(--success-color)',
            secondary: 'var(--background-color)',
          },
        },
        // Custom styling for error notifications
        error: {
          iconTheme: {
            primary: 'var(--error-color)',
            secondary: 'var(--background-color)',
          },
        },
      }}
    />
  );
};

export default Toast;
