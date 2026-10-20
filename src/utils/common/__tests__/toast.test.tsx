import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { toast } from 'react-toastify';
import { SonnerToastContent, sonnerToast, useCustomToast } from '../toast';
import { renderHook } from '@testing-library/react';
import { SonnerToastContainer } from '@components/common/toast/SonnerToastContainer';
import { RecoilRoot } from 'recoil';

// Mock react-toastify
jest.mock('react-toastify', () => {
  const actual = jest.requireActual('react-toastify');
  return {
    ...actual,
    toast: jest.fn((content: any) => {
      if (typeof content === 'function') {
        const mockClose = jest.fn();
        content({ closeToast: mockClose });
      }
      return 'toast-id-1';
    }),
    ToastContainer: jest.fn((props: any) => (
      <div
        data-testid='mock-toast-container'
        data-theme={props.theme}
        data-stacked={props.stacked ? 'true' : 'false'}
      >
        Toast Container Mock
      </div>
    ))
  };
});

describe('SonnerToastContent component', () => {
  it('renders success toast with default title and message', () => {
    render(
      <SonnerToastContent
        type='success'
        title='Success'
        message='Course created successfully!'
      />
    );

    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(
      screen.getByText('Course created successfully!')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Dismiss notification')).toBeInTheDocument();
  });

  it('renders error toast with custom icon and triggers close', () => {
    const handleClose = jest.fn();
    render(
      <SonnerToastContent
        type='error'
        title='Error'
        message='Failed to delete question'
        customIcon={<span data-testid='custom-error-icon'>!</span>}
        onClose={handleClose}
      />
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Failed to delete question')).toBeInTheDocument();
    expect(screen.getByTestId('custom-error-icon')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Dismiss notification'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders warning and info toast types with default SVGs', () => {
    const { rerender } = render(
      <SonnerToastContent
        type='warning'
        title='Warning'
        message='Please select at least one task'
      />
    );
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(
      screen.getByText('Please select at least one task')
    ).toBeInTheDocument();

    rerender(
      <SonnerToastContent
        type='info'
        title='Notice'
        message='Session expires in 5 minutes'
      />
    );
    expect(screen.getByText('Notice')).toBeInTheDocument();
    expect(
      screen.getByText('Session expires in 5 minutes')
    ).toBeInTheDocument();
  });

  it('renders action button and triggers onClick', () => {
    const handleAction = jest.fn();
    const handleClose = jest.fn();
    render(
      <SonnerToastContent
        type='success'
        title='Question Deleted'
        message='Question has been removed'
        action={{ label: 'Undo', onClick: handleAction }}
        onClose={handleClose}
      />
    );

    const actionButton = screen.getByRole('button', { name: 'Undo' });
    expect(actionButton).toBeInTheDocument();

    fireEvent.click(actionButton);
    expect(handleAction).toHaveBeenCalledTimes(1);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});

describe('sonnerToast and useCustomToast hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('triggers sonnerToast.success with correct options', () => {
    sonnerToast.success('Updated successfully');
    expect(toast).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        type: 'success',
        autoClose: 3500,
        closeButton: false,
        icon: false
      })
    );
  });

  it('triggers sonnerToast.error with longer duration for readability', () => {
    sonnerToast.error('Network timeout occurred');
    expect(toast).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        type: 'error',
        autoClose: 4500,
        closeButton: false,
        icon: false
      })
    );
  });

  it('triggers sonnerToast.warning and sonnerToast.info', () => {
    sonnerToast.warning('Check input fields');
    expect(toast).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        type: 'warning',
        autoClose: 4000
      })
    );

    sonnerToast.info('New feature available');
    expect(toast).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        type: 'info',
        autoClose: 3500
      })
    );
  });

  it('useCustomToast hook provides all helper methods and forwards calls', () => {
    const { result } = renderHook(() => useCustomToast());

    result.current.showSuccessToast('Course saved');
    expect(toast).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ type: 'success' })
    );

    result.current.showErrorToast('Failed saving');
    expect(toast).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ type: 'error' })
    );

    result.current.showWarningToast('Warning msg');
    expect(toast).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ type: 'warning' })
    );

    result.current.showInfoToast('Info msg');
    expect(toast).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ type: 'info' })
    );
  });
});

describe('SonnerToastContainer', () => {
  it('renders container with stacked option enabled', () => {
    render(
      <RecoilRoot>
        <SonnerToastContainer />
      </RecoilRoot>
    );

    const container = screen.getByTestId('mock-toast-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute('data-stacked', 'true');
  });
});
