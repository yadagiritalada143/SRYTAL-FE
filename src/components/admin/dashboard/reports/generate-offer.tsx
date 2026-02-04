import {
  Button,
  Loader,
  Select,
  Textarea,
  TextInput,
  Container,
  Stack,
  Card,
  Title,
  Group
} from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import {
  OfferLetterForm,
  offerLetterForm
} from '../../../../forms/offerletter';
import { zodResolver } from '@hookform/resolvers/zod';

const GenerateOfferReport = () => {
  const {
    register,
    control,
    formState: { errors, isSubmitting }
  } = useForm<OfferLetterForm>({ resolver: zodResolver(offerLetterForm) });

  return (
    <Container size="lg" py="xl">
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={2} className="text-center">
            Generate Offer Letter
          </Title>
          <form>
            <Stack gap="md">
              <Textarea
                label="Subject"
                maxRows={4}
                autosize
                placeholder="Enter Subject"
                {...register('subject')}
                error={errors.subject?.message}
              />

              <Group grow>
                <TextInput
                  label="Candidate Name"
                  placeholder="Enter candidate name"
                  {...register('nameOfTheCandidate')}
                  error={errors.nameOfTheCandidate?.message}
                />

                <TextInput
                  type="date"
                  label="Joining Date"
                  placeholder="Select joining date"
                  {...register('dateOfJoining')}
                  error={errors.dateOfJoining?.message}
                />
              </Group>

              <Group grow>
                <TextInput
                  type="number"
                  label="Compensation"
                  placeholder="Enter Compensation"
                  {...register('compensation')}
                  error={errors.compensation?.message}
                />

                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="User Role"
                      {...field}
                      error={errors.role?.message}
                      placeholder="Select user role"
                      value={field.value}
                      data={[
                        { label: 'employee', value: 'employee' },
                        { label: 'recruiter', value: 'recruiter' }
                      ]}
                    />
                  )}
                />
              </Group>

              <TextInput
                label="Work Location"
                placeholder="Enter Work Location"
                {...register('workLocation')}
                error={errors.workLocation?.message}
              />

              <Group justify="flex-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  leftSection={isSubmitting && <Loader size="xs" />}
                >
                  {isSubmitting ? 'Generating...' : 'Generate Offer Letter'}
                </Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Container>
  );
};

export default GenerateOfferReport;
