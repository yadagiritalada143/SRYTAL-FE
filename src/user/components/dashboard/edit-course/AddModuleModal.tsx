import { useState } from 'react';
import {
  Modal,
  Stack,
  TextInput,
  Textarea,
  FileInput,
  Group,
  Loader
} from '@mantine/core';
import { IconUpload, IconCheck } from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import { useAddCourseModule } from '@hooks/mutations/useUserMutations';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';

interface AddModuleModalProps {
  opened: boolean;
  onClose: () => void;
  courseId: string;
}

const AddModuleModal = ({ opened, onClose, courseId }: AddModuleModalProps) => {
  const [moduleName, setModuleName] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const { mutateAsync: addModule, isPending } = useAddCourseModule();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const reset = () => {
    setModuleName('');
    setModuleDescription('');
    setThumbnail(null);
  };

  const handleClose = () => {
    if (isPending) return;
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    try {
      await addModule({
        courseId,
        moduleName: moduleName.trim(),
        moduleDescription: moduleDescription.trim(),
        thumbnail
      });
      showSuccessToast('Module added successfully!');
      reset();
      onClose();
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to add module'));
    }
  };

  return (
    <Modal opened={opened} onClose={handleClose} title='Add Module' centered>
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
        <FileInput
          label='Thumbnail (optional)'
          placeholder='Upload a thumbnail image'
          accept='image/*'
          leftSection={<IconUpload size={16} />}
          value={thumbnail}
          onChange={setThumbnail}
          clearable
        />
        <Group justify='flex-end' mt='sm'>
          <CommonButton variant='default' onClick={handleClose}>
            Cancel
          </CommonButton>
          <CommonButton
            leftSection={
              isPending ? <Loader size='xs' color='white' /> : <IconCheck size={16} />
            }
            disabled={!moduleName.trim() || isPending}
            onClick={handleSubmit}
          >
            {isPending ? 'Adding...' : 'Add Module'}
          </CommonButton>
        </Group>
      </Stack>
    </Modal>
  );
};

export default AddModuleModal;
