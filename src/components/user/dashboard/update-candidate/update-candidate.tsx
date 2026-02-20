import {
  Group,
  Button,
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
  Container,
  Loader,
  Center
} from '@mantine/core';
import { useCustomToast } from '../../../../utils/common/toast';
import { useEffect, useState } from 'react';
import {
  UpdateCandidateSchema,
  updateCandidateSchema
} from '../../../../forms/add-candidate';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getPoolCandidateByRecruiter,
  updatePoolCandidateByRecruiter
} from '../../../../services/user-services';
import { toast } from 'react-toastify';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { useRecoilValue } from 'recoil';
import { PoolCandidatesComments } from '../../../../interfaces/candidate';
import { organizationAdminUrls } from '../../../../utils/common/constants';
import AddComment from './add-comment';
import CommentsTable from './comments-table';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { deletePoolCandidatesByAdmin } from '../../../../services/admin-services';
import { BackButton } from '../../../common/style-components/buttons';
import { StandardModal } from '../../../UI/Models/base-model';
import {
  IconPlus,
  IconX,
  IconTrash,
  IconDeviceFloppy
} from '@tabler/icons-react';

const UpdatePoolCandidateForm = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<PoolCandidatesComments[]>([]);
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const [opened, { open, close }] = useDisclosure(false);
  const { showSuccessToast } = useCustomToast();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  const {
    control,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    handleSubmit
  } = useForm<UpdateCandidateSchema>({
    resolver: zodResolver(updateCandidateSchema)
  });

  const navigate = useNavigate();
  const params = useParams();
  const candidateId = params.candidateId as string;

  useEffect(() => {
    if (candidateId) {
      getPoolCandidateByRecruiter(candidateId)
        .then(data => {
          setComments(data.comments);
          setSkills(data.evaluatedSkills.split(',').filter(Boolean));
          reset(data);
        })
        .catch(() => {
          toast.error('Failed to fetch candidate details.');
        })
        .finally(() => setLoading(false));
    }
  }, [candidateId, reset]);

  const handleDeleteCandidate = (candidateId: string, agreeTerms: boolean) => {
    const payload = {
      candidateId: candidateId,
      confirmDelete: agreeTerms
    };
    deletePoolCandidatesByAdmin(payload)
      .then(() => {
        showSuccessToast('Candidate deleted successfully!');
        navigate(
          `${organizationAdminUrls(
            organizationConfig.organization_name
          )}/dashboard/pool-candidates`
        );
      })
      .catch((error: { response?: { data?: { message?: string } } }) => {
        toast.error(error.response?.data?.message || 'Something went wrong');
      });
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

  const handleUpdateCandidate = (data: UpdateCandidateSchema) => {
    if (skills.length) {
      data.evaluatedSkills = skills.join(',');
    }
    data.id = candidateId;
    updatePoolCandidateByRecruiter(data)
      .then(() => {
        toast.success('Candidate updated successfully!');
        navigate(-1);
      })
      .catch(() => {
        toast.error('Failed to update candidate.');
      });
  };

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <Center style={{ minHeight: '400px' }}>
          <Stack align="center" gap="md">
            <Loader size="xl" />
            <Text>Loading candidate details...</Text>
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
          <Flex direction="row" justify="space-between" align="center" gap="md">
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

        {/* Candidate Form Card */}
        <Card shadow="sm" p={isMobile ? 'md' : 'lg'} radius="md" withBorder>
          <Stack gap="md">
            <Controller
              name="candidateName"
              control={control}
              render={({ field }) => (
                <TextInput
                  label="Candidate Name"
                  placeholder="Enter candidate name"
                  {...field}
                  error={errors.candidateName?.message}
                  size={isMobile ? 'sm' : 'md'}
                />
              )}
            />

            <Grid gutter="md">
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Controller
                  name="contact.email"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      label="Email"
                      placeholder="candidate@example.com"
                      {...field}
                      error={errors.contact?.email?.message}
                      size={isMobile ? 'sm' : 'md'}
                    />
                  )}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Controller
                  name="contact.phone"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      label="Phone"
                      placeholder="+1234567890"
                      {...field}
                      error={errors.contact?.phone?.message}
                      size={isMobile ? 'sm' : 'md'}
                    />
                  )}
                />
              </Grid.Col>
            </Grid>

            <Grid gutter="md">
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Controller
                  name="totalYearsOfExperience"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      label="Total Experience (Years)"
                      placeholder="0"
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
                  name="relaventYearsOfExperience"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      label="Relevant Experience (Years)"
                      placeholder="0"
                      {...field}
                      min={0}
                      error={
                        field.value > getValues('totalYearsOfExperience')
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
            <Stack gap="xs">
              <Input.Wrapper label="Skills" size={isMobile ? 'sm' : 'md'}>
                <Group gap="xs" mt="xs">
                  <TextInput
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSkillAdd();
                      }
                    }}
                    placeholder="Type a skill and press Enter"
                    style={{ flex: 1 }}
                    size={isMobile ? 'sm' : 'md'}
                  />
                  <Button
                    onClick={handleSkillAdd}
                    leftSection={<IconPlus size={16} />}
                    size={isMobile ? 'sm' : 'md'}
                  >
                    Add
                  </Button>
                </Group>
              </Input.Wrapper>

              {skills.length > 0 && (
                <Group gap="xs" mt="xs">
                  {skills.map(skill => (
                    <Badge
                      key={skill}
                      size="lg"
                      variant="light"
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
            <Group justify="space-between" wrap={isMobile ? 'wrap' : 'nowrap'}>
              <Button
                color="red"
                variant="filled"
                leftSection={<IconTrash size={16} />}
                onClick={open}
                fullWidth={isMobile}
                size={isMobile ? 'md' : 'sm'}
              >
                Delete Candidate
              </Button>
              <Button
                type="button"
                onClick={handleSubmit(handleUpdateCandidate)}
                disabled={isSubmitting}
                loading={isSubmitting}
                leftSection={<IconDeviceFloppy size={16} />}
                fullWidth={isMobile}
                size={isMobile ? 'md' : 'sm'}
              >
                {isSubmitting ? 'Updating...' : 'Update Candidate'}
              </Button>
            </Group>
          </Stack>
        </Card>

        {/* Delete Modal */}
        <StandardModal
          title={
            <Title order={3} c="red">
              Delete Action
            </Title>
          }
          size="md"
          opened={opened}
          onClose={close}
        >
          <Stack gap="md">
            <Text size="lg" fw={700}>
              Sure want to delete this Candidate?
            </Text>
            <Text size="sm" c="dimmed">
              Please be aware of doing this action! Deleting candidate is an
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
                label="I understand that this candidate details are not a part of our application forever. I agreed to the Terms and Conditions to perform this action"
                checked={agreeTerms}
                onChange={e => setAgreeTerms(e.currentTarget.checked)}
              />
            </Stack>

            <Group justify="space-between" mt="xl">
              <Button
                color="red"
                variant="filled"
                onClick={() => handleDeleteCandidate(candidateId!, agreeTerms)}
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

        {/* Add Comment Section */}
        <AddComment
          organizationConfig={organizationConfig}
          candidateId={candidateId}
          comments={comments}
          setComments={setComments}
        />

        {/* Comments Table */}
        <CommentsTable
          comments={comments}
          organizationConfig={organizationConfig}
        />
      </Stack>
    </Container>
  );
};

export default UpdatePoolCandidateForm;
