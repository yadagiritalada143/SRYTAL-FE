import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Grid,
  NumberInput,
  TextInput,
  Group,
  Input,
  Textarea,
  Container,
  Card,
  Stack,
  Text,
  Divider,
  Loader,
  Badge
} from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { useState, useMemo } from 'react';
import {
  AddCandidateForm,
  candidateSchema
} from '../../../../forms/add-candidate';
import { toast } from 'react-toastify';
import { addPoolCandidateByRecruiter } from '../../../../services/user-services';
import { useNavigate } from 'react-router-dom';
import { useCustomToast } from '../../../../utils/common/toast';
import { DateTimePicker } from '@mantine/dates';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { themeAtom } from '../../../../atoms/theme';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconArrowLeft,
  IconUser,
  IconPlus,
  IconX,
  IconPhone,
  IconMail,
  IconBriefcase,
  IconMessage,
  IconClock
} from '@tabler/icons-react';

const AddPoolCandidate = () => {
  const navigate = useNavigate();
  const { showSuccessToast } = useCustomToast();
  const isDarkTheme = useRecoilValue(themeAtom);
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  // Get the current theme configuration
  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

  const {
    control,
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit
  } = useForm<AddCandidateForm>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      candidateName: '',
      contact: { email: '', phone: '' },
      evaluatedSkills: '',
      relaventYearsOfExperience: 0,
      totalYearsOfExperience: 0,
      comments: [{ callEndsAt: '', callStartsAt: '', comment: '' }]
    }
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  const handleSkillAdd = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const onSubmit = (formData: AddCandidateForm) => {
    if (skills.length) {
      formData.evaluatedSkills = skills.join(',');
    }
    addPoolCandidateByRecruiter(formData)
      .then(() => {
        showSuccessToast('Candidate added successfully!');
        navigate(-1);
      })
      .catch(error => {
        toast.error(
          error?.response?.data?.message || 'Failed to add candidate'
        );
      });
  };

  return (
    <Container
      size="xl"
      py="md"
      my="xl"
      mt={70}
      px={isSmallMobile ? 'xs' : 'md'}
      style={{
        backgroundColor: currentThemeConfig.backgroundColor
      }}
    >
      <Stack gap="md">
        {/* Header Card */}
        <Card shadow="sm" p={isMobile ? 'md' : 'lg'} radius="md" withBorder>
          <Group justify="space-between" wrap="wrap">
            <Group gap="sm">
              <IconUser size={isMobile ? 24 : 28} />
              <Text
                size={isMobile ? 'lg' : 'xl'}
                fw={700}
                ta={isMobile ? 'center' : 'left'}
              >
                Add New Candidate
              </Text>
            </Group>
            <Button
              leftSection={<IconArrowLeft size={16} />}
              onClick={handleGoBack}
              variant="light"
              size={isMobile ? 'sm' : 'md'}
            >
              Go Back
            </Button>
          </Group>
        </Card>

        {/* Form Card */}
        <Card shadow="sm" p={isMobile ? 'md' : 'xl'} radius="md" withBorder>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
          >
            <Stack gap="lg">
              {/* Basic Information Section */}
              <div>
                <Text size="lg" fw={600} mb="md">
                  Basic Information
                </Text>
                <Grid gutter="md">
                  <Grid.Col span={12}>
                    <Controller
                      name="candidateName"
                      control={control}
                      render={({ field }) => (
                        <TextInput
                          {...field}
                          label="Candidate Name"
                          placeholder="Enter candidate full name"
                          error={errors.candidateName?.message}
                          size={isMobile ? 'sm' : 'md'}
                          withAsterisk
                          leftSection={<IconUser size={16} />}
                          autoComplete="off"
                        />
                      )}
                    />
                  </Grid.Col>
                </Grid>
              </div>

              <Divider />

              {/* Contact Information Section */}
              <div>
                <Text size="lg" fw={600} mb="md">
                  Contact Information
                </Text>
                <Grid gutter="md">
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Controller
                      name="contact.email"
                      control={control}
                      render={({ field }) => (
                        <TextInput
                          {...field}
                          label="Email"
                          placeholder="candidate@example.com"
                          error={errors.contact?.email?.message}
                          size={isMobile ? 'sm' : 'md'}
                          type="email"
                          withAsterisk
                          leftSection={<IconMail size={16} />}
                          autoComplete="off"
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
                          {...field}
                          label="Phone"
                          placeholder="Enter phone number"
                          error={errors.contact?.phone?.message}
                          size={isMobile ? 'sm' : 'md'}
                          withAsterisk
                          leftSection={<IconPhone size={16} />}
                          autoComplete="off"
                        />
                      )}
                    />
                  </Grid.Col>
                </Grid>
              </div>

              <Divider />

              {/* Experience Section */}
              <div>
                <Text size="lg" fw={600} mb="md">
                  Experience
                </Text>
                <Grid gutter="md">
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Controller
                      name="totalYearsOfExperience"
                      control={control}
                      render={({ field }) => (
                        <NumberInput
                          {...field}
                          label="Total Experience (Years)"
                          placeholder="Enter total years"
                          min={0}
                          error={errors.totalYearsOfExperience?.message}
                          size={isMobile ? 'sm' : 'md'}
                          withAsterisk
                          leftSection={<IconBriefcase size={16} />}
                          autoComplete="off"
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
                          {...field}
                          label="Relevant Experience (Years)"
                          placeholder="Enter relevant years"
                          min={0}
                          error={
                            field.value > getValues('totalYearsOfExperience')
                              ? 'Cannot exceed total experience'
                              : errors.relaventYearsOfExperience?.message
                          }
                          size={isMobile ? 'sm' : 'md'}
                          withAsterisk
                          leftSection={<IconBriefcase size={16} />}
                          autoComplete="off"
                        />
                      )}
                    />
                  </Grid.Col>
                </Grid>
              </div>

              <Divider />

              {/* Skills Section */}
              <div>
                <Text size="lg" fw={600} mb="md">
                  Skills & Expertise
                </Text>
                <Stack gap="md">
                  <Input.Wrapper
                    label="Add Skills"
                    description="Enter a skill and click 'Add' or press Enter"
                  >
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
                        placeholder="e.g., React, Python, AWS"
                        style={{ flex: 1 }}
                        size={isMobile ? 'sm' : 'md'}
                        autoComplete="off"
                      />
                      <Button
                        onClick={handleSkillAdd}
                        leftSection={<IconPlus size={16} />}
                        size={isMobile ? 'sm' : 'md'}
                        disabled={!skillInput.trim()}
                      >
                        Add
                      </Button>
                    </Group>
                  </Input.Wrapper>

                  {skills.length > 0 && (
                    <Card p="md" withBorder>
                      <Stack gap="xs">
                        <Group justify="space-between">
                          <Text size="sm" fw={500}>
                            Added Skills
                          </Text>
                          <Badge variant="filled" color="blue">
                            {skills.length}{' '}
                            {skills.length === 1 ? 'skill' : 'skills'}
                          </Badge>
                        </Group>
                        <Group gap="xs">
                          {skills.map(skill => (
                            <Badge
                              key={skill}
                              color="blue"
                              size="md"
                              variant="filled"
                              onClick={() => handleSkillRemove(skill)}
                              style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <Group gap={4} align="center">
                                <Text size="xs">{skill}</Text>
                                <IconX size={14} style={{ marginTop: 1 }} />
                              </Group>
                            </Badge>
                          ))}
                        </Group>
                      </Stack>
                    </Card>
                  )}
                </Stack>
              </div>

              <Divider />

              {/* Comments Section */}
              <div>
                <Text size="lg" fw={600} mb="md">
                  Initial Comments & Call Details
                </Text>
                <Stack gap="md">
                  <Controller
                    name="comments.0.comment"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Comment"
                        placeholder="Add initial comments about the candidate..."
                        autosize
                        minRows={4}
                        maxRows={8}
                        error={errors.comments?.[0]?.comment?.message}
                        size={isMobile ? 'sm' : 'md'}
                        leftSection={<IconMessage size={16} />}
                      />
                    )}
                  />

                  <Grid gutter="md">
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Controller
                        name="comments.0.callStartsAt"
                        control={control}
                        render={({ field }) => (
                          <DateTimePicker
                            {...field}
                            value={field.value ? new Date(field.value) : null}
                            onChange={date =>
                              field.onChange(date ? new Date(date).toISOString() : null)
                            }
                            clearable
                            label="Call Start Time"
                            placeholder="Select date and time"
                            error={errors.comments?.[0]?.callStartsAt?.message}
                            size={isMobile ? 'sm' : 'md'}
                            leftSection={<IconClock size={16} />}
                          />
                        )}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Controller
                        name="comments.0.callEndsAt"
                        control={control}
                        render={({ field }) => (
                          <DateTimePicker
                            {...field}
                            value={field.value ? new Date(field.value) : null}
                            onChange={date =>
                              field.onChange(date ? new Date(date).toISOString() : null)
                            }
                            clearable
                            label="Call End Time"
                            placeholder="Select date and time"
                            error={errors.comments?.[0]?.callEndsAt?.message}
                            size={isMobile ? 'sm' : 'md'}
                            leftSection={<IconClock size={16} />}
                          />
                        )}
                      />
                    </Grid.Col>
                  </Grid>
                </Stack>
              </div>

              <Divider />

              {/* Submit Buttons */}
              <Group justify="flex-end" mt="md">
                <Button
                  type="button"
                  variant="light"
                  onClick={handleGoBack}
                  disabled={isSubmitting}
                  size={isMobile ? 'sm' : 'md'}
                  fullWidth={isMobile}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size={isMobile ? 'sm' : 'md'}
                  fullWidth={isMobile}
                  leftSection={
                    isSubmitting ? (
                      <Loader size="xs" color="white" />
                    ) : (
                      <IconUser size={16} />
                    )
                  }
                >
                  {isSubmitting ? 'Adding Candidate...' : 'Add Candidate'}
                </Button>
              </Group>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Container>
  );
};

export default AddPoolCandidate;
