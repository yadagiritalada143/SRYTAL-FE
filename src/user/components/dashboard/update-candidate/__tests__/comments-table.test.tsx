import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { PoolCandidatesComments } from '@interfaces/candidate';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6'
    }
  })
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false
}));

const CommentsTable = require('../comments-table').default;

const renderCommentsTable = (comments: PoolCandidatesComments[] = []) =>
  render(
    <MantineProvider>
      <CommentsTable comments={comments} />
    </MantineProvider>
  );

const mockComment: PoolCandidatesComments = {
  _id: 'c1',
  id: 'c1',
  comment: 'Great interview performance',
  callStartsAt: new Date('2024-01-15T10:00:00'),
  callEndsAt: new Date('2024-01-15T10:45:00'),
  updateAt: '2024-01-15T11:00:00',
  userId: {
    _id: 'u1',
    firstName: 'John',
    lastName: 'Manager',
    id: 'u1'
  }
};

describe('CommentsTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows empty state when comments array is empty', () => {
    renderCommentsTable([]);
    expect(screen.getByText('No Comments Yet')).toBeInTheDocument();
    expect(
      screen.getByText('Comments will appear here once added')
    ).toBeInTheDocument();
  });

  it('shows empty state when comments is undefined', () => {
    renderCommentsTable(undefined as any);
    expect(screen.getByText('No Comments Yet')).toBeInTheDocument();
  });

  it('renders the empty state heading', () => {
    renderCommentsTable([]);
    expect(screen.getByText('No Comments Yet')).toBeInTheDocument();
  });

  it('renders comments header with count', () => {
    renderCommentsTable([mockComment]);
    expect(screen.getByText('Comments (1)')).toBeInTheDocument();
  });

  it('displays comment text', () => {
    renderCommentsTable([mockComment]);
    expect(screen.getByText('Great interview performance')).toBeInTheDocument();
  });

  it('displays user name with first and last name', () => {
    renderCommentsTable([mockComment]);
    expect(screen.getByText(/John/)).toBeInTheDocument();
    expect(screen.getByText(/Manager/)).toBeInTheDocument();
  });

  it('displays serial number', () => {
    renderCommentsTable([mockComment]);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('displays formatted date', () => {
    renderCommentsTable([mockComment]);
    expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument();
  });

  it('displays formatted time', () => {
    renderCommentsTable([mockComment]);
    expect(screen.getByText('11:00 AM')).toBeInTheDocument();
  });

  it('displays duration badge', () => {
    renderCommentsTable([mockComment]);
    expect(screen.getByText('45 minutes')).toBeInTheDocument();
  });

  it('renders multiple comments', () => {
    const comments = [
      mockComment,
      {
        ...mockComment,
        _id: 'c2',
        id: 'c2',
        comment: 'Good communication skills'
      }
    ];
    renderCommentsTable(comments);
    expect(screen.getByText('Comments (2)')).toBeInTheDocument();
    expect(screen.getByText('Good communication skills')).toBeInTheDocument();
  });

  it('shows N/A duration when call times are missing', () => {
    const comment: PoolCandidatesComments = {
      ...mockComment,
      callStartsAt: undefined as any,
      callEndsAt: undefined as any
    };
    renderCommentsTable([comment]);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('shows N/A for duration when end time is before start time', () => {
    const comment: PoolCandidatesComments = {
      ...mockComment,
      callStartsAt: new Date('2024-01-15T11:00:00'),
      callEndsAt: new Date('2024-01-15T10:00:00')
    };
    renderCommentsTable([comment]);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('renders table headers on desktop', () => {
    renderCommentsTable([mockComment]);
    expect(screen.getByText('S.No')).toBeInTheDocument();
    expect(screen.getByText('Comment')).toBeInTheDocument();
    expect(screen.getByText('Created By')).toBeInTheDocument();
    expect(screen.getByText('Created At')).toBeInTheDocument();
    expect(screen.getByText('Duration')).toBeInTheDocument();
  });

  it('renders comment with string callStartsAt/callEndsAt', () => {
    const comment: PoolCandidatesComments = {
      ...mockComment,
      callStartsAt: '2024-01-15T10:00:00' as any,
      callEndsAt: '2024-01-15T11:00:00' as any
    };
    renderCommentsTable([comment]);
    expect(screen.getByText('60 minutes')).toBeInTheDocument();
  });

  it('renders comment when callStartsAt is missing but callEndsAt present', () => {
    const comment: PoolCandidatesComments = {
      ...mockComment,
      callStartsAt: undefined as any,
      callEndsAt: new Date('2024-01-15T11:00:00')
    };
    renderCommentsTable([comment]);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('renders comment when callEndsAt is missing but callStartsAt present', () => {
    const comment: PoolCandidatesComments = {
      ...mockComment,
      callStartsAt: new Date('2024-01-15T10:00:00'),
      callEndsAt: undefined as any
    };
    renderCommentsTable([comment]);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('renders user with missing firstName', () => {
    const comment: PoolCandidatesComments = {
      ...mockComment,
      userId: {
        _id: 'u1',
        firstName: '',
        lastName: 'Manager',
        id: 'u1'
      }
    };
    renderCommentsTable([comment]);
    expect(screen.getByText(/Manager/)).toBeInTheDocument();
  });

  it('renders user with missing lastName', () => {
    const comment: PoolCandidatesComments = {
      ...mockComment,
      userId: {
        _id: 'u1',
        firstName: 'John',
        lastName: '',
        id: 'u1'
      }
    };
    renderCommentsTable([comment]);
    expect(screen.getByText(/John/)).toBeInTheDocument();
  });

  it('renders multiple comments with different serial numbers', () => {
    const comments = [
      mockComment,
      { ...mockComment, _id: 'c2', id: 'c2', comment: 'Second' },
      { ...mockComment, _id: 'c3', id: 'c3', comment: 'Third' }
    ];
    renderCommentsTable(comments);
    expect(screen.getByText('Comments (3)')).toBeInTheDocument();
  });

  it('renders Duration header in table', () => {
    renderCommentsTable([mockComment]);
    expect(screen.getByText('Duration')).toBeInTheDocument();
  });
});
