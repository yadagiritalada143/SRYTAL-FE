import { useState, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
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
  Box
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
  IconSubtask
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
import { BackButton } from '../../../common/style-components/buttons';

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
  const [selectedTasks, setSelectedTasks] = useState<SelectedTasks>({}); // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

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
      <Container
        size="lg"
        py={isMobile ? 'md' : 'xl'}
        px={isMobile ? 'xs' : undefined}
      >
        <ThemeBackground>
          <Card
            shadow="lg"
            radius="md"
            withBorder
            p={isMobile ? 'md' : 'xl'}
            style={{
              backgroundColor: currentThemeConfig.backgroundColor,
              borderColor: currentThemeConfig.borderColor
            }}
          >
            <div className="flex justify-center items-center h-64">
              <Stack align="center" gap="md">
                <Loader
                  size={isMobile ? 'lg' : 'xl'}
                  color={currentThemeConfig.button.color}
                />
                <Text
                  size={isMobile ? 'md' : 'lg'}
                  c={currentThemeConfig.color}
                >
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
    const iconSize = isMobile ? 14 : 16;
    switch (label) {
      case 'Name':
        return <IconUser size={iconSize} />;
      case 'Email':
        return <IconMail size={iconSize} />;
      case 'Phone':
        return <IconPhone size={iconSize} />;
      case 'Join Date':
        return <IconCalendar size={iconSize} />;
      case 'Role':
        return <IconBriefcase size={iconSize} />;
      default:
        return <IconUser size={iconSize} />;
    }
  };

  return (
    <Container
      size="lg"
      py={isMobile ? 'md' : 'xl'}
      px={isMobile ? 'xs' : 'md'}
    >
      <ThemeBackground>
        <Stack gap={isMobile ? 'md' : 'xl'}>
          {/* Header */}
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group
              justify="space-between"
              align="flex-start"
              wrap={isMobile ? 'wrap' : 'nowrap'}
            >
              <Stack gap="xs" style={{ flex: isMobile ? '1 1 100%' : 'auto' }}>
                <Group gap="sm">
                  <IconPackages
                    size={isMobile ? 20 : 24}
                    color={currentThemeConfig.button.color}
                  />
                  <Text
                    size={isMobile ? 'lg' : 'xl'}
                    fw={700}
                    c={currentThemeConfig.color}
                  >
                    Package Assignment
                  </Text>
                </Group>
                <Text size={isMobile ? 'xs' : 'sm'} c="dimmed">
                  Assign packages and tasks to the employee
                </Text>
              </Stack>

              <Box style={{ marginTop: isMobile ? '1rem' : 0 }}>
                {progressStats.packages > 0 && (
                  <Group
                    gap="xs"
                    justify={isMobile ? 'flex-start' : 'flex-end'}
                    wrap="wrap"
                  >
                    <Badge
                      variant="light"
                      color={currentThemeConfig.button.color}
                      size={isMobile ? 'sm' : 'md'}
                    >
                      {progressStats.packages} Package
                      {progressStats.packages !== 1 ? 's' : ''}
                    </Badge>
                    <Badge
                      variant="light"
                      color="blue"
                      size={isMobile ? 'sm' : 'md'}
                    >
                      {progressStats.selectedTasksCount}/
                      {progressStats.totalTasks} Tasks
                    </Badge>
                  </Group>
                )}
                <Group
                  mt="md"
                  gap="xs"
                  justify={isMobile ? 'flex-start' : 'center'}
                >
                  <BackButton id={employeeId} />
                </Group>
              </Box>
            </Group>
          </Card>

          {/* Progress Indicator */}
          {isDirty && progressStats.totalTasks > 0 && (
            <Card
              radius="md"
              p={isMobile ? 'sm' : 'md'}
              style={{
                backgroundColor: currentThemeConfig.backgroundColor,
                borderColor: currentThemeConfig.borderColor,
                border: `1px solid ${currentThemeConfig.borderColor}`
              }}
            >
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size={isMobile ? 'xs' : 'sm'} c="dimmed">
                    Task Selection Progress
                  </Text>
                  <Text size={isMobile ? 'xs' : 'sm'} c="dimmed">
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
            p={isMobile ? 'md' : 'lg'}
            style={{
              backgroundColor: currentThemeConfig.backgroundColor,
              borderColor: currentThemeConfig.borderColor
            }}
          >
            <Stack gap={isMobile ? 'md' : 'lg'}>
              <Group gap="sm">
                <IconUser
                  size={isMobile ? 18 : 20}
                  color={currentThemeConfig.button.color}
                />
                <Text
                  size={isMobile ? 'md' : 'lg'}
                  fw={600}
                  c={currentThemeConfig.color}
                >
                  Employee Information
                </Text>
              </Group>

              <SimpleGrid
                cols={{ base: 1, xs: 1, sm: 2, md: 2, lg: 3 }}
                spacing={isMobile ? 'md' : 'lg'}
              >
                {employeeInfoItems.map((item, index) => (
                  <Card
                    key={index}
                    radius="md"
                    p={isMobile ? 'sm' : 'md'}
                    style={{
                      border: `1px solid ${currentThemeConfig.borderColor}`
                    }}
                  >
                    <Stack gap="xs">
                      <Group gap="xs">
                        {getInfoIcon(item.label)}
                        <Text size={isMobile ? 'xs' : 'sm'} c="dimmed">
                          {item.label}
                        </Text>
                      </Group>
                      <Text
                        size={isMobile ? 'sm' : 'md'}
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
            p={isMobile ? 'md' : 'lg'}
            style={{
              backgroundColor: currentThemeConfig.backgroundColor,
              borderColor: currentThemeConfig.borderColor
            }}
          >
            <Stack gap={isMobile ? 'md' : 'lg'}>
              <Group gap="sm">
                <IconPackage
                  size={isMobile ? 18 : 20}
                  color={currentThemeConfig.button.color}
                />
                <Text
                  size={isMobile ? 'md' : 'lg'}
                  fw={600}
                  c={currentThemeConfig.color}
                >
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
                    size={isMobile ? 'sm' : 'md'}
                    leftSection={<IconPackage size={isMobile ? 14 : 16} />}
                  />
                )}
              />

              <Group justify="flex-end" mt="md">
                <Button
                  onClick={proceedToTaskSelection}
                  disabled={selectedPackages.length === 0}
                  size={isMobile ? 'sm' : 'md'}
                  fullWidth={isSmallMobile}
                  rightSection={<IconArrowRight size={isMobile ? 14 : 16} />}
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
            size={isMobile ? 'full' : isTablet ? 'lg' : 'xl'}
            title={
              <Group gap="sm">
                <IconSubtask
                  size={isMobile ? 18 : 20}
                  color={currentThemeConfig.button.color}
                />
                <Text
                  size={isMobile ? 'sm' : 'md'}
                  fw={600}
                  c={currentThemeConfig.color}
                >
                  Select Tasks for Packages
                </Text>
              </Group>
            }
            centered
            fullScreen={isSmallMobile}
          >
            <Stack gap={isMobile ? 'md' : 'lg'}>
              {/* Modal Progress */}
              {progressStats.totalTasks > 0 && (
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size={isMobile ? 'xs' : 'sm'} c="dimmed">
                      Overall Progress
                    </Text>
                    <Text size={isMobile ? 'xs' : 'sm'} c="dimmed">
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

              <ScrollArea.Autosize
                mah={isMobile ? 400 : 500}
                className={isMobile ? 'pr-2' : 'pr-4'}
              >
                <Stack gap={isMobile ? 'md' : 'lg'}>
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
                        p={isMobile ? 'md' : 'lg'}
                        style={{
                          border: `1px solid ${currentThemeConfig.borderColor}`
                        }}
                      >
                        <Stack gap={isMobile ? 'sm' : 'md'}>
                          <Group
                            justify="space-between"
                            align="flex-start"
                            wrap="wrap"
                          >
                            <Stack gap="xs" style={{ flex: 1 }}>
                              <Group gap="sm">
                                <IconPackage
                                  size={isMobile ? 14 : 16}
                                  color={currentThemeConfig.button.color}
                                />
                                <Text
                                  size={isMobile ? 'sm' : 'md'}
                                  fw={500}
                                  c={currentThemeConfig.color}
                                >
                                  {pkg.title}
                                </Text>
                              </Group>
                              <Group gap="xs" wrap="wrap">
                                <Badge
                                  variant="light"
                                  size={isMobile ? 'sm' : 'md'}
                                  color={
                                    selectedCount === taskCount && taskCount > 0
                                      ? 'green'
                                      : currentThemeConfig.button.color
                                  }
                                >
                                  {selectedCount} of {taskCount} selected
                                </Badge>
                                {taskCount === 0 && (
                                  <Badge
                                    variant="light"
                                    color="gray"
                                    size={isMobile ? 'sm' : 'md'}
                                  >
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
                                  p={isMobile ? 'xs' : 'sm'}
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
                                    size={isMobile ? 'sm' : 'md'}
                                    styles={{
                                      label: {
                                        fontSize: isMobile
                                          ? '0.875rem'
                                          : undefined
                                      }
                                    }}
                                  />
                                </Card>
                              ))}
                            </Stack>
                          ) : (
                            <Text
                              size={isMobile ? 'xs' : 'sm'}
                              c="dimmed"
                              ta="center"
                              py="md"
                            >
                              No tasks available in this package
                            </Text>
                          )}
                        </Stack>
                      </Card>
                    );
                  })}
                </Stack>
              </ScrollArea.Autosize>

              <Group
                justify="space-between"
                mt="lg"
                style={{
                  flexDirection: isSmallMobile ? 'column-reverse' : 'row',
                  gap: isSmallMobile ? '0.5rem' : undefined
                }}
              >
                <Button
                  variant="subtle"
                  leftSection={<IconX size={isMobile ? 14 : 16} />}
                  onClick={close}
                  size={isMobile ? 'sm' : 'md'}
                  fullWidth={isSmallMobile}
                >
                  Cancel
                </Button>

                <Button
                  onClick={onSubmit}
                  loading={isSubmitting}
                  disabled={
                    isSubmitting || progressStats.selectedTasksCount === 0
                  }
                  leftSection={
                    !isSubmitting && <IconCheck size={isMobile ? 14 : 16} />
                  }
                  loaderProps={{
                    size: 'sm',
                    color: currentThemeConfig.button.textColor
                  }}
                  size={isMobile ? 'sm' : 'md'}
                  fullWidth={isSmallMobile}
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
              p={isMobile ? 'md' : 'lg'}
              style={{
                backgroundColor: currentThemeConfig.backgroundColor,
                borderColor: currentThemeConfig.borderColor
              }}
            >
              <Stack gap={isMobile ? 'md' : 'lg'}>
                <Group gap="sm">
                  <IconSubtask
                    size={isMobile ? 18 : 20}
                    color={currentThemeConfig.button.color}
                  />
                  <Text
                    size={isMobile ? 'md' : 'lg'}
                    fw={600}
                    c={currentThemeConfig.color}
                  >
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
