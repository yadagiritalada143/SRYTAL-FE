import { useState, useEffect } from 'react';
import {
  Modal,
  Stack,
  TextInput,
  Select,
  Group,
  Loader,
  Text,
  FileInput,
  Image,
  Paper
} from '@mantine/core';
import { IconCheck, IconUpload, IconX } from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import { useUpdateCourse } from '@hooks/mutations/useUserMutations';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { getMediaSignedUrl } from '@services/user-services';
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
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [existingThumbUrl, setExistingThumbUrl] = useState<string | null>(null);

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
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setExistingThumbUrl(null);
  } else if (!opened && seededFor !== null) {
    // Clear on close so reopening the same course re-reads fresh data.
    setSeededFor(null);
  }

  useEffect(() => {
    if (!opened || !course?.thumbnail) {
      setExistingThumbUrl(null);
      return;
    }
    let cancelled = false;
    getMediaSignedUrl(course.thumbnail)
      .then(url => {
        if (!cancelled) setExistingThumbUrl(url);
      })
      .catch(() => {
        if (!cancelled) setExistingThumbUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [opened, course?.thumbnail]);

  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  const handleThumbnailChange = (file: File | null) => {
    setThumbnailFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setThumbnailPreview(null);
    }
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
        thumbnail: thumbnailFile || undefined,
        status
      });
      showSuccessToast('Course updated successfully!');
      onClose();
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to update course'));
    }
  };

  const hasNewFile = !!thumbnailFile;
  const showNewPreview = hasNewFile && thumbnailPreview;
  const showExisting = !hasNewFile && existingThumbUrl;

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

        <Stack gap={4}>
          <Text size='sm' fw={500}>
            Course Thumbnail
          </Text>

          {showNewPreview ? (
            <Paper radius='md' withBorder p='sm'>
              <Group gap='sm' align='center' wrap='nowrap'>
                <Image
                  src={thumbnailPreview}
                  height={80}
                  w={140}
                  radius='md'
                  fit='cover'
                  alt='New thumbnail'
                />
                <Stack gap='xs' style={{ flex: 1, minWidth: 0 }}>
                  <Text size='sm' fw={500} lineClamp={1}>
                    {thumbnailFile?.name}
                  </Text>
                  <Text size='xs' c='dimmed'>
                    {(thumbnailFile!.size / 1024 / 1024).toFixed(2)} MB
                  </Text>
                  <CommonButton
                    variant='light'
                    color='red'
                    size='xs'
                    leftSection={<IconX size={12} />}
                    onClick={() => {
                      setThumbnailFile(null);
                      setThumbnailPreview(null);
                    }}
                    style={{ width: 'fit-content' }}
                  >
                    Remove
                  </CommonButton>
                </Stack>
              </Group>
            </Paper>
          ) : showExisting ? (
            <Paper radius='md' withBorder p='sm'>
              <Group gap='sm' align='center' wrap='nowrap'>
                <Image
                  src={existingThumbUrl}
                  height={80}
                  w={140}
                  radius='md'
                  fit='cover'
                  alt='Current thumbnail'
                />
                <Stack gap='xs' style={{ flex: 1, minWidth: 0 }}>
                  <Text size='sm' fw={500}>
                    Current thumbnail
                  </Text>
                  <FileInput
                    placeholder='Replace image'
                    accept='image/*'
                    value={null}
                    onChange={handleThumbnailChange}
                    leftSection={<IconUpload size={14} />}
                    size='xs'
                    styles={{ input: { minHeight: 32, fontSize: 12 } }}
                  />
                </Stack>
              </Group>
            </Paper>
          ) : (
            <FileInput
              placeholder='Click to upload or drag and drop'
              accept='image/*'
              value={thumbnailFile}
              onChange={handleThumbnailChange}
              leftSection={<IconUpload size={16} />}
            />
          )}
        </Stack>

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
