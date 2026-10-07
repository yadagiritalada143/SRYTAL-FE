import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Modal,
  Stack,
  TextInput,
  FileInput,
  SegmentedControl,
  Group,
  Text,
  Loader,
  Paper,
  ThemeIcon
} from '@mantine/core';
import {
  IconUpload,
  IconCheck,
  IconLink,
  IconFile,
  IconCode
} from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import { useAddCourseTask } from '@hooks/mutations/useUserMutations';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { commonUrls } from '@utils/common/constants';
import { saveTaskPopupState } from './task-popup-state';
import DescriptionEditor from './DescriptionEditor';

interface AddTaskModalProps {
  opened: boolean;
  onClose: () => void;
  moduleId: string;
  courseId: string;
}

type ContentMode = 'LINK' | 'FILE' | 'CODING';

const AddTaskModal = ({
  opened,
  onClose,
  moduleId,
  courseId
}: AddTaskModalProps) => {
  const { organization = '' } = useParams();
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [mode, setMode] = useState<ContentMode>('LINK');
  const [link, setLink] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const { mutateAsync: addTask, isPending } = useAddCourseTask(courseId);
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const reset = () => {
    setTaskName('');
    setTaskDescription('');
    setMode('LINK');
    setLink('');
    setFile(null);
    setThumbnail(null);
  };

  const handleClose = () => {
    if (isPending) return;
    reset();
    onClose();
  };

  const handleManageLanguages = () => {
    saveTaskPopupState({ courseId, moduleId });
    navigate(
      `${commonUrls(organization)}/dashboard/content-writer/programming-languages`
    );
  };

  const hasContent =
    mode === 'LINK' ? !!link.trim() : mode === 'FILE' ? !!file : true;
  const isValid = !!taskName.trim() && hasContent;

  const handleSubmit = async () => {
    try {
      await addTask({
        moduleId,
        taskName: taskName.trim(),
        taskDescription: taskDescription.trim(),
        type: mode === 'CODING' ? 'CODE' : mode,
        link: mode === 'LINK' ? link.trim() : undefined,
        file: mode === 'FILE' ? file : undefined,
        thumbnail
      });
      showSuccessToast('Task added successfully!');
      reset();
      onClose();
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to add task'));
    }
  };

  return (
    <Modal opened={opened} onClose={handleClose} title='Add Task' centered>
      <Stack gap='md'>
        <TextInput
          label='Title'
          placeholder='e.g. Introduction video, Reading material'
          required
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
        />
        <DescriptionEditor
          label='Description'
          value={taskDescription}
          onChange={setTaskDescription}
        />

        <Stack gap='xs'>
          <Text size='sm' fw={600}>
            Task Type
          </Text>
          <SegmentedControl
            fullWidth
            value={mode}
            onChange={value => setMode(value as ContentMode)}
            data={[
              {
                value: 'LINK',
                label: (
                  <Group gap={6} justify='center'>
                    <IconLink size={16} />
                    <span>Link</span>
                  </Group>
                )
              },
              {
                value: 'FILE',
                label: (
                  <Group gap={6} justify='center'>
                    <IconFile size={16} />
                    <span>File</span>
                  </Group>
                )
              },
              {
                value: 'CODING',
                label: (
                  <Group gap={6} justify='center'>
                    <IconCode size={16} />
                    <span>Coding</span>
                  </Group>
                )
              }
            ]}
          />
        </Stack>

        {mode === 'LINK' ? (
          <TextInput
            label='Link URL'
            placeholder='https://youtube.com/... or any blog/article URL'
            required
            leftSection={<IconLink size={16} />}
            value={link}
            onChange={e => setLink(e.target.value)}
            description='YouTube, blog posts, articles, or any public URL'
          />
        ) : mode === 'FILE' ? (
          <FileInput
            label='File'
            placeholder='Upload a PDF, Word, or any file'
            leftSection={<IconUpload size={16} />}
            value={file}
            onChange={setFile}
            required
            clearable
            description='Any file type is supported'
          />
        ) : (
          <Stack gap='xs'>
            <Paper p='xs' radius='md' withBorder>
              <Group gap='xs' wrap='nowrap' align='flex-start'>
                <ThemeIcon size={24} radius='md' variant='light'>
                  <IconCode size={14} />
                </ThemeIcon>
                <Text size='xs' c='dimmed'>
                  The title above becomes the coding question and the description
                  becomes the problem statement learners solve.
                </Text>
              </Group>
            </Paper>
            <CommonButton
              variant='light'
              leftSection={<IconCode size={16} />}
              onClick={handleManageLanguages}
              style={{ width: 'fit-content' }}
            >
              Add Programming Language
            </CommonButton>
          </Stack>
        )}

        <FileInput
          label='Thumbnail (optional)'
          placeholder='Upload a thumbnail image'
          accept='image/*'
          leftSection={<IconUpload size={16} color='gray' />}
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
              isPending ? (
                <Loader size='xs' color='white' />
              ) : (
                <IconCheck size={16} />
              )
            }
            disabled={!isValid || isPending}
            onClick={handleSubmit}
          >
            {isPending ? 'Adding...' : 'Add Task'}
          </CommonButton>
        </Group>
      </Stack>
    </Modal>
  );
};

export default AddTaskModal;
