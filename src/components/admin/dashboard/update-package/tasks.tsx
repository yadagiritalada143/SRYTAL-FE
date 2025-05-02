import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Group,
  Modal,
  Table,
  TextInput,
  Text,
} from "@mantine/core";
import { OrganizationConfig } from "../../../../interfaces/organization";
import moment from "moment";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
  deleteTaskByAdmin,
  updateTaskByAdmin,
} from "../../../../services/admin-services";
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
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState([...tasks]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedTaskObj, setSelectedTaskObj] = useState<any>(null);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);

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
                  {task?.createdBy?.firstName || ""}{" "}
                  {task?.createdBy?.lastName || ""}
                </td>
                <td className="px-4 py-2 border-r">
                  {moment(task.createdAt).format("MMMM Do YYYY, h:mm A")}
                </td>
                <td className="px-4 py-2 text-center">
                  <Button
                    className="mr-2"
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
                  <Button
                    variant="light"
                    color="blue"
                    size="xs"
                    onClick={() => {
                      setSelectedTaskObj(task);
                      openEditModal();
                    }}
                  >
                    <IconEdit size={18} />
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
      <Modal
        opened={editModalOpened}
        onClose={closeEditModal}
        title={<Text className="text-center font-bold text-xl">Edit Task</Text>}
        centered
      >
        <Box>
          <TextInput
            label="Task Name"
            value={selectedTaskObj?.title || ""}
            onChange={(e) =>
              setSelectedTaskObj({ ...selectedTaskObj, title: e.target.value })
            }
            required
            mb="md"
          />
          <Group justify="flex-end">
            <Button
              bg={organizationConfig.organization_theme.theme.backgroundColor}
              c={organizationConfig.organization_theme.theme.color}
              variant="outline"
              onClick={closeEditModal}
            >
              Cancel
            </Button>
            <Button
              bg={organizationConfig.organization_theme.theme.backgroundColor}
              c={organizationConfig.organization_theme.theme.color}
              variant="outline"
              onClick={async () => {
                if (!selectedTaskObj?._id) return;

                try {
                  await updateTaskByAdmin(
                    selectedTaskObj._id,
                    selectedTaskObj.title
                  );
                  toast.success("Task updated successfully");

                  setTaskList((prev) =>
                    prev.map((task) =>
                      task._id === selectedTaskObj._id
                        ? { ...task, title: selectedTaskObj.title }
                        : task
                    )
                  );

                  fetchPackageDetails();
                  closeEditModal();
                  navigate("/packages");
                } catch (err) {
                  console.error(err);
                  toast.error("Failed to update task");
                }
              }}
            >
              Save Changes
            </Button>
          </Group>
        </Box>
      </Modal>

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
