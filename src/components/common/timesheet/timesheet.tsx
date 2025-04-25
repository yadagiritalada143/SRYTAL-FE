import { useEffect, useState } from "react";
import { Button, TextInput, Title, Table, Grid, Flex } from "@mantine/core";
import moment from "moment";
import "moment-timezone";
import { toast } from "react-toastify";
import { useMantineTheme } from "@mantine/core";
import { data } from "./resources";
import { TaskPopover } from "./task-popover";
import {
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import { useModals } from "@mantine/modals";
import { ColorDiv } from "../style-components/c-div";
import { useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../../atoms/organization-atom";
const DateTableComponent = () => {
  const theme = useMantineTheme();
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

  return (
    <ColorDiv className="w-100 p-5">
      <Title
        order={2}
        className="mb-4 text-center font-extrabold underline text-3xl"
      >
        Timesheet
      </Title>

      <Grid align="flex-end" className="mb-4 ml-4" gutter="md">
        <Grid.Col span="content">
          <Button onClick={() => extendRange("backward")} className="px-4">
            {"<"}
          </Button>
        </Grid.Col>

        <Grid.Col span="content">
          <TextInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            label="Start Date"
            style={{ minWidth: 180 }}
          />
        </Grid.Col>

        <Grid.Col span="content">
          <TextInput
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
            label="End Date"
            style={{ minWidth: 180 }}
          />
        </Grid.Col>

        <Grid.Col span="content">
          <Button onClick={() => extendRange("forward")} className="px-4">
            {">"}
          </Button>
        </Grid.Col>

        <Grid.Col span="auto" className="flex justify-end gap-4">
          <Button onClick={handleSearch} variant="outline" className="px-3">
            <IconSearch />
          </Button>
          <Button onClick={ApplyForLeave} className="px-5 mr-5">
            Apply For Leave
          </Button>
        </Grid.Col>
      </Grid>

      {dateRange.length > 0 && (
        <div style={{ overflowX: "auto", padding: "0 1rem" }}>
          <Table
            striped
            highlightOnHover
            className="mt-4 shadow-lg"
            style={{
              border: "1px solid #ddd",
              borderSpacing: "0 10px",
              width: "100%",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: theme.colors.primary[0],
                  border: `1px solid ${organizationConfig.organization_theme.theme.button.textColor}`,
                }}
              >
                <th
                  style={{
                    padding: "0.5rem",
                    width: "140px",
                    minWidth: "120px",
                  }}
                >
                  Project Name
                </th>
                <th
                  style={{
                    border: `1px solid ${organizationConfig.organization_theme.theme.button.textColor}`,
                    padding: "1rem",
                    width: "150px",
                    minWidth: "170px",
                  }}
                >
                  Task Details
                </th>
                {dateRange.map((date) => {
                  return (
                    <th
                      key={date}
                      style={{
                        textAlign: "center",
                        padding: "0.25rem",
                        minWidth: "30px",
                        maxWidth: "30px",
                        fontSize: "13px",
                        border: `1px solid ${organizationConfig.organization_theme.theme.button.textColor}`,
                      }}
                    >
                      {moment(date).format("DD MMM")}
                      <br />
                      {moment(date).format("ddd")}
                    </th>
                  );
                })}

                <th
                  style={{
                    padding: "0.25rem",
                    width: "160px",
                    textAlign: "center",
                  }}
                >
                  Total Hours
                </th>
              </tr>
            </thead>
            <tbody>
              {workingHours.map((project: any, projectIndex: number) =>
                project.activities.map((task: any, taskIndex: number) => (
                  <tr
                    key={`${project.project_id}-${task.task_id}-${taskIndex}`}
                  >
                    {taskIndex === 0 && (
                      <td
                        rowSpan={project.activities.length}
                        style={{
                          padding: "1rem",
                          border: `1px solid ${organizationConfig.organization_theme.theme.button.textColor}`,
                        }}
                      >
                        <div className="flex flex-col text-center gap-10">
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
                          key={`${date}-${task.task_id}`}
                          style={{
                            textAlign: "center",
                            minWidth: "80px",
                            maxWidth: "90px",
                            padding: "0.25rem",
                            backgroundColor: `${organizationConfig.organization_theme.theme.button.color}`,
                            border: `1px solid ${organizationConfig.organization_theme.theme.button.textColor}`,
                          }}
                        >
                          <TextInput
                            placeholder="0"
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
    </ColorDiv>
  );
};

export default DateTableComponent;
