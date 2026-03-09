import {
  Group,
  TextInput,
  NumberInput,
  Input,
  Checkbox,
  Title,
  Card,
  Stack,
  Text,
  Grid,
  Badge,
  Divider,
  Flex,
  Container
} from '@mantine/core';
import PremiumLoader from '@components/common/loaders/PremiumLoader';
import DataView from '@components/common/loaders/DataView';
import { useCustomToast } from '@utils/common/toast';
import React, { useEffect, useState } from 'react';
import {
  UpdateCandidateSchema,
  updateCandidateSchema
} from '@forms/add-candidate';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { organizationAdminUrls } from '@utils/common/constants';
import AddComment from './add-comment';
import CommentsTable from './comments-table';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { BackButton } from '@components/common/style-components/buttons';
import { StandardModal } from '@components/UI/Models/base-model';
import { useAppTheme } from '@hooks/use-app-theme';
import { useGetPoolCandidateById } from '@hooks/queries/useUserQueries';
import { useUpdateCandidate } from '@hooks/mutations/useUserMutations';
import { useDeletePoolCandidatesByAdmin } from '@hooks/mutations/useAdminMutations';
import {
  IconPlus,
  IconX,
  IconTrash,
  IconDeviceFloppy
} from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';

const UpdatePoolCandidateForm = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const { themeConfig: currentThemeConfig, organizationConfig } = useAppTheme();
  const [skillInput, setSkillInput] = useState('');
  const [opened, { open, close }] = useDisclosure(false);
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  const navigate = useNavigate();
  const params = useParams();
  const candidateId = params.candidateId as string;

  const { data: candidate, isLoading } = useGetPoolCandidateById(candidateId);
  const { mutateAsync: updateCandidate, isPending: isUpdating } =
    useUpdateCandidate();
  const { mutateAsync: deleteCandidate } = useDeletePoolCandidatesByAdmin();

  const {
    control,
    formState: { errors, isSubmitting: isFormSubmitting },
    reset,
    getValues,
    handleSubmit
  } = useForm<UpdateCandidateSchema>({
    resolver: zodResolver(updateCandidateSchema)
  });

  const isSubmitting = isUpdating || isFormSubmitting;

  useEffect(() => {
    if (candidate) {
      setSkills(candidate.evaluatedSkills?.split(',').filter(Boolean) || []);
      reset(candidate);
    }
  }, [candidate, reset]);

  const handleDeleteCandidate = async (id: string, agree: boolean) => {
    try {
      await deleteCandidate({ candidateId: id, confirmDelete: agree });
      showSuccessToast('Candidate deleted successfully!');
      navigate(
        `${organizationAdminUrls(
          organizationConfig.organization_name
        )}/dashboard/pool-candidates`
      );
    } catch (error: any) {
      showErrorToast(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleUpdateCandidate = async (data: UpdateCandidateSchema) => {
    if (skills.length) {
      data.evaluatedSkills = skills.join(',');
    }
    data.id = candidateId;
    try {
      await updateCandidate(data);
      showSuccessToast('Candidate updated successfully!');
      navigate(-1);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || 'Failed to update candidate'
      );
    }
  };

  return (
    <Container size='lg' py='md' my='xl' px={isSmallMobile ? 'xs' : 'md'}>
      <Stack gap='md'>
        {/* Header Card */}
        <Card shadow='sm' p={isMobile ? 'md' : 'lg'} radius='md' withBorder>
          <Flex direction='row' justify='space-between' align='center' gap='md'>
            <Text
              size={isMobile ? 'lg' : 'xl'}
              fw={700}
              ta={isMobile ? 'center' : 'left'}
            >
              Edit Candidate Details
            </Text>
            <BackButton id={candidateId} />
          </Flex>
        </Card>

        <DataView isLoading={isLoading} label='candidate details'>
          <Stack gap='md'>
            {/* Candidate Form Card */}
            <Card shadow='sm' p={isMobile ? 'md' : 'lg'} radius='md' withBorder>
              <form onSubmit={handleSubmit(handleUpdateCandidate)}>
                <Stack gap='md'>
                  <Controller
                    name='candidateName'
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        label='Candidate Name'
                        placeholder='Enter candidate name'
                        {...field}
                        error={errors.candidateName?.message}
                        size={isMobile ? 'sm' : 'md'}
                      />
                    )}
                  />

                  <Grid gutter='md'>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Controller
                        name='contact.email'
                        control={control}
                        render={({ field }) => (
                          <TextInput
                            label='Email'
                            placeholder='candidate@example.com'
                            {...field}
                            error={errors.contact?.email?.message}
                            size={isMobile ? 'sm' : 'md'}
                          />
                        )}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Controller
                        name='contact.phone'
                        control={control}
                        render={({ field }) => (
                          <TextInput
                            label='Phone'
                            placeholder='+1234567890'
                            {...field}
                            error={errors.contact?.phone?.message}
                            size={isMobile ? 'sm' : 'md'}
                          />
                        )}
                      />
                    </Grid.Col>
                  </Grid>

                  <Grid gutter='md'>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Controller
                        name='totalYearsOfExperience'
                        control={control}
                        render={({ field }) => (
                          <NumberInput
                            label='Total Experience (Years)'
                            placeholder='0'
                            {...field}
                            min={0}
                            error={errors.totalYearsOfExperience?.message}
                            size={isMobile ? 'sm' : 'md'}
                          />
                        )}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Controller
                        name='relaventYearsOfExperience'
                        control={control}
                        render={({ field }) => (
                          <NumberInput
                            label='Relevant Experience (Years)'
                            placeholder='0'
                            {...field}
                            min={0}
                            error={
                              (field.value || 0) >
                              (getValues('totalYearsOfExperience') || 0)
                                ? 'Relevant experience cannot be more than total experience'
                                : errors.relaventYearsOfExperience?.message
                            }
                            size={isMobile ? 'sm' : 'md'}
                          />
                        )}
                      />
                    </Grid.Col>
                  </Grid>

                  <Divider />

                  {/* Skills Section */}
                  <Stack gap='xs'>
                    <Input.Wrapper label='Skills' size={isMobile ? 'sm' : 'md'}>
                      <Group gap='xs' mt='xs'>
                        <TextInput
                          value={skillInput}
                          onChange={e => setSkillInput(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleSkillAdd();
                            }
                          }}
                          placeholder='Type a skill and press Enter'
                          style={{ flex: 1 }}
                          size={isMobile ? 'sm' : 'md'}
                        />
                        <CommonButton
                          onClick={handleSkillAdd}
                          leftSection={<IconPlus size={16} />}
                          size={isMobile ? 'sm' : 'md'}
                        >
                          Add
                        </CommonButton>
                      </Group>
                    </Input.Wrapper>

                    {skills.length > 0 && (
                      <Group gap='xs' mt='xs'>
                        {skills.map(skill => (
                          <Badge
                            key={skill}
                            size='lg'
                            variant='filled'
                            color={currentThemeConfig.button.color}
                            rightSection={
                              <IconX
                                size={14}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSkillRemove(skill)}
                              />
                            }
                            style={{ cursor: 'pointer' }}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </Group>
                    )}
                  </Stack>

                  <Divider />

                  {/* Action Buttons */}
                  <Group
                    justify='space-between'
                    wrap={isMobile ? 'wrap' : 'nowrap'}
                  >
                    <CommonButton
                      color='red'
                      variant='filled'
                      leftSection={<IconTrash size={16} />}
                      onClick={open}
                      fullWidth={isMobile}
                      size={isMobile ? 'md' : 'sm'}
                    >
                      Delete Candidate
                    </CommonButton>
                    <CommonButton
                      type='submit'
                      disabled={isSubmitting}
                      loading={isSubmitting}
                      loaderProps={{
                        children: <PremiumLoader size='xs' minHeight='20px' />
                      }}
                      leftSection={<IconDeviceFloppy size={16} />}
                      fullWidth={isMobile}
                      size={isMobile ? 'md' : 'sm'}
                    >
                      {isSubmitting ? 'Updating...' : 'Update Candidate'}
                    </CommonButton>
                  </Group>
                </Stack>
              </form>
            </Card>

            {/* Delete Modal */}
            <StandardModal
              title={
                <Title order={3} c='red'>
                  Delete Action
                </Title>
              }
              size='md'
              opened={opened}
              onClose={close}
            >
              <Stack gap='md'>
                <Text size='lg' fw={700}>
                  Sure want to delete this Candidate?
                </Text>
                <Text size='sm' c='dimmed'>
                  Please be aware of doing this action! Deleting candidate is an
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
                    label='I understand that this candidate details are not a part of our application forever. I agreed to the Terms and Conditions to perform this action'
                    checked={agreeTerms}
                    onChange={e => setAgreeTerms(e.currentTarget.checked)}
                  />
                </Stack>

                <Group justify='space-between' mt='xl'>
                  <CommonButton
                    color='red'
                    variant='filled'
                    onClick={() =>
                      handleDeleteCandidate(candidateId!, agreeTerms)
                    }
                    disabled={!confirmDelete}
                    leftSection={<IconTrash size={16} />}
                  >
                    Delete
                  </CommonButton>
                  <CommonButton variant='default' onClick={close}>
                    Cancel
                  </CommonButton>
                </Group>
              </Stack>
            </StandardModal>

            {/* Add Comment Section */}
            <AddComment candidateId={candidateId} />

            {/* Comments Table */}
            <CommentsTable comments={candidate?.comments || []} />
          </Stack>
        </DataView>
      </Stack>
    </Container>
  );
};

export default UpdatePoolCandidateForm;
