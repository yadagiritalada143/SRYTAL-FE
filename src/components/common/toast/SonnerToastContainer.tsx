import React from 'react';
import { ToastContainer, cssTransition } from 'react-toastify';
import { useAppTheme } from '@hooks/use-app-theme';

export const sonnerTransition = cssTransition({
  enter: 'sonner-toast-enter',
  exit: 'sonner-toast-exit',
  appendPosition: false,
  collapse: true,
  collapseDuration: 280
});

export const SonnerToastContainer: React.FC = () => {
  const { isDarkTheme } = useAppTheme();

  return (
    <ToastContainer
      position='top-right'
      autoClose={3500}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={true}
      pauseOnHover={true}
      theme={isDarkTheme ? 'dark' : 'light'}
      transition={sonnerTransition}
      stacked
    />
  );
};

export default SonnerToastContainer;
