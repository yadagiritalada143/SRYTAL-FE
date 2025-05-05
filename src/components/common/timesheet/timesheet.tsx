import { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  Title,
  Table,
  Grid,
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
                onClick={() => extendRange("backward")}
                className="px-2 py-1 w-12 sm:w-auto"
              >
                <IconChevronLeft size={18} />
              </Button>

              <TextInput
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                size="sm"
                radius="md"
                styles={{ input: { minWidth: 150 } }}
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <TextInput
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
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
                onClick={() => extendRange("forward")}
                className="px-2 py-1 w-12 sm:w-auto"
              >
                <IconChevronRight size={18} />
              </Button>
            </div>
          </div>
        </Grid.Col>

        {/* Actions (Search + Apply For Leave) */}
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
            radius="md"
            size="sm"
            className="px-5 w-full sm:w-auto"
            leftSection={<IconPlus size={18} />}
            variant="filled"
            style={{
              backgroundColor:
                organizationConfig.organization_theme.theme.button.color,
              color:
                organizationConfig.organization_theme.theme.button.textColor,
            }}
          >
            Apply For Leave
          </Button>
        </Grid.Col>
      </Grid>

      {displayedDateRange.length > 0 && (
        <div style={{ overflowX: "auto" }}>
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
                {dateRange.map((date: any) => {
                  return (
                    <th className="p-2 border " key={date}>
                      {moment(date).format("DD MMM")}
                      <br />
                      {moment(date).format("ddd")}
                    </th>
                  );
                })}
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
                        <div className="flex flex-col items-center justify-center gap-2 min-h-[60px]">
                          <p>{project.project_id}</p>
                          <p
                            style={{ cursor: "pointer" }}
                            className="rounded-full"
                            onClick={() => AddTask(projectIndex)}
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
                        padding: "0.25rem",
                        border: `1px solid ${organizationConfig.organization_theme.theme.button.textColor}`,
                      }}
                    >
                      <div className=" w-full flex justify-center">
                        <TaskPopover task={task.task_id} />
                      </div>
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
        </div>
      )}
      <div className="flex justify-end mt-6 ml-6">
        <Button onClick={() => setIsEdit(!edit)}>
          {edit ? "Save" : "Edit"}
        </Button>
      </div>
    </ColorDiv>
  );
};

export default DateTableComponent;
