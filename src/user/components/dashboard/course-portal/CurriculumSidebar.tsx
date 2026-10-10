import {
  Accordion,
  Badge,
  Box,
  Group,
  Progress,
  Stack,
  Text,
  UnstyledButton
} from '@mantine/core';
import {
  IconCircleCheckFilled,
  IconCircleDashed,
  IconCode,
  IconFile,
  IconFileText,
  IconHelpCircle,
  IconLink,
  IconMusic,
  IconPhoto,
  IconPlayerPlay
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { AssignedModule, AssignedTask } from '@interfaces/course-assignment';
import { isCodingTask } from './task-content';

interface CurriculumSidebarProps {
  modules: AssignedModule[];
  activeTaskId?: string;
  openModuleIds: string[];
  onOpenModulesChange: (moduleIds: string[]) => void;
  onSelectTask: (task: AssignedTask, moduleId: string) => void;
}

export const getTaskTypeMeta = (task: AssignedTask) => {
  if (isCodingTask(task)) {
    return {
      label: 'Coding Challenge',
      icon: <IconCode size={14} />,
      color: 'violet'
    };
  }

  const type = String(task.type || '').toUpperCase();
  if (type === 'QUIZ') {
    return {
      label: 'Quiz',
      icon: <IconHelpCircle size={14} />,
      color: 'orange'
    };
  }

  if (type === 'LINK') {
    return {
      label: 'Link',
      icon: <IconLink size={14} />,
      color: 'blue'
    };
  }

  const mime = (task.contentMimeType || '').toLowerCase();
  const fileName = (task.contentFileName || '').toLowerCase();

  if (mime.startsWith('video/') || fileName.match(/\.(mp4|webm|mov|mkv)$/)) {
    return {
      label: 'Video',
      icon: <IconPlayerPlay size={14} />,
      color: 'blue'
    };
  }

  if (mime.startsWith('audio/') || fileName.match(/\.(mp3|wav|ogg|m4a)$/)) {
    return {
      label: 'Audio',
      icon: <IconMusic size={14} />,
      color: 'teal'
    };
  }

  if (
    mime.startsWith('image/') ||
    fileName.match(/\.(png|jpg|jpeg|gif|webp)$/)
  ) {
    return {
      label: 'Image',
      icon: <IconPhoto size={14} />,
      color: 'green'
    };
  }

  if (mime === 'application/pdf' || fileName.endsWith('.pdf')) {
    return {
      label: 'PDF Document',
      icon: <IconFileText size={14} />,
      color: 'red'
    };
  }

  if (mime.startsWith('text/') || fileName.match(/\.(txt|md|csv|doc|docx)$/)) {
    return {
      label: 'Document',
      icon: <IconFileText size={14} />,
      color: 'indigo'
    };
  }

  return {
    label: 'File',
    icon: <IconFile size={14} />,
    color: 'gray'
  };
};

const CurriculumSidebar = ({
  modules,
  activeTaskId,
  openModuleIds,
  onOpenModulesChange,
  onSelectTask
}: CurriculumSidebarProps) => {
  const { themeConfig } = useAppTheme();
  const accentColor =
    themeConfig?.button?.color || themeConfig?.primaryColor || '#495057';

  return (
    <Accordion
      multiple
      value={openModuleIds}
      onChange={onOpenModulesChange}
      variant='separated'
      radius='md'
      styles={{
        item: {
          backgroundColor: themeConfig?.cardBackground,
          borderColor: themeConfig?.borderColor
        },
        content: { padding: 0 }
      }}
    >
      {modules.map((module, moduleIndex) => {
        const percent =
          module.totalTasks === 0
            ? 0
            : Math.round((module.completedTasks / module.totalTasks) * 100);

        return (
          <Accordion.Item key={module._id} value={module._id}>
            <Accordion.Control>
              <Stack gap={6}>
                <Group justify='space-between' wrap='nowrap' gap='xs'>
                  <Text
                    fw={600}
                    size='sm'
                    lineClamp={2}
                    style={{ minWidth: 0 }}
                  >
                    {moduleIndex + 1}. {module.moduleName}
                  </Text>
                  <Badge
                    size='sm'
                    variant='light'
                    color={percent === 100 ? 'teal' : 'gray'}
                  >
                    {module.completedTasks}/{module.totalTasks}
                  </Badge>
                </Group>
                <Progress
                  value={percent}
                  size='xs'
                  radius='xl'
                  color={percent === 100 ? 'teal' : themeConfig?.primaryColor}
                />
              </Stack>
            </Accordion.Control>

            <Accordion.Panel>
              <Box style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <Stack gap={0} pb='xs'>
                  {module.tasks.length === 0 && (
                    <Text
                      size='xs'
                      c={themeConfig?.mutedTextColor}
                      px='md'
                      py='sm'
                    >
                      No content in this module yet.
                    </Text>
                  )}

                  {module.tasks.map(task => {
                    const isActive = task._id === activeTaskId;
                    const meta = getTaskTypeMeta(task);

                    return (
                      <UnstyledButton
                        key={task._id}
                        onClick={() => onSelectTask(task, module._id)}
                        px='md'
                        py='sm'
                        style={{
                          borderLeft: `3px solid ${
                            isActive ? accentColor : 'transparent'
                          }`,
                          backgroundColor: isActive
                            ? `${accentColor}14`
                            : 'transparent',
                          transition: 'background-color 0.15s ease'
                        }}
                      >
                        <Group gap='sm' wrap='nowrap' align='flex-start'>
                          <Box
                            mt={2}
                            style={{
                              flexShrink: 0,
                              display: 'flex',
                              color: task.isCompleted
                                ? accentColor
                                : themeConfig?.mutedTextColor
                            }}
                          >
                            {task.isCompleted ? (
                              <IconCircleCheckFilled size={18} />
                            ) : (
                              <IconCircleDashed size={18} />
                            )}
                          </Box>
                          <Stack gap={2} style={{ minWidth: 0, flex: 1 }}>
                            <Text
                              size='sm'
                              lineClamp={2}
                              fw={isActive ? 600 : 400}
                              c={isActive ? accentColor : undefined}
                            >
                              {task.taskName}
                            </Text>
                            <Group
                              gap={6}
                              wrap='nowrap'
                              c={themeConfig?.mutedTextColor}
                            >
                              <Box
                                style={{
                                  display: 'flex',
                                  color: isActive ? accentColor : undefined
                                }}
                              >
                                {meta.icon}
                              </Box>
                              <Text
                                size='xs'
                                c={
                                  isActive
                                    ? accentColor
                                    : themeConfig?.mutedTextColor
                                }
                              >
                                {meta.label}
                              </Text>
                            </Group>
                          </Stack>
                        </Group>
                      </UnstyledButton>
                    );
                  })}
                </Stack>
              </Box>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default CurriculumSidebar;
