import {
  Table,
  Card,
  Text,
  Badge,
  Stack,
  ScrollArea,
  Group
} from '@mantine/core';
import { OrganizationConfig } from '../../../../interfaces/organization';
import moment from 'moment';
import { IconMessageCircle } from '@tabler/icons-react';

const PoolCompaniesCommentsTable = ({
  comments,
  currentThemeConfig,
  isMobile
}: {
  comments: any[];
  organizationConfig: OrganizationConfig;
  currentThemeConfig: any;
  isMobile: boolean | undefined;
}) => {
  if (!comments || comments.length === 0) {
    return (
      <Card shadow="sm" p="xl" radius="md" withBorder>
        <Stack align="center" gap="md">
          <IconMessageCircle size={48} opacity={0.5} />
          <Text size="lg" c="dimmed">
            No comments yet
          </Text>
          <Text size="sm" c="dimmed" ta="center">
            Add your first comment above to start tracking updates
          </Text>
        </Stack>
      </Card>
    );
  }

  return (
    <Card shadow="sm" p={0} radius="md" withBorder>
      <Card.Section p="md" withBorder>
        <Group justify="space-between">
          <Text size="lg" fw={600}>
            Comments History
          </Text>
          <Badge variant="light" size="lg">
            {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
          </Badge>
        </Group>
      </Card.Section>

      {isMobile ? (
        // Mobile Card View
        <ScrollArea p="md">
          <Stack gap="sm">
            {comments.map((comment: any, index: number) => (
              <Card key={index} withBorder p="md" radius="md">
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Badge variant="filled" color="blue">
                      #{index + 1}
                    </Badge>
                    <Text size="xs" c="dimmed">
                      {moment(new Date(comment.updateAt)).format(
                        'MMM DD, YYYY h:mm A'
                      )}
                    </Text>
                  </Group>
                  <Text size="sm" fw={500}>
                    {comment?.userId?.firstName || ''}{' '}
                    {comment?.userId?.lastName || ''}
                  </Text>
                  <Text size="sm">{comment.comment}</Text>
                </Stack>
              </Card>
            ))}
          </Stack>
        </ScrollArea>
      ) : (
        // Desktop Table View
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
                  style={{ width: '80px' }}
                >
                  <Text size="sm" fw={500}>
                    S.No
                  </Text>
                </Table.Th>
                <Table.Th className="p-3 border">
                  <Text size="sm" fw={500}>
                    Comment
                  </Text>
                </Table.Th>
                <Table.Th className="p-3 border" style={{ width: '200px' }}>
                  <Text size="sm" fw={500}>
                    Created By
                  </Text>
                </Table.Th>
                <Table.Th className="p-3 border" style={{ width: '200px' }}>
                  <Text size="sm" fw={500}>
                    Created At
                  </Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {comments.map((comment: any, index: number) => (
                <Table.Tr key={index} className="transition-colors">
                  <Table.Td className="p-3 text-center">
                    <Text size="sm">{index + 1}</Text>
                  </Table.Td>
                  <Table.Td className="p-3">
                    <Text size="sm">{comment.comment}</Text>
                  </Table.Td>
                  <Table.Td className="p-3">
                    <Text size="sm" fw={500}>
                      {comment?.userId?.firstName || ''}{' '}
                      {comment?.userId?.lastName || ''}
                    </Text>
                  </Table.Td>
                  <Table.Td className="p-3">
                    <Text size="sm">
                      {moment(new Date(comment.updateAt)).format(
                        'MMMM Do YYYY, h:mm A'
                      )}
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      )}
    </Card>
  );
};

export default PoolCompaniesCommentsTable;
