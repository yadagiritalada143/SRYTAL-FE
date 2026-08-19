import { useState } from 'react';
import {
  Modal,
  Stack,
  TextInput,
  Textarea,
  Select,
  Group,
  Loader,
  Text
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import { useUpdateCourseModule } from '@hooks/mutations/useUserMutations';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import {
  Module,
  CourseStatus,
  COURSE_STATUSES
} from '@interfaces/contentwriter';

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
  const [moduleName, setModuleName] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [status, setStatus] = useState<CourseStatus>('ACTIVE');

  const { mutateAsync: updateModule, isPending } =
    useUpdateCourseModule(courseId);
  const { showSuccessToast, showErrorToast } = useCustomToast();

  // Seeded during render so the form always reflects the module just opened.
  const [seededFor, setSeededFor] = useState<string | null>(null);
  if (opened && module && seededFor !== module._id) {
    setSeededFor(module._id);
    setModuleName(module.moduleName || '');
    setModuleDescription(module.moduleDescription || '');
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
        thumbnail: module.thumbnail,
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
        <Select
          label='Status'
          data={COURSE_STATUSES}
          value={status}
          onChange={value => setStatus((value as CourseStatus) || 'ACTIVE')}
          allowDeselect={false}
          comboboxProps={{ withinPortal: true }}
        />

        <Text size='xs' c='dimmed'>
          The module thumbnail can only be set when the module is created.
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
