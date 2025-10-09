import { zodResolver } from '@hookform/resolvers/zod';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  AddCompanyForm,
  addCompanySchema
} from '../../../../forms/add-company';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  Checkbox,
  Select,
  TextInput,
  Title,
  Container,
  Card,
  Stack,
  Group,
  Text,
  Divider,
  Grid,
  Loader,
  Center
} from '@mantine/core';
import {
  getCompanyDetailsByIdByRecruiter,
  updateCompanyByRecruiter
} from '../../../../services/user-services';
import { toast } from 'react-toastify';
import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { userDetailsAtom } from '../../../../atoms/user';
import { themeAtom } from '../../../../atoms/theme';
import { useCustomToast } from '../../../../utils/common/toast';
import PoolCompaniesCommentsTable from './comments';
import AddCommentPoolCompany from './add-comment';
import { deletePoolCompanyByAdmin } from '../../../../services/admin-services';
import { BackButton } from '../../../common/style-components/buttons';
import { StandardModal } from '../../../UI/Models/base-model';
import {
  IconTrash,
  IconDeviceFloppy,
  IconAlertTriangle
} from '@tabler/icons-react';

const UpdateCompany = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const navigate = useNavigate();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const user = useRecoilValue(userDetailsAtom);
  const isDarkTheme = useRecoilValue(themeAtom);
  const [opened, { open, close }] = useDisclosure(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  // Get the current theme configuration
  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

  const [comments, setComments] = useState<
    {
      updateAt: string;
      userId: { firstName: string; lastName: string };
      comment: string;
    }[]
  >([]);
  const { showSuccessToast } = useCustomToast();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    reset
  } = useForm<AddCompanyForm>({
    resolver: zodResolver(addCompanySchema)
  });

  useEffect(() => {
    setIsLoading(true);
    getCompanyDetailsByIdByRecruiter(companyId)
      .then(response => {
        reset(response);
        if (response.comments) {
          setComments(response.comments);
        } else {
          setComments([]);
        }
      })
      .catch(error => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }, [companyId, reset]);

  const onSubmit = async (data: AddCompanyForm) => {
    try {
      await updateCompanyByRecruiter(data, companyId);
      showSuccessToast('Company details updated successfully !');
      navigate(-1);
    } catch (error: any) {
      toast.error(error.response.data.message || 'Something went wrong');
    }
  };

  const handleDeleteCompany = (companyId: string, agreeTerms: boolean) => {
    const payload = {
      companyId: companyId,
      confirmDelete: agreeTerms
    };
    deletePoolCompanyByAdmin(payload)
      .then(() => {
        showSuccessToast('Company deleted successfully!');
        navigate(-1);
      })
      .catch((error: { response?: { data?: { message?: string } } }) => {
        toast.error(error.response?.data?.message || 'Something went wrong');
      });
  };

  if (isLoading) {
    return (
      <Container size="xl" py="xl">
        <Center style={{ minHeight: '60vh' }}>
          <Stack align="center" gap="md">
            <Loader size="xl" />
            <Text>Loading company details...</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="xl" py="md" my="xl" px={isSmallMobile ? 'xs' : 'md'}>
      <Stack gap="md">
        {/* Header Card */}
        <Card shadow="sm" p={isMobile ? 'md' : 'lg'} radius="md" withBorder>
          <Group
            justify="space-between"
            align="center"
            wrap={isMobile ? 'wrap' : 'nowrap'}
          >
            <Title order={isMobile ? 4 : 3} fw={700}>
              Update Company Details
            </Title>
            <BackButton id={companyId} />
          </Group>
        </Card>

        {/* Main Form Card */}
        <Card shadow="sm" p={isMobile ? 'md' : 'lg'} radius="md" withBorder>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="lg">
              {/* Company Name and Status */}
              <Grid gutter="md">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    {...register('companyName')}
                    label="Company Name"
                    disabled
                    error={errors.companyName?.message}
                    size={isMobile ? 'sm' : 'md'}
                    autoComplete="off"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Select Status"
                        placeholder="Pick value"
                        {...field}
                        data={[
                          { value: 'Created', label: 'Created' },
                          { value: 'Followed Up', label: 'Followed Up' },
                          {
                            value: 'Waiting For Response',
                            label: 'Waiting For Response'
                          },
                          { value: 'Not Interested', label: 'Not Interested' },
                          { value: 'On Boarded', label: 'On Boarded' },
                          { value: 'Closed', label: 'Closed' }
                        ]}
                        value={field.value}
                        size={isMobile ? 'sm' : 'md'}
                      />
                    )}
                  />
                </Grid.Col>
              </Grid>

              <Divider />

              {/* Primary Contact */}
              <Card withBorder p="md" radius="md">
                <Stack gap="md">
                  <Text size="lg" fw={600}>
                    Primary Contact
                  </Text>
                  <Grid gutter="md">
                    <Grid.Col span={12}>
                      <TextInput
                        {...register('primaryContact.name')}
                        label="Name"
                        error={errors.primaryContact?.name?.message}
                        size={isMobile ? 'sm' : 'md'}
                        autoComplete="off"
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        {...register('primaryContact.email')}
                        label="Email"
                        error={errors.primaryContact?.email?.message}
                        size={isMobile ? 'sm' : 'md'}
                        autoComplete="off"
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        {...register('primaryContact.phone')}
                        label="Phone"
                        error={errors.primaryContact?.phone?.message}
                        size={isMobile ? 'sm' : 'md'}
                        autoComplete="off"
                      />
                    </Grid.Col>
                  </Grid>
                </Stack>
              </Card>

              {/* Secondary Contacts */}
              <Grid gutter="md">
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Card withBorder p="md" radius="md">
                    <Stack gap="md">
                      <Text size="lg" fw={600}>
                        Secondary Contact 1
                      </Text>
                      <TextInput
                        {...register('secondaryContact_1.name')}
                        label="Name"
                        error={errors.secondaryContact_1?.name?.message}
                        size={isMobile ? 'sm' : 'md'}
                        autoComplete="off"
                      />
                      <TextInput
                        {...register('secondaryContact_1.email')}
                        label="Email"
                        error={errors.secondaryContact_1?.email?.message}
                        size={isMobile ? 'sm' : 'md'}
                        autoComplete="off"
                      />
                      <TextInput
                        {...register('secondaryContact_1.phone')}
                        label="Phone"
                        error={errors.secondaryContact_1?.phone?.message}
                        size={isMobile ? 'sm' : 'md'}
                        autoComplete="off"
                      />
                    </Stack>
                  </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Card withBorder p="md" radius="md">
                    <Stack gap="md">
                      <Text size="lg" fw={600}>
                        Secondary Contact 2
                      </Text>
                      <TextInput
                        {...register('secondaryContact_2.name')}
                        label="Name"
                        error={errors.secondaryContact_2?.name?.message}
                        size={isMobile ? 'sm' : 'md'}
                        autoComplete="off"
                      />
                      <TextInput
                        {...register('secondaryContact_2.email')}
                        label="Email"
                        error={errors.secondaryContact_2?.email?.message}
                        size={isMobile ? 'sm' : 'md'}
                        autoComplete="off"
                      />
                      <TextInput
                        {...register('secondaryContact_2.phone')}
                        label="Phone"
                        autoComplete="off"
                        error={errors.secondaryContact_2?.phone?.message}
                        size={isMobile ? 'sm' : 'md'}
                      />
                    </Stack>
                  </Card>
                </Grid.Col>
              </Grid>

              <Divider />

              {/* Action Buttons */}
              <Group
                justify="space-between"
                wrap={isMobile ? 'wrap' : 'nowrap'}
              >
                <Button
                  color="red"
                  variant="filled"
                  leftSection={<IconTrash size={16} />}
                  onClick={e => {
                    e.preventDefault();
                    open();
                  }}
                  fullWidth={isMobile}
                  size={isMobile ? 'md' : 'sm'}
                >
                  Delete Company
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  leftSection={<IconDeviceFloppy size={16} />}
                  fullWidth={isMobile}
                  size={isMobile ? 'md' : 'sm'}
                >
                  {isSubmitting ? 'Updating...' : 'Update Company'}
                </Button>
              </Group>
            </Stack>
          </form>
        </Card>

        {/* Add Comment Section */}
        <AddCommentPoolCompany
          comments={comments}
          setComments={setComments}
          user={user}
          companyId={companyId}
          isMobile={isMobile}
        />

        {/* Comments Table */}
        <PoolCompaniesCommentsTable
          organizationConfig={organizationConfig}
          comments={comments}
          currentThemeConfig={currentThemeConfig}
          isMobile={isMobile}
        />
      </Stack>

      {/* Delete Confirmation Modal */}
      <StandardModal
        title={
          <Group gap="xs">
            <IconAlertTriangle size={24} color="red" />
            <Title order={3} c="red">
              Delete Action
            </Title>
          </Group>
        }
        size="md"
        opened={opened}
        onClose={close}
      >
        <Stack gap="md">
          <Text size="lg" fw={600}>
            Sure want to delete this Company?
          </Text>
          <Text c="dimmed">
            Please be aware of doing this action! Deleting company is an
            un-reversible action and you should be aware while doing this.
          </Text>

          <Stack gap="sm" mt="md">
            <Checkbox
              label="I understand what are the consequences of doing this action!"
              checked={confirmDelete}
              onChange={e => setConfirmDelete(e.currentTarget.checked)}
              required
            />
            <Checkbox
              label="I understand that this employee details are not a part of our application forever. I agreed to the Terms and Conditions to perform this action"
              checked={agreeTerms}
              onChange={e => setAgreeTerms(e.currentTarget.checked)}
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Button
              color="red"
              onClick={() => handleDeleteCompany(companyId!, agreeTerms)}
              disabled={!confirmDelete}
              leftSection={<IconTrash size={16} />}
            >
              Delete
            </Button>
            <Button variant="default" onClick={close}>
              Cancel
            </Button>
          </Group>
        </Stack>
      </StandardModal>
    </Container>
  );
};

export default UpdateCompany;
