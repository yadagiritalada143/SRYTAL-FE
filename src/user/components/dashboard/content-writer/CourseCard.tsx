import {
  Card,
  Image,
  Stack,
  Text,
  Badge,
  ActionIcon,
  Menu
} from '@mantine/core';
import {
  IconDots,
  IconEdit,
  IconArchive,
  IconTrash
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { organizationEmployeeUrls } from '@utils/common/constants';
import { useAppTheme } from '@hooks/use-app-theme';
import { Course } from '@interfaces/contentwriter';

interface CourseCardProps {
  course: Course;
  onEdit?: (id: string) => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const FALLBACK_THUMBNAIL = '/course-thumbnail.png';

/**
 * Reusable course card for the Content Writer dashboard. Self-contained
 * (handles its own navigation + theming) so it can be dropped into any grid.
 * Defined at module scope to avoid remounting on every parent render.
 */
const CourseCard = ({ course, onEdit, onArchive, onDelete }: CourseCardProps) => {
  const navigate = useNavigate();
  const { themeConfig, organizationConfig } = useAppTheme();

  const goToCourse = () =>
    navigate(
      `${organizationEmployeeUrls(
        organizationConfig.organization_name
      )}/dashboard/course/${course._id}`
    );

  const stop = (e: React.MouseEvent) => e.stopPropagation();
  const hasMenu = onEdit || onArchive || onDelete;
  const description = course.courseDescription
    ? course.courseDescription.replace(/<[^>]*>/g, '').trim()
    : '';

  return (
    <Card
      shadow='sm'
      radius='md'
      p='md'
      withBorder
      onClick={goToCourse}
      style={{
        position: 'relative',
        cursor: 'pointer',
        height: '100%',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      {hasMenu && (
        <Menu position='bottom-end' shadow='md' width={160}>
          <Menu.Target>
            <ActionIcon
              variant='light'
              onClick={stop}
              aria-label='Course actions'
              style={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
            >
              <IconDots size={18} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            {onEdit && (
              <Menu.Item
                leftSection={<IconEdit size={16} />}
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
                leftSection={<IconArchive size={16} />}
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
                  leftSection={<IconTrash size={16} />}
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

      <Image
        src={course.thumbnail || FALLBACK_THUMBNAIL}
        fallbackSrc={FALLBACK_THUMBNAIL}
        height={140}
        radius='md'
        mb='sm'
        alt={course.courseName}
      />
      <Stack gap={6}>
        <Text fw={600} size='md' lineClamp={1}>
          {course.courseName}
        </Text>
        <Text size='sm' c='dimmed' lineClamp={2} style={{ minHeight: 40 }}>
          {description || 'No description available'}
        </Text>
        <Badge
          color={course.status === 'ACTIVE' ? 'green' : 'blue'}
          mt={4}
          radius='sm'
          variant='light'
          style={{ width: 'fit-content' }}
        >
          {course.status || 'Draft'}
        </Badge>
      </Stack>
    </Card>
  );
};

export default CourseCard;
