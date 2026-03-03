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
import PremiumLoader from '@components/common/loaders/PremiumLoader';
import React from 'react';
import { AddCommentForm, commentSchema } from '@forms/add-candidate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddCandidateComment } from '@hooks/mutations/useUserMutations';
import { useCustomToast } from '@utils/common/toast';
import { useMediaQuery } from '@mantine/hooks';

interface AddCommentProps {
  candidateId: string;
}

const AddComment = ({ candidateId }: AddCommentProps) => {
  const {
    control,
    formState: { errors, isSubmitting: isFormSubmitting },
    handleSubmit,
    reset,
    setValue
  } = useForm<AddCommentForm>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: '',
      callStartsAt: '',
      callEndsAt: ''
    }
  });

  const { showSuccessToast, showErrorToast } = useCustomToast();
  const { mutateAsync: addComment, isPending: isAddingComment } =
    useAddCandidateComment();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const isSubmitting = isFormSubmitting || isAddingComment;

  const handleAddComment = async (data: AddCommentForm) => {
    data.id = candidateId;
    try {
      await addComment(data);
      showSuccessToast('Comment added successfully');
      reset();
      setValue('comment', '');
    } catch (error: any) {
      showErrorToast(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className='w-full max-w-3xl mx-auto my-6'>
      <Card shadow='sm' p={isMobile ? 'md' : 'lg'} radius='md' withBorder>
        <Stack gap='md'>
          <Text size={isMobile ? 'lg' : 'xl'} fw={700}>
            Add Comment
          </Text>

          <form onSubmit={handleSubmit(handleAddComment)}>
            <Stack gap='md'>
              <Controller
                name='comment'
                control={control}
                render={({ field }) => (
                  <Textarea
                    label='Comment'
                    placeholder='Enter your comment here...'
                    autosize
                    minRows={4}
                    maxRows={8}
                    {...field}
                    error={errors?.comment?.message}
                    size={isMobile ? 'sm' : 'md'}
                    disabled={isSubmitting}
                  />
                )}
              />

              <Grid gutter='md'>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Controller
                    name='callStartsAt'
                    control={control}
                    render={({ field }) => (
                      <DateTimePicker
                        {...field}
                        value={field.value ? new Date(field.value) : null}
                        onChange={date =>
                          field.onChange(
                            date ? new Date(date).toISOString() : null
                          )
                        }
                        clearable
                        label='Call Start Time'
                        placeholder='Pick date and time'
                        error={errors?.callStartsAt?.message}
                        size={isMobile ? 'sm' : 'md'}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Controller
                    name='callEndsAt'
                    control={control}
                    render={({ field }) => (
                      <DateTimePicker
                        {...field}
                        value={field.value ? new Date(field.value) : null}
                        onChange={date =>
                          field.onChange(
                            date ? new Date(date).toISOString() : null
                          )
                        }
                        clearable
                        label='Call End Time'
                        placeholder='Pick date and time'
                        error={errors?.callEndsAt?.message}
                        size={isMobile ? 'sm' : 'md'}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                </Grid.Col>
              </Grid>

              <Group justify='flex-end' mt='md'>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  size={isMobile ? 'md' : 'sm'}
                  fullWidth={isMobile}
                  radius='md'
                  leftSection={
                    isSubmitting && <PremiumLoader size='xs' minHeight='20px' />
                  }
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
