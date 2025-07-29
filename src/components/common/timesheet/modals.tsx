import {
  Box,
  Button,
  Group,
  Textarea,
  TextInput,
  Text,
  Table,
  Badge
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
import { IconCheck, IconX } from '@tabler/icons-react';
import React from 'react';

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
        title="Edit Time Entry"
        size="lg"
      >
        <Box p="sm">
          <Text fw={500} mb="xs">
            Project: {currentEntry.project_name}
          </Text>
          <Text fw={500} mb="xs">
            Task: {currentEntry.task_name}
          </Text>
          <Text fw={500} mb="xs">
            Date: {formattedDate}
          </Text>

          <TextInput
            label="Hours"
            type="number"
            min={0}
            max={24}
            value={currentEntry.hours.toString()}
            onChange={handleHoursChange}
            mb="sm"
          />

          <Textarea
            label="Comments"
            placeholder="Enter comments (required)"
            value={currentEntry.comments}
            onChange={handleCommentsChange}
            autosize
            minRows={3}
            mb="sm"
            required
          />

          <Group justify="flex-end">
            <Button variant="outline" onClick={closeEntryModal}>
              Cancel
            </Button>
            <Button color="blue" onClick={handleEntrySubmit}>
              Save
            </Button>
          </Group>
        </Box>
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
        title="Apply for Leave"
        size="lg"
      >
        <Box p="sm">
          <DatePickerInput
            label="Leave Date"
            placeholder="Select leave period"
            value={leaveDate}
            onChange={handleDateChange}
            mb="sm"
            minDate={new Date()}
            maxDate={moment().add(3, 'months').toDate()}
            clearable
            required
          />
          <Textarea
            label="Reason"
            placeholder="Enter leave reason"
            value={leaveReason}
            onChange={handleReasonChange}
            mb="sm"
            required
            autosize
            minRows={3}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={closeLeaveModal}>
              Cancel
            </Button>
            <Button
              color="green"
              onClick={handleLeaveSubmit}
              loading={isLoading}
            >
              Submit
            </Button>
          </Group>
        </Box>
      </StandardModal>
    );
  }
);

interface ChangeRowProps {
  change: EmployeeTimesheet;
}

const ChangeRow = React.memo(({ change }: ChangeRowProps) => {
  const formattedDate = useMemo(
    () => moment(change.date).format('ddd, DD MMM'),
    [change.date]
  );

  return (
    <tr className="m-2 p-2">
      <td className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis">
        <Badge variant="light" color="blue" fullWidth>
          {formattedDate}
        </Badge>
      </td>
      <td className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis">
        <Text fw={500} lineClamp={2}>
          {change.project_name}
        </Text>
      </td>
      <td className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis">
        <Text lineClamp={2}>{change.task_name}</Text>
      </td>
      <td
        className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
        style={{ textAlign: 'center' }}
      >
        <Text fw={600}>{change.hours}</Text>
      </td>
      <td className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis">
        <Text lineClamp={2} style={{ flex: 1 }}>
          {change.comments}
        </Text>
      </td>
    </tr>
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
    const { showSuccessToast } = useCustomToast();
    const changesCount = changesMade.length;

    const handleSubmit = useCallback(async () => {
      try {
        const submitData = prepareSubmitData(changesMade);
        await submitTimeSheet(submitData);
        showSuccessToast('Timesheet submitted successfully');
        setChangesMade([]);
        closeSubmitModal();
      } catch {
        toast.error('Failed to submit timesheet');
      }
    }, [changesMade, showSuccessToast, setChangesMade, closeSubmitModal]);

    const modalTitle = useMemo(
      () => (
        <Text fw={600} size="lg">
          Confirm Timesheet Submission
        </Text>
      ),
      []
    );

    return (
      <StandardModal
        opened={openedSubmitModal}
        onClose={closeSubmitModal}
        title={modalTitle}
        size="xl"
        radius="md"
        padding="lg"
      >
        <Box p="sm">
          <Text mb="lg" c="dimmed">
            Please review your changes before submission. You're about to update{' '}
            {changesCount} time entries.
          </Text>

          <Box style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <Table
              striped
              highlightOnHover
              verticalSpacing="sm"
              horizontalSpacing="md"
              withColumnBorders
            >
              <thead
                style={{
                  position: 'sticky',
                  top: 0,
                  background: 'white',
                  zIndex: 1
                }}
              >
                <tr>
                  <th style={{ minWidth: '120px' }}>Date</th>
                  <th style={{ minWidth: '180px' }}>Project</th>
                  <th style={{ minWidth: '180px' }}>Task</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>Hours</th>
                  <th style={{ minWidth: '200px' }}>Comments</th>
                </tr>
              </thead>
              <tbody>
                {changesMade.map(change => (
                  <ChangeRow
                    key={`${change.date}-${change.project_id}-${change.task_id}`}
                    change={change}
                  />
                ))}
              </tbody>
            </Table>
          </Box>

          <Group justify="space-between" mt="xl">
            <Text size="sm" c="dimmed">
              Total changes:{' '}
              <Badge color="blue" variant="light">
                {changesCount}
              </Badge>
            </Text>
            <Group>
              <Button
                variant="outline"
                onClick={closeSubmitModal}
                radius="md"
                leftSection={<IconX size={16} />}
              >
                Cancel
              </Button>
              <Button
                color="green"
                onClick={handleSubmit}
                radius="md"
                leftSection={<IconCheck size={16} />}
              >
                Confirm Submission
              </Button>
            </Group>
          </Group>
        </Box>
      </StandardModal>
    );
  }
);
