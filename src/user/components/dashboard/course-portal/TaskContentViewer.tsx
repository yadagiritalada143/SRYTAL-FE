import { Box, Center, Stack, Text, ThemeIcon } from '@mantine/core';
import {
  IconExternalLink,
  IconFileDownload,
  IconLink
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { CommonButton } from '@components/common/button/CommonButton';
import { AssignedTask } from '@interfaces/course-assignment';
import { getCourseTaskContentUrl } from '@services/user-services';
import { resolveTaskContent } from './task-content';

interface TaskContentViewerProps {
  task: AssignedTask;
  onFinished?: () => void;
}

const TaskContentViewer = ({ task, onFinished }: TaskContentViewerProps) => {
  const { themeConfig } = useAppTheme();
  const content = resolveTaskContent(task, getCourseTaskContentUrl(task._id));

  const surface = {
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden' as const
  };

  if (content.kind === 'video') {
    return (
      <Box style={surface}>
        <video
          key={content.url}
          src={content.url}
          controls
          controlsList='nodownload'
          onEnded={onFinished}
          style={{ width: '100%', maxHeight: '70vh', display: 'block' }}
        />
      </Box>
    );
  }

  if (content.kind === 'embed') {
    return (
      <Box style={{ ...surface, position: 'relative', paddingTop: '56.25%' }}>
        <iframe
          key={content.url}
          src={content.url}
          title={task.taskName}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen'
          allowFullScreen
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 0
          }}
        />
      </Box>
    );
  }

  if (content.kind === 'audio') {
    return (
      <Box
        p='xl'
        style={{
          borderRadius: 12,
          border: `1px solid ${themeConfig.borderColor}`,
          backgroundColor: themeConfig.cardBackground
        }}
      >
        <audio
          key={content.url}
          src={content.url}
          controls
          onEnded={onFinished}
          style={{ width: '100%' }}
        />
      </Box>
    );
  }

  if (content.kind === 'image') {
    return (
      <Box
        style={{
          borderRadius: 12,
          border: `1px solid ${themeConfig.borderColor}`,
          backgroundColor: themeConfig.cardBackground,
          overflow: 'hidden'
        }}
      >
        <img
          src={content.url}
          alt={task.taskName}
          style={{
            width: '100%',
            maxHeight: '70vh',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      </Box>
    );
  }

  if (content.kind === 'pdf' || content.kind === 'text') {
    return (
      <Box
        style={{
          borderRadius: 12,
          border: `1px solid ${themeConfig.borderColor}`,
          overflow: 'hidden',
          backgroundColor: themeConfig.cardBackground
        }}
      >
        <iframe
          key={content.url}
          src={content.url}
          title={task.taskName}
          style={{ width: '100%', height: '70vh', border: 0, display: 'block' }}
        />
      </Box>
    );
  }

  const isExternal = content.kind === 'external';
  const openUrl = content.externalUrl || content.url;

  return (
    <Center
      p='xl'
      style={{
        minHeight: 260,
        borderRadius: 12,
        border: `1px dashed ${themeConfig.borderColor}`,
        backgroundColor: themeConfig.cardBackground
      }}
    >
      <Stack align='center' gap='sm' maw={420}>
        <ThemeIcon size={56} radius='xl' variant='light'>
          {isExternal ? <IconLink size={28} /> : <IconFileDownload size={28} />}
        </ThemeIcon>
        <Text fw={600} ta='center'>
          {isExternal
            ? 'External resource'
            : task.contentFileName || 'Attached file'}
        </Text>
        <Text size='sm' c={themeConfig.mutedTextColor} ta='center'>
          {isExternal
            ? 'This resource is hosted elsewhere and opens in a new tab.'
            : 'This file type has no in-browser preview — open it in a new tab to read or download it.'}
        </Text>
        <CommonButton
          leftSection={<IconExternalLink size={16} />}
          onClick={() => {
            window.open(openUrl, '_blank', 'noopener');
          }}
        >
          {isExternal ? 'Open resource' : 'Open file'}
        </CommonButton>
      </Stack>
    </Center>
  );
};

export default TaskContentViewer;
