import { Button, Textarea, Card, Stack, Text, Loader } from '@mantine/core';
import { useAddCompanyComment } from '@hooks/mutations/useUserMutations';
import { useCustomToast } from '@utils/common/toast';
import { useState } from 'react';
import { IconMessagePlus } from '@tabler/icons-react';

const AddCommentPoolCompany = ({
  companyId,
  isMobile
}: {
  companyId: string;
  isMobile: boolean | undefined;
}) => {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const [newComment, setNewComment] = useState<string>('');
  const { mutateAsync: addComment, isPending: isSubmitting } =
    useAddCompanyComment();

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      showErrorToast('Please enter a comment');
      return;
    }

    try {
      await addComment({ id: companyId, comment: newComment });
      showSuccessToast('Your comment has been added!');
      setNewComment('');
    } catch (error: any) {
      showErrorToast(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Card shadow='sm' p={isMobile ? 'md' : 'lg'} radius='md' withBorder>
      <Stack gap='md'>
        <Text size='lg' fw={600}>
          Add New Comment
        </Text>
        <Textarea
          placeholder='Enter your comment here...'
          autosize
          minRows={4}
          maxRows={8}
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          size={isMobile ? 'sm' : 'md'}
        />
        <Button
          onClick={handleAddComment}
          disabled={isSubmitting || !newComment.trim()}
          leftSection={
            isSubmitting ? (
              <Loader size='xs' color='white' />
            ) : (
              <IconMessagePlus size={16} />
            )
          }
          fullWidth={isMobile}
          style={{ alignSelf: isMobile ? 'stretch' : 'flex-end' }}
          size={isMobile ? 'md' : 'sm'}
          radius='md'
        >
          {isSubmitting ? 'Adding...' : 'Add Comment'}
        </Button>
      </Stack>
    </Card>
  );
};

export default AddCommentPoolCompany;
