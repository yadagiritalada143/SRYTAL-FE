import { Button, Textarea, Card, Stack, Text } from '@mantine/core';
import { addCommentByRecruiter } from '../../../../services/user-services';
import { useCustomToast } from '../../../../utils/common/toast';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { IconMessagePlus } from '@tabler/icons-react';

const AddCommentPoolCompany = ({
  setComments,
  companyId,
  user,
  isMobile
}: {
  user: any;
  companyId: string;
  setComments: any;
  comments: any;
  isMobile: boolean | undefined;
}) => {
  const { showSuccessToast } = useCustomToast();
  const [newComment, setNewComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    setIsSubmitting(true);
    addCommentByRecruiter(companyId, newComment)
      .then(() => {
        showSuccessToast('Your comment has been added!');
        const comment = {
          userId: {
            firstName: user.firstName,
            lastName: user.lastName
          },
          updateAt: new Date().toISOString(),
          comment: newComment
        };
        setComments((prev: any) => [comment, ...prev]);
        setNewComment('');
      })
      .catch(error =>
        toast.error(error?.response?.data?.message || 'Something went wrong')
      )
      .finally(() => setIsSubmitting(false));
  };

  return (
    <Card shadow="sm" p={isMobile ? 'md' : 'lg'} radius="md" withBorder>
      <Stack gap="md">
        <Text size="lg" fw={600}>
          Add New Comment
        </Text>
        <Textarea
          placeholder="Enter your comment here..."
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
          leftSection={<IconMessagePlus size={16} />}
          fullWidth={isMobile}
          style={{ alignSelf: isMobile ? 'stretch' : 'flex-end' }}
          size={isMobile ? 'md' : 'sm'}
        >
          {isSubmitting ? 'Adding...' : 'Add Comment'}
        </Button>
      </Stack>
    </Card>
  );
};

export default AddCommentPoolCompany;
