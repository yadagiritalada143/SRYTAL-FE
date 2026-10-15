import {
  Modal,
  Stack,
  Text,
  Group,
  ThemeIcon,
  Paper,
  Badge
} from '@mantine/core';
import {
  IconArchive,
  IconCircleCheck,
  IconLayersSubtract,
  IconListCheck
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { CommonButton } from '@components/common/button/CommonButton';
import { Course } from '@interfaces/contentwriter';
import CourseThumbnail from './CourseThumbnail';

interface ArchiveCourseModalProps {
  opened: boolean;
  onClose: () => void;
  course: Course | null;
  mode: 'archive' | 'activate';
  onConfirm: (courseId: string) => Promise<void>;
  loading?: boolean;
}

const ArchiveCourseModal = ({
  opened,
  onClose,
  course,
  mode,
  onConfirm,
  loading = false
}: ArchiveCourseModalProps) => {
  const { isDarkTheme } = useAppTheme();

  if (!course) return null;

  const isArchive = mode === 'archive';
  const totalModules = course.modules?.length || 0;
  const totalTasks =
    course.modules?.reduce(
      (sum, m) => sum + (Array.isArray(m.tasks) ? m.tasks.length : 0),
      0
    ) || 0;

  const handleConfirm = async () => {
    await onConfirm(course._id);
  };

  return (
    <Modal
      opened={opened}
      onClose={loading ? () => {} : onClose}
      title={isArchive ? 'Archive Course' : 'Activate Course'}
      centered
      radius='lg'
      size='md'
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      transitionProps={{ transition: 'pop', duration: 200 }}
      styles={{
        header: {
          backgroundColor: isDarkTheme ? '#1e293b' : '#ffffff',
          borderBottom: `1px solid ${isDarkTheme ? '#334155' : '#e2e8f0'}`,
          paddingBottom: '12px'
        },
        title: {
          fontWeight: 700,
          fontSize: '1.1rem',
          color: isDarkTheme ? '#f1f5f9' : '#0f172a'
        },
        content: {
          backgroundColor: isDarkTheme ? '#1e293b' : '#ffffff',
          color: isDarkTheme ? '#f1f5f9' : '#0f172a',
          borderRadius: '16px'
        }
      }}
    >
      <Stack gap='md' className='mt-3'>
        <Group gap='md' align='flex-start' wrap='nowrap'>
          <ThemeIcon
            size={48}
            radius='md'
            variant='light'
            color={isArchive ? 'orange' : 'teal'}
            style={{ flexShrink: 0, marginTop: 2 }}
          >
            {isArchive ? (
              <IconArchive size={26} />
            ) : (
              <IconCircleCheck size={26} />
            )}
          </ThemeIcon>

          <Stack gap={4} style={{ minWidth: 0, flex: 1 }}>
            <Text fw={600} size='md'>
              {isArchive
                ? `Archive "${course.courseName}"?`
                : `Activate "${course.courseName}"?`}
            </Text>
            <Text size='xs' c='dimmed' style={{ lineHeight: 1.5 }}>
              {isArchive
                ? 'Archiving hides this course from active assignments and moves it into the Archived Courses menu. Its modules, tasks, and contents are preserved and can be cloned or restored at any time.'
                : 'Activating will return this course to the Active Courses list so it can be viewed and assigned.'}
            </Text>
          </Stack>
        </Group>

        {/* Course info preview */}
        <Paper
          p='sm'
          radius='md'
          withBorder
          style={{
            borderColor: isDarkTheme ? '#334155' : '#e2e8f0',
            backgroundColor: isDarkTheme ? '#0f172a' : '#f8fafc'
          }}
        >
          <Group gap='sm' wrap='nowrap' align='center'>
            <CourseThumbnail
              name={course.courseName}
              src={course.thumbnailUrl || course.thumbnail}
              size={54}
              radius='sm'
            />
            <Stack gap={2} style={{ minWidth: 0, flex: 1 }}>
              <Text fw={600} size='sm' lineClamp={1}>
                {course.courseName}
              </Text>
              <Group gap={6} wrap='wrap' mt={2}>
                <Badge
                  size='xs'
                  variant='light'
                  color='indigo'
                  leftSection={<IconLayersSubtract size={11} />}
                >
                  {totalModules} {totalModules === 1 ? 'Module' : 'Modules'}
                </Badge>
                <Badge
                  size='xs'
                  variant='light'
                  color='violet'
                  leftSection={<IconListCheck size={11} />}
                >
                  {totalTasks} {totalTasks === 1 ? 'Task' : 'Tasks'}
                </Badge>
                <Badge
                  size='xs'
                  variant='outline'
                  color={isArchive ? 'green' : 'orange'}
                >
                  Current: {course.status || 'Active'}
                </Badge>
              </Group>
            </Stack>
          </Group>
        </Paper>

        <Group justify='flex-end' gap='xs' mt='xs'>
          <CommonButton
            variant='default'
            onClick={onClose}
            disabled={loading}
            size='sm'
          >
            Cancel
          </CommonButton>
          <CommonButton
            color={isArchive ? 'orange' : 'teal'}
            leftSection={
              isArchive ? (
                <IconArchive size={16} />
              ) : (
                <IconCircleCheck size={16} />
              )
            }
            onClick={handleConfirm}
            loading={loading}
            size='sm'
          >
            {isArchive ? 'Archive Course' : 'Activate Course'}
          </CommonButton>
        </Group>
      </Stack>
    </Modal>
  );
};

export default ArchiveCourseModal;
