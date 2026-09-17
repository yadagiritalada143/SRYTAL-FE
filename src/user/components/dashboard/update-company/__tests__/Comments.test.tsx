import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

const PoolCompaniesCommentsTable = require('../comments').default;

const renderCommentsTable = (
  comments: any[] = [],
  isMobile = false,
  props: Record<string, any> = {}
) =>
  render(
    <MantineProvider>
      <PoolCompaniesCommentsTable
        comments={comments}
        currentThemeConfig={{
          color: '#212529',
          backgroundColor: '#ffffff',
          borderColor: '#dee2e6'
        }}
        organizationConfig={{ organization_name: 'srytal' }}
        isMobile={isMobile}
        {...props}
      />
    </MantineProvider>
  );

const mockComment = {
  comment: 'Great partnership opportunity',
  updateAt: '2024-01-20T14:30:00',
  userId: { firstName: 'Alice', lastName: 'Manager' }
};

describe('PoolCompaniesCommentsTable', () => {
  it('shows empty state when no comments', () => {
    renderCommentsTable([]);
    expect(screen.getByText('No comments yet')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Add your first comment above to start tracking updates'
      )
    ).toBeInTheDocument();
  });

  it('shows empty state when comments is undefined', () => {
    renderCommentsTable(undefined as any);
    expect(screen.getByText('No comments yet')).toBeInTheDocument();
  });

  it('renders Comments History heading', () => {
    renderCommentsTable([mockComment]);
    expect(screen.getByText('Comments History')).toBeInTheDocument();
  });

  it('displays singular comment count badge', () => {
    renderCommentsTable([mockComment]);
    expect(screen.getByText('1 comment')).toBeInTheDocument();
  });

  it('displays plural "comments" for multiple entries', () => {
    renderCommentsTable([
      mockComment,
      { ...mockComment, comment: 'Second' }
    ]);
    expect(screen.getByText('2 comments')).toBeInTheDocument();
  });

  it('displays comment text', () => {
    renderCommentsTable([mockComment]);
    expect(
      screen.getByText('Great partnership opportunity')
    ).toBeInTheDocument();
  });

  it('displays user first and last name', () => {
    renderCommentsTable([mockComment]);
    expect(screen.getByText(/Alice/)).toBeInTheDocument();
    expect(screen.getByText(/Manager/)).toBeInTheDocument();
  });

  it('displays serial number', () => {
    renderCommentsTable([mockComment]);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('displays formatted date', () => {
    renderCommentsTable([mockComment]);
    expect(
      screen.getByText('January 20th 2024, 2:30 PM')
    ).toBeInTheDocument();
  });

  it('renders mobile card view', () => {
    renderCommentsTable([mockComment], true);
    expect(
      screen.getByText('Great partnership opportunity')
    ).toBeInTheDocument();
    expect(screen.getByText('#1')).toBeInTheDocument();
  });

  it('renders desktop table view', () => {
    renderCommentsTable([mockComment], false);
    expect(screen.getByText('S.No')).toBeInTheDocument();
    expect(screen.getByText('Comment')).toBeInTheDocument();
    expect(screen.getByText('Created By')).toBeInTheDocument();
    expect(screen.getByText('Created At')).toBeInTheDocument();
  });

  it('renders multiple comments', () => {
    const comments = [
      mockComment,
      {
        ...mockComment,
        comment: 'Second comment',
        userId: { firstName: 'Bob', lastName: 'CEO' }
      }
    ];
    renderCommentsTable(comments);
    expect(screen.getByText('2 comments')).toBeInTheDocument();
    expect(screen.getByText('Second comment')).toBeInTheDocument();
  });

  it('displays user with missing firstName', () => {
    renderCommentsTable([
      { ...mockComment, userId: { firstName: '', lastName: 'Smith' } }
    ]);
    expect(screen.getByText(/Smith/)).toBeInTheDocument();
  });

  it('displays user with missing lastName', () => {
    renderCommentsTable([
      { ...mockComment, userId: { firstName: 'Jane', lastName: '' } }
    ]);
    expect(screen.getByText(/Jane/)).toBeInTheDocument();
  });

  it('renders mobile view with multiple comments', () => {
    const comments = [
      mockComment,
      { ...mockComment, comment: 'Second', updateAt: '2024-02-10T09:00:00', userId: { firstName: 'Bob', lastName: 'CEO' } }
    ];
    renderCommentsTable(comments, true);
    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('#2')).toBeInTheDocument();
  });

  it('renders comment with user name in mobile view', () => {
    renderCommentsTable([mockComment], true);
    expect(screen.getByText(/Alice/)).toBeInTheDocument();
  });
});
