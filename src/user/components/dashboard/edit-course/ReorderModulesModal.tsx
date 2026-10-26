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
import { useReorderCourseModules } from '@hooks/mutations/useUserMutations';
import { useAppTheme } from '@hooks/use-app-theme';
import { Module } from '@interfaces/contentwriter';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { moveItem, sortByOrderIdx } from '@utils/common/course-order';

interface ReorderModulesModalProps {
  opened: boolean;
  onClose: () => void;
  courseId: string;
  modules?: Module[] | null;
}

const hasSameOrder = (
  previous: Array<{ _id: string }>,
  next: Array<{ _id: string }>
): boolean =>
  previous.length === next.length &&
  previous.every((item, index) => item._id === next[index]?._id);

/**
 * Reorders a course's modules by dragging them up or down. Nothing is
 * persisted until Save, so Cancel discards every move.
 */
const ReorderModulesModal = ({
  opened,
  onClose,
  courseId,
  modules
}: ReorderModulesModalProps) => {
  const { themeConfig } = useAppTheme();
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const { mutateAsync: reorderModules } = useReorderCourseModules();

  const [draftModules, setDraftModules] = useState<Module[]>([]);
  const [initialModules, setInitialModules] = useState<Module[]>([]);
  const [seededCourseId, setSeededCourseId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [draggedModuleId, setDraggedModuleId] = useState<string | null>(null);
  const [dropTargetModuleId, setDropTargetModuleId] = useState<string | null>(
    null
  );

  if (opened && seededCourseId !== courseId) {
    const seeded = sortByOrderIdx(modules);
    setDraftModules(seeded);
    setInitialModules(seeded);
    setSeededCourseId(courseId);
  } else if (!opened && seededCourseId !== null) {
    setSeededCourseId(null);
  }

  const hasChanges = !hasSameOrder(initialModules, draftModules);

  const resetDrag = () => {
    setDraggedModuleId(null);
    setDropTargetModuleId(null);
  };

  const handleDragStart = (event: DragEvent<HTMLElement>, moduleId: string) => {
    if (isSaving) {
      event.preventDefault();
      return;
    }
    setDraggedModuleId(moduleId);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', moduleId);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLElement>, moduleId: string) => {
    if (isSaving || !draggedModuleId || draggedModuleId === moduleId) return;
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
    setDropTargetModuleId(moduleId);
  };

  const handleDrop = (event: DragEvent<HTMLElement>, targetId: string) => {
    event.preventDefault();
    event.stopPropagation();
    const sourceId = draggedModuleId;
    resetDrag();
    if (!sourceId || sourceId === targetId) return;
    setDraftModules(previous => {
      const from = previous.findIndex(module => module._id === sourceId);
      const to = previous.findIndex(module => module._id === targetId);
      return from < 0 || to < 0 ? previous : moveItem(previous, from, to);
    });
  };

  const handleClose = () => {
    if (isSaving) return;
    onClose();
  };

  const handleSave = async () => {
    if (!hasChanges || isSaving) return;
    setIsSaving(true);
    try {
      await reorderModules({
        courseId,
        modules: draftModules.map((module, index) => ({
          moduleId: module._id,
          orderIdx: index + 1
        }))
      });
      showSuccessToast('Module order updated.');
      onClose();
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to reorder modules'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title='Reorder Modules'
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
          Drag a module up or down to change the curriculum order. Changes are
          saved when you click Save Changes.
        </Text>

        <ScrollArea.Autosize mah={430} scrollbarSize={6} offsetScrollbars>
          <Stack gap='sm' pr={4}>
            {draftModules.length === 0 ? (
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
                  No modules to reorder yet.
                </Text>
              </Paper>
            ) : (
              draftModules.map((module, moduleIndex) => (
                <Paper
                  key={module._id}
                  data-testid={`module-${module._id}`}
                  draggable={!isSaving}
                  onDragStart={event => handleDragStart(event, module._id)}
                  onDragOver={event => handleDragOver(event, module._id)}
                  onDrop={event => handleDrop(event, module._id)}
                  onDragEnd={resetDrag}
                  p='sm'
                  radius='md'
                  withBorder
                  style={{
                    borderColor:
                      dropTargetModuleId === module._id
                        ? 'var(--mantine-color-indigo-5)'
                        : themeConfig.borderColor,
                    outline:
                      dropTargetModuleId === module._id
                        ? '2px dashed var(--mantine-color-indigo-4)'
                        : undefined,
                    outlineOffset: 2,
                    opacity: draggedModuleId === module._id ? 0.5 : 1,
                    cursor: isSaving ? 'not-allowed' : 'grab',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Group gap='xs' wrap='nowrap' style={{ minWidth: 0 }}>
                    <Badge
                      variant='filled'
                      color='indigo'
                      radius='sm'
                      size='sm'
                      style={{ flexShrink: 0 }}
                    >
                      MODULE {String(moduleIndex + 1).padStart(2, '0')}
                    </Badge>
                    <Text
                      fw={600}
                      size='sm'
                      lineClamp={1}
                      style={{ color: themeConfig.color }}
                    >
                      {module.moduleName}
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

export default ReorderModulesModal;
