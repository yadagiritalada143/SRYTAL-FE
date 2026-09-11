import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StandardModal } from '../base-model';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      headerBackgroundColor: '#f8f9fa',
      borderColor: '#dee2e6',
      button: { color: '#1971c2', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('react-toastify', () => ({
  toast: { warning: jest.fn() }
}));

const toast = jest.requireMock('react-toastify').toast;

jest.mock('@mantine/core', () => {
  const actual = jest.requireActual('@mantine/core');
  return {
    ...actual,
    Modal: (props: any) =>
      props.opened ? (
        <div
          data-testid='modal'
          data-close-outside={props.closeOnClickOutside}
          data-close-escape={props.closeOnEscape}
          data-close-button={props.withCloseButton}
          data-overlay-color={props.overlayProps?.color}
        >
          <button onClick={props.onClose}>modal-close</button>
          {props.children}
        </div>
      ) : null
  };
});

describe('StandardModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when not opened', () => {
    render(
      <StandardModal opened={false} onClose={jest.fn()}>
        content
      </StandardModal>
    );
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('renders children when opened', () => {
    render(
      <StandardModal opened onClose={jest.fn()}>
        content
      </StandardModal>
    );
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('closes through its own onClose when forceAction is false', () => {
    const onClose = jest.fn();
    render(
      <StandardModal opened onClose={onClose}>
        content
      </StandardModal>
    );
    fireEvent.click(screen.getByRole('button', { name: 'modal-close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(toast.warning).not.toHaveBeenCalled();
  });

  it('warns and blocks closing when forceAction is true', () => {
    const onClose = jest.fn();
    render(
      <StandardModal opened forceAction onClose={onClose}>
        content
      </StandardModal>
    );
    fireEvent.click(screen.getByRole('button', { name: 'modal-close' }));
    expect(onClose).not.toHaveBeenCalled();
    expect(toast.warning).toHaveBeenCalledWith(
      'Please complete this action before closing'
    );
  });

  it('disables outside-click/escape/close-button when forceAction', () => {
    const { rerender } = render(
      <StandardModal opened onClose={jest.fn()}>x</StandardModal>
    );
    expect(screen.getByTestId('modal')).toHaveAttribute(
      'data-close-outside',
      'true'
    );

    rerender(
      <StandardModal opened forceAction onClose={jest.fn()}>
        x
      </StandardModal>
    );
    const modal = screen.getByTestId('modal');
    expect(modal).toHaveAttribute('data-close-outside', 'false');
    expect(modal).toHaveAttribute('data-close-escape', 'false');
    expect(modal).toHaveAttribute('data-close-button', 'false');
  });

  it('uses the theme background color for the overlay', () => {
    render(<StandardModal opened onClose={jest.fn()}>x</StandardModal>);
    expect(screen.getByTestId('modal')).toHaveAttribute(
      'data-overlay-color',
      '#ffffff'
    );
  });
});