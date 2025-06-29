import {
  Box,
  Button,
  Group,
  Textarea,
  TextInput,
  Text,
  Table,
  Badge,
} from '@mantine/core';
import { StandardModal } from '../../UI/Models/base-model';
import moment from 'moment';
import { EmployeeTimesheet } from '../../../interfaces/timesheet';
import { useState } from 'react';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';
import { toast } from 'react-toastify';
import { getDateRangeArray, prepareSubmitData } from './helper';
import { submitTimeSheet } from '../../../services/common-services';
import { useCustomToast } from '../../../utils/common/toast';
import { IconCheck, IconX } from '@tabler/icons-react';

export const EditTimeEntryModal = ({
  openedEntryModal,
  closeEntryModal,
  currentEntry,
  setCurrentEntry,
  handleEntrySubmit,
}: {
  openedEntryModal: boolean;
  closeEntryModal: () => void;
  currentEntry: EmployeeTimesheet;
  setCurrentEntry: React.Dispatch<
    React.SetStateAction<EmployeeTimesheet | undefined>
  >;
  handleEntrySubmit: () => void;
}) => {
  return (
    <StandardModal
      opened={openedEntryModal}
      onClose={closeEntryModal}
      title="Edit Time Entry"
      size="sm"
    >
      <Box p="sm">
        <Text fw={500} mb="xs">
          Project: {currentEntry.project_name}
        </Text>
        <Text fw={500} mb="xs">
          Task: {currentEntry.task_name}
        </Text>
        <Text fw={500} mb="xs">
          Date:{' '}
          {currentEntry && moment(currentEntry.date).format('DD MMM YYYY')}
        </Text>

        <TextInput
          label="Hours"
          type="number"
          min={0}
          max={24}
          value={currentEntry.hours.toString()}
          onChange={e => {
            const rawValue = e.currentTarget.value;
            if (rawValue === '') {
              setCurrentEntry(prev => ({
                ...prev,
                ...currentEntry,
                hours: 0,
              }));
              return;
            }

            const numericValue = parseFloat(rawValue);
            if (!isNaN(numericValue)) {
              const clampedValue = Math.min(24, Math.max(0, numericValue));
              setCurrentEntry(prev => ({
                ...prev,
                ...currentEntry,
                hours: clampedValue,
              }));
            }
          }}
          mb="sm"
        />

        <Textarea
          label="Comments"
          placeholder="Enter comments (required)"
          value={currentEntry.comments}
          onChange={e => {
            setCurrentEntry(prev => ({
              ...prev,
              ...currentEntry,
              comments: e.target.value,
            }));
          }}
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
};

export const ApplyLeaveTimesheetModal = ({
  openedLeaveModal,
  closeLeaveModal,
  timeEntries,
  fetchTimesheetData,
}: {
  openedLeaveModal: boolean;
  closeLeaveModal: () => void;
  timeEntries: EmployeeTimesheet[];
  fetchTimesheetData: () => Promise<void>;
}) => {
  const [leaveReason, setLeaveReason] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [leaveDates, setLeaveDates] = useState<DatesRangeValue>([null, null]);
  const { showSuccessToast } = useCustomToast();

  const handleLeaveSubmit = async () => {
    if (!leaveReason.trim()) {
      toast.error('Please enter a leave reason');
      return;
    }

    if (!leaveDates[0] || !leaveDates[1]) {
      toast.error('Please select leave dates');
      return;
    }

    const dateRangeArray = getDateRangeArray(leaveDates[0], leaveDates[1]);
    if (dateRangeArray.length === 0) {
      toast.error('Invalid date range');
      return;
    }

    const projectsMap = new Map<
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

      if (!projectsMap.has(projectId)) {
        projectsMap.set(projectId, {
          project: {
            id: projectId,
            name: entry.project_name,
          },
          tasks: new Map(),
        });
      }

      const projectData = projectsMap.get(projectId)!;

      if (!projectData.tasks.has(taskId)) {
        projectData.tasks.set(taskId, {
          task: {
            id: taskId,
            name: entry.task_name,
          },
          timesheetMap: new Map(),
        });
      }

      const taskData = projectData.tasks.get(taskId)!;
      taskData.timesheetMap.set(date, entryId);
    });

    // Build leave data
    const leaveData = Array.from(projectsMap.values()).map(
      ({ project, tasks }) => ({
        packageId: project.id,
        tasks: Array.from(tasks.values()).map(({ task, timesheetMap }) => ({
          taskId: task.id,
          timesheet: dateRangeArray.map(date => {
            const formattedDate = moment(date).format('YYYY-MM-DD');
            if (!formattedDate) {
              toast.error("Can't apply leave before timesheet is created");
              return;
            }
            return {
              id: timesheetMap.get(formattedDate),
              date: moment(date).add(1, 'day').toDate(),
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
              status: 'pending',
            };
          }),
        })),
      })
    );

    try {
      setIsLoading(true);
      await submitTimeSheet(leaveData);
      showSuccessToast('Leave applied successfully');
      fetchTimesheetData();
      closeLeaveModal();
      setLeaveReason('');
      setLeaveDates([null, null]);
    } catch (error) {
      console.error('Leave submission error:', error);
      toast.error('Failed to submit leave');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StandardModal
      opened={openedLeaveModal}
      onClose={closeLeaveModal}
      title="Apply for Leave"
      size="md"
    >
      <Box p="sm">
        <Textarea
          label="Reason"
          placeholder="Enter leave reason"
          value={leaveReason}
          onChange={e => setLeaveReason(e.currentTarget.value)}
          mb="sm"
          required
          autosize
          minRows={3}
        />

        <DatePickerInput
          type="range"
          label="Leave Dates"
          placeholder="Select leave period"
          value={leaveDates}
          onChange={setLeaveDates}
          mb="sm"
          minDate={new Date()}
          maxDate={moment().add(3, 'months').toDate()}
          allowSingleDateInRange
          clearable
          required
        />

        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={closeLeaveModal}>
            Cancel
          </Button>
          <Button color="green" onClick={handleLeaveSubmit} loading={isLoading}>
            Submit Leave
          </Button>
        </Group>
      </Box>
    </StandardModal>
  );
};

export const ConfirmTimesheetSubmitModal = ({
  openedSubmitModal,
  closeSubmitModal,
  changesMade,
  setChangesMade,
}: {
  openedSubmitModal: boolean;
  closeSubmitModal: () => void;
  changesMade: EmployeeTimesheet[];
  setChangesMade: (value: React.SetStateAction<EmployeeTimesheet[]>) => void;
}) => {
  const { showSuccessToast } = useCustomToast();

  const handleSubmit = async () => {
    try {
      const submitData = prepareSubmitData(changesMade);
      submitTimeSheet(submitData);
      showSuccessToast('Timesheet submitted successfully');
      setChangesMade([]);
      closeSubmitModal();
    } catch {
      toast.error('Failed to submit timesheet');
    }
  };
  return (
    <StandardModal
      opened={openedSubmitModal}
      onClose={closeSubmitModal}
      title={
        <Text fw={600} size="lg">
          Confirm Timesheet Submission
        </Text>
      }
      size="xl"
      radius="md"
      padding="lg"
    >
      <Box p="sm">
        <Text mb="lg" c="dimmed">
          Please review your changes before submission. You're about to update{' '}
          {changesMade.length} time entries.
        </Text>

        <Box>
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
              }}
            >
              <tr>
                <th
                  className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ minWidth: '120px' }}
                >
                  Date
                </th>
                <th
                  className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ minWidth: '180px' }}
                >
                  Project
                </th>
                <th
                  className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ minWidth: '180px' }}
                >
                  Task
                </th>
                <th
                  className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ width: '80px', textAlign: 'center' }}
                >
                  Hours
                </th>
                <th
                  className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ minWidth: '200px' }}
                >
                  Comments
                </th>
              </tr>
            </thead>
            <tbody>
              {changesMade.map((change, index) => {
                return (
                  <tr key={index} className="m-2 p-2">
                    <td className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis">
                      <Badge variant="light" color="blue" fullWidth>
                        {moment(change.date).format('ddd, DD MMM')}
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
              })}
            </tbody>
          </Table>
        </Box>

        <Group justify="space-between" mt="xl">
          <Text size="sm" c="dimmed">
            Total changes:{' '}
            <Badge color="blue" variant="light">
              {changesMade.length}
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
};
