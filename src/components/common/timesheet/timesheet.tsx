import { useCallback, useEffect, useState } from 'react';
import { Button, TextInput, Title, Table, Grid } from '@mantine/core';
import moment from 'moment';
import 'moment-timezone';
import { toast } from 'react-toastify';
import { data } from './resources';
import { TaskPopover } from './task-popover';
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
  IconSearch,
} from '@tabler/icons-react';
import { useModals } from '@mantine/modals';
import { ColorDiv } from '../style-components/c-div';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';

const DateTableComponent = () => {
  const modals = useModals();
  const [startDate, setStartDate] = useState<string>(
    moment().tz('Asia/Kolkata').format('YYYY-MM-DD')
  );
  const [endDate, setEndDate] = useState<string>(
    moment().tz('Asia/Kolkata').add(6, 'days').format('YYYY-MM-DD')
  );
  const [dateRange, setDateRange] = useState<string[]>([]);
  const [daysInRange, setDaysInRange] = useState<number>(0);
  const [timeEntries, setTimeEntries] = useState(data);
  const [edit, setIsEdit] = useState(false);
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  const getDateRange = (start: string, end: string): string[] => {
    const startDt = new Date(start);
    const endDt = new Date(end);
    const dates: string[] = [];
    while (startDt <= endDt) {
      dates.push(new Date(startDt).toISOString().split('T')[0]);
      startDt.setDate(startDt.getDate() + 1);
    }
    return dates;
  };

  const handleSearch = useCallback(() => {
    if (startDate && endDate) {
      if (new Date(startDate) > new Date(endDate)) {
        toast.error('Start date must be before end date.');
        return;
      }
      const range = getDateRange(startDate, endDate);
      setDateRange(range);
      setDaysInRange(range.length);
    }
  }, [endDate, startDate]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const extendRange = (direction: 'forward' | 'backward'): void => {
    if (!startDate || !endDate) return;

    const startDt = new Date(startDate);
    const endDt = new Date(endDate);
    const rangeExtension = daysInRange;

    if (direction === 'backward') {
      const newStart = new Date(
        startDt.setDate(startDt.getDate() - rangeExtension)
      );

      const newEnd = new Date(endDt.setDate(endDt.getDate() - rangeExtension));

      setStartDate(newStart.toISOString().split('T')[0]);
      setEndDate(newEnd.toISOString().split('T')[0]);
      const newRange = getDateRange(
        newStart.toISOString().split('T')[0],
        newEnd.toISOString().split('T')[0]
      );
      setDateRange(newRange);
    } else {
      const newStart = new Date(
        startDt.setDate(startDt.getDate() + rangeExtension)
      );

      const newEnd = new Date(endDt.setDate(endDt.getDate() + rangeExtension));
      setStartDate(newStart.toISOString().split('T')[0]);
      setEndDate(newEnd.toISOString().split('T')[0]);
      const newRange = getDateRange(
        newStart.toISOString().split('T')[0],
        newEnd.toISOString().split('T')[0]
      );
      setDateRange(newRange);
    }
  };

  const getProjectTotalHours = (projectId: string) => {
    return timeEntries
      .filter(entry => entry.project_id === projectId)
      .reduce((total, entry) => {
        if (
          dateRange.includes(
            moment(entry.date, 'DD-MM-YYYY').format('YYYY-MM-DD')
          )
        ) {
          return total + (entry.hours || 0);
        }
        return total;
      }, 0);
  };

  const handleChange = (
    newHours: number,
    projectId: string,
    taskId: string,
    date: string,
    projectName: string,
    taskName: string
  ) => {
    setTimeEntries(prev => {
      const formattedDate = moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY');

      // Find if entry exists for this project, task, and date
      const existingEntryIndex = prev.findIndex(
        entry =>
          entry.project_id === projectId &&
          entry.task_id === taskId &&
          entry.date === formattedDate
      );

      if (existingEntryIndex >= 0) {
        // Update existing entry
        const updated = [...prev];
        updated[existingEntryIndex] = {
          ...updated[existingEntryIndex],
          hours: newHours,
        };
        return updated;
      } else {
        // Add new entry
        return [
          ...prev,
          {
            date: formattedDate,
            isLeave: false,
            isHoliday: false,
            isWeekOff: false,
            project_id: projectId,
            task_id: taskId,
            hours: newHours,
            project_name: projectName,
            task_name: taskName,
          },
        ];
      }
    });
  };

  const AddTask = (projectId: string) => {
    const id = modals.openModal({
      title: 'Add New Task',
      children: (
        <TextInput
          placeholder="Enter task name"
          onKeyDown={e => {
            if (e.key === 'Enter' && e.currentTarget.value) {
              const newTaskName = e.currentTarget.value;

              if (dateRange.length > 0) {
                setTimeEntries(prev => [
                  ...prev,
                  {
                    date: moment(dateRange[0]).format('DD-MM-YYYY'),
                    isLeave: false,
                    isHoliday: false,
                    isWeekOff: false,
                    project_id: projectId,
                    task_id: newTaskName,
                    hours: 0,
                    project_name: '',
                    task_name: '',
                  },
                ]);
              }
              modals.closeModal(id);
            }
          }}
        />
      ),
    });
  };

  const ApplyForLeave = () => {
    const handleApply = (id: string) => {
      modals.closeModal(id);
    };
    const id = modals.openModal({
      title: 'Apply for leave',
      children: (
        <div className="flex flex-col gap-5">
          <TextInput placeholder="Reason" />
          <TextInput type="date" placeholder="Date" />
          <Button onClick={() => handleApply(id)}>Apply</Button>
        </div>
      ),
    });
  };

  const isDateWeekOffOrLeaveOrHoliday = (date: string) => {
    const formattedDate = moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY');
    if (
      timeEntries.some(entry => entry.date === formattedDate && entry.isWeekOff)
    ) {
      return 'Week Off';
    }
    if (
      timeEntries.some(entry => entry.date === formattedDate && entry.isLeave)
    ) {
      return 'Leave';
    }
    if (
      timeEntries.some(entry => entry.date === formattedDate && entry.isHoliday)
    ) {
      return 'Holiday';
    }
    return '';
  };

  const isPastDate = (inputDate: Date) => {
    const today = new Date();
    const givenDate = new Date(inputDate);

    today.setHours(0, 0, 0, 0);
    givenDate.setHours(0, 0, 0, 0);

    return givenDate < today;
  };

  // Get unique projects from timeEntries
  const uniqueProjects = Array.from(
    new Set(
      timeEntries.map(entry => {
        if (entry.project_id && entry.project_id !== '') {
          return entry.project_id;
        }
      })
    )
  ).filter(Boolean);

  // Get tasks grouped by project
  const getTasksByProject = (projectId: string) => {
    return Array.from(
      new Set(
        timeEntries
          .filter(entry => entry.project_id === projectId)
          .map(entry => entry.task_id)
      )
    );
  };

  return (
    <ColorDiv className="w-100 p-5">
      <Title
        order={2}
        className="text-xl sm:text-2xl md:text-3xl font-extrabold underline text-center px-2 py-4"
      >
        Timesheet
      </Title>

      <Grid
        align="center"
        gutter="md"
        className="mb-6 p-4 hover:shadow-lg rounded-md shadow-sm"
      >
        <Grid.Col span="auto">
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-between sm:justify-start">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                color="blue"
                radius="xl"
                size="sm"
                onClick={() => extendRange('backward')}
                className="px-2 py-1 w-12 sm:w-auto"
              >
                <IconChevronLeft size={18} />
              </Button>

              <TextInput
                type="date"
                value={startDate}
                onChange={e => {
                  setStartDate(e.target.value);
                }}
                size="sm"
                radius="md"
                styles={{ input: { minWidth: 150 } }}
                className="w-full sm:w-auto"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <TextInput
                type="date"
                value={endDate}
                min={startDate}
                onChange={e => {
                  setEndDate(e.target.value);
                }}
                size="sm"
                radius="md"
                styles={{ input: { minWidth: 150 } }}
                className="w-full sm:w-auto"
              />

              <Button
                variant="outline"
                color="blue"
                radius="xl"
                size="sm"
                onClick={() => extendRange('forward')}
                className="px-2 py-1 w-12 sm:w-auto"
              >
                <IconChevronRight size={18} />
              </Button>
            </div>
          </div>
        </Grid.Col>

        <Grid.Col
          span="content"
          className="flex justify-between sm:justify-end gap-3 mt-4 sm:mt-0 w-full sm:w-auto"
        >
          <Button
            onClick={handleSearch}
            variant="outline"
            color="gray"
            radius="md"
            size="sm"
            className="px-3 w-12 sm:w-auto"
          >
            <IconSearch size={16} />
          </Button>
          <Button
            onClick={ApplyForLeave}
            color="green"
            radius="md"
            size="sm"
            className="px-5 w-full sm:w-auto"
          >
            Apply For Leave
          </Button>
        </Grid.Col>
      </Grid>

      {dateRange.length > 0 && (
        <div style={{ overflowX: 'auto', padding: '0 1rem' }}>
          <Table
            striped
            highlightOnHover
            className="w-full text-center shadow-md border "
          >
            <thead
              className="text-xs"
              style={{
                backgroundColor:
                  organizationConfig.organization_theme.theme.backgroundColor,
                color: organizationConfig.organization_theme.theme.color,
              }}
            >
              <tr>
                <th className="p-2 border ">Project Name</th>
                <th className="p-2 border ">Task Details</th>
                {dateRange.map(date => {
                  return (
                    <th className="p-2 border " key={date}>
                      {moment(date).format('DD MMM')}
                      <br />
                      {moment(date).format('ddd')}
                    </th>
                  );
                })}

                <th className="p-2 border ">Total Hours</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {uniqueProjects.map(projectId => {
                const tasks = getTasksByProject(projectId || '');

                return tasks.map((taskId, taskIndex) => {
                  return (
                    <tr key={`${projectId}-${taskId}`}>
                      {taskIndex === 0 && (
                        <td
                          style={{
                            border: `1px solid ${organizationConfig.organization_theme.theme.button.textColor}`,
                          }}
                          className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis"
                          rowSpan={tasks.length}
                        >
                          <div className="flex flex-col items-center justify-center gap-2 min-h-[60px]">
                            <p>{projectId}</p>
                            <p
                              style={{ cursor: 'pointer' }}
                              className="rounded-full"
                              onClick={() => AddTask(projectId || '')}
                            >
                              <Button className="rounded-full">
                                <IconPlus />
                              </Button>
                            </p>
                          </div>
                        </td>
                      )}
                      <td
                        style={{
                          padding: '0.25rem',
                          border: `1px solid ${organizationConfig.organization_theme.theme.button.textColor}`,
                        }}
                      >
                        <div className="w-full flex justify-center">
                          <TaskPopover task={taskId} />
                        </div>
                      </td>
                      {dateRange.map(date => {
                        const formattedDate = moment(date, 'YYYY-MM-DD').format(
                          'DD-MM-YYYY'
                        );
                        const entry = timeEntries.find(
                          e =>
                            e.project_id === projectId &&
                            e.task_id === taskId &&
                            e.date === formattedDate
                        );
                        const hours = entry ? entry.hours : '';
                        const isWeekOffOrLeaveOrHoliday =
                          isDateWeekOffOrLeaveOrHoliday(date);
                        if (isWeekOffOrLeaveOrHoliday) {
                          return (
                            <td
                              key={`${projectId}-${taskId}-${date}`}
                              style={{
                                width: '80px',
                                minWidth: '80px',
                                textAlign: 'center',

                                backgroundColor:
                                  organizationConfig.organization_theme.theme
                                    .colors.primary[1],
                              }}
                            >
                              {taskIndex === 0 && (
                                <div
                                  style={{
                                    writingMode: 'vertical-rl',
                                    textOrientation: 'mixed',
                                    transform: 'rotate(180deg)',
                                    textAlign: 'center',
                                    fontSize: '12px',
                                    padding: ' 2rem',
                                    height: `${tasks.length * 40}px`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color:
                                      organizationConfig.organization_theme
                                        .theme.button.textColor,
                                    position: 'absolute',
                                    marginTop: `-${taskIndex * 40}px`,
                                  }}
                                >
                                  {isWeekOffOrLeaveOrHoliday}
                                </div>
                              )}
                            </td>
                          );
                        }

                        return (
                          <td
                            key={`${projectId}-${taskId}-${date}`}
                            style={{
                              width: '80px',
                              minWidth: '80px',
                              textAlign: 'center',
                              border: `1px solid ${organizationConfig.organization_theme.theme.button.textColor}`,
                            }}
                          >
                            {edit ? (
                              <TextInput
                                placeholder="0"
                                disabled={isPastDate(new Date(date))}
                                value={hours !== undefined ? hours : ''}
                                onChange={e =>
                                  handleChange(
                                    parseFloat(e.target.value || '0'),
                                    projectId || '',
                                    taskId,
                                    date,
                                    entry?.project_name || '',
                                    entry?.task_name || ''
                                  )
                                }
                                styles={{
                                  input: {
                                    textAlign: 'center',
                                    fontSize: '12px',
                                    padding: '0.2rem 0.4rem',
                                    height: '28px',
                                  },
                                }}
                              />
                            ) : (
                              <div
                                onDoubleClick={() => setIsEdit(!edit)}
                                style={{
                                  textAlign: 'center',
                                  fontSize: '12px',
                                  padding: '0.2rem 0.4rem',
                                  height: '28px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color:
                                    organizationConfig.organization_theme.theme
                                      .backgroundColor,
                                }}
                              >
                                {hours ? hours : '0'}
                              </div>
                            )}
                          </td>
                        );
                      })}
                      {taskIndex === 0 && (
                        <td
                          rowSpan={tasks.length}
                          style={{
                            textAlign: 'center',
                            border: `1px solid ${organizationConfig.organization_theme.theme.button.textColor}`,
                          }}
                        >
                          {getProjectTotalHours(projectId || '')}
                        </td>
                      )}
                    </tr>
                  );
                });
              })}
            </tbody>
          </Table>
        </div>
      )}
      <div className="flex justify-end mt-6 ml-6">
        <Button onClick={() => setIsEdit(!edit)}>
          {edit ? 'Save' : 'Edit'}
        </Button>
      </div>
    </ColorDiv>
  );
};

export default DateTableComponent;
