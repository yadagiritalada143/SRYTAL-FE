import {
  Card,
  Stack,
  Text,
  Badge,
  ActionIcon,
  Menu,
  Group,
  Box
} from '@mantine/core';
import {
  IconDots,
  IconEdit,
  IconArchive,
  IconTrash,
  IconLayersSubtract,
  IconListCheck,
  IconClock
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { organizationEmployeeUrls } from '@utils/common/constants';
import { useAppTheme } from '@hooks/use-app-theme';
import { Course } from '@interfaces/contentwriter';
import CourseThumbnail from './CourseThumbnail';

interface CourseCardProps {
  course: Course;
  onEdit?: (id: string) => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const CourseCard = ({
  course,
  onEdit,
  onArchive,
  onDelete
}: CourseCardProps) => {
  const navigate = useNavigate();
  const { themeConfig, organizationConfig } = useAppTheme();

  const goToCourse = () =>
    navigate(
      `${organizationEmployeeUrls(organizationConfig.organization_name)}/dashboard/course/${course._id}`
    );

  const stop = (e: React.MouseEvent) => e.stopPropagation();
  const hasMenu = onEdit || onArchive || onDelete;
  const description = course.courseDescription
    ? course.courseDescription.replace(/<[^>]*>/g, '').trim()
    : '';

  const moduleCount = course.modules?.length ?? 0;
  const taskCount =
    course.modules?.reduce((sum, m) => sum + (m.tasks?.length ?? 0), 0) ?? 0;

  return (
    <Card
      withBorder
      radius='lg'
      padding={0}
      onClick={goToCourse}
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
          color={course.status === 'ACTIVE' ? 'green' : 'blue'}
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          {course.status === 'ACTIVE' ? 'Active' : 'Archived'}
        </Badge>
        {hasMenu && (
          <Menu position='bottom-end' shadow='md' width={160}>
            <Menu.Target>
              <ActionIcon
                variant='filled'
                size='sm'
                color='dark'
                onClick={stop}
                aria-label='Course actions'
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  backdropFilter: 'blur(4px)'
                }}
              >
                <IconDots size={14} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {onEdit && (
                <Menu.Item
                  leftSection={<IconEdit size={14} />}
                  onClick={e => {
                    stop(e);
                    onEdit(course._id);
                  }}
                >
                  Edit
                </Menu.Item>
              )}
              {onArchive && (
                <Menu.Item
                  leftSection={<IconArchive size={14} />}
                  onClick={e => {
                    stop(e);
                    onArchive(course._id);
                  }}
                >
                  Archive
                </Menu.Item>
              )}
              {onDelete && (
                <>
                  <Menu.Divider
                    style={{ borderColor: themeConfig.borderColor }}
                  />
                  <Menu.Item
                    color='red'
                    leftSection={<IconTrash size={14} />}
                    onClick={e => {
                      stop(e);
                      onDelete(course._id);
                    }}
                  >
                    Delete
                  </Menu.Item>
                </>
              )}
            </Menu.Dropdown>
          </Menu>
        )}
      </Box>

      <Stack gap='sm' p='md' style={{ flex: 1 }}>
        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
          <Text fw={600} lineClamp={2}>
            {course.courseName}
          </Text>
          <Text size='xs' c='dimmed' lineClamp={2}>
            {description || 'No description available'}
          </Text>
        </Stack>

        <Group gap='lg' wrap='nowrap'>
          <Group gap={4} wrap='nowrap'>
            <IconLayersSubtract size={14} color={themeConfig.mutedTextColor} />
            <Text size='xs' c={themeConfig.mutedTextColor}>
              {moduleCount} module{moduleCount !== 1 ? 's' : ''}
            </Text>
          </Group>
          <Group gap={4} wrap='nowrap'>
            <IconListCheck size={14} color={themeConfig.mutedTextColor} />
            <Text size='xs' c={themeConfig.mutedTextColor}>
              {taskCount} task{taskCount !== 1 ? 's' : ''}
            </Text>
          </Group>
        </Group>

        {course.updatedAt && (
          <Group gap={4} wrap='nowrap'>
            <IconClock size={12} color={themeConfig.mutedTextColor} />
            <Text size='xs' c={themeConfig.mutedTextColor}>
              Updated{' '}
              {new Date(course.updatedAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </Text>
          </Group>
        )}
      </Stack>
    </Card>
  );
};

export default CourseCard;
