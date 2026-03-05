import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { AddCompanyForm, addCompanySchema } from '@forms/add-company';
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
  Center
} from '@mantine/core';
import PremiumLoader from '@components/common/loaders/PremiumLoader';
import DataView from '@components/common/loaders/DataView';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userDetailsAtom } from '@atoms/user';
import { useCustomToast } from '@utils/common/toast';
import PoolCompaniesCommentsTable from './comments';
import AddCommentPoolCompany from './add-comment';
import { BackButton } from '@components/common/style-components/buttons';
import { StandardModal } from '@components/UI/Models/base-model';
import { useAppTheme } from '@hooks/use-app-theme';
import { useGetCompanyById } from '@hooks/queries/useUserQueries';
import { useUpdateCompany } from '@hooks/mutations/useUserMutations';
import { useDeletePoolCompanyByAdmin } from '@hooks/mutations/useAdminMutations';
import {
  IconTrash,
  IconDeviceFloppy,
  IconAlertTriangle
} from '@tabler/icons-react';

const UpdateCompany = () => {
  const params = useParams();
  const {
    themeConfig: currentThemeConfig,
    organizationConfig,
    isDarkTheme
  } = useAppTheme();
  const companyId = params.companyId as string;
  const navigate = useNavigate();

  const user = useRecoilValue(userDetailsAtom);

  const [opened, { open, close }] = useDisclosure(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const { data: company, isLoading } = useGetCompanyById(companyId);
  const { mutateAsync: updateCompany, isPending: isUpdating } =
    useUpdateCompany();
  const { mutateAsync: deleteCompany } = useDeletePoolCompanyByAdmin();

  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  // Get the current theme configuration

  const [comments, setComments] = useState<
    {
      updateAt: string;
      userId: { firstName: string; lastName: string };
      comment: string;
    }[]
  >([]);
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const {
    register,
    formState: { errors, isSubmitting: isFormSubmitting },
    handleSubmit,
    control,
    reset
  } = useForm<AddCompanyForm>({
    resolver: zodResolver(addCompanySchema)
  });

  useEffect(() => {
    if (company) {
      reset(company);
      if (company.comments) {
        setComments(company.comments);
      } else {
        setComments([]);
      }
    }
  }, [company, reset]);

  const isSubmitting = isUpdating;

  const onSubmit = async (data: AddCompanyForm) => {
    try {
      await updateCompany({ data, id: companyId });
      showSuccessToast('Company details updated successfully !');
      navigate(-1);
    } catch (error: any) {
      showErrorToast(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDeleteCompany = async (
    companyId: string,
    agreeTerms: boolean
  ) => {
    try {
      await deleteCompany({ companyId, confirmDelete: agreeTerms });
      showSuccessToast('Company deleted successfully!');
      navigate(-1);
    } catch (error: any) {
      showErrorToast(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Container size='xl' py='md' my='xl' px={isSmallMobile ? 'xs' : 'md'}>
      <Stack gap='md'>
        {/* Header Card */}
        <Card shadow='sm' p={isMobile ? 'md' : 'lg'} radius='md' withBorder>
          <Group
            justify='space-between'
            align='center'
            wrap={isMobile ? 'wrap' : 'nowrap'}
          >
            <Title order={isMobile ? 4 : 3} fw={700}>
              Update Company Details
            </Title>
            <BackButton id={companyId} />
          </Group>
        </Card>

        <DataView isLoading={isLoading} label='company details'>
          <Stack gap='md'>
            {/* Main Form Card */}
            <Card shadow='sm' p={isMobile ? 'md' : 'lg'} radius='md' withBorder>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap='lg'>
                  {/* Company Name and Status */}
                  <Grid gutter='md'>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        {...register('companyName')}
                        label='Company Name'
                        disabled
                        error={errors.companyName?.message}
                        size={isMobile ? 'sm' : 'md'}
                        autoComplete='off'
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Controller
                        name='status'
                        control={control}
                        render={({ field }: { field: any }) => (
                          <Select
                            label='Select Status'
                            placeholder='Pick value'
                            {...field}
                            data={[
                              { value: 'Created', label: 'Created' },
                              { value: 'Followed Up', label: 'Followed Up' },
                              {
                                value: 'Waiting For Response',
                                label: 'Waiting For Response'
                              },
                              {
                                value: 'Not Interested',
                                label: 'Not Interested'
                              },
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
                  <Card withBorder p='md' radius='md'>
                    <Stack gap='md'>
                      <Text size='lg' fw={600}>
                        Primary Contact
                      </Text>
                      <Grid gutter='md'>
                        <Grid.Col span={12}>
                          <TextInput
                            {...register('primaryContact.name')}
                            label='Name'
                            error={errors.primaryContact?.name?.message}
                            size={isMobile ? 'sm' : 'md'}
                            autoComplete='off'
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                          <TextInput
                            {...register('primaryContact.email')}
                            label='Email'
                            error={errors.primaryContact?.email?.message}
                            size={isMobile ? 'sm' : 'md'}
                            autoComplete='off'
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                          <TextInput
                            {...register('primaryContact.phone')}
                            label='Phone'
                            error={errors.primaryContact?.phone?.message}
                            size={isMobile ? 'sm' : 'md'}
                            autoComplete='off'
                          />
                        </Grid.Col>
                      </Grid>
                    </Stack>
                  </Card>

                  {/* Secondary Contacts */}
                  <Grid gutter='md'>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Card withBorder p='md' radius='md'>
                        <Stack gap='md'>
                          <Text size='lg' fw={600}>
                            Secondary Contact 1
                          </Text>
                          <TextInput
                            {...register('secondaryContact_1.name')}
                            label='Name'
                            error={errors.secondaryContact_1?.name?.message}
                            size={isMobile ? 'sm' : 'md'}
                            autoComplete='off'
                          />
                          <TextInput
                            {...register('secondaryContact_1.email')}
                            label='Email'
                            error={errors.secondaryContact_1?.email?.message}
                            size={isMobile ? 'sm' : 'md'}
                            autoComplete='off'
                          />
                          <TextInput
                            {...register('secondaryContact_1.phone')}
                            label='Phone'
                            error={errors.secondaryContact_1?.phone?.message}
                            size={isMobile ? 'sm' : 'md'}
                            autoComplete='off'
                          />
                        </Stack>
                      </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Card withBorder p='md' radius='md'>
                        <Stack gap='md'>
                          <Text size='lg' fw={600}>
                            Secondary Contact 2
                          </Text>
                          <TextInput
                            {...register('secondaryContact_2.name')}
                            label='Name'
                            error={errors.secondaryContact_2?.name?.message}
                            size={isMobile ? 'sm' : 'md'}
                            autoComplete='off'
                          />
                          <TextInput
                            {...register('secondaryContact_2.email')}
                            label='Email'
                            error={errors.secondaryContact_2?.email?.message}
                            size={isMobile ? 'sm' : 'md'}
                            autoComplete='off'
                          />
                          <TextInput
                            {...register('secondaryContact_2.phone')}
                            label='Phone'
                            autoComplete='off'
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
                    justify='space-between'
                    wrap={isMobile ? 'wrap' : 'nowrap'}
                  >
                    <Button
                      color='red'
                      variant='filled'
                      leftSection={<IconTrash size={16} />}
                      radius='md'
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
                      type='submit'
                      disabled={isSubmitting}
                      loaderProps={{
                        children: <PremiumLoader size='xs' minHeight='20px' />
                      }}
                      loading={isSubmitting}
                      leftSection={<IconDeviceFloppy size={16} />}
                      fullWidth={isMobile}
                      size={isMobile ? 'md' : 'sm'}
                      radius='md'
                    >
                      {isSubmitting ? 'Updating...' : 'Update Company'}
                    </Button>
                  </Group>
                </Stack>
              </form>
            </Card>

            {/* Add Comment Section */}
            <AddCommentPoolCompany companyId={companyId} isMobile={isMobile} />

            {/* Comments Table */}
            <PoolCompaniesCommentsTable
              organizationConfig={organizationConfig}
              comments={comments}
              currentThemeConfig={currentThemeConfig}
              isMobile={isMobile}
            />
          </Stack>
        </DataView>
      </Stack>

      {/* Delete Confirmation Modal */}
      <StandardModal
        title={
          <Group gap='xs'>
            <IconAlertTriangle size={24} color='red' />
            <Title order={3} c='red'>
              Delete Action
            </Title>
          </Group>
        }
        size='md'
        opened={opened}
        onClose={close}
      >
        <Stack gap='md'>
          <Text size='lg' fw={600}>
            Sure want to delete this Company?
          </Text>
          <Text c='dimmed'>
            Please be aware of doing this action! Deleting company is an
            un-reversible action and you should be aware while doing this.
          </Text>

          <Stack gap='sm' mt='md'>
            <Checkbox
              label='I understand what are the consequences of doing this action!'
              checked={confirmDelete}
              onChange={e => setConfirmDelete(e.currentTarget.checked)}
              required
            />
            <Checkbox
              label='I understand that this employee details are not a part of our application forever. I agreed to the Terms and Conditions to perform this action'
              checked={agreeTerms}
              onChange={e => setAgreeTerms(e.currentTarget.checked)}
            />
          </Stack>

          <Group justify='space-between' mt='xl'>
            <Button
              color='red'
              onClick={() => handleDeleteCompany(companyId!, agreeTerms)}
              disabled={!confirmDelete}
              leftSection={<IconTrash size={16} />}
              radius='md'
            >
              Delete
            </Button>
            <Button variant='default' onClick={close} radius='md'>
              Cancel
            </Button>
          </Group>
        </Stack>
      </StandardModal>
    </Container>
  );
};

export default UpdateCompany;
