import { Card, Stack, Text, Badge, ActionIcon, Menu, Group } from '@mantine/core';
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
import CourseThumbnail from './CourseThumbnail';

interface CourseCardProps {
  course: Course;
  onEdit?: (id: string) => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const CourseCard = ({ course, onEdit, onArchive, onDelete }: CourseCardProps) => {
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

  return (
    <Card
      shadow='xs'
      radius='md'
      p='xs'
      withBorder
      onClick={goToCourse}
      style={{
        cursor: 'pointer',
        transition: 'box-shadow 0.15s ease, transform 0.15s ease'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.10)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      <Group wrap='nowrap' gap='sm' align='flex-start'>
        <CourseThumbnail name={course.courseName} size={68} radius='sm' />

        <Stack gap={3} style={{ flex: 1, minWidth: 0 }}>
          <Text fw={600} size='sm' lineClamp={1}>
            {course.courseName}
          </Text>
          <Text size='xs' c='dimmed' lineClamp={2}>
            {description || 'No description available'}
          </Text>
          <Badge
            color={course.status === 'ACTIVE' ? 'green' : 'blue'}
            radius='sm'
            variant='light'
            size='xs'
            style={{ width: 'fit-content' }}
          >
            {course.status || 'Draft'}
          </Badge>
        </Stack>

        {hasMenu && (
          <Menu position='bottom-end' shadow='md' width={160}>
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
              {onEdit && (
                <Menu.Item
                  leftSection={<IconEdit size={14} />}
                  onClick={e => { stop(e); onEdit(course._id); }}
                >
                  Edit
                </Menu.Item>
              )}
              {onArchive && (
                <Menu.Item
                  leftSection={<IconArchive size={14} />}
                  onClick={e => { stop(e); onArchive(course._id); }}
                >
                  Archive
                </Menu.Item>
              )}
              {onDelete && (
                <>
                  <Menu.Divider style={{ borderColor: themeConfig.borderColor }} />
                  <Menu.Item
                    color='red'
                    leftSection={<IconTrash size={14} />}
                    onClick={e => { stop(e); onDelete(course._id); }}
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
