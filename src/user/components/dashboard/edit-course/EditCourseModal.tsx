import { useState } from 'react';
import { Modal, Stack, TextInput, Select, Group, Loader, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import { useUpdateCourse } from '@hooks/mutations/useUserMutations';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import {
  Course,
  CourseStatus,
  COURSE_STATUSES
} from '@interfaces/contentwriter';
import DescriptionEditor from './DescriptionEditor';

interface EditCourseModalProps {
  opened: boolean;
  onClose: () => void;
  course?: Course;
}

const EditCourseModal = ({ opened, onClose, course }: EditCourseModalProps) => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [status, setStatus] = useState<CourseStatus>('ACTIVE');

  const { mutateAsync: updateCourse, isPending } = useUpdateCourse();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  // Refill the form each time the modal opens so a cancelled edit does not
  // leak into the next one. This seeds during render rather than in an effect
  // because the rich-text editor reads its content once, on mount — an effect
  // would run too late and the editor would show the previous description.
  const [seededFor, setSeededFor] = useState<string | null>(null);
  if (opened && course && seededFor !== course._id) {
    setSeededFor(course._id);
    setCourseName(course.courseName || '');
    setCourseDescription(course.courseDescription || '');
    setStatus((course.status as CourseStatus) || 'ACTIVE');
  } else if (!opened && seededFor !== null) {
    // Clear on close so reopening the same course re-reads fresh data.
    setSeededFor(null);
  }

  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  const handleSubmit = async () => {
    if (!course) return;
    try {
      await updateCourse({
        id: course._id,
        courseName: courseName.trim(),
        courseDescription,
        // The endpoint takes the thumbnail as a plain string, so the stored S3
        // key is sent back unchanged.
        thumbnail: course.thumbnail,
        status
      });
      showSuccessToast('Course updated successfully!');
      onClose();
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to update course'));
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title='Edit Course'
      centered
      size='lg'
    >
      <Stack gap='md'>
        <TextInput
          label='Course Name'
          placeholder='Enter course name'
          required
          value={courseName}
          onChange={e => setCourseName(e.target.value)}
        />

        <DescriptionEditor
          label='Course Description'
          value={courseDescription}
          onChange={setCourseDescription}
          resetKey={seededFor ?? undefined}
        />

        <Select
          label='Status'
          data={COURSE_STATUSES}
          value={status}
          onChange={value => setStatus((value as CourseStatus) || 'ACTIVE')}
          allowDeselect={false}
          comboboxProps={{ withinPortal: true }}
        />

        <Text size='xs' c='dimmed'>
          The course thumbnail can only be set when the course is created.
        </Text>

        <Group justify='flex-end' mt='sm'>
          <CommonButton variant='default' onClick={handleClose}>
            Cancel
          </CommonButton>
          <CommonButton
            leftSection={
              isPending ? (
                <Loader size='xs' color='white' />
              ) : (
                <IconCheck size={16} />
              )
            }
            disabled={!courseName.trim() || isPending}
            onClick={handleSubmit}
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </CommonButton>
        </Group>
      </Stack>
    </Modal>
  );
};

export default EditCourseModal;
