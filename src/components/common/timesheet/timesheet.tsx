import { useEffect, useState } from "react";
import { Button, TextInput, Title, Table, Grid } from "@mantine/core";
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
const DateTableComponent = () => {
  const modals = useModals();
  const [startDate, setStartDate] = useState<string>(
    moment().tz("Asia/Kolkata").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<string>(
    moment().tz("Asia/Kolkata").add(6, "days").format("YYYY-MM-DD")
  );
  const [dateRange, setDateRange] = useState<string[]>([]);
  const [daysInRange, setDaysInRange] = useState<number>(0);
  const [workingHours, setWorkingHours] = useState(data);
  const [edit, setIsEdit] = useState(false);
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  const getDateRange = (start: string, end: string): string[] => {
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
    const initialRange = getDateRange(startDate, endDate);
    setDateRange(initialRange);
    setDaysInRange(initialRange.length);
  }, [startDate, endDate]);

  const handleSearch = () => {
    if (startDate && endDate) {
      if (new Date(startDate) > new Date(endDate)) {
        toast.error("Start date must be before end date.");
        return;
      }
      const range = getDateRange(startDate, endDate);
      setDateRange(range);
      setDaysInRange(range.length);
    }
  };

  const extendRange = (direction: "forward" | "backward"): void => {
    if (!startDate || !endDate) return;

    const startDt = new Date(startDate);
    const endDt = new Date(endDate);
    const rangeExtension = daysInRange;

    if (direction === "backward") {
      const newStart = new Date(
        startDt.setDate(startDt.getDate() - rangeExtension)
      );

      const newEnd = new Date(endDt.setDate(endDt.getDate() - rangeExtension));

      setStartDate(newStart.toISOString().split("T")[0]);
      setEndDate(newEnd.toISOString().split("T")[0]);
      const newRange = getDateRange(
        newStart.toISOString().split("T")[0],
        newEnd.toISOString().split("T")[0]
      );
      setDateRange(newRange);
    } else {
      const newStart = new Date(
        startDt.setDate(startDt.getDate() + rangeExtension)
      );

      const newEnd = new Date(endDt.setDate(endDt.getDate() + rangeExtension));
      setStartDate(newStart.toISOString().split("T")[0]);
      setEndDate(newEnd.toISOString().split("T")[0]);
      const newRange = getDateRange(
        newStart.toISOString().split("T")[0],
        newEnd.toISOString().split("T")[0]
      );
      setDateRange(newRange);
    }
  };

  const getProjectTotalHours = (projectIndex: number) => {
    return dateRange.reduce((total, date) => {
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

  const AddTask = (projectIndex: number) => {
    const id = modals.openModal({
      title: "Add New Task",
      children: (
        <TextInput
          placeholder="Enter task name"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value) {
              const newTaskName = e.currentTarget.value;
              setWorkingHours((prev) => {
                const updatedHours = [...prev];
                updatedHours[projectIndex].activities.push({
                  task_id: newTaskName,
                  days: [],
                });
                return updatedHours;
              });
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
        <Grid.Col span="auto">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              color="blue"
              radius="xl"
              size="sm"
              onClick={() => extendRange("backward")}
              className="px-2 py-1"
            >
              <IconChevronLeft size={18} />
            </Button>

            <TextInput
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              size="sm"
              radius="md"
              styles={{ input: { minWidth: 150 } }}
            />

            <TextInput
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              size="sm"
              radius="md"
              styles={{ input: { minWidth: 150 } }}
            />

            <Button
              variant="outline"
              color="blue"
              radius="xl"
              size="sm"
              onClick={() => extendRange("forward")}
              className="px-2 py-1"
            >
              <IconChevronRight size={18} />
            </Button>
          </div>
        </Grid.Col>

        {/* Actions (Search + Apply For Leave) */}
        <Grid.Col span="content" className="flex justify-end gap-3">
          <Button
            onClick={handleSearch}
            variant="outline"
            color="gray"
            radius="md"
            size="sm"
            className="px-3"
          >
            <IconSearch size={16} />
          </Button>
          <Button
            onClick={ApplyForLeave}
            color="green"
            radius="md"
            size="sm"
            className="px-5"
          >
            Apply For Leave
          </Button>
        </Grid.Col>
      </Grid>

      {dateRange.length > 0 && (
        <div style={{ overflowX: "auto", padding: "0 1rem" }}>
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
                {dateRange.map((date) => {
                  return (
                    <th className="p-2 border " key={date}>
                      {moment(date).format("DD MMM")}
                      <br />
                      {moment(date).format("ddd")}
                    </th>
                  );
                })}

                <th className="p-2 border ">Total Hours</th>
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
                    {dateRange.map((date) => {
                      const matchedDate = task.days.find(
                        (taskDate: any) =>
                          moment(taskDate.date, "DD-MM-YYYY").format(
                            "YYYY-MM-DD"
                          ) === date
                      );
                      const hours = matchedDate ? matchedDate.hours : "";

                      return (
                        <td
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
