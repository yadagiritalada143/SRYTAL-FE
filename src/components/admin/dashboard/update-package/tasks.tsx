import { useState, useEffect } from "react";
import { Table } from "@mantine/core";
import { OrganizationConfig } from "../../../../interfaces/organization";
import moment from "moment";
import { IconX } from "@tabler/icons-react";
import { deleteTaskByAdmin } from "../../../../services/admin-services";
import { toast } from "react-toastify";

const PackageTasksTable = ({
  tasks = [],
  organizationConfig,
}: {
  tasks: any[];
  organizationConfig: OrganizationConfig;
}) => {
  const [taskList, setTaskList] = useState([...tasks]);
  useEffect(() => {
    console.log("Tasks in useEffect:", tasks);
    setTaskList(tasks);
  }, [tasks]);

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTaskByAdmin(taskId);

      setTaskList((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId)
      );

      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };
  return (
    <div
      style={{
        color: organizationConfig.organization_theme.theme.button.textColor,
        fontFamily: organizationConfig.organization_theme.theme.fontFamily,
      }}
      className=" my-10 overflow-auto max-w-full shadow-lg rounded-lg"
    >
      <Table className="w-full text-center shadow-md border table-auto">
        <colgroup>
          <col className="w-16" />
          <col className="w-56" />
          <col className="w-32" />
          <col className="w-32" />
        </colgroup>
        <thead
          style={{
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
            color: organizationConfig.organization_theme.theme.color,
          }}
        >
          <tr className="border-b ">
            <th className="px-4 py-2 text-left border-r ">S.no</th>
            <th className="px-4 py-2 text-left border-r ">Tasks</th>
            <th className="px-4 py-2 text-left border-r ">Created By</th>
            <th className="px-4 py-2 text-left border-r ">Created At</th>
          </tr>
        </thead>

        <tbody>
          {taskList.length > 0 ? (
            taskList.map((task, index) => (
              <tr
                key={task._id}
                className="border-b transition-all duration-200 relative text-left"
              >
                <td className="px-4 py-2 border-r">{index + 1}</td>
                <td className="px-4 py-2 border-r">{task.task || "No Task"}</td>
                <td className="px-4 py-2 border-r">
                  {task?.userId?.firstName || ""} {task?.userId?.lastName || ""}
                </td>
                <td className="px-4 py-2 border-r">
                  <div className="flex items-center justify-between">
                    {moment(task.updateAt).format("MMMM Do YYYY, h:mm")}
                    <IconX
                      className="ml-2 cursor-pointer text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteTask(task._id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No tasks available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default PackageTasksTable;
