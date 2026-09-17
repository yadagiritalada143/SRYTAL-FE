import { render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import React from 'react';
import SkeletonLoader from '../SkeletonLoader';

const renderLoader = (props: any) =>
  render(
    <MantineProvider>
      <SkeletonLoader {...props} />
    </MantineProvider>
  );

describe('SkeletonLoader', () => {
  it('renders a table skeleton with the given rows and columns', () => {
    const { container } = renderLoader({ type: 'table', rows: 3, columns: 2 });
    const table = container.querySelector('table');
    expect(table).not.toBeNull();
    expect(table?.querySelectorAll('tr').length).toBe(4);
    expect(container.querySelectorAll('.mantine-Skeleton-root').length).toBe(8);
  });

  it('renders cards skeleton with the given number of cards', () => {
    const { container } = renderLoader({ type: 'cards', rows: 3 });
    expect(container.querySelectorAll('.mantine-Card-root').length).toBe(3);
  });

  it('renders a list skeleton with the given number of rows', () => {
    const { container } = renderLoader({ type: 'list', rows: 4 });
    expect(container.querySelectorAll('.mantine-Skeleton-root').length).toBe(
      12
    );
  });

  it('renders a form skeleton with the given number of rows', () => {
    const { container } = renderLoader({ type: 'form', rows: 2 });
    expect(container.querySelectorAll('.mantine-Skeleton-root').length).toBe(6);
  });

  it('uses default row and column counts when not provided', () => {
    const { container } = renderLoader({ type: 'table' });
    const table = container.querySelector('table');
    expect(table).not.toBeNull();
    expect(table?.querySelectorAll('tr').length).toBe(6);
  });

  it('falls back to a single skeleton for unknown types', () => {
    const { container } = renderLoader({ type: 'unknown' as any });
    expect(container.querySelectorAll('.mantine-Skeleton-root').length).toBe(1);
  });
});
