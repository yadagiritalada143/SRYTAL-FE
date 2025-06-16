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
import { StandardModal } from '../../../UI/Models/base-model';

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

  return (
    <BgDiv className="space-y-6">
      {/* Employee Information Section */}
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        style={{
          backgroundColor:
            organizationConfig.organization_theme.theme.backgroundColor,
          color: organizationConfig.organization_theme.theme.color,
        }}
        className="w-full"
      >
        <Text size="lg" fw={600} className="mb-4">
          Employee Information
        </Text>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          {employeeInfoItems.map((item, index) => (
            <div key={index} className="w-full break-words space-y-1">
              <Text size="sm" c="dimmed">
                {item.label}
              </Text>
              <Text fw={500} className="text-base break-words">
                {item.value || '-'}
              </Text>
            </div>
          ))}
        </SimpleGrid>
      </Card>

      {/* Package Assignment Section */}
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        style={{
          backgroundColor:
            organizationConfig.organization_theme.theme.backgroundColor,
          color: organizationConfig.organization_theme.theme.color,
        }}
        className="w-full"
      >
        <Text size="lg" fw={600} className="mb-4">
          Assign Packages
        </Text>

        <Controller
          name="packagesInfo"
          control={control}
          render={({ field }) => (
            <MultiSelect
              data={
                employmentPackagesOptions?.map(pkg => ({
                  value: pkg._id,
                  label: pkg.title,
                })) || []
              }
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

        <Group justify="flex-end" mt="md">
          <Button
            onClick={proceedToTaskSelection}
            disabled={selectedPackages.length === 0}
            variant="filled"
            size="md"
          >
            Next: Select Tasks
          </Button>
        </Group>
      </Card>

      {/* Task Selection Modal */}
      <StandardModal
        opened={opened}
        onClose={close}
        size="xl"
        title={<Text fw={600}>Select Tasks for Packages</Text>}
        centered
      >
        <ScrollArea.Autosize mah={500} className="pr-4">
          <Stack gap="md">
            {selectedPackages.map((packageId: string) => {
              const pkg = employmentPackagesOptions?.find(
                p => p._id === packageId
              );
              if (!pkg) return null;

              const taskCount = pkg.tasks?.length || 0;
              const selectedCount = selectedTasks[packageId]?.size || 0;

              return (
                <div key={packageId} className="p-2 rounded-md border">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 w-full">
                    <div>
                      <Text fw={500}>{pkg.title}</Text>
                      <Text size="sm" c="dimmed">
                        {selectedCount} of {taskCount} tasks selected
                      </Text>
                    </div>
                    <Button
                      onClick={() => {
                        openTask();
                        setSelectedPackage(packageId);
                      }}
                      size="sm"
                    >
                      Add Task
                    </Button>
                  </div>

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
                            className="p-1 rounded"
                          />
                        ))}
                      </Stack>
                    ) : (
                      <Text size="sm" mt="sm" c="dimmed">
                        No tasks available in this package
                      </Text>
                    )}
                  </div>
                </div>
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
      </StandardModal>

      {/* Add Task Modal */}
      <StandardModal
        opened={openedAddTask}
        onClose={closeTask}
        title={<Text fw={600}>Add Task for Package</Text>}
        size="lg"
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
      </StandardModal>

      {/* Assigned Packages Table */}
      {selectedPackagesData && (
        <div className="w-full p-4 shadow-sm rounded-md">
          <Text
            c={organizationConfig.organization_theme.theme.backgroundColor}
            size="lg"
            fw={600}
            className="mb-4"
          >
            Assigned Packages & Tasks
          </Text>
          <PackagesTaskTable
            organizationConfig={organizationConfig}
            selectedPackagesData={selectedPackagesData}
            tasks={tasks}
            employeeId={employeeId}
          />
        </div>
      )}
    </BgDiv>
  );
};

export default PackagesFormComponent;
