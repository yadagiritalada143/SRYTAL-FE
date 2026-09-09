import { useEffect, useState } from 'react';
import {
  Modal,
  Stack,
  TextInput,
  Select,
  Group,
  Loader,
  FileInput,
  Image,
  Paper,
  Text
} from '@mantine/core';
import { IconCheck, IconUpload, IconX } from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import { useUpdateCourse } from '@hooks/mutations/useUserMutations';
import { useAppTheme } from '@hooks/use-app-theme';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import {
  Course,
  CourseStatus,
  COURSE_STATUSES
} from '@interfaces/contentwriter';
import DescriptionEditor from './DescriptionEditor';
import CourseThumbnail from '../content-writer/CourseThumbnail';

interface EditCourseModalProps {
  opened: boolean;
  onClose: () => void;
  course?: Course;
}

const EditCourseModal = ({ opened, onClose, course }: EditCourseModalProps) => {
  const { themeConfig: currentThemeConfig } = useAppTheme();
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<CourseStatus>('ACTIVE');

  const { mutateAsync: updateCourse, isPending } = useUpdateCourse();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  // Show a live preview of the chosen replacement file.
  useEffect(() => {
    if (!thumbnail) {
      setThumbPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setThumbPreview(reader.result as string);
    reader.readAsDataURL(thumbnail);
  }, [thumbnail]);

  // Refill the form each time the modal opens so a cancelled edit does not
  // leak into the next one. This seeds during render rather than in an effect
  // because the rich-text editor reads its content once, on mount — an effect
  // would run too late and the editor would show the previous description.
  const [seededFor, setSeededFor] = useState<string | null>(null);
  if (opened && course && seededFor !== course._id) {
    setSeededFor(course._id);
    setCourseName(course.courseName || '');
    setCourseDescription(course.courseDescription || '');
    setThumbnail(null);
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
        // A selected file replaces the stored thumbnail; leaving it empty
        // (the modal's default) keeps the existing image.
        thumbnail,
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

        <Stack gap={6}>
          <Text size='sm' fw={500}>
            Thumbnail{' '}
            {course?.thumbnailUrl && (
              <Text component='span' c='dimmed' size='xs' fw={400}>
                (optional)
              </Text>
            )}
          </Text>

          {(thumbPreview || course?.thumbnailUrl || course?.thumbnail) && (
            <Paper
              p='xs'
              radius='md'
              withBorder
              style={{ borderColor: currentThemeConfig.borderColor }}
            >
              <Group gap='sm' wrap='nowrap'>
                {thumbPreview ? (
                  <Image
                    src={thumbPreview}
                    w={64}
                    h={48}
                    radius='sm'
                    fit='cover'
                    alt='New thumbnail preview'
                    style={{ flexShrink: 0 }}
                  />
                ) : (
                  <CourseThumbnail
                    name={course?.courseName || 'Course'}
                    src={course?.thumbnailUrl || course?.thumbnail}
                    size={64}
                    height={48}
                    radius='sm'
                  />
                )}
                <Stack gap={0} style={{ minWidth: 0, flex: 1 }}>
                  <Text size='sm' fw={500} lineClamp={1}>
                    {thumbPreview ? thumbnail?.name : 'Current thumbnail'}
                  </Text>
                  <Text size='xs' c='dimmed' lineClamp={1}>
                    {thumbPreview
                      ? 'Replaces the current thumbnail when saved'
                      : 'Pick a file below to replace it'}
                  </Text>
                  {thumbPreview && (
                    <CommonButton
                      variant='light'
                      color='red'
                      size='xs'
                      leftSection={<IconX size={12} />}
                      onClick={() => setThumbnail(null)}
                      style={{ width: 'fit-content' }}
                      mt={4}
                    >
                      Remove
                    </CommonButton>
                  )}
                </Stack>
              </Group>
            </Paper>
          )}

          <FileInput
            placeholder={
              course?.thumbnailUrl || course?.thumbnail
                ? 'Choose a new thumbnail image'
                : 'Upload a thumbnail image'
            }
            accept='image/*'
            leftSection={<IconUpload size={16} />}
            value={thumbnail}
            onChange={setThumbnail}
            clearable
            description={
              !course?.thumbnailUrl && !course?.thumbnail && !thumbPreview
                ? 'No thumbnail yet — optional, but recommended'
                : undefined
            }
          />
        </Stack>

        <Select
          label='Status'
          data={COURSE_STATUSES}
          value={status}
          onChange={value => setStatus((value as CourseStatus) || 'ACTIVE')}
          allowDeselect={false}
          comboboxProps={{ withinPortal: true }}
        />

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
