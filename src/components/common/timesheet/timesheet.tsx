import { useEffect, useState } from "react";
import { Button, TextInput, Title, Table, Grid, Flex } from "@mantine/core";
import moment from "moment";
import "moment-timezone";
import { toast } from "react-toastify";
import { useMantineTheme } from "@mantine/core";
import { data } from "./resources";
import { TaskPopover } from "./task-popover";
import { IconPlus, IconX } from "@tabler/icons-react";
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

  const isWeekend = (date: string) => {
    const day = moment(date).day();
    return day === 0 || day === 6;
  };
  
  useEffect(()=>{
    const initialRange = getDateRange(startDate, endDate);
    setDateRange(initialRange);
    setDaysInRange(initialRange.length);
  },[startDate,endDate])

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
    <ColorDiv className="w-full p-4">
      <Title order={2} className="mb-4 text-center font-extrabold underline text-3xl">
        Timesheet
      </Title>

      <Grid align="flex-end" className="mb-4 justify-center ">
        <Grid.Col span={3}>
          <TextInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            label="Start Date"
            className="mb-2"
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <TextInput
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
            label="End Date"
            className="mb-2"
          />
        </Grid.Col>
        <Grid.Col span={6}>
        <div className="flex justify-start items-end gap-3 mb-2">
          <Button onClick={handleSearch} className="mx-2">
            Search
          </Button>
          <Button onClick={() => extendRange("backward")} className="mx-2">
            {"<"}
          </Button>
          <Button onClick={() => extendRange("forward")} className="mx-2">
            {">"}
          </Button>
          <Button onClick={ApplyForLeave} className="mx-4">
            Apply For Leave
          </Button>
        </div>
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
              <tr style={{ backgroundColor: theme.colors.primary[0],border: `1px solid ${organizationConfig.organization_theme.theme.button.textColor}` }} >
                <th
                  style={{ padding: "1rem", width: "150px", minWidth: "120px" }}
                >
                  Project Name
                </th>
                <th
                  style={{
                    border: `1px solid ${organizationConfig.organization_theme.theme.button.textColor}`,
                    padding: "1rem",
                    width: "190px",
                    minWidth: "180px",
                  }}
                >
                  Task Details
                </th>
                {dateRange.map((date) => {
                  const weekend = isWeekend(date);
                  return (
                    <th
                      key={date}
                      style={{
                        padding: "1rem",
                        width: "120px",
                        minWidth: "100px",
                        textAlign: "center",
                        border: `1px solid ${organizationConfig.organization_theme.theme.button.textColor}`,
                        backgroundColor: weekend ? "#f8d7da" : undefined, 
                        color: weekend ? "#721c24" : undefined,
                      }}
                    >
                      {moment(date).format("DD MMM")} <br />
                      {moment(date).format("ddd")}
                    </th>
                  );
                })}
                <th
                  style={{
                    padding: "1rem",
                    width: "120px",
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
                        padding: "1rem",
                        border: `1px solid ${organizationConfig.organization_theme.theme.button.textColor}`,
                      }}
                    >
                      <div className=" w-full flex justify-between">
                        <TaskPopover task={task.task_id} />
                        <p>
                          <Button className="rounded-full">
                            <IconX />
                          </Button>
                        </p>
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
                            padding: "1rem",
                            textAlign: "center",
                            width: "120px",
                            border: `1px solid ${organizationConfig.organization_theme.theme.button.textColor}`,
                            backgroundColor: isWeekend(date) ? "#a8a8a8" : "transparent",
                          }}
                        >
                          <TextInput
                            placeholder="0"
                            value={hours !== undefined ? hours : ""}
                            disabled={isWeekend(date)}
                            onChange={(e) =>
                              handleChange(
                                parseFloat(e.target.value || "0"),
                                projectIndex,
                                taskIndex,
                                date
                              )
                            }
                            style={{ textAlign: "center" }}
                          />
                        </td>
                      );
                    })}
                    {taskIndex === 0 && (
                      <td
                        rowSpan={project.activities.length}
                        style={{
                          padding: "1rem",
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
