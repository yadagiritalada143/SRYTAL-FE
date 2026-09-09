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
  IconFile,
  IconLink,
  IconPlayerPlay
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { AssignedModule, AssignedTask } from '@interfaces/course-assignment';

interface CurriculumSidebarProps {
  modules: AssignedModule[];
  activeTaskId?: string;
  /** Module ids the accordion should start open on (the active module). */
  openModuleIds: string[];
  onOpenModulesChange: (moduleIds: string[]) => void;
  onSelectTask: (task: AssignedTask, moduleId: string) => void;
}

const taskIcon = (task: AssignedTask, isActive: boolean) => {
  if (isActive) return <IconPlayerPlay size={14} />;
  return task.type === 'LINK' ? <IconLink size={14} /> : <IconFile size={14} />;
};

/**
 * The course curriculum: modules as an accordion, each listing its tasks with
 * their completion state. Selecting a task swaps the player's content; the
 * completion ticks are read-only here (marking happens in the player, so there
 * is a single place that talks to the progress API).
 */
const CurriculumSidebar = ({
  modules,
  activeTaskId,
  openModuleIds,
  onOpenModulesChange,
  onSelectTask
}: CurriculumSidebarProps) => {
  const { themeConfig } = useAppTheme();

  return (
    <Accordion
      multiple
      value={openModuleIds}
      onChange={onOpenModulesChange}
      variant='separated'
      radius='md'
      styles={{
        item: {
          backgroundColor: themeConfig.cardBackground,
          borderColor: themeConfig.borderColor
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
                  color={percent === 100 ? 'teal' : themeConfig.primaryColor}
                />
              </Stack>
            </Accordion.Control>

            <Accordion.Panel>
              <Stack gap={0} pb='xs'>
                {module.tasks.length === 0 && (
                  <Text
                    size='xs'
                    c={themeConfig.mutedTextColor}
                    px='md'
                    py='sm'
                  >
                    No content in this module yet.
                  </Text>
                )}

                {module.tasks.map(task => {
                  const isActive = task._id === activeTaskId;

                  return (
                    <UnstyledButton
                      key={task._id}
                      onClick={() => onSelectTask(task, module._id)}
                      px='md'
                      py='sm'
                      style={{
                        borderLeft: `3px solid ${
                          isActive ? themeConfig.accentColor : 'transparent'
                        }`,
                        backgroundColor: isActive
                          ? themeConfig.headerBackgroundColor
                          : 'transparent'
                      }}
                    >
                      <Group gap='sm' wrap='nowrap' align='flex-start'>
                        <Box
                          mt={2}
                          style={{
                            flexShrink: 0,
                            display: 'flex',
                            color: task.isCompleted
                              ? themeConfig.successColor
                              : themeConfig.mutedTextColor
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
                            c={isActive ? themeConfig.accentColor : undefined}
                          >
                            {task.taskName}
                          </Text>
                          <Group
                            gap={6}
                            wrap='nowrap'
                            c={themeConfig.mutedTextColor}
                          >
                            {taskIcon(task, isActive)}
                            <Text size='xs' c={themeConfig.mutedTextColor}>
                              {task.type === 'LINK' ? 'Link' : 'File'}
                            </Text>
                          </Group>
                        </Stack>
                      </Group>
                    </UnstyledButton>
                  );
                })}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default CurriculumSidebar;
