import { useState, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDisclosure } from '@mantine/hooks';
import { toast } from 'react-toastify';
import {
  MultiSelect,
  Button,
  Group,
  Checkbox,
  Card,
  Text,
  Loader,
  Stack,
  ScrollArea,
  SimpleGrid,
  Container,
  Progress,
  Alert,
  Badge,
  Divider,
  Box,
  ActionIcon
} from '@mantine/core';
import {
  IconPackage,
  IconUser,
  IconMail,
  IconPhone,
  IconCalendar,
  IconBriefcase,
  IconAlertCircle,
  IconCheck,
  IconX,
  IconArrowRight,
  IconPackages,
  IconSubtask,
  IconArrowLeft
} from '@tabler/icons-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { employeeDetailsAtom } from '../../../../atoms/employee-atom';
import { themeAtom } from '../../../../atoms/theme';

import {
  addPackagetoEmployeeByAdmin,
  getAllPackagesByAdmin,
  getEmployeePackagesByAdmin
} from '../../../../services/admin-services';

import { employeePackageSchema } from '../../../../forms/update-employee';
import PackagesTaskTable from './table-tasks';

import {
  EmployeePackageForm,
  FormattedPackageData,
  PackagesFormProps,
  SelectedTasks
} from './interfaces/add-package';
import {
  fetchInitialData,
  loadEmployeePackages,
  formatSubmitData,
  getEmployeeInfoItems
} from './helper-functions/add-package';
import { PackagesList, Task } from '../../../../interfaces/package';
import { StandardModal } from '../../../UI/Models/base-model';
import { ThemeBackground } from '../../../UI/Theme-background/background';
import { useNavigate } from 'react-router-dom';

const PackagesFormComponent = ({
  organizationConfig,
  employeeId
}: PackagesFormProps) => {
  const [employmentPackagesOptions, setEmploymentPackagesOptions] =
    useState<PackagesList>([]);
  const [employeeDetails, setEmployeeDetails] =
    useRecoilState(employeeDetailsAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const isDarkTheme = useRecoilValue(themeAtom);
  const [opened, { open, close }] = useDisclosure(false);
  const [tasks] = useState<Task[]>([]);
  const [selectedPackagesData, setSelectedPackagesData] =
    useState<FormattedPackageData>();
  const [selectedTasks, setSelectedTasks] = useState<SelectedTasks>({});
  const navigate = useNavigate();

  // Get current theme configuration
  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

  const {
    control,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<EmployeePackageForm>({
    resolver: zodResolver(employeePackageSchema),
    defaultValues: {
      packagesInfo: []
    }
  });

  const watchedPackagesInfo = watch('packagesInfo');
  const selectedPackages = useMemo(
    () => watchedPackagesInfo || [],
    [watchedPackagesInfo]
  );

  // Calculate progress for selected packages and tasks
  const progressStats = useMemo(() => {
    const totalPackages = selectedPackages.length;
    const totalTasks = selectedPackages.reduce((acc, pkgId) => {
      const pkg = employmentPackagesOptions?.find(p => p._id === pkgId);
      return acc + (pkg?.tasks?.length || 0);
    }, 0);
    const selectedTasksCount = Object.values(selectedTasks).reduce(
      (acc, taskSet) => acc + taskSet.size,
      0
    );

    return {
      packages: totalPackages,
      totalTasks,
      selectedTasksCount,
      progress:
        totalTasks > 0 ? Math.round((selectedTasksCount / totalTasks) * 100) : 0
    };
  }, [selectedPackages, selectedTasks, employmentPackagesOptions]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchInitialData(employeeId, setEmployeeDetails);
      } catch (error: any) {
        setSubmitError(error.message);
        toast.error(error.message, {
          style: {
            color: currentThemeConfig.color,
            backgroundColor: currentThemeConfig.backgroundColor
          }
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [employeeId, setEmployeeDetails, currentThemeConfig]);

  useEffect(() => {
    const loadInitialEmployeePackages = async () => {
      try {
        await loadEmployeePackages(
          employeeId,
          reset,
          setSelectedPackagesData,
          setSelectedTasks
        );
      } catch (error: any) {
        toast.error(error.message, {
          style: {
            color: currentThemeConfig.color,
            backgroundColor: currentThemeConfig.backgroundColor
          }
        });
      }
    };

    if (employeeId) loadInitialEmployeePackages();
  }, [employeeId, reset, currentThemeConfig]);

  useEffect(() => {
    const loadAllPackages = async () => {
      try {
        const packages = await getAllPackagesByAdmin();
        setEmploymentPackagesOptions(packages);
      } catch (error: any) {
        toast.error(error.message, {
          style: {
            color: currentThemeConfig.color,
            backgroundColor: currentThemeConfig.backgroundColor
          }
        });
      }
    };

    loadAllPackages();
  }, [currentThemeConfig]);

  const handleTaskToggle = (pkgId: string, taskId: string) => {
    setSelectedTasks(prev => {
      const newSelectedTasks = { ...prev };
      const currentSet = new Set(prev[pkgId] || []);
      if (currentSet.has(taskId)) {
        currentSet.delete(taskId);
      } else {
        currentSet.add(taskId);
      }
      newSelectedTasks[pkgId] = currentSet;
      return newSelectedTasks;
    });
  };

  const proceedToTaskSelection = () => {
    if (selectedPackages.length === 0) {
      toast.warning('Please select at least one package', {
        style: {
          color: currentThemeConfig.color,
          backgroundColor: currentThemeConfig.backgroundColor
        }
      });
      return;
    }

    // Initialize selected tasks for new packages
    const newSelectedTasks = { ...selectedTasks };
    selectedPackages.forEach(pkgId => {
      if (!newSelectedTasks[pkgId]) {
        newSelectedTasks[pkgId] = new Set();
      }
    });
    setSelectedTasks(newSelectedTasks);
    open();
  };

  const onSubmit = async () => {
    try {
      setSubmitError(null);
      const formattedData = formatSubmitData(
        selectedPackages,
        employmentPackagesOptions,
        selectedTasks,
        employeeId
      );

      if (formattedData.packages.length === 0) {
        toast.warning('Please select at least one task', {
          style: {
            color: currentThemeConfig.color,
            backgroundColor: currentThemeConfig.backgroundColor
          }
        });
        return;
      }

      setSelectedPackagesData(formattedData);
      await addPackagetoEmployeeByAdmin(formattedData);

      toast.success('Packages and tasks updated successfully!', {
        style: {
          color: currentThemeConfig.color,
          backgroundColor: currentThemeConfig.backgroundColor,
          border: `1px solid ${currentThemeConfig.borderColor}`
        },
        progressStyle: {
          background: currentThemeConfig.button.color
        },
        icon: <IconCheck size={24} />,
        position: 'top-right',
        autoClose: 4000
      });

      const updatedData = await getEmployeePackagesByAdmin(employeeId);
      setSelectedPackagesData(updatedData);
      close();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'Failed to update packages';
      setSubmitError(errorMessage);
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
      <Container size="lg" py="xl">
        <ThemeBackground>
          <Card
            shadow="lg"
            radius="md"
            withBorder
            p="xl"
            style={{
              backgroundColor: currentThemeConfig.backgroundColor,
              borderColor: currentThemeConfig.borderColor
            }}
          >
            <div className="flex justify-center items-center h-64">
              <Stack align="center" gap="md">
                <Loader size="xl" color={currentThemeConfig.button.color} />
                <Text size="lg" c={currentThemeConfig.color}>
                  Loading employee data...
                </Text>
              </Stack>
            </div>
          </Card>
        </ThemeBackground>
      </Container>
    );
  }

  const employeeInfoItems = getEmployeeInfoItems(employeeDetails);

  const getInfoIcon = (label: string) => {
    switch (label) {
      case 'Name':
        return <IconUser size={16} />;
      case 'Email':
        return <IconMail size={16} />;
      case 'Phone':
        return <IconPhone size={16} />;
      case 'Join Date':
        return <IconCalendar size={16} />;
      case 'Role':
        return <IconBriefcase size={16} />;
      default:
        return <IconUser size={16} />;
    }
  };

  const handleBack = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );
      if (!confirmLeave) return;
    }
    navigate(-1);
  };

  return (
    <Container size="lg" py="xl">
      <ThemeBackground>
        <Stack gap="xl">
          {/* Header */}
          <Group justify="space-between" align="flex-start">
            <Stack gap="xs">
              <Group gap="sm">
                <IconPackages
                  size={24}
                  color={currentThemeConfig.button.color}
                />
                <Text size="xl" fw={700} c={currentThemeConfig.color}>
                  Package Assignment
                </Text>
              </Group>
              <Text size="sm" c="dimmed">
                Assign packages and tasks to the employee
              </Text>
            </Stack>

            <Box>
              {progressStats.packages > 0 && (
                <Group gap="xs" justify="flex-end">
                  <Badge
                    variant="light"
                    color={currentThemeConfig.button.color}
                  >
                    {progressStats.packages} Package
                    {progressStats.packages !== 1 ? 's' : ''}
                  </Badge>
                  <Badge variant="light" color="blue">
                    {progressStats.selectedTasksCount}/
                    {progressStats.totalTasks} Tasks
                  </Badge>
                </Group>
              )}
              <Group mt="md" gap="xs" justify="center">
                <ActionIcon
                  variant="subtle"
                  color={currentThemeConfig.button.color}
                  size="lg"
                  onClick={handleBack}
                >
                  <IconArrowLeft size={20} />
                </ActionIcon>
              </Group>
            </Box>
          </Group>

          {/* Progress Indicator */}
          {isDirty && progressStats.totalTasks > 0 && (
            <Card
              radius="md"
              p="md"
              style={{
                backgroundColor: currentThemeConfig.backgroundColor,
                borderColor: currentThemeConfig.borderColor,
                border: `1px solid ${currentThemeConfig.borderColor}`
              }}
            >
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    Task Selection Progress
                  </Text>
                  <Text size="sm" c="dimmed">
                    {progressStats.progress}%
                  </Text>
                </Group>
                <Progress
                  value={progressStats.progress}
                  size="sm"
                  color={currentThemeConfig.button.color}
                  radius="xl"
                />
              </Stack>
            </Card>
          )}

          {/* Error Alert */}
          {submitError && (
            <Alert
              icon={<IconAlertCircle size={16} />}
              color="red"
              title="Error"
              variant="light"
              onClose={() => setSubmitError(null)}
              withCloseButton
            >
              {submitError}
            </Alert>
          )}

          {/* Employee Information Section */}
          <Card
            shadow="lg"
            radius="md"
            withBorder
            p="xl"
            style={{
              backgroundColor: currentThemeConfig.backgroundColor,
              borderColor: currentThemeConfig.borderColor
            }}
          >
            <Stack gap="lg">
              <Group gap="sm">
                <IconUser size={20} color={currentThemeConfig.button.color} />
                <Text size="lg" fw={600} c={currentThemeConfig.color}>
                  Employee Information
                </Text>
              </Group>

              <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                {employeeInfoItems.map((item, index) => (
                  <Card
                    key={index}
                    radius="md"
                    p="md"
                    style={{
                      backgroundColor: isDarkTheme
                        ? 'rgba(255,255,255,0.05)'
                        : 'rgba(0,0,0,0.02)',
                      border: `1px solid ${currentThemeConfig.borderColor}`
                    }}
                  >
                    <Stack gap="xs">
                      <Group gap="xs">
                        {getInfoIcon(item.label)}
                        <Text size="sm" c="dimmed">
                          {item.label}
                        </Text>
                      </Group>
                      <Text
                        fw={500}
                        c={currentThemeConfig.color}
                        className="break-words"
                      >
                        {item.value || '-'}
                      </Text>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
          </Card>

          {/* Package Assignment Section */}
          <Card
            shadow="lg"
            radius="md"
            withBorder
            p="xl"
            style={{
              backgroundColor: currentThemeConfig.backgroundColor,
              borderColor: currentThemeConfig.borderColor
            }}
          >
            <Stack gap="lg">
              <Group gap="sm">
                <IconPackage
                  size={20}
                  color={currentThemeConfig.button.color}
                />
                <Text size="lg" fw={600} c={currentThemeConfig.color}>
                  Assign Packages
                </Text>
              </Group>

              <Controller
                name="packagesInfo"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    data={
                      employmentPackagesOptions?.map(pkg => ({
                        value: pkg._id,
                        label: pkg.title
                      })) || []
                    }
                    label="Select Packages"
                    placeholder={
                      !selectedPackages.length
                        ? 'Choose packages to assign'
                        : ''
                    }
                    value={
                      Array.isArray(field.value)
                        ? field.value.map(a => String(a).trim())
                        : []
                    }
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={errors.packagesInfo?.message}
                    clearable
                    searchable
                    size="md"
                    leftSection={<IconPackage size={16} />}
                  />
                )}
              />

              <Group justify="flex-end" mt="md">
                <Button
                  onClick={proceedToTaskSelection}
                  disabled={selectedPackages.length === 0}
                  size="md"
                  rightSection={<IconArrowRight size={16} />}
                  style={{
                    backgroundColor: currentThemeConfig.button.color,
                    color: currentThemeConfig.button.textColor
                  }}
                >
                  Next: Select Tasks
                </Button>
              </Group>
            </Stack>
          </Card>

          {/* Task Selection Modal */}
          <StandardModal
            opened={opened}
            onClose={close}
            size="xl"
            title={
              <Group gap="sm">
                <IconSubtask
                  size={20}
                  color={currentThemeConfig.button.color}
                />
                <Text fw={600} c={currentThemeConfig.color}>
                  Select Tasks for Packages
                </Text>
              </Group>
            }
            centered
          >
            <Stack gap="lg">
              {/* Modal Progress */}
              {progressStats.totalTasks > 0 && (
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                      Overall Progress
                    </Text>
                    <Text size="sm" c="dimmed">
                      {progressStats.selectedTasksCount} of{' '}
                      {progressStats.totalTasks} tasks selected
                    </Text>
                  </Group>
                  <Progress
                    value={progressStats.progress}
                    size="sm"
                    color={currentThemeConfig.button.color}
                    radius="xl"
                  />
                </Stack>
              )}

              <Divider />

              <ScrollArea.Autosize mah={500} className="pr-4">
                <Stack gap="lg">
                  {selectedPackages.map((packageId: string) => {
                    const pkg = employmentPackagesOptions?.find(
                      p => p._id === packageId
                    );
                    if (!pkg) return null;

                    const taskCount = pkg.tasks?.length || 0;
                    const selectedCount = selectedTasks[packageId]?.size || 0;

                    return (
                      <Card
                        key={packageId}
                        radius="md"
                        p="lg"
                        style={{
                          backgroundColor: isDarkTheme
                            ? 'rgba(255,255,255,0.05)'
                            : 'rgba(0,0,0,0.02)',
                          border: `1px solid ${currentThemeConfig.borderColor}`
                        }}
                      >
                        <Stack gap="md">
                          <Group justify="space-between" align="flex-start">
                            <Stack gap="xs">
                              <Group gap="sm">
                                <IconPackage
                                  size={16}
                                  color={currentThemeConfig.button.color}
                                />
                                <Text fw={500} c={currentThemeConfig.color}>
                                  {pkg.title}
                                </Text>
                              </Group>
                              <Group gap="xs">
                                <Badge
                                  variant="light"
                                  color={
                                    selectedCount === taskCount && taskCount > 0
                                      ? 'green'
                                      : currentThemeConfig.button.color
                                  }
                                >
                                  {selectedCount} of {taskCount} selected
                                </Badge>
                                {taskCount === 0 && (
                                  <Badge variant="light" color="gray">
                                    No tasks available
                                  </Badge>
                                )}
                              </Group>
                            </Stack>
                          </Group>

                          {pkg.tasks?.length ? (
                            <Stack gap="sm">
                              {pkg.tasks.map(task => (
                                <Card
                                  key={task._id}
                                  radius="sm"
                                  p="sm"
                                  style={{
                                    backgroundColor: selectedTasks[
                                      packageId
                                    ]?.has(task._id)
                                      ? `${currentThemeConfig.button.color}20`
                                      : 'transparent',
                                    border: `1px solid ${
                                      selectedTasks[packageId]?.has(task._id)
                                        ? currentThemeConfig.button.color
                                        : currentThemeConfig.borderColor
                                    }`
                                  }}
                                >
                                  <Checkbox
                                    label={task.title}
                                    checked={
                                      selectedTasks[packageId]?.has(task._id) ||
                                      false
                                    }
                                    onChange={() =>
                                      handleTaskToggle(packageId, task._id)
                                    }
                                    color={currentThemeConfig.button.color}
                                  />
                                </Card>
                              ))}
                            </Stack>
                          ) : (
                            <Text size="sm" c="dimmed" ta="center" py="md">
                              No tasks available in this package
                            </Text>
                          )}
                        </Stack>
                      </Card>
                    );
                  })}
                </Stack>
              </ScrollArea.Autosize>

              <Group justify="space-between" mt="lg">
                <Button
                  variant="subtle"
                  leftSection={<IconX size={16} />}
                  onClick={close}
                >
                  Cancel
                </Button>

                <Button
                  onClick={onSubmit}
                  loading={isSubmitting}
                  disabled={
                    isSubmitting || progressStats.selectedTasksCount === 0
                  }
                  leftSection={!isSubmitting && <IconCheck size={16} />}
                  loaderProps={{
                    size: 'sm',
                    color: currentThemeConfig.button.textColor
                  }}
                  style={{
                    backgroundColor: currentThemeConfig.button.color,
                    color: currentThemeConfig.button.textColor
                  }}
                >
                  {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                </Button>
              </Group>
            </Stack>
          </StandardModal>

          {/* Assigned Packages Table */}
          {selectedPackagesData && (
            <Card
              shadow="lg"
              radius="md"
              withBorder
              p="xl"
              style={{
                backgroundColor: currentThemeConfig.backgroundColor,
                borderColor: currentThemeConfig.borderColor
              }}
            >
              <Stack gap="lg">
                <Group gap="sm">
                  <IconSubtask
                    size={20}
                    color={currentThemeConfig.button.color}
                  />
                  <Text size="lg" fw={600} c={currentThemeConfig.color}>
                    Assigned Packages & Tasks
                  </Text>
                </Group>

                <PackagesTaskTable
                  organizationConfig={organizationConfig}
                  selectedPackagesData={selectedPackagesData}
                  tasks={tasks}
                  employeeId={employeeId}
                />
              </Stack>
            </Card>
          )}
        </Stack>
      </ThemeBackground>
    </Container>
  );
};

export default PackagesFormComponent;
