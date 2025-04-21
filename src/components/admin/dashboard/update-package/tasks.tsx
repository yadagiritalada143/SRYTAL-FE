import { useState, useEffect } from "react";
import { Button, Table } from "@mantine/core";
import { OrganizationConfig } from "../../../../interfaces/organization";
import moment from "moment";
import { IconTrash } from "@tabler/icons-react";
import { deleteTaskByAdmin } from "../../../../services/admin-services";
import { toast } from "react-toastify";
import { DeleteTaskModel } from "./delete-task";
import { useDisclosure } from "@mantine/hooks";

const PackageTasksTable = ({
  tasks = [],
  organizationConfig,
  fetchPackageDetails,
}: {
  tasks: any[];
  organizationConfig: OrganizationConfig;
  fetchPackageDetails: () => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [taskList, setTaskList] = useState([...tasks]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const handleDeleteTask = async (taskId: string, hardDelete: boolean) => {
    try {
      await deleteTaskByAdmin(taskId, hardDelete);
      setTaskList((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId)
      );
      setConfirmDelete(false);
      setAgreeTerms(false);
      close();
      toast.success("Task deleted successfully");
      fetchPackageDetails();
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
      className="my-10 overflow-x-auto shadow-lg rounded-lg"
    >
      <Table className="w-full text-center border table-auto">
        <colgroup>
          <col className="w-[5%] min-w-[50px]" />
          <col className="w-[40%] min-w-[200px]" />
          <col className="w-[20%] min-w-[150px]" />
          <col className="w-[20%] min-w-[200px]" />
          <col className="w-[15%] min-w-[120px]" />
        </colgroup>
        <thead
          style={{
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
            color: organizationConfig.organization_theme.theme.color,
          }}
        >
          <tr className="border-b">
            <th className="px-4 py-2 border-r text-left">S.no</th>
            <th className="px-4 py-2 border-r text-left">Tasks</th>
            <th className="px-4 py-2 border-r text-left">Created By</th>
            <th className="px-4 py-2 border-r text-left">Created At</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {taskList.length > 0 ? (
            taskList.map((task, index) => (
              <tr key={task._id} className="border-b text-left ">
                <td className="px-4 py-2 border-r">{index + 1}</td>
                <td className="px-4 py-2 border-r">{task.title}</td>
                <td className="px-4 py-2 border-r">
                  {task?.userId?.firstName || ""} {task?.userId?.lastName || ""}
                </td>
                <td className="px-4 py-2 border-r">
                  {moment(task.createdAt).format("MMMM Do YYYY, h:mm A")}
                </td>
                <td className="px-4 py-2 text-center">
                  <Button
                    variant="light"
                    color="red"
                    size="xs"
                    onClick={() => {
                      open();
                      setSelectedTask(task._id);
                    }}
                  >
                    <IconTrash size={18} />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No tasks available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <DeleteTaskModel
        agreeTerms={agreeTerms}
        close={close}
        opened={opened}
        confirmDelete={confirmDelete}
        handleDeleteTask={handleDeleteTask}
        setAgreeTerms={setAgreeTerms}
        setConfirmDelete={setConfirmDelete}
        selectedTask={selectedTask}
      />
    </div>
  );
};

export default PackageTasksTable;
