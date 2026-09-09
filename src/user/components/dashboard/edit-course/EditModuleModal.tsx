import { useEffect, useState } from 'react';
import {
  Modal,
  Stack,
  TextInput,
  Textarea,
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
import { useUpdateCourseModule } from '@hooks/mutations/useUserMutations';
import { useAppTheme } from '@hooks/use-app-theme';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import {
  Module,
  CourseStatus,
  COURSE_STATUSES
} from '@interfaces/contentwriter';
import CourseThumbnail from '../content-writer/CourseThumbnail';

interface EditModuleModalProps {
  opened: boolean;
  onClose: () => void;
  module?: Module;
  courseId: string;
}

const EditModuleModal = ({
  opened,
  onClose,
  module,
  courseId
}: EditModuleModalProps) => {
  const { themeConfig: currentThemeConfig } = useAppTheme();
  const [moduleName, setModuleName] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<CourseStatus>('ACTIVE');

  const { mutateAsync: updateModule, isPending } =
    useUpdateCourseModule(courseId);
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

  // Seeded during render so the form always reflects the module just opened.
  const [seededFor, setSeededFor] = useState<string | null>(null);
  if (opened && module && seededFor !== module._id) {
    setSeededFor(module._id);
    setModuleName(module.moduleName || '');
    setModuleDescription(module.moduleDescription || '');
    setThumbnail(null);
    setStatus((module.status as CourseStatus) || 'ACTIVE');
  } else if (!opened && seededFor !== null) {
    setSeededFor(null);
  }

  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  const handleSubmit = async () => {
    if (!module) return;
    try {
      await updateModule({
        id: module._id,
        moduleName: moduleName.trim(),
        moduleDescription: moduleDescription.trim(),
        // A selected file replaces the stored thumbnail; leaving it empty
        // (the modal's default) keeps the existing image.
        thumbnail,
        status
      });
      showSuccessToast('Module updated successfully!');
      onClose();
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to update module'));
    }
  };

  return (
    <Modal opened={opened} onClose={handleClose} title='Edit Module' centered>
      <Stack gap='md'>
        <TextInput
          label='Module Name'
          placeholder='Enter module name'
          required
          value={moduleName}
          onChange={e => setModuleName(e.target.value)}
        />
        <Textarea
          label='Module Description'
          placeholder='What does this module cover?'
          autosize
          minRows={3}
          value={moduleDescription}
          onChange={e => setModuleDescription(e.target.value)}
        />

        <Stack gap={6}>
          <Text size='sm' fw={500}>
            Thumbnail{' '}
            {(module?.thumbnailUrl || module?.thumbnail) && (
              <Text component='span' c='dimmed' size='xs' fw={400}>
                (optional)
              </Text>
            )}
          </Text>

          {(thumbPreview || module?.thumbnailUrl || module?.thumbnail) && (
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
                    name={module?.moduleName || 'Module'}
                    src={module?.thumbnailUrl || module?.thumbnail}
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
              module?.thumbnailUrl || module?.thumbnail
                ? 'Choose a new thumbnail image'
                : 'Upload a thumbnail image'
            }
            accept='image/*'
            leftSection={<IconUpload size={16} />}
            value={thumbnail}
            onChange={setThumbnail}
            clearable
            description={
              !module?.thumbnailUrl && !module?.thumbnail && !thumbPreview
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
            disabled={!moduleName.trim() || isPending}
            onClick={handleSubmit}
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </CommonButton>
        </Group>
      </Stack>
    </Modal>
  );
};

export default EditModuleModal;
