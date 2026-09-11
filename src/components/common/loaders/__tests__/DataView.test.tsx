import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import DataView from '../DataView';

const renderDataView = (props: any = {}) =>
  render(
    <MantineProvider>
      <DataView {...props}>
        <span>content</span>
      </DataView>
    </MantineProvider>
  );

jest.mock('../PremiumLoader', () => ({
  __esModule: true,
  default: ({ label, minHeight }: any) => (
    <div
      data-testid='premium-loader'
      data-label={label}
      data-minheight={minHeight}
    />
  )
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  )
}));

describe('DataView', () => {
  it('renders a loading state while isLoading is true', () => {
    renderDataView({ isLoading: true, label: 'employees' });
    expect(screen.getByTestId('premium-loader')).toHaveAttribute(
      'data-label',
      'Loading employees...'
    );
    expect(screen.queryByText('content')).not.toBeInTheDocument();
  });

  it('uses the default label for the loading state', () => {
    renderDataView({ isLoading: true });
    expect(screen.getByTestId('premium-loader')).toHaveAttribute(
      'data-label',
      'Loading data...'
    );
  });

  it('passes its own minHeight through to the loader', () => {
    renderDataView({ isLoading: true, minHeight: '250px' });
    expect(screen.getByTestId('premium-loader')).toHaveAttribute(
      'data-minheight',
      '250px'
    );
  });

  it('renders an error state with a retry button when onRetry is provided', () => {
    const onRetry = jest.fn();
    renderDataView({
      isLoading: false,
      error: 'oops',
      label: 'employees',
      onRetry
    });
    expect(screen.getByText('Failed to load employees')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Try Again' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('content')).not.toBeInTheDocument();
  });

  it('renders an error state without a retry button when none is provided', () => {
    renderDataView({ isLoading: false, error: 'oops', label: 'employees' });
    expect(screen.getByText('Failed to load employees')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Try Again' })
    ).not.toBeInTheDocument();
  });

  it('renders an empty state when isEmpty is true', () => {
    renderDataView({ isLoading: false, isEmpty: true, label: 'projects' });
    expect(screen.getByText('No projects found')).toBeInTheDocument();
    expect(screen.queryByText('content')).not.toBeInTheDocument();
  });

  it('renders children when loading/error/empty are all negative', () => {
    renderDataView({ isLoading: false, label: 'employees' });
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});