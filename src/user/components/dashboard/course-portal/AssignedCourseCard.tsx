import { Badge, Box, Card, Group, Progress, Stack, Text } from '@mantine/core';
import {
  IconAlertTriangle,
  IconCalendarDue,
  IconLayersSubtract,
  IconListCheck
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { CommonButton } from '@components/common/button/CommonButton';
import { AssignedCourse } from '@interfaces/course-assignment';
import CourseThumbnail from '../content-writer/CourseThumbnail';
import {
  daysUntilDue,
  formatDueDate,
  statusColor,
  statusLabel
} from './course-status';

interface AssignedCourseCardProps {
  course: AssignedCourse;
  onOpen: (courseAssignmentId: string) => void;
}

/** "Start" for an untouched course, "Review" once it's finished. */
const actionLabel = (course: AssignedCourse) => {
  if (course.progress.completedTasks === 0) return 'Start course';
  if (course.status === 'Completed') return 'Review course';
  return 'Continue';
};

const dueHint = (course: AssignedCourse) => {
  if (course.status === 'Completed') return formatDueDate(course.dueDate);
  const days = daysUntilDue(course.dueDate);
  if (days === null) return 'No due date';
  if (days < 0) return `${Math.abs(days)} day${days === -1 ? '' : 's'} overdue`;
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  if (days <= 14) return `Due in ${days} days`;
  return `Due ${formatDueDate(course.dueDate)}`;
};

const AssignedCourseCard = ({ course, onOpen }: AssignedCourseCardProps) => {
  const { themeConfig } = useAppTheme();
  const { percentComplete, completedTasks, totalTasks } = course.progress;
  const isComplete = percentComplete === 100;

  return (
    <Card
      withBorder
      radius='lg'
      padding={0}
      onClick={() => onOpen(course.courseAssignmentId)}
      style={{
        cursor: 'pointer',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderColor: themeConfig.borderColor
      }}
    >
      <Box style={{ position: 'relative' }}>
        <CourseThumbnail
          name={course.courseName}
          src={course.thumbnailUrl}
          size='100%'
          height={140}
          radius={0}
        />
        <Badge
          size='sm'
          variant='filled'
          color={statusColor(course.status, course.isOverdue)}
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          {course.isOverdue ? 'Overdue' : statusLabel(course.status)}
        </Badge>
      </Box>

      <Stack gap='sm' p='md' style={{ flex: 1 }}>
        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
          <Text fw={600} lineClamp={2}>
            {course.courseName}
          </Text>
          <Group gap='md' wrap='nowrap' c={themeConfig.mutedTextColor}>
            <Group gap={4} wrap='nowrap'>
              <IconLayersSubtract size={14} />
              <Text size='xs' c={themeConfig.mutedTextColor}>
                {course.totalModules} modules
              </Text>
            </Group>
            <Group gap={4} wrap='nowrap'>
              <IconListCheck size={14} />
              <Text size='xs' c={themeConfig.mutedTextColor}>
                {totalTasks} items
              </Text>
            </Group>
          </Group>
        </Stack>

        <Stack gap={4}>
          <Group justify='space-between'>
            <Text size='xs' c={themeConfig.mutedTextColor}>
              {completedTasks}/{totalTasks} complete
            </Text>
            <Text size='xs' fw={600}>
              {percentComplete}%
            </Text>
          </Group>
          <Progress
            value={percentComplete}
            size='sm'
            radius='xl'
            color={isComplete ? 'teal' : themeConfig.primaryColor}
          />
        </Stack>

        <Group gap={4} wrap='nowrap'>
          {course.isOverdue ? (
            <IconAlertTriangle size={14} color={themeConfig.dangerColor} />
          ) : (
            <IconCalendarDue size={14} color={themeConfig.mutedTextColor} />
          )}
          <Text
            size='xs'
            c={
              course.isOverdue
                ? themeConfig.dangerColor
                : themeConfig.mutedTextColor
            }
          >
            {dueHint(course)}
          </Text>
        </Group>

        <CommonButton
          fullWidth
          variant={isComplete ? 'light' : 'filled'}
          onClick={event => {
            // The whole card is clickable; don't fire the handler twice.
            event.stopPropagation();
            onOpen(course.courseAssignmentId);
          }}
        >
          {actionLabel(course)}
        </CommonButton>
      </Stack>
    </Card>
  );
};

export default AssignedCourseCard;
