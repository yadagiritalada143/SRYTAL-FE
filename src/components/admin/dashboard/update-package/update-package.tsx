import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextInput,
  Button,
  Textarea,
  Loader,
  MultiSelect,
  Container,
  Card,
  Stack,
  Group,
  Text,
  Flex,
  ActionIcon,
  Tooltip,
  Center
} from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateInput } from '@mantine/dates';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { toast } from 'react-toastify';
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconTrash,
  IconPackage
} from '@tabler/icons-react';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { userDetailsAtom } from '../../../../atoms/user';
import {
  packageSchema,
  PackageUpdateForm
} from '../../../../forms/update-package';
import {
  deletePackageByAdmin,
  getAllEmployeeDetailsByAdmin,
  getPackageDetailsByAdmin,
  updatePackageByAdmin
} from '../../../../services/admin-services';
import { useCustomToast } from '../../../../utils/common/toast';
import { DeletePackageModel } from './delete-models';
import AddTasksPackage from './add-tasks';
import PackageTasksTable from './tasks';

const UpdatePackage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const params = useParams();
  const packageId = params.packageId as string;
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [approversOptions, setApproversOptions] = useState([]);
  const { showSuccessToast } = useCustomToast();
  const user = useRecoilValue(userDetailsAtom);
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<PackageUpdateForm>({
    resolver: zodResolver(packageSchema)
  });

  const fetchPackageDetails = useCallback(async () => {
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
        startDate: packageDetails.startDate
          ? new Date(packageDetails.startDate)
          : null,
        endDate: packageDetails.endDate
          ? new Date(packageDetails.endDate)
          : null
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || 'Failed to fetch package details.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [packageId, reset]);

  useEffect(() => {
    fetchPackageDetails();
  }, [fetchPackageDetails]);

  useEffect(() => {
    const fetchApprovers = async () => {
      try {
        const response = await getAllEmployeeDetailsByAdmin();
        const filterApprovers = response.map(
          (approver: { _id: string; firstName: string; lastName: string }) => ({
            value: approver._id,
            label: `${approver.firstName} ${approver.lastName}`
          })
        );
        setApproversOptions(filterApprovers);
      } catch (error: any) {
        console.log(error);
        toast.error('Failed to fetch approvers.');
      }
    };
    fetchApprovers();
  }, []);

  const handleDeletePackage = (hardDelete: boolean) => {
    if (!packageId) {
      toast.error('Invalid package ID.');
      return;
    }
    deletePackageByAdmin(packageId, hardDelete)
      .then(() => {
        showSuccessToast('Package deleted successfully!');
        navigate(-1);
      })
      .catch(error => {
        toast.error(error?.response?.data?.message || 'Something went wrong');
      });
  };

  const onSubmit = async (data: PackageUpdateForm) => {
    if (!packageId) return;

    try {
      setIsLoading(true);
      await updatePackageByAdmin(packageId, data);
      showSuccessToast('Package updated successfully!');
      navigate(-1);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="xl" py="md" my="xl" px={isSmallMobile ? 'xs' : 'md'}>
      {isLoading ? (
        <Center style={{ minHeight: '400px' }}>
          <Stack align="center" gap="md">
            <Loader size="xl" />
            <Text>Loading package details...</Text>
          </Stack>
        </Center>
      ) : (
        <Stack gap="md">
          {/* Header Card */}
          <Card shadow="sm" p={isMobile ? 'md' : 'lg'} radius="md" withBorder>
            <Flex
              direction={isMobile ? 'column' : 'row'}
              justify="space-between"
              align="center"
              gap="md"
            >
              <Group gap="sm">
                <Tooltip label="Go Back">
                  <ActionIcon
                    variant="subtle"
                    size="lg"
                    onClick={() => navigate(-1)}
                  >
                    <IconArrowLeft size={20} />
                  </ActionIcon>
                </Tooltip>
                <Group gap="xs">
                  <IconPackage size={24} />
                  <Text size={isMobile ? 'lg' : 'xl'} fw={700}>
                    Update Package
                  </Text>
                </Group>
              </Group>
            </Flex>
          </Card>

          {/* Form Card */}
          <Card shadow="sm" p={isMobile ? 'md' : 'lg'} radius="md" withBorder>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap="md">
                <TextInput
                  label="Title"
                  placeholder="Enter package title"
                  {...register('title')}
                  error={errors.title?.message}
                  size="md"
                  required
                />

                <Textarea
                  label="Description"
                  placeholder="Enter package description"
                  {...register('description')}
                  error={errors.description?.message}
                  minRows={4}
                  size="md"
                  required
                />

                <Controller
                  name="approvers"
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      data={approversOptions}
                      label="Approvers"
                      placeholder="Select approvers"
                      value={
                        Array.isArray(field.value)
                          ? field.value.map(a => String(a).trim())
                          : []
                      }
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.approvers?.message}
                      size="md"
                      searchable
                      clearable
                    />
                  )}
                />

                <Group grow={isMobile}>
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <DateInput
                        label="Start Date"
                        placeholder="Pick a date"
                        value={field.value || null}
                        onChange={field.onChange}
                        error={errors.startDate?.message}
                        valueFormat="YYYY-MM-DD"
                        size="md"
                        clearable
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                      <DateInput
                        label="End Date"
                        placeholder="Pick a date"
                        value={field.value || null}
                        onChange={field.onChange}
                        error={errors.endDate?.message}
                        valueFormat="YYYY-MM-DD"
                        size="md"
                        clearable
                      />
                    )}
                  />
                </Group>

                <Group justify="space-between" mt="lg">
                  <Button
                    color="red"
                    variant="outline"
                    leftSection={<IconTrash size={16} />}
                    onClick={open}
                    fullWidth={isMobile}
                  >
                    Delete Package
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    leftSection={<IconDeviceFloppy size={16} />}
                    fullWidth={isMobile}
                  >
                    {isLoading ? 'Updating...' : 'Update Package'}
                  </Button>
                </Group>
              </Stack>
            </form>
          </Card>

          {/* Add Tasks Component */}
          <AddTasksPackage
            organizationConfig={organizationConfig}
            user={user}
            packageId={packageId}
            required={true}
            fetchPackageDetails={fetchPackageDetails}
          />

          {/* Tasks Table Component */}
          <PackageTasksTable
            organizationConfig={organizationConfig}
            tasks={tasks}
            fetchPackageDetails={fetchPackageDetails}
          />
        </Stack>
      )}

      <DeletePackageModel
        agreeTerms={agreeTerms}
        close={close}
        opened={opened}
        confirmDelete={confirmDelete}
        handleDeletePackage={handleDeletePackage}
        setAgreeTerms={setAgreeTerms}
        setConfirmDelete={setConfirmDelete}
      />
    </Container>
  );
};

export default UpdatePackage;
