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
  /**
   * Fired when the learner reaches the end of a video/audio task, so the player
   * can tick it off the way a course platform normally would.
   */
  onFinished?: () => void;
}

/**
 * Renders one task's content inline. Every task type the content writer can
 * author is handled: uploaded video/audio/image/PDF/text files, YouTube, Vimeo
 * and Google Drive links, direct media URLs, and — for anything that cannot be
 * shown in-page (Office documents, arbitrary articles) — an explicit card that
 * opens the content in a new tab.
 */
const TaskContentViewer = ({ task, onFinished }: TaskContentViewerProps) => {
  const { themeConfig } = useAppTheme();
  // FILE tasks are streamed through the backend proxy; LINK tasks ignore this.
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
    // 16:9 box — iframes have no intrinsic aspect ratio to size against.
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

  // 'external' and 'download': nothing can be framed, so be explicit about it
  // instead of showing an empty box the browser has quietly blocked.
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
            // Opening the resource is the only completion signal these types give.
            onFinished?.();
          }}
        >
          {isExternal ? 'Open resource' : 'Open file'}
        </CommonButton>
      </Stack>
    </Center>
  );
};

export default TaskContentViewer;
