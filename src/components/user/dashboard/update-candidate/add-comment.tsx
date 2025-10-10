import { Controller, useForm } from 'react-hook-form';
import { DateTimePicker } from '@mantine/dates';
import {
  Button,
  Grid,
  Group,
  Textarea,
  Card,
  Stack,
  Text
} from '@mantine/core';
import { OrganizationConfig } from '../../../../interfaces/organization';
import { AddCommentForm, commentSchema } from '../../../../forms/add-candidate';
import { zodResolver } from '@hookform/resolvers/zod';
import { addPoolCandidateCommentByRecruiter } from '../../../../services/user-services';
import { useCustomToast } from '../../../../utils/common/toast';
import { toast } from 'react-toastify';
import { useMediaQuery } from '@mantine/hooks';

const AddComment = ({
  candidateId,
  setComments
}: {
  organizationConfig: OrganizationConfig;
  candidateId: string | undefined;
  setComments: any;
  comments: any;
}) => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setValue
  } = useForm<AddCommentForm>({
    resolver: zodResolver(commentSchema)
  });
  const { showSuccessToast } = useCustomToast();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleAddComment = (data: AddCommentForm) => {
    data.id = candidateId;
    addPoolCandidateCommentByRecruiter(data)
      .then(data => {
        reset();
        showSuccessToast('Comment added successfully');
        setComments(data.comments);
        setValue('comment', '');
      })
      .catch(error =>
        toast.error(error?.response?.data?.message || 'Something went wrong')
      );
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-6">
      <Card shadow="sm" p={isMobile ? 'md' : 'lg'} radius="md" withBorder>
        <Stack gap="md">
          <Text size={isMobile ? 'lg' : 'xl'} fw={700}>
            Add Comment
          </Text>

          <form onSubmit={handleSubmit(handleAddComment)}>
            <Stack gap="md">
              <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                  <Textarea
                    label="Comment"
                    placeholder="Enter your comment here..."
                    autosize
                    minRows={4}
                    maxRows={8}
                    {...field}
                    error={errors?.comment?.message}
                    size={isMobile ? 'sm' : 'md'}
                  />
                )}
              />

              <Grid gutter="md">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Controller
                    name="callStartsAt"
                    control={control}
                    render={({ field }) => (
                      <DateTimePicker
                        {...field}
                        value={field.value ? new Date(field.value) : null}
                        onChange={date =>
                          field.onChange(date ? date.toISOString() : null)
                        }
                        clearable
                        label="Call Start Time"
                        placeholder="Pick date and time"
                        error={errors?.callStartsAt?.message}
                        size={isMobile ? 'sm' : 'md'}
                      />
                    )}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Controller
                    name="callEndsAt"
                    control={control}
                    render={({ field }) => (
                      <DateTimePicker
                        {...field}
                        value={field.value ? new Date(field.value) : null}
                        onChange={date =>
                          field.onChange(date ? date.toISOString() : null)
                        }
                        clearable
                        label="Call End Time"
                        placeholder="Pick date and time"
                        error={errors?.callEndsAt?.message}
                        size={isMobile ? 'sm' : 'md'}
                      />
                    )}
                  />
                </Grid.Col>
              </Grid>

              <Group justify="flex-end" mt="md">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  size={isMobile ? 'md' : 'sm'}
                  fullWidth={isMobile}
                >
                  {isSubmitting ? 'Adding...' : 'Add Comment'}
                </Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </Card>
    </div>
  );
};

export default AddComment;
