import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';
import React from 'react';
import DataView from '../DataView';

const renderDataView = (props: any) =>
  render(
    <RecoilRoot>
      <MantineProvider>
        <DataView {...props} />
      </MantineProvider>
    </RecoilRoot>
  );

describe('DataView', () => {
  it('renders children when not loading and data exists', () => {
    renderDataView({ isLoading: false, children: <div>Content</div> });
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.queryByText(/Loading/)).not.toBeInTheDocument();
  });

  it('shows the loader while loading', () => {
    renderDataView({ isLoading: true, children: <div>Content</div> });
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('uses the label in the loading state', () => {
    renderDataView({ isLoading: true, label: 'employees' });
    expect(screen.getByText('Loading employees...')).toBeInTheDocument();
  });

  it('shows the empty state when no data exists', () => {
    renderDataView({ isLoading: false, isEmpty: true });
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('uses the label in the empty state', () => {
    renderDataView({ isLoading: false, isEmpty: true, label: 'reports' });
    expect(screen.getByText('No reports found')).toBeInTheDocument();
  });

  it('shows the error state instead of children', () => {
    renderDataView({
      isLoading: false,
      error: new Error('boom'),
      children: <div>Content</div>
    });
    expect(screen.getByText('Failed to load data')).toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('uses the label in the error state', () => {
    renderDataView({
      isLoading: false,
      error: new Error('boom'),
      label: 'courses'
    });
    expect(screen.getByText('Failed to load courses')).toBeInTheDocument();
  });

  it('invokes onRetry when the retry button is clicked', () => {
    const onRetry = jest.fn();
    renderDataView({
      isLoading: false,
      error: new Error('boom'),
      onRetry,
      children: <div>Content</div>
    });
    fireEvent.click(screen.getByRole('button', { name: 'Try Again' }));
    expect(onRetry).toHaveBeenCalled();
  });
});
