import {
  Badge,
  Table,
  Text,
  Card,
  Stack,
  ScrollArea,
  Group
} from '@mantine/core';
import { EmployeeTimesheet } from '@interfaces/timesheet';
import moment from 'moment';

import { useMemo } from 'react';
import { IconClock } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useAppTheme } from '@hooks/use-app-theme';

export const TimeEntriesTable = ({
  changesMade,
  pendingChanges = 0
}: {
  changesMade: EmployeeTimesheet[];
  pendingChanges?: number;
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { themeConfig: currentThemeConfig } = useAppTheme();

  // Get the current theme configuration

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
    <Card shadow='sm' p={isMobile ? 'sm' : 'md'} radius='md' withBorder>
      <Stack gap='md'>
        <Group justify='space-between' align='center'>
          <Group gap='xs'>
    <Card shadow='sm' p={isMobile ? 'sm' : 'md'} radius='md' withBorder>
      <Stack gap='md'>
        <Group justify='space-between' align='center'>
          <Group gap='xs'>
            <IconClock size={20} />
            <Text size='lg' fw={600}>
            <Text size='lg' fw={600}>
              Time Entries Summary
            </Text>
          </Group>
          <Badge size='lg' variant='light' color='blue'>
          <Badge size='lg' variant='light' color='blue'>
            {changesMade.length}{' '}
            {changesMade.length === 1 ? 'entry' : 'entries'}
          </Badge>
        </Group>

        <ScrollArea>
          <Table
            withTableBorder
            withColumnBorders
            verticalSpacing={isMobile ? 'xs' : 'xs'}
            horizontalSpacing={isMobile ? 'xs' : 'xs'}
          >
            <Table.Thead
              style={{
                backgroundColor: currentThemeConfig.backgroundColor,
                color: currentThemeConfig.color
              }}
            >
              <Table.Tr>
                <Table.Th
                  className='p-2 border'
                  style={{ width: isMobile ? '100px' : '130px' }}
                  ta='center'
                >
                  <Text size='sm' fw={500}>
                    Date
                  </Text>
                </Table.Th>
                <Table.Th
                  className='p-2 border'
                  ta='center'
                  style={{ width: isMobile ? '70px' : '100px' }}
                >
                  <Text size='sm' fw={500}>
                  <Text size='sm' fw={500}>
                    Hours
                  </Text>
                </Table.Th>
                {!isMobile && (
                  <Table.Th
                    className='p-2 border'
                    className='p-2 border'
                    style={{ minWidth: '180px' }}
                  >
                    <Text size='sm' fw={500}>
                    <Text size='sm' fw={500}>
                      Comment
                    </Text>
                  </Table.Th>
                )}
                <Table.Th
                  className='p-2 border'
                  ta='center'
                  style={{ width: isMobile ? '100px' : '230px' }}
                >
                  <Text size='sm' fw={500}>
                  <Text size='sm' fw={500}>
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
                      <Table.Td rowSpan={entries.length} className='p-2 border'>
                        <Badge
                          variant='light'
                          color={currentThemeConfig.accentColor}
                          fullWidth
                        >
                          {moment(entry.date).format('ddd, DD MMM')}
                        </Badge>
                      </Table.Td>
                    )}
                    <Table.Td className='p-2 border text-center'>
                      <Text fw={500} size='sm'>
                    <Table.Td className='p-2 border text-center'>
                      <Text fw={500} size='sm'>
                        {entry.hours}
                      </Text>
                    </Table.Td>
                    {!isMobile && (
                      <Table.Td className='p-2 border'>
                        <Text
                          size='sm'
                          style={{
                            whiteSpace: 'normal',
                            wordBreak: 'break-word'
                          }}
                        >
                          {entry.comments}
                        </Text>
                      </Table.Td>
                    )}
                    <Table.Td className='p-2 border text-center'>
                    <Table.Td className='p-2 border text-center'>
                      <Badge
                        size='sm'
                        size='sm'
                        color={
                          entry.status === 'Approved'
                            ? 'green'
                            : entry.status === 'Rejected'
                              ? 'red'
                              : entry.status === 'Waiting For Approval'
                                ? 'orange'
                                : 'gray'
                        }
                        variant='light'
                        variant='light'
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
