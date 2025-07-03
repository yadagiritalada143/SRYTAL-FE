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
import { DatePickerInput, DateValue } from '@mantine/dates';
import { toast } from 'react-toastify';
import { prepareSubmitData } from './helper';
import { submitTimeSheet } from '../../../services/common-services';
import { useCustomToast } from '../../../utils/common/toast';
import { IconCheck, IconX } from '@tabler/icons-react';
import { OrganizationConfig } from '../../../interfaces/organization';

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
  const [leaveDate, setLeaveDate] = useState<DateValue>();
  const { showSuccessToast } = useCustomToast();

  const handleLeaveSubmit = async () => {
    if (!leaveReason.trim()) {
      toast.error('Please enter a leave reason');
      return;
    }

    if (!leaveDate) {
      toast.error('Please select leave date');
      return;
    }

    const dateRangeArray = [leaveDate];

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
              date: moment(date).format('YYYY-MM-DD'),
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
      setLeaveDate(null);
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
      size="lg"
    >
      <Box p="sm">
        <DatePickerInput
          label="Leave Date"
          placeholder="Select leave period"
          value={leaveDate}
          onChange={date => setLeaveDate(date)}
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
          onChange={e => setLeaveReason(e.currentTarget.value)}
          mb="sm"
          required
          autosize
          minRows={3}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={closeLeaveModal}>
            Cancel
          </Button>
          <Button color="green" onClick={handleLeaveSubmit} loading={isLoading}>
            Submit
          </Button>
        </Group>
      </Box>
    </StandardModal>
  );
};

export const ConfirmTimesheetSubmitModal = ({
  changesMade,
  setChangesMade,
  organizationConfig,
  setTimeEntries,
  originalEntries,
}: {
  changesMade: EmployeeTimesheet[];
  setChangesMade: (value: React.SetStateAction<EmployeeTimesheet[]>) => void;
  organizationConfig: OrganizationConfig;
  setTimeEntries: React.Dispatch<React.SetStateAction<EmployeeTimesheet[]>>;
  originalEntries: EmployeeTimesheet[];
}) => {
  const { showSuccessToast } = useCustomToast();
  const handleSubmit = async () => {
    try {
      const submitData = prepareSubmitData(changesMade);
      submitTimeSheet(submitData);
      showSuccessToast('Timesheet submitted successfully');
      setChangesMade([]);
    } catch {
      toast.error('Failed to submit timesheet');
    }
  };

  return (
    <>
      <Box p="sm" m="md">
        <Text mb="lg" ta="center">
          Please review your changes before submission. You're about to update{' '}
          {changesMade.length} time{' '}
          {changesMade.length < 2 ? 'entry ' : 'entries'}
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
              className="text-xs"
              style={{
                position: 'sticky',
                backgroundColor:
                  organizationConfig.organization_theme.theme.backgroundColor,
                color: organizationConfig.organization_theme.theme.color,
              }}
            >
              <tr
                style={{
                  backgroundColor:
                    organizationConfig.organization_theme.theme.backgroundColor,
                  color: organizationConfig.organization_theme.theme.color,
                }}
              >
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
          <Text size="sm">
            Total changes:{' '}
            <Badge color="blue" variant="light">
              {changesMade.length}
            </Badge>
          </Text>
          <Group>
            <Button
              variant="outline"
              radius="md"
              onClick={() => {
                setChangesMade([]);
                setTimeEntries(originalEntries);
              }}
              leftSection={<IconX size={16} />}
            >
              Clear
            </Button>
            <Button
              color="green"
              onClick={handleSubmit}
              radius="md"
              leftSection={<IconCheck size={16} />}
            >
              Submit
            </Button>
          </Group>
        </Group>
      </Box>
    </>
  );
};
