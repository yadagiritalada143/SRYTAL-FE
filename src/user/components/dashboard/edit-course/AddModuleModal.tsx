import { useState } from 'react';
import { Modal, Stack, TextInput, FileInput, Group } from '@mantine/core';
import { IconUpload, IconCheck } from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import { useAddCourseModule } from '@hooks/mutations/useUserMutations';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import DescriptionEditor from './DescriptionEditor';

interface AddModuleModalProps {
  opened: boolean;
  onClose: () => void;
  courseId: string;
}

const AddModuleModal = ({ opened, onClose, courseId }: AddModuleModalProps) => {
  const [moduleName, setModuleName] = useState('');
  const [moduleNameTouched, setModuleNameTouched] = useState(false);
  const [moduleDescription, setModuleDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const { mutateAsync: addModule, isPending } = useAddCourseModule();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const moduleNameError =
    moduleNameTouched && !moduleName.trim() ? 'Module Name is required' : '';

  const reset = () => {
    setModuleName('');
    setModuleNameTouched(false);
    setModuleDescription('');
    setThumbnail(null);
  };

  const handleClose = () => {
    if (isPending) return;
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (!moduleName.trim()) {
      setModuleNameTouched(true);
      return;
    }
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
    <Modal
      opened={opened}
      onClose={handleClose}
      title='Add Module'
      centered
      radius='lg'
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      transitionProps={{ transition: 'pop', duration: 200 }}
      styles={{
        header: {
          borderBottom: '1px solid var(--mantine-color-default-border)',
          paddingBottom: '12px'
        },
        title: {
          fontWeight: 700,
          fontSize: '1.1rem'
        },
        content: {
          borderRadius: '16px'
        }
      }}
    >
      <Stack gap='md' className='mt-4'>
        <TextInput
          label='Module Name'
          placeholder='Enter module name'
          required
          value={moduleName}
          onChange={e => setModuleName(e.target.value)}
          onBlur={() => setModuleNameTouched(true)}
          error={moduleNameError}
          radius='md'
        />
        <DescriptionEditor
          label='Module Description'
          value={moduleDescription}
          onChange={setModuleDescription}
        />
        <FileInput
          label='Thumbnail (optional)'
          placeholder='Upload a thumbnail image'
          accept='image/*'
          leftSection={<IconUpload size={16} />}
          value={thumbnail}
          onChange={setThumbnail}
          clearable
          radius='md'
        />
        <Group justify='flex-end' mt='sm'>
          <CommonButton variant='default' onClick={handleClose}>
            Cancel
          </CommonButton>
          <CommonButton
            leftSection={<IconCheck size={16} />}
            disabled={!moduleName.trim()}
            loading={isPending}
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
