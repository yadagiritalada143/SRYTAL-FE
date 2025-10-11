import {
  Button,
  Group,
  Textarea,
  TextInput,
  Text,
  Table,
  Badge,
  Stack,
  ScrollArea,
  Divider,
  Card
} from '@mantine/core';
import { StandardModal } from '../../UI/Models/base-model';
import moment from 'moment';
import {
  EmployeeTimesheet,
  TimesheetStatus
} from '../../../interfaces/timesheet';
import { useCallback, useMemo, useState } from 'react';
import { DatePickerInput, DateValue } from '@mantine/dates';
import { toast } from 'react-toastify';
import { prepareSubmitData } from './helper';
import { submitTimeSheet } from '../../../services/common-services';
import { useCustomToast } from '../../../utils/common/toast';
import {
  IconCheck,
  IconX,
  IconCalendarOff,
  IconClock
} from '@tabler/icons-react';
import React from 'react';
import { useMediaQuery } from '@mantine/hooks';

export const EditTimeEntryModal = React.memo(
  ({
    openedEntryModal,
    closeEntryModal,
    currentEntry,
    setCurrentEntry,
    handleEntrySubmit
  }: {
    openedEntryModal: boolean;
    closeEntryModal: () => void;
    currentEntry: EmployeeTimesheet;
    setCurrentEntry: React.Dispatch<
      React.SetStateAction<EmployeeTimesheet | undefined>
    >;
    handleEntrySubmit: () => void;
  }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const handleHoursChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.currentTarget.value;
        if (rawValue === '') {
          setCurrentEntry(prev => ({
            ...(prev || currentEntry),
            hours: 0
          }));
          return;
        }

        const numericValue = parseFloat(rawValue);
        if (!isNaN(numericValue)) {
          const clampedValue = Math.min(24, Math.max(0, numericValue));
          setCurrentEntry(prev => ({
            ...(prev || currentEntry),
            hours: clampedValue,
            status: 'Waiting For Approval' as TimesheetStatus
          }));
        }
      },
      [currentEntry, setCurrentEntry]
    );

    const handleCommentsChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentEntry(prev => ({
          ...(prev || currentEntry),
          comments: e.target.value,
          status: 'Waiting For Approval' as TimesheetStatus
        }));
      },
      [currentEntry, setCurrentEntry]
    );

    const formattedDate = useMemo(
      () => moment(currentEntry.date).format('DD MMM YYYY'),
      [currentEntry.date]
    );

    return (
      <StandardModal
        opened={openedEntryModal}
        onClose={closeEntryModal}
        title={
          <Group gap="xs">
            <IconClock size={20} />
            <Text fw={600} size="lg">
              Edit Time Entry
            </Text>
          </Group>
        }
        size="lg"
      >
        <Stack gap="md" p={isMobile ? 'sm' : 'md'}>
          {/* Entry Details */}
          <Card withBorder p="sm" radius="md">
            <Stack gap="xs">
              <Group gap="xs">
                <Text size="sm" c="dimmed" fw={500}>
                  Project:
                </Text>
                <Text size="sm" fw={600}>
                  {currentEntry.project_name}
                </Text>
              </Group>
              <Group gap="xs">
                <Text size="sm" c="dimmed" fw={500}>
                  Task:
                </Text>
                <Text size="sm" fw={600}>
                  {currentEntry.task_name}
                </Text>
              </Group>
              <Group gap="xs">
                <Text size="sm" c="dimmed" fw={500}>
                  Date:
                </Text>
                <Badge variant="light" color="blue">
                  {formattedDate}
                </Badge>
              </Group>
            </Stack>
          </Card>

          <Divider />

          {/* Input Fields */}
          <TextInput
            label="Hours"
            description="Enter hours worked (0-24)"
            type="number"
            min={0}
            max={24}
            step={0.5}
            value={currentEntry.hours.toString()}
            onChange={handleHoursChange}
            size={isMobile ? 'sm' : 'md'}
            required
          />

          <Textarea
            label="Comments"
            description="Please provide details about your work"
            placeholder="Enter comments (required)"
            value={currentEntry.comments}
            onChange={handleCommentsChange}
            autosize
            minRows={3}
            maxRows={6}
            size={isMobile ? 'sm' : 'md'}
            required
          />

          <Divider />

          {/* Action Buttons */}
          <Group justify="flex-end" gap="xs">
            <Button
              variant="default"
              onClick={closeEntryModal}
              leftSection={<IconX size={16} />}
              size={isMobile ? 'sm' : 'md'}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEntrySubmit}
              leftSection={<IconCheck size={16} />}
              disabled={
                !currentEntry.comments.trim() || currentEntry.hours === 0
              }
              size={isMobile ? 'sm' : 'md'}
            >
              Save Entry
            </Button>
          </Group>
        </Stack>
      </StandardModal>
    );
  }
);

export const ApplyLeaveTimesheetModal = React.memo(
  ({
    openedLeaveModal,
    closeLeaveModal,
    timeEntries,
    fetchTimesheetData
  }: {
    openedLeaveModal: boolean;
    closeLeaveModal: () => void;
    timeEntries: EmployeeTimesheet[];
    fetchTimesheetData: () => Promise<void>;
  }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [leaveReason, setLeaveReason] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [leaveDate, setLeaveDate] = useState<DateValue>();
    const { showSuccessToast } = useCustomToast();

    const projectsMap = useMemo(() => {
      const map = new Map<
        string,
        {
          project: { id: string; name: string };
          tasks: Map<
            string,
            {
              task: { id: string; name: string };
              timesheetMap: Map<string, string>;
            }
          >;
        }
      >();

      timeEntries.forEach(entry => {
        const projectId = entry.project_id;
        const taskId = entry.task_id;
        const date = moment(entry.date).format('YYYY-MM-DD');
        const entryId = entry.id || '';

        if (!map.has(projectId)) {
          map.set(projectId, {
            project: { id: projectId, name: entry.project_name },
            tasks: new Map()
          });
        }

        const projectData = map.get(projectId)!;
        if (!projectData.tasks.has(taskId)) {
          projectData.tasks.set(taskId, {
            task: { id: taskId, name: entry.task_name },
            timesheetMap: new Map()
          });
        }

        projectData.tasks.get(taskId)!.timesheetMap.set(date, entryId);
      });

      return map;
    }, [timeEntries]);

    const handleLeaveSubmit = useCallback(async () => {
      if (!leaveReason.trim()) {
        toast.error('Please enter a leave reason');
        return;
      }

      if (!leaveDate) {
        toast.error('Please select leave date');
        return;
      }

      try {
        setIsLoading(true);

        const leaveData = Array.from(projectsMap.values()).map(
          ({ project, tasks }) => ({
            packageId: project.id,
            tasks: Array.from(tasks.values()).map(({ task, timesheetMap }) => ({
              taskId: task.id,
              timesheet: [
                {
                  id: timesheetMap.get(moment(leaveDate).format('YYYY-MM-DD')),
                  date: moment(leaveDate).format('YYYY-MM-DD'),
                  isVacation: true,
                  leaveReason,
                  hours: 0,
                  comments: 'Leave',
                  isHoliday: false,
                  isWeekOff: false,
                  project_id: project.id,
                  task_id: task.id,
                  project_name: project.name,
                  task_name: task.name,
                  status: 'pending'
                }
              ]
            }))
          })
        );

        await submitTimeSheet(leaveData);
        showSuccessToast('Leave applied successfully');
        await fetchTimesheetData();
        setLeaveReason('');
        setLeaveDate(null);
        closeLeaveModal();
      } catch (error) {
        console.error('Leave submission error:', error);
        toast.error('Failed to submit leave');
      } finally {
        setIsLoading(false);
      }
    }, [
      leaveReason,
      leaveDate,
      projectsMap,
      showSuccessToast,
      fetchTimesheetData,
      closeLeaveModal
    ]);

    const handleDateChange = useCallback(
      (date: DateValue) => setLeaveDate(date),
      []
    );

    const handleReasonChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setLeaveReason(e.currentTarget.value),
      []
    );

    return (
      <StandardModal
        opened={openedLeaveModal}
        onClose={closeLeaveModal}
        title={
          <Group gap="xs">
            <IconCalendarOff size={20} />
            <Text fw={600} size="lg">
              Apply for Leave
            </Text>
          </Group>
        }
        size="lg"
      >
        <Stack gap="md" p={isMobile ? 'sm' : 'md'}>
          <DatePickerInput
            label="Leave Date"
            description="Select the date for your leave"
            placeholder="Select leave date"
            value={leaveDate}
            onChange={handleDateChange}
            minDate={new Date()}
            maxDate={moment().add(3, 'months').toDate()}
            clearable
            required
            size={isMobile ? 'sm' : 'md'}
            leftSection={<IconCalendarOff size={16} />}
          />

          <Textarea
            label="Leave Reason"
            description="Please provide a reason for your leave"
            placeholder="Enter leave reason"
            value={leaveReason}
            onChange={handleReasonChange}
            required
            autosize
            minRows={3}
            maxRows={6}
            size={isMobile ? 'sm' : 'md'}
          />

          <Divider />

          <Group justify="flex-end" gap="xs">
            <Button
              variant="default"
              onClick={closeLeaveModal}
              disabled={isLoading}
              leftSection={<IconX size={16} />}
              size={isMobile ? 'sm' : 'md'}
            >
              Cancel
            </Button>
            <Button
              color="green"
              onClick={handleLeaveSubmit}
              loading={isLoading}
              disabled={!leaveDate || !leaveReason.trim()}
              leftSection={<IconCheck size={16} />}
              size={isMobile ? 'sm' : 'md'}
            >
              Submit Leave
            </Button>
          </Group>
        </Stack>
      </StandardModal>
    );
  }
);

interface ChangeRowProps {
  change: EmployeeTimesheet;
  isMobile?: boolean;
}

const ChangeRow = React.memo(({ change, isMobile = false }: ChangeRowProps) => {
  const formattedDate = useMemo(
    () => moment(change.date).format('ddd, DD MMM'),
    [change.date]
  );

  return (
    <Table.Tr>
      <Table.Td className="p-2 border">
        <Badge
          variant="light"
          color="blue"
          fullWidth
          size={isMobile ? 'sm' : 'md'}
        >
          {formattedDate}
        </Badge>
      </Table.Td>
      {!isMobile && (
        <>
          <Table.Td className="p-2 border">
            <Text fw={500} size="sm" lineClamp={2}>
              {change.project_name}
            </Text>
          </Table.Td>
          <Table.Td className="p-2 border">
            <Text size="sm" lineClamp={2}>
              {change.task_name}
            </Text>
          </Table.Td>
        </>
      )}
      <Table.Td className="p-2 border text-center">
        <Badge variant="filled" color="blue" size="lg">
          {change.hours}h
        </Badge>
      </Table.Td>
      <Table.Td className="p-2 border">
        <Text size="sm" lineClamp={isMobile ? 1 : 2}>
          {change.comments}
        </Text>
      </Table.Td>
    </Table.Tr>
  );
});

export const ConfirmTimesheetSubmitModal = React.memo(
  ({
    openedSubmitModal,
    closeSubmitModal,
    changesMade,
    setChangesMade
  }: {
    openedSubmitModal: boolean;
    closeSubmitModal: () => void;
    changesMade: EmployeeTimesheet[];
    setChangesMade: React.Dispatch<React.SetStateAction<EmployeeTimesheet[]>>;
  }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const { showSuccessToast } = useCustomToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const changesCount = changesMade.length;

    const totalHours = useMemo(() => {
      return changesMade.reduce((sum, change) => sum + change.hours, 0);
    }, [changesMade]);

    const handleSubmit = useCallback(async () => {
      try {
        setIsSubmitting(true);
        const submitData = prepareSubmitData(changesMade);
        await submitTimeSheet(submitData);
        showSuccessToast('Timesheet submitted successfully');
        setChangesMade([]);
        closeSubmitModal();
      } catch {
        toast.error('Failed to submit timesheet');
      } finally {
        setIsSubmitting(false);
      }
    }, [changesMade, showSuccessToast, setChangesMade, closeSubmitModal]);

    const modalTitle = useMemo(
      () => (
        <Group gap="xs">
          <IconCheck size={20} />
          <Text fw={600} size="lg">
            Confirm Timesheet Submission
          </Text>
        </Group>
      ),
      []
    );

    return (
      <StandardModal
        opened={openedSubmitModal}
        onClose={closeSubmitModal}
        title={modalTitle}
        size="xl"
      >
        <Stack gap="md" p={isMobile ? 'sm' : 'md'}>
          {/* Summary Card */}
          <Card withBorder p="md" radius="md">
            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Total Entries:
                </Text>
                <Badge size="lg" variant="light" color="blue">
                  {changesCount} {changesCount === 1 ? 'entry' : 'entries'}
                </Badge>
              </Group>
              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Total Hours:
                </Text>
                <Badge size="lg" variant="filled" color="green">
                  {totalHours}h
                </Badge>
              </Group>
            </Stack>
          </Card>

          <Text size="sm" c="dimmed">
            Please review your time entries before submission. Once submitted,
            they will be sent for approval.
          </Text>

          <Divider />

          {/* Changes Table */}
          <ScrollArea style={{ maxHeight: '50vh' }}>
            <Table
              withTableBorder
              withColumnBorders
              verticalSpacing={isMobile ? 'xs' : 'sm'}
              horizontalSpacing={isMobile ? 'xs' : 'md'}
            >
              <Table.Thead
                style={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 1
                }}
              >
                <Table.Tr>
                  <Table.Th
                    className="p-2 border"
                    style={{ minWidth: '100px' }}
                  >
                    <Text size="sm" fw={500}>
                      Date
                    </Text>
                  </Table.Th>
                  {!isMobile && (
                    <>
                      <Table.Th
                        className="p-2 border"
                        style={{ minWidth: '150px' }}
                      >
                        <Text size="sm" fw={500}>
                          Project
                        </Text>
                      </Table.Th>
                      <Table.Th
                        className="p-2 border"
                        style={{ minWidth: '150px' }}
                      >
                        <Text size="sm" fw={500}>
                          Task
                        </Text>
                      </Table.Th>
                    </>
                  )}
                  <Table.Th
                    className="p-2 border text-center"
                    style={{ width: isMobile ? '80px' : '100px' }}
                  >
                    <Text size="sm" fw={500}>
                      Hours
                    </Text>
                  </Table.Th>
                  <Table.Th
                    className="p-2 border"
                    style={{ minWidth: '180px' }}
                  >
                    <Text size="sm" fw={500}>
                      Comments
                    </Text>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {changesMade.map(change => (
                  <ChangeRow
                    key={`${change.date}-${change.project_id}-${change.task_id}`}
                    change={change}
                    isMobile={isMobile}
                  />
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>

          <Divider />

          {/* Action Buttons */}
          <Group justify="flex-end" gap="xs">
            <Button
              variant="default"
              onClick={closeSubmitModal}
              disabled={isSubmitting}
              leftSection={<IconX size={16} />}
              size={isMobile ? 'sm' : 'md'}
            >
              Cancel
            </Button>
            <Button
              color="green"
              onClick={handleSubmit}
              loading={isSubmitting}
              leftSection={<IconCheck size={16} />}
              size={isMobile ? 'sm' : 'md'}
            >
              Confirm & Submit
            </Button>
          </Group>
        </Stack>
      </StandardModal>
    );
  }
);
