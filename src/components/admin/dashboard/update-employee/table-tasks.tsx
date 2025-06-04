import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Group,
  Modal,
  Table,
  TextInput,
  Text,
} from '@mantine/core';
import { OrganizationConfig } from '../../../../interfaces/organization';
import { IconTrash } from '@tabler/icons-react';
import {
  deleteEmployeePackagesByAdmin,
  updateTaskByAdmin,
} from '../../../../services/admin-services';
import { toast } from 'react-toastify';
import { useDisclosure } from '@mantine/hooks';
import { getEmployeePackagesByAdmin } from '../../../../services/admin-services';

const PackagesTaskTable = ({
  selectedPackagesData = {},
  tasks = [],
  organizationConfig,
  fetchPackageDetails,
  employeeId,
}: {
  selectedPackagesData: any;
  tasks: any[];
  organizationConfig: OrganizationConfig;
  fetchPackageDetails: () => void;
  employeeId: string;
}) => {
  const [packagesList, setPackagesList] = useState<any[]>(
    selectedPackagesData.packages || []
  );
  // const [taskList, setTaskList] = useState([...tasks]);
  const [selectedTaskObj, setSelectedTaskObj] = useState<any>(null);
  const [editModalOpened, { close: closeEditModal }] = useDisclosure(false);

  const refreshEmployeePackages = async () => {
    try {
      const updatedPackages = await getEmployeePackagesByAdmin(employeeId);
      setPackagesList(updatedPackages || []);
    } catch (error) {
      console.error('Failed to fetch updated employee packages:', error);
      toast.error('Could not refresh package data');
    }
  };

  useEffect(() => {
    if (selectedPackagesData && selectedPackagesData.packages?.length > 0) {
      setPackagesList(selectedPackagesData.packages);
    }
    // if (tasks && tasks.length > 0) {
    //   setTaskList(tasks);
    // }
  }, [selectedPackagesData, tasks]);

  const handleDeleteTask = async (employeeId: string, packageId: string) => {
    try {
      await deleteEmployeePackagesByAdmin(employeeId, packageId);
      setPackagesList(prev => prev.filter(pkg => pkg.packageId !== packageId));
      toast.success('Package deleted successfully');
      await refreshEmployeePackages;
      fetchPackageDetails();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  return (
    <div
      style={{
        color: organizationConfig.organization_theme.theme.button.textColor,
        fontFamily: organizationConfig.organization_theme.theme.fontFamily,
      }}
      className="my-0 overflow-x-auto shadow-lg rounded-lg border"
    >
      <Table className="w-full text-center border table-auto">
        <colgroup>
          <col className="w-[5%] min-w-[50px]" />
          <col className="w-[40%] min-w-[200px]" />
          <col className="w-[40%] min-w-[150px]" />
          <col className="w-[20%] min-w-[200px]" />
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
            <th className="px-4 py-2 border-r text-left">Packages</th>
            <th className="px-4 py-2 border-r text-left">Tasks</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {packagesList && packagesList.length > 0 ? (
            packagesList.map((pkg: any, index: any) => {
              return (
                <tr key={pkg._id} className="border-b text-left">
                  <td className="px-4 py-2 border-r">{index + 1}</td>
                  <td className="px-4 py-2 border-r">
                    {pkg.title || 'No packages'}
                  </td>
                  <td className="px-4 py-2 border-r">
                    {pkg.tasks && pkg.tasks.length > 0
                      ? pkg.tasks
                          .map((task: any) => task?.title || 'No tasks')
                          .join(', ')
                      : 'No Tasks'}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex flex-wrap justify-center gap-2 sm:flex-nowrap">
                      <Button
                        variant="light"
                        color="red"
                        size="xs"
                        onClick={() => handleDeleteTask(employeeId, pkg._id)}
                        className="w-full sm:w-auto"
                      >
                        <IconTrash size={18} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No packages available
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
            value={selectedTaskObj?.title || ''}
            onChange={e =>
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
                  toast.success('Task updated successfully');
                  await refreshEmployeePackages();
                  closeEditModal();
                } catch (err) {
                  console.error(err);
                  toast.error('Failed to update task');
                }
              }}
            >
              Save Changes
            </Button>
          </Group>
        </Box>
      </Modal>
    </div>
  );
};

export default PackagesTaskTable;
