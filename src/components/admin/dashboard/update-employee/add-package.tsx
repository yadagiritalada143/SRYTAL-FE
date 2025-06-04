import { Controller, useForm } from 'react-hook-form';
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
import { BgDiv } from '../../../common/style-components/bg-div';
import { OrganizationConfig } from '../../../../interfaces/organization';
import { useCustomToast } from '../../../../utils/common/toast';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  employeeDetailsAtom,
  employeePackagesAtom,
} from '../../../../atoms/employee-atom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  addPackagetoEmployeeByAdmin,
  getAllPackagesByAdmin,
  getEmployeeDetailsByAdmin,
  getEmployeePackagesByAdmin,
  getPackageDetailsByAdmin,
} from '../../../../services/admin-services';
import {
  EmployeePackageForm,
  employeePackageSchema,
} from '../../../../forms/update-employee';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDisclosure } from '@mantine/hooks';
import AddTasksPackage from '../update-package/add-tasks';
import { userDetailsAtom } from '../../../../atoms/user';
import PackagesTaskTable from './table-tasks';

const PackagesFormComponent = ({
  organizationConfig,
  employeeId,
}: {
  organizationConfig: OrganizationConfig;
  employeeId: string;
}) => {
  const [employmentPackagesOptions, setEmploymentPackagesOptions] =
    useRecoilState(employeePackagesAtom);
  const [employeeDetailsById, setEmployeeDetails] =
    useRecoilState(employeeDetailsAtom);
  const [isLoading, setIsLoading] = useState(true);
  const { showSuccessToast } = useCustomToast();
  const [opened, { open, close }] = useDisclosure(false);
  const user = useRecoilValue(userDetailsAtom);
  const [openedAddTask, { close: closeTask }] = useDisclosure(false);
  const [selectedPackage] = useState('');
  const [tasks, setTasks] = useState<
    {
      packageId: string;
      tasks: string;
    }[]
  >([]);
  const [selectedPackagesData, setSelectedPackagesData] = useState<{
    employeeId: string;
    packages: {
      packageId: string;
      tasks: { taskId: string }[];
    }[];
  }>();

  const fetchPackageDetails = async (packageId: string) => {
    if (!packageId) return;
    setIsLoading(true);
    try {
      const packageDetails = await getPackageDetailsByAdmin(packageId);
      if (!packageDetails) {
        toast.error('Package not found.');
        return;
      }
      setTasks(packageDetails.tasks);
      reset({
        ...packageDetails,
        approvers: packageDetails.approvers?.map((a: any) => a._id),
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || 'Failed to fetch package details.'
      );
    } finally {
      setIsLoading(false);
    }
  };

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

  const [sltdPackageId, setSltdPackageId] = useState<string>('');
  const selectedPackages = watch('packagesInfo') || [];
  const [selectedTasks, setSelectedTasks] = useState<
    Record<string, Set<string>>
  >({});
  const [, setCurrentStep] = useState<'select-packages' | 'select-tasks'>(
    'select-packages'
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [employeeDetails, packages] = await Promise.all([
          getEmployeeDetailsByAdmin(employeeId),
          employmentPackagesOptions.length === 0
            ? getAllPackagesByAdmin()
            : Promise.resolve(employmentPackagesOptions),
        ]);

        setEmployeeDetails(employeeDetails);
        if (employmentPackagesOptions.length === 0) {
          setEmploymentPackagesOptions(packages);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [
    employeeId,
    setEmployeeDetails,
    employmentPackagesOptions,
    setEmploymentPackagesOptions,
  ]);

  useEffect(() => {
    const loadInitialEmployeePackages = async () => {
      try {
        const data = await getEmployeePackagesByAdmin(employeeId);
        setSelectedPackagesData(data);
      } catch (error) {
        console.error('Failed to fetch employee packages:', error);
        toast.error('Failed to fetch employee packages');
      }
    };
    loadInitialEmployeePackages();
  }, [employeeId]);

  const handleTaskToggle = (pkg: any, task: any) => {
    setSelectedTasks(prev => {
      const newSelectedTasks = { ...prev };
      const currentSet = new Set(prev[pkg._id] || []);
      if (currentSet.has(task._id)) {
        currentSet.delete(task._id);
      } else {
        currentSet.add(task._id);
      }
      newSelectedTasks[pkg._id] = currentSet;
      return newSelectedTasks;
    });
  };

  const proceedToTaskSelection = () => {
    if (selectedPackages.length === 0) {
      toast.warning('Please select at least one package');
      return;
    }
    setCurrentStep('select-tasks');
    open();
  };

  const onSubmit = async () => {
    try {
      const formattedData = {
        employeeId: employeeId,
        packages: selectedPackages
          .map(selectedPackageId => {
            const packageData = employmentPackagesOptions.find(
              pkg => pkg._id === selectedPackageId
            );
            const selectedTaskIds =
              selectedTasks[selectedPackageId] || new Set();
            setSltdPackageId(selectedPackageId);
            return {
              packageId: selectedPackageId,
              title: packageData?.title,
              tasks: (packageData?.tasks || [])
                .filter(task => selectedTaskIds.has(task._id))
                .map(task => ({
                  taskId: task._id,
                  title: task.title,
                })),
            };
          })
          .filter(pkg => pkg.tasks.length > 0),
      };
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

  return (
    <div>
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
          <Stack gap="md">
            <SimpleGrid cols={2} spacing="xl">
              <div>
                <Text size="sm">First Name</Text>
                <Text fw={500}>{employeeDetailsById?.firstName || '-'}</Text>
              </div>
              <div>
                <Text size="sm">Last Name</Text>
                <Text fw={500}>{employeeDetailsById?.lastName || '-'}</Text>
              </div>
              <div>
                <Text size="sm">Email</Text>
                <Text fw={500}>{employeeDetailsById?.email || '-'}</Text>
              </div>
              <div>
                <Text size="sm">Employee ID</Text>
                <Text fw={500}>{employeeDetailsById?.employeeId || '-'}</Text>
              </div>
            </SimpleGrid>
            <>
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
                    placeholder={`${!selectedPackages.length ? 'Choose packages to assign' : ''}`}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={errors.packagesInfo?.message}
                    clearable
                    searchable
                  />
                )}
              />

              <Group justify="flex-end" mt="md" className="mb-">
                <Button
                  onClick={proceedToTaskSelection}
                  disabled={selectedPackages.length === 0}
                >
                  Next: Select Tasks
                </Button>
              </Group>
            </>
          </Stack>
        </Card>
        <Modal
          opened={opened}
          onClose={() => {
            close();
            setCurrentStep('select-packages');
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
                    <div className="flex justify-between items-center">
                      <div>
                        <Text fw={500}>{pkg.title}</Text>
                        <Text size="sm" c="dimmed">
                          {selectedCount} of {taskCount} tasks selected
                        </Text>
                      </div>
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
                              onChange={() => handleTaskToggle(pkg, task)}
                            />
                          ))}
                        </Stack>
                      ) : (
                        <Text size="sm" c="dimmed" mt="sm">
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
              variant="default"
              onClick={() => {
                close();
                setCurrentStep('select-packages');
              }}
              bg={organizationConfig.organization_theme.theme.backgroundColor}
              c={organizationConfig.organization_theme.theme.color}
            >
              Back
            </Button>
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
        <Group>
          <PackagesTaskTable
            organizationConfig={organizationConfig}
            selectedPackagesData={selectedPackagesData}
            tasks={tasks}
            fetchPackageDetails={() => {
              fetchPackageDetails(sltdPackageId);
            }}
            employeeId={selectedPackagesData?.employeeId || ''}
          />
        </Group>
      </BgDiv>
    </div>
  );
};

export default PackagesFormComponent;
