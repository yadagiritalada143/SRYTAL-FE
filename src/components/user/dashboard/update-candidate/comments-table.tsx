import {
  Table,
  Card,
  Stack,
  Text,
  Badge,
  ScrollArea,
  Divider,
  Group
} from '@mantine/core';
import { OrganizationConfig } from '../../../../interfaces/organization';
import { PoolCandidatesComments } from '../../../../interfaces/candidate';
import moment from 'moment';
import { useMediaQuery } from '@mantine/hooks';
import { IconMessageCircle } from '@tabler/icons-react';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../../../../atoms/theme';
import { getThemeConfig } from '../../../../utils/common/theme-utils';

interface CommentsTableProps {
  comments: PoolCandidatesComments[];
  organizationConfig: OrganizationConfig;
}

const MobileCommentCard = ({
  comment,
  index
}: {
  comment: any;
  index: number;
}) => {
  const calculateDuration = (start: Date, end: Date) => {
    if (!start || !end) return 'N/A';
    const duration = Math.round(
      (new Date(end).getTime() - new Date(start).getTime()) / 60000
    );
    return duration > 0 ? `${duration} min` : 'N/A';
  };

  return (
    <Card shadow="sm" p="md" mb="sm" withBorder>
      <Stack gap="sm">
        <Group justify="space-between" align="center">
          <Badge variant="filled" color="blue">
            Comment #{index + 1}
          </Badge>
          <Badge variant="light" color="teal">
            {calculateDuration(comment.callStartsAt, comment.callEndsAt)}
          </Badge>
        </Group>

        <Divider />

        <Stack gap={2}>
          <Text size="xs" fw={600} c="dimmed">
            Comment
          </Text>
          <Text size="sm">{comment.comment}</Text>
        </Stack>

        <Group grow>
          <Stack gap={2}>
            <Text size="xs" fw={600} c="dimmed">
              Created By
            </Text>
            <Text size="sm">
              {comment?.userId?.firstName || ''}{' '}
              {comment?.userId?.lastName || 'N/A'}
            </Text>
          </Stack>
        </Group>

        <Stack gap={2}>
          <Text size="xs" fw={600} c="dimmed">
            Created At
          </Text>
          <Text size="sm">
            {moment(new Date(comment.updateAt)).format('MMM DD, YYYY')}
          </Text>
          <Text size="xs" c="dimmed">
            {moment(new Date(comment.updateAt)).format('h:mm A')}
          </Text>
        </Stack>

        {comment.callStartsAt && comment.callEndsAt && (
          <>
            <Divider />
            <Stack gap={2}>
              <Text size="xs" fw={600} c="dimmed">
                Call Duration
              </Text>
              <Group gap="xs">
                <Text size="xs">
                  {moment(new Date(comment.callStartsAt)).format('h:mm A')}
                </Text>
                <Text size="xs" c="dimmed">
                  to
                </Text>
                <Text size="xs">
                  {moment(new Date(comment.callEndsAt)).format('h:mm A')}
                </Text>
              </Group>
            </Stack>
          </>
        )}
      </Stack>
    </Card>
  );
};

const CommentsTable = ({
  comments,
  organizationConfig
}: CommentsTableProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isDarkTheme = useRecoilValue(themeAtom);

  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);

  const calculateDuration = (start: Date, end: Date) => {
    if (!start || !end) return 'N/A';
    const duration = Math.round(
      (new Date(end).getTime() - new Date(start).getTime()) / 60000
    );
    return duration > 0 ? `${duration} minutes` : 'N/A';
  };

  if (!comments || comments.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto my-6">
        <Card shadow="sm" p="xl" radius="md" withBorder>
          <Stack align="center" gap="md">
            <IconMessageCircle size={48} opacity={0.5} />
            <Text size="lg" fw={500}>
              No Comments Yet
            </Text>
            <Text size="sm" c="dimmed" ta="center">
              Comments will appear here once added
            </Text>
          </Stack>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-6">
      <Card shadow="sm" p={0} radius="md" withBorder>
        <Stack gap={0}>
          <div
            style={{
              backgroundColor: currentThemeConfig.backgroundColor,
              color: currentThemeConfig.color
            }}
            className="p-4 border-b"
          >
            <Text size="xl" fw={700}>
              Comments ({comments.length})
            </Text>
          </div>

          {isMobile ? (
            <ScrollArea p="md">
              <Stack gap="sm">
                {comments.map((comment, index) => (
                  <MobileCommentCard
                    key={index}
                    comment={comment}
                    index={index}
                  />
                ))}
              </Stack>
            </ScrollArea>
          ) : (
            <ScrollArea>
              <Table stickyHeader withTableBorder withColumnBorders>
                <Table.Thead
                  style={{
                    backgroundColor: currentThemeConfig.backgroundColor,
                    color: currentThemeConfig.color
                  }}
                >
                  <Table.Tr>
                    <Table.Th
                      className="p-3 border text-center"
                      style={{ minWidth: '60px' }}
                    >
                      <Text size="sm" fw={500}>
                        S.No
                      </Text>
                    </Table.Th>
                    <Table.Th
                      className="p-3 border"
                      style={{ minWidth: isTablet ? '200px' : '300px' }}
                    >
                      <Text size="sm" fw={500}>
                        Comment
                      </Text>
                    </Table.Th>
                    {!isTablet && (
                      <>
                        <Table.Th
                          className="p-3 border text-center"
                          style={{ minWidth: '150px' }}
                        >
                          <Text size="sm" fw={500}>
                            Created By
                          </Text>
                        </Table.Th>
                        <Table.Th
                          className="p-3 border text-center"
                          style={{ minWidth: '180px' }}
                        >
                          <Text size="sm" fw={500}>
                            Created At
                          </Text>
                        </Table.Th>
                      </>
                    )}
                    <Table.Th
                      className="p-3 border text-center"
                      style={{ minWidth: '120px' }}
                    >
                      <Text size="sm" fw={500}>
                        Duration
                      </Text>
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {comments.map((comment, index) => (
                    <Table.Tr key={index} className="transition-colors">
                      <Table.Td className="text-center p-3">
                        <Text size="sm">{index + 1}</Text>
                      </Table.Td>
                      <Table.Td className="p-3">
                        <Text size="sm" lineClamp={isTablet ? 2 : 3}>
                          {comment.comment}
                        </Text>
                      </Table.Td>
                      {!isTablet && (
                        <>
                          <Table.Td className="p-3">
                            <Text size="sm">
                              {comment?.userId?.firstName || ''}{' '}
                              {comment?.userId?.lastName || 'N/A'}
                            </Text>
                          </Table.Td>
                          <Table.Td className="p-3">
                            <Text size="sm">
                              {moment(new Date(comment.updateAt)).format(
                                'MMM DD, YYYY'
                              )}
                            </Text>
                            <Text size="xs" c="dimmed">
                              {moment(new Date(comment.updateAt)).format(
                                'h:mm A'
                              )}
                            </Text>
                          </Table.Td>
                        </>
                      )}
                      <Table.Td className="p-3 text-center">
                        <Badge size="sm" variant="light" color="teal">
                          {calculateDuration(
                            comment.callStartsAt,
                            comment.callEndsAt
                          )}
                        </Badge>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          )}
        </Stack>
      </Card>
    </div>
  );
};

export default CommentsTable;
