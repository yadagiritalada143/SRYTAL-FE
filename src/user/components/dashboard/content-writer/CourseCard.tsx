import {
  Card,
  Stack,
  Text,
  Badge,
  ActionIcon,
  Menu,
  Group
} from '@mantine/core';
import {
  IconDots,
  IconEdit,
  IconArchive,
  IconCircleCheck,
  IconTrash,
  IconCopy
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { commonUrls } from '@utils/common/constants';
import { useAppTheme } from '@hooks/use-app-theme';
import { Course } from '@interfaces/contentwriter';
import CourseThumbnail from './CourseThumbnail';

const stripHtml = (html?: string): string =>
  (html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#160;/gi, ' ')
    .replace(/\u00A0/g, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();

interface CourseCardProps {
  course: Course;
  onEdit?: (id: string) => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClone?: (course: Course) => void;
}

const CourseCard = ({
  course,
  onEdit,
  onArchive,
  onDelete,
  onClone
}: CourseCardProps) => {
  const navigate = useNavigate();
  const { organizationConfig, isDarkTheme } = useAppTheme();

  const goToCourse = () =>
    navigate(
      `${commonUrls(organizationConfig.organization_name)}/dashboard/course/${course._id}`
    );

  const stop = (e: React.MouseEvent) => e.stopPropagation();
  const isArchived = (course.status || '').toUpperCase() === 'ARCHIVE';
  const hasMenu =
    (!isArchived && onEdit) || onArchive || onDelete || (isArchived && onClone);
  const description = stripHtml(course.courseDescription);

  return (
    <Card
      shadow='xs'
      radius='md'
      p='xs'
      withBorder
      onClick={isArchived ? undefined : goToCourse}
      title={isArchived ? undefined : 'Click to view course details'}
      style={{
        cursor: isArchived ? 'default' : 'pointer',
        transition: 'box-shadow 0.15s ease, transform 0.15s ease'
      }}
      onMouseEnter={e => {
        if (!isArchived) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.10)';
        }
      }}
      onMouseLeave={e => {
        if (!isArchived) {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '';
        }
      }}
    >
      <Group wrap='nowrap' gap='sm' align='flex-start'>
        <CourseThumbnail
          name={course.courseName}
          src={course.thumbnailUrl}
          size={68}
          radius='sm'
        />

        <Stack gap={3} style={{ flex: 1, minWidth: 0 }}>
          <Text
            fw={600}
            size='sm'
            lineClamp={1}
            style={{
              color: isArchived
                ? isDarkTheme
                  ? 'var(--mantine-color-gray-4)'
                  : 'var(--mantine-color-gray-7)'
                : undefined
            }}
          >
            {course.courseName}
          </Text>
          <Text size='xs' c='dimmed' lineClamp={2}>
            {description || 'No description available'}
          </Text>
          <Group justify='space-between' align='center' wrap='nowrap' mt={2}>
            <Badge
              color={
                (course.status || '').toUpperCase() === 'ACTIVE'
                  ? 'green'
                  : isArchived
                    ? 'orange'
                    : 'blue'
              }
              radius='sm'
              variant='light'
              size='xs'
              style={{ width: 'fit-content' }}
            >
              {course.status || 'Draft'}
            </Badge>
          </Group>
        </Stack>

        {hasMenu && (
          <Menu
            position='bottom-end'
            shadow='md'
            width={160}
            radius='md'
            transitionProps={{ transition: 'pop', duration: 150 }}
            styles={{
              dropdown: {
                backgroundColor: isDarkTheme ? '#1e293b' : '#ffffff',
                borderColor: isDarkTheme ? '#334155' : '#e2e8f0',
                boxShadow: isDarkTheme
                  ? '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)'
                  : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
                padding: '4px'
              },
              item: {
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 500,
                color: isDarkTheme ? '#f1f5f9' : '#1e293b'
              }
            }}
          >
            <Menu.Target>
              <ActionIcon
                variant='subtle'
                size='sm'
                color='gray'
                onClick={stop}
                aria-label='Course actions'
                style={{ flexShrink: 0, marginTop: 2 }}
              >
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {isArchived && onClone && (
                <Menu.Item
                  leftSection={<IconCopy size={14} />}
                  color='indigo'
                  onClick={e => {
                    stop(e);
                    onClone(course);
                  }}
                >
                  Clone Course
                </Menu.Item>
              )}
              {!isArchived && onEdit && (
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
                  leftSection={
                    isArchived ? (
                      <IconCircleCheck size={14} />
                    ) : (
                      <IconArchive size={14} />
                    )
                  }
                  color={isArchived ? 'teal' : 'orange'}
                  onClick={e => {
                    stop(e);
                    onArchive(course._id);
                  }}
                >
                  {isArchived ? 'Activate' : 'Archive'}
                </Menu.Item>
              )}
              {onDelete && (
                <>
                  <Menu.Divider
                    style={{ borderColor: isDarkTheme ? '#334155' : '#e2e8f0' }}
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
      </Group>
    </Card>
  );
};

export default CourseCard;
