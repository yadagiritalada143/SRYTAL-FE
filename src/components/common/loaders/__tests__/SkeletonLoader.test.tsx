import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkeletonLoader from '../SkeletonLoader';

jest.mock('@mantine/core', () => {
  const Table = ({ children }: any) => <table>{children}</table>;
  Table.Thead = ({ children }: any) => <thead>{children}</thead>;
  Table.Tr = ({ children }: any) => <tr>{children}</tr>;
  Table.Th = ({ children }: any) => <th>{children}</th>;
  Table.Tbody = ({ children }: any) => <tbody>{children}</tbody>;
  Table.Td = ({ children }: any) => <td>{children}</td>;

  return {
    Skeleton: () => <div data-testid='skeleton' />,
    Table,
    Stack: ({ children }: any) => <div data-testid='stack'>{children}</div>,
    Card: ({ children }: any) => <div data-testid='card'>{children}</div>,
    SimpleGrid: ({ children }: any) => <div data-testid='grid'>{children}</div>,
    Group: ({ children }: any) => <div data-testid='group'>{children}</div>
  };
});

describe('SkeletonLoader', () => {
  afterEach(cleanup);

  it('renders a single skeleton for an unknown type', () => {
    render(<SkeletonLoader type='weird' as any />);
    expect(screen.getAllByTestId('skeleton')).toHaveLength(1);
  });

  it('renders the table skeleton with default rows and columns', () => {
    render(<SkeletonLoader type='table' />);
    expect(screen.getAllByRole('columnheader')).toHaveLength(5);
    expect(screen.getAllByRole('row')).toHaveLength(6);
    expect(screen.getAllByTestId('skeleton')).toHaveLength(30);
  });

  it('respects custom rows/columns for the table skeleton', () => {
    render(<SkeletonLoader type='table' rows={2} columns={3} />);
    expect(screen.getAllByRole('columnheader')).toHaveLength(3);
    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.getAllByTestId('skeleton')).toHaveLength(9);
  });

  it('renders one card per row for the cards skeleton', () => {
    render(<SkeletonLoader type='cards' rows={3} />);
    expect(screen.getAllByTestId('card')).toHaveLength(3);
  });

  it('renders one list group per row for the list skeleton', () => {
    render(<SkeletonLoader type='list' rows={4} />);
    expect(screen.getAllByTestId('group')).toHaveLength(4);
  });

  it('renders the form skeleton with two skeletons per row plus footer buttons', () => {
    render(<SkeletonLoader type='form' rows={2} />);
    expect(screen.getAllByTestId('skeleton')).toHaveLength(6);
  });
});