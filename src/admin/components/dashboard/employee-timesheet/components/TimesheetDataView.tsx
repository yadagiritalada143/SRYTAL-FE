import React, { useState } from 'react';
import {
  Stack,
  Card,
  Table,
  Checkbox,
  Text,
  Badge,
  rem,
  Divider,
  Flex,
  Group,
  Collapse,
  Button,
  Box,
  Paper
} from '@mantine/core';
import {
  IconSortAscending,
  IconSortDescending,
  IconCircleCheck,
  IconCircleX
} from '@tabler/icons-react';
import moment from 'moment';
import { EmployeeTimesheet, TimesheetStatus } from '@interfaces/timesheet';
import { StatusBadge } from './StatusBadge';
import { TimesheetActions } from './TimesheetActions';
import DataView from '@components/common/loaders/DataView';

interface TimesheetDataViewProps {
  data: EmployeeTimesheet[];
  isLoading: boolean;
  label: string;
  isMobile: boolean;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleAll: (checked: boolean) => void;
  isAllSelected: boolean;
  sortOrder: 'asc' | 'desc';
  onSort: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  activePage: number;
  itemsPerPage: number;
  themeConfig: any;
  noDataMessage?: string;
  isLeaves?: boolean;
}

const MobileCard: React.FC<{
  timesheet: EmployeeTimesheet;
  index: number;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isLeaves?: boolean;
}> = ({
  timesheet,
  index,
  isSelected,
  onToggleSelect,
  onApprove,
  onReject,
  isLeaves
}) => {
  const [expanded, setExpanded] = useState(false);
  const isPending = timesheet.status === TimesheetStatus.WaitingForApproval;

  return (
    <Paper
      onClick={() => setExpanded(!expanded)}
      shadow='xs'
      p='sm'
      radius='md'
      withBorder
    >
      <Stack gap='xs'>
        <Flex justify='space-between' align='center'>
          <Group gap='xs'>
            <Checkbox
              checked={isSelected}
              onChange={e => {
                e.stopPropagation();
                onToggleSelect(timesheet.id);
              }}
              onClick={e => e.stopPropagation()}
            />
            <Text size='sm' fw={600}>
              #{index}
            </Text>
          </Group>
        </Flex>

        <Flex justify='space-between' align='center'>
          <Text size='sm' c='dimmed'>
            {moment(timesheet.date).format('MMM D, YYYY')}
          </Text>
          <StatusBadge status={timesheet.status} />
        </Flex>

        <Box>
          <Text size='xs' c='dimmed'>
            {isLeaves ? 'Leave Reason' : 'Project'}
          </Text>
          <Text size='sm' fw={500}>
            {isLeaves ? timesheet.leaveReason : timesheet.project_name}
          </Text>
        </Box>

        <Collapse in={expanded}>
          <Stack gap='xs'>
            <Divider />

            {!isLeaves && (
              <Box>
                <Text size='xs' c='dimmed'>
                  Task
                </Text>
                <Text size='sm'>{timesheet.task_name}</Text>
              </Box>
            )}

            <Flex justify='space-between' align='center'>
              <Box>
                <Text size='xs' c='dimmed'>
                  Hours
                </Text>
                <Badge size='sm' variant='light'>
                  {timesheet.hours}h
                </Badge>
              </Box>
            </Flex>

            {timesheet.comments && (
              <Box>
                <Text size='xs' c='dimmed'>
                  Comments
                </Text>
                <Text size='sm'>{timesheet.comments}</Text>
              </Box>
            )}

            {isPending && (
              <>
                <Divider />
                <Group grow>
                  <Button
                    size='xs'
                    variant='light'
                    color='green'
                    onClick={e => {
                      e.stopPropagation();
                      onApprove(timesheet.id);
                    }}
                    leftSection={<IconCircleCheck size={14} />}
                  >
                    Approve
                  </Button>
                  <Button
                    size='xs'
                    variant='light'
                    color='red'
                    onClick={e => {
                      e.stopPropagation();
                      onReject(timesheet.id);
                    }}
                    leftSection={<IconCircleX size={14} />}
                  >
                    Reject
                  </Button>
                </Group>
              </>
            )}
          </Stack>
        </Collapse>
      </Stack>
    </Paper>
  );
};

export const TimesheetDataView: React.FC<TimesheetDataViewProps> = ({
  data,
  isLoading,
  label,
  isMobile,
  selectedIds,
  onToggleSelect,
  onToggleAll,
  isAllSelected,
  sortOrder,
  onSort,
  onApprove,
  onReject,
  activePage,
  itemsPerPage,
  themeConfig,
  noDataMessage = 'No entries found',
  isLeaves = false
}) => {
  if (isMobile) {
    return (
      <DataView isLoading={isLoading} label={label}>
        <Stack gap='sm'>
          {data.length > 0 ? (
            data.map((item, index) => (
              <MobileCard
                key={item.id}
                timesheet={item}
                index={index + 1 + (activePage - 1) * itemsPerPage}
                isSelected={selectedIds.includes(item.id)}
                onToggleSelect={onToggleSelect}
                onApprove={onApprove}
                onReject={onReject}
                isLeaves={isLeaves}
              />
            ))
          ) : (
            <Card shadow='sm' p='xl' radius='md' withBorder>
              <Stack align='center' gap='md'>
                <Text size='lg'>{noDataMessage}</Text>
              </Stack>
            </Card>
          )}
        </Stack>
      </DataView>
    );
  }

  return (
    <DataView isLoading={isLoading} label={label}>
      <Card
        shadow='sm'
        p={0}
        radius='md'
        withBorder
        style={{ overflowX: 'auto' }}
      >
        <Table stickyHeader withTableBorder withColumnBorders>
          <Table.Thead
            style={{
              backgroundColor: themeConfig.backgroundColor,
              color: themeConfig.color
            }}
          >
            <Table.Tr>
              <Table.Th style={{ padding: rem(12), textAlign: 'center' }}>
                <Checkbox
                  checked={isAllSelected}
                  onChange={e => onToggleAll(e.currentTarget.checked)}
                />
              </Table.Th>
              <Table.Th style={{ padding: rem(12), textAlign: 'center' }}>
                <Text size='sm' fw={500}>
                  S.No
                </Text>
              </Table.Th>
              <Table.Th
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={onSort}
              >
                <Group justify='center' gap='xs'>
                  <Text size='sm' fw={500}>
                    Date
                  </Text>
                  {sortOrder === 'asc' ? (
                    <IconSortAscending size={14} />
                  ) : (
                    <IconSortDescending size={14} />
                  )}
                </Group>
              </Table.Th>
              <Table.Th style={{ padding: rem(12), textAlign: 'center' }}>
                <Text size='sm' fw={500}>
                  {isLeaves ? 'Leave Reason' : 'Project'}
                </Text>
              </Table.Th>
              {!isLeaves && (
                <Table.Th style={{ padding: rem(12), textAlign: 'center' }}>
                  <Text size='sm' fw={500}>
                    Task
                  </Text>
                </Table.Th>
              )}
              <Table.Th style={{ padding: rem(12), textAlign: 'center' }}>
                <Text size='sm' fw={500}>
                  Hours
                </Text>
              </Table.Th>
              <Table.Th style={{ padding: rem(12), textAlign: 'center' }}>
                <Text size='sm' fw={500}>
                  Status
                </Text>
              </Table.Th>
              <Table.Th style={{ padding: rem(12), textAlign: 'center' }}>
                <Text size='sm' fw={500}>
                  Actions
                </Text>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <Table.Tr key={item.id}>
                  <Table.Td style={{ textAlign: 'center', padding: rem(12) }}>
                    <Checkbox
                      checked={selectedIds.includes(item.id)}
                      onChange={() => onToggleSelect(item.id)}
                    />
                  </Table.Td>
                  <Table.Td style={{ textAlign: 'center', padding: rem(12) }}>
                    <Text size='sm'>
                      {index + 1 + (activePage - 1) * itemsPerPage}
                    </Text>
                  </Table.Td>
                  <Table.Td style={{ padding: rem(12), textAlign: 'center' }}>
                    <Text size='sm'>
                      {moment(item.date).format('MMM D, YYYY')}
                    </Text>
                  </Table.Td>
                  <Table.Td style={{ padding: rem(12) }}>
                    <Text size='sm'>
                      {isLeaves ? item.leaveReason : item.project_name}
                    </Text>
                  </Table.Td>
                  {!isLeaves && (
                    <Table.Td style={{ padding: rem(12) }}>
                      <Text size='sm'>{item.task_name}</Text>
                    </Table.Td>
                  )}
                  <Table.Td style={{ padding: rem(12), textAlign: 'center' }}>
                    <Badge size='sm'>{item.hours}h</Badge>
                  </Table.Td>
                  <Table.Td style={{ padding: rem(12), textAlign: 'center' }}>
                    <StatusBadge status={item.status} />
                  </Table.Td>
                  <Table.Td style={{ padding: rem(12) }}>
                    <TimesheetActions
                      timesheet={item}
                      onApprove={onApprove}
                      onReject={onReject}
                    />
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td
                  colSpan={isLeaves ? 7 : 8}
                  style={{ textAlign: 'center', padding: rem(32) }}
                >
                  <Text size='lg'>{noDataMessage}</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Card>
    </DataView>
  );
};
