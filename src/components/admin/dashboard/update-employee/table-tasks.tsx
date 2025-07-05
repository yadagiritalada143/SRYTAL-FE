import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Group,
  Modal,
  TextInput,
  Text,
  Pagination,
  Loader,
} from '@mantine/core';
import { OrganizationConfig } from '../../../../interfaces/organization';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import {
  deleteEmployeePackagesByAdmin,
  updateTaskByAdmin,
  getEmployeePackagesByAdmin,
  deleteEmployeeTasksByAdmin,
} from '../../../../services/admin-services';
import { toast } from 'react-toastify';
import { useDisclosure } from '@mantine/hooks';

const PackagesTaskTable = ({
  selectedPackagesData = {},
  tasks = [],
  organizationConfig,
  employeeId,
}: {
  selectedPackagesData: any;
  tasks: any[];
  organizationConfig: OrganizationConfig;
  employeeId: string;
}) => {
  const [packagesList, setPackagesList] = useState<any[]>(
    selectedPackagesData.packages || []
  );
  const [filteredPackages, setFilteredPackages] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTaskObj, setSelectedTaskObj] = useState<any>(null);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const paginatedData = filteredPackages.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const refreshEmployeePackages = async () => {
    setIsLoading(true);
    try {
      const updatedPackages = await getEmployeePackagesByAdmin(employeeId);
      setPackagesList(updatedPackages?.packages || []);
      setFilteredPackages(updatedPackages?.packages || []);
    } catch (error) {
      console.error('Failed to fetch updated employee packages:', error);
      toast.error('Could not refresh package data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPackagesData && selectedPackagesData.packages?.length > 0) {
      setPackagesList(selectedPackagesData.packages);
      setFilteredPackages(selectedPackagesData.packages);
    }
  }, [selectedPackagesData, tasks]);

  useEffect(() => {
    const filtered = packagesList.filter(pkg => {
      const packageMatches = pkg.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const taskMatches = pkg.tasks?.some((task: any) =>
        task.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return packageMatches || taskMatches;
    });
    setFilteredPackages(filtered);
    setActivePage(1);
  }, [searchTerm, packagesList]);

  const handleDeletePackage = async (packageId: string) => {
    const originalPackages = [...packagesList];
    try {
      setPackagesList(prev => prev.filter(pkg => pkg.packageId !== packageId));
      setFilteredPackages(prev =>
        prev.filter(pkg => pkg.packageId !== packageId)
      );
      await deleteEmployeePackagesByAdmin(employeeId, packageId);
      toast.success('Package deleted successfully');
    } catch (error) {
      console.error('Error deleting package:', error);
      toast.error('Failed to delete package');
      setPackagesList(originalPackages);
      setFilteredPackages(originalPackages);
    }
  };

  const handleDeleteTask = async (packageId: string, taskId: string) => {
    try {
      await deleteEmployeeTasksByAdmin(employeeId, packageId, taskId);
      setPackagesList(prev => {
        const updatedPackages = prev.map(pkg => {
          if (pkg.packageId === packageId) {
            return {
              ...pkg,
              tasks: pkg.tasks.filter((task: any) => task.taskId !== taskId),
            };
          }
          return pkg;
        });
        return updatedPackages;
      });
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  const handleEditTask = (task: any) => {
    setSelectedTaskObj(task);
    openEditModal();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div
      className="w-full"
      style={{
        color: organizationConfig.organization_theme.theme.button.textColor,
        fontFamily: organizationConfig.organization_theme.theme.fontFamily,
      }}
    >
      <div className="mb-4">
        <TextInput
          placeholder="Search packages or tasks..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Loader
            size="xl"
            color={organizationConfig.organization_theme.theme.button.color}
          />
        </div>
      ) : (
        <div className="overflow-auto max-w-full shadow-lg rounded-lg">
          <table className="w-full text-center shadow-md border table-auto">
            <colgroup>
              <col className="w-[5%]" />
              <col className="w-[25%]" />
              <col className="w-[55%]" />
              <col className="w-[15%]" />
            </colgroup>
            <thead
              className="text-xs"
              style={{
                backgroundColor:
                  organizationConfig.organization_theme.theme.backgroundColor,
                color: organizationConfig.organization_theme.theme.color,
              }}
            >
              <tr>
                <th className="p-2 border">S.No</th>
                <th className="p-2 border">Package</th>
                <th className="p-2 border">Tasks</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {paginatedData.length > 0 ? (
                paginatedData.map((pkg, index) => (
                  <tr key={pkg.packageId} className="border-b">
                    <td className="px-4 py-2 border align-middle text-center">
                      {(activePage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-2 border align-middle ">
                      {pkg.title}
                    </td>
                    <td className="px-4 py-2 border text-left">
                      {pkg.tasks?.length > 0 ? (
                        <div className="space-y-1">
                          {pkg.tasks.map((task: any) => (
                            <div
                              key={task.taskId}
                              className="flex items-center justify-between py-1 pr-2"
                            >
                              <span>{task.title}</span>
                              <div className="flex space-x-1">
                                <Button
                                  variant="subtle"
                                  size="xs"
                                  onClick={() => handleEditTask(task)}
                                >
                                  <IconEdit size={14} />
                                </Button>
                                <Button
                                  variant="subtle"
                                  color="red"
                                  size="xs"
                                  onClick={() =>
                                    handleDeleteTask(pkg.packageId, task.taskId)
                                  }
                                >
                                  <IconTrash size={14} />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Text c="dimmed">No tasks</Text>
                      )}
                    </td>
                    <td className="px-4 py-2 border">
                      <Button
                        variant="subtle"
                        color="red"
                        onClick={() => handleDeletePackage(pkg.packageId)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4">
                    {searchTerm ? (
                      <Text>No matching packages or tasks found</Text>
                    ) : (
                      <Text>No packages assigned yet</Text>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination
            total={totalPages}
            value={activePage}
            onChange={setActivePage}
          />
        </div>
      )}

      {/* Edit Task Modal */}
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
              variant="outline"
              onClick={closeEditModal}
              style={{
                backgroundColor:
                  organizationConfig.organization_theme.theme.backgroundColor,
                color: organizationConfig.organization_theme.theme.color,
              }}
            >
              Cancel
            </Button>
            <Button
              style={{
                backgroundColor:
                  organizationConfig.organization_theme.theme.backgroundColor,
                color: organizationConfig.organization_theme.theme.color,
              }}
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
