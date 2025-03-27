import { BgDiv } from "../../../common/style-components/bg-div";
import { Button, Grid, Group, Textarea } from "@mantine/core";
import { OrganizationConfig } from "../../../../interfaces/organization";

import { addTasksByAdmin } from "../../../../services/admin-services";
import { useCustomToast } from "../../../../utils/common/toast";
import { toast } from "react-toastify";
import { useState } from "react";

const AddTasksPackage = ({
  organizationConfig,
  setTasks,
  user,
  packageId,
  required = false,
}: {
  organizationConfig: OrganizationConfig;
  user: any;
  packageId: string;
  setTasks: any;
  tasks: any;
  required: boolean;
}) => {
  const { showSuccessToast } = useCustomToast();
  const [newTasks, setNewTasks] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAddTasks = () => {
    if (required && !newTasks.trim()) {
      setError("This field is required");
      return;
    }
    setError("");
    addTasksByAdmin(packageId, newTasks)
      .then(() => {
        showSuccessToast("Your tasks has been added !");
        const tasks = {
          userId: {
            firstName: user.firstName,
            lastName: user.lastName,
          },
          updateAt: new Date().toLocaleDateString(),
          title: newTasks,
        };
        setTasks((prev: any) => [tasks, ...prev]);
        setNewTasks("");
      })
      .catch((error) =>
        toast.error(
          error || error.response.data.message || "Something went wrong"
        )
      );
  };
  return (
    <div className="w-full max-w-2xl mx-auto my-6">
      <BgDiv>
        <form
          style={{
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
          }}
          className="rounded-lg shadow-lg w-full p-8"
        >
          <Grid>
            <Grid.Col span={12}>
              <Textarea
                label="Tasks"
                autosize
                rows={4}
                value={newTasks}
                onChange={(e) => setNewTasks(e.target.value)}
              />
              {error && <p className="text-red-500 mt-1">{error}</p>}
            </Grid.Col>
          </Grid>
          <Group justify="right" mt="lg">
            <Button onClick={handleAddTasks}>Add Tasks</Button>
          </Group>
        </form>
      </BgDiv>
    </div>
  );
};

export default AddTasksPackage;
