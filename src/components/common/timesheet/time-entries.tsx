import {
  Badge,
  Table,
  Text,
  Card,
  Stack,
  ScrollArea,
  Group
} from '@mantine/core';
import { EmployeeTimesheet } from '../../../interfaces/timesheet';
import moment from 'moment';
import { OrganizationConfig } from '../../../interfaces/organization';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../../../atoms/theme';
import { useMemo } from 'react';
import { IconClock } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { getThemeConfig } from '../../../utils/common/theme-utils';

export const TimeEntriesTable = ({
  changesMade,
  pendingChanges = 0,
  organizationConfig
}: {
  changesMade: EmployeeTimesheet[];
  pendingChanges?: number;
  organizationConfig: OrganizationConfig;
}) => {
  const isDarkTheme = useRecoilValue(themeAtom);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Get the current theme configuration
  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);

  const groupedEntries = useMemo(() => {
    return Object.entries(
      changesMade.reduce(
        (acc, change) => {
          const dateKey = moment(change.date).format('YYYY-MM-DD');
          if (!acc[dateKey]) acc[dateKey] = [];
          acc[dateKey].push(change);
          return acc;
        },
        {} as Record<string, typeof changesMade>
      )
    );
  }, [changesMade]);

  if (!changesMade.length) {
    return null;
  }

  return (
    <Card shadow="sm" p={isMobile ? 'sm' : 'md'} radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Group gap="xs">
            <IconClock size={20} />
            <Text size="lg" fw={600}>
              Time Entries Summary
            </Text>
          </Group>
          <Badge size="lg" variant="light" color="blue">
            {changesMade.length}{' '}
            {changesMade.length === 1 ? 'entry' : 'entries'}
          </Badge>
        </Group>

        <ScrollArea>
          <Table
            withTableBorder
            withColumnBorders
            verticalSpacing={isMobile ? 'xs' : 'sm'}
            horizontalSpacing={isMobile ? 'xs' : 'md'}
          >
            <Table.Thead
              style={{
                backgroundColor: currentThemeConfig.backgroundColor,
                color: currentThemeConfig.color
              }}
            >
              <Table.Tr>
                <Table.Th className="p-2 border" style={{ minWidth: '120px' }}>
                  <Text size="sm" fw={500}>
                    Date
                  </Text>
                </Table.Th>
                <Table.Th
                  className="p-2 border"
                  style={{ minWidth: isMobile ? '80px' : '120px' }}
                >
                  <Text size="sm" fw={500}>
                    Hours
                  </Text>
                </Table.Th>
                {!isMobile && (
                  <Table.Th
                    className="p-2 border"
                    style={{ minWidth: '180px' }}
                  >
                    <Text size="sm" fw={500}>
                      Comment
                    </Text>
                  </Table.Th>
                )}
                <Table.Th
                  className="p-2 border text-center"
                  style={{ width: isMobile ? '100px' : '120px' }}
                >
                  <Text size="sm" fw={500}>
                    Status
                  </Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {groupedEntries.map(([dateKey, entries]) => {
                return entries.map((entry, idx) => (
                  <Table.Tr key={`${dateKey}-${idx}`}>
                    {idx === 0 && (
                      <Table.Td rowSpan={entries.length} className="p-2 border">
                        <Badge variant="light" color="blue" fullWidth>
                          {moment(entry.date).format('ddd, DD MMM')}
                        </Badge>
                      </Table.Td>
                    )}
                    <Table.Td className="p-2 border text-center">
                      <Text fw={500} size="sm">
                        {entry.hours}
                      </Text>
                    </Table.Td>
                    {!isMobile && (
                      <Table.Td className="p-2 border">
                        <Text size="sm" lineClamp={2}>
                          {entry.comments}
                        </Text>
                      </Table.Td>
                    )}
                    <Table.Td className="p-2 border text-center">
                      <Badge
                        size="sm"
                        color={
                          entry.status === 'Approved'
                            ? 'green'
                            : entry.status === 'Rejected'
                              ? 'red'
                              : entry.status === 'Waiting For Approval'
                                ? 'orange'
                                : 'gray'
                        }
                        variant="light"
                      >
                        {!pendingChanges && entry.status === 'Not Submitted'
                          ? 'Waiting For Approval'
                          : entry.status}
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                ));
              })}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Stack>
    </Card>
  );
};
