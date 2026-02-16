import { useState, useEffect, useMemo } from 'react';
import {
  Button,
  Group,
  Modal,
  TextInput,
  Text,
  Pagination,
  Loader,
  Card,
  Stack,
  ActionIcon,
  Badge,
  Alert,
  Divider,
  Tooltip,
  Grid
} from '@mantine/core';
import {
  IconTrash,
  IconEdit,
  IconSearch,
  IconPackage,
  IconAlertCircle,
  IconCheck,
  IconX,
  IconEye,
  IconChevronDown,
  IconChevronRight,
  IconSubtask
} from '@tabler/icons-react';
import { OrganizationConfig } from '../../../../interfaces/organization';
import {
  deleteEmployeePackagesByAdmin,
  updateTaskByAdmin,
  getEmployeePackagesByAdmin,
  deleteEmployeeTasksByAdmin
} from '../../../../services/admin-services';
import { toast } from 'react-toastify';
import { useDisclosure } from '@mantine/hooks';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../../../../atoms/theme';
import { getThemeConfig } from '../../../../utils/common/theme-utils';

const PackagesTaskTable = ({
  selectedPackagesData = {},
  tasks = [],
  organizationConfig,
  employeeId
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
  const [expandedPackages, setExpandedPackages] = useState<Set<string>>(
    new Set()
  );
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const isDarkTheme = useRecoilValue(themeAtom);

  const [editModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal }
  ] = useDisclosure(false);
  const [itemToDelete, setItemToDelete] = useState<{
    type: 'package' | 'task';
    packageId: string;
    taskId?: string;
    title: string;
  } | null>(null);

  // Get current theme configuration
  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);

  const itemsPerPage = 5; // Reduced for better UX
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const paginatedData = filteredPackages.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  // Statistics calculation
  const stats = useMemo(() => {
    const totalPackages = packagesList.length;
    const totalTasks = packagesList.reduce(
      (acc, pkg) => acc + (pkg.tasks?.length || 0),
      0
    );
    const packagesWithTasks = packagesList.filter(
      pkg => pkg.tasks?.length > 0
    ).length;

    return {
      totalPackages,
      totalTasks,
      packagesWithTasks,
      averageTasksPerPackage:
        totalPackages > 0
          ? Math.round((totalTasks / totalPackages) * 10) / 10
          : 0
    };
  }, [packagesList]);

  const refreshEmployeePackages = async () => {
    setIsLoading(true);
    try {
      const updatedPackages = await getEmployeePackagesByAdmin(employeeId);
      setPackagesList(updatedPackages?.packages || []);
      setFilteredPackages(updatedPackages?.packages || []);
    } catch (error) {
      console.error('Failed to fetch updated employee packages:', error);
      toast.error('Could not refresh package data', {
        style: {
          color: currentThemeConfig.color,
          backgroundColor: currentThemeConfig.backgroundColor
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPackagesData && selectedPackagesData.packages?.length > 0) {
      setPackagesList(selectedPackagesData.packages);
      setFilteredPackages(selectedPackagesData.packages);
      // Auto-expand packages with few tasks for better visibility
      const autoExpand = new Set<string>();
      selectedPackagesData.packages.forEach((pkg: any) => {
        if (pkg.tasks?.length <= 3) {
          autoExpand.add(pkg.packageId);
        }
      });
      setExpandedPackages(autoExpand);
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

  const togglePackageExpansion = (packageId: string) => {
    setExpandedPackages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(packageId)) {
        newSet.delete(packageId);
      } else {
        newSet.add(packageId);
      }
      return newSet;
    });
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    try {
      setDeleteError(null);

      if (itemToDelete.type === 'package') {
        setPackagesList(prev =>
          prev.filter(pkg => pkg.packageId !== itemToDelete.packageId)
        );
        setFilteredPackages(prev =>
          prev.filter(pkg => pkg.packageId !== itemToDelete.packageId)
        );

        await deleteEmployeePackagesByAdmin(employeeId, itemToDelete.packageId);
        toast.success('Package deleted successfully', {
          style: {
            color: currentThemeConfig.color,
            backgroundColor: currentThemeConfig.backgroundColor,
            border: `1px solid ${currentThemeConfig.borderColor}`
          },
          icon: <IconCheck size={24} />
        });
      } else if (itemToDelete.type === 'task' && itemToDelete.taskId) {
        await deleteEmployeeTasksByAdmin(
          employeeId,
          itemToDelete.packageId,
          itemToDelete.taskId
        );
        setPackagesList(prev => {
          const updatedPackages = prev.map(pkg => {
            if (pkg.packageId === itemToDelete.packageId) {
              return {
                ...pkg,
                tasks: pkg.tasks.filter(
                  (task: any) => task.taskId !== itemToDelete.taskId
                )
              };
            }
            return pkg;
          });
          return updatedPackages;
        });
        toast.success('Task deleted successfully', {
          style: {
            color: currentThemeConfig.color,
            backgroundColor: currentThemeConfig.backgroundColor,
            border: `1px solid ${currentThemeConfig.borderColor}`
          },
          icon: <IconCheck size={24} />
        });
      }

      closeDeleteModal();
      setItemToDelete(null);
    } catch (error: any) {
      console.error('Error deleting item:', error);
      const errorMessage =
        error?.response?.data?.message ||
        `Failed to delete ${itemToDelete.type}`;
      setDeleteError(errorMessage);
      toast.error(errorMessage, {
        style: {
          color: currentThemeConfig.color,
          backgroundColor: currentThemeConfig.backgroundColor
        }
      });
    }
  };

  const openDeleteConfirmation = (
    type: 'package' | 'task',
    packageId: string,
    title: string,
    taskId?: string
  ) => {
    setItemToDelete({ type, packageId, taskId, title });
    openDeleteModal();
  };

  const handleEditTask = (task: any) => {
    setSelectedTaskObj({ ...task });
    openEditModal();
  };

  const handleSaveTask = async () => {
    if (!selectedTaskObj?._id || !selectedTaskObj.title.trim()) return;

    try {
      await updateTaskByAdmin(selectedTaskObj._id, selectedTaskObj.title);
      toast.success('Task updated successfully', {
        style: {
          color: currentThemeConfig.color,
          backgroundColor: currentThemeConfig.backgroundColor,
          border: `1px solid ${currentThemeConfig.borderColor}`
        },
        icon: <IconCheck size={24} />
      });
      await refreshEmployeePackages();
      closeEditModal();
    } catch (err: any) {
      console.error(err);
      const errorMessage =
        err?.response?.data?.message || 'Failed to update task';
      toast.error(errorMessage, {
        style: {
          color: currentThemeConfig.color,
          backgroundColor: currentThemeConfig.backgroundColor
        }
      });
    }
  };

  if (isLoading) {
    return (
      <Card
        radius="md"
        p="xl"
        style={{
          backgroundColor: currentThemeConfig.backgroundColor,
          borderColor: currentThemeConfig.borderColor,
          border: `1px solid ${currentThemeConfig.borderColor}`
        }}
      >
        <div className="flex justify-center items-center h-48">
          <Stack align="center" gap="md">
            <Loader size="xl" color={currentThemeConfig.button.color} />
            <Text size="lg" c={currentThemeConfig.color}>
              Loading packages...
            </Text>
          </Stack>
        </div>
      </Card>
    );
  }

  return (
    <Stack gap="lg">
      {/* Statistics Cards */}
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card
            radius="md"
            p="md"
            style={{
              backgroundColor: isDarkTheme
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(0,0,0,0.02)',
              border: `1px solid ${currentThemeConfig.borderColor}`
            }}
          >
            <Group gap="sm">
              <IconPackage size={20} color={currentThemeConfig.button.color} />
              <Stack gap="xs">
                <Text size="xs" c="dimmed">
                  Total Packages
                </Text>
                <Text size="lg" fw={700} c={currentThemeConfig.color}>
                  {stats.totalPackages}
                </Text>
              </Stack>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card
            radius="md"
            p="md"
            style={{
              backgroundColor: isDarkTheme
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(0,0,0,0.02)',
              border: `1px solid ${currentThemeConfig.borderColor}`
            }}
          >
            <Group gap="sm">
              <IconSubtask size={20} color="blue" />
              <Stack gap="xs">
                <Text size="xs" c="dimmed">
                  Total Tasks
                </Text>
                <Text size="lg" fw={700} c={currentThemeConfig.color}>
                  {stats.totalTasks}
                </Text>
              </Stack>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card
            radius="md"
            p="md"
            style={{
              backgroundColor: isDarkTheme
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(0,0,0,0.02)',
              border: `1px solid ${currentThemeConfig.borderColor}`
            }}
          >
            <Group gap="sm">
              <IconCheck size={20} color="green" />
              <Stack gap="xs">
                <Text size="xs" c="dimmed">
                  Active Packages
                </Text>
                <Text size="lg" fw={700} c={currentThemeConfig.color}>
                  {stats.packagesWithTasks}
                </Text>
              </Stack>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card
            radius="md"
            p="md"
            style={{
              backgroundColor: isDarkTheme
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(0,0,0,0.02)',
              border: `1px solid ${currentThemeConfig.borderColor}`
            }}
          >
            <Group gap="sm">
              <IconEye size={20} color="orange" />
              <Stack gap="xs">
                <Text size="xs" c="dimmed">
                  Avg Tasks/Package
                </Text>
                <Text size="lg" fw={700} c={currentThemeConfig.color}>
                  {stats.averageTasksPerPackage}
                </Text>
              </Stack>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Search and Controls */}
      <Card
        radius="md"
        p="lg"
        style={{
          backgroundColor: currentThemeConfig.backgroundColor,
          borderColor: currentThemeConfig.borderColor,
          border: `1px solid ${currentThemeConfig.borderColor}`
        }}
      >
        <Group justify="space-between" align="flex-end">
          <TextInput
            placeholder="Search packages or tasks..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1, maxWidth: 400 }}
            radius="md"
          />

          <Group gap="sm">
            <Button
              variant="light"
              size="sm"
              onClick={() => {
                const allPackageIds = new Set(
                  packagesList.map(pkg => pkg.packageId)
                );
                setExpandedPackages(allPackageIds);
              }}
            >
              Expand All
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => setExpandedPackages(new Set())}
            >
              Collapse All
            </Button>
          </Group>
        </Group>
      </Card>

      {/* Packages List */}
      <Stack gap="md">
        {paginatedData.length > 0 ? (
          paginatedData.map((pkg, index) => {
            const isExpanded = expandedPackages.has(pkg.packageId);
            const taskCount = pkg.tasks?.length || 0;

            return (
              <Card
                key={pkg.packageId}
                radius="md"
                p="lg"
                style={{
                  backgroundColor: currentThemeConfig.backgroundColor,
                  borderColor: currentThemeConfig.borderColor,
                  border: `1px solid ${currentThemeConfig.borderColor}`
                }}
              >
                <Stack gap="md">
                  {/* Package Header */}
                  <Group justify="space-between" align="flex-start">
                    <Group gap="md" style={{ flex: 1 }}>
                      <Text
                        size="sm"
                        c="dimmed"
                        style={{
                          minWidth: '2rem',
                          textAlign: 'center',
                          fontWeight: 500
                        }}
                      >
                        #{(activePage - 1) * itemsPerPage + index + 1}
                      </Text>

                      <Stack gap="xs" style={{ flex: 1 }}>
                        <Group gap="sm">
                          <IconPackage
                            size={18}
                            color={currentThemeConfig.button.color}
                          />
                          <Text fw={600} size="lg" c={currentThemeConfig.color}>
                            {pkg.title}
                          </Text>
                        </Group>

                        <Group gap="xs">
                          <Badge
                            variant="light"
                            color={taskCount > 0 ? 'blue' : 'gray'}
                            size="sm"
                          >
                            {taskCount} Task{taskCount !== 1 ? 's' : ''}
                          </Badge>

                          {taskCount > 0 && (
                            <Badge
                              variant="light"
                              color={isExpanded ? 'green' : 'orange'}
                              size="sm"
                            >
                              {isExpanded ? 'Expanded' : 'Collapsed'}
                            </Badge>
                          )}
                        </Group>
                      </Stack>
                    </Group>

                    <Group gap="xs">
                      {taskCount > 0 && (
                        <Tooltip
                          label={isExpanded ? 'Collapse tasks' : 'Expand tasks'}
                        >
                          <ActionIcon
                            variant="subtle"
                            onClick={() =>
                              togglePackageExpansion(pkg.packageId)
                            }
                            color={currentThemeConfig.button.color}
                          >
                            {isExpanded ? (
                              <IconChevronDown size={16} />
                            ) : (
                              <IconChevronRight size={16} />
                            )}
                          </ActionIcon>
                        </Tooltip>
                      )}

                      <Tooltip label="Delete package">
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          onClick={() =>
                            openDeleteConfirmation(
                              'package',
                              pkg.packageId,
                              pkg.title
                            )
                          }
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  </Group>

                  {/* Tasks Section */}
                  {taskCount > 0 && isExpanded && (
                    <>
                      <Divider />
                      <Stack gap="sm">
                        <Group gap="sm">
                          <IconSubtask size={16} color="blue" />
                          <Text size="sm" fw={500} c={currentThemeConfig.color}>
                            Tasks ({taskCount})
                          </Text>
                        </Group>

                        <Stack gap="xs">
                          {pkg.tasks.map((task: any, taskIndex: number) => (
                            <Card
                              key={task.taskId}
                              radius="sm"
                              p="md"
                              style={{
                                backgroundColor: isDarkTheme
                                  ? 'rgba(255,255,255,0.03)'
                                  : 'rgba(0,0,0,0.01)',
                                border: `1px solid ${currentThemeConfig.borderColor}`
                              }}
                            >
                              <Group justify="space-between" align="center">
                                <Group gap="sm" style={{ flex: 1 }}>
                                  <Text
                                    size="xs"
                                    c="dimmed"
                                    style={{
                                      minWidth: '1.5rem',
                                      textAlign: 'center'
                                    }}
                                  >
                                    {taskIndex + 1}
                                  </Text>
                                  <Text
                                    size="sm"
                                    c={currentThemeConfig.color}
                                    className="break-words"
                                  >
                                    {task.title}
                                  </Text>
                                </Group>

                                <Group gap="xs">
                                  <Tooltip label="Edit task">
                                    <ActionIcon
                                      variant="subtle"
                                      size="sm"
                                      onClick={() => handleEditTask(task)}
                                      color={currentThemeConfig.button.color}
                                    >
                                      <IconEdit size={14} />
                                    </ActionIcon>
                                  </Tooltip>

                                  <Tooltip label="Delete task">
                                    <ActionIcon
                                      variant="subtle"
                                      color="red"
                                      size="sm"
                                      onClick={() =>
                                        openDeleteConfirmation(
                                          'task',
                                          pkg.packageId,
                                          task.title,
                                          task.taskId
                                        )
                                      }
                                    >
                                      <IconTrash size={14} />
                                    </ActionIcon>
                                  </Tooltip>
                                </Group>
                              </Group>
                            </Card>
                          ))}
                        </Stack>
                      </Stack>
                    </>
                  )}

                  {taskCount === 0 && (
                    <>
                      <Divider />
                      <Text size="sm" c="dimmed" ta="center" py="md">
                        No tasks assigned to this package
                      </Text>
                    </>
                  )}
                </Stack>
              </Card>
            );
          })
        ) : (
          <Card
            radius="md"
            p="xl"
            style={{
              backgroundColor: currentThemeConfig.backgroundColor,
              borderColor: currentThemeConfig.borderColor,
              border: `1px solid ${currentThemeConfig.borderColor}`
            }}
          >
            <Stack align="center" gap="md">
              <IconPackage size={48} color="gray" />
              <Stack align="center" gap="xs">
                <Text size="lg" fw={500} c={currentThemeConfig.color}>
                  {searchTerm
                    ? 'No matching packages found'
                    : 'No packages assigned yet'}
                </Text>
                <Text size="sm" c="dimmed" ta="center">
                  {searchTerm
                    ? "Try adjusting your search terms to find what you're looking for."
                    : 'Assign packages to this employee to get started.'}
                </Text>
              </Stack>
              {searchTerm && (
                <Button
                  variant="light"
                  onClick={() => setSearchTerm('')}
                  leftSection={<IconX size={16} />}
                >
                  Clear Search
                </Button>
              )}
            </Stack>
          </Card>
        )}
      </Stack>

      {/* Pagination */}
      {totalPages > 1 && (
        <Group justify="center" mt="lg">
          <Pagination
            total={totalPages}
            value={activePage}
            onChange={setActivePage}
            color={currentThemeConfig.button.color}
            size="md"
          />
        </Group>
      )}

      {/* Edit Task Modal */}
      <Modal
        opened={editModalOpened}
        onClose={closeEditModal}
        title={
          <Group gap="sm">
            <IconEdit size={20} color={currentThemeConfig.button.color} />
            <Text fw={600} c={currentThemeConfig.color}>
              Edit Task
            </Text>
          </Group>
        }
        centered
        size="md"
      >
        <Stack gap="lg">
          <TextInput
            label="Task Name"
            placeholder="Enter task name"
            value={selectedTaskObj?.title || ''}
            onChange={e =>
              setSelectedTaskObj({ ...selectedTaskObj, title: e.target.value })
            }
            required
            leftSection={<IconSubtask size={16} />}
            error={
              !selectedTaskObj?.title?.trim() ? 'Task name is required' : null
            }
          />

          <Group justify="space-between" mt="md">
            <Button
              variant="subtle"
              leftSection={<IconX size={16} />}
              onClick={closeEditModal}
            >
              Cancel
            </Button>

            <Button
              leftSection={<IconCheck size={16} />}
              onClick={handleSaveTask}
              disabled={!selectedTaskObj?.title?.trim()}
              style={{
                backgroundColor: currentThemeConfig.button.color,
                color: currentThemeConfig.button.textColor
              }}
            >
              Save Changes
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title={
          <Group gap="sm">
            <IconAlertCircle size={20} color="red" />
            <Text fw={600} c={currentThemeConfig.color}>
              Confirm Deletion
            </Text>
          </Group>
        }
        centered
        size="md"
      >
        <Stack gap="lg">
          {deleteError && (
            <Alert
              icon={<IconAlertCircle size={16} />}
              color="red"
              title="Error"
              variant="light"
            >
              {deleteError}
            </Alert>
          )}

          <Text c={currentThemeConfig.color}>
            Are you sure you want to delete this {itemToDelete?.type}?
          </Text>

          <Card
            radius="md"
            p="md"
            style={{
              backgroundColor: isDarkTheme
                ? 'rgba(255,0,0,0.1)'
                : 'rgba(255,0,0,0.05)',
              border: '1px solid rgba(255,0,0,0.2)'
            }}
          >
            <Group gap="sm">
              {itemToDelete?.type === 'package' ? (
                <IconPackage size={16} color="red" />
              ) : (
                <IconSubtask size={16} color="red" />
              )}
              <Text fw={500} c="red">
                {itemToDelete?.title}
              </Text>
            </Group>
          </Card>

          <Text size="sm" c="dimmed">
            This action cannot be undone.
          </Text>

          <Group justify="space-between" mt="md">
            <Button
              variant="subtle"
              leftSection={<IconX size={16} />}
              onClick={closeDeleteModal}
            >
              Cancel
            </Button>

            <Button
              color="red"
              leftSection={<IconTrash size={16} />}
              onClick={handleDeleteConfirm}
            >
              Delete {itemToDelete?.type}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default PackagesTaskTable;
