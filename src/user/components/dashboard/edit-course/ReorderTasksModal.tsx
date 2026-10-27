import { useState, type DragEvent } from 'react';
import {
  Badge,
  Group,
  Modal,
  Paper,
  ScrollArea,
  Stack,
  Text
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import { useReorderCourseTasks } from '@hooks/mutations/useUserMutations';
import { useAppTheme } from '@hooks/use-app-theme';
import { Module, Task } from '@interfaces/contentwriter';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { moveItem, sortByOrderIdx } from '@utils/common/course-order';

interface ReorderTasksModalProps {
  opened: boolean;
  onClose: () => void;
  courseId: string;
  module?: Module;
}

const hasSameOrder = (
  previous: Array<{ _id: string }>,
  next: Array<{ _id: string }>
): boolean =>
  previous.length === next.length &&
  previous.every((item, index) => item._id === next[index]?._id);

const ReorderTasksModal = ({
  opened,
  onClose,
  courseId,
  module
}: ReorderTasksModalProps) => {
  const { themeConfig } = useAppTheme();
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const { mutateAsync: reorderTasks } = useReorderCourseTasks(courseId);

  const [draftTasks, setDraftTasks] = useState<Task[]>([]);
  const [initialTasks, setInitialTasks] = useState<Task[]>([]);
  const [seededModuleId, setSeededModuleId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dropTargetTaskId, setDropTargetTaskId] = useState<string | null>(null);

  if (opened && module && seededModuleId !== module._id) {
    const seeded = sortByOrderIdx(module.tasks);
    setDraftTasks(seeded);
    setInitialTasks(seeded);
    setSeededModuleId(module._id);
  } else if (!opened && seededModuleId !== null) {
    setSeededModuleId(null);
  }

  const hasChanges = !hasSameOrder(initialTasks, draftTasks);

  const resetDrag = () => {
    setDraggedTaskId(null);
    setDropTargetTaskId(null);
  };

  const handleDragStart = (event: DragEvent<HTMLElement>, taskId: string) => {
    if (isSaving) {
      event.preventDefault();
      return;
    }
    setDraggedTaskId(taskId);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', taskId);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLElement>, taskId: string) => {
    if (isSaving || !draggedTaskId || draggedTaskId === taskId) return;
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
    setDropTargetTaskId(taskId);
  };

  const handleDrop = (event: DragEvent<HTMLElement>, targetId: string) => {
    event.preventDefault();
    event.stopPropagation();
    const sourceId = draggedTaskId;
    resetDrag();
    if (!sourceId || sourceId === targetId) return;
    setDraftTasks(previous => {
      const from = previous.findIndex(task => task._id === sourceId);
      const to = previous.findIndex(task => task._id === targetId);
      return from < 0 || to < 0 ? previous : moveItem(previous, from, to);
    });
  };

  const handleClose = () => {
    if (isSaving) return;
    onClose();
  };

  const handleSave = async () => {
    if (!hasChanges || isSaving || !module) return;
    setIsSaving(true);
    try {
      await reorderTasks({
        moduleId: module._id,
        tasks: draftTasks.map((task, index) => ({
          taskId: task._id,
          orderIdx: index + 1
        }))
      });
      showSuccessToast('Task order updated.');
      onClose();
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to reorder tasks'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title='Reorder Tasks'
      centered
      size='lg'
      radius='lg'
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      transitionProps={{ transition: 'pop', duration: 200 }}
      styles={{
        header: {
          backgroundColor: themeConfig.cardBackground,
          borderBottom: `1px solid ${themeConfig.borderColor}`,
          paddingBottom: '12px'
        },
        title: {
          fontWeight: 700,
          fontSize: '1.1rem',
          color: themeConfig.color
        },
        content: {
          backgroundColor: themeConfig.cardBackground,
          color: themeConfig.color,
          borderRadius: '16px'
        }
      }}
    >
      <Stack gap='md' className='mt-4'>
        <Text size='xs' c='dimmed'>
          Drag the tasks in{' '}
          <Text component='span' fw={600} size='xs'>
            {module?.moduleName}
          </Text>{' '}
          up or down. Changes are saved when you click Save Changes.
        </Text>

        <ScrollArea.Autosize mah={430} scrollbarSize={6} offsetScrollbars>
          <Stack gap='sm' pr={4}>
            {draftTasks.length === 0 ? (
              <Paper
                p='lg'
                radius='md'
                withBorder
                style={{
                  borderColor: themeConfig.borderColor,
                  textAlign: 'center'
                }}
              >
                <Text size='sm' c='dimmed'>
                  No tasks in this module yet.
                </Text>
              </Paper>
            ) : (
              draftTasks.map((task, taskIndex) => (
                <Paper
                  key={task._id}
                  data-testid={`task-${task._id}`}
                  draggable={!isSaving}
                  onDragStart={event => handleDragStart(event, task._id)}
                  onDragOver={event => handleDragOver(event, task._id)}
                  onDrop={event => handleDrop(event, task._id)}
                  onDragEnd={resetDrag}
                  p='sm'
                  radius='md'
                  withBorder
                  style={{
                    borderColor:
                      dropTargetTaskId === task._id
                        ? 'var(--mantine-color-indigo-5)'
                        : themeConfig.borderColor,
                    outline:
                      dropTargetTaskId === task._id
                        ? '2px dashed var(--mantine-color-indigo-4)'
                        : undefined,
                    outlineOffset: 2,
                    opacity: draggedTaskId === task._id ? 0.5 : 1,
                    cursor: isSaving ? 'not-allowed' : 'grab',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Group gap='xs' wrap='nowrap' style={{ minWidth: 0 }}>
                    <Badge
                      variant='outline'
                      color='indigo'
                      radius='sm'
                      size='sm'
                      style={{ flexShrink: 0 }}
                    >
                      {taskIndex + 1}
                    </Badge>
                    <Text
                      fw={600}
                      size='sm'
                      lineClamp={1}
                      style={{ color: themeConfig.color }}
                    >
                      {task.taskName}
                    </Text>
                  </Group>
                </Paper>
              ))
            )}
          </Stack>
        </ScrollArea.Autosize>

        <Group justify='space-between' align='center'>
          <Text size='xs' c='dimmed'>
            {hasChanges ? 'You have unsaved changes.' : 'No changes yet.'}
          </Text>
          <Group gap='sm'>
            <CommonButton
              variant='default'
              onClick={handleClose}
              disabled={isSaving}
            >
              Cancel
            </CommonButton>
            <CommonButton
              leftSection={<IconCheck size={16} />}
              disabled={!hasChanges || isSaving}
              loading={isSaving}
              onClick={handleSave}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </CommonButton>
          </Group>
        </Group>
      </Stack>
    </Modal>
  );
};

export default ReorderTasksModal;
