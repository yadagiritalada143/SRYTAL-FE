import { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  Title,
  Table,
  Grid,
  Group,
  ActionIcon,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import moment from "moment";
import "moment-timezone";
import { toast } from "react-toastify";
import { data } from "./resources";
import { TaskPopover } from "./task-popover";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import { useModals } from "@mantine/modals";
import { ColorDiv } from "../style-components/c-div";
import { useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../../atoms/organization-atom";
import { DatePickerInput } from "@mantine/dates";

const DateTableComponent = () => {
  const modals = useModals();
  const [dateRangeValue, setDateRangeValue] = useState<
    [Date | null, Date | null]
  >([new Date(), moment().add(6, "days").toDate()]);
  const [displayedDateRange, setDisplayedDateRange] = useState<string[]>([]);
  const [workingHours, setWorkingHours] = useState(data);
  const [edit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  const getDateRange = (start: Date | null, end: Date | null): string[] => {
    if (!start || !end) return [];
    const startDt = new Date(start);
    const endDt = new Date(end);
    const dates: string[] = [];
    while (startDt <= endDt) {
      dates.push(new Date(startDt).toISOString().split("T")[0]);
      startDt.setDate(startDt.getDate() + 1);
    }
    return dates;
  };

  useEffect(() => {
    const initialRange = getDateRange(dateRangeValue[0], dateRangeValue[1]);
    setDisplayedDateRange(initialRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async () => {
    const [start, end] = dateRangeValue;
    if (!start || !end) {
      toast.error("Please select both start and end dates.");
      return;
    }
    if (start > end) {
      toast.error("Start date must be before end date.");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call (replace with your actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const range = getDateRange(start, end);
      setDisplayedDateRange(range);
      toast.success("Timesheet loaded successfully");
    } catch (error) {
      toast.error("Failed to load timesheet");
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const extendRange = (direction: "forward" | "backward"): void => {
    const [currentStart, currentEnd] = dateRangeValue;
    if (!currentStart || !currentEnd) return;

    const rangeExtension = 7; // Always extend by 7 days
    const newStart = new Date(currentStart);
    const newEnd = new Date(currentEnd);

    if (direction === "backward") {
      newStart.setDate(newStart.getDate() - rangeExtension);
      newEnd.setDate(newEnd.getDate() - rangeExtension);
    } else {
      newStart.setDate(newStart.getDate() + rangeExtension);
      newEnd.setDate(newEnd.getDate() + rangeExtension);
    }

    setDateRangeValue([newStart, newEnd]);
  };

  const getProjectTotalHours = (projectIndex: number) => {
    return displayedDateRange.reduce((total, date) => {
      const hoursForDate = workingHours[projectIndex].activities.reduce(
        (taskTotal, task) => {
          const matchedDate = task.days.find(
            (taskDate) =>
              taskDate.date === moment(date, "YYYY-MM-DD").format("DD-MM-YYYY")
          );
          return taskTotal + (matchedDate ? matchedDate.hours : 0);
        },
        0
      );
      return total + hoursForDate;
    }, 0);
  };

  const handleChange = (
    newHours: number,
    projectIndex: number,
    taskIndex: number,
    date: string
  ) => {
    if (newHours) {
      setWorkingHours((prev) => {
        const updatedWorkingHours = prev.map((project, pIndex) => {
          if (pIndex === projectIndex) {
            return {
              ...project,
              activities: project.activities.map((task, tIndex) => {
                if (tIndex === taskIndex) {
                  const dateExists = task.days.some(
                    (day) =>
                      day.date ===
                      moment(date, "YYYY-MM-DD").format("DD-MM-YYYY")
                  );

                  const updatedDays = dateExists
                    ? task.days.map((day) =>
                        day.date ===
                        moment(date, "YYYY-MM-DD").format("DD-MM-YYYY")
                          ? { ...day, hours: newHours }
                          : day
                      )
                    : [
                        ...task.days,
                        {
                          date: moment(date, "YYYY-MM-DD").format("DD-MM-YYYY"),
                          hours: newHours,
                        },
                      ];

                  return {
                    ...task,
                    days: updatedDays,
                  };
                }
                return task;
              }),
            };
          }
          return project;
        });

        return updatedWorkingHours;
      });
    }
  };

  // const AddTask = (projectIndex: number) => {
  //   const id = modals.openModal({
  //     title: "Add New Task",
  //     children: (
  //       <TextInput
  //         placeholder="Enter task name"
  //         onKeyDown={(e) => {
  //           if (e.key === "Enter" && e.currentTarget.value) {
  //             const newTaskName = e.currentTarget.value;
  //             setWorkingHours((prev) => {
  //               const updatedHours = [...prev];
  //               updatedHours[projectIndex].activities.push({
  //                 task_id: newTaskName,
  //                 days: [],
  //               });
  //               return updatedHours;
  //             });
  //             modals.closeModal(id);
  //           }
  //         }}
  //       />
  //     ),
  //   });
  // };

  const ApplyForLeave = () => {
    const handleApply = (id: string) => {
      modals.closeModal(id);
    };
    const id = modals.openModal({
      title: "Apply for leave",
      children: (
        <div className="flex flex-col gap-5">
          <TextInput placeholder="Reason" />
          <TextInput type="date" placeholder="Date" />
          <Button onClick={() => handleApply(id)}>Apply</Button>
        </div>
      ),
    });
  };

  const isPastDate = (inputDate: Date) => {
    const today = new Date();
    const givenDate = new Date(inputDate);

    today.setHours(0, 0, 0, 0);
    givenDate.setHours(0, 0, 0, 0);

    return givenDate < today;
  };

  return (
    <ColorDiv className="w-100 p-5">
      <LoadingOverlay visible={isLoading} loaderProps={{ size: "lg" }} />

      <Title
        order={2}
        className="mb-4 text-center font-extrabold underline text-3xl"
      >
        Timesheet
      </Title>

      <Grid
        align="center"
        gutter="md"
        className="mb-6 p-4 hover:shadow-lg rounded-md shadow-sm"
      >
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Group wrap="nowrap">
            <DatePickerInput
              type="range"
              value={dateRangeValue}
              onChange={(value) => {
                if (value[0] && !value[1]) {
                  const endDate = new Date(value[0]);
                  endDate.setDate(endDate.getDate() + 10);
                  setDateRangeValue([value[0], endDate]);
                } else {
                  setDateRangeValue(value);
                }
              }}
              allowSingleDateInRange
              mx="auto"
              maw={400}
              w="100%"
              size="md"
              placeholder="Select date range"
              firstDayOfWeek={0}
              styles={{
                input: {
                  borderColor:
                    organizationConfig.organization_theme.theme.color,
                  "&:hover": {
                    borderColor:
                      organizationConfig.organization_theme.theme.button.color,
                  },
                },
                day: {
                  "&[data-weekend]": {
                    color: organizationConfig.organization_theme.theme.color,
                  },
                  "&[data-outside]": {
                    color: `${organizationConfig.organization_theme.theme.color}80`,
                  },
                  "&[data-selected]": {
                    backgroundColor:
                      organizationConfig.organization_theme.theme
                        .backgroundColor,
                    color: organizationConfig.organization_theme.theme.color,
                  },
                },
                calendarHeaderControl: {
                  color: organizationConfig.organization_theme.theme.color,
                  "&:hover": {
                    backgroundColor: `${organizationConfig.organization_theme.theme.backgroundColor}20`,
                  },
                },
                calendarHeaderLevel: {
                  color: organizationConfig.organization_theme.theme.color,
                  "&:hover": {
                    color:
                      organizationConfig.organization_theme.theme.button.color,
                  },
                },
              }}
            />
            <ActionIcon
              onClick={handleSearch}
              variant="light"
              color={
                organizationConfig.organization_theme.theme.button.textColor
              }
              radius="md"
              size="lg"
              aria-label="Search dates"
              loading={isLoading}
              style={{
                backgroundColor:
                  organizationConfig.organization_theme.theme.button.color,
                color:
                  organizationConfig.organization_theme.theme.button.textColor,
              }}
            >
              <IconSearch size={18} />
            </ActionIcon>
          </Group>
        </Grid.Col>

        <Grid.Col
          span={{ base: 12, md: 4 }}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            onClick={ApplyForLeave}
            radius="md"
            size="md"
            leftSection={<IconPlus size={18} />}
            variant="filled"
            style={{
              backgroundColor:
                organizationConfig.organization_theme.theme.button.color,
              color:
                organizationConfig.organization_theme.theme.button.textColor,
            }}
          >
            Apply Leave
          </Button>
        </Grid.Col>
      </Grid>

      {displayedDateRange.length > 0 && (
        <Box style={{ overflowX: "auto" }}>
          <Table
            striped
            highlightOnHover
            className="w-full text-center shadow-md border"
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
                <th className="p-2 border">Project Name</th>
                <th className="p-2 border">Task Details</th>
                {displayedDateRange.map((date) => (
                  <th className="p-2 border" key={date}>
                    <Group gap={2} justify="center">
                      {date === displayedDateRange[0] && (
                        <ActionIcon
                          variant="transparent"
                          color="gray"
                          size="sm"
                          onClick={() => extendRange("backward")}
                        >
                          <IconChevronLeft size={14} />
                        </ActionIcon>
                      )}
                      <Box>
                        <div>{moment(date).format("DD")}</div>
                        <div>{moment(date).format("ddd")}</div>
                      </Box>
                      {date ===
                        displayedDateRange[displayedDateRange.length - 1] && (
                        <ActionIcon
                          variant="transparent"
                          color="gray"
                          size="sm"
                          onClick={() => extendRange("forward")}
                        >
                          <IconChevronRight size={14} />
                        </ActionIcon>
                      )}
                    </Group>
                  </th>
                ))}
                <th className="p-2 border">Total Hours</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {workingHours.map((project: any, projectIndex: number) =>
                project.activities.map((task: any, taskIndex: number) => (
                  <tr
                    key={`${project.project_id}-${task.task_id}-${taskIndex}`}
                  >
                    {taskIndex === 0 && (
                      <td
                        style={{
                          border: `1px solid ${organizationConfig.organization_theme.theme.button.textColor}`,
                        }}
                        className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis"
                        rowSpan={project.activities.length}
                      >
                        <Group justify="center" gap="xs">
                          <span>{project.project_id}</span>
                          {/* <ActionIcon
                            variant="light"
                            size="sm"
                            onClick={() => AddTask(projectIndex)}
                          >
                            <IconPlus size={14} />
                          </ActionIcon> */}
                        </Group>
                      </td>
                    )}
                    <td
                      style={{
                        padding: "0.25rem",
                        border: `1px solid ${organizationConfig.organization_theme.theme.button.textColor}`,
                      }}
                    >
                      <Group justify="center">
                        <TaskPopover task={task.task_id} />
                      </Group>
                    </td>
                    {displayedDateRange.map((date) => {
                      const matchedDate = task.days.find(
                        (taskDate: any) =>
                          moment(taskDate.date, "DD-MM-YYYY").format(
                            "YYYY-MM-DD"
                          ) === date
                      );
                      const hours = matchedDate ? matchedDate.hours : "";

                      return (
                        <td
                          key={date}
                          style={{
                            width: "80px",
                            minWidth: "80px",
                            textAlign: "center",
                            border: `1px solid ${organizationConfig.organization_theme.theme.button.textColor}`,
                          }}
                        >
                          {edit ? (
                            <TextInput
                              placeholder="0"
                              disabled={isPastDate(new Date(date))}
                              value={hours !== undefined ? hours : ""}
                              onChange={(e) =>
                                handleChange(
                                  parseFloat(e.target.value || "0"),
                                  projectIndex,
                                  taskIndex,
                                  date
                                )
                              }
                              styles={{
                                input: {
                                  textAlign: "center",
                                  fontSize: "12px",
                                  padding: "0.2rem 0.4rem",
                                  height: "28px",
                                },
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                textAlign: "center",
                                fontSize: "12px",
                                padding: "0.2rem 0.4rem",
                                height: "28px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color:
                                  organizationConfig.organization_theme.theme
                                    .backgroundColor,
                              }}
                            >
                              {hours ? hours : "0"}
                            </div>
                          )}
                        </td>
                      );
                    })}
                    {taskIndex === 0 && (
                      <td
                        rowSpan={project.activities.length}
                        style={{
                          textAlign: "center",
                          border: `1px solid ${organizationConfig.organization_theme.theme.button.textColor}`,
                        }}
                      >
                        {getProjectTotalHours(projectIndex)}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Box>
      )}
      <Group justify="right" mt="md">
        <Button
          onClick={() => setIsEdit(!edit)}
          color={edit ? "green" : "blue"}
          radius="md"
          disabled={isLoading}
        >
          {edit ? "Save Timesheet" : "Edit Timesheet"}
        </Button>
      </Group>
    </ColorDiv>
  );
};

export default DateTableComponent;
