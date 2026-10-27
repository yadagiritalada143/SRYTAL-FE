import React from 'react';
import { toast } from 'react-toastify';
import { IconX } from '@tabler/icons-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface SonnerToastAction {
  label: string;
  onClick: () => void;
}

export interface SonnerToastOptions {
  title?: string;
  duration?: number;
  action?: SonnerToastAction;
}

export interface SonnerToastContentProps {
  type: ToastType;
  message: React.ReactNode;
  title?: string;
  customIcon?: React.ReactNode;
  action?: SonnerToastAction;
  onClose?: () => void;
}

const renderDefaultIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return (
        <svg
          width='19'
          height='19'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='sonner-svg-check'
          aria-hidden='true'
        >
          <polyline points='20 6 9 17 4 12' />
        </svg>
      );
    case 'error':
      return (
        <svg
          width='18'
          height='18'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='sonner-svg-error'
          aria-hidden='true'
        >
          <line x1='18' y1='6' x2='6' y2='18' />
          <line x1='6' y1='6' x2='18' y2='18' />
        </svg>
      );
    case 'warning':
      return (
        <svg
          width='18'
          height='18'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='sonner-svg-warning'
          aria-hidden='true'
        >
          <path d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' />
          <line x1='12' y1='9' x2='12' y2='13' />
          <line x1='12' y1='17' x2='12.01' y2='17' />
        </svg>
      );
    case 'info':
    default:
      return (
        <svg
          width='18'
          height='18'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='sonner-svg-info'
          aria-hidden='true'
        >
          <circle cx='12' cy='12' r='10' />
          <line x1='12' y1='16' x2='12' y2='12' />
          <line x1='12' y1='8' x2='12.01' y2='8' />
        </svg>
      );
  }
};

export const SonnerToastContent: React.FC<SonnerToastContentProps> = ({
  type,
  message,
  title,
  customIcon,
  action,
  onClose
}) => {
  return (
    <div className={`sonner-toast-inner sonner-toast-${type}`}>
      <div className={`sonner-badge sonner-badge--${type}`}>
        {customIcon ? customIcon : renderDefaultIcon(type)}
      </div>

      <div className='sonner-body'>
        {title && <div className='sonner-title'>{title}</div>}
        <div className='sonner-description'>{message}</div>

        {action && (
          <button
            type='button'
            className='sonner-action-btn'
            onClick={e => {
              e.stopPropagation();
              action.onClick();
              onClose?.();
            }}
          >
            {action.label}
          </button>
        )}
      </div>

      <button
        type='button'
        className='sonner-close-btn'
        aria-label='Dismiss notification'
        onClick={e => {
          e.stopPropagation();
          onClose?.();
        }}
      >
        <IconX size={15} stroke={2.2} />
      </button>
    </div>
  );
};

export const sonnerToast = {
  success: (
    message: string,
    options?: SonnerToastOptions,
    customIcon?: React.ReactNode
  ) => {
    const isSingleWord =
      message.trim().toLowerCase() === 'success' ||
      message.trim().toLowerCase() === 'success!';
    const defaultTitle = isSingleWord
      ? undefined
      : (options?.title ?? 'Success');
    const displayMessage = isSingleWord
      ? 'Operation completed successfully'
      : message;

    return toast(
      ({ closeToast }) => (
        <SonnerToastContent
          type='success'
          title={defaultTitle}
          message={displayMessage}
          customIcon={customIcon}
          action={options?.action}
          onClose={closeToast}
        />
      ),
      {
        type: 'success',
        autoClose: options?.duration ?? 3500,
        closeButton: false,
        icon: false,
        className: 'srytal-sonner-toast srytal-sonner-toast--success'
      }
    );
  },

  error: (
    message: string,
    options?: SonnerToastOptions,
    customIcon?: React.ReactNode
  ) => {
    const defaultTitle = options?.title ?? 'Error';

    return toast(
      ({ closeToast }) => (
        <SonnerToastContent
          type='error'
          title={defaultTitle}
          message={message}
          customIcon={customIcon}
          action={options?.action}
          onClose={closeToast}
        />
      ),
      {
        type: 'error',
        autoClose: options?.duration ?? 4500,
        closeButton: false,
        icon: false,
        className: 'srytal-sonner-toast srytal-sonner-toast--error'
      }
    );
  },

  warning: (
    message: string,
    options?: SonnerToastOptions,
    customIcon?: React.ReactNode
  ) => {
    const defaultTitle = options?.title ?? 'Warning';

    return toast(
      ({ closeToast }) => (
        <SonnerToastContent
          type='warning'
          title={defaultTitle}
          message={message}
          customIcon={customIcon}
          action={options?.action}
          onClose={closeToast}
        />
      ),
      {
        type: 'warning',
        autoClose: options?.duration ?? 4000,
        closeButton: false,
        icon: false,
        className: 'srytal-sonner-toast srytal-sonner-toast--warning'
      }
    );
  },

  info: (
    message: string,
    options?: SonnerToastOptions,
    customIcon?: React.ReactNode
  ) => {
    const defaultTitle = options?.title ?? 'Notice';

    return toast(
      ({ closeToast }) => (
        <SonnerToastContent
          type='info'
          title={defaultTitle}
          message={message}
          customIcon={customIcon}
          action={options?.action}
          onClose={closeToast}
        />
      ),
      {
        type: 'info',
        autoClose: options?.duration ?? 3500,
        closeButton: false,
        icon: false,
        className: 'srytal-sonner-toast srytal-sonner-toast--info'
      }
    );
  },

  dismiss: (id?: string | number) => toast.dismiss(id)
};

export const useCustomToast = () => {
  const showSuccessToast = (
    message: string,
    icon?: React.ReactNode,
    options?: SonnerToastOptions
  ) => {
    return sonnerToast.success(message, options, icon);
  };

  const showErrorToast = (
    message: string,
    icon?: React.ReactNode,
    options?: SonnerToastOptions
  ) => {
    return sonnerToast.error(message, options, icon);
  };

  const showWarningToast = (
    message: string,
    icon?: React.ReactNode,
    options?: SonnerToastOptions
  ) => {
    return sonnerToast.warning(message, options, icon);
  };

  const showInfoToast = (
    message: string,
    icon?: React.ReactNode,
    options?: SonnerToastOptions
  ) => {
    return sonnerToast.info(message, options, icon);
  };

  return {
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast,
    dismissToast: sonnerToast.dismiss
  };
};

export default useCustomToast;
