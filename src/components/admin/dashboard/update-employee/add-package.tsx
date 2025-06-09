import { useState, useEffect } from 'react';
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
  Modal,
  ScrollArea,
  SimpleGrid,
} from '@mantine/core';
import { useCustomToast } from '../../../../utils/common/toast';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  employeeDetailsAtom,
  employeePackagesAtom,
} from '../../../../atoms/employee-atom';
import { userDetailsAtom } from '../../../../atoms/user';

import {
  addPackagetoEmployeeByAdmin,
  getAllPackagesByAdmin,
  getEmployeePackagesByAdmin,
} from '../../../../services/admin-services';

import { employeePackageSchema } from '../../../../forms/update-employee';
import AddTasksPackage from '../update-package/add-tasks';
import PackagesTaskTable from './table-tasks';

import {
  EmployeePackageForm,
  FormattedPackageData,
  PackagesFormProps,
  SelectedTasks,
} from './interfaces/add-package';
import {
  fetchInitialData,
  loadEmployeePackages,
  formatSubmitData,
  getEmployeeInfoItems,
} from './helper-functions/add-package';
import { Task } from '../../../../interfaces/package';
import { BgDiv } from '../../../common/style-components/bg-div';

const PackagesFormComponent = ({
  organizationConfig,
  employeeId,
}: PackagesFormProps) => {
  const [employmentPackagesOptions, setEmploymentPackagesOptions] =
    useRecoilState(employeePackagesAtom);
  const [employeeDetails, setEmployeeDetails] =
    useRecoilState(employeeDetailsAtom);
  const [isLoading, setIsLoading] = useState(true);
  const { showSuccessToast } = useCustomToast();
  const [opened, { open, close }] = useDisclosure(false);
  const user = useRecoilValue(userDetailsAtom);
  const [openedAddTask, { close: closeTask, open: openTask }] =
    useDisclosure(false);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [tasks] = useState<Task[]>([]);
  const [selectedPackagesData, setSelectedPackagesData] =
    useState<FormattedPackageData>();
  const [selectedTasks, setSelectedTasks] = useState<SelectedTasks>({});

  const {
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmployeePackageForm>({
    resolver: zodResolver(employeePackageSchema),
    defaultValues: {
      packagesInfo: [],
    },
  });

  const selectedPackages = watch('packagesInfo') || [];

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchInitialData(
          employeeId,
          setEmployeeDetails,
          setEmploymentPackagesOptions,
          employmentPackagesOptions
        );
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [
    employeeId,
    employmentPackagesOptions,
    setEmployeeDetails,
    setEmploymentPackagesOptions,
  ]);

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
        toast.error(error.message);
      }
    };
    loadInitialEmployeePackages();
  }, [employeeId, reset]);

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
      toast.warning('Please select at least one package');
      return;
    }

    open();
  };

  const onSubmit = async () => {
    try {
      const formattedData = formatSubmitData(
        selectedPackages,
        employmentPackagesOptions,
        selectedTasks,
        employeeId
      );

      if (formattedData.packages.length === 0) {
        toast.warning('Please select at least one task');
        return;
      }

      setSelectedPackagesData(formattedData);
      await addPackagetoEmployeeByAdmin(formattedData);
      showSuccessToast('Packages and tasks updated successfully!');

      const updatedData = await getEmployeePackagesByAdmin(employeeId);
      setSelectedPackagesData(updatedData);
      close();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || 'Failed to update packages'
      );
    }
  };

  if (isLoading) {
    return (
      <BgDiv>
        <div className="flex justify-center items-center h-64">
          <Loader size="xl" />
        </div>
      </BgDiv>
    );
  }

  const employeeInfoItems = getEmployeeInfoItems(employeeDetails);
  console.log(selectedPackage);
  return (
    <BgDiv>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        style={{
          backgroundColor:
            organizationConfig.organization_theme.theme.backgroundColor,
          color: organizationConfig.organization_theme.theme.color,
          maxWidth: '100%',
          width: '100%',
        }}
      >
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          {employeeInfoItems.map((item, index) => (
            <div key={index} className="w-full break-words">
              <Text size="sm">{item.label}</Text>
              <Text fw={500} className="text-base break-words">
                {item.value || '-'}
              </Text>
            </div>
          ))}
        </SimpleGrid>

        <div className="mt-6">
          <Controller
            name="packagesInfo"
            control={control}
            render={({ field }) => (
              <MultiSelect
                data={employmentPackagesOptions.map(pkg => ({
                  value: pkg._id,
                  label: pkg.title,
                }))}
                label="Select Packages"
                placeholder={
                  !selectedPackages.length ? 'Choose packages to assign' : ''
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
                className="w-full"
              />
            )}
          />

          <Group justify="flex-end" mt="md" className="mb-4">
            <Button
              onClick={proceedToTaskSelection}
              disabled={selectedPackages.length === 0}
              variant="filled"
            >
              Next: Select Tasks
            </Button>
          </Group>
        </div>
      </Card>

      {/* Task Selection Modal */}
      <Modal
        opened={opened}
        onClose={() => {
          close();
        }}
        size="xl"
        title={<Text fw={600}>Select Tasks for Packages</Text>}
        centered
      >
        <ScrollArea.Autosize mah={500}>
          <Stack gap="md">
            {selectedPackages.map((packageId: string) => {
              const pkg = employmentPackagesOptions.find(
                p => p._id === packageId
              );
              if (!pkg) return null;

              const taskCount = pkg.tasks?.length || 0;
              const selectedCount = selectedTasks[packageId]?.size || 0;

              return (
                <Card
                  key={packageId}
                  shadow="xs"
                  padding="sm"
                  radius="md"
                  withBorder
                >
                  <div className="flex justify-between items-center w-full ">
                    <Text fw={500}>{pkg.title}</Text>
                    <Button
                      bg={
                        organizationConfig.organization_theme.theme
                          .backgroundColor
                      }
                      c={organizationConfig.organization_theme.theme.color}
                      onClick={() => {
                        openTask();
                        setSelectedPackage(packageId);
                      }}
                    >
                      Add Task
                    </Button>
                  </div>
                  <Text size="sm" c="dimmed">
                    {selectedCount} of {taskCount} tasks selected
                  </Text>

                  <div className="mt-3 space-y-2">
                    {pkg.tasks?.length ? (
                      <Stack gap="xs">
                        {pkg.tasks.map(task => (
                          <Checkbox
                            key={task._id}
                            label={task.title}
                            checked={
                              selectedTasks[packageId]?.has(task._id) || false
                            }
                            onChange={() =>
                              handleTaskToggle(packageId, task._id)
                            }
                            className=" p-1 rounded"
                          />
                        ))}
                      </Stack>
                    ) : (
                      <Text size="sm" mt="sm">
                        No tasks available in this package
                      </Text>
                    )}
                  </div>
                </Card>
              );
            })}
          </Stack>
        </ScrollArea.Autosize>

        <Group justify="flex-end" mt="md">
          <Button
            onClick={onSubmit}
            loading={isSubmitting}
            disabled={isSubmitting}
            bg={organizationConfig.organization_theme.theme.backgroundColor}
            c={organizationConfig.organization_theme.theme.color}
          >
            Save Changes
          </Button>
        </Group>
      </Modal>

      {/* Add Task Modal */}
      <Modal
        opened={openedAddTask}
        onClose={closeTask}
        title={<Text fw={600}>Add Task for Package</Text>}
      >
        <AddTasksPackage
          organizationConfig={organizationConfig}
          user={user}
          packageId={selectedPackage}
          required={true}
          fetchPackageDetails={() => {
            getAllPackagesByAdmin().then(packages => {
              setEmploymentPackagesOptions(packages);
            });
            closeTask();
          }}
        />
      </Modal>

      {/* Packages Task Table */}
      <div className="mt-6">
        <PackagesTaskTable
          organizationConfig={organizationConfig}
          selectedPackagesData={selectedPackagesData}
          tasks={tasks}
          employeeId={selectedPackagesData?.employeeId || ''}
        />
      </div>
    </BgDiv>
  );
};

export default PackagesFormComponent;
